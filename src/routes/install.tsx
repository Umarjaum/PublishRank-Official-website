import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Check,
  Download,
  ExternalLink,
  ShieldAlert,
  Wrench,
} from "lucide-react";
import { DownloadLink } from "@/components/download-link";
import { PageFrame } from "@/components/site-shell";
import {
  INSTALLATION_SCREENSHOT_BASE_PATH,
  INSTALLATION_SCREENSHOT_VERSION,
  installationSteps,
} from "@/lib/installation-guide";
import { pageSeo } from "@/lib/page-seo";
import {
  CURRENT_RELEASE,
  DOWNLOAD_FILE,
  PUBLISHRANK_WORDPRESS_PLUGIN_URL,
  RELEASES_URL,
} from "@/lib/site";

export const Route = createFileRoute("/install")({
  head: () =>
    pageSeo(
      "/install",
      "How to Install PublishRank on WordPress",
      `Install PublishRank ${CURRENT_RELEASE} with a screenshot-guided walkthrough for WordPress.org or a direct ZIP upload, then configure and verify your site.`,
      {
        keywords: `install PublishRank, WordPress plugin installation, upload WordPress plugin ZIP, PublishRank setup wizard, PublishRank ${CURRENT_RELEASE}`,
      },
    ),
  component: InstallPage,
});

const orgStep = installationSteps.find((step) => step.number === 2)!;
const uploadSteps = installationSteps.filter((step) => step.number >= 3 && step.number <= 8);
const setupSteps = installationSteps.filter((step) => step.number >= 9);

function StepCard({ step }: { step: (typeof installationSteps)[number] }) {
  return (
    <article
      id={step.id}
      className="scroll-mt-24 overflow-hidden rounded-2xl border bg-card shadow-[var(--shadow-card)]"
    >
      <div className="grid gap-4 p-5 md:grid-cols-[auto_1fr] md:items-start md:p-7">
        <span
          aria-label={`Step ${step.number}`}
          className="grid h-10 w-10 place-items-center rounded-full bg-brand text-lg font-extrabold text-primary-foreground"
        >
          {step.number}
        </span>
        <div>
          <h3 className="text-xl font-extrabold">{step.title}</h3>
          <p className="mt-2 text-sm leading-7 text-muted-foreground">{step.description}</p>
        </div>
      </div>
      <figure className="border-t bg-muted/30 p-3 sm:p-5">
        <img
          src={`${INSTALLATION_SCREENSHOT_BASE_PATH}/${step.image}`}
          alt={step.alt}
          width={1920}
          height={1624}
          loading={step.number === 2 || step.number === 3 ? "eager" : "lazy"}
          decoding="async"
          className="mx-auto h-auto w-full rounded-xl border bg-white shadow-sm"
        />
        <figcaption className="sr-only">
          Screenshot for step {step.number}: {step.title}.
        </figcaption>
      </figure>
    </article>
  );
}

