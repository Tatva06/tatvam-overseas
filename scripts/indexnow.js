#!/usr/bin/env node
/**
 * IndexNow Submission Script — Tatvam Overseas Inc
 * ------------------------------------------------
 * Reads all URLs from sitemap.xml and submits them to IndexNow API.
 * No third-party dependencies required (uses Node.js built-ins only).
 *
 * HOW TO RUN (after each deploy):
 *   node scripts/indexnow.js
 *
 * REQUIREMENTS:
 *   - Node.js v18+ (uses built-in fetch; for older Node use the https fallback below)
 *   - The key file must be live at:
 *       https://www.tatvamoverseasinc.com/7f93c70d8bce896d27c605318f084300.txt
 *
 * API endpoint: https://api.indexnow.org/IndexNow
 * Docs: https://www.indexnow.org/documentation
 */

'use strict';

const path = require('path');
const fs = require('fs');
const { XMLParser } = (() => {
  // We use only built-in modules — parse XML with a simple regex extractor
  return { XMLParser: null };
})();

// ── Config ─────────────────────────────────────────────────────────────────
const KEY = '7f93c70d8bce896d27c605318f084300';
const HOST = 'www.tatvamoverseasinc.com';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.join(__dirname, '..', 'sitemap.xml');
const INDEXNOW_API = 'https://api.indexnow.org/IndexNow';

// ── Parse sitemap.xml ───────────────────────────────────────────────────────
function extractUrlsFromSitemap(xmlText) {
  const urls = [];
  const locRegex = /<(?:\w+:)?loc>(.*?)<\/(?:\w+:)?loc>/g;
  let match;
  while ((match = locRegex.exec(xmlText)) !== null) {
    const url = match[1].trim();
    if (url.startsWith('https://')) {
      urls.push(url);
    }
  }
  return urls;
}

// ── HTTP POST helper (built-in https module fallback for older Node) ────────
async function postJson(url, body) {
  // Try native fetch first (Node 18+)
  if (typeof fetch !== 'undefined') {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: JSON.stringify(body),
    });
    return { status: res.status, text: await res.text() };
  }

  // Fallback: built-in https module
  return new Promise((resolve, reject) => {
    const https = require('https');
    const data = Buffer.from(JSON.stringify(body), 'utf-8');
    const urlObj = new URL(url);
    const options = {
      hostname: urlObj.hostname,
      path: urlObj.pathname,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
        'Content-Length': data.length,
      },
    };
    const req = https.request(options, (res) => {
      let text = '';
      res.on('data', (chunk) => { text += chunk; });
      res.on('end', () => resolve({ status: res.statusCode, text }));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

// ── Main ────────────────────────────────────────────────────────────────────
async function main() {
  if (!fs.existsSync(SITEMAP_PATH)) {
    console.error(`ERROR: sitemap.xml not found at ${SITEMAP_PATH}`);
    process.exit(1);
  }

  const xml = fs.readFileSync(SITEMAP_PATH, 'utf-8');
  const urls = extractUrlsFromSitemap(xml);

  if (urls.length === 0) {
    console.error('ERROR: No URLs found in sitemap.xml');
    process.exit(1);
  }

  console.log(`Found ${urls.length} URLs in sitemap.xml`);
  console.log('Submitting to IndexNow...\n');

  const payload = {
    host: HOST,
    key: KEY,
    keyLocation: KEY_LOCATION,
    urlList: urls,
  };

  try {
    const { status, text } = await postJson(INDEXNOW_API, payload);

    console.log(`Response status: ${status}`);
    if (text) console.log(`Response body:   ${text}`);

    if (status === 200 || status === 202) {
      console.log(`\n✅ IndexNow submission successful (${urls.length} URLs)`);
    } else if (status === 400) {
      console.error('\n❌ 400 Bad Request — check host, key, and keyLocation');
    } else if (status === 403) {
      console.error('\n❌ 403 Forbidden — key file not reachable or key mismatch');
    } else if (status === 422) {
      console.error('\n❌ 422 Unprocessable — URL(s) not from the same host');
    } else if (status === 429) {
      console.error('\n⚠️  429 Too Many Requests — wait and retry later');
    } else {
      console.error(`\n⚠️  Unexpected status ${status}`);
    }
  } catch (err) {
    console.error('\n❌ Network error:', err.message);
    process.exit(1);
  }
}

main();
