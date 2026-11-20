# Tatvam Overseas Inc — Site Operations

## IndexNow Submission

After each deploy, run the following command from the project root to notify Bing and other IndexNow-compatible search engines of updated URLs:

```bash
node scripts/indexnow.js
```

**Key details:**
| Field | Value |
|---|---|
| IndexNow Key | `7f93c70d8bce896d27c605318f084300` |
| Key file URL | `https://www.tatvamoverseasinc.com/7f93c70d8bce896d27c605318f084300.txt` |
| API Endpoint | `https://api.indexnow.org/IndexNow` |
| URLs submitted | All 38 URLs from `sitemap.xml` |

**Requirements:** Node.js v18+ (uses built-in `fetch`; also works on older Node via the `https` fallback).

**No install needed** — the script uses only Node.js built-in modules.

---

## Bing Webmaster Tools

> **TODO(owner):** To enable Bing verification, go to [Bing Webmaster Tools](https://www.bing.com/webmasters/), add your site, and paste the meta code below into this README or tell your developer to add:
> ```html
> <meta name="msvalidate.01" content="YOUR_CODE_HERE">
> ```
> to the `<head>` of `index.html` only.

---

## Robots.txt

The live `robots.txt` explicitly allows Googlebot, Bingbot, OAI-SearchBot, Claude-SearchBot, and PerplexityBot.
Sitemap is listed at: `https://www.tatvamoverseasinc.com/sitemap.xml`
