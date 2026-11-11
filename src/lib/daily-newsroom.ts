export type DailyNewsroomCase = {
  title: string;
  scene: string;
  prompt: string;
  choices: readonly [string, string, string];
  answer: 0 | 1 | 2;
  debrief: string;
};

export const DAILY_NEWSROOM_CASES: readonly DailyNewsroomCase[] = [
  {
    title: "The canonical points to yesterday",
    scene:
      "A breaking story is live, but its canonical URL points to an older edition of the same article.",
    prompt: "What is your first move?",
    choices: [
      "Rewrite the headline so it contains today's date.",
      "Inspect the rendered canonical and redirect path, then correct the preferred URL at its source.",
      "Ask every search engine to recrawl the whole site immediately.",
    ],
    answer: 1,
    debrief:
      "The published canonical and redirects are the evidence. Verify the actual response first, then correct the URL choice without changing unrelated story metadata.",
  },
  {
    title: "The newest story is missing from News",
    scene: "Editors can open the story, but it does not appear in the publication's News sitemap.",
    prompt: "Which check belongs first?",
    choices: [
      "Inspect the generated sitemap, story eligibility, publication identity and response status.",
      "Add more keywords to the first paragraph.",
      "Submit every URL on the site again, whether it changed or not.",
    ],
    answer: 0,
    debrief:
      "Start with the actual sitemap output and the story's published state. Confirm the publication identity and any eligibility rules before taking further action.",
  },
  {
    title: "Two Article blocks disagree",
    scene: "A source check shows two Article JSON-LD blocks with different headlines and dates.",
    prompt: "How do you avoid making the conflict worse?",
    choices: [
      "Install a third schema plugin so one of the blocks wins.",
      "Delete all structured data from the page.",
      "Trace both blocks to their owners and align or remove the duplicate at its source.",
    ],
    answer: 2,
    debrief:
      "Identify which plugin or theme emits each block, compare them with the visible story, and resolve the duplicate at its source. Avoid adding another emitter blindly.",
  },
  {
    title: "The sitemap says yes; robots says no",
    scene:
      "A URL is listed in a sitemap, but the rendered page or response headers appear to say noindex.",
    prompt: "What evidence should the desk check?",
    choices: [
      "Whether the article's image has a descriptive filename.",
      "The live page's robots meta, X-Robots-Tag and intended indexing policy.",
      "Whether the headline is longer than the section name.",
    ],
    answer: 1,
    debrief:
      "Check the live HTML and response headers. A sitemap entry does not override a noindex directive; confirm whether that directive is intentional before changing it.",
  },
  {
    title: "The author does not match the byline",
    scene:
      "The page shows one journalist, while its structured data names a retired staff account.",
    prompt: "Which correction is safest?",
    choices: [
      "Align the structured author with the visible, verified byline and its real profile.",
      "Add a more popular journalist to improve the snippet.",
      "Remove every author reference from the article.",
    ],
    answer: 0,
    debrief:
      "Structured information should reflect the story readers can verify. Correct the author at the source; do not invent or swap attribution for an SEO effect.",
  },
  {
    title: "Mastodon verification is still pending",
    scene:
      "A publisher added a profile link, but the Mastodon account does not show a verified website link yet.",
    prompt: "What should the team verify?",
    choices: [
      "Whether the News sitemap has been resubmitted today.",
      "Whether the site is adding the Mastodon access token to article metadata.",
      "Whether the exact profile URLs link back to each other with rel=me on both sides.",
    ],
    answer: 2,
    debrief:
      "Mastodon rel=me verification depends on reciprocal profile links and the exact profile URL. Never publish an access token in page markup or public content.",
  },
  {
    title: "The social card shows last week's photo",
    scene: "The article hero is correct, but the link preview displays an older image.",
    prompt: "Where does the desk look first?",
    choices: [
      "Compare the live Open Graph image tags, image URL response and the page's sharing preview.",
      "Change the Article schema headline and wait for the image to follow.",
      "Rename every image in the media library.",
    ],
    answer: 0,
    debrief:
      "Inspect the tags actually served and make sure the selected image URL returns the intended, accessible file. Preview caches may take time to refresh after a correct update.",
  },
  {
    title: "The publisher handbook is stale",
    scene: "The public llms.txt points to a retired newsroom guide and an old support destination.",
    prompt: "What is the useful fix?",
    choices: [
      "Add private editorial notes so automated agents have more context.",
      "Update it with current, public resources and verify the live text response.",
      "Replace every page title with the homepage title.",
    ],
    answer: 1,
    debrief:
      "Keep public machine-readable guidance accurate and limited to resources intended for visitors. Check the exact URL and the text returned by production.",
  },
  {
    title: "A staging URL escaped into production",
    scene: "The live article's canonical points to a preview subdomain that requires a login.",
    prompt: "What should be corrected before anything else?",
    choices: [
      "The production URL generation so the live page emits its real public canonical.",
      "The article's social share count.",
      "The color of the newsroom's category badge.",
    ],
    answer: 0,
    debrief:
      "Confirm the canonical in production HTML, then correct the environment or URL setting generating the staging address. A logged-in preview is not a substitute for the public response.",
  },
  {
    title: "The migration created a redirect maze",
    scene:
      "An old story takes four redirects to reach its current URL, and one hop changes HTTP to HTTPS.",
    prompt: "What is the cleanest first investigation?",
    choices: [
      "Add more redirects until the chain is longer but consistent.",
      "Map the old-to-new path and consolidate it to a direct permanent destination where appropriate.",
      "Remove the current story from every sitemap.",
    ],
    answer: 1,
    debrief:
      "Trace the complete redirect chain and preserve the intended destination. Consolidate unnecessary hops carefully, then test the old URL and the final response.",
  },
  {
    title: "The publish date jumped forward",
    scene:
      "A corrected story now claims it was first published today, although it originally ran last month.",
    prompt: "How should the date fields be handled?",
    choices: [
      "Set every date to the current time so the story looks fresh.",
      "Remove all dates, even if the visible article keeps them.",
      "Keep publication and modification dates accurate and consistent with the visible editorial record.",
    ],
    answer: 2,
    debrief:
      "Use truthful dates. A substantive correction can update the modification date, but should not silently rewrite the original publication history.",
  },
  {
    title: "The story returns a soft error",
    scene:
      "The article looks normal in a browser, but a monitor recorded an intermittent 503 from the public URL.",
    prompt: "What evidence should the response team capture?",
    choices: [
      "Repeat the request from an unauthenticated session and record status, headers and timing before tuning metadata.",
      "Change the social image, then assume the server issue is fixed.",
      "Add noindex to every article until the error disappears.",
    ],
    answer: 0,
    debrief:
      "Separate availability from on-page SEO. Reproduce the public response, note its status and timing, and involve hosting support if the server failure persists.",
  },
  {
    title: "Every author profile goes to a 404",
    scene: "Article bylines link to author pages that disappeared during the redesign.",
    prompt: "What should the desk decide?",
    choices: [
      "Keep the broken links because the byline text still renders.",
      "Restore useful destinations or update the links and structured references to valid author pages.",
      "Redirect every author URL to an unrelated trending article.",
    ],
    answer: 1,
    debrief:
      "Check the visible link, response and any structured profile URL. Restore the intended author destination or update references deliberately; avoid irrelevant redirects.",
  },
  {
    title: "The sitemap is blocked at the door",
    scene:
      "The robots.txt file disallows the directory that contains the publication's XML sitemap.",
    prompt: "What should the technical editor inspect?",
    choices: [
      "Add the homepage to the Mastodon profile.",
      "Change the site's typography before touching crawl rules.",
      "Review the live robots.txt and sitemap path, then remove only the unintended block.",
    ],
    answer: 2,
    debrief:
      "Inspect the exact live directives and paths. Change only the rule causing the unintended block, then verify the sitemap is publicly retrievable.",
  },
  {
    title: "The category archive competes with the story",
    scene:
      "Search snippets alternate between the article and a thin category page with a near-identical headline.",
    prompt: "What is the right first step?",
    choices: [
      "Compare both pages' purpose, rendered titles, canonicals and index directives before choosing a policy.",
      "Noindex every category page on the site without review.",
      "Duplicate the article text on the category archive.",
    ],
    answer: 0,
    debrief:
      "Diagnose both pages before changing indexability. Some archives are useful; others need stronger curation, canonical rules or a different indexing policy.",
  },
  {
    title: "Open Graph and canonical disagree",
    scene:
      "The page's canonical is HTTPS, but its Open Graph URL still points to the old HTTP address.",
    prompt: "Which response makes the signals coherent?",
    choices: [
      "Leave the mismatch and add another social plugin.",
      "Align the rendered sharing URL with the current public canonical and check for stale overrides.",
      "Replace the article URL with the publisher's homepage everywhere.",
    ],
    answer: 1,
    debrief:
      "Check the final HTML, then remove or update the setting producing the old URL. Preserve the article's own public address; do not replace it with the homepage.",
  },
  {
    title: "The new domain still leaks into internal links",
    scene:
      "After a domain migration, several article links in the body still point to the retired hostname.",
    prompt: "What should the desk audit?",
    choices: [
      "Update internal links to the intended live destinations and test old-host redirects.",
      "Block the retired hostname in robots.txt and call the migration done.",
      "Change the publication's logo to force links to refresh.",
    ],
    answer: 0,
    debrief:
      "Internal links should take readers directly to the intended destination. Audit templates and content, then verify old-host redirects separately.",
  },
  {
    title: "The logo URL in structured data is retired",
    scene: "Publisher structured data points to a logo file that now returns 404.",
    prompt: "Which repair is grounded in evidence?",
    choices: [
      "Invent a new logo URL based on the old filename.",
      "Remove the entire publication identity from all stories.",
      "Choose the current public logo file and verify its URL and response before updating the structured data.",
    ],
    answer: 2,
    debrief:
      "Select the real, publicly reachable logo asset, verify the response, and update the emitting setting. Check the rendered result after publishing.",
  },
  {
    title: "A good snippet leads to a bad destination",
    scene:
      "The search result looks right, but the URL now lands on a generic homepage after a redirect.",
    prompt: "What deserves priority?",
    choices: [
      "Restore the story's intended destination or an appropriate replacement and verify the redirect target.",
      "Rewrite the snippet while leaving the misdirected URL untouched.",
      "Add the homepage URL to the story's Article headline.",
    ],
    answer: 0,
    debrief:
      "Fix the reader journey first. Confirm the final status and destination, then review metadata only if the published story still needs it.",
  },
  {
    title: "The editor sees a preview the public cannot",
    scene:
      "A logged-in editor sees the new structured data, while an unauthenticated request receives a cached older page.",
    prompt: "How do you confirm what readers receive?",
    choices: [
      "Trust the editor preview because it has the newest content.",
      "Fetch the public URL without a session and compare its HTML, headers and cache behavior.",
      "Clear the editor's browser history and stop testing.",
    ],
    answer: 1,
    debrief:
      "Verify the same unauthenticated response available to readers and crawlers. If caching is stale, inspect the cache path and confirm the refreshed public response.",
  },
];

