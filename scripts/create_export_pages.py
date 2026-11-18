#!/usr/bin/env python3
"""
Create 5 export destination landing pages + update sitemap.xml
Pages: /export/uae, /export/saudi-arabia, /export/kenya, /export/nigeria, /export/vietnam
"""

import os, re

BASE = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

EXPORT_DIR = os.path.join(BASE, "export")
os.makedirs(EXPORT_DIR, exist_ok=True)

COMMON_HEAD_ASSETS = """    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap" rel="stylesheet">
    <script defer src="https://unpkg.com/lucide@latest"></script>
    <link rel="stylesheet" href="/css/style.css">
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-2C5PC2BWQJ"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-2C5PC2BWQJ');
    </script>
    <script defer src="/js/analytics.js"></script>"""

COMMON_FOOTER_JS = """    <footer id="site-footer" class="bg-slate-900 text-slate-400 font-sans border-t-4 border-emerald-600"></footer>
    <script src="/js/components.js"></script>
    <script>
        document.addEventListener('DOMContentLoaded', () => {
            if (typeof lucide !== 'undefined') lucide.createIcons();
        });
    </script>"""


def page_html(slug, title, og_title, meta_desc, country, flag,
              port_info, doc_notes, sector_notes, schema_breadcrumb_name,
              logistics_rows, faq_items, cta_wa_msg):
    """Build a full export country page."""
    canonical = f"https://www.tatvamoverseasinc.com/export/{slug}"
    breadcrumb_schema = f"""{{
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        {{"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tatvamoverseasinc.com/"}},
        {{"@type": "ListItem", "position": 2, "name": "Export Markets", "item": "https://www.tatvamoverseasinc.com/export-terms"}},
        {{"@type": "ListItem", "position": 3, "name": "{schema_breadcrumb_name}", "item": "{canonical}"}}
      ]
    }}"""

    faq_schema_items = ",\n".join(
        f"""    {{
      "@type": "Question",
      "name": {repr(q)},
      "acceptedAnswer": {{"@type": "Answer", "text": {repr(a)}}}
    }}""" for q, a in faq_items
    )
    faq_schema = f"""{{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
{faq_schema_items}
  ]
}}"""

    logistics_html = ""
    for row in logistics_rows:
        logistics_html += f"""                <div class="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <i data-lucide="{row['icon']}" class="w-5 h-5 text-emerald-600 mt-0.5 shrink-0"></i>
                    <div>
                        <div class="font-bold text-slate-900 text-sm">{row['label']}</div>
                        <div class="text-slate-600 text-xs mt-0.5 leading-relaxed">{row['value']}</div>
                    </div>
                </div>\n"""

    faq_html = ""
    for i, (q, a) in enumerate(faq_items):
        faq_html += f"""            <details class="group border border-slate-200 rounded-xl overflow-hidden" {"open" if i == 0 else ""}>
                <summary class="flex justify-between items-center cursor-pointer p-5 bg-white hover:bg-emerald-50 transition-colors">
                    <span class="font-semibold text-slate-900 text-sm pr-4">{q}</span>
                    <i data-lucide="chevron-down" class="w-4 h-4 text-emerald-600 shrink-0 transition-transform group-open:rotate-180"></i>
                </summary>
                <div class="bg-white px-5 pb-5 text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                    {a}
                </div>
            </details>\n"""

    wa_url = f"https://wa.me/919930301181?text={cta_wa_msg}"

    return f"""<!DOCTYPE html>
<html lang="en">
<head>
    <link rel="icon" href="/favicon.ico" sizes="any">
    <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{title}</title>
    <meta name="description" content="{meta_desc}">
    <meta name="robots" content="index, follow">
    <link rel="canonical" href="{canonical}">

    <meta property="og:locale" content="en">
    <meta property="og:site_name" content="Tatvam Overseas Inc">
    <meta property="og:type" content="website">
    <meta property="og:title" content="{og_title}">
    <meta property="og:description" content="{meta_desc}">
    <meta property="og:url" content="{canonical}">
    <meta property="og:image" content="https://www.tatvamoverseasinc.com/assets/images/tatvamoverseasinc-warehouse-stock.jpg">

    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:title" content="{og_title}">
    <meta name="twitter:description" content="{meta_desc}">
    <meta name="twitter:image" content="https://www.tatvamoverseasinc.com/assets/images/tatvamoverseasinc-warehouse-stock.jpg">

{COMMON_HEAD_ASSETS}

    <script type="application/ld+json">
    {breadcrumb_schema}
    </script>
    <script type="application/ld+json">
    {faq_schema}
    </script>
</head>
<body class="bg-slate-50 text-slate-800 min-h-screen flex flex-col font-sans">
    <header id="site-header" class="sticky top-0 z-50"></header>

    <!-- Breadcrumb -->
    <div class="bg-slate-900 border-b border-slate-800 text-slate-400 text-xs py-3">
        <div class="container mx-auto px-6 flex items-center gap-2 flex-wrap">
            <a href="/" class="hover:text-emerald-400 transition-colors">Home</a>
            <span>/</span>
            <a href="/export-terms" class="hover:text-emerald-400 transition-colors">Export Markets</a>
            <span>/</span>
            <span class="text-white font-semibold">{flag} {country}</span>
        </div>
    </div>

    <main class="flex-grow container mx-auto px-4 md:px-6 py-10 max-w-5xl space-y-8">

        <!-- Hero -->
        <section class="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 md:p-12 shadow-xl border border-slate-700">
            <div class="max-w-3xl">
                <div class="text-emerald-400 text-sm font-semibold uppercase tracking-wider mb-3">Export Guide · {flag} {country}</div>
                <h1 class="text-3xl md:text-4xl font-black mb-4 leading-tight">Stainless Steel &amp; Alloy Exporter to {country}</h1>
                <p class="text-slate-300 text-base leading-relaxed mb-6">
                    {sector_notes}
                </p>
                <div class="flex flex-wrap gap-3">
                    <a href="{wa_url}" target="_blank" rel="noopener noreferrer"
                       class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-7 rounded-xl transition-all shadow-lg text-sm">
                        WhatsApp Export Quote
                    </a>
                    <a href="/contact"
                       class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-7 rounded-xl transition-all text-sm border border-slate-600">
                        Submit Structured RFQ
                    </a>
                </div>
            </div>
        </section>

        <!-- Logistics Grid -->
        <section class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                Shipping &amp; Logistics: India → {country}
            </h2>
            <div class="grid sm:grid-cols-2 gap-4">
{logistics_html}            </div>
            <p class="mt-5 text-xs text-slate-500 leading-relaxed">{port_info}</p>
        </section>

        <!-- Products We Export -->
        <section class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
                Products Commonly Exported to {country}
            </h2>
            <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
                <a href="/products/ss-304-sheets-plates-supplier-mumbai"
                   class="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-slate-50 group">
                    <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-700">SS 304 / 304L Sheets &amp; Plates</div>
                    <div class="text-xs text-slate-500 mt-1">ASTM A240, 2B / No.4 / BA finish</div>
                </a>
                <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai"
                   class="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-slate-50 group">
                    <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-700">SS 202 Sheets – Jindal J1 / J4</div>
                    <div class="text-xs text-slate-500 mt-1">Cost-effective austenitic grade</div>
                </a>
                <a href="/products/decorative-stainless-steel-sheets-mumbai"
                   class="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-slate-50 group">
                    <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-700">Designer / Decorative SS Sheets</div>
                    <div class="text-xs text-slate-500 mt-1">PVD colour, 8K mirror, hairline, etched</div>
                </a>
                <a href="/products/ss-316l-sheets-plates-supplier-mumbai"
                   class="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-slate-50 group">
                    <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-700">SS 316 / 316L Sheets</div>
                    <div class="text-xs text-slate-500 mt-1">Marine grade, chemical process</div>
                </a>
                <a href="/products/nickel-alloys.html"
                   class="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-slate-50 group">
                    <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-700">Inconel, Hastelloy, Monel</div>
                    <div class="text-xs text-slate-500 mt-1">High-performance nickel alloys</div>
                </a>
                <a href="/products/stainless-steel-pipes-tubes-supplier-mumbai"
                   class="p-4 rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-md transition-all bg-slate-50 group">
                    <div class="font-bold text-slate-900 text-sm group-hover:text-emerald-700">Stainless Steel Pipes &amp; Tubes</div>
                    <div class="text-xs text-slate-500 mt-1">Seamless &amp; welded, IBR ready</div>
                </a>
            </div>
        </section>

        <!-- Documentation -->
        <section class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-5 pb-2 border-b border-slate-100">
                Export Documentation for {country}
            </h2>
            <div class="text-sm text-slate-700 leading-relaxed space-y-2">
                {doc_notes}
            </div>
            <div class="mt-5 flex flex-wrap gap-3 text-xs font-semibold">
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">Commercial Invoice &amp; Packing List</span>
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">EN 10204 3.1 MTC</span>
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">Certificate of Origin (COO)</span>
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">Bill of Lading</span>
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">Fumigation Certificate (ISPM 15)</span>
                <span class="px-3 py-1.5 bg-emerald-50 text-emerald-800 rounded-full border border-emerald-200">SGS / BV / TÜV Pre-shipment Inspection</span>
            </div>
            <p class="mt-4 text-xs text-slate-500">Full documentation checklist: <a href="/export-terms" class="text-emerald-600 hover:underline">Export Terms &amp; Logistics guide →</a></p>
        </section>

        <!-- FAQ -->
        <section class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100">
                Frequently Asked Questions — Exporting to {country}
            </h2>
            <div class="space-y-3">
{faq_html}            </div>
        </section>

        <!-- CTA -->
        <section class="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-8 text-center shadow-xl border border-slate-700">
            <h2 class="text-2xl md:text-3xl font-black mb-3">Ready to Ship to {country}?</h2>
            <p class="text-slate-300 text-sm max-w-xl mx-auto mb-6 leading-relaxed">
                Share your material schedule and destination port. Our export desk responds within 2–4 working hours (IST) with a competitive proforma invoice.
            </p>
            <div class="flex flex-wrap justify-center gap-4">
                <a href="{wa_url}" target="_blank" rel="noopener noreferrer"
                   class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-3 px-8 rounded-xl transition-all shadow-lg text-sm">
                    WhatsApp Export Inquiry
                </a>
                <a href="/contact"
                   class="bg-slate-700 hover:bg-slate-600 text-white font-bold py-3 px-8 rounded-xl transition-all text-sm border border-slate-600">
                    Open RFQ Form
                </a>
            </div>
        </section>

        <!-- Related links -->
        <nav class="text-center text-sm text-slate-600 space-x-3">
            <a href="/export-terms" class="text-emerald-700 hover:underline font-semibold">← All Export Markets</a>
            <span>·</span>
            <a href="/products" class="hover:text-emerald-700">Product Catalogue</a>
            <span>·</span>
            <a href="/calculator" class="hover:text-emerald-700">Weight Calculator</a>
            <span>·</span>
            <a href="/contact" class="hover:text-emerald-700">Contact</a>
        </nav>

    </main>

{COMMON_FOOTER_JS}
</body>
</html>"""


