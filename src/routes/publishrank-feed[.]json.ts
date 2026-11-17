import { createFileRoute } from "@tanstack/react-router";
import { buildFeed } from "@/lib/publishrank-feed";

async function etagFor(body: string): Promise<string> {
  const digest = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(body));
  const hex = Array.from(new Uint8Array(digest).slice(0, 16), (b) => b.toString(16).padStart(2, "0")).join("");
  return `"${hex}"`;
}

// Public, read-only JSON. Consumed by the PublishRank plugin; carries no visitor data.
export const Route = createFileRoute("/publishrank-feed.json")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const feed = buildFeed();
        const body = JSON.stringify(feed, null, 2);
        const etag = await etagFor(body);
        const headers: Record<string, string> = {
          "Content-Type": "application/json; charset=utf-8",
          "Cache-Control": "public, max-age=900, s-maxage=900, stale-while-revalidate=86400",
          ETag: etag,
          "Last-Modified": new Date(feed.updated_at).toUTCString(),
          "Access-Control-Allow-Origin": "*",
          "X-Content-Type-Options": "nosniff",
        };
        const match = request.headers.get("if-none-match");
        if (match && match.split(",").map((v) => v.trim()).includes(etag)) {
          return new Response(null, { status: 304, headers });
        }
        return new Response(body, { status: 200, headers });
      },
    },
  },
});
