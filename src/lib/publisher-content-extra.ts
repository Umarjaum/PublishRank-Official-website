import type { ContentSection, PublisherPage } from "./publisher-content";

const UPDATED = "1 November 2026";

export const extraDocumentation: ContentSection[] = [
  {
    title: "06 / Download and install the plugin",
    paragraphs: [
      "Download PublishRank.zip from the latest GitHub release using any Download button on this site. In WordPress, open Plugins → Add New → Upload Plugin, choose the ZIP, select Install Now and then Activate. Do not unzip the file first.",
      "After activation, open PublishRank → Dashboard and run the Setup Wizard. Confirm your publication name, description, title separator and logo before enabling optional tools. Install on a staging copy before touching a live publication.",
    ],
    bullets: [
      "Upload the ZIP exactly as downloaded",
      "Activate, then review the Setup Wizard",
      "Check Technical health for conflicts before going live",
    ],
  },
  {
    title: "07 / Titles, descriptions and variables",
    paragraphs: [
      "Open PublishRank → Titles & Meta to edit the shared title separator and the global title and description templates. Templates use variables that resolve per page, so a single template can serve thousands of stories.",
      "Set a sensible default, then override the title or description on individual posts from the SEO Overrides panel when a story needs a more precise summary. Check the rendered page source after changes to confirm only one title and one description are emitted.",
    ],
    bullets: [
      "Global templates with dynamic variables",
      "Per-post custom titles and descriptions",
      "One configurable separator across titles and breadcrumbs",
    ],
  },
  {
    title: "08 / Social sharing and Open Graph",
    paragraphs: [
      "PublishRank generates Open Graph and Twitter/X metadata from the same publication identity used for search titles, so a shared link carries a consistent name, description and URL.",
      "Technical health recommends a fallback share image. Choose a landscape image around 1200 × 630 pixels that you are authorized to use, so stories without a featured image still look intentional when shared.",
    ],
  },
  {
    title: "09 / Structured data, breadcrumbs and the Schema Aggregator",
    paragraphs: [
      "Use Schema studio to configure your publisher, website and article markup. Choose the article type that fits each story and keep author and publisher details accurate. Breadcrumbs can be placed automatically or manually, with predefined or custom separators and breadcrumb schema output.",
      "The Schema Aggregator publishes a machine-readable feed of the structured data your site emits, which is useful for audits and AI-crawler discovery. If a theme already prints breadcrumbs, use the theme conflict guidance to keep one visible trail and one schema block.",
    ],
    bullets: [
      "Validate with Google’s Rich Results Test after template changes",
      "One breadcrumb trail, one breadcrumb schema block",
      "Review the aggregator endpoint after theme or block updates",
    ],
  },
  {
    title: "10 / Sitemaps, News sitemap and IndexNow",
    paragraphs: [
      "PublishRank serves a sitemap index with separate sitemaps for posts, pages, taxonomies, authors and news. Open Sitemap health to review endpoints, eligibility and generation status, then submit the sitemap index in your own Search Console account.",
      "The Google News sitemap covers recent articles within the news publication window. IndexNow can notify supported search engines when content changes, but it must be configured, and a notification is not a guarantee of indexing.",
    ],
    bullets: [
      "Pretty permalinks must be enabled for sitemap URLs to be served",
      "Large sitemaps are split into shards",
      "Exclusions keep private or low-value content out",
    ],
  },
  {
    title: "11 / Google Preferred Sources",
    paragraphs: [
      "The Google Preferred Sources tool generates your preferred-source link from your site address, then lets you choose Google’s official button or a custom styled link. Pick where it appears (top, above, middle, below or footer of content), which page types it covers and the alignment, then save.",
      "You can also place it manually with the shortcode [publishrank_preferred_source]. Google’s official button depends on Google’s own script loading and recognizing your publication; entering a domain does not register or verify it with Google.",
    ],
    bullets: [
      "Copy the link or the HTML code from the dashboard",
      "Preview the button before saving",
      "Reset everything to defaults at any time",
    ],
  },
  {
    title: "12 / Crawl optimization and robots.txt",
    paragraphs: [
      "Crawl Optimization offers opt-in switches to remove unwanted discovery metadata (shortlinks, RSD, oEmbed links, the generator tag), feed discovery links, low-value internal search URLs and unregistered query parameters. Options stay disabled until you choose them, and the discovery-markup options do not disable the underlying WordPress APIs.",
      "Redirect-based cleanup can affect tracking and site behavior. Test on staging, confirm analytics and preview links still work, and keep a record of what you changed. Robots.txt directives guide crawlers; they do not secure confidential content.",
    ],
    bullets: [
      "Enable one group at a time and re-check rendered output",
      "Known analytics, pagination, preview and REST parameters are preserved",
      "Add any extra allowed parameters your tools rely on",
    ],
  },
  {
    title: "13 / The Newsroom workspace",
    paragraphs: [
      "The Newsroom module adds a planning board, calendar, activity history, notifications, configuration and roles inside WordPress. Assign editors, reporters and contributors so story ownership and publication handoffs are visible.",
      "If you see a notice that Newsroom attachments are disabled, your server has no writable storage directory outside the public web root. Ask your host to provide a private directory outside DOCUMENT_ROOT before uploading confidential material.",
    ],
  },
  {
    title: "14 / AI discovery and llms.txt",
    paragraphs: [
      "The AI & llms.txt tool helps you review the optional llms.txt file and the discovery links added to your page head. Discovery files describe your site to crawlers; they do not guarantee citations, traffic or inclusion in AI answers.",
      "Review what you expose before publishing, and keep private or excluded content out of every discovery output.",
    ],
  },
  {
    title: "15 / Login protection with WP Hide Login",
    paragraphs: [
      "Move the WordPress login away from /wp-login.php to reduce automated sign-in attempts. Write down the new login address and store it somewhere safe before saving.",
      "This is a hardening step, not a replacement for strong passwords, two-factor authentication or a firewall. If you lose the new address, you can usually recover access by renaming the plugin folder over SFTP or in your host’s file manager.",
    ],
  },
  {
    title: "16 / Error reference",
    paragraphs: [
      "Use this list to resolve the most common installation and runtime messages. Always make a backup before changing server settings.",
    ],
    bullets: [
      "“The package could not be installed” or “Unable to create directory” — fix file permissions or free disk space, then upload again.",
      "“Plugin could not be activated because it triggered a fatal error” — check your host’s PHP version, deactivate other SEO plugins, and read wp-content/debug.log with WP_DEBUG_LOG enabled.",
      "“The uploaded file exceeds the upload_max_filesize directive” — raise upload_max_filesize and post_max_size, or install over SFTP into wp-content/plugins.",
      "Sitemap returns 404 — enable pretty permalinks, open Settings → Permalinks, press Save to refresh rewrite rules, and clear caches.",
      "Duplicate titles, canonicals or schema — another SEO plugin or the theme is printing the same tags; choose one owner for each output.",
      "Preferred Sources button is missing — confirm automatic placement or the shortcode is on, that an ad blocker is not stopping Google’s script, and that the page type is selected.",
      "Download does not start — open the GitHub releases page and choose PublishRank.zip from the latest release manually.",
    ],
  },
  {
    title: "17 / Back up, export and reset",
    paragraphs: [
      "Use Import / Export to back up and restore PublishRank settings, and Configuration history to review recorded changes and prior values. Settings persist across updates, and defaults are applied for new installations.",
      "Reset controls return a tool to its defaults. Export your settings first, because a reset cannot be undone from the dashboard.",
    ],
    bullets: [
      "Export before major configuration changes",
      "Keep a dated copy with the site release notes",
      "Test restore procedures on staging",
    ],
  },
  {
    title: "18 / Create an editorial ownership map",
    paragraphs: [
      "Write down who owns publication identity, article defaults, schema templates, sitemap exclusions, redirects, newsroom permissions and incident response. The owner does not have to do every task, but someone should be accountable for the final output.",
      "Keep this map close to the editorial handbook and revisit it after a team change, a theme migration or the installation of another SEO extension.",
    ],
    bullets: [
      "Editorial owner for article-level review",
      "Technical owner for templates and crawl controls",
      "Archive owner for redirects, corrections and stale content",
    ],
  },
  {
    title: "19 / Measure quality before measuring growth",
    paragraphs: [
      "Before comparing traffic, establish a small baseline: how many representative articles have one canonical URL, one article schema block, an accurate byline, a useful image and the intended sitemap membership. These are controllable signals that reveal process friction earlier than traffic reports.",
      "Review the baseline after releases and record exceptions rather than hiding them. A visible exception is easier to fix than a silent inconsistency.",
    ],
    bullets: [
      "Sample new, evergreen and updated articles",
      "Record exceptions with an owner and due date",
      "Compare output after theme or plugin changes",
    ],
  },
  {
    title: "20 / Build a quarterly archive review",
    paragraphs: [
      "Set a recurring review for high-value evergreen stories, important topic pages and URLs with strong inbound links. Check facts, authorship, images, internal links, redirects and whether the page still answers the reader’s intent.",
      "Do not update a date or headline solely to appear fresh. Make a substantive change, explain material corrections and keep the URL stable whenever the article remains the same work.",
    ],
  },
];