# ─── Page definitions ────────────────────────────────────────────────────────

PAGES = [
    dict(
        slug="uae",
        title="SS Exporter to UAE | Tatvam Overseas Mumbai",          # 50 chars
        og_title="SS Exporter to UAE | Tatvam Overseas Mumbai",
        meta_desc="Stainless steel sheets, plates, pipes & nickel alloys exported to UAE. FOB JNPT / CIF Jebel Ali. EN 10204 3.1 MTC, COO, SGS inspection. Competitive proforma.",  # 153
        country="UAE",
        flag="🇦🇪",
        port_info="All shipments from JNPT (Nhava Sheva), Mumbai. Jebel Ali (JAFZA) is the primary receiving port for UAE importers; Port of Abu Dhabi (Khalifa Port / Mussafah) is used for Abu Dhabi-based buyers. Transit is typically 10–14 days depending on the carrier.",
        schema_breadcrumb_name="SS Exporter to UAE",
        sector_notes="Tatvam Overseas supplies stainless steel sheets, decorative PVD panels, nickel alloys, and IBR pipes to buyers in Dubai, Abu Dhabi, Sharjah, and Jebel Ali Free Zone. Preferred Incoterms: FOB JNPT or CIF Jebel Ali.",
        doc_notes="""<p>UAE does not have mandatory pre-shipment inspection for steel, but most JAFZA traders and EPC contractors require an EN 10204 3.1 MTC and SGS / BV pre-shipment inspection report.</p>
                <p class="mt-2">A Certificate of Origin issued by the Mumbai Chamber of Commerce qualifies for <strong>India–UAE CEPA</strong> (Comprehensive Economic Partnership Agreement, in force from 1 May 2022), which provides preferential duty rates on many stainless steel HS codes. Ask your clearing agent whether the specific HS code qualifies.</p>""",
        logistics_rows=[
            {"icon": "anchor", "label": "Dispatch Port", "value": "JNPT (Nhava Sheva), Mumbai — India's largest container port"},
            {"icon": "ship", "label": "Receiving Port", "value": "Jebel Ali (DP World) — Dubai; Khalifa Port — Abu Dhabi"},
            {"icon": "clock", "label": "Transit Time", "value": "10–14 days (FCL / LCL, direct or via transshipment)"},
            {"icon": "file-text", "label": "Preferred Incoterms", "value": "FOB JNPT · CIF Jebel Ali · CFR Dubai"},
            {"icon": "shield-check", "label": "Duty Relief", "value": "India–UAE CEPA (May 2022) — preferential tariffs available; verify HS code with your broker"},
            {"icon": "package", "label": "Packing", "value": "Seaworthy wooden crates, ISPM 15 fumigation certificate provided"},
        ],
        faq_items=[
            ("What stainless steel grades do you export to UAE?",
             "We export SS 304, 304L, 316, 316L, 202 (Jindal J1/J4), Duplex 2205, and decorative PVD/mirror/hairline sheets. Nickel alloys (Inconel 625/825, Hastelloy C276, Monel 400) are also available on indent."),
            ("Can you ship FOB Nhava Sheva to Jebel Ali?",
             "Yes. FOB JNPT and CIF Jebel Ali are our standard Incoterms for UAE shipments. We coordinate with NVOCC and freight forwarders who run weekly sailings to Jebel Ali."),
            ("Do you provide EN 10204 3.1 Mill Test Certificates?",
             "Yes — all our material comes with EN 10204 3.1 MTC from the original mill (Jindal, SAIL, Nippon, etc.). The MTC includes chemical composition, mechanical properties, and heat/lot numbers."),
            ("Does India–UAE CEPA reduce import duty on stainless steel?",
             "The CEPA (effective May 2022) provides preferential duty on many HS codes including stainless steel flat products. You need a Chamber of Commerce Certificate of Origin (COO) with CEPA declaration. Verify the specific HS code with your UAE customs broker."),
            ("What is the minimum order quantity for UAE export?",
             "<!-- TODO(owner): Confirm MOQ policy for export shipments --> Typically one 20-foot FCL container (~25 MT for sheets). Smaller LCL orders are considered on a case-by-case basis."),
            ("How do I get a proforma invoice for UAE?",
             "Send your material list (grade, size, finish, quantity) and destination port on WhatsApp (+91 99303 01181) or via our RFQ form. We respond within 2–4 working hours (IST)."),
        ],
        cta_wa_msg="Hello%20Tatvam%20Overseas%2C%20I%20need%20a%20proforma%20for%20stainless%20steel%20export%20to%20UAE%20(Jebel%20Ali).",
    ),

    dict(
        slug="saudi-arabia",
        title="SS Exporter to Saudi Arabia | Tatvam Mumbai",          # 51 chars
        og_title="SS Exporter to Saudi Arabia | Tatvam Mumbai",
        meta_desc="SS 304, 316L sheets & nickel alloys exported to Saudi Arabia. CIF Dammam / Jeddah, SASO COC, EN 10204 3.1 MTC. EPC & fabrication supply from India.",  # 148
        country="Saudi Arabia",
        flag="🇸🇦",
        port_info="Shipments dispatch from JNPT, Mumbai. Main receiving ports are King Abdulaziz Port (Dammam) for Eastern Province buyers and Jeddah Islamic Port for Jeddah/Riyadh. Transit: 14–18 days.",
        schema_breadcrumb_name="SS Exporter to Saudi Arabia",
        sector_notes="Tatvam Overseas exports stainless steel sheets, pipes, bars, and nickel alloys to buyers in Riyadh, Dammam, Jubail Industrial City, and Jeddah. We serve EPC contractors, fabricators, and trading companies requiring SASO-compliant material with full MTC documentation.",
        doc_notes="""<p>Saudi Arabia requires a <strong>SASO Certificate of Conformity (CoC)</strong> for many steel products entering the Kingdom. The CoC is issued by SASO-accredited conformity assessment bodies (e.g., SGS, Intertek, Bureau Veritas) and must accompany the shipment. Confirm the HS code and product scope with your Saudi customs broker before shipment.</p>
                <p class="mt-2">A Chamber of Commerce Certificate of Origin is mandatory. Legalisation by the Indian Embassy / High Commission and apostille may be required for some product categories.</p>""",
        logistics_rows=[
            {"icon": "anchor", "label": "Dispatch Port", "value": "JNPT (Nhava Sheva), Mumbai"},
            {"icon": "ship", "label": "Receiving Port", "value": "King Abdulaziz Port, Dammam (Eastern Province) · Jeddah Islamic Port"},
            {"icon": "clock", "label": "Transit Time", "value": "14–18 days (direct FCL, some routing via Jebel Ali)"},
            {"icon": "file-text", "label": "Preferred Incoterms", "value": "CIF Dammam · FOB JNPT · CFR Jeddah"},
            {"icon": "shield-check", "label": "Compliance", "value": "SASO CoC (via SGS/BV/Intertek) for applicable HS codes; EN 10204 3.1 MTC mandatory"},
            {"icon": "package", "label": "Packing", "value": "Seaworthy wooden crates, ISPM 15 fumigation; heat number stencilling on bundles"},
        ],
        faq_items=[
            ("What products do you export to Saudi Arabia?",
             "SS 304/304L and 316/316L sheets and plates, Duplex 2205, Inconel 625, Hastelloy C276, carbon steel pipes (A106 Gr.B, API 5L), and alloy steel fittings. EPC project packages are welcome."),
            ("Is SASO certification required for stainless steel imports?",
             "SASO CoC is required for many steel product categories. The certificate is issued by an accredited body (SGS, BV, Intertek) based on the HS code and product scope. We coordinate with these agencies for pre-shipment testing and CoC issuance."),
            ("Can you supply to Jubail Industrial City (JZAN)?",
             "Yes. We supply to trading companies and fabricators based in Jubail, Yanbu, and Dhahran. Delivery is typically CIF King Abdulaziz Port, Dammam, with on-forwarding by the buyer."),
            ("Do you offer mill-authorised material for Aramco or SABIC projects?",
             "<!-- TODO(owner): Confirm Aramco/SABIC mill authorisation status --> We supply material with EN 10204 3.1 MTC from mills such as Jindal, SAIL, Outokumpu, and Nippon. Aramco or SABIC approved vendor list status depends on the project specification; contact us with the ITB/MR number for assessment."),
            ("What is the payment term for Saudi Arabia orders?",
             "Standard terms are 30% advance with order and 70% against copy of Bill of Lading, or confirmed irrevocable LC at sight. TT in advance for smaller LCL orders."),
            ("How do I request a proforma invoice for a Saudi project?",
             "Share your material requisition (MR), grade, size, quantity, and delivery port via WhatsApp (+91 99303 01181) or the RFQ form. We respond within 2–4 IST working hours."),
        ],
        cta_wa_msg="Hello%20Tatvam%20Overseas%2C%20I%20need%20a%20proforma%20for%20stainless%20steel%20export%20to%20Saudi%20Arabia.",
    ),

    dict(
        slug="kenya",
        title="SS Exporter to Kenya | Tatvam Overseas Mumbai",        # 50 chars
        og_title="SS Exporter to Kenya | Tatvam Overseas Mumbai",
        meta_desc="Stainless steel sheets & alloys exported to Kenya. CIF Mombasa, KEBS-compliant material, EN 10204 3.1 MTC. Serving Nairobi, Mombasa & East Africa traders.",  # 153
        country="Kenya",
        flag="🇰🇪",
        port_info="All shipments from JNPT, Mumbai. The main port of entry for Kenya is the Port of Mombasa (Kenya Ports Authority). Transit time: 18–22 days. Mombasa also serves landlocked East African countries (Uganda, Rwanda, DRC) via the Northern Corridor.",
        schema_breadcrumb_name="SS Exporter to Kenya",
        sector_notes="Tatvam Overseas supplies stainless steel sheets, pipes, and nickel alloys to steel traders, construction contractors, and food-processing equipment manufacturers in Nairobi and Mombasa. Kenya's growing infrastructure and hospitality sector drives demand for SS 304 sheets and decorative finishes.",
        doc_notes="""<p>Kenya requires a <strong>KEBS Import Inspection Certificate (IIC)</strong> under the Pre-Export Verification of Conformity (PVoC) programme for steel products. The certificate is issued by a KEBS-accredited agency (SGS, Bureau Veritas, Intertek, or similar) in India before shipment.</p>
                <p class="mt-2">A Certificate of Origin issued by the Mumbai Chamber of Commerce is required for Customs clearance. Kenya is a member of the EAC (East African Community) and COMESA, which may offer preferential rates depending on the exporting country's trade agreement status.</p>""",
        logistics_rows=[
            {"icon": "anchor", "label": "Dispatch Port", "value": "JNPT (Nhava Sheva), Mumbai"},
            {"icon": "ship", "label": "Receiving Port", "value": "Port of Mombasa (Kenya Ports Authority)"},
            {"icon": "clock", "label": "Transit Time", "value": "18–22 days (direct or via Colombo / Port Louis transshipment)"},
            {"icon": "file-text", "label": "Preferred Incoterms", "value": "CIF Mombasa · FOB JNPT"},
            {"icon": "shield-check", "label": "Compliance", "value": "KEBS PVoC Certificate (SGS/BV/Intertek) required for most steel HS codes"},
            {"icon": "package", "label": "Packing", "value": "Seaworthy wooden crates with ISPM 15 fumigation; bundle stencilling with heat nos."},
        ],
        faq_items=[
            ("What stainless steel grades do you export to Kenya?",
             "SS 304, 316L, and 202 sheets are most common. We also export Inconel and Hastelloy for oil & gas and chemical process buyers in Nairobi."),
            ("Is KEBS PVoC certificate mandatory?",
             "Yes — Kenya's Pre-Export Verification of Conformity (PVoC) programme requires that covered goods (including steel) carry a Certificate of Conformity from a KEBS-accredited agency before they depart India. We coordinate with SGS or Bureau Veritas for PVoC inspection at our warehouse."),
            ("Can you serve East African landlocked countries via Mombasa?",
             "Yes. Mombasa is the gateway to Uganda, Rwanda, South Sudan, and eastern DRC via the Northern Corridor. We can ship CIF Mombasa, and your freight forwarder arranges inland transport."),
            ("What is a typical lead time for Kenya orders?",
             "Ready stock: 5–7 days ex-warehouse for packing and stuffing, plus 18–22 days sea transit. PVoC inspection adds 2–3 working days. Total door-to-port lead time: approximately 25–30 days."),
            ("Do you support MPESA or LC payment for Kenya orders?",
             "We accept confirmed irrevocable LC at sight, TT in advance, or 30% advance + 70% BL copy for established buyers. Payment currency: USD."),
            ("How do I get a quote for Kenya?",
             "Send your material list (grade, size, thickness, quantity) and destination on WhatsApp (+91 99303 01181) or the RFQ form. We respond within 2–4 IST working hours."),
        ],
        cta_wa_msg="Hello%20Tatvam%20Overseas%2C%20I%20need%20a%20proforma%20for%20stainless%20steel%20export%20to%20Kenya%20(Mombasa).",
    ),

    dict(
        slug="nigeria",
        title="SS Exporter to Nigeria | Tatvam Overseas Mumbai",      # 52 chars
        og_title="SS Exporter to Nigeria | Tatvam Overseas Mumbai",
        meta_desc="Stainless steel sheets & alloys exported to Nigeria. CIF Apapa/Tin Can Island, SON/NAFDAC docs, EN 10204 3.1 MTC. Serving Lagos, Abuja & Port Harcourt buyers.",  # 156 — trim
        country="Nigeria",
        flag="🇳🇬",
        port_info="Shipments from JNPT, Mumbai. Main ports of entry: Apapa Port (Lagos) and Tin Can Island Port (Lagos). Port Harcourt is used for Delta and Rivers State buyers. Transit: 20–25 days.",
        schema_breadcrumb_name="SS Exporter to Nigeria",
        sector_notes="Tatvam Overseas exports stainless steel sheets, pipes, and alloys to steel traders, oil & gas fabricators, and construction companies in Lagos, Port Harcourt, and Abuja. Nigeria's oil & gas, food processing, and construction sectors are the primary end-users.",
        doc_notes="""<p>Nigeria's <strong>Standards Organisation of Nigeria (SON)</strong> requires a Certificate of Compliance (CoC) under the SONCAP (SON Conformity Assessment Programme) for steel and metal products. The CoC is obtained from a SONCAP-accredited body (SGS, Bureau Veritas, Intertek) in India prior to shipment.</p>
                <p class="mt-2">Form M (import declaration) must be opened at a Nigerian bank before shipment. Combined Certificate of Value and Origin (CCVO) or Certificate of Origin from the Chamber of Commerce is required for customs clearance.</p>""",
        logistics_rows=[
            {"icon": "anchor", "label": "Dispatch Port", "value": "JNPT (Nhava Sheva), Mumbai"},
            {"icon": "ship", "label": "Receiving Port", "value": "Apapa Port · Tin Can Island Port, Lagos; Port Harcourt"},
            {"icon": "clock", "label": "Transit Time", "value": "20–25 days (via Suez or Cape of Good Hope depending on vessel routing)"},
            {"icon": "file-text", "label": "Preferred Incoterms", "value": "CIF Apapa · FOB JNPT"},
            {"icon": "shield-check", "label": "Compliance", "value": "SONCAP CoC (SGS/BV/Intertek) mandatory; Form M required; COO from Chamber of Commerce"},
            {"icon": "package", "label": "Packing", "value": "Seaworthy wooden crates, ISPM 15 fumigation; heat number and HS code stencilled on bundles"},
        ],
        faq_items=[
            ("What products do you export to Nigeria?",
             "SS 304, 316L, and 202 sheets for food processing, brewery, and construction; carbon steel pipes (A106, API 5L) for oil & gas; Inconel and Duplex 2205 for offshore and petrochemical fabricators."),
            ("Is SONCAP certificate required for stainless steel exports to Nigeria?",
             "Yes — the SON Conformity Assessment Programme (SONCAP) mandates a Certificate of Conformity from an accredited agency (SGS, BV, or Intertek) for covered steel products. Without the CoC, the shipment may be held at Apapa and subject to fines."),
            ("What is Form M and do I need it?",
             "Form M is a Nigerian import declaration that must be opened at an authorised Nigerian bank before the goods are shipped. It is mandatory for all commercial imports above a certain threshold. Your Nigerian buyer (importer of record) opens the Form M."),
            ("Can you supply to Port Harcourt for oil & gas buyers?",
             "Yes. We supply SS 316L, Duplex 2205, Inconel 625, and Hastelloy C276 to fabricators and service companies in Port Harcourt and Warri. Delivery is CIF Apapa with on-forwarding by the buyer."),
            ("What payment terms do you offer for Nigeria?",
             "Confirmed irrevocable LC at sight is preferred. TT with 30% advance and 70% against BL copy is accepted for established accounts. All transactions in USD."),
            ("How do I get a proforma for a Nigerian buyer?",
             "Send the material list (grade, size, finish, quantity) and destination port via WhatsApp (+91 99303 01181) or the RFQ form. We respond within 2–4 IST working hours."),
        ],
        cta_wa_msg="Hello%20Tatvam%20Overseas%2C%20I%20need%20a%20proforma%20for%20stainless%20steel%20export%20to%20Nigeria%20(Apapa%2FLagos).",
    ),

    dict(
        slug="vietnam",
        title="SS Exporter to Vietnam | Tatvam Overseas Mumbai",      # 52 chars
        og_title="SS Exporter to Vietnam | Tatvam Overseas Mumbai",
        meta_desc="Stainless steel sheets & alloys exported to Vietnam. CIF Cat Lai / Ho Chi Minh, TCVN-compatible grades, EN 10204 3.1 MTC. Serving fabricators & traders.",  # 151
        country="Vietnam",
        flag="🇻🇳",
        port_info="Shipments from JNPT, Mumbai. Main ports: Cat Lai Port (Ho Chi Minh City) for south Vietnam; Hai Phong Port for north Vietnam / Hanoi region. Transit: 10–14 days (direct, some via Singapore or Port Klang transshipment).",
        schema_breadcrumb_name="SS Exporter to Vietnam",
        sector_notes="Tatvam Overseas exports stainless steel sheets, plates, and coils to steel service centres, furniture fabricators, and food-processing equipment manufacturers in Ho Chi Minh City, Hanoi, and the Binh Duong industrial zone. Vietnam's rapidly growing manufacturing sector drives strong demand for SS 304 and decorative finishes.",
        doc_notes="""<p>Vietnam does not mandate a pre-shipment conformity certificate for most stainless steel HS codes, but buyers often require an EN 10204 3.1 MTC and SGS / BV pre-shipment inspection for large project orders.</p>
                <p class="mt-2">An <strong>ASEAN–India Free Trade Agreement (AIFTA)</strong> Certificate of Origin (Form AI) may be used to claim preferential import duty rates; confirm the HS code and applicable rate with your Vietnamese customs broker. The COO Form AI must be issued by the DGFT or authorised issuing agency in India.</p>""",
        logistics_rows=[
            {"icon": "anchor", "label": "Dispatch Port", "value": "JNPT (Nhava Sheva), Mumbai"},
            {"icon": "ship", "label": "Receiving Port", "value": "Cat Lai Port, Ho Chi Minh City · Hai Phong Port (north Vietnam)"},
            {"icon": "clock", "label": "Transit Time", "value": "10–14 days (direct FCL; some routing via Singapore or Port Klang)"},
            {"icon": "file-text", "label": "Preferred Incoterms", "value": "CIF Cat Lai (HCM) · FOB JNPT · CFR Hai Phong"},
            {"icon": "shield-check", "label": "Duty Relief", "value": "AIFTA Form AI COO may qualify for preferential tariff — verify HS code with your broker"},
            {"icon": "package", "label": "Packing", "value": "Seaworthy wooden crates, ISPM 15 fumigation; coils in steel-slatted bundles"},
        ],
        faq_items=[
            ("What stainless steel grades do you export to Vietnam?",
             "SS 304, 304L, 316L, and 202 (Jindal J1/J4) sheets and coils are most in demand. Decorative PVD, hairline, and 8K mirror sheets are also exported for the furniture and architectural market."),
            ("Can you supply to Binh Duong or Dong Nai industrial zones?",
             "Yes — delivery is CIF Cat Lai, Ho Chi Minh City. Your freight forwarder arranges inland transport to Binh Duong (~40 km) or Dong Nai (~30 km). We can also quote CIF Hai Phong for north Vietnam buyers."),
            ("Does AIFTA reduce import duty on stainless steel from India?",
             "The ASEAN–India Free Trade Agreement (AIFTA) provides preferential tariff on eligible HS codes for goods originating in India. A COO Form AI (issued by DGFT) is required. The applicable rate varies by HS code — check with your Vietnamese customs broker."),
            ("Do you supply SS 304 coils for roll-forming?",
             "<!-- TODO(owner): Confirm coil stock availability and slit coil capability --> We stock SS 304 coils in 2B and No.4 finish; slit coil to custom widths is available on order. Contact us with your coil width, ID, OD, and thickness requirements."),
            ("What is the typical lead time for Vietnam?",
             "Ready stock: 5–7 days ex-warehouse for packing and document preparation, plus 10–14 days sea transit. Total: approximately 15–21 days CIF Cat Lai."),
            ("How do I request a proforma invoice for Vietnam?",
             "Send your material list (grade, finish, size, quantity) and destination port on WhatsApp (+91 99303 01181) or via the RFQ form. We reply within 2–4 IST working hours."),
        ],
        cta_wa_msg="Hello%20Tatvam%20Overseas%2C%20I%20need%20a%20proforma%20for%20stainless%20steel%20export%20to%20Vietnam%20(Cat%20Lai%2FHo%20Chi%20Minh).",
    ),
]


