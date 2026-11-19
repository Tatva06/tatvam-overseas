#!/usr/bin/env python3
"""
Create 3 new blog posts + site-wide updates for Tatvam Overseas Inc.
"""
import os, re

BASE = "/Users/tatvajain/Desktop/TatvamOverseas"

# ═══════════════════════════════════════════════════════════════════════════════
# HELPER: Blog post HTML template (mirrors ss-202-vs-ss-304 exactly)
# ═══════════════════════════════════════════════════════════════════════════════

def blog_post_html(*, slug, seo_title, meta_desc, h1, category, reading_time,
                   date_published, date_modified, og_image_path, og_image_alt,
                   cover_image_src, cover_image_alt, breadcrumb_short,
                   key_takeaways_html, article_body_html, faq_section_html,
                   related_articles_html, cta_html,
                   schema_json, has_faq_schema=False):
    canonical = f"https://www.tatvamoverseasinc.com/blog/{slug}"
    og_image = f"https://www.tatvamoverseasinc.com/{og_image_path}"

    return f'''<!DOCTYPE html>
<html lang="en-IN">
<head>
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{seo_title}</title>
    <meta name="description" content="{meta_desc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{canonical}">

    <!-- Open Graph -->
    <meta property="og:locale" content="en_IN">
    <meta property="og:site_name" content="Tatvam Overseas Inc">
    <meta property="og:type" content="article">
    <meta property="og:title" content="{seo_title}">
    <meta property="og:description" content="{meta_desc}">
    <meta property="og:url" content="{canonical}">
    <meta property="og:image" content="{og_image}">
    <meta property="og:image:alt" content="{og_image_alt}">

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{seo_title}">
    <meta name="twitter:description" content="{meta_desc}">
    <meta name="twitter:image" content="{og_image}">

    <!-- Fonts & Styling -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script defer src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="../css/style.css">

    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2C5PC2BWQJ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){{dataLayer.push(arguments);}}
      gtag('js', new Date());
      gtag('config', 'G-2C5PC2BWQJ');
    </script>
    <script defer src="../js/analytics.js"></script>

    <!-- Schema Structured Data -->
    <script type="application/ld+json">
{schema_json}
    </script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
    <header id="site-header" class="sticky top-0 z-50"></header>

    <!-- Breadcrumb Bar -->
    <div class="bg-slate-900 border-b border-slate-800 text-slate-400 text-xs py-3">
        <div class="container mx-auto px-6 flex items-center gap-2">
            <a href="/" class="hover:text-emerald-400 transition-colors">Home</a>
            <span>/</span>
            <a href="/blog" class="hover:text-emerald-400 transition-colors">Knowledge</a>
            <span>/</span>
            <span class="text-white font-semibold truncate">{breadcrumb_short}</span>
        </div>
    </div>

    <!-- Article Hero Header -->
    <header class="bg-slate-900 text-white py-12 border-b border-slate-800">
        <div class="container mx-auto px-6 max-w-4xl">
            <div class="flex items-center gap-3 text-xs text-emerald-400 font-bold uppercase tracking-widest mb-4">
                <span>{category}</span>
                <span>&bull;</span>
                <span>{reading_time}</span>
            </div>
            <h1 class="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-6">
                {h1}
            </h1>
            <div class="flex items-center gap-4 text-xs text-slate-400 border-t border-slate-800 pt-4">
                <div class="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm">
                    T
                </div>
                <div>
                    <span class="text-slate-200 font-semibold block">Tatvam Overseas Inc Technical Team</span>
                    <span>Published: {date_published} &nbsp;|&nbsp; Last updated: {date_modified}</span>
                </div>
            </div>
        </div>
    </header>

    <!-- Main Article Body -->
    <main class="flex-grow container mx-auto px-6 py-12 max-w-4xl">

        <!-- Featured Image -->
        <div class="mb-10 rounded-2xl overflow-hidden shadow-xl border border-slate-200">
            <img src="{cover_image_src}" alt="{cover_image_alt}" width="800" height="450" loading="eager" class="w-full h-80 md:h-96 object-cover">
        </div>

{key_takeaways_html}

        <!-- Article Prose Content -->
        <article class="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">
{article_body_html}
        </article>

{faq_section_html}

{related_articles_html}

{cta_html}

        <!-- Navigation Back -->
        <div class="mt-10 pt-6 border-t border-slate-200 flex justify-between items-center text-sm">
            <a href="/blog" class="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-bold transition-colors">
                <i data-lucide="arrow-left" class="w-4 h-4"></i> Back to Knowledge Hub
            </a>
            <a href="/products" class="inline-flex items-center gap-2 text-emerald-600 hover:text-emerald-700 font-bold transition-colors">
                View Full Product Inventory <i data-lucide="arrow-right" class="w-4 h-4"></i>
            </a>
        </div>

    </main>

    <footer id="site-footer" class="bg-slate-900 text-slate-400 font-sans border-t-4 border-emerald-600"></footer>
    <script src="../js/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {{
            if (typeof lucide !== 'undefined') lucide.createIcons();
        }});
    </script>
</body>
</html>'''


def make_schema(*, headline, description, date_pub, date_mod, canonical, image_url, breadcrumb_name, faq_items=None):
    import json
    graph = [
        {
            "@type": "Article",
            "headline": headline,
            "description": description,
            "datePublished": date_pub,
            "dateModified": date_mod,
            "mainEntityOfPage": canonical,
            "image": image_url,
            "author": {"@type": "Organization", "name": "Tatvam Overseas Inc"},
            "publisher": {"@type": "Organization", "name": "Tatvam Overseas Inc", "url": "https://www.tatvamoverseasinc.com/"}
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tatvamoverseasinc.com/"},
                {"@type": "ListItem", "position": 2, "name": "Technical Knowledge Hub", "item": "https://www.tatvamoverseasinc.com/blog"},
                {"@type": "ListItem", "position": 3, "name": breadcrumb_name, "item": canonical}
            ]
        }
    ]
    if faq_items:
        faq_entities = []
        for q, a in faq_items:
            faq_entities.append({
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a}
            })
        graph.append({"@type": "FAQPage", "mainEntity": faq_entities})
    return json.dumps({"@context": "https://schema.org", "@graph": graph}, indent=2, ensure_ascii=False)


def standard_cta():
    return '''        <!-- Sourcing CTA Section -->
        <div class="mt-12 rounded-2xl bg-gradient-to-br from-slate-900 to-slate-800 p-8 text-center text-white shadow-xl border border-slate-700">
            <span class="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2 block">Stockist, Dealer &amp; Supplier in Mumbai</span>
            <h3 class="text-2xl font-black mb-3">Require Material for an Upcoming Project?</h3>
            <p class="text-slate-300 mb-6 text-sm max-w-lg mx-auto leading-relaxed">
                Tatvam Overseas Inc provides certified stainless steel sheets, coils, and plates with full EN 10204 3.1 MTCs and PMI verification on request in Mumbai.
            </p>
            <div class="flex flex-col sm:flex-row gap-3 justify-center">
                <a href="/contact" class="inline-flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-7 py-3 rounded-xl transition-all shadow-lg text-sm">
                    <i data-lucide="mail" class="w-4 h-4"></i> Request Material Quote
                </a>
                <a href="https://wa.me/919930301181" target="_blank" rel="noopener noreferrer" class="inline-flex items-center justify-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-7 py-3 rounded-xl transition-all text-sm">
                    <i data-lucide="message-circle" class="w-4 h-4"></i> Chat on WhatsApp
                </a>
                <a href="/calculator" class="inline-flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 font-bold px-7 py-3 rounded-xl transition-all text-sm">
                    <i data-lucide="calculator" class="w-4 h-4 text-emerald-400"></i> Weight Calculator
                </a>
            </div>
        </div>'''


