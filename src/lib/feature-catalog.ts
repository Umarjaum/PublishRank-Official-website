// The complete PublishRank feature list (237 capabilities) grouped by area.
// Each category's items are stored one per line to keep the source easy to edit.
export type FeatureCategory = { id: string; title: string; summary: string; items: string[] };

const lines = (s: string) =>
  s
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const featureCatalog: FeatureCategory[] = [
  { id: "core-seo", title: "Core SEO", summary: "Titles, descriptions, canonicals, robots and head metadata.", items: lines(`
SEO title management
Meta description management
Custom SEO titles
Custom meta descriptions
Dynamic SEO title templates
Dynamic meta description templates
SEO variable system
Post-specific SEO metadata
Global SEO configuration
Homepage SEO configuration
Search appearance optimization
Canonical URL generation
Canonical metadata output
Robots meta directives
Indexing controls
Crawling controls
Technical SEO settings
Social SEO settings
News SEO settings
HTML head metadata generation`) },
  { id: "titles-metadata", title: "SEO Titles and Metadata", summary: "Variables, overrides and a consistent separator.", items: lines(`
Dynamic metadata variables
Post-specific variable resolution
Global variable resolution
Automatic metadata generation
Custom metadata overrides
Configurable title separator
Setup Wizard title separator setting
Dashboard title separator setting
Publication identity integration
Consistent SEO metadata output`) },
  { id: "social-seo", title: "Social SEO", summary: "Open Graph and Twitter/X metadata tied to your identity.", items: lines(`
Open Graph metadata
Social sharing titles
Social sharing descriptions
Social sharing URLs
Twitter/X metadata
Twitter/X titles
Twitter/X descriptions
Social metadata configuration
Social metadata integration with SEO titles
Social metadata integration with publication identity`) },
  {
    id: "mastodon-publishing",
    title: "Mastodon Publishing",
    summary: "Share WordPress stories to Mastodon with controls for visibility, media and accessibility.",
    items: lines(`
Mastodon server connection
Encrypted access-token storage
Profile verification with rel=me
fediverse:creator author attribution
Automatic post sharing on publish
Manual sharing from the editor
Per-post sharing controls
Custom status templates
Hashtags from WordPress post tags
Public, unlisted or private visibility
Per-post content warnings
Optional featured-image attachments
Media descriptions from image alt text
Instance-aware character limits
Share history with status links`),
  },
  { id: "structured-data", title: "Structured Data and Schema", summary: "Connected JSON-LD for your publication, site and stories.", items: lines(`
Structured data generation
Article schema functionality
Organization schema functionality
Website schema functionality
Publication identity in schema
Breadcrumb schema
Schema output controls
Schema endpoint
Structured data configuration
Schema discovery infrastructure`) },
  { id: "xml-sitemaps", title: "XML Sitemaps", summary: "Separate, scalable sitemaps for every content type.", items: lines(`
XML sitemap index
Post sitemaps
Page sitemaps
Taxonomy sitemaps
Author sitemaps
News sitemaps
Sitemap index linking
XML sitemap output
Sitemap stylesheet support
Raw XML output
Dedicated sitemap endpoints
Separate sitemaps by content type
News-specific sitemap functionality
Large-sitemap architecture
Sitemap sharding considerations`) },
  { id: "news-seo", title: "News SEO and Publishing", summary: "Tools shaped around online newspapers and newsrooms.", items: lines(`
News SEO functionality
News sitemap generation
Article-oriented optimization
Publisher-focused metadata
Publication identity configuration
News-related structured data
News SEO output
Publisher-oriented SEO workflow
Online newspaper SEO tools
News publishing optimization`) },
  { id: "breadcrumbs", title: "Breadcrumbs", summary: "Visible trails and breadcrumb schema with full placement control.", items: lines(`
Breadcrumb generation
Visible frontend breadcrumbs
Breadcrumb structured data
Breadcrumb visibility controls
Breadcrumb display settings
Automatic breadcrumb placement
Manual breadcrumb placement options
Breadcrumb separator configuration
Predefined separator styles
Custom breadcrumb separators
Unicode separator support
Breadcrumb styling controls
Publication name in breadcrumb trails
Breadcrumb output controls
Breadcrumb diagnostics
Theme breadcrumb conflict guidance
Default breadcrumb visibility configuration
WordPress theme compatibility considerations
Page-builder compatibility considerations`) },
  { id: "website-identity", title: "Website Identity", summary: "One publication identity across SEO, social, schema and breadcrumbs.", items: lines(`
Publication name configuration
Publication description configuration
Website identity override functionality
Identity integration with SEO metadata
Identity integration with Open Graph
Identity integration with schema
Identity integration with breadcrumbs
Setup Wizard identity settings
Publication identity consistency
Theme identity override controls`) },
  { id: "dashboard", title: "Dashboard and Configuration", summary: "A centralized admin with sensible defaults and safe resets.", items: lines(`
PublishRank administration interface
SEO settings dashboard
Centralized SEO configuration
Setup Wizard
Dashboard navigation
Technical SEO settings
Social SEO settings
News SEO settings
Breadcrumb settings
Title separator settings
Publication identity settings
Schema settings
Sitemap settings
Configuration defaults
Settings persistence
Settings reset functionality
Default-value handling
Settings migration considerations
Dashboard interface controls
Configuration notices
SEO tool management`) },
  { id: "preferred-sources", title: "Google Preferred Sources", summary: "Let readers add your publication as a preferred source on Google.", items: lines(`
Preferred Sources configuration
Preferred Sources URL configuration
Dynamic Preferred Sources URL handling
Official Google JavaScript integration
Google button implementation
Custom link or button option
Shortcode support
Dashboard settings
Custom HTML editor
Copy functionality
Preview functionality
Reset functionality
URL validation
Input sanitization
Installation instructions
Responsive presentation
Frontend diagnostics
Default settings management
Shortcode usage guidance`) },
  {
    id: "ai-discovery",
    title: "AI Crawler Discovery",
    summary: "Optional llms.txt and Schema Aggregator discovery, with broader AI features rolling out soon.",
    items: lines(`
llms.txt support
llms.txt discovery links
llms.txt HTML head references
llms.txt identification metadata
describedby resource relationship
AI-crawler discovery infrastructure
Schema endpoint discovery`),
  },
  { id: "search-engine-tools", title: "Search Engine Tools", summary: "Verification, indexing and sitemap discovery support.", items: lines(`
Search Console-related functionality
Indexing-related tools
Google-oriented SEO infrastructure
Verification-related functionality
Sitemap discovery support
Search engine indexing configuration
Robots directives
Crawl-related controls`) },
  { id: "robots-crawl", title: "Robots and Crawl Optimization", summary: "Crawl directives coordinated with your SEO metadata.", items: lines(`
Robots configuration
Crawl optimization controls
Search engine crawler directives
Technical crawl controls
Robots output management
Crawl directive coordination with SEO metadata`) },
  { id: "redirects", title: "Redirects", summary: "Redirect management infrastructure for a healthy archive.", items: lines(`
Redirect-related functionality
Redirect management infrastructure
Redirect configuration`) },
  { id: "author-taxonomy", title: "Author and Taxonomy SEO", summary: "Authors and taxonomies treated as first-class SEO surfaces.", items: lines(`
Author sitemap support
Taxonomy sitemap support
Author-related SEO output
Taxonomy-related SEO output
Author URL handling
WordPress taxonomy integration`) },
  { id: "login", title: "Login Customization", summary: "Built-in WP Hide Login functionality.", items: lines(`
WordPress login customization
WP Hide Login-related functionality
Login URL customization
Login-related configuration`) },
  { id: "wordpress", title: "WordPress Integration", summary: "Native plugin architecture with theme-safe output.", items: lines(`
WordPress plugin architecture
WordPress dashboard integration
Frontend metadata output
WordPress content integration
Content-specific SEO configuration
Theme compatibility controls
Duplicate-output prevention considerations
Theme breadcrumb conflict handling
Settings migration
Default settings for new installations
Upgrade-related settings behavior
SEO output consistency`) },
  { id: "security", title: "Security and Validation", summary: "Sanitized input, validated URLs and escaped output.", items: lines(`
URL validation
Input validation
Settings sanitization
Frontend output escaping
Dashboard configuration security
Custom HTML validation
Shortcode output validation
Secure configuration handling`) },
  { id: "frontend-output", title: "Frontend SEO Output", summary: "Everything the plugin emits on your public pages.", items: lines(`
HTML head metadata
Canonical metadata
Social metadata output
Structured data output
Visible breadcrumbs
Breadcrumb schema output
Sitemap endpoint output
News sitemap output
llms.txt discovery metadata
Publication identity consistency
Title separator consistency
SEO output categorization`) },
  { id: "diagnostics", title: "Diagnostics and Maintenance", summary: "Built-in checks and a tested release process.", items: lines(`
Preferred Sources diagnostics
Breadcrumb diagnostics
Configuration validation
Settings reset testing
Default-value testing
Frontend output checks
PHP syntax validation
JavaScript syntax validation
ZIP package integrity checks
Regression testing considerations
WordPress compatibility testing
Integration testing considerations`) },
];

