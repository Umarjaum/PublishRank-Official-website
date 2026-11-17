<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

## What Lovable manages

Rules outside this block are the project's own. Change the pieces below in
Lovable, not by hand. With the [Lovable MCP](https://mcp.lovable.dev)
connected, `send_message` asks Lovable to do it; otherwise ask the user to
use the editor.

- **Database.** Do not add or edit `supabase/migrations/` or `drizzle/`.
  Ask Lovable to change the schema.
- **Generated files.** Do not edit a file whose header says it is automatically
  generated.
- **AI gateway.** Keep model calls on Lovable's gateway, and keep
  `LOVABLE_API_KEY` out of browser code.
- **Connectors.** Lovable provides native connectors. `list_connectors` shows
  which are enabled; `add_connector` only returns the dashboard link. When a
  connector is enabled, calls go through the connector gateway and need
  `LOVABLE_API_KEY`. When Lovable does not provide one, users can bring their
  own key and store it in Secrets.
- **Secrets.** Lovable manages them. Do not put secret values in the repo.
<!-- LOVABLE:END -->

- Shared website navigation and branding live in SiteHeader/SiteFooter, with separate public content routes so every page has a distinct URL.
- Public pages use the shared pageSeo helper for self-referencing canonicals and metadata; omit absolute sitemap and image URLs until a verified public domain is available.
- Publisher content is sourced from supplied project materials and keeps integration and SEO outcome limitations explicit to avoid invented claims.
- Binary website media use asset pointers in the app; source exports include offline copies and rewrite exported imports to portable local URLs.
- The plugin download is self-hosted at public/downloads/PublishRank-<CURRENT_RELEASE>.zip; replace the ZIP whenever CURRENT_RELEASE changes, because DOWNLOAD_URL is derived from it.
- Product screenshots live in public/media/screens/publishrank-<version>/ and are listed in src/lib/product-screenshots.ts with their capture version; content tests assert every listed file exists.
