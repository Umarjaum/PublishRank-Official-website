<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Shared website navigation and branding live in SiteHeader/SiteFooter, with separate public content routes so every page has a distinct URL.
- Public pages use the shared pageSeo helper for self-referencing canonicals and metadata; omit absolute sitemap and image URLs until a verified public domain is available.
- Publisher content is sourced from supplied project materials and keeps integration and SEO outcome limitations explicit to avoid invented claims.
- Binary website media use asset pointers in the app; source exports include offline copies and rewrite exported imports to portable local URLs.
