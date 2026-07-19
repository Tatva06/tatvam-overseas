# Tatvam Overseas Inc Website — Launch, CI/CD & Testing Report
*Prepared: July 15, 2026*

---

## ⚠️ Critical finding first: domain conflict

Your site's meta tags declare `tatvamoverseas.com` as the canonical domain. I checked — **that domain is already registered and live, and it belongs to a different, unrelated company** (an agro-commodity/spice exporter, not a steel stockist). It's also possible it's registered by an entity called "TATVAM OVERSEAS LLP" out of Rajkot, Gujarat — unrelated to your Mumbai steel business.

This means:
- You cannot use `tatvamoverseas.com` — it's not yours to claim, and shipping a site with someone else's domain hardcoded into canonical tags, Open Graph tags, and internal links is a real problem (broken SEO at best, brand confusion or legal issue at worst).
- **Action needed before anything else:** pick and register an available domain — e.g. `tatvamoverseasteel.com`, `tatvamoverseas.in`, `tatvamsteel.com`, `tatvam-overseas.com` — and do a find-and-replace across your codebase for every hardcoded canonical/OG/sitemap reference.

I'd sort this before investing more time in the rest of the checklist below, since domain choice affects SEO setup, email, and SSL config.

---

## 1. What you've actually built

Looking at the live site, this is a **multi-page static site** (separate `index.html`, `about.html`, `products.html`, `blog.html`, `contact.html`) deployed on Vercel — with good SEO fundamentals already in place (structured meta tags, geo tags, sitemap.xml, OG/Twitter cards).

Worth clarifying for yourself: if Antigravity generated this as a React Native project, what's live is most likely a **React Native Web** export or a plain static build — not something a phone can install. That's fine for a website, but it means "React Native" here is really just the toolchain, not a mobile app. Confirm this distinction so you don't accidentally market it as an app.

---

## 2. Hosting platform — is Vercel right for you?

**Short answer: yes, keep Vercel.** For a static/marketing site like this, it's a strong default:

| Factor | Vercel | Alternatives worth knowing |
|---|---|---|
| Cost | Free tier covers this easily | Netlify (near-identical), Cloudflare Pages (best free bandwidth + built-in WAF) |
| CI/CD | Built-in, zero config | Netlify same; Cloudflare Pages same |
| Preview deployments per PR | Yes, automatic | Netlify yes; Cloudflare Pages yes |
| DDoS/bot protection | Basic, decent | **Cloudflare Pages has the strongest free-tier security layer** — worth considering if security is a priority |
| India-specific latency | Good (Mumbai edge node) | Cloudflare also has Mumbai PoPs |

You don't need to migrate. If you want extra security headroom later (WAF rules, bot fight mode) for free, Cloudflare sitting *in front of* Vercel (as DNS + proxy) is a common combo — you get Vercel's deploy experience plus Cloudflare's edge security. That's a good middle path, not urgent for launch.

---

## 3. Setting up real CI/CD (continuous development)

Since you want ongoing development, treat this like software, not a one-off deploy:

**3.1 Version control discipline**
- Push all code to GitHub/GitLab if not already (Vercel connects directly to this).
- Branch strategy: `main` (production) + `dev`/`staging` branch + feature branches per change.
- Vercel auto-generates a **preview URL for every pull request** — this is your free staging environment. Never test directly on production.

**3.2 Recommended flow**
```
feature branch → PR → Vercel preview deploy → review/test → merge to main → auto production deploy
```

**3.3 Add GitHub Actions for checks before merge** (Vercel handles the deploy, GitHub Actions handles quality gates):
- Lint/build check on every PR
- Lighthouse CI (performance/SEO score) run automatically on preview URLs
- Broken-link checker
- `npm audit` for dependency vulnerabilities

**3.4 Environment separation**
- Production: your real domain
- Staging: a `staging.yourdomain.com` subdomain pointed at a separate Vercel environment, so you can test changes with real data/forms without touching the live site.

**3.5 Rollback plan**
- Vercel keeps every deployment; you can instantly roll back to a previous deploy from the dashboard if something breaks — good to know before you need it.

---

## 4. Testing strategy — the part you specifically asked about

Split this into four categories. None of these require me to "hack" your site — they're standard, legitimate tools any business uses before/after launch.

### 4.1 Performance & speed ("lagging")
| Tool | What it tells you | Cost |
|---|---|---|
| **Google PageSpeed Insights / Lighthouse** | Core Web Vitals, load time, mobile vs desktop score | Free |
| **GTmetrix** | Waterfall of what's slow (images, scripts, fonts) | Free tier |
| **WebPageTest.org** | Real-device testing from multiple global locations (test from a Mumbai or Singapore node for your audience) | Free |
| **Vercel Analytics / Speed Insights** | Real-user monitoring on your actual traffic | Free tier available |