export const extraResources: ContentSection[] = [
  {
    title: "Prepare for Google News and Top Stories",
    paragraphs: [
      "Publish original, timely reporting with clear headlines, visible publication and update dates, named authors, an accurate About page, contact details and transparent corrections. Review Google’s current News content policies and make sure the public article matches its byline, dates and structured data.",
      "The optional /news-sitemap.xml endpoint lists only genuinely recent articles from the preceding 48 hours and can be empty when none qualify. Sitemaps help discovery; they do not guarantee indexing, Top Stories, Google News or Discover placement. Editorial quality and policy compliance remain essential.",
    ],
  },
  {
    title: "Write headlines and summaries that earn the click",
    paragraphs: [
      "A strong headline names the subject and the news. A strong meta description summarizes what the reader will learn without promising more than the story delivers.",
      "Use per-post overrides for important stories, and keep the template-based defaults for everything else.",
    ],
  },
  {
    title: "Choose images for search, Discover and social",
    paragraphs: [
      "Use relevant, high-quality original images that are at least 1200 pixels wide for important stories. Keep max-image-preview:large enabled and set each story’s representative image in its Open Graph metadata and article structured data. These are recommendations, not a way to force a Discover feature.",
      "Use accurate alternative text and a mobile-friendly crop. Keep the original file and create delivery-size copies rather than overwriting it. Avoid substituting a generic logo or text-heavy graphic for the article image.",
    ],
    bullets: [
      "Describe the image’s purpose, not just its subject",
      "Use one clear hero image for important stories",
      "Check crop, contrast and loading on mobile",
    ],
  },
  {
    title: "Build a trustworthy author and publisher graph",
    paragraphs: [
      "Readers and crawlers should be able to connect an article to a real author and a real publication. Use consistent author names, profile pages, bylines and publisher details across templates. If an article has multiple contributors, reflect the actual editorial relationship rather than assigning a generic byline.",
      "Review the visible byline and the JSON-LD together. Structured data should reinforce the page, not introduce credentials or relationships the reader cannot verify.",
    ],
  },
  {
    title: "Turn corrections into durable trust",
    paragraphs: [
      "A correction is part of the article’s lifecycle. Keep the original URL when the story remains relevant, make material changes visible, and update the modified date only when the content has substantively changed.",
      "When a story is withdrawn, choose the response based on the reader’s next best destination. A useful redirect is specific; an unrelated homepage redirect often creates a poor experience and weakens the archive.",
    ],
  },
  {
    title: "A monthly publisher health check",
    paragraphs: [
      "Once a month, sample a new article, an evergreen article, a topic archive and a recently updated page. Check the title, canonical, robots directives, author, dates, image, internal links, structured data and sitemap membership.",
      "Keep a short log of what changed and what needs follow-up. The goal is not a perfect score; it is a publishing system that remains understandable as the archive grows.",
    ],
    bullets: [
      "One fresh story",
      "One evergreen story",
      "One archive or taxonomy page",
      "One recently changed template",
    ],
  },
];

