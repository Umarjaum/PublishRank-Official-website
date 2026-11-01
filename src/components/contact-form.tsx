import { useRef, useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, contactTopics } from "@/lib/contact-schema";
import { ISSUES_URL } from "@/lib/site";

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string; fallback?: boolean };

type FieldErrors = Partial<Record<"name" | "email" | "topic" | "message" | "consent", string>>;

export function ContactForm() {
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [errors, setErrors] = useState<FieldErrors>({});
  const formRef = useRef<HTMLFormElement>(null);
  const messageLength = useRef(0);
  const [, force] = useState(0);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status.kind === "sending") return;
    const data = new FormData(e.currentTarget);
    const raw = {
      name: String(data.get("name") ?? ""),
      email: String(data.get("email") ?? ""),
      topic: String(data.get("topic") ?? ""),
      message: String(data.get("message") ?? ""),
      consent: data.get("consent") === "on",
      website: String(data.get("website") ?? ""),
    };
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const next: FieldErrors = {};
      for (const issue of parsed.error.issues) {
        const key = issue.path[0];
        if (typeof key === "string" && key in raw && !(key in next)) {
          next[key as keyof FieldErrors] = issue.message;
        }
      }
      setErrors(next);
      setStatus({ kind: "idle" });
      const first = formRef.current?.querySelector<HTMLElement>("[aria-invalid='true']");
      first?.focus();
      return;
    }
    setErrors({});
    setStatus({ kind: "sending" });

    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });
      const body = (await res.json().catch(() => null)) as { error?: string; fieldErrors?: FieldErrors } | null;
      if (res.ok) {
        formRef.current?.reset();
        messageLength.current = 0;
        setStatus({ kind: "success" });
        return;
      }
      if (body?.fieldErrors) setErrors(body.fieldErrors);
      if (res.status === 429) {
        setStatus({ kind: "error", message: "Too many messages from this connection. Please wait a few minutes and try again." });
      } else if (res.status === 503) {
        setStatus({
          kind: "error",
          fallback: true,
          message: "The contact form isn’t accepting messages right now. Please open an issue on GitHub instead.",
        });
      } else {
        setStatus({ kind: "error", message: body?.error ?? "We couldn’t send your message. Check the highlighted fields and try again." });
      }
    } catch (err) {
      const aborted = err instanceof DOMException && err.name === "AbortError";
      setStatus({
        kind: "error",
        fallback: true,
        message: aborted
          ? "The request timed out. Check your connection and try again, or open an issue on GitHub."
          : "We couldn’t reach the server. Check your connection and try again, or open an issue on GitHub.",
      });
    } finally {
      window.clearTimeout(timer);
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-lg border bg-brand-soft p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand" />
        <h2 className="mt-4 text-2xl font-extrabold">Message sent</h2>
        <p className="mx-auto mt-3 max-w-md leading-7 text-muted-foreground">
          Thank you for contacting PublishRank. We read every message, but we can’t promise a specific response time.
        </p>
        <Button className="mt-6 rounded-full" onClick={() => setStatus({ kind: "idle" })}>
          Send another message
        </Button>
      </div>
    );
  }

  const fieldClass = "mt-2";
  const err = (id: string, text?: string) =>
    text ? (
      <p id={`${id}-error`} className="mt-1.5 text-sm font-semibold text-destructive">
        {text}
      </p>
    ) : null;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="grid gap-5 rounded-lg border bg-card p-6 shadow-[var(--shadow-card)]" aria-describedby="contact-status">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Your name</Label>
          <Input id="name" name="name" autoComplete="name" className={fieldClass} aria-invalid={!!errors.name} aria-describedby={errors.name ? "name-error" : undefined} required />
          {err("name", errors.name)}
        </div>
        <div>
          <Label htmlFor="email">Email address</Label>
          <Input id="email" name="email" type="email" autoComplete="email" className={fieldClass} aria-invalid={!!errors.email} aria-describedby={errors.email ? "email-error" : undefined} required />
          {err("email", errors.email)}
        </div>
      </div>
      <div>
        <Label htmlFor="topic">Topic</Label>
        <select
          id="topic"
          name="topic"
          defaultValue=""
          aria-invalid={!!errors.topic}
          aria-describedby={errors.topic ? "topic-error" : undefined}
          className="mt-2 h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs"
          required
        >
          <option value="" disabled>
            Choose a topic
          </option>
          {contactTopics.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
        {err("topic", errors.topic)}
      </div>
      <div>
        <Label htmlFor="message">Message</Label>
        <Textarea
          id="message"
          name="message"
          rows={7}
          maxLength={4000}
          className={fieldClass}
          aria-invalid={!!errors.message}
          aria-describedby={errors.message ? "message-error" : "message-hint"}
          onChange={(e) => {
            messageLength.current = e.currentTarget.value.length;
            force((n) => n + 1);
          }}
          required
        />
        <p id="message-hint" className="mt-1.5 text-xs text-muted-foreground">
          Include the affected URL and steps to reproduce for bug reports. Never share passwords or API keys. {messageLength.current}/4000
        </p>
        {err("message", errors.message)}
      </div>
      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Leave this field empty</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>
      <div>
        <label className="flex items-start gap-3 text-sm leading-6">
          <input type="checkbox" name="consent" className="mt-1.5 h-4 w-4 accent-[var(--brand)]" aria-invalid={!!errors.consent} aria-describedby={errors.consent ? "consent-error" : undefined} />
          <span>
            I agree that PublishRank may use these details to reply to my message, as described in the{" "}
            <a href="/privacy" className="font-bold text-brand underline-offset-2 hover:underline">privacy information</a>.
          </span>
        </label>
        {err("consent", errors.consent)}
      </div>

      <div id="contact-status" aria-live="polite">
        {status.kind === "error" && (
          <div role="alert" className="flex gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-destructive" />
            <div>
              <p className="font-semibold">{status.message}</p>
              {status.fallback && (
                <a href={ISSUES_URL} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block font-bold text-brand hover:underline">
                  Open a GitHub issue
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <Button type="submit" disabled={status.kind === "sending"} className="w-fit rounded-full px-7">
        {status.kind === "sending" ? <Loader2 className="animate-spin" /> : <Send />}
        {status.kind === "sending" ? "Sending…" : "Send message"}
      </Button>
    </form>
  );
}