export const featureCount = featureCatalog.reduce((n, c) => n + c.items.length, 0);

// Tools visible in the plugin's own "Tools Showcase" dashboard (41 tools).
export const toolHighlights: Array<{ group: string; title: string; text: string }> = [
  { group: "Search & discovery", title: "Schema studio", text: "Configure publisher, article and media structured data for your site." },
  { group: "Search & discovery", title: "Sitemap health", text: "Check sitemap endpoints, article eligibility and generation status." },
  { group: "Search & discovery", title: "IndexNow", text: "Configure supported search-engine notifications when content changes." },
  { group: "Search & discovery", title: "Google Preferred Sources", text: "Generate your link and the code for Google’s “Add to preferred sources” button." },
  { group: "Search & discovery", title: "Crawl optimization", text: "Manage optional discovery links, feed, search and URL cleanup controls." },
  { group: "Search & discovery", title: "AI & llms.txt", text: "Review the optional llms.txt file and AI-crawler guidance for your site." },
  { group: "Search & discovery", title: "Schema Aggregator", text: "Publish and verify a complete JSON-LD content feed for AI crawlers and llms.txt." },
  { group: "Content & publishing", title: "SEO score", text: "Review practical content and technical checks across the site." },
  { group: "Content & publishing", title: "Google Discover image", text: "Inspect image dimensions and create a resized copy without replacing the original." },
  { group: "Content & publishing", title: "Newsroom", text: "Planning board, calendar, activity history, notifications and roles in one editorial workspace." },
  {
    group: "Content & publishing",
    title: "Mastodon publishing",
    text: "Share posts with custom templates, server-aware character limits, content warnings and accessible featured media.",
  },
  { group: "Content & publishing", title: "Internal links & link intelligence", text: "Find internal-link opportunities and strengthen related content paths." },
  { group: "Content & publishing", title: "Local SEO & author expertise", text: "Configure local business identity and publication expertise information." },
];