export const overrides: Pick<
  Record<string, PublisherPage>,
  "support" | "about" | "privacy" | "terms"
> = {
  support: {
    title: "Get clarity. Keep publishing.",
    eyebrow: "Help & support",
    image: "developer",
    intro:
      "Start with a focused check of the affected page, then use the contact form or GitHub to reach us with the details needed to understand the problem.",
    description:
      "Troubleshoot PublishRank metadata, sitemaps, schema, installation and WordPress conflicts, then contact the team or open a GitHub issue.",
    sections: [
      {
        title: "Metadata is missing or duplicated",
        paragraphs: [
          "Inspect the rendered HTML of one affected public page. Check for multiple titles, canonical links, robots tags or competing JSON-LD output. Review theme settings and other SEO plugins that may generate the same information.",
          "Clear relevant caches after a confirmed settings change and check again in a fresh browser session. A settings preview and the final published HTML can differ when caching or other extensions are involved.",
        ],
      },
      {
        title: "A sitemap is not behaving as expected",
        paragraphs: [
          "Open the sitemap address directly and check the response and XML. Review eligibility, exclusions and publication identity in Sitemap health. Check child references and whether a cache is serving old output. If you get a 404, enable pretty permalinks and re-save Settings → Permalinks.",
          "Distinguish a valid sitemap from confirmed indexing. Search Console reports provide evidence about Google’s processing; a plugin’s local check does not establish search engine inclusion.",
        ],
      },
      {
        title: "Installation or activation failed",
        paragraphs: [
          "Upload PublishRank.zip without unzipping it. If WordPress reports a fatal error, check your PHP version, deactivate other SEO plugins and review the debug log. If the upload exceeds your host’s limit, install over SFTP.",
          "The documentation’s error reference lists the most common messages and fixes.",
        ],
      },
      {
        title: "The download does not start",
        paragraphs: [
          "The Download button points to PublishRank.zip on the latest GitHub release. If your browser, network or a content blocker interrupts it, open the GitHub releases page and choose the file manually.",
          "Make sure the file you installed came from the project’s GitHub release.",
        ],
      },
      {
        title: "Gather a useful diagnostic report",
        paragraphs: [
          "Record the affected URL, expected behavior, actual behavior and the steps that reproduce the problem. Include relevant WordPress, PHP, theme and plugin environment information.",
          "Remove credentials, tokens and personal data from any report you share. A narrowly scoped example from staging is safer and more useful than a full site export.",
        ],
        bullets: [
          "One affected page or sitemap",
          "Steps to reproduce and recent changes",
          "Relevant errors with secrets removed",
          "What you have already checked",
        ],
      },
      {
        title: "How to reach us",
        paragraphs: [
          "Use the contact form for product questions, installation help, press and partnership enquiries. Use GitHub Issues for bug reports and feature requests so other publishers can follow the discussion.",
          "We read every message but do not promise response times or guaranteed solutions.",
        ],
      },
    ],
  },
  about: {
    title: "For the people who publish.",
    eyebrow: "About PublishRank",
    image: "newsroom",
    intro:
      "PublishRank is a free, open-source WordPress SEO project centered on the practical needs of bloggers, independent publications and newsrooms.",
    description:
      "Learn about PublishRank’s publisher-focused WordPress SEO approach, free and open-source release, editorial principles and transparent product limitations.",
    sections: [
      {
        title: "The publishing workflow comes first",
        paragraphs: [
          "The project brings story review, search presentation, publication identity, a dedicated newsroom and archive maintenance into one connected WordPress workflow. Editors need useful checks before publication; site owners need visibility into what their pages actually output.",
          "PublishRank is free and open source. Download the latest release directly from GitHub, test it on staging and join the project if you want to help.",
        ],
      },
      {
        title: "What is inside",
        paragraphs: [
          "More than 40 built-in tools and over 220 documented capabilities span titles and metadata, social sharing, structured data, XML and news sitemaps, breadcrumbs, redirects, crawl optimization, llms.txt discovery, Google Preferred Sources and login protection.",
          "Browse the full list on the Features page.",
        ],
      },
      {
        title: "Honest expectations",
        paragraphs: [
          "SEO scores are checklists, not forecasts. Structured data describes your content, not a shortcut to guaranteed rich results. Sitemaps support discovery, not automatic indexing.",
          "Optional integrations require configuration and operational testing. Evaluate the project on your own staging site, with your theme, content and editorial requirements.",
        ],
      },
      {
        title: "Respect for readers and reporting",
        paragraphs: [
          "Clear authorship, accurate summaries and thoughtful corrections are part of useful publishing. Optimization should make original work easier to find and understand, not replace it with exaggerated promises.",
          "This site does not publish a company address, founding date or named team, and does not invent them.",
        ],
      },
    ],
  },
  privacy: {
    title: "Privacy policy.",
    eyebrow: "Legal",
    image: "writing",
    updated: UPDATED,
    intro:
      "How the PublishRank website handles information. This page covers the website at publishrankseo.vercel.app, not every WordPress site that runs the plugin.",
    description:
      "Read how the PublishRank website handles contact form messages, hosting logs, cookies and third-party resources such as Google Fonts, Unsplash and GitHub.",
    sections: [
      {
        title: "What we collect",
        paragraphs: [
          "If you use the contact form, we receive the name, email address, topic and message you submit. We use them only to read and answer your message.",
          "Like any website, our hosting provider processes ordinary request data such as IP address, browser type, requested page and timestamp to deliver the site and protect it from abuse. This website does not use advertising trackers or account systems.",
        ],
      },
      {
        title: "How we use contact messages",
        paragraphs: [
          "Messages are delivered to the project’s inbox through an email delivery provider. We do not sell your information or use it for marketing. We keep messages only as long as needed to respond and for reasonable record-keeping, then delete them.",
          "Do not include passwords, API keys or confidential site data in a message.",
        ],
      },
      {
        title: "Third-party services",
        paragraphs: [
          "The site is hosted on Vercel. Fonts load from Google Fonts, some photographs load from Unsplash, and the plugin download is served by GitHub. These services receive ordinary request information such as your IP address and browser headers, and their own policies apply.",
          "Clicking a link to GitHub or another external site leaves this website.",
        ],
      },
      {
        title: "Cookies and local storage",
        paragraphs: [
          "The website does not set tracking cookies. It stores a single non-identifying value in your browser’s session storage to avoid replaying the loading animation. See the Cookies page for details.",
        ],
      },
      {
        title: "Advertising status",
        paragraphs: [
          "This website currently does not display Google AdSense, personalized advertising, analytics advertising cookies or remarketing tags. If advertising is introduced, this policy, the Cookie Policy and consent controls will be updated before ads are served, including the relevant Google disclosures and opt-out choices.",
        ],
      },
      {
        title: "Your choices and rights",
        paragraphs: [
          "You can ask what information we hold from your contact messages, and ask us to correct or delete it, by using the contact form. Depending on where you live, you may have additional rights under laws such as the GDPR or CCPA, including the right to complain to your local data protection authority.",
          "This website is not directed to children under 13 and does not knowingly collect their information.",
        ],
      },
      {
        title: "Website and plugin are different",
        paragraphs: [
          "This policy describes the website only. The PublishRank plugin runs on your own WordPress site, and its data handling depends on the features and integrations you enable. As the site operator you are responsible for your own privacy notice.",
        ],
      },
      {
        title: "Changes to this policy",
        paragraphs: [
          "We may update this policy as the website changes. The date at the top shows the latest revision. This page is general information and not legal advice; have counsel review it for your own circumstances.",
        ],
      },
    ],
  },
  terms: {
    title: "Terms of use.",
    eyebrow: "Legal",
    image: "writing",
    updated: UPDATED,
    intro:
      "The rules for using the PublishRank website and downloading the plugin from its GitHub release.",
    description:
      "Read the PublishRank website terms of use: acceptable use, downloads, licensing, SEO disclaimers, limitation of liability and changes.",
    sections: [
      {
        title: "Acceptance of these terms",
        paragraphs: [
          "By using this website you agree to these terms. If you do not agree, please do not use the site.",
        ],
      },
      {
        title: "Website content",
        paragraphs: [
          "The pages explain capabilities of the PublishRank plugin and general editorial practices. They are information, not a guarantee of rankings, traffic, search inclusion, rich results, Google News inclusion or AI citations.",
          "Third-party platform behavior and requirements change. Validate current requirements with the relevant service and test on your own WordPress site.",
        ],
      },
      {
        title: "Plugin download and licensing",
        paragraphs: [
          "The Download button links to PublishRank.zip on the project’s GitHub release. The plugin is distributed as open source; the license that accompanies the release governs your use of the plugin. These terms do not replace or change that license.",
          "Back up your site and test on staging before installing any release.",
        ],
      },
      {
        title: "Acceptable use",
        paragraphs: [
          "Do not misuse the website: no attempts to disrupt it, probe it for vulnerabilities without permission, send spam through the contact form, or scrape it in a way that harms availability. We may block access to protect the service.",
        ],
      },
      {
        title: "Intellectual property",
        paragraphs: [
          "The PublishRank name, logo and website design belong to the project. WordPress, Google, Yoast, Rank Math, SEOPress, All in One SEO and other names are trademarks of their owners and are used only to identify them; no affiliation or endorsement is implied.",
        ],
      },
      {
        title: "Disclaimer and limitation of liability",
        paragraphs: [
          "The website and plugin are provided “as is” and “as available” without warranties of any kind, to the fullest extent permitted by law. To that extent, the project and its contributors are not liable for indirect, incidental or consequential damages, loss of traffic, revenue or data arising from use of the website or the plugin.",
          "Some jurisdictions do not allow certain exclusions, so parts of this section may not apply to you.",
        ],
      },
      {
        title: "Changes and contact",
        paragraphs: [
          "We may change these terms; the date above shows the latest revision. Questions can be sent through the contact form. This page is general information and not legal advice.",
        ],
      },
    ],
  },
};