Common culprits for lag on sites like yours: unoptimized product images (I noticed some are pulling from Unsplash placeholders — swap for compressed real photos, WebP format, <200KB each), render-blocking scripts, no lazy-loading on the image-heavy product sections.

### 4.2 Load testing / footfall simulation
This simulates many visitors hitting your site at once — useful before a big marketing push or if you expect export inquiry spikes.
- **k6** (by Grafana) — free, scriptable, industry standard, good docs
- **Artillery** — simpler, good for quick load tests
- **Locust** — Python-based, good if your team is more comfortable in Python

Run these against your **staging** environment, never production, and start small (50–100 simulated users) before scaling up.

### 4.3 Security testing ("hacking")
Legitimate security testing is called **penetration testing** or **vulnerability scanning** — important distinction, since actually attacking a live site without authorization (even your own, on shared infra) can violate hosting ToS in edge cases. Safe, standard approach:

- **Mozilla Observatory** (observatory.mozilla.org) — free scan of your security headers (CSP, HSTS, etc.), gives a letter grade
- **SSL Labs (ssllabs.com/ssltest)** — checks your HTTPS/TLS configuration
- **OWASP ZAP** — free, industry-standard automated vulnerability scanner you can run yourself against your own staging site
- **npm audit / Snyk** — scans your dependencies for known vulnerabilities (critical if you're pulling in npm packages via the React Native/web toolchain)
- **Security headers checklist**: Content-Security-Policy, X-Frame-Options, X-Content-Type-Options, Strict-Transport-Security — Vercel makes these easy to add via a `vercel.json` headers config

If you want a genuine third-party penetration test (recommended once you're handling real customer data/quotes), that's a paid engagement with a specialized firm — not a DIY task, and not something I can perform on a live third-party-hosted site myself.

### 4.4 Uptime & ongoing monitoring
- **UptimeRobot** (free tier) — pings your site every 5 min, alerts you by email/SMS if it goes down
- **Sentry** — catches JavaScript errors happening to real visitors, free tier is generous
- **Vercel's own deployment logs** — check these after every deploy

---

## 5. Suggested priority order

1. **Fix the domain conflict** — register a real, available domain; update all canonical/OG/sitemap references
2. Set up staging branch + Vercel preview deploys (if not already using PRs)
3. Run PageSpeed Insights + Mozilla Observatory on current live site — fix any red flags (likely image optimization + security headers)
4. Add `vercel.json` security headers
5. Set up UptimeRobot (5 minutes, free, immediate value)
6. Add GitHub Actions for Lighthouse CI + `npm audit` on every PR
7. Once traffic is real, add Vercel Analytics + consider Cloudflare in front for extra protection
8. Before any major marketing push, do a k6 load test on staging

---

## Quick note on "React Native" for a website

Since this is a browser-based business site (not an installable app), you don't need the mobile app store process (Apple/Google review, signing certs, etc.) at all for this deliverable — that track only applies if you decide you want an actual downloadable app. Worth confirming that's not what you were promised by "React Native," since the term usually implies mobile app development.

---

## 🛠️ Update Log (Implemented July 15 & 19, 2026)

The following improvements and configurations have been successfully completed:

1. **Brand & Phone Number Sync:**
   - Updated legal entity name to **Tatvam Overseas Inc** across metadata, headers, footers, page titles, and schema JSON-LD.
   - Updated primary phone number to **+91 90828 34775** everywhere, ensuring active WhatsApp click-to-chat actions are aligned to the correct number.

2. **Component Restructuring:**
   - Modularized global elements by separating the header and footer templates into a single reusable file: `js/components.js`. This eliminates layout code repetition across files and simplifies navigation/footer content maintenance.

3. **HTTP Security Configuration (`vercel.json`):**
   - Added standard security policy headers (HSTS protection, XSS-Protection, X-Frame-Options against clickjacking, X-Content-Type-Options, and a secure content security policy) to safeguard users and boost initial auditing scores.

4. **SEO Freshness:**
   - Refreshed all target sitemap URLs inside `sitemap.xml` with active `<lastmod>` values set to today (`2026-07-15`).

5. **Brand & Domain Renaming (tatvamoverseasinc):**
   - Changed the target domain from `tatvamoverseas.com` to `tatvamoverseasinc.com` across the sitemap, canonical links, open graph tags, schema markup, and business emails.
   - Renamed media assets and the product catalog to use the updated `tatvamoverseasinc` branding format.
