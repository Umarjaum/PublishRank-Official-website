import { useRef, useState, type FormEvent } from "react";
import { AlertTriangle, CheckCircle2, Loader2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { contactSchema, WEBSITE_CREATION_TOPIC } from "@/lib/contact-schema";
import { WEBSITE_PLANS, type WebsitePlanId } from "@/lib/website-pricing-data";

type Props = { selectedPlan: WebsitePlanId };
type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "success" }
  | { kind: "error"; message: string; fallback?: boolean };

const sectionOptions = [
  "Intro / homepage hero",
  "About the business",
  "Services or products",
  "Pricing or packages",
  "Reviews or testimonials",
  "Frequently asked questions",
  "Contact information",
  "Not sure yet — recommend a structure",
];

const featureOptions = [
  "Contact button or form",
  "Map or location details",
  "Booking link",
  "Social profile links",
  "Newsletter signup",
  "Basic SEO titles and descriptions",
  "Other feature to discuss",
];

const designOptions = [
  "Clear and professional",
  "Editorial and portfolio-led",
  "Warm and local",
  "Bold and modern",
  "Minimal and calm",
  "I am not sure — suggest a direction",
];

function value(data: FormData, key: string): string {
  return String(data.get(key) ?? "").trim();
}

function list(data: FormData, key: string): string[] {
  return data
    .getAll(key)
    .map((item) => String(item).trim())
    .filter(Boolean);
}

function buildProjectBrief(data: FormData): string {
  const planId = value(data, "plan") === "enterprise" ? "enterprise" : "basic";
  const plan = WEBSITE_PLANS[planId];
  const support =
    planId === "enterprise"
      ? "1 year included; $1 USD per additional year"
      : "No ongoing support included";
  return [
    `Website project request — ${plan.name} ($${plan.usdPrice} USD, one-time)`,
    `Support: ${support}`,
    `Business / brand: ${value(data, "business_name")}`,
    `Industry: ${value(data, "industry") || "Not specified"}`,
    `What the business offers: ${value(data, "business_summary")}`,
    `Main website goal: ${value(data, "website_goal")}`,
    `Existing website: ${value(data, "existing_site") || "None provided"}`,
    `Intended audience: ${value(data, "target_audience") || "Not specified"}`,
    `Requested sections: ${list(data, "sections").join(", ") || "Not specified"}`,
    `Design direction: ${value(data, "design_style")}`,
    `Brand colors or visual preferences: ${value(data, "brand_colors") || "Not specified"}`,
    `Requested features to discuss: ${list(data, "features").join(", ") || "None selected"}`,
    `Content and brand assets: ${value(data, "content_readiness")}`,
    `Domain and hosting: ${value(data, "domain_status")}`,
    `Preferred launch timing: ${value(data, "launch_timing") || "Flexible / not specified"}`,
    `Reference links: ${value(data, "references") || "None provided"}`,
    `Additional notes: ${value(data, "notes") || "None provided"}`,
  ].join("\n");
}