def fix_meta_desc(desc):
    """Trim description to <=155 chars if needed."""
    if len(desc) > 155:
        desc = desc[:152] + "..."
    return desc


def run():
    for p in PAGES:
        p["meta_desc"] = fix_meta_desc(p["meta_desc"])
        html = page_html(**p)
        path = os.path.join(EXPORT_DIR, f"{p['slug']}.html")
        with open(path, "w", encoding="utf-8") as f:
            f.write(html)
        t_len = len(p["title"])
        d_len = len(p["meta_desc"])
        ok_t = "✅" if t_len <= 60 else "⚠️ OVER"
        ok_d = "✅" if d_len <= 155 else "⚠️ OVER"
        print(f"  {p['slug']}.html  |  title={t_len}c {ok_t}  desc={d_len}c {ok_d}")

    print("\nAll export pages written to export/\n")


def update_sitemap():
    sitemap_path = os.path.join(BASE, "sitemap.xml")
    with open(sitemap_path, "r", encoding="utf-8") as f:
        content = f.read()

    new_entries = """  <url>
    <loc>https://www.tatvamoverseasinc.com/export-terms</loc>
    <lastmod>2026-11-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.tatvamoverseasinc.com/export/uae</loc>
    <lastmod>2026-11-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.tatvamoverseasinc.com/export/saudi-arabia</loc>
    <lastmod>2026-11-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>
  <url>
    <loc>https://www.tatvamoverseasinc.com/export/kenya</loc>
    <lastmod>2026-11-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.tatvamoverseasinc.com/export/nigeria</loc>
    <lastmod>2026-11-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
  <url>
    <loc>https://www.tatvamoverseasinc.com/export/vietnam</loc>
    <lastmod>2026-11-18</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>
</urlset>"""

    # Check if export-terms is already there; don't double-add
    if "export-terms" in content:
        print("Sitemap already has export-terms — skipping re-add.")
        return

    if "</urlset>" not in content:
        print("ERROR: </urlset> not found in sitemap.xml")
        return

    content = content.replace("</urlset>", new_entries)
    with open(sitemap_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("sitemap.xml updated with 6 new entries.\n")


if __name__ == "__main__":
    run()
    update_sitemap()