export function getUtcDateKey(date: Date): string {
  return date.toISOString().slice(0, 10);
}

export function getUtcDaySerial(date: Date): number {
  return Math.floor(
    Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 86_400_000,
  );
}

export function getDailyCaseIndex(date: Date, caseCount = DAILY_NEWSROOM_CASES.length): number {
  if (caseCount <= 0) return 0;
  const day = getUtcDaySerial(date);
  return ((day % caseCount) + caseCount) % caseCount;
}

function serialFromDateKey(dateKey: string | null): number | null {
  if (!dateKey || !/^\d{4}-\d{2}-\d{2}$/.test(dateKey)) return null;
  const date = new Date(`${dateKey}T00:00:00.000Z`);
  if (Number.isNaN(date.getTime()) || getUtcDateKey(date) !== dateKey) return null;
  return getUtcDaySerial(date);
}

export function nextDailyStreak(
  lastCompletedDate: string | null,
  today: string,
  currentStreak: number,
): number {
  const lastSerial = serialFromDateKey(lastCompletedDate);
  const todaySerial = serialFromDateKey(today);
  if (todaySerial === null) return Math.max(1, currentStreak);
  if (lastSerial === todaySerial) return Math.max(1, currentStreak);
  return lastSerial !== null && todaySerial - lastSerial === 1 ? Math.max(0, currentStreak) + 1 : 1;
}

export function visibleDailyStreak(
  lastCompletedDate: string | null,
  today: string,
  currentStreak: number,
): number {
  const lastSerial = serialFromDateKey(lastCompletedDate);
  const todaySerial = serialFromDateKey(today);
  if (lastSerial === null || todaySerial === null) return 0;
  const daysSinceLastCase = todaySerial - lastSerial;
  return daysSinceLastCase >= 0 && daysSinceLastCase <= 1 ? Math.max(0, currentStreak) : 0;
}
