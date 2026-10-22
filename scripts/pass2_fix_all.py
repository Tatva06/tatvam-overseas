"""
pass2_fix_all.py  – second-pass fixer
Fixes:
  1. Canonical <link> tag (.html → clean URL)
  2. og:url meta tag (.html → clean URL)
  3. All internal <a href> that still end in .html → clean URL
  4. lang="en" → lang="en-IN" where missing
  5. og:image / twitter:image on pages still missing them
  6. Titles that are still too long / too short
  7. Meta descriptions that are still too long
  8. Verifies JSON-LD "url" fields also use clean form
"""

import os, glob, re

ROOT = 'https://www.tatvamoverseasinc.com'

# Helper: file path → canonical URL (no .html, / for index)
def canonical_for(filepath):
    f = filepath.replace('\\', '/')
    if f == 'index.html':
        return ROOT + '/'
    return ROOT + '/' + f.replace('.html', '')

# Helper: replace href/src/content .html URLs with clean ones
def clean_internal_html_refs(text, filepath):
    """
    Replace every internal .html href with the clean extensionless form.
    Works regardless of whether they are:
      - relative same-level: href="contact.html"
      - relative parent: href="../contact.html" | href="../blog/foo.html"
      - absolute site URL: href="https://www.tatvamoverseasinc.com/about.html"
    """
    is_blog = filepath.startswith('blog/')
    is_products = filepath.startswith('products/')

    def replace_href(m):
        full = m.group(0)
        quote = m.group(1)
        href = m.group(2)

        # Don't touch external URLs (other domains), mailto, tel, data, anchors
        if href.startswith('mailto:') or href.startswith('tel:') or href.startswith('data:') or href.startswith('#'):
            return full

        # Handle https://www.tatvamoverseasinc.com/xxx.html
        if href.startswith('https://www.tatvamoverseasinc.com/'):
            path = href[len('https://www.tatvamoverseasinc.com/'):]
            if path.endswith('.html'):
                if path == 'index.html':
                    return f'href={quote}/{quote}'
                clean = '/' + path[:-5]  # remove .html
                return f'href={quote}{clean}{quote}'
            return full  # already clean

        if href.startswith('http'):
            return full  # other external URLs untouched

        # Relative links: resolve the target page slug
        if href == 'index.html' or href == '../index.html':
            return f'href={quote}/{quote}'

        # Strip leading ../
        clean = href
        prefix = ''
        while clean.startswith('../'):
            clean = clean[3:]

        # Now `clean` is something like:
        #   "about.html"  "products/stainless-steel.html"  "blog/foo.html"
        if clean.endswith('.html'):
            slug = clean[:-5]
            return f'href={quote}/{slug}{quote}'

        return full   # already clean or non-html

    text = re.sub(r'href=(["\'])([^"\']+)\1', replace_href, text)
    return text


def clean_content_urls(text, filepath):
    """
    Also clean URLs inside JSON-LD scripts and og: meta tags.
    """
    def scrub_url(u):
        if u.startswith(ROOT):
            path = u[len(ROOT):]
            if path.endswith('.html'):
                if path == '/index.html':
                    return ROOT + '/'
                return ROOT + path[:-5]
        return u

    # og:url / og:image / twitter:image / canonical content attributes
    def clean_meta_content(m):
        val = m.group(2)
        if val.startswith('https://') or val.startswith('http://'):
            cleaned = scrub_url(val)
            return m.group(1) + cleaned + m.group(3)
        return m.group(0)

    text = re.sub(r'(content=["\'])([^"\']+)(["\'])', clean_meta_content, text)
    text = re.sub(r'(href=["\'])(' + re.escape(ROOT) + r'[^"\']+\.html)(["\'])',
                  lambda m: m.group(1) + scrub_url(m.group(2)) + m.group(3), text)

    # JSON-LD strings
    def clean_jsonld_url(m):
        url = m.group(1)
        cleaned = scrub_url(url)
        return f'"{cleaned}"'
    text = re.sub(r'"(' + re.escape(ROOT) + r'[^"]+\.html)"', clean_jsonld_url, text)

    return text


def fix_canonical(text, filepath):
    canon_url = canonical_for(filepath)
    # Replace any existing canonical
    text = re.sub(
        r'<link\s+rel=["\']canonical["\'][^>]*>',
        f'<link rel="canonical" href="{canon_url}">',
        text
    )
    # If no canonical exists, insert after viewport
    if '<link rel="canonical"' not in text:
        text = re.sub(
            r'(<meta name=["\']viewport["\'][^>]*>)',
            r'\1\n    <link rel="canonical" href="' + canon_url + '">',
            text, count=1
        )
    return text