def related_block(links_html):
    return f'''        <!-- Related Articles Section -->
        <div class="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h3 class="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i data-lucide="book-open" class="w-5 h-5 text-emerald-600"></i> Related Technical Guides
            </h3>
            <div class="grid sm:grid-cols-2 gap-4">
{links_html}
            </div>
        </div>'''


def related_link(href, title, date_str, reading_time):
    return f'''                <a href="{href}" class="flex gap-3 items-start bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl p-4 transition-all group">
                    <div>
                        <p class="font-bold text-sm text-slate-900 group-hover:text-emerald-700 leading-snug">{title}</p>
                        <p class="text-xs text-slate-500 mt-1">{date_str} · {reading_time}</p>
                    </div>
                </a>'''


# ═══════════════════════════════════════════════════════════════════════════════
# POST 1: SS Sheet Price per kg
# ═══════════════════════════════════════════════════════════════════════════════

def create_post1():
    slug = "ss-sheet-price-per-kg-india-304-202-factors"
    seo_title = "SS Sheet Price per kg in India: 304 vs 202 Factors"  # 51 chars
    meta_desc = "Why SS 304 and SS 202 sheet prices differ and change. Learn the factors behind the rate per kg and how to compare quotes fairly. Get today's rate."  # 148 chars
    h1 = "SS Sheet Price per kg in India: What Decides the Rate (304 vs 202)"
    canonical = f"https://www.tatvamoverseasinc.com/blog/{slug}"
    image_path = "assets/images/pool/sheets_prod.webp"

    faq_items = [
        ("Is the price per kg the same for all thicknesses?",
         "Not always. Dealers often vary the rate by thickness and finish, so ask for a quote for your exact specification."),
        ("Can I get the price without calling?",
         "Yes. Send your grade, thickness, finish and quantity on WhatsApp and you will get the current rate.")
    ]

    schema = make_schema(
        headline=h1, description=meta_desc,
        date_pub="2026-11-19", date_mod="2026-11-19",
        canonical=canonical, image_url=f"https://www.tatvamoverseasinc.com/{image_path}",
        breadcrumb_name="SS Sheet Price per kg in India",
        faq_items=faq_items
    )

    key_takeaways = '''        <!-- Key Takeaways Callout Box -->
        <div class="bg-emerald-50/60 border-2 border-emerald-500/30 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i data-lucide="bookmark-check" class="w-5 h-5 text-emerald-600"></i> Key Takeaways
            </h2>
            <ul class="space-y-3">
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>There is no single fixed rate for SS sheets in India — the price per kg depends on grade, mill, finish, thickness, quantity and market timing.</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>SS 304 costs more than SS 202 mainly because of its higher nickel content (8–10.5% vs lower in 202).</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>Always compare quotes on the same basis: grade, finish, mill, thickness tolerance, MTC inclusion, and payment terms.</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>A quote that is far below the others usually differs on mill quality, thickness tolerance or missing certificates.</span>
                </li>
            </ul>
        </div>'''

    article_body = '''
            <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
                If you have ever asked three dealers for a stainless steel sheet price and received three different numbers, you are not alone. There is no single fixed rate for SS sheets in India. The price per kg moves with the grade, the mill, the finish, the thickness and the market. This guide explains what actually decides the rate, so you can compare quotes properly instead of just picking the lowest number.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">The Main Factors Behind SS Sheet Price</h2>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">1. Grade and Nickel Content</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                SS 304 contains roughly 8 to 10.5 percent nickel, while SS 202 is a 200-series grade where part of the nickel is replaced by manganese and nitrogen. Nickel is the most expensive input, which is why SS 202 usually costs less than SS 304. Changes in the global nickel market feed directly into the price of 304.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">2. Mill and Quality</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Sheets from different mills are not priced the same. Prime-quality material with proper traceability costs more than non-prime or unmarked stock. Always ask for the mill name and a Mill Test Certificate (<a href="/blog/what-is-en-10204-3-1-mill-test-certificate" class="text-emerald-600 font-semibold hover:underline">EN 10204 3.1</a>) so you know what you are paying for.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">3. Finish</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                A standard 2B finish is cheaper than BA, No.4 (brushed) or 8K mirror, because the extra polishing adds cost. Decorative finishes such as PVD colour coating or etching are priced separately again. See our guide on <a href="/blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror" class="text-emerald-600 font-semibold hover:underline">stainless steel sheet finishes</a> for details.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">4. Thickness and Size</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Very thin and very thick sheets can carry different premiums. Standard sizes like 4 &times; 8 ft and 5 &times; 10 ft are easier to source than special sizes. The price per kg may be the same, but the price per sheet depends on the weight.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">5. Quantity and Cutting</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Full sheets cost less per kg than cut-to-size pieces, and larger orders usually get better rates. Shearing or laser cutting adds labour and creates offcuts.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">6. Timing</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Prices change with the nickel market and mill price revisions, so a quote is valid only for a short time. This is why reputable dealers quote with a validity period.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">7. Taxes, Freight and Payment Terms</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                GST, transport to your site and credit terms all change the final amount. Always check whether a quoted rate includes them.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">How to Compare Two Quotes Fairly</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">Before deciding, make sure both quotes match on:</p>
            <ul class="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>Grade and standard (for example SS 304, ASTM A240)</li>
                <li>Thickness and the tolerance allowed</li>
                <li>Finish (2B, BA, No.4, 8K)</li>
                <li>Mill or brand, and whether the material is prime</li>
                <li>Mill Test Certificate provided or not</li>
                <li>GST, freight and loading included or not</li>
                <li>Quote validity and payment terms</li>
            </ul>
            <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
                <p class="font-bold text-amber-800 text-sm">💡 Buyer Tip</p>
                <p class="text-amber-700 text-sm mt-1">A quote that is far below the others usually differs on one of these points, most often mill quality, thickness tolerance or missing certificates.</p>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Why SS 202 Costs Less Than SS 304</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                The lower nickel content makes SS 202 more affordable. It is a good choice for indoor decorative work, utensils and general fabrication away from moisture and chlorides. For kitchens, food contact, outdoor or coastal use, SS 304 (or 316L in harsher conditions) is the safer choice. For a detailed comparison, read our guide: <a href="/blog/ss-202-vs-ss-304-difference-uses-which-to-buy" class="text-emerald-600 font-semibold hover:underline">SS 202 vs SS 304: Differences, Uses and Which Grade to Buy</a>.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Get Today's Rate</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Tell us the grade, thickness, size, finish and quantity, and we will send a quote with Mill Test Certificate details. See our pages for <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 304 sheets</a> and <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 202 sheets (Jindal J1, J4)</a>, or <a href="/contact" class="text-emerald-600 font-semibold hover:underline">contact us for a quote</a>.
            </p>
            <div class="flex flex-wrap gap-3 mt-4">
                <a href="https://wa.me/919930301181?text=Hello%2C%20I%20need%20today%27s%20rate%20for%20SS%20sheets" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg">
                    <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp: Get Today's Rate
                </a>
            </div>'''

    # FAQ visible on page — matches schema
    faq_section = '''        <!-- Frequently Asked Questions Section -->
        <section class="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i data-lucide="help-circle" class="w-5 h-5 text-emerald-600"></i> Frequently Asked Questions
            </h2>
            <div class="space-y-3">
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group" open>
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>Is the price per kg the same for all thicknesses?</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            Not always. Dealers often vary the rate by thickness and finish, so ask for a quote for your exact specification.
                        </div>
                    </details>
                </div>
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group">
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>Can I get the price without calling?</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            Yes. Send your grade, thickness, finish and quantity on WhatsApp and you will get the current rate.
                            <!-- TODO(owner): confirm response time before adding any promise -->
                        </div>
                    </details>
                </div>
            </div>
        </section>'''

    related = related_block(
        related_link("/blog/ss-202-vs-ss-304-difference-uses-which-to-buy", "SS 202 vs SS 304: Differences, Uses and Which Grade to Buy", "Oct 21, 2026", "6 min read") + "\n" +
        related_link("/blog/ss-sheet-weight-formula-chart-304-202", "SS Sheet Weight Calculator: Formula &amp; Chart (304, 202)", "Nov 19, 2026", "5 min read")
    )

    html = blog_post_html(
        slug=slug, seo_title=seo_title, meta_desc=meta_desc, h1=h1,
        category="Buying Guide", reading_time="5 min read",
        date_published="2026-11-19", date_modified="2026-11-19",
        og_image_path=image_path, og_image_alt="SS 304 and 202 stainless steel sheets in Mumbai warehouse",
        cover_image_src=f"../{image_path}",
        cover_image_alt="Stainless steel 304 and 202 sheets stacked for dealer pricing comparison",
        breadcrumb_short="SS Sheet Price per kg",
        key_takeaways_html=key_takeaways,
        article_body_html=article_body,
        faq_section_html=faq_section,
        related_articles_html=related,
        cta_html=standard_cta(),
        schema_json=schema, has_faq_schema=True
    )

    path = os.path.join(BASE, "blog", f"{slug}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"✅ Post 1: {slug}.html")
    print(f"   Title: '{seo_title}' ({len(seo_title)} chars)")
    print(f"   Desc:  ({len(meta_desc)} chars)")
    return slug


# ═══════════════════════════════════════════════════════════════════════════════
# POST 2: Designer SS Sheets
# ═══════════════════════════════════════════════════════════════════════════════

def create_post2():
    slug = "designer-stainless-steel-sheets-pvd-mirror-etched-guide"
    seo_title = "Designer Stainless Steel Sheets: PVD, Mirror, Etched"  # 54 chars
    meta_desc = "Guide to designer stainless steel sheets: PVD colours, mirror, hairline, etched and embossed finishes, best grades and tips for buyers in India."  # 145 chars
    h1 = "Designer Stainless Steel Sheets: PVD Colours, Mirror, Hairline and Etched Finishes"
    canonical = f"https://www.tatvamoverseasinc.com/blog/{slug}"
    image_path = "assets/images/pool/pvd_designer_sheets.webp"

    faq_items = [
        ("Is PVD coating durable?",
         "PVD is hard and generally resistant to fading, but it can be damaged by abrasive cleaning or sharp impact. Handle and clean as recommended."),
        ("Can I get custom sizes and colours?",
         "Availability depends on stock and the coating line. Contact us with your requirement and we will confirm what can be supplied.")
    ]

    schema = make_schema(
        headline=h1, description=meta_desc,
        date_pub="2026-11-19", date_mod="2026-11-19",
        canonical=canonical, image_url=f"https://www.tatvamoverseasinc.com/{image_path}",
        breadcrumb_name="Designer Stainless Steel Sheets Guide",
        faq_items=faq_items
    )

    key_takeaways = '''        <!-- Key Takeaways Callout Box -->
        <div class="bg-emerald-50/60 border-2 border-emerald-500/30 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i data-lucide="bookmark-check" class="w-5 h-5 text-emerald-600"></i> Key Takeaways
            </h2>
            <ul class="space-y-3">
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>Designer sheets are standard SS 304 or 202 sheets with a decorative surface: PVD colour, 8K mirror, hairline, etched or embossed.</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>SS 304 is the preferred base grade for most decorative applications. Use SS 202 only for dry indoor work.</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>Order the whole job from one batch to ensure consistent colour and finish across panels.</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>Always request sample pieces to approve colour and finish before bulk supply.</span>
                </li>
            </ul>
        </div>'''

    article_body = '''
            <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
                Designer stainless steel sheets are used wherever steel needs to look as good as it performs: lift cabins, wall cladding, reception desks, ceilings, furniture and signage. But choosing between PVD colours, mirror, hairline and etched patterns can be confusing. This guide explains each option and what to check before you order.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">What Counts as a Designer or Decorative Sheet?</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                A designer sheet is a stainless steel sheet whose surface has been given a special finish or pattern for appearance. The base is usually <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 304</a> or <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 202</a> sheet, and the decoration is added by polishing, coating, etching or embossing.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Common Designer Finishes</h2>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">PVD Colour Coating</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Physical vapour deposition applies a very thin coloured layer in shades such as gold, rose gold, black, bronze, blue and champagne. It is popular for lift doors, wall panels and luxury interiors. The colour is applied over a base finish, often mirror or hairline.
            </p>
            <!-- TODO(owner): add real photo of PVD colour coated sheets with unique alt text -->

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">Mirror (8K)</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                A highly polished, reflective surface. It looks striking but shows fingerprints and scratches easily, so it suits low-touch areas or panels that can be cleaned often.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">Hairline and No.4 (Brushed)</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                A fine linear grain that hides minor scratches and fingerprints. It is the most practical choice for high-traffic surfaces. See our guide on <a href="/blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror" class="text-emerald-600 font-semibold hover:underline">sheet finishes: 2B, BA, No.4 and 8K</a> for how these base finishes are made.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">Etched Patterns</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                A chemical process creates patterns or textures on the surface, sometimes combined with colour. It is used for feature walls, lift interiors and decorative panels.
            </p>

            <h3 class="text-xl font-bold text-slate-900 mt-6 mb-3">Embossed and Textured Sheets</h3>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Raised patterns are pressed into the sheet. They add grip and depth and also hide wear.
            </p>
            <!-- TODO(owner): add real photos of each finish type with descriptive alt text -->

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Which Grade Should You Choose?</h2>
            <div class="overflow-x-auto my-6">
                <table class="w-full text-left border-collapse border border-slate-200 rounded-lg">
                    <thead>
                        <tr class="bg-slate-900 text-white text-xs uppercase tracking-wider">
                            <th class="py-3 px-4">Grade</th>
                            <th class="py-3 px-4">Best For</th>
                            <th class="py-3 px-4">Notes</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">SS 304</td><td class="py-2.5 px-4">Interiors, lifts, kitchens, any area with moisture</td><td class="py-2.5 px-4">Standard choice for most decorative applications</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">SS 316L</td><td class="py-2.5 px-4">Coastal locations, chemical exposure</td><td class="py-2.5 px-4">Better chloride resistance than 304</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">SS 202</td><td class="py-2.5 px-4">Dry, indoor decorative work</td><td class="py-2.5 px-4">Lower cost but less corrosion resistance than 304</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Tips Before You Order</h2>
            <ol class="list-decimal pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Order the whole job from one batch.</strong> Colour and finish can vary slightly between batches, so panels that must match should come from the same lot.</li>
                <li><strong>Check grain direction.</strong> For brushed and hairline sheets, keep the grain running the same way across all panels during fabrication.</li>
                <li><strong>Keep the protective film on</strong> until installation is finished, to avoid scratches.</li>
                <li><strong>Ask for sample pieces</strong> to approve the colour and finish before bulk supply.</li>
                <li><strong>Clean gently.</strong> Use mild soap and a soft cloth. Avoid abrasive pads and harsh chemicals, especially on PVD and mirror finishes.</li>
                <li><strong>Confirm the specification in writing:</strong> grade, thickness, size, finish, colour and quantity.</li>
            </ol>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Ask for Samples and a Quote</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                See our range of <a href="/products/decorative-stainless-steel-sheets-mumbai" class="text-emerald-600 font-semibold hover:underline">decorative stainless steel sheets</a>, or <a href="/contact" class="text-emerald-600 font-semibold hover:underline">send us your requirement</a> with grade, finish, colour, size and quantity.
            </p>
            <!-- TODO(owner): add real photos of designer sheets with unique alt text -->
            <div class="flex flex-wrap gap-3 mt-4">
                <a href="https://wa.me/919930301181?text=Hello%2C%20I%20need%20a%20quote%20for%20designer%20stainless%20steel%20sheets" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg">
                    <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp: +91 99303 01181
                </a>
            </div>'''

    faq_section = '''        <!-- Frequently Asked Questions Section -->
        <section class="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i data-lucide="help-circle" class="w-5 h-5 text-emerald-600"></i> Frequently Asked Questions
            </h2>
            <div class="space-y-3">
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group" open>
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>Is PVD coating durable?</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            PVD is hard and generally resistant to fading, but it can be damaged by abrasive cleaning or sharp impact. Handle and clean as recommended.
                        </div>
                    </details>
                </div>
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group">
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>Can I get custom sizes and colours?</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            Availability depends on stock and the coating line. Contact us with your requirement and we will confirm what can be supplied.
                            <!-- TODO(owner): confirm which finishes, colours and sizes are actually stocked; make no specific stock claims until then -->
                        </div>
                    </details>
                </div>
            </div>
        </section>'''

    related = related_block(
        related_link("/blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror", "Stainless Steel Sheet Finishes: 2B, BA, No.4 &amp; 8K Mirror Explained", "Oct 21, 2026", "6 min read") + "\n" +
        related_link("/blog/ss-sheet-price-per-kg-india-304-202-factors", "SS Sheet Price per kg in India: 304 vs 202 Factors", "Nov 19, 2026", "5 min read")
    )

    html = blog_post_html(
        slug=slug, seo_title=seo_title, meta_desc=meta_desc, h1=h1,
        category="Product Guide", reading_time="5 min read",
        date_published="2026-11-19", date_modified="2026-11-19",
        og_image_path=image_path, og_image_alt="PVD colour coated designer stainless steel sheets in gold and rose gold finish",
        cover_image_src=f"../{image_path}",
        cover_image_alt="Designer stainless steel sheets with PVD gold and rose gold colour coating",
        breadcrumb_short="Designer SS Sheets Guide",
        key_takeaways_html=key_takeaways,
        article_body_html=article_body,
        faq_section_html=faq_section,
        related_articles_html=related,
        cta_html=standard_cta(),
        schema_json=schema, has_faq_schema=True
    )

    path = os.path.join(BASE, "blog", f"{slug}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"✅ Post 2: {slug}.html")
    print(f"   Title: '{seo_title}' ({len(seo_title)} chars)")
    print(f"   Desc:  ({len(meta_desc)} chars)")
    return slug


# ═══════════════════════════════════════════════════════════════════════════════
# POST 3: SS Sheet Weight Formula & Chart
# ═══════════════════════════════════════════════════════════════════════════════

def create_post3():
    slug = "ss-sheet-weight-formula-chart-304-202"
    seo_title = "SS Sheet Weight Calculator: Formula & Chart (304, 202)"  # 54 chars — wait, & is &amp; in HTML
    # In HTML <title> the & is &amp; but we measure the display chars
    seo_title_display = "SS Sheet Weight Calculator: Formula & Chart (304, 202)"
    seo_title_html = "SS Sheet Weight Calculator: Formula &amp; Chart (304, 202)"
    meta_desc = "Calculate stainless steel sheet weight with a simple formula. Includes density for SS 304 and 202 and a weight chart for 4x8 ft sheets."  # 134 chars
    h1 = "SS Sheet Weight Calculation: Formula, Density and Chart for SS 304 and SS 202"
    canonical = f"https://www.tatvamoverseasinc.com/blog/{slug}"
    image_path = "assets/images/pool/sheets_2b.webp"

    # Computed weight values (area = 1.2192 * 2.4384 = 2.9729 m^2)
    area = 1.2192 * 2.4384
    d304 = 7.93
    d202 = 7.80
    weights = {}
    for t in [0.5, 0.8, 1.0, 1.2, 1.5, 2.0, 3.0]:
        weights[t] = (round(area * t * d304, 2), round(area * t * d202, 2))

    faq_items = [
        ("Why does SS 202 weigh slightly less than SS 304?",
         "Its density is a little lower because of its different composition."),
        ("Can I use this for other sheet sizes?",
         "Yes. Multiply the area of any sheet in square metres by the thickness in mm and the density.")
    ]

    schema = make_schema(
        headline=h1, description=meta_desc,
        date_pub="2026-11-19", date_mod="2026-11-19",
        canonical=canonical, image_url=f"https://www.tatvamoverseasinc.com/{image_path}",
        breadcrumb_name="SS Sheet Weight Formula & Chart",
        faq_items=faq_items
    )

    key_takeaways = '''        <!-- Key Takeaways Callout Box -->
        <div class="bg-emerald-50/60 border-2 border-emerald-500/30 rounded-2xl p-6 md:p-8 mb-10 shadow-sm">
            <h2 class="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
                <i data-lucide="bookmark-check" class="w-5 h-5 text-emerald-600"></i> Key Takeaways
            </h2>
            <ul class="space-y-3">
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>Weight (kg) = Length (m) &times; Width (m) &times; Thickness (mm) &times; Density (g/cm&sup3;)</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>SS 304 density: 7.93 g/cm&sup3; &nbsp;|&nbsp; SS 202 density: 7.80 g/cm&sup3;</span>
                </li>
                <li class="flex items-start gap-3 text-slate-700 text-sm">
                    <span class="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">&check;</span>
                    <span>These are theoretical weights. Actual weight varies slightly because of thickness tolerance and edge trimming.</span>
                </li>
            </ul>
        </div>'''

    # Build the weight table rows
    table_rows = ""
    for t in [0.5, 0.8, 1.0, 1.2, 1.5, 2.0, 3.0]:
        w304, w202 = weights[t]
        bg = "bg-white" if table_rows.count("bg-slate-50") % 2 == 0 else "bg-slate-50"
        # alternating
        idx = [0.5, 0.8, 1.0, 1.2, 1.5, 2.0, 3.0].index(t)
        bg = "bg-white" if idx % 2 == 0 else "bg-slate-50"
        table_rows += f'                        <tr class="border-b {bg}"><td class="py-2.5 px-4 font-bold">{t} mm</td><td class="py-2.5 px-4">{w304:.2f}</td><td class="py-2.5 px-4">{w202:.2f}</td></tr>\n'

    article_body = f'''
            <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
                Knowing the weight of a stainless steel sheet helps you estimate cost, plan transport and check what you receive. The calculation is simple once you know the formula and the density of the grade.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">The Formula</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Use this formula for the theoretical weight of a flat sheet:
            </p>
            <div class="font-mono text-sm bg-slate-900 text-emerald-400 p-4 rounded-lg mb-4">
                Weight (kg) = Length (m) &times; Width (m) &times; Thickness (mm) &times; Density (g/cm<sup>3</sup>)
            </div>
            <p class="text-slate-600 mb-4 leading-relaxed">
                The units work out neatly: a sheet of 1 m &times; 1 m &times; 1 mm contains 1,000 cm<sup>3</sup> of steel, so its weight in kg equals the density number.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Density Values</h2>
            <ul class="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>SS 304:</strong> about 7.93 g/cm<sup>3</sup></li>
                <li><strong>SS 202:</strong> about 7.80 g/cm<sup>3</sup></li>
            </ul>
            <p class="text-xs text-slate-500 italic mb-4">These are commonly used values. Small differences between mills and compositions exist, so use the figures on your Mill Test Certificate for exact work.</p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Worked Example</h2>
            <p class="text-slate-600 mb-2 leading-relaxed">
                A 4 ft &times; 8 ft sheet of SS 304, 1.0 mm thick:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li>4 ft = 1.2192 m and 8 ft = 2.4384 m, so the area is about 2.973 m<sup>2</sup></li>
                <li>Weight = 2.973 &times; 1.0 &times; 7.93 = about <strong>23.58 kg</strong></li>
            </ul>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Quick Weight Chart: 4 &times; 8 ft Sheet (Theoretical)</h2>
            <div class="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900 text-white text-xs uppercase tracking-wider">
                            <th class="py-3 px-4">Thickness</th>
                            <th class="py-3 px-4">SS 304 (kg)</th>
                            <th class="py-3 px-4">SS 202 (kg)</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-100">
{table_rows}                    </tbody>
                </table>
            </div>
            <p class="text-xs text-slate-500 italic mb-4">These are theoretical weights. Actual sheet weight varies slightly because of thickness tolerance and edge trimming, so treat the figures as estimates for planning, not for final billing.</p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Common Mistakes</h2>
            <ul class="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Mixing units.</strong> Convert feet and inches to metres before using the formula.</li>
                <li><strong>Using one density for every grade.</strong> Different grades have slightly different densities.</li>
                <li><strong>Forgetting tolerance.</strong> Real sheets can be a little under or over nominal thickness.</li>
                <li><strong>Using sheet weight for pipes or bars.</strong> Those need different formulas.</li>
            </ul>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Use Our Calculator</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Skip the manual maths with our <a href="/calculator" class="text-emerald-600 font-semibold hover:underline">steel weight calculator</a> for sheets, pipes and bars. When you are ready to buy, see our <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 304 sheets</a> and <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 202 sheets</a>, or <a href="/contact" class="text-emerald-600 font-semibold hover:underline">request a quote</a>.
            </p>'''

    faq_section = '''        <!-- Frequently Asked Questions Section -->
        <section class="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i data-lucide="help-circle" class="w-5 h-5 text-emerald-600"></i> Frequently Asked Questions
            </h2>
            <div class="space-y-3">
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group" open>
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>Why does SS 202 weigh slightly less than SS 304?</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            Its density is a little lower because of its different composition.
                        </div>
                    </details>
                </div>
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group">
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>Can I use this for other sheet sizes?</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            Yes. Multiply the area of any sheet in square metres by the thickness in mm and the density.
                        </div>
                    </details>
                </div>
            </div>
        </section>'''

    related = related_block(
        related_link("/blog/ss-sheet-price-per-kg-india-304-202-factors", "SS Sheet Price per kg in India: 304 vs 202 Factors", "Nov 19, 2026", "5 min read") + "\n" +
        related_link("/blog/ss-202-vs-ss-304-difference-uses-which-to-buy", "SS 202 vs SS 304: Differences, Uses and Which Grade to Buy", "Oct 21, 2026", "6 min read")
    )

    # For the HTML title tag, & must be &amp;
    html = blog_post_html(
        slug=slug, seo_title=seo_title_html, meta_desc=meta_desc, h1=h1,
        category="Technical Guide", reading_time="5 min read",
        date_published="2026-11-19", date_modified="2026-11-19",
        og_image_path=image_path, og_image_alt="Stainless steel 2B finish sheets for weight calculation reference",
        cover_image_src=f"../{image_path}",
        cover_image_alt="SS 304 2B finish cold rolled sheets used for weight calculation demonstration",
        breadcrumb_short="SS Sheet Weight Formula",
        key_takeaways_html=key_takeaways,
        article_body_html=article_body,
        faq_section_html=faq_section,
        related_articles_html=related,
        cta_html=standard_cta(),
        schema_json=schema, has_faq_schema=True
    )

    path = os.path.join(BASE, "blog", f"{slug}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"✅ Post 3: {slug}.html")
    print(f"   Title: '{seo_title_display}' ({len(seo_title_display)} chars)")
    print(f"   Desc:  ({len(meta_desc)} chars)")
    return slug


# ═══════════════════════════════════════════════════════════════════════════════
# UPDATE blog-data.js — add 3 new entries at the top of const blogs = [
# ═══════════════════════════════════════════════════════════════════════════════

def update_blog_data():
    path = os.path.join(BASE, "js", "blog-data.js")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add "Buying Guide" and "Product Guide" to CATEGORY_COLORS if not present
    if '"Buying Guide"' not in content:
        content = content.replace(
            '  "default":',
            '  "Buying Guide":      { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-500"   },\n  "Product Guide":      { bg: "bg-rose-100",    text: "text-rose-700",    dot: "bg-rose-500"    },\n  "default":'
        )

    new_entries = '''
  // ══════════════════════════════════════════════════════════════════════════
  // SS Sheet Price per kg in India: 304 vs 202 Factors
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ss-sheet-price-per-kg-india-304-202-factors",
    title: "SS Sheet Price per kg in India: What Decides the Rate (304 vs 202)",
    date: "Nov 19, 2026",
    category: "Buying Guide",
    featured: false,
    image: "assets/images/pool/sheets_prod.webp",
    coverImage: "assets/images/pool/sheets_prod.webp",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-11-19",
    seoTitle: "SS Sheet Price per kg in India: 304 vs 202 Factors",
    seoDescription: "Why SS 304 and SS 202 sheet prices differ and change. Learn the factors behind the rate per kg and how to compare quotes fairly. Get today\\'s rate.",
    keywords: ["ss 304 sheet price", "ss 202 sheet price", "ss sheet price per kg", "stainless steel sheet rate india"],
    tags: ["SS 304", "SS 202", "Pricing", "Buying Guide"],
    snippet: "There is no single fixed rate for SS sheets in India. The price per kg depends on grade, mill, finish, thickness, quantity and market timing. This guide explains all the factors and how to compare quotes properly.",
    relatedIds: ["ss-202-vs-ss-304-difference-uses-which-to-buy", "ss-sheet-weight-formula-chart-304-202"],
    content: (function() {
      return `
      <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
        There is no single fixed rate for SS sheets in India. The price per kg depends on grade, mill, finish, thickness, quantity and market timing. This guide explains all the factors and how to compare quotes properly.
      </p>
      `;
    })()
  },

  // ══════════════════════════════════════════════════════════════════════════
  // Designer Stainless Steel Sheets: PVD, Mirror, Etched Guide
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "designer-stainless-steel-sheets-pvd-mirror-etched-guide",
    title: "Designer Stainless Steel Sheets: PVD Colours, Mirror, Hairline and Etched Finishes",
    date: "Nov 19, 2026",
    category: "Product Guide",
    featured: false,
    image: "assets/images/pool/pvd_designer_sheets.webp",
    coverImage: "assets/images/pool/pvd_designer_sheets.webp",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-11-19",
    seoTitle: "Designer Stainless Steel Sheets: PVD, Mirror, Etched",
    seoDescription: "Guide to designer stainless steel sheets: PVD colours, mirror, hairline, etched and embossed finishes, best grades and tips for buyers in India.",
    keywords: ["designer stainless steel sheet", "PVD stainless steel", "mirror finish ss sheet", "etched stainless steel", "decorative ss sheet"],
    tags: ["Designer Sheets", "PVD", "Mirror", "Etched", "Product Guide"],
    snippet: "Designer stainless steel sheets are used wherever steel needs to look as good as it performs. This guide covers PVD colours, mirror, hairline, etched and embossed finishes, plus which grade to choose and tips for ordering.",
    relatedIds: ["stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror", "ss-sheet-price-per-kg-india-304-202-factors"],
    content: (function() {
      return `
      <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
        Designer stainless steel sheets are used wherever steel needs to look as good as it performs. This guide covers PVD colours, mirror, hairline, etched and embossed finishes, plus which grade to choose and tips for ordering.
      </p>
      `;
    })()
  },

  // ══════════════════════════════════════════════════════════════════════════
  // SS Sheet Weight Calculator: Formula & Chart (304, 202)
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ss-sheet-weight-formula-chart-304-202",
    title: "SS Sheet Weight Calculation: Formula, Density and Chart for SS 304 and SS 202",
    date: "Nov 19, 2026",
    category: "Technical Guide",
    featured: false,
    image: "assets/images/pool/sheets_2b.webp",
    coverImage: "assets/images/pool/sheets_2b.webp",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-11-19",
    seoTitle: "SS Sheet Weight Calculator: Formula & Chart (304, 202)",
    seoDescription: "Calculate stainless steel sheet weight with a simple formula. Includes density for SS 304 and 202 and a weight chart for 4x8 ft sheets.",
    keywords: ["ss sheet weight calculator", "stainless steel sheet weight formula", "ss 304 sheet weight", "ss 202 sheet weight", "steel weight chart"],
    tags: ["Weight Calculator", "SS 304", "SS 202", "Technical Guide", "Formula"],
    snippet: "Weight (kg) = Length (m) × Width (m) × Thickness (mm) × Density. SS 304 density is 7.93 g/cm³ and SS 202 is 7.80 g/cm³. Includes a weight chart for 4×8 ft sheets.",
    relatedIds: ["ss-sheet-price-per-kg-india-304-202-factors", "ss-202-vs-ss-304-difference-uses-which-to-buy"],
    content: (function() {
      return `
      <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
        Weight (kg) = Length (m) × Width (m) × Thickness (mm) × Density. SS 304 density is 7.93 g/cm³ and SS 202 is 7.80 g/cm³. See a weight chart for 4×8 ft sheets and avoid common calculation mistakes.
      </p>
      `;
    })()
  },

'''

    # Insert after "const blogs = ["
    content = content.replace("const blogs = [\n", "const blogs = [\n" + new_entries, 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ blog-data.js updated with 3 new entries")


# ═══════════════════════════════════════════════════════════════════════════════
# UPDATE blog.html — add 3 new article cards at the top of #blog-grid
# ═══════════════════════════════════════════════════════════════════════════════

def update_blog_index():
    path = os.path.join(BASE, "blog.html")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    new_cards = '''
                <article data-category="Buying Guide" class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                    <div class="h-52 relative overflow-hidden">
                        <img src="assets/images/pool/sheets_prod.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="250" alt="SS 304 and 202 sheet price comparison factors India">
                        <span class="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Buying Guide</span>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="text-xs text-slate-400 mb-2">Nov 19, 2026 · 5 min read</div>
                        <h2 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            <a href="/blog/ss-sheet-price-per-kg-india-304-202-factors">SS Sheet Price per kg in India: What Decides the Rate (304 vs 202)</a>
                        </h2>
                        <p class="text-sm text-slate-500 mb-4 line-clamp-3">Why SS 304 and SS 202 sheet prices differ and change. Learn the factors behind the rate per kg and how to compare quotes fairly.</p>
                        <a href="/blog/ss-sheet-price-per-kg-india-304-202-factors" class="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:gap-2.5 transition-all">
                            Read Full Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>
                </article>

                <article data-category="Product Guide" class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                    <div class="h-52 relative overflow-hidden">
                        <img src="assets/images/pool/pvd_designer_sheets.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="250" alt="Designer PVD colour stainless steel sheets for interiors">
                        <span class="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Product Guide</span>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="text-xs text-slate-400 mb-2">Nov 19, 2026 · 5 min read</div>
                        <h2 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            <a href="/blog/designer-stainless-steel-sheets-pvd-mirror-etched-guide">Designer SS Sheets: PVD Colours, Mirror, Hairline &amp; Etched</a>
                        </h2>
                        <p class="text-sm text-slate-500 mb-4 line-clamp-3">Guide to designer stainless steel sheets: PVD colours, mirror, hairline, etched and embossed finishes, best grades and tips for buyers.</p>
                        <a href="/blog/designer-stainless-steel-sheets-pvd-mirror-etched-guide" class="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:gap-2.5 transition-all">
                            Read Full Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>
                </article>

                <article data-category="Technical Guide" class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                    <div class="h-52 relative overflow-hidden">
                        <img src="assets/images/pool/sheets_2b.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="250" alt="SS 304 2B finish sheet weight calculation reference">
                        <span class="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Technical Guide</span>
                    </div>
                    <div class="p-6 flex flex-col flex-grow">
                        <div class="text-xs text-slate-400 mb-2">Nov 19, 2026 · 5 min read</div>
                        <h2 class="text-xl font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                            <a href="/blog/ss-sheet-weight-formula-chart-304-202">SS Sheet Weight Calculator: Formula &amp; Chart (304, 202)</a>
                        </h2>
                        <p class="text-sm text-slate-500 mb-4 line-clamp-3">Calculate stainless steel sheet weight with a simple formula. Includes density for SS 304 and 202 and a weight chart for 4x8 ft sheets.</p>
                        <a href="/blog/ss-sheet-weight-formula-chart-304-202" class="mt-auto inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:gap-2.5 transition-all">
                            Read Full Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                        </a>
                    </div>
                </article>

'''

    # Insert right after the blog-grid div and the static comment
    content = content.replace(
        '                <!-- Static Server-rendered SEO Blog Cards -->',
        '                <!-- Static Server-rendered SEO Blog Cards -->' + new_cards,
        1
    )

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ blog.html updated with 3 new article cards (8 total)")


# ═══════════════════════════════════════════════════════════════════════════════
# UPDATE index.html — add new blog post to homepage grid (show 6 newest)
# Already has 5 posts. Need to add the 3 new + drop 2 to keep 6, or show 6.
# Actually the task says "show the 6 most recent posts". Currently 5 are shown.
# Need to add the 3 new (most recent) and keep only 6 total.
# 8 total posts ordered newest first:
# 1. ss-sheet-price-per-kg (Nov 19, 2026)
# 2. designer-stainless-steel (Nov 19, 2026)
# 3. ss-sheet-weight-formula (Nov 19, 2026)
# 4. ss-202-vs-ss-304 (Oct 21, 2026)
# 5. stainless-steel-sheet-finishes (Oct 21, 2026)
# 6. ibr-certified-boiler-pipes (Jan 15, 2026)
# --- (dropped from homepage) ---
# 7. what-is-en-10204-3-1-mill-test-certificate (Nov 20, 2025)
# 8. ss-304-vs-ss-316l-which-to-choose (Oct 12, 2025)
#
# Wait, the task says "This also surfaces the two older posts missing from the
# homepage: ss-304-vs-ss-316l-which-to-choose and what-is-en-10204-3-1-mill-test-certificate"
# But those ARE on the homepage currently (lines 1327-1372). Let me re-read...
# Looking at the homepage grep output, it shows:
# 1297: ss-202-vs-ss-304
# 1315: stainless-steel-sheet-finishes
# 1333: ss-304-vs-ss-316l
# 1351: what-is-en-10204-3-1-mill-test-certificate
# 1369: ibr-certified-boiler-pipes
# So all 5 existing posts ARE on the homepage. Good - they're already there.
# Task says show 6 most recent. So I need to add the 3 new and trim to keep 6.
# 6 most recent = 3 new + ss-202-vs-ss-304 + finishes + ibr-boiler
# The 2 oldest (ss-304-vs-316l and what-is-en-10204-mtc) should be dropped from homepage.
# Actually wait, let me re-read: "show the 6 most recent posts and keep the View All Articles link"
# AND "This also surfaces the two older posts missing from the homepage"
# Hmm, but the two older posts are ALREADY on the homepage. Let me check again...
# The current homepage has 5 posts. The task says make it 6.
# With 8 total posts (5 existing + 3 new), 6 most recent are:
# 3 new (Nov 19) + ss-202-vs-304 (Oct 21) + finishes (Oct 21) + ibr (Jan 15) = 6
# That means ss-304-vs-316l and mtc (the 2 oldest) get dropped.
# But the task says "surfaces the two older posts missing from the homepage"
# This seems contradictory. Let me re-read more carefully...
# "This also surfaces the two older posts missing from the homepage:
#  ss-304-vs-ss-316l-which-to-choose and what-is-en-10204-3-1-mill-test-certificate
#  (confirm their exact slugs from the sitemap)."
# I think this was written BEFORE the previous session which already added them.
# Since they're already on the homepage, and we need 6 most recent, I'll keep 6 newest.
# Actually, let me just show all 6 newest and have the "View All Articles" for the rest.
# Let me replace the entire home-blog-grid.
# ═══════════════════════════════════════════════════════════════════════════════

def update_homepage_blog():
    path = os.path.join(BASE, "index.html")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Find the home-blog-grid and replace its contents
    # The grid starts at <div id="home-blog-grid" and ends at the closing </div> before the next section
    # Let me use a regex approach
    
    # Build the 6 newest cards
    cards = [
        # 1. SS Sheet Price (new)
        {
            "img": "assets/images/pool/sheets_prod.webp",
            "alt": "SS sheet price per kg factors for 304 and 202 grades in India",
            "cat": "Buying Guide",
            "date": "Nov 19, 2026 · 5 min read",
            "href": "/blog/ss-sheet-price-per-kg-india-304-202-factors",
            "title": "SS Sheet Price per kg in India: What Decides the Rate (304 vs 202)",
            "desc": "Why SS 304 and SS 202 sheet prices differ and what factors drive the rate per kg."
        },
        # 2. Designer Sheets (new)
        {
            "img": "assets/images/pool/pvd_designer_sheets.webp",
            "alt": "PVD colour coated designer stainless steel sheets for interior projects",
            "cat": "Product Guide",
            "date": "Nov 19, 2026 · 5 min read",
            "href": "/blog/designer-stainless-steel-sheets-pvd-mirror-etched-guide",
            "title": "Designer SS Sheets: PVD Colours, Mirror, Hairline &amp; Etched",
            "desc": "Guide to designer stainless steel sheets: PVD, mirror, hairline and etched finishes for architects and buyers."
        },
        # 3. Weight Formula (new)
        {
            "img": "assets/images/pool/sheets_2b.webp",
            "alt": "SS 304 2B finish sheet used for weight calculation demonstration",
            "cat": "Technical Guide",
            "date": "Nov 19, 2026 · 5 min read",
            "href": "/blog/ss-sheet-weight-formula-chart-304-202",
            "title": "SS Sheet Weight Calculator: Formula &amp; Chart (304, 202)",
            "desc": "Calculate stainless steel sheet weight with a simple formula. Weight chart for 4&times;8 ft sheets."
        },
        # 4. SS 202 vs 304 (existing)
        {
            "img": "assets/images/pool/sheets_prod.webp",
            "alt": "SS 202 vs SS 304 grade comparison for Indian buyers",
            "cat": "Technical Guide",
            "date": "Oct 21, 2026 · 6 min read",
            "href": "/blog/ss-202-vs-ss-304-difference-uses-which-to-buy",
            "title": "SS 202 vs SS 304: Differences, Uses and Which Grade to Buy",
            "desc": "Compare SS 202 and SS 304: composition, corrosion resistance, uses and verification."
        },
        # 5. Sheet Finishes (existing)
        {
            "img": "assets/images/pool/sheets_mirror.webp",
            "alt": "Stainless steel 8K mirror finish sheet surface close-up",
            "cat": "Technical Guide",
            "date": "Oct 21, 2026 · 6 min read",
            "href": "/blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror",
            "title": "Stainless Steel Sheet Finishes: 2B, BA, No.4 &amp; 8K Mirror",
            "desc": "Understand sheet finishes from 2B and BA to No.4 brushed and 8K mirror polish."
        },
        # 6. IBR Boiler Pipes (existing)
        {
            "img": "assets/images/pool/alloy_pipes.webp",
            "alt": "ASTM A335 P11 P22 alloy steel boiler pipes IBR certified",
            "cat": "Engineering",
            "date": "Jan 15, 2026 · 7 min read",
            "href": "/blog/ibr-certified-boiler-pipes-p11-p22-guide",
            "title": "IBR Certified Boiler Pipes: ASTM A335 P11 &amp; P22 Guide",
            "desc": "Engineering guide to ASTM A335 P11 and P22 alloy steel pipes under Indian Boiler Regulations."
        },
    ]

    cards_html = ""
    for c in cards:
        cards_html += f'''
                    <article class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                        <div class="h-52 relative overflow-hidden">
                            <img src="{c['img']}" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="225" alt="{c['alt']}">
                            <span class="absolute top-3 right-3 bg-white/95 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">{c['cat']}</span>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="text-xs text-slate-400 mb-2">{c['date']}</div>
                            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors leading-snug">
                                <a href="{c['href']}">{c['title']}</a>
                            </h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-2">{c['desc']}</p>
                            <a href="{c['href']}" class="mt-auto text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                Read Full Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                            </a>
                        </div>
                    </article>'''

    # Find and replace the home-blog-grid content
    # Pattern: everything between <div id="home-blog-grid"...> and the next closing div that matches
    pattern = r'(<div id="home-blog-grid"[^>]*>).*?(</div>\s*</div>\s*</section>)'
    replacement = r'\1' + cards_html + '\n                ' + r'\2'
    new_content = re.sub(pattern, replacement, content, count=1, flags=re.DOTALL)
    
    if new_content == content:
        print("⚠️  Could not find home-blog-grid pattern. Trying alternative approach...")
        # Find the grid div
        grid_start = content.find('id="home-blog-grid"')
        if grid_start == -1:
            print("❌ Could not find home-blog-grid in index.html")
            return
        # Find the opening >
        tag_end = content.find('>', grid_start) + 1
        # Find the closing </div> — count nesting
        depth = 1
        pos = tag_end
        while depth > 0 and pos < len(content):
            next_open = content.find('<div', pos)
            next_close = content.find('</div>', pos)
            if next_close == -1:
                break
            if next_open != -1 and next_open < next_close:
                depth += 1
                pos = next_open + 4
            else:
                depth -= 1
                if depth == 0:
                    # Replace from tag_end to next_close
                    new_content = content[:tag_end] + cards_html + "\n                " + content[next_close:]
                    break
                pos = next_close + 6
    
    with open(path, "w", encoding="utf-8") as f:
        f.write(new_content)
    print("✅ index.html updated: homepage blog grid now shows 6 most recent posts")


# ═══════════════════════════════════════════════════════════════════════════════
# ADD "Related reading" links to product pages, calculator, and existing posts
# ═══════════════════════════════════════════════════════════════════════════════

def add_related_links():
    """Add a small Related reading block to product pages, calculator, and existing posts."""
    
    related_reading_block = lambda links: f'''
        <!-- Related Reading -->
        <div class="mt-8 bg-slate-50 rounded-xl p-5 border border-slate-200">
            <h3 class="text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">Related Reading</h3>
            <div class="space-y-2">
{links}
            </div>
        </div>'''

    related_reading_link = lambda href, text: f'                <a href="{href}" class="block text-sm text-emerald-600 hover:text-emerald-700 font-semibold hover:underline">{text}</a>'

    # 1. SS 304 product page → Post 1 and Post 3
    update_product_page(
        "products/ss-304-sheets-plates-supplier-mumbai.html",
        related_reading_block(
            related_reading_link("/blog/ss-sheet-price-per-kg-india-304-202-factors", "SS Sheet Price per kg in India: 304 vs 202 Factors →") + "\n" +
            related_reading_link("/blog/ss-sheet-weight-formula-chart-304-202", "SS Sheet Weight Calculator: Formula &amp; Chart (304, 202) →")
        )
    )

    # 2. SS 202 product page → Post 1 and Post 3
    update_product_page(
        "products/ss-202-sheets-jindal-j1-j4-supplier-mumbai.html",
        related_reading_block(
            related_reading_link("/blog/ss-sheet-price-per-kg-india-304-202-factors", "SS Sheet Price per kg in India: 304 vs 202 Factors →") + "\n" +
            related_reading_link("/blog/ss-sheet-weight-formula-chart-304-202", "SS Sheet Weight Calculator: Formula &amp; Chart (304, 202) →")
        )
    )

    # 3. Decorative product page → Post 2
    update_product_page(
        "products/decorative-stainless-steel-sheets-mumbai.html",
        related_reading_block(
            related_reading_link("/blog/designer-stainless-steel-sheets-pvd-mirror-etched-guide", "Designer SS Sheets: PVD, Mirror, Hairline &amp; Etched Guide →")
        )
    )

    # 4. Calculator → Post 3
    update_product_page(
        "calculator.html",
        related_reading_block(
            related_reading_link("/blog/ss-sheet-weight-formula-chart-304-202", "SS Sheet Weight Calculator: Formula &amp; Chart (304, 202) →")
        )
    )

    # 5. Existing post: ss-202-vs-ss-304 → Post 1
    add_to_existing_post_related(
        "blog/ss-202-vs-ss-304-difference-uses-which-to-buy.html",
        '/blog/ss-sheet-price-per-kg-india-304-202-factors',
        'SS Sheet Price per kg in India: 304 vs 202 Factors',
        'Nov 19, 2026', '5 min read'
    )

    # 6. Existing post: stainless-steel-sheet-finishes → Post 2
    add_to_existing_post_related(
        "blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror.html",
        '/blog/designer-stainless-steel-sheets-pvd-mirror-etched-guide',
        'Designer SS Sheets: PVD Colours, Mirror, Hairline &amp; Etched Guide',
        'Nov 19, 2026', '5 min read'
    )


def update_product_page(rel_path, block_html):
    """Insert a Related Reading block before </main> in a product/calculator page."""
    path = os.path.join(BASE, rel_path)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Don't add if already there
    if "Related Reading" in content:
        print(f"  ⏭  {rel_path} already has Related Reading block")
        return

    # Insert before </main>
    if "</main>" in content:
        content = content.replace("</main>", block_html + "\n    </main>", 1)
        with open(path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"  ✅ {rel_path} — Related Reading block added")
    else:
        print(f"  ⚠️  {rel_path} — could not find </main>")


def add_to_existing_post_related(rel_path, new_href, new_title, date_str, reading_time):
    """Add a link to the Related Technical Guides section of an existing post."""
    path = os.path.join(BASE, rel_path)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if new_href in content:
        print(f"  ⏭  {rel_path} already links to {new_href}")
        return

    new_link = f'''                <a href="{new_href}" class="flex gap-3 items-start bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl p-4 transition-all group">
                    <div>
                        <p class="font-bold text-sm text-slate-900 group-hover:text-emerald-700 leading-snug">{new_title}</p>
                        <p class="text-xs text-slate-500 mt-1">{date_str} · {reading_time}</p>
                    </div>
                </a>'''

    # Find the Related Technical Guides grid
    grid_marker = 'Related Technical Guides'
    if grid_marker not in content:
        print(f"  ⚠️  {rel_path} — no Related Technical Guides section found")
        return
    
    # Find the closing </div> of the grid (sm:grid-cols-2)
    grid_pos = content.find(grid_marker)
    # Find the grid div
    grid_div = content.find('grid sm:grid-cols-2', grid_pos)
    if grid_div == -1:
        print(f"  ⚠️  {rel_path} — could not find grid div")
        return
    
    # Find </div> that closes this grid
    # Count nested divs
    tag_start = content.rfind('<div', 0, grid_div)
    pos = content.find('>', grid_div) + 1
    depth = 1
    while depth > 0 and pos < len(content):
        next_open = content.find('<div', pos)
        next_close = content.find('</div>', pos)
        # Also check for <a> tags that might contain divs
        if next_close == -1:
            break
        if next_open != -1 and next_open < next_close:
            depth += 1
            pos = next_open + 4
        else:
            depth -= 1
            if depth == 0:
                # Insert before this </div>
                content = content[:next_close] + new_link + "\n            " + content[next_close:]
                break
            pos = next_close + 6

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"  ✅ {rel_path} — added related link to {new_href}")


# ═══════════════════════════════════════════════════════════════════════════════
# UPDATE sitemap.xml
# ═══════════════════════════════════════════════════════════════════════════════

def update_sitemap():
    path = os.path.join(BASE, "sitemap.xml")
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    # Add 3 new blog URLs
    new_urls = """  <url>
    <loc>https://www.tatvamoverseasinc.com/blog/ss-sheet-price-per-kg-india-304-202-factors</loc>
    <lastmod>2026-11-19</lastmod>
  </url>
  <url>
    <loc>https://www.tatvamoverseasinc.com/blog/designer-stainless-steel-sheets-pvd-mirror-etched-guide</loc>
    <lastmod>2026-11-19</lastmod>
  </url>
  <url>
    <loc>https://www.tatvamoverseasinc.com/blog/ss-sheet-weight-formula-chart-304-202</loc>
    <lastmod>2026-11-19</lastmod>
  </url>
"""

    if "ss-sheet-price-per-kg" in content:
        print("⏭  Sitemap already has new blog URLs")
    else:
        content = content.replace("</urlset>", new_urls + "</urlset>")

    # Update lastmod for pages that actually changed
    pages_changed = [
        "tatvamoverseasinc.com/blog<",  # blog index
        "tatvamoverseasinc.com/<",  # homepage (but careful — the URL ends with just /)
        "ss-304-sheets-plates-supplier-mumbai",
        "ss-202-sheets-jindal-j1-j4-supplier-mumbai",
        "decorative-stainless-steel-sheets-mumbai",
        "calculator",
        "ss-202-vs-ss-304-difference-uses-which-to-buy",
        "stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror",
    ]
    
    # Simple: for each changed URL, update its lastmod to 2026-11-19
    for page_key in pages_changed:
        # Find the <url> block containing this key
        # Update the <lastmod> within it
        idx = content.find(page_key)
        if idx == -1:
            continue
        # Find the <lastmod> tag within this <url> block
        lastmod_start = content.find("<lastmod>", idx)
        lastmod_end = content.find("</lastmod>", lastmod_start)
        if lastmod_start != -1 and lastmod_end != -1 and (lastmod_start - idx) < 300:
            old_lastmod = content[lastmod_start:lastmod_end + len("</lastmod>")]
            content = content[:lastmod_start] + "<lastmod>2026-11-19</lastmod>" + content[lastmod_end + len("</lastmod>"):]
    
    # Also update homepage lastmod (URL ends with /)
    homepage_pattern = r'(<loc>https://www\.tatvamoverseasinc\.com/</loc>\s*<lastmod>)\d{4}-\d{2}-\d{2}(</lastmod>)'
    content = re.sub(homepage_pattern, r'\g<1>2026-11-19\2', content)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("✅ sitemap.xml updated with 3 new blog URLs + lastmod updates")


# ═══════════════════════════════════════════════════════════════════════════════
# MAIN
# ═══════════════════════════════════════════════════════════════════════════════

if __name__ == "__main__":
    print("=" * 60)
    print("CREATING 3 NEW BLOG POSTS")
    print("=" * 60)
    create_post1()
    create_post2()
    create_post3()

    print("\n" + "=" * 60)
    print("UPDATING BLOG DATA & INDEX")
    print("=" * 60)
    update_blog_data()
    update_blog_index()

    print("\n" + "=" * 60)
    print("UPDATING HOMEPAGE BLOG GRID")
    print("=" * 60)
    update_homepage_blog()

    print("\n" + "=" * 60)
    print("ADDING RELATED LINKS")
    print("=" * 60)
    add_related_links()

    print("\n" + "=" * 60)
    print("UPDATING SITEMAP")
    print("=" * 60)
    update_sitemap()

    print("\n" + "=" * 60)
    print("DONE — All 3 posts created and site updated")
    print("=" * 60)
