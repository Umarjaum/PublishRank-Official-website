# Search & WordPress Research Pulse — source verification

Checked 2026-11-11. The site feature consumes fixed, official RSS feeds, displays each source's title, excerpt, source name, and original publication date, and links directly to the source. It does not rewrite source material as independent research advice.

## Verified RSS feeds

- Google Search Central Blog: https://feeds.feedburner.com/blogspot/amDG — linked from the official blog; feed items link to `developers.google.com/search/blog`.
- Google Search Central documentation updates: https://developers.google.com/search/updates/search_docs_updates.rss — linked on the official documentation updates page.
- WordPress Developer Blog: https://developer.wordpress.org/news/feed/ — verified RSS response; items link to `developer.wordpress.org/news`.
- WordPress News: https://wordpress.org/news/feed/ — verified RSS response; items link to `wordpress.org/news`.

All four returned HTTP 200 and RSS XML when checked from the sandbox on 2026-11-11.

## Current primary-source findings opened and checked

- Google Search Central documentation, November 9, 2026: added “things to do” query support to its aggregator and supplier unit documentation. [Source](https://developers.google.com/search/updates#november-2026)
- Google Search Central Blog, October 30, 2026: Google announced plans to support an IETF-developed shared AI-training preference signal in robots.txt and said it aims to support it with other providers in 2027. This is a plan, not a currently supported control. [Source](https://developers.google.com/search/blog/2026/10/ai-training-control)
- WordPress News, November 10, 2026: WordPress 7.2 Beta 5 is for testing and development only, not production. [Source](https://wordpress.org/news/2026/11/wordpress-7-2-beta-5/)
- WordPress Developer Blog, October 14, 2026: its 7.2 roundup covers the roadmap and a `wp_kses()` parser rebuild; release timing and details are qualified in the article. [Source](https://developer.wordpress.org/news/2026/10/whats-new-for-developers-october-2026/)

The implementation uses fixed allowlisted feeds, server-side timeouts and response-size limits, HTTPS link-host validation, stale/future-date filtering, a short shared cache, and a browser-session rotation that avoids immediately repeating the last citation.