def fix_og_url(text, filepath):
    canon_url = canonical_for(filepath)
    if 'property="og:url"' in text or "property='og:url'" in text:
        text = re.sub(
            r'<meta\s+property=["\']og:url["\'][^>]*>',
            f'<meta property="og:url" content="{canon_url}">',
            text
        )
    return text


def fix_lang(text):
    return re.sub(r'<html\s+lang=["\']en["\']', '<html lang="en-IN"', text)


# Pages needing og:image / twitter:image fixes
MISSING_OG_IMAGE = {
    'mtc.html': 'https://www.tatvamoverseasinc.com/assets/images/pool/lab.webp',
    'calculator.html': 'https://www.tatvamoverseasinc.com/assets/images/tatvamoverseasinc-warehouse-stock.jpg',
    'privacypolicy.html': 'https://www.tatvamoverseasinc.com/assets/images/tatvamoverseasinc-warehouse-stock.jpg',
    'terms.html': 'https://www.tatvamoverseasinc.com/assets/images/tatvamoverseasinc-warehouse-stock.jpg',
}

# Title & desc fixes (only for pages that still fail length check)
TITLE_FIXES = {
    'index.html': 'Stainless Steel &amp; Nickel Alloy Stockist | Tatvam Overseas',
    'products.html': 'Stainless Steel &amp; Alloy Products | Tatvam Overseas Inc',
    'blog/ss-202-vs-ss-304-difference-uses-which-to-buy.html': 'SS 202 vs SS 304: Differences &amp; Uses | Tatvam Overseas',
    'blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror.html': 'SS Sheet Finishes: 2B, BA, No.4, 8K | Tatvam Overseas',
}

DESC_FIXES = {
    'about.html': 'Stockist and supplier of stainless steel and alloys in Mumbai since 1992. ISO 9001:2015 certified. SS 304, 316 &amp; nickel alloys for global export.',
    'blog.html': 'Technical steel guides, grade comparisons &amp; MTC insights from Tatvam Overseas Inc, Mumbai stockist of stainless steel and alloy products.',
    'blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror.html': 'Understand stainless steel sheet finishes from 2B and BA to No.4 and 8K mirror. Compare production, reflectivity, fabrication suitability, and selection.',
}


html_files = sorted(glob.glob('*.html') + glob.glob('*/*.html'))
changed = 0

for f in html_files:
    with open(f, 'r', encoding='utf-8') as fp:
        original = fp.read()

    text = original

    # 1. Canonical
    text = fix_canonical(text, f)

    # 2. og:url
    text = fix_og_url(text, f)

    # 3. Internal .html links
    text = clean_internal_html_refs(text, f)

    # 4. Content URLs (meta, JSON-LD)
    text = clean_content_urls(text, f)

    # 5. lang
    text = fix_lang(text)

    # 6. og:image / twitter:image additions for pages missing them
    if f in MISSING_OG_IMAGE:
        img_url = MISSING_OG_IMAGE[f]
        # Fix wrong og:image
        text = re.sub(
            r'<meta\s+property=["\']og:image["\'][^>]*>',
            f'<meta property="og:image" content="{img_url}">',
            text
        )
        # Add twitter:image if missing
        if 'name="twitter:image"' not in text and "name='twitter:image'" not in text:
            text = re.sub(
                r'(<meta\s+property=["\']og:image["\'][^>]*>)',
                r'\1\n    <meta name="twitter:image" content="' + img_url + '">',
                text, count=1
            )
        # Add og:image if truly missing
        if 'property="og:image"' not in text and "property='og:image'" not in text:
            text = re.sub(
                r'(<meta\s+property=["\']og:url["\'][^>]*>)',
                r'\1\n    <meta property="og:image" content="' + img_url + '">'
                + '\n    <meta name="twitter:image" content="' + img_url + '">',
                text, count=1
            )

    # 7. Title length fixes
    if f in TITLE_FIXES:
        new_title = TITLE_FIXES[f]
        text = re.sub(r'<title>[^<]*</title>', f'<title>{new_title}</title>', text)

    # 8. Description length fixes
    if f in DESC_FIXES:
        new_desc = DESC_FIXES[f]
        text = re.sub(
            r'<meta\s+name=["\']description["\'][^>]*>',
            f'<meta name="description" content="{new_desc}">',
            text
        )

    if text != original:
        with open(f, 'w', encoding='utf-8') as fp:
            fp.write(text)
        changed += 1

print(f'Pass 2 complete. {changed}/{len(html_files)} files modified.')
