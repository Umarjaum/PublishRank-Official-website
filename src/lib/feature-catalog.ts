// PublishRank feature catalog: carried-forward 2.20.20 entries plus source-backed 2.21.0 additions.
// Each category's items are stored one per line to keep the source easy to edit.
export type FeatureCategory = {
  id: string;
  title: string;
  summary: string;
  items: string[];
  badge?: string;
};

const lines = (s: string) =>
  s
    .trim()
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

export const featureCatalog: FeatureCategory[] = [
  {
    id: "core-seo",
    title: "Core SEO",
    summary: "Titles, descriptions, canonicals, robots and head metadata.",
    items: lines(`
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
HTML head metadata generation`),
  },
  {
    id: "titles-metadata",
    title: "SEO Titles and Metadata",
    summary: "Variables, overrides and a consistent separator.",
    items: lines(`
Dynamic metadata variables
Post-specific variable resolution
Global variable resolution
Automatic metadata generation
Custom metadata overrides
Configurable title separator
Setup Wizard title separator setting
Dashboard title separator setting
Publication identity integration
Consistent SEO metadata output`),
  },
  {
    id: "social-seo",
    title: "Social SEO",
    summary: "Open Graph and Twitter/X metadata tied to your identity.",
    items: lines(`
Open Graph metadata
Social sharing titles
Social sharing descriptions
Social sharing URLs
Twitter/X metadata
Twitter/X titles
Twitter/X descriptions
Social metadata configuration
Social metadata integration with SEO titles
Social metadata integration with publication identity`),
  },
  {
    id: "mastodon-publishing",
    title: "Mastodon Publishing",
    summary:
      "Share WordPress stories to Mastodon with controls for visibility, media and accessibility.",
    items: lines(`
Mastodon server connection
Encrypted access-token storage
Profile verification with rel=me and a copyable HTML-head snippet
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
  {
    id: "structured-data",
    title: "Structured Data and Schema",
    summary: "Connected JSON-LD for your publication, site and stories.",
    items: lines(`
Structured data generation
Article schema functionality
Organization schema functionality
Website schema functionality
Publication identity in schema
Breadcrumb schema
Schema output controls
Schema endpoint
Structured data configuration
Schema discovery infrastructure`),
  },
  {
    id: "xml-sitemaps",
    title: "XML Sitemaps",
    summary: "Separate, scalable sitemaps for every content type.",
    items: lines(`
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
Sitemap sharding considerations`),
  },
  {
    id: "news-seo",
    title: "News SEO and Publishing",
    summary: "Tools shaped around online newspapers and newsrooms.",
    items: lines(`
News SEO functionality
News sitemap generation
Article-oriented optimization
Publisher-focused metadata
Publication identity configuration
News-related structured data
News SEO output
Publisher-oriented SEO workflow
Online newspaper SEO tools
News publishing optimization`),
  },
  {
    id: "breadcrumbs",
    title: "Breadcrumbs",
    summary: "Visible trails and breadcrumb schema with full placement control.",
    items: lines(`
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
Page-builder compatibility considerations`),
  },
  {
    id: "website-identity",
    title: "Website Identity",
    summary: "One publication identity across SEO, social, schema and breadcrumbs.",
    items: lines(`
Publication name configuration
Publication description configuration
Website identity override functionality
Identity integration with SEO metadata
Identity integration with Open Graph
Identity integration with schema
Identity integration with breadcrumbs
Setup Wizard identity settings
Publication identity consistency
Theme identity override controls`),
  },
  {
    id: "dashboard",
    title: "Dashboard and Configuration",
    summary: "A centralized admin with sensible defaults and safe resets.",
    items: lines(`
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
SEO tool management`),
  },
  {
    id: "preferred-sources",
    title: "Google Preferred Sources",
    summary: "Let readers add your publication as a preferred source on Google.",
    items: lines(`
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
Shortcode usage guidance`),
  },
  {
    id: "ai-discovery",
    title: "AI Crawler Discovery",
    summary:
      "Optional llms.txt and Schema Aggregator discovery, with broader AI features rolling out soon.",
    items: lines(`
llms.txt support
llms.txt discovery links
llms.txt HTML head references
llms.txt identification metadata
describedby resource relationship
AI-crawler discovery infrastructure
Schema endpoint discovery`),
  },
  {
    id: "search-engine-tools",
    title: "Search Engine Tools",
    summary: "Verification, indexing and sitemap discovery support.",
    items: lines(`
Search Console-related functionality
Indexing-related tools
Google-oriented SEO infrastructure
Verification-related functionality
Sitemap discovery support
Search engine indexing configuration
Robots directives
Crawl-related controls`),
  },
  {
    id: "robots-crawl",
    title: "Robots and Crawl Optimization",
    summary: "Crawl directives coordinated with your SEO metadata.",
    items: lines(`
Robots configuration
Crawl optimization controls
Search engine crawler directives
Technical crawl controls
Robots output management
Crawl directive coordination with SEO metadata`),
  },
  {
    id: "redirects",
    title: "Redirects",
    summary: "Redirect management infrastructure for a healthy archive.",
    items: lines(`
Redirect-related functionality
Redirect management infrastructure
Redirect configuration`),
  },
  {
    id: "author-taxonomy",
    title: "Author and Taxonomy SEO",
    summary: "Authors and taxonomies treated as first-class SEO surfaces.",
    items: lines(`
Author sitemap support
Taxonomy sitemap support
Author-related SEO output
Taxonomy-related SEO output
Author URL handling
WordPress taxonomy integration`),
  },
  {
    id: "login",
    title: "WP Hide Login",
    summary:
      "A dedicated PublishRank settings page for custom login URLs and blocked-visitor handling.",
    items: lines(`
Dedicated PublishRank settings page, separate from WordPress Settings
Custom WordPress login URL
Blocked-visitor redirect setting
New module badge in the PublishRank menu and dashboard`),
  },
  {
    id: "wordpress",
    title: "WordPress Integration",
    summary: "Native plugin architecture with theme-safe output.",
    items: lines(`
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
SEO output consistency`),
  },
  {
    id: "security",
    title: "Security and Validation",
    summary: "Sanitized input, validated URLs and escaped output.",
    items: lines(`
URL validation
Input validation
Settings sanitization
Frontend output escaping
Dashboard configuration security
Custom HTML validation
Shortcode output validation
Secure configuration handling`),
  },
  {
    id: "frontend-output",
    title: "Frontend SEO Output",
    summary: "Everything the plugin emits on your public pages.",
    items: lines(`
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
SEO output categorization`),
  },
  {
    id: "diagnostics",
    title: "Diagnostics and Maintenance",
    summary: "Built-in checks and a tested release process.",
    items: lines(`
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
Integration testing considerations`),
  },
  // Source-backed 2.20.20 feature checklist, carried forward into 2.21.0.
  {
    id: "verified-a",
    title: "SEO Editor and Content Optimization",
    summary:
      "Editor-side metadata, previews and content checks; an analysis score is a checklist, not a ranking forecast.",
    items: [
      "SEO title editor.",
      "Meta description editor.",
      "Primary focus keyword.",
      "Up to ten secondary keyphrases.",
      "Synonyms and related keyphrases.",
      "Live SEO score out of 100.",
      "Keyword placement analysis.",
      "Keyword density.",
      "Keyword distribution.",
      "Title keyword analysis.",
      "Description keyword analysis.",
      "URL slug analysis.",
      "Opening paragraph analysis.",
      "Subheading analysis.",
      "Image alt-text analysis.",
      "Content readability.",
      "Article intelligence.",
      "Content context.",
      "SEO recommendations.",
      "Search snippet preview.",
      "Google desktop and mobile previews.",
      "Facebook and LinkedIn previews.",
      "X/Twitter previews.",
      "Canonical URL.",
      "Robots directives.",
      "Open Graph metadata.",
      "X/Twitter metadata.",
      "Automatic metadata fallbacks.",
      "Metadata template variables.",
      "Per-post SEO overrides.",
      "Language-specific SEO metadata.",
      "Gutenberg integration.",
      "Classic Editor integration.",
      "Floating SEO analysis panel.",
      "Movable SEO editor panel.",
      "SEO analysis sidebar.",
      "Tabbed SEO editor interface.",
      "Live keyword field saving.",
    ],
  },
  {
    id: "verified-b",
    title: "Structured Data and Schema Engine",
    summary:
      "Selectable schema profiles and connected JSON-LD output; structured data does not guarantee rich results.",
    items: [
      "Organization.",
      "Person.",
      "WebSite.",
      "WebPage.",
      "Article.",
      "NewsArticle.",
      "BlogPosting.",
      "ReportageNewsArticle.",
      "AnalysisNewsArticle.",
      "OpinionNewsArticle.",
      "BackgroundNewsArticle.",
      "Opinion and review-oriented article types.",
      "ScholarlyArticle.",
      "TechnicalArticle.",
      "Sponsored article markup.",
      "LiveBlogPosting.",
      "VideoObject.",
      "ImageGallery.",
      "AudioObject.",
      "PodcastEpisode.",
      "FAQPage.",
      "Event.",
      "Product.",
      "Recipe.",
      "Review.",
      "JobPosting.",
      "LocalBusiness.",
      "BreadcrumbList.",
      "Author-related structured data.",
      "Connected JSON-LD graph.",
      "Schema aggregation.",
      "Schema discovery endpoint.",
      "Schema validation tools.",
      "Live JSON-LD preview.",
    ],
  },
  {
    id: "verified-c",
    title: "Local SEO — 134 Business Types",
    summary:
      "The plugin source registry contains 134 selectable business options across 14 niches. These are options, not separate Schema.org classes.",
    items: [
      "134 selectable business types.",
      "14 business niches.",
      "Business profile management.",
      "Business name and legal name.",
      "Business description.",
      "Address and geographical coordinates.",
      "Service-area businesses.",
      "Hidden street addresses.",
      "Opening hours.",
      "Holiday and special hours.",
      "Telephone and email.",
      "Website.",
      "Business logo and photographs.",
      "Price range.",
      "Payment methods.",
      "Accepted currencies.",
      "Languages.",
      "Areas served.",
      "Services and OfferCatalog.",
      "Booking links and ReserveAction.",
      "Founding date.",
      "Tax identification number.",
      "Parent organization.",
      "Business-specific properties.",
      "Restaurants: cuisine, menus and reservations.",
      "Hotels: check-in, check-out, rooms, official star rating and pets.",
      "Medical businesses: medical specialties and new-patient status.",
      "Banks: fees page.",
      "Shops and car dealerships: brands.",
      "Venues: capacity and free-entry information.",
      "Schools and veterinary businesses: appropriate LocalBusiness mappings.",
      "Funeral homes: LocalBusiness with additionalType where applicable.",
      "All 134 registry options, grouped by niche (display label followed by Schema.org type key):",
      "General (3): Local business (generic) [LocalBusiness], Professional service (generic) [ProfessionalService], Store / shop (generic) [Store]",
      "Food & drink (10): Food establishment (generic) [FoodEstablishment], Restaurant [Restaurant], Fast food restaurant [FastFoodRestaurant], Cafe / coffee shop [CafeOrCoffeeShop], Bakery [Bakery], Ice cream shop [IceCreamShop], Bar or pub [BarOrPub], Brewery [Brewery], Winery [Winery], Distillery [Distillery]",
      "Health & medical (8): Medical business (generic) [MedicalBusiness], Medical clinic [MedicalClinic], Doctor / physician practice [Physician], Hospital [Hospital], Dentist [Dentist], Optician [Optician], Pharmacy / drugstore [Pharmacy], Veterinary care [VeterinaryCare]",
      "Beauty & wellness (7): Health & beauty (generic) [HealthAndBeautyBusiness], Beauty salon [BeautySalon], Hair salon [HairSalon], Nail salon [NailSalon], Day spa [DaySpa], Tattoo parlor [TattooParlor], Health club / gym [HealthClub]",
      "Home & construction services (9): Home & construction (generic) [HomeAndConstructionBusiness], Electrician [Electrician], Plumber [Plumber], Heating / ventilation / AC (HVAC) [HVACBusiness], Roofing contractor [RoofingContractor], House painter [HousePainter], General contractor [GeneralContractor], Locksmith [Locksmith], Moving company [MovingCompany]",
      "Automotive (10): Automotive (generic) [AutomotiveBusiness], Auto body shop [AutoBodyShop], Car dealership [AutoDealer], Auto parts store [AutoPartsStore], Car rental [AutoRental], Auto repair shop [AutoRepair], Car wash [AutoWash], Gas station [GasStation], Motorcycle dealer [MotorcycleDealer], Motorcycle repair [MotorcycleRepair]",
      "Legal, finance & real estate (11): Legal service (generic) [LegalService], Attorney / law firm [Attorney], Notary [Notary], Accountant / bookkeeping [AccountingService], Financial service (generic) [FinancialService], Bank or credit union [BankOrCreditUnion], ATM [AutomatedTeller], Insurance agency [InsuranceAgency], Real estate agency [RealEstateAgent], Employment / staffing agency [EmploymentAgency], Travel agency [TravelAgency]",
      "Lodging & travel stays (8): Lodging (generic) [LodgingBusiness], Hotel [Hotel], Motel [Motel], Hostel [Hostel], Bed & breakfast [BedAndBreakfast], Vacation rental [VacationRental], Campground [Campground], Resort [Resort]",
      "Retail & shopping (30): Shopping center / mall [ShoppingCenter], Bike store [BikeStore], Book store [BookStore], Clothing store [ClothingStore], Computer store [ComputerStore], Convenience store [ConvenienceStore], Department store [DepartmentStore], Electronics store [ElectronicsStore], Florist [Florist], Furniture store [FurnitureStore], Garden store [GardenStore], Grocery store [GroceryStore], Hardware store [HardwareStore], Hobby shop [HobbyShop], Home goods store [HomeGoodsStore], Jewelry store [JewelryStore], Liquor store [LiquorStore], Men's clothing store [MensClothingStore], Mobile phone store [MobilePhoneStore], Movie rental store [MovieRentalStore], Music store [MusicStore], Office equipment store [OfficeEquipmentStore], Outlet store [OutletStore], Pawn shop [PawnShop], Pet store [PetStore], Shoe store [ShoeStore], Sporting goods store [SportingGoodsStore], Tire shop [TireShop], Toy store [ToyStore], Wholesale store [WholesaleStore]",
      "Entertainment & nightlife (8): Entertainment (generic) [EntertainmentBusiness], Amusement park [AmusementPark], Art gallery [ArtGallery], Casino [Casino], Comedy club [ComedyClub], Movie theater / cinema [MovieTheater], Nightclub [NightClub], Internet cafe [InternetCafe]",
      "Sports & recreation (9): Sports venue (generic) [SportsActivityLocation], Bowling alley [BowlingAlley], Exercise gym [ExerciseGym], Golf course [GolfCourse], Public swimming pool [PublicSwimmingPool], Ski resort [SkiResort], Sports club [SportsClub], Stadium / arena [StadiumOrArena], Tennis complex [TennisComplex]",
      "Education & child care (7): School / academy / tuition centre (generic) [EducationalOrganization], Child care / daycare [ChildCare], Preschool / nursery [Preschool], Primary / elementary school [ElementarySchool], Middle school [MiddleSchool], High school [HighSchool], College / university [CollegeOrUniversity]",
      "Services & community (7): Funeral home [FuneralHome], Dry cleaner / laundry [DryCleaningOrLaundry], Self storage [SelfStorage], Recycling center [RecyclingCenter], Animal shelter [AnimalShelter], Library [Library], Tourist information center [TouristInformationCenter]",
      "Public services & media (7): Government office [GovernmentOffice], Post office [PostOffice], Police station [PoliceStation], Fire station [FireStation], Emergency service (generic) [EmergencyService], Radio station [RadioStation], Television station [TelevisionStation]",
    ],
  },
  {
    id: "verified-d",
    title: "Technical SEO",
    summary: "Sitemaps, crawl directives, metadata output, and performance and discovery controls.",
    items: [
      "XML sitemap generation.",
      "Sitemap index.",
      "Post sitemap.",
      "Page sitemap.",
      "Taxonomy sitemap.",
      "Author sitemap.",
      "Image sitemap.",
      "Video sitemap.",
      "Google News sitemap.",
      "Sitemap browser.",
      "Sitemap health checks.",
      "Sitemap diagnostics.",
      "Sitemap filtering.",
      "Sitemap caching.",
      "Sitemap pagination.",
      "Robots.txt management.",
      "Global robots directives.",
      "Per-post robots directives.",
      "Noindex and nofollow.",
      "Crawl optimization.",
      "Hreflang.",
      "Breadcrumbs.",
      "Featured image preloading.",
      "Resource hints.",
      "Preconnect.",
      "DNS prefetch.",
      "Link prefetching.",
      "Speculation Rules.",
      "Feed optimization.",
      "llms.txt.",
      "llms-full.txt.",
      "Schema discovery.",
      "Site verification.",
      "Technical health checks.",
    ],
  },
  {
    id: "verified-e",
    title: "Search Engine Integrations",
    summary:
      "Optional authenticated or external search services, with configuration and account prerequisites.",
    items: [
      "Google Search Console.",
      "Google OAuth.",
      "Search performance.",
      "Search queries.",
      "Search pages.",
      "Daily and hourly metrics where implemented.",
      "Discover performance.",
      "Google News performance.",
      "URL Inspection.",
      "Property selection.",
      "IndexNow.",
      "Manual URL submission.",
      "Automatic IndexNow notifications.",
      "Baidu URL submission.",
      "Google Preferred Sources.",
    ],
  },
  {
    id: "verified-f",
    title: "Internal Linking and Link Intelligence",
    summary: "Content relationships, link opportunities and site-health workflows.",
    items: [
      "Internal link recommendations.",
      "Content relationship analysis.",
      "Content Graph.",
      "Orphaned content detection.",
      "Link opportunities.",
      "Broken-link detection.",
      "Redirecting-link detection.",
      "Redirect-chain analysis.",
      "Sitewide broken-link checks.",
      "Scheduled link auditing.",
      "Per-article link rechecking.",
      "External-link checking when enabled.",
      "Link health reporting.",
    ],
  },
  {
    id: "verified-g",
    title: "Newsroom and Editorial Management",
    summary: "Editorial planning, team workflows, publisher metadata and social publishing tools.",
    items: [
      "Newsroom dashboard.",
      "Story pitches.",
      "Editorial assignments.",
      "Editorial workflow.",
      "Story planning.",
      "Editorial calendar.",
      "Planning board.",
      "Scheduled story management.",
      "Newsroom activity.",
      "Notifications.",
      "Newsroom configuration.",
      "Role-based newsroom permissions.",
      "Author expertise.",
      "Author credentials.",
      "Publisher Toolkit.",
      "Bulk SEO editing.",
      "Image alt-text assistance.",
      "Publishing workflow.",
      "Mastodon publishing.",
      "Mastodon profile verification.",
      'Author verification using rel="me".',
      "Fediverse author attribution.",
      "Sharing history.",
      "Per-post sharing controls.",
    ],
  },
  {
    id: "verified-h",
    title: "Redirects and 404 Monitoring",
    summary:
      "Redirect configuration and local request monitoring, with documented retention and privacy limits.",
    items: [
      "301 redirects.",
      "302 redirects.",
      "Redirect management.",
      "Regex redirects where implemented.",
      "Redirect validation.",
      "Redirect-loop detection.",
      "404 monitoring.",
      "Normalized URL paths.",
      "Browser/mobile/crawler categories.",
      "Referrer tracking.",
      "Searchable and sortable logs.",
      "Noise suppression.",
      "Bounded storage.",
      "90-day retention.",
      "Redirect creation from 404 entries.",
    ],
  },
  {
    id: "verified-i",
    title: "Private Login",
    summary: "Optional login-route customization; not a firewall or complete security solution.",
    items: [
      "Custom sign-in URL.",
      "Default login-route handling.",
      "wp-login.php handling.",
      "wp-register.php handling.",
      "wp-admin request handling.",
      "Custom redirect URL.",
      "Multisite defaults.",
      "Migration of existing settings.",
      "Emergency recovery constant:",
      "Dedicated administration screen.",
      "Login URL validation.",
      "Compatibility considerations.",
    ],
  },
  {
    id: "verified-j",
    title: "Integrations and Compatibility",
    summary:
      "Editor, translation, community and migration integrations; support type varies by integration.",
    items: [
      "Gutenberg.",
      "Classic Editor.",
      "WPML.",
      "Polylang.",
      "TranslatePress.",
      "Weglot.",
      "bbPress.",
      "BuddyPress.",
      "Web Stories.",
      "Podcast functionality.",
      "JNews adapter.",
      "Yoast migration.",
      "Rank Math migration.",
      "All in One SEO migration.",
      "SEOPress migration.",
      "The SEO Framework migration.",
      "Import/export.",
      "WP-CLI.",
    ],
  },
  {
    id: "verified-k",
    title: "Analytics, Diagnostics and Publisher Intelligence",
    summary:
      "Diagnostics and search performance interfaces, subject to their data and connection requirements.",
    items: [
      "Search Console performance dashboard.",
      "Search insights.",
      "SEO diagnostics.",
      "Sitemap diagnostics.",
      "Frontend scanning.",
      "Schema health.",
      "Link intelligence.",
      "Search engine visibility checks.",
      "Publisher diagnostics.",
      "Configuration history.",
      "Configuration snapshots.",
      "Technical health monitoring.",
    ],
  },
  {
    id: "verified-l",
    title: "Security and Administration",
    summary:
      "Administrative controls, role and feature configuration, portability, API and CLI surfaces.",
    items: [
      "Traffic Guard.",
      "Trusted proxy configuration.",
      "IP/CIDR controls.",
      "Country rules.",
      "Security headers.",
      "Private Login.",
      "Role-based access.",
      "Feature toggles.",
      "Setup Wizard.",
      "Dashboard.",
      "Configuration management.",
      "Migration & Portability.",
      "Import/export.",
      "Admin toolbar.",
      "Documentation & Help.",
      "WP-CLI.",
      "REST API.",
    ],
  },

  {
    id: "release-2.21.0",
    title: "2.21.0 Release — Editor, commerce and site operations",
    summary:
      "All changes from the supplied 2.21.0 package changelog, arranged in 14 searchable entries.",
    badge: "CURRENT · 2.21.0",
    items: [
      "404 Monitor refinements: on-screen recording control, clearer empty/filter states, readable Browser/Mobile/Crawler badges, combined first/last-seen details, referrer name, inline redirect creation, and confirmation before clearing all logs.",
      "Movable SEO editor window: shared SEO fields, live previews and analysis in a floating workspace for the block and Classic Editors; drag with mouse, touch or arrow keys, resize, snap left/right, minimize, remember position, and adapt to a phone bottom sheet.",
      "One consistent SEO score across the editor panel, toolbar badge, post-list column, SEO Score screen, Insights and scheduled audits.",
      "RSS Feeds screen: author, publisher, category, copyright and custom attribution with live preview; recent-news feed at /feed/news/; item limits, feed discovery links, optional cache headers, validation and reader-style preview.",
      "Site Navigation SEO: inspect selected important pages for publication, indexability, sitemap inclusion, menu and internal links, self-canonical and description; expose a SiteNavigationElement list, breadcrumbs and orphaned-content clues without claiming control of Google sitelinks.",
      "WooCommerce SEO when WooCommerce is active: connect Product schema to the graph, use product metadata, and prevent products from being treated as news articles.",
      "Redirect CSV import for supported PublishRank, Yoast SEO Premium, Rank Math and Redirection exports; CSV export, bulk deletion, hop/chain/loop tracing, and captured regex groups in destinations.",
      "Arabic and Urdu content analysis alongside English, including Arabic-script normalization and language-specific punctuation, connective words and sentence-length rules.",
      "Optional English inclusive-language suggestions with explanations, alternatives, configurable rules and per-post dismissal; suggestions never rewrite content or change its SEO score.",
      "Optional dismissible Classic Editor notice explaining that the movable SEO window works there; PublishRank does not install or activate other plugins.",
      "Setup Wizard logo and image selection previews immediately, saves the media ID and restores the preview after reload.",
      "Private Login migration reads older sign-in address settings through a separate migration path so other plugins' settings are not deleted.",
      "Sitemap integrations for bbPress, podcasts, Web Stories and products are listed and served instead of returning 404; automatic descriptions preserve heading/text spacing.",
      "Responsive refinements: readable headers on newer screens and date fields that stay within narrow cards.",
    ],
  },
];

export const featureCount = featureCatalog.reduce((n, c) => n + c.items.length, 0);

// Tools visible in the plugin's own "Tools Showcase" dashboard (41 tools).
export const toolHighlights: Array<{ group: string; title: string; text: string }> = [
  {
    group: "Search & discovery",
    title: "Schema studio",
    text: "Configure publisher, article and media structured data for your site.",
  },
  {
    group: "Search & discovery",
    title: "Sitemap health",
    text: "Check sitemap endpoints, article eligibility and generation status.",
  },
  {
    group: "Search & discovery",
    title: "IndexNow",
    text: "Configure supported search-engine notifications when content changes.",
  },
  {
    group: "Search & discovery",
    title: "Google Preferred Sources",
    text: "Generate your link and the code for Google’s “Add to preferred sources” button.",
  },
  {
    group: "Search & discovery",
    title: "Crawl optimization",
    text: "Manage optional discovery links, feed, search and URL cleanup controls.",
  },
  {
    group: "Search & discovery",
    title: "AI & llms.txt",
    text: "Review the optional llms.txt file and AI-crawler guidance for your site.",
  },
  {
    group: "Search & discovery",
    title: "Schema Aggregator",
    text: "Publish and verify a complete JSON-LD content feed for AI crawlers and llms.txt.",
  },
  {
    group: "Content & publishing",
    title: "SEO score",
    text: "Review practical content and technical checks across the site.",
  },
  {
    group: "Content & publishing",
    title: "Google Discover image",
    text: "Inspect image dimensions and create a resized copy without replacing the original.",
  },
  {
    group: "Content & publishing",
    title: "Newsroom",
    text: "Planning board, calendar, activity history, notifications and roles in one editorial workspace.",
  },
  {
    group: "Content & publishing",
    title: "Mastodon publishing",
    text: "Share posts with custom templates, server-aware character limits, content warnings and accessible featured media.",
  },
  {
    group: "Content & publishing",
    title: "Internal links & link intelligence",
    text: "Find internal-link opportunities and strengthen related content paths.",
  },
  {
    group: "Content & publishing",
    title: "Local SEO & author expertise",
    text: "Configure local business identity and publication expertise information.",
  },
];
