export type InstallationStep = {
  number: number;
  id: string;
  title: string;
  description: string;
  image: string;
  alt: string;
};

/** Real WordPress admin screenshots from the supplied PublishRank 2.26.0 documentation. */
export const installationSteps: InstallationStep[] = [
  {
    number: 2,
    id: "wordpress-org",
    title: "Install from the WordPress.org directory",
    description:
      "In WordPress, open Plugins → Add Plugin, search for PublishRank, then choose Install and Activate. If the directory has not yet surfaced the current release, use the direct ZIP download instead.",
    image: "step-02-wordpress-org.jpg",
    alt: "WordPress.org Plugin Directory page for PublishRank SEO for WordPress.",
  },
  {
    number: 3,
    id: "wordpress-dashboard",
    title: "Sign in to your WordPress dashboard",
    description:
      "Open yoursite.com/wp-admin and sign in with an administrator account. Only an administrator, or a multisite network administrator, can install plugins.",
    image: "step-03-dashboard.jpg",
    alt: "WordPress dashboard with the Dashboard menu selected.",
  },
  {
    number: 4,
    id: "plugins-add-new",
    title: "Open Plugins → Add Plugin",
    description:
      "In the left-hand admin menu, open Plugins and select Add Plugin (called Add New Plugin on some WordPress versions).",
    image: "step-04-plugins-add-new.jpg",
    alt: "WordPress admin menu highlighting Plugins and Add Plugin.",
  },
  {
    number: 5,
    id: "upload-plugin",
    title: "Choose Upload Plugin",
    description:
      "At the top of the Add Plugins screen, select Upload Plugin to reveal the ZIP upload form.",
    image: "step-05-upload-plugin.jpg",
    alt: "WordPress Add Plugins screen with the Upload Plugin control highlighted.",
  },
  {
    number: 6,
    id: "choose-zip",
    title: "Select the downloaded ZIP file",
    description:
      "Choose the ZIP you downloaded. From this website the filename is PublishRank-2.26.0.zip. Leave it compressed—do not unzip it before uploading.",
    image: "step-06-choose-zip.jpg",
    alt: "WordPress upload form with the PublishRank 2.26.0 ZIP selected.",
  },
  {
    number: 7,
    id: "install-now",
    title: "Install the plugin",
    description:
      "Select Install Now and wait for WordPress to finish uploading and unpacking the plugin files.",
    image: "step-07-install-now.jpg",
    alt: "WordPress upload form with Install Now highlighted for PublishRank.",
  },
  {
    number: 8,
    id: "activate",
    title: "Activate PublishRank",
    description:
      "When WordPress reports that the plugin installed successfully, select Activate Plugin. The first-run setup wizard opens after activation.",
    image: "step-08-activate.jpg",
    alt: "WordPress success screen with the Activate Plugin action highlighted.",
  },
  {
    number: 9,
    id: "find-publishrank",
    title: "Find PublishRank in the admin menu",
    description:
      "PublishRank appears in the WordPress admin menu. Its row under Installed Plugins also provides links to settings, the setup wizard, the sitemap hub and diagnostics.",
    image: "step-09-menu-and-plugin-row.jpg",
    alt: "WordPress admin menu and Installed Plugins row showing PublishRank controls.",
  },
  {
    number: 10,
    id: "open-dashboard",
    title: "Open the PublishRank dashboard",
    description:
      "Select PublishRank in the admin menu. The dashboard includes a reminder to finish setup until the wizard is completed.",
    image: "step-10-dashboard-before-setup.jpg",
    alt: "PublishRank dashboard showing the first-time setup reminder.",
  },
  {
    number: 11,
    id: "setup-wizard",
    title: "Start the setup wizard",
    description:
      "Open PublishRank → Setup Wizard and select Start configuration. The wizard has nine short steps; Save & exit keeps your progress so you can return later.",
    image: "step-11-start-configuration.jpg",
    alt: "PublishRank setup wizard welcome screen with Start configuration highlighted.",
  },
  {
    number: 12,
    id: "site-identity",
    title: "Set your site name and tagline",
    description:
      "Enter your publication or business name and a short description. These values align with the WordPress Site Title and Tagline.",
    image: "step-12-site-name-tagline.jpg",
    alt: "PublishRank setup wizard fields for site name and tagline.",
  },
  {
    number: 13,
    id: "homepage-search-appearance",
    title: "Set the homepage SEO title and description",
    description:
      "Add a clear homepage title and meta description. The preview updates as you type; search engines may choose to display different wording.",
    image: "step-13-homepage-title-description.jpg",
    alt: "PublishRank search setup step with homepage SEO title and meta description fields.",
  },
  {
    number: 14,
    id: "sitemap",
    title: "Open and submit your sitemap",
    description:
      "Open PublishRank → Sitemap Hub, copy the sitemap index address, and submit it to your Search Console or webmaster tools account.",
    image: "step-14-sitemap-hub.jpg",
    alt: "PublishRank Sitemap Hub showing the sitemap index and related controls.",
  },
  {
    number: 15,
    id: "verify",
    title: "Verify the live page with SEO Inspector",
    description:
      "Open PublishRank → SEO Inspector, enter your homepage address, and select Inspect. Review the title, description, page checks and structured-data findings. This helps validate output; it does not guarantee rankings or rich results.",
    image: "step-15-verify-inspector.jpg",
    alt: "PublishRank SEO Inspector showing a search preview and live page checks.",
  },
];