export const newPages: Record<
  "cookies" | "disclaimer" | "security" | "accessibility",
  PublisherPage
> = {
  cookies: {
    title: "Cookie policy.",
    eyebrow: "Legal",
    image: "writing",
    updated: UPDATED,
    intro: "What this website stores in your browser, and why.",
    description:
      "Learn what the PublishRank website stores in your browser: no tracking cookies, one session-storage value and the third-party resources the site loads.",
    sections: [
      {
        title: "Cookies",
        paragraphs: [
          "The PublishRank website does not set advertising, analytics or tracking cookies of its own, so no cookie banner is required for the site itself.",
        ],
      },
      {
        title: "Advertising and consent",
        paragraphs: [
          "No Google AdSense or other advertising network is active on this website at this time. If ads or personalized advertising are enabled later, the site operator will disclose the vendors, update this policy and implement the consent and opt-out controls required for the visitor’s region before loading non-essential advertising technology.",
        ],
      },
      {
        title: "Browser storage we use",
        paragraphs: [
          "The site writes one value named pr-splash to your browser’s session storage so the loading animation is not repeated during the same visit. It contains no personal information and is cleared when you close the tab.",
        ],
      },
      {
        title: "Third-party resources",
        paragraphs: [
          "Google Fonts, Unsplash, Vercel and GitHub serve resources to your browser and may process ordinary request data. We do not control cookies those services may set; see their policies for details.",
        ],
      },
      {
        title: "The plugin on your own site",
        paragraphs: [
          "Features you enable in the WordPress plugin, such as Google’s Preferred Sources script, may load third-party code that sets cookies on your own site. Disclose and obtain consent for those as your local law requires.",
        ],
      },
      {
        title: "Controlling storage",
        paragraphs: [
          "You can block or delete cookies and site data in your browser settings. The site works without them.",
        ],
      },
    ],
  },
  disclaimer: {
    title: "Disclaimer.",
    eyebrow: "Legal",
    image: "newsroom",
    updated: UPDATED,
    intro: "Important limits on what the information and tools on this website can promise.",
    description:
      "Read the PublishRank disclaimer: no guarantees of rankings, rich results or indexing, testimonial and comparison notes, and trademark acknowledgements.",
    sections: [
      {
        title: "No guarantee of results",
        paragraphs: [
          "SEO outcomes depend on content quality, competition, technical setup and decisions made by search engines. PublishRank and this website make no promise of rankings, traffic, indexing, Google News or Discover inclusion, rich results or AI citations.",
        ],
      },
      {
        title: "Reviews and testimonials",
        paragraphs: [
          "Ratings and quotes on this site reflect individual opinions. Experiences vary, and they are not a promise that you will achieve the same results.",
        ],
      },
      {
        title: "Comparisons",
        paragraphs: [
          "Comparisons with other plugins summarize publicly documented features at the time of writing. Plans and features change; verify with each vendor’s documentation before deciding.",
        ],
      },
      {
        title: "Technical and professional advice",
        paragraphs: [
          "Content here is general guidance, not legal, financial or professional advice. Always back up your site and test changes on staging first.",
        ],
      },
      {
        title: "Trademarks and images",
        paragraphs: [
          "WordPress, Google and other product names are trademarks of their respective owners; PublishRank is not affiliated with or endorsed by them. Photographs are provided by Unsplash contributors under the Unsplash License.",
        ],
      },
    ],
  },
  security: {
    title: "Security policy.",
    eyebrow: "Legal",
    image: "developer",
    updated: UPDATED,
    intro: "How to report a vulnerability, and how PublishRank approaches secure development.",
    description:
      "Report a PublishRank security vulnerability responsibly and learn about input validation, output escaping and hardening recommendations.",
    sections: [
      {
        title: "Reporting a vulnerability",
        paragraphs: [
          "If you believe you have found a security issue in the plugin or this website, please tell us privately through the contact form with the topic “Bug report” and the word SECURITY at the start of your message. Do not publish details or open a public issue until we have had a reasonable chance to fix it.",
          "Include the affected version, steps to reproduce and the potential impact. We will review reports in good faith but cannot promise a response time or a reward.",
        ],
      },
      {
        title: "Supported versions",
        paragraphs: [
          "Security fixes target the latest release on GitHub. Please update before reporting.",
        ],
      },
      {
        title: "How the plugin approaches security",
        paragraphs: [
          "PublishRank validates URLs and input, sanitizes settings, escapes frontend output and validates custom HTML and shortcode output. Dashboard configuration is protected by WordPress permissions.",
        ],
        bullets: [
          "URL and input validation",
          "Settings sanitization",
          "Frontend output escaping",
          "Custom HTML and shortcode validation",
        ],
      },
      {
        title: "Hardening your site",
        paragraphs: [
          "Keep WordPress, themes and plugins updated, use strong unique passwords and two-factor authentication, and keep backups. Built-in login URL protection and optional request controls reduce noise but do not replace a firewall.",
        ],
      },
      {
        title: "This website",
        paragraphs: [
          "The site is statically served with a server-rendered contact endpoint on Vercel. The contact form is protected by validation, a honeypot field and rate limiting. Never send credentials through it.",
        ],
      },
    ],
  },
  accessibility: {
    title: "Accessibility statement.",
    eyebrow: "Legal",
    image: "writing",
    updated: UPDATED,
    intro: "Our commitment to making the PublishRank website usable by everyone.",
    description:
      "Read the PublishRank accessibility statement: keyboard support, reduced-motion handling, accessible carousels and how to send feedback.",
    sections: [
      {
        title: "Our commitment",
        paragraphs: [
          "We aim to meet the Web Content Accessibility Guidelines (WCAG) 2.2 level AA. Accessibility is an ongoing effort, and we welcome feedback.",
        ],
      },
      {
        title: "What we do",
        paragraphs: [
          "Pages use semantic headings and landmarks, visible keyboard focus, text alternatives for meaningful images and labeled form fields with clear error messages.",
          "Auto-scrolling carousels pause on hover and focus, include play and pause controls, and do not auto-play when your system requests reduced motion. The loading animation is skipped in that case as well.",
        ],
        bullets: [
          "Keyboard-operable navigation, carousels, dialogs and forms",
          "Reduced-motion preference respected",
          "Alt text on images and labels on form controls",
        ],
      },
      {
        title: "Known limitations",
        paragraphs: [
          "Some screenshots of the plugin dashboard show dense interfaces; we describe them in text alongside each image. Third-party embeds and fonts are outside our control.",
        ],
      },
      {
        title: "Send feedback",
        paragraphs: [
          "If you meet a barrier on this site, tell us through the contact form with the page address and what you were trying to do. We will try to provide the information in another format or fix the issue.",
        ],
      },
    ],
  },
};
