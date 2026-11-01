import { createFileRoute } from "@tanstack/react-router";
import { contactSchema } from "@/lib/contact-schema";

// Best-effort, per-instance rate limit. Serverless instances do not share memory, so this
// only blunts bursts; the honeypot, validation and the provider's own limits do the rest.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, number[]>();

function limited(key: string): boolean {
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(key, recent);
  if (hits.size > 500) {
    for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  }
  return recent.length > MAX_PER_WINDOW;
}

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { "content-type": "application/json; charset=utf-8", "cache-control": "no-store" },
  });

const oneLine = (s: string) => s.replace(/[\r\n]+/g, " ").trim();

export const Route = createFileRoute("/api/contact")({
  server: {
    handlers: {
      GET: () => json({ error: "Method not allowed." }, 405),
      POST: async ({ request }) => {
        // Same-origin only.
        const origin = request.headers.get("origin");
        const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
        if (origin && host) {
          try {
            if (new URL(origin).host !== host) return json({ error: "Cross-origin requests are not allowed." }, 403);
          } catch {
            return json({ error: "Invalid origin." }, 400);
          }
        }

        const ip = (request.headers.get("x-forwarded-for") ?? "unknown").split(",")[0]?.trim() ?? "unknown";
        if (limited(ip)) return json({ error: "Too many messages. Please try again later." }, 429);

        let payload: unknown;
        try {
          payload = await request.json();
        } catch {
          return json({ error: "The request body was not valid JSON." }, 400);
        }

        const parsed = contactSchema.safeParse(payload);
        if (!parsed.success) {
          const fieldErrors: Record<string, string> = {};
          for (const issue of parsed.error.issues) {
            const key = String(issue.path[0] ?? "form");
            if (!(key in fieldErrors)) fieldErrors[key] = issue.message;
          }
          // A filled honeypot is reported as success so bots learn nothing.
          if (fieldErrors["website"]) return json({ ok: true });
          return json({ error: "Please check the highlighted fields.", fieldErrors }, 422);
        }

        const apiKey = process.env["RESEND_API_KEY"];
        const to = process.env["CONTACT_TO_EMAIL"];
        const from = process.env["CONTACT_FROM_EMAIL"] ?? "PublishRank Website <onboarding@resend.dev>";
        if (!apiKey || !to) {
          console.error("Contact form is not configured: set RESEND_API_KEY and CONTACT_TO_EMAIL.");
          return json({ error: "The contact form is not configured yet." }, 503);
        }

        const { name, email, topic, message } = parsed.data;
        try {
          const controller = new AbortController();
          const timer = setTimeout(() => controller.abort(), 10000);
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: { Authorization: `Bearer ${apiKey}`, "content-type": "application/json" },
            body: JSON.stringify({
              from,
              to: [to],
              reply_to: email,
              subject: oneLine(`[PublishRank] ${topic} — ${name}`),
              text: `Name: ${oneLine(name)}\nEmail: ${email}\nTopic: ${topic}\n\n${message}`,
            }),
            signal: controller.signal,
          }).finally(() => clearTimeout(timer));
          if (!res.ok) {
            console.error("Email provider rejected the contact message", res.status, await res.text().catch(() => ""));
            return json({ error: "We couldn’t deliver your message. Please try again later." }, 502);
          }
          return json({ ok: true });
        } catch (error) {
          console.error("Contact delivery failed", error);
          return json({ error: "We couldn’t deliver your message. Please try again later." }, 502);
        }
      },
    },
  },
});
