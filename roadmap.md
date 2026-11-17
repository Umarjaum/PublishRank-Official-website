# PublishRank 2.25 roadmap

## Plugin (WordPress)
- [x] Theme masking v2: identifier rewriting (HTML + served CSS/JS), credit removal, source-map policy, version-hash cache busting, fast early-serve, REST index scrub, AJAX reverse-map
- [x] Fingerprint scanner + dashboard (Protected / Partial / Review), secure scan (SSL verify, single-use token)
- [x] Test masking on Astra, Astra child, GeneratePress, Kadence, Blocksy, Neve, OceanWP, Hello Elementor, Twenty Twenty-Five (premium themes cannot be installed here)
- [x] Feature access rules: admin chooses which roles/users can use which features (Roles & permissions screen now registered + REST route; 15-check test)
- [x] Logo sync with WordPress Site Logo + Site Icon (alongside title/tagline/description)
- [x] Sitemap sharding verified on a large dataset; bloat check (queries, memory, autoload) on large content
- [x] Access Shield: live verification with signed report, password/breach policy, session limit, idle sign-out
- [x] Newsroom: Publishing Desk (duplicate headlines live in editor, missed-schedule auto-fix, freshness column, news diagnostics, velocity)
- [x] Advanced SEO & trust checks (15 new, one authoritative score) + 2.25 test suite
- [x] News & What's New screen consuming the website JSON feed (secure fetch, cache, fallback)
- [x] Version 2.25.0, changelog, installable ZIP, test report

## Website
- [x] Import official website into this project
- [x] Enterprise visuals and animation (aurora hero, verification console, ticker, proof band, spotlight cards, What's New timeline)
- [x] Plugin screenshots from the real test site
- [x] Shared JSON feed endpoint (/publishrank-feed.json) + content synced to 2.25
- [x] Self-host the 2.25.0 ZIP at /downloads (after packaging)

## Delivery
- [x] ZIPs: plugin, website source, report
- [ ] Deploy website to Vercel (blocked: deployment is outside this workspace) so the live feed and download go live