export function WebsiteCreationForm({ selectedPlan }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status.kind === "sending") return;

    const data = new FormData(event.currentTarget);
    const raw = {
      name: value(data, "name"),
      email: value(data, "email"),
      topic: WEBSITE_CREATION_TOPIC,
      message: buildProjectBrief(data),
      consent: data.get("consent") === "on",
      website: value(data, "website"),
    };
    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      setStatus({
        kind: "error",
        message: parsed.error.issues[0]?.message ?? "Please review the required fields.",
      });
      return;
    }
    if (parsed.data.message.length > 4000) {
      setStatus({
        kind: "error",
        message:
          "Your brief is too long. Please shorten the notes or reference links and try again.",
      });
      return;
    }

    setStatus({ kind: "sending" });
    const controller = new AbortController();
    const timer = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(parsed.data),
        signal: controller.signal,
      });
      const result = (await response.json().catch(() => null)) as { error?: string } | null;
      if (response.ok) {
        formRef.current?.reset();
        setStatus({ kind: "success" });
        return;
      }
      setStatus({
        kind: "error",
        message:
          response.status === 429
            ? "Too many requests from this connection. Please wait a few minutes and try again."
            : (result?.error ??
              "We couldn’t deliver your request. Please try again or email us directly."),
        fallback: response.status === 503 || response.status >= 500,
      });
    } catch (error) {
      const timedOut = error instanceof DOMException && error.name === "AbortError";
      setStatus({
        kind: "error",
        message: timedOut
          ? "The request timed out. Please try again or email us directly."
          : "We couldn’t reach the server. Please check your connection or email us directly.",
        fallback: true,
      });
    } finally {
      window.clearTimeout(timer);
    }
  }

  if (status.kind === "success") {
    return (
      <div role="status" className="rounded-2xl border bg-brand-soft p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-brand" aria-hidden="true" />
        <h3 className="mt-4 text-2xl font-extrabold">Your brief has been sent.</h3>
        <p className="mx-auto mt-3 max-w-xl leading-7 text-muted-foreground">
          We’ll review the details and reply to the email address you provided. This request is not
          a booking or a payment; we’ll confirm the scope before any work begins.
        </p>
        <Button
          type="button"
          className="mt-6 rounded-full"
          onClick={() => setStatus({ kind: "idle" })}
        >
          Send another request
        </Button>
      </div>
    );
  }

  const selected = WEBSITE_PLANS[selectedPlan];
  const fieldClass = "mt-2";
  const selectClass =
    "mt-2 h-11 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs";

  return (
    <form
      ref={formRef}
      onSubmit={onSubmit}
      className="grid gap-7 rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] md:p-8"
      aria-describedby="website-form-status website-form-privacy"
    >
      <div className="rounded-xl bg-brand-soft p-4">
        <p className="text-xs font-extrabold uppercase tracking-[0.15em] text-brand">
          Selected package
        </p>
        <p className="mt-1 font-extrabold">
          {selected.name} · ${selected.usdPrice} USD one-time
        </p>
        <input type="hidden" name="plan" value={selectedPlan} />
        {selectedPlan === "enterprise" && (
          <p className="mt-1 text-sm text-muted-foreground">
            Includes one year of email support; each additional year is $1 USD.
          </p>
        )}
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="website-request-name">Your name *</Label>
          <Input
            id="website-request-name"
            name="name"
            autoComplete="name"
            maxLength={100}
            className={fieldClass}
            required
          />
        </div>
        <div>
          <Label htmlFor="website-request-email">Email address *</Label>
          <Input
            id="website-request-email"
            name="email"
            type="email"
            autoComplete="email"
            maxLength={200}
            className={fieldClass}
            required
          />
        </div>
        <div>
          <Label htmlFor="business-name">Business or brand name *</Label>
          <Input
            id="business-name"
            name="business_name"
            maxLength={100}
            className={fieldClass}
            required
          />
        </div>
        <div>
          <Label htmlFor="industry">
            Industry <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="industry"
            name="industry"
            maxLength={100}
            placeholder="For example, home services or food"
            className={fieldClass}
          />
        </div>
      </div>

      <div>
        <Label htmlFor="business-summary">
          What does your business do, and what should visitors understand? *
        </Label>
        <Textarea
          id="business-summary"
          name="business_summary"
          rows={4}
          maxLength={500}
          className={fieldClass}
          required
          placeholder="Describe your offer, service area, or product in a few sentences."
        />
        <p className="mt-1.5 text-xs text-muted-foreground">
          Please do not include passwords, API keys, payment details, or private customer
          information.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="website-goal">Main purpose of the website *</Label>
          <select
            id="website-goal"
            name="website_goal"
            defaultValue=""
            className={selectClass}
            required
          >
            <option value="" disabled>
              Choose the main goal
            </option>
            <option>Explain my services and get enquiries</option>
            <option>Show a portfolio or past work</option>
            <option>Promote one product or offer</option>
            <option>Share details about a local business</option>
            <option>Promote an event or campaign</option>
            <option>Other / still deciding</option>
          </select>
        </div>
        <div>
          <Label htmlFor="existing-site">
            Current website URL{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="existing-site"
            name="existing_site"
            type="url"
            maxLength={255}
            placeholder="https://example.com"
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="target-audience">
            Who do you want to reach?{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="target-audience"
            name="target_audience"
            maxLength={250}
            className={fieldClass}
            placeholder="For example, homeowners in Bristol"
          />
        </div>
        <div>
          <Label htmlFor="design-style">Visual direction *</Label>
          <select
            id="design-style"
            name="design_style"
            defaultValue=""
            className={selectClass}
            required
          >
            <option value="" disabled>
              Choose a direction
            </option>
            {designOptions.map((option) => (
              <option key={option}>{option}</option>
            ))}
          </select>
        </div>
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold">
          Sections you may need{" "}
          <span className="font-normal text-muted-foreground">(choose any)</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {sectionOptions.map((option) => (
            <label
              key={option}
              className="flex items-start gap-3 rounded-lg border p-3 text-sm leading-6"
            >
              <input
                type="checkbox"
                name="sections"
                value={option}
                className="mt-1 h-4 w-4 accent-[var(--brand)]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="brand-colors">
            Brand colors or visual preferences{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <Input
            id="brand-colors"
            name="brand_colors"
            maxLength={180}
            placeholder="Colors, mood, or things to avoid"
            className={fieldClass}
          />
        </div>
        <div>
          <Label htmlFor="content-readiness">What content or assets do you already have? *</Label>
          <select
            id="content-readiness"
            name="content_readiness"
            defaultValue=""
            className={selectClass}
            required
          >
            <option value="" disabled>
              Choose the closest option
            </option>
            <option>Text, logo, and images are ready</option>
            <option>I have a logo and some content</option>
            <option>I have links or references, but need help organizing content</option>
            <option>I am still preparing content and assets</option>
          </select>
        </div>
      </div>

      <fieldset className="grid gap-3">
        <legend className="text-sm font-semibold">
          Features to discuss <span className="font-normal text-muted-foreground">(optional)</span>
        </legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {featureOptions.map((option) => (
            <label
              key={option}
              className="flex items-start gap-3 rounded-lg border p-3 text-sm leading-6"
            >
              <input
                type="checkbox"
                name="features"
                value={option}
                className="mt-1 h-4 w-4 accent-[var(--brand)]"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
        <p className="text-xs leading-5 text-muted-foreground">
          Commerce, booking, paid tools, and custom integrations need separate scope confirmation
          before any work starts.
        </p>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="domain-status">Domain and hosting status *</Label>
          <select
            id="domain-status"
            name="domain_status"
            defaultValue=""
            className={selectClass}
            required
          >
            <option value="" disabled>
              Choose the closest option
            </option>
            <option>I already have a domain and Vercel account</option>
            <option>I have a domain but not hosting</option>
            <option>I need guidance on both</option>
            <option>I am not sure yet</option>
          </select>
        </div>
        <div>
          <Label htmlFor="launch-timing">
            Preferred launch timing{" "}
            <span className="font-normal text-muted-foreground">(optional)</span>
          </Label>
          <select id="launch-timing" name="launch_timing" defaultValue="" className={selectClass}>
            <option value="">No fixed date</option>
            <option>As soon as scope is agreed</option>
            <option>Within the next two weeks</option>
            <option>Within one to two months</option>
            <option>I have a specific date — I’ll explain below</option>
          </select>
        </div>
      </div>

      <div>
        <Label htmlFor="references">
          Inspiration, logo, or reference links{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="references"
          name="references"
          rows={2}
          maxLength={500}
          className={fieldClass}
          placeholder="Paste public website or design links that show what you like."
        />
      </div>
      <div>
        <Label htmlFor="project-notes">
          Anything else we should know?{" "}
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Textarea
          id="project-notes"
          name="notes"
          rows={4}
          maxLength={800}
          className={fieldClass}
          placeholder="Mention anything important about your audience, content, or requested scope."
        />
      </div>

      {/* Honeypot: hidden from people and assistive technology. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website-request-honeypot">Leave this field empty</label>
        <input
          id="website-request-honeypot"
          name="website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <div id="website-form-privacy">
        <label className="flex items-start gap-3 text-sm leading-6">
          <input
            type="checkbox"
            name="consent"
            className="mt-1.5 h-4 w-4 accent-[var(--brand)]"
            required
          />
          <span>
            I agree that PublishRank may use my contact and project details to review and reply to
            this request, as described in the{" "}
            <a href="/privacy" className="font-bold text-brand underline-offset-2 hover:underline">
              privacy information
            </a>
            . *
          </span>
        </label>
      </div>

      <div id="website-form-status" aria-live="polite">
        {status.kind === "error" && (
          <div
            role="alert"
            className="flex gap-3 rounded-md border border-destructive/40 bg-destructive/5 p-4 text-sm"
          >
            <AlertTriangle
              className="mt-0.5 h-5 w-5 shrink-0 text-destructive"
              aria-hidden="true"
            />
            <div>
              <p className="font-semibold">{status.message}</p>
              {status.fallback && (
                <a
                  href="mailto:publishrankseo@gmail.com?subject=Website%20creation%20request"
                  className="mt-2 inline-block font-bold text-brand hover:underline"
                >
                  Email the website request inbox
                </a>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <Button
          type="submit"
          disabled={status.kind === "sending"}
          className="min-h-12 rounded-full px-7"
        >
          {status.kind === "sending" ? (
            <Loader2 className="animate-spin" aria-hidden="true" />
          ) : (
            <Send aria-hidden="true" />
          )}
          {status.kind === "sending" ? "Sending brief…" : "Send website brief"}
        </Button>
        <p className="max-w-lg text-xs leading-5 text-muted-foreground">
          This form sends your brief by email; it does not collect payment or start work. We’ll
          confirm the scope before anything begins.
        </p>
      </div>
    </form>
  );
}