function InstallPage() {
  return (
    <PageFrame>
      <section className="border-b bg-brand-soft">
        <div className="site-width grid gap-8 py-12 lg:grid-cols-[1fr_auto] lg:items-center lg:py-16">
          <div>
            <p className="text-xs font-extrabold uppercase tracking-[0.18em] text-brand">
              Illustrated setup · version {CURRENT_RELEASE}
            </p>
            <h1 className="mt-3 max-w-3xl text-4xl font-extrabold leading-tight md:text-5xl">
              Install PublishRank on WordPress
            </h1>
            <p className="mt-5 max-w-3xl text-lg leading-relaxed text-muted-foreground">
              Install from the WordPress.org directory or upload the current plugin ZIP. Then follow
              the screenshots to complete the setup wizard, check your sitemap and verify your live
              page.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <DownloadLink className="inline-flex min-h-12 items-center gap-2 rounded-full bg-brand px-6 font-extrabold text-primary-foreground shadow-[var(--shadow-card)] hover:bg-brand-deep">
                <Download aria-hidden="true" className="h-4 w-4" />
                Download {DOWNLOAD_FILE}
              </DownloadLink>
              <a
                href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-12 items-center gap-2 rounded-full border border-brand/30 bg-card px-6 font-bold text-brand hover:bg-brand/5"
              >
                WordPress.org listing <ExternalLink aria-hidden="true" className="h-4 w-4" />
              </a>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              The direct ZIP contains PublishRank {CURRENT_RELEASE}. Keep the file zipped when you
              upload it.
            </p>
          </div>
          <aside className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] lg:max-w-sm">
            <h2 className="text-lg font-extrabold">Before you begin</h2>
            <ul className="mt-4 grid gap-3 text-sm leading-6">
              <li className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                Sign in with an administrator account.
              </li>
              <li className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                Back up your site and use staging if available.
              </li>
              <li className="flex gap-3">
                <Check aria-hidden="true" className="mt-1 h-4 w-4 shrink-0 text-brand" />
                Check the release requirements: WordPress 6.3+ and PHP 7.4+.
              </li>
            </ul>
          </aside>
        </div>
      </section>

      <div className="site-width max-w-5xl py-12 md:py-16">
        <nav
          aria-label="On this page"
          className="rounded-2xl border bg-card p-5 shadow-[var(--shadow-card)] sm:p-6"
        >
          <h2 className="text-lg font-extrabold">Jump to a section</h2>
          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold text-brand">
            <li>
              <a className="underline-offset-4 hover:underline" href="#directory-install">
                WordPress.org install
              </a>
            </li>
            <li>
              <a className="underline-offset-4 hover:underline" href="#zip-install">
                Upload the ZIP
              </a>
            </li>
            <li>
              <a className="underline-offset-4 hover:underline" href="#first-setup">
                First-time setup
              </a>
            </li>
            <li>
              <a className="underline-offset-4 hover:underline" href="#troubleshooting">
                Troubleshooting
              </a>
            </li>
          </ul>
        </nav>

        <section id="directory-install" className="scroll-mt-24 pt-12">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">Option 1</p>
          <h2 className="mt-2 text-3xl font-extrabold">Install from WordPress.org</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
            In your WordPress dashboard, open Plugins → Add Plugin, search for PublishRank, then
            select Install and Activate. You can also open the official listing directly. If the
            directory has not yet refreshed to the latest version, use the ZIP method below.
          </p>
          <a
            href={PUBLISHRANK_WORDPRESS_PLUGIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex min-h-11 items-center gap-2 font-bold text-brand underline-offset-4 hover:underline"
          >
            Open PublishRank on WordPress.org{" "}
            <ExternalLink aria-hidden="true" className="h-4 w-4" />
          </a>
          <div className="mt-6">
            <StepCard step={orgStep} />
          </div>
        </section>

        <section id="zip-install" className="scroll-mt-24 pt-14">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">Option 2</p>
          <h2 className="mt-2 text-3xl font-extrabold">Upload the plugin ZIP</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
            This route uses the ZIP downloaded from this page. The package is named {DOWNLOAD_FILE};
            do not extract or re-compress it. The screenshots were captured on a WordPress test site
            and show the labels and controls used during a manual install.
          </p>
          <div className="mt-7 grid gap-5">
            {uploadSteps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </section>

        <section id="first-setup" className="scroll-mt-24 pt-14">
          <p className="text-xs font-extrabold uppercase tracking-[0.16em] text-brand">
            After activation
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">Finish setup and verify your site</h2>
          <p className="mt-3 max-w-3xl leading-7 text-muted-foreground">
            PublishRank opens its setup wizard on first activation. Work through the short steps,
            review the saved values, then confirm that the public page and sitemap look right.
          </p>
          <aside className="mt-6 flex gap-4 rounded-2xl border border-amber-500/30 bg-amber-500/5 p-5 sm:p-6">
            <ShieldAlert aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-amber-700" />
            <div>
              <h3 className="font-extrabold">If you choose a private sign-in address</h3>
              <p className="mt-2 text-sm leading-7 text-muted-foreground">
                Copy the new address before leaving the setup wizard. Confirm it within 10 minutes
                using the confirmation link or Access Shield. Until it is confirmed, the previous
                sign-in address returns automatically; do not discard the saved address.
              </p>
            </div>
          </aside>
          <div className="mt-7 grid gap-5">
            {setupSteps.map((step) => (
              <StepCard key={step.id} step={step} />
            ))}
          </div>
        </section>

        <section id="troubleshooting" className="scroll-mt-24 pt-14">
          <div className="rounded-2xl border bg-card p-6 shadow-[var(--shadow-card)] sm:p-8">
            <div className="flex items-start gap-4">
              <Wrench aria-hidden="true" className="mt-1 h-5 w-5 shrink-0 text-brand" />
              <div>
                <h2 className="text-2xl font-extrabold">Troubleshooting</h2>
                <ul className="mt-4 grid gap-4 text-sm leading-7 text-muted-foreground">
                  <li>
                    <strong className="text-foreground">“No valid plugins were found.”</strong>{" "}
                    Upload the original ZIP without unzipping it. Do not upload a ZIP containing
                    another ZIP.
                  </li>
                  <li>
                    <strong className="text-foreground">Upload limit or expired-link error.</strong>{" "}
                    Try the WordPress.org install route, or ask your host to raise the upload and
                    post size limits. You can also ask the host to install the ZIP for you.
                  </li>
                  <li>
                    <strong className="text-foreground">No Upload Plugin button.</strong> Check that
                    you are an administrator. On multisite, a network administrator may need to
                    install it.
                  </li>
                  <li>
                    <strong className="text-foreground">PublishRank is already installed.</strong>{" "}
                    Back up first, then upload the newer ZIP and use WordPress’s replace-current
                    option if it appears.
                  </li>
                  <li>
                    <strong className="text-foreground">Sitemap returns not found.</strong> Open
                    Settings → Permalinks, select Save Changes once, then retry the sitemap.
                  </li>
                </ul>
                <div className="mt-6 flex flex-wrap gap-5 text-sm font-bold text-brand">
                  <Link
                    to="/documentation"
                    className="inline-flex min-h-11 items-center gap-2 hover:underline"
                  >
                    <BookOpen aria-hidden="true" className="h-4 w-4" /> Read the handbook
                  </Link>
                  <Link
                    to="/support"
                    className="inline-flex min-h-11 items-center gap-2 hover:underline"
                  >
                    Get troubleshooting help <ArrowRight aria-hidden="true" className="h-4 w-4" />
                  </Link>
                  <a
                    href={RELEASES_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex min-h-11 items-center gap-2 hover:underline"
                  >
                    View releases <ExternalLink aria-hidden="true" className="h-4 w-4" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        <p className="mt-8 text-xs leading-6 text-muted-foreground">
          Screenshot note: these historical installation screenshots are from PublishRank
          {` ${INSTALLATION_SCREENSHOT_VERSION}`} and show sample publication content. Your
          dashboard and menu can look different depending on your WordPress version, theme, role and
          installed plugins.
        </p>
      </div>
    </PageFrame>
  );
}
