export type ResearchSource = {
  key: string;
  name: string;
  allowedHost: string;
};

export type ResearchItem = {
  id: string;
  title: string;
  excerpt: string;
  href: string;
  source: string;
  publishedAt: string;
};

const MAX_FEED_ITEMS = 30;
const MAX_ITEM_AGE_MS = 180 * 24 * 60 * 60 * 1000;
const MAX_FUTURE_SKEW_MS = 24 * 60 * 60 * 1000;
const MAX_TITLE_LENGTH = 180;
const MAX_EXCERPT_LENGTH = 360;

function readElement(xml: string, tagName: string): string {
  const safeName = tagName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const match = xml.match(
    new RegExp(`<${safeName}(?:\\s[^>]*)?>([\\s\\S]*?)<\\/${safeName}\\s*>`, "i"),
  );
  return match?.[1] ?? "";
}

function decodeXmlText(value: string): string {
  const text = value
    .replace(/<!\[CDATA\[([\s\S]*?)\]\]>/g, "$1")
    .replace(/<script\b[^>]*>[\s\S]*?<\/script\s*>/gi, " ")
    .replace(/<style\b[^>]*>[\s\S]*?<\/style\s*>/gi, " ")
    .replace(/<[^>]*>/g, " ")
    .replace(
      /&#(?:x([\da-f]+)|(\d+));/gi,
      (_match, hex: string | undefined, decimal: string | undefined) => {
        const point = Number.parseInt(hex ?? decimal ?? "", hex ? 16 : 10);
        if (
          !Number.isFinite(point) ||
          point < 0 ||
          point > 0x10ffff ||
          (point >= 0xd800 && point <= 0xdfff)
        ) {
          return "";
        }
        return String.fromCodePoint(point);
      },
    )
    .replace(
      /&(?:amp|lt|gt|quot|apos|nbsp|ndash|mdash|hellip|rsquo|lsquo|rdquo|ldquo);/gi,
      (entity) => {
        const entities: Record<string, string> = {
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&apos;": "'",
          "&nbsp;": " ",
          "&ndash;": "–",
          "&mdash;": "—",
          "&hellip;": "…",
          "&rsquo;": "’",
          "&lsquo;": "‘",
          "&rdquo;": "”",
          "&ldquo;": "“",
        };
        return entities[entity.toLowerCase()] ?? entity;
      },
    )
    // eslint-disable-next-line no-control-regex -- sanitize untrusted XML control characters
    .replace(/[\u0000-\u001f\u007f\u200b-\u200f\ufeff]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .replace(/\s+([,.;:!?])/g, "$1");

  return text;
}

function limitedText(value: string, limit: number): string {
  if (value.length <= limit) return value;
  return `${value.slice(0, limit - 1).trimEnd()}…`;
}

export function parseOfficialRss(
  xml: string,
  source: ResearchSource,
  now = Date.now(),
): ResearchItem[] {
  if (!/<rss\b/i.test(xml) || xml.length > 1_000_000) return [];
  const rawItems = Array.from(xml.matchAll(/<item(?:\s[^>]*)?>([\s\S]*?)<\/item\s*>/gi))
    .slice(0, MAX_FEED_ITEMS)
    .map((match) => match[1] ?? "");
  const output: ResearchItem[] = [];
  const seen = new Set<string>();

  for (const rawItem of rawItems) {
    const title = limitedText(decodeXmlText(readElement(rawItem, "title")), MAX_TITLE_LENGTH);
    const rawHref =
      decodeXmlText(readElement(rawItem, "link")) || decodeXmlText(readElement(rawItem, "guid"));
    const dateText =
      decodeXmlText(readElement(rawItem, "pubDate")) ||
      decodeXmlText(readElement(rawItem, "dc:date"));
    const excerpt = limitedText(
      decodeXmlText(
        readElement(rawItem, "description") ||
          readElement(rawItem, "content:encoded") ||
          readElement(rawItem, "summary"),
      ),
      MAX_EXCERPT_LENGTH,
    );
    const timestamp = Date.parse(dateText);
    if (!title || !rawHref || !Number.isFinite(timestamp)) continue;
    if (timestamp < now - MAX_ITEM_AGE_MS || timestamp > now + MAX_FUTURE_SKEW_MS) continue;

    let href: URL;
    try {
      href = new URL(rawHref);
    } catch {
      continue;
    }
    if (href.protocol !== "https:" || href.hostname.toLowerCase() !== source.allowedHost) continue;
    const canonicalHref = href.toString();
    if (seen.has(canonicalHref)) continue;
    seen.add(canonicalHref);

    output.push({
      id: `${source.key}:${canonicalHref}`,
      title,
      excerpt,
      href: canonicalHref,
      source: source.name,
      publishedAt: new Date(timestamp).toISOString(),
    });
  }

  return output;
}

export function chooseDifferentResearchItem(
  items: readonly ResearchItem[],
  previousId: string | null,
  random: () => number = Math.random,
): ResearchItem | null {
  if (items.length === 0) return null;
  const alternatives = items.filter((item) => item.id !== previousId);
  const pool = alternatives.length > 0 ? alternatives : items;
  const value = random();
  const safeValue = Number.isFinite(value) ? Math.min(0.999999999, Math.max(0, value)) : 0;
  return pool[Math.floor(safeValue * pool.length)] ?? null;
}
