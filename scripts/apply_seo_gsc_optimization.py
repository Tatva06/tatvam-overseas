#!/usr/bin/env python3
"""
apply_seo_gsc_optimization.py
Implements Tasks 1 through 5 and Task 7 for GSC Optimization.
"""

import os, re, json

BASE = "/Users/tatvajain/Desktop/TatvamOverseas"

# ══════════════════════════════════════════════════════════════════════════════
# TASK 1: Upgrade /blog/ss-202-vs-ss-304-difference-uses-which-to-buy
# ══════════════════════════════════════════════════════════════════════════════
def update_task1_202_vs_304():
    path = os.path.join(BASE, "blog/ss-202-vs-ss-304-difference-uses-which-to-buy.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    # Title & Meta
    new_title = "SS 202 vs SS 304: Difference, Price &amp; Which to Buy"
    new_desc = "SS 202 vs SS 304: composition, nickel %, corrosion resistance, price gap and best uses. Learn how to choose and how to verify the grade you receive."
    
    html = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', html, count=1, flags=re.DOTALL)
    html = re.sub(r'<meta name="description" content=".*?"', f'<meta name="description" content="{new_desc}"', html, count=1)
    html = re.sub(r'<meta property="og:title" content=".*?"', f'<meta property="og:title" content="{new_title}"', html, count=1)
    html = re.sub(r'<meta property="og:description" content=".*?"', f'<meta property="og:description" content="{new_desc}"', html, count=1)
    html = re.sub(r'<meta name="twitter:title" content=".*?"', f'<meta name="twitter:title" content="{new_title}"', html, count=1)
    html = re.sub(r'<meta name="twitter:description" content=".*?"', f'<meta name="twitter:description" content="{new_desc}"', html, count=1)
    
    # H1
    h1_text = "SS 202 vs SS 304: Difference, Price &amp; Which to Buy"
    html = re.sub(r'<h1[^>]*>.*?</h1>', f'<h1 class="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-6">\n                {h1_text}\n            </h1>', html, count=1, flags=re.DOTALL)
    
    # Last updated
    html = re.sub(r'Last updated:\s*2026-\d{2}-\d{2}', 'Last updated: 2026-11-19', html)
    
    # Schema update: Article, FAQPage, BreadcrumbList
    faqs = [
        ("What is SS 202 stainless steel?",
         "SS 202 is an austenitic chromium-nickel-manganese stainless steel conforming to ASTM A240 (UNS S20200). It replaces part of the expensive nickel content with manganese (7.5-10.0%) and nitrogen (up to 0.25%), lowering production cost while maintaining an austenitic structure."),
        ("What is the nickel percentage in SS 202 vs SS 304?",
         "SS 202 contains 4.0% to 6.0% nickel (with some commercial variants lower), whereas standard SS 304 contains 8.0% to 10.5% nickel. Nickel stabilizes the austenitic crystal structure and enhances corrosion resistance and ductility."),
        ("Is SS 202 rust proof?",
         "No stainless steel is completely rust-proof. SS 202 forms a protective chromium oxide layer in dry indoor conditions, but its lower nickel and higher manganese make it susceptible to tea-staining and pitting in humid, coastal, or chloride-rich environments."),
        ("Which is better for kitchen use: SS 202 or SS 304?",
         "For commercial kitchens, sinks, food contact surfaces, and wet counters, SS 304 is the recommended choice due to superior resistance to organic acids, food salts, and detergents. SS 202 is widely used for domestic dry utensils, cabinet framing, and dining furniture where moisture contact is minimal."),
        ("Can a magnet distinguish SS 202 from SS 304?",
         "No. A handheld magnet cannot reliably tell 202 from 304. Both are austenitic and non-magnetic in the annealed condition, and both can exhibit mild surface magnetism after cold forming, shearing, or bending. Positive Material Identification (PMI) via handheld XRF or mill test certificates (EN 10204 3.1) must be used."),
        ("What is the price difference between SS 202 and SS 304 sheets?",
         "SS 202 is significantly more economical than SS 304 because it contains roughly half the nickel. However, using SS 202 in aggressive or outdoor environments can lead to premature maintenance or replacement costs.")
    ]
    
    schema_graph = [
        {
            "@type": "Article",
            "headline": "SS 202 vs SS 304: Difference, Price & Which to Buy",
            "description": new_desc,
            "datePublished": "2026-10-21",
            "dateModified": "2026-11-19",
            "mainEntityOfPage": "https://www.tatvamoverseasinc.com/blog/ss-202-vs-ss-304-difference-uses-which-to-buy",
            "image": "https://www.tatvamoverseasinc.com/assets/images/pool/sheets_prod.webp",
            "author": {"@type": "Organization", "name": "Tatvam Overseas Inc Technical Team", "url": "https://www.tatvamoverseasinc.com"},
            "publisher": {"@type": "Organization", "name": "Tatvam Overseas Inc", "url": "https://www.tatvamoverseasinc.com"}
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tatvamoverseasinc.com/"},
                {"@type": "ListItem", "position": 2, "name": "Technical Knowledge Hub", "item": "https://www.tatvamoverseasinc.com/blog"},
                {"@type": "ListItem", "position": 3, "name": "SS 202 vs SS 304", "item": "https://www.tatvamoverseasinc.com/blog/ss-202-vs-ss-304-difference-uses-which-to-buy"}
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": {"@type": "Answer", "text": a}
                } for q, a in faqs
            ]
        }
    ]
    
    new_schema = '<script type="application/ld+json">\n' + json.dumps({"@context": "https://schema.org", "@graph": schema_graph}, indent=2, ensure_ascii=False) + '\n    </script>'
    html = re.sub(r'<script type="application/ld\+json">.*?</script>', new_schema, html, count=1, flags=re.DOTALL)
    
    # Replace Direct Answer box with Short Answer box
    short_answer_html = '''        <!-- Short Answer Callout Box -->
        <div class="bg-emerald-50/80 border-2 border-emerald-500/40 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="check-circle" class="w-5 h-5"></i>
                </div>
                <div>
                    <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-800 block mb-1">Short Answer: Which Grade is Better?</span>
                    <p class="text-slate-800 text-sm md:text-base leading-relaxed font-medium">
                        <strong>SS 304 is the superior metallurgical grade</strong> with 8.0–10.5% nickel and 17.5–19.5% chromium, making it the industry standard for food handling, commercial kitchens, outdoor cladding, and moist environments. <strong>SS 202 is an economical alternative</strong> where nickel is lowered (4.0–6.0%) and replaced by manganese; choose SS 202 strictly for dry indoor decorative panels, furniture, and indoor architectural trims where direct exposure to moisture, chlorides, or food acids is absent.
                    </p>
                </div>
            </div>
        </div>'''
        
    html = re.sub(r'<!-- Direct Answer Callout Box -->.*?</div>\s*</div>\s*</div>', short_answer_html, html, count=1, flags=re.DOTALL)

    # Replace Article Prose Content with enriched sections matching the exact question headings
    article_prose = '''            <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
                In Indian steel procurement and architectural fabrication, the dilemma between <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 202 sheets</a> and <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 304 sheets</a> is one of the most common buying questions. Both grades belong to the austenitic stainless family and share a similar initial appearance, yet their metallurgical composition, corrosion resistance, and total lifecycle costs differ substantially.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Comparison Table: SS 202 vs SS 304</h2>
            <div class="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900 text-white text-xs uppercase tracking-wider">
                            <th class="py-3 px-4">Parameter</th>
                            <th class="py-3 px-4">SS 202 (ASTM A240 UNS S20200)</th>
                            <th class="py-3 px-4">SS 304 (ASTM A240 UNS S30400)</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Standard Spec</td><td class="py-2.5 px-4">ASTM A240 / IS 6911</td><td class="py-2.5 px-4">ASTM A240 / EN 10088-2</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Chromium (Cr)</td><td class="py-2.5 px-4">17.0 – 19.0%</td><td class="py-2.5 px-4">17.5 – 19.5%</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Nickel (Ni)</td><td class="py-2.5 px-4 text-amber-700 font-bold">4.0 – 6.0%</td><td class="py-2.5 px-4 text-emerald-700 font-bold">8.0 – 10.5%</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Manganese (Mn)</td><td class="py-2.5 px-4">7.5 – 10.0%</td><td class="py-2.5 px-4">2.00% max</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Carbon (C)</td><td class="py-2.5 px-4">0.15% max</td><td class="py-2.5 px-4">0.07% max (304L: 0.030% max)</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Nitrogen (N)</td><td class="py-2.5 px-4">0.25% max</td><td class="py-2.5 px-4">0.10% max</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Density</td><td class="py-2.5 px-4">7.80 g/cm³</td><td class="py-2.5 px-4">7.93 g/cm³</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Corrosion Resistance</td><td class="py-2.5 px-4 text-slate-600">Moderate; for dry, non-coastal indoor use</td><td class="py-2.5 px-4 text-emerald-700 font-bold">High; robust passive film for wet/food environments</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Relative Price Position</td><td class="py-2.5 px-4 text-emerald-700 font-semibold">Lower cost base (economical)</td><td class="py-2.5 px-4 text-slate-700">Higher initial investment (prime benchmark)</td></tr>
                        <tr class="hover:bg-slate-50"><td class="py-2.5 px-4 font-bold">Primary Uses</td><td class="py-2.5 px-4 text-slate-600">Indoor furniture, architectural trims, dry utensils</td><td class="py-2.5 px-4 text-slate-600">Kitchen sinks, dairy/brewing, chemical tanks, facades</td></tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">What is SS 202 stainless steel?</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                SS 202 is an austenitic grade belonging to the 200-series (chromium-nickel-manganese) family, standardized under <strong>ASTM A240 UNS S20200</strong> and Indian Standard <strong>IS 6911</strong>. It was engineered to reduce reliance on costly nickel by employing manganese and nitrogen as austenite stabilizers. This metallurgy gives 202 good formability, tensile strength, and aesthetic appeal at a significantly lower initial raw material cost than 300-series alloys.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">SS 202 composition and nickel percentage</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Under the ASTM A240 specification, standard SS 202 contains <strong>17.0% to 19.0% Chromium</strong> and <strong>4.0% to 6.0% Nickel</strong>, with <strong>7.5% to 10.0% Manganese</strong> and up to <strong>0.25% Nitrogen</strong>. Commercial Indian market variants, such as Jindal J1 and J4, are custom sub-chemistries where nickel is balanced with added copper to optimize press forming for utensils and interior panels. By contrast, ASTM A240 SS 304 contains <strong>8.0% to 10.5% Nickel</strong> and 17.5% to 19.5% Chromium. The higher nickel content in 304 provides higher ductility and a more stable, self-repairing chromium oxide passive barrier. To understand how alloy pricing fluctuates with nickel markets, read our guide on <a href="/blog/ss-sheet-price-per-kg-india-304-202-factors" class="text-emerald-600 font-semibold hover:underline">SS sheet price per kg factors in India</a>.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Is SS 202 rust proof?</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                No stainless steel is completely immune to corrosion. SS 202 forms a protective chromium passive film under dry, clean atmospheric conditions. However, because manganese compounds replace nickel, the passive barrier is significantly less stable when exposed to chlorides, salt spray, atmospheric sulfur dioxide, or standing water.
            </p>
            <p class="text-slate-600 mb-4 leading-relaxed">
                In outdoor, coastal (such as Mumbai, Chennai, or Kochi), or humid environments, SS 202 develops superficial brown staining ("tea-staining") that can progress into localized pitting corrosion. For exterior architectural cladding or coastal installations, SS 304 or molybdenum-bearing <a href="/products/ss-316l-sheets-plates-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 316L</a> is essential.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">SS 202 vs SS 304 for kitchen use</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                In kitchen and catering environments, the distinction between wet food contact and dry structural components is critical:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Wet prep tables, sinks, dishwashing units, and cookware:</strong> <strong>SS 304</strong> is strictly recommended. Food salts, vinegar, citric acids, and chemical dishwashing detergents can break down the passive film of SS 202, causing pitting where bacteria can lodge. SS 304 meets standard international hygiene and food-contact criteria.</li>
                <li><strong>Dry storage racks, cabinet doors, and display panels:</strong> <strong>SS 202</strong> can be effectively utilized for dry storage shelves, dining furniture frames, and decorative partition screens, where routine contact with liquid food and acidic condiments is absent.</li>
            </ul>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">How to identify SS 202 vs SS 304</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Material mix-ups can be costly. When verifying shipments of stainless steel sheets, pipes, or plates, follow these testing guidelines:
            </p>
            <div class="space-y-4 my-6">
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 class="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                        <i data-lucide="alert-triangle" class="w-4 h-4 text-amber-600"></i> 1. The Magnet Test Fallacy
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        A magnet test cannot reliably differentiate SS 202 from SS 304. Both alloys are austenitic and non-magnetic in their fully annealed state. When sheared, bent, or deep-drawn, both grades undergo strain-induced transformation to martensite and show mild magnetic pull. Never reject or accept material based on a magnet alone.
                    </p>
                </div>
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 class="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                        <i data-lucide="zap" class="w-4 h-4 text-emerald-600"></i> 2. Positive Material Identification (PMI) &amp; XRF Testing
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        Handheld X-ray Fluorescence (XRF) spectroscopy provides nondestructive elemental analysis in seconds. A certified PMI gun instantly measures nickel (8–10.5% for 304 vs 4–6% for 202) and manganese percentages, verifying the heat chemistry on site.
                    </p>
                </div>
                <div class="p-4 bg-slate-50 rounded-xl border border-slate-200">
                    <h3 class="font-bold text-slate-900 text-sm mb-1 flex items-center gap-2">
                        <i data-lucide="file-check" class="w-4 h-4 text-emerald-600"></i> 3. Mill Test Certificates (EN 10204 3.1)
                    </h3>
                    <p class="text-xs text-slate-600 leading-relaxed">
                        Every prime order must be accompanied by an authentic manufacturer inspection certificate showing chemical melt analysis, mechanical tensile values, and lot heat numbers matching the stencil on the sheet. Learn how to verify certificates in our guide on <a href="/blog/what-is-en-10204-3-1-mill-test-certificate" class="text-emerald-600 font-semibold hover:underline">EN 10204 3.1 vs 3.2 mill test certificates</a>.
                    </p>
                </div>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Weight Planning &amp; Estimation</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Because of slight density variations (7.93 g/cm³ for SS 304 vs 7.80 g/cm³ for SS 202), calculating total payload and project requirements requires accurate calculations. Check our interactive <a href="/calculator" class="text-emerald-600 font-semibold hover:underline">Stainless Steel Weight Calculator</a> or review our <a href="/blog/ss-sheet-weight-formula-chart-304-202" class="text-emerald-600 font-semibold hover:underline">SS sheet weight formula and 4x8 ft weight chart</a>. For live inquiries and material availability, <a href="/contact" class="text-emerald-600 font-semibold hover:underline">contact our sales desk in Mumbai</a>.
            </p>'''

    # Substitute prose
    html = re.sub(r'<article class="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">.*?</article>', f'<article class="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">\n{article_prose}\n        </article>', html, count=1, flags=re.DOTALL)

    # Substitute FAQ section
    faq_html = '''        <!-- Frequently Asked Questions Section -->
        <section class="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i data-lucide="help-circle" class="w-5 h-5 text-emerald-600"></i> Frequently Asked Questions: SS 202 vs SS 304
            </h2>
            <div class="space-y-3">'''
    for i, (q, a) in enumerate(faqs):
        open_attr = " open" if i == 0 else ""
        faq_html += f'''
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group"{open_attr}>
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>{q}</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            {a}
                        </div>
                    </details>
                </div>'''
    faq_html += '''
            </div>
        </section>'''

    html = re.sub(r'<!-- Frequently Asked Questions Section -->.*?</section>', faq_html, html, count=1, flags=re.DOTALL)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("✅ Task 1: blog/ss-202-vs-ss-304-difference-uses-which-to-buy.html upgraded")


# ══════════════════════════════════════════════════════════════════════════════
# TASK 2: Upgrade /blog/what-is-en-10204-3-1-mill-test-certificate
# ══════════════════════════════════════════════════════════════════════════════
def update_task2_en10204():
    path = os.path.join(BASE, "blog/what-is-en-10204-3-1-mill-test-certificate.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    new_title = "EN 10204 3.1 vs 3.2 Certificate: Meaning &amp; Difference"
    new_desc = "EN 10204 3.1 vs 3.2 explained: what a 3.1 MTC means, who signs it, when you need 3.2 and what to ask your steel supplier in India."
    
    html = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', html, count=1, flags=re.DOTALL)
    html = re.sub(r'<meta name="description" content=".*?"', f'<meta name="description" content="{new_desc}"', html, count=1)
    html = re.sub(r'<meta property="og:title" content=".*?"', f'<meta property="og:title" content="{new_title}"', html, count=1)
    html = re.sub(r'<meta property="og:description" content=".*?"', f'<meta property="og:description" content="{new_desc}"', html, count=1)
    html = re.sub(r'<meta name="twitter:title" content=".*?"', f'<meta name="twitter:title" content="{new_title}"', html, count=1)
    html = re.sub(r'<meta name="twitter:description" content=".*?"', f'<meta name="twitter:description" content="{new_desc}"', html, count=1)

    # H1
    h1_text = "EN 10204 3.1 vs 3.2 Certificate: Meaning &amp; Difference"
    html = re.sub(r'<h1[^>]*>.*?</h1>', f'<h1 class="text-3xl md:text-4xl lg:text-5xl font-black leading-tight text-white mb-6">\n                {h1_text}\n            </h1>', html, count=1, flags=re.DOTALL)

    # Schema
    faqs = [
        ("What is an EN 10204 3.1 inspection certificate?",
         "An EN 10204 3.1 certificate is a document issued by the manufacturer's authorised inspection representative who is independent of the manufacturing department. It certifies that the delivered steel products comply with order specifications based on specific testing."),
        ("What is the difference between EN 10204 3.1 and 3.2?",
         "A 3.1 certificate is validated solely by the manufacturer's independent inspection representative. A 3.2 certificate requires dual validation: both the manufacturer's representative and an independent third-party inspector (e.g. SGS, TUV, Bureau Veritas, DNV) or purchaser's designated inspector validate the test results."),
        ("Can a stockist or trader issue an EN 10204 3.1 certificate?",
         "No. Under European Standard EN 10204, a 3.1 certificate can only be issued by the original material manufacturing mill. Stockists can only pass on copies of the mill's certified MTC correlated to heat numbers stamped on the metal."),
        ("What information must be present on a 3.1 MTC?",
         "A genuine 3.1 MTC contains the manufacturing mill's details, heat/melt number, material standard and grade, chemical analysis (Cr, Ni, Mo, C, etc.), mechanical test results (tensile, yield, elongation), dimensions, and the signature/stamp of the independent inspector."),
        ("When is an EN 10204 3.2 certificate mandatory?",
         "A 3.2 certificate is required for critical applications such as nuclear installations, high-pressure subsea pipelines, offshore platforms, and certain PED/boiler applications where statutory codes or end-client specifications mandate third-party witness inspection.")
    ]

    schema_graph = [
        {
            "@type": "Article",
            "headline": "EN 10204 3.1 vs 3.2 Certificate: Meaning & Difference",
            "description": new_desc,
            "datePublished": "2025-11-20",
            "dateModified": "2026-11-19",
            "mainEntityOfPage": "https://www.tatvamoverseasinc.com/blog/what-is-en-10204-3-1-mill-test-certificate",
            "image": "https://www.tatvamoverseasinc.com/assets/images/pool/lab.webp",
            "author": {"@type": "Organization", "name": "Tatvam Overseas Inc Technical Team", "url": "https://www.tatvamoverseasinc.com"},
            "publisher": {"@type": "Organization", "name": "Tatvam Overseas Inc", "url": "https://www.tatvamoverseasinc.com"}
        },
        {
            "@type": "BreadcrumbList",
            "itemListElement": [
                {"@type": "ListItem", "position": 1, "name": "Home", "item": "https://www.tatvamoverseasinc.com/"},
                {"@type": "ListItem", "position": 2, "name": "Technical Knowledge Hub", "item": "https://www.tatvamoverseasinc.com/blog"},
                {"@type": "ListItem", "position": 3, "name": "EN 10204 3.1 vs 3.2 Certificate", "item": "https://www.tatvamoverseasinc.com/blog/what-is-en-10204-3-1-mill-test-certificate"}
            ]
        },
        {
            "@type": "FAQPage",
            "mainEntity": [
                {
                    "@type": "Question",
                    "name": q,
                    "acceptedAnswer": {"@type": "Answer", "text": a}
                } for q, a in faqs
            ]
        }
    ]

    # Replace schema scripts
    new_schema = '<script type="application/ld+json">\n' + json.dumps({"@context": "https://schema.org", "@graph": schema_graph}, indent=2, ensure_ascii=False) + '\n    </script>'
    html = re.sub(r'<script type="application/ld\+json">.*?</script>\s*(<script type="application/ld\+json">.*?</script>)*', new_schema, html, count=1, flags=re.DOTALL)

    # Short Answer box
    short_answer_box = '''        <!-- Short Answer Callout Box -->
        <div class="bg-emerald-50/80 border-2 border-emerald-500/40 rounded-2xl p-6 md:p-8 mb-8 shadow-sm">
            <div class="flex items-start gap-3">
                <div class="w-8 h-8 rounded-lg bg-emerald-600 text-white flex items-center justify-center shrink-0 mt-0.5">
                    <i data-lucide="check-circle" class="w-5 h-5"></i>
                </div>
                <div>
                    <span class="text-xs uppercase font-extrabold tracking-wider text-emerald-800 block mb-1">Short Answer: What is an EN 10204 3.1 MTC?</span>
                    <p class="text-slate-800 text-sm md:text-base leading-relaxed font-medium">
                        An <strong>EN 10204 Type 3.1 Mill Test Certificate (MTC)</strong> is a formal inspection document issued by the manufacturer's authorized inspection representative who is independent of the manufacturing department. It confirms that the specific batch of delivered steel products complies with order specifications, based on specific chemical and mechanical testing of the supplied heat.
                    </p>
                </div>
            </div>
        </div>'''
        
    if "Short Answer Callout Box" in html:
        html = re.sub(r'<!-- Short Answer Callout Box -->.*?</div>\s*</div>\s*</div>', short_answer_box, html, count=1, flags=re.DOTALL)
    elif "Direct Answer" in html:
        html = re.sub(r'<!-- Direct Answer.*?-->.*?</div>\s*</div>\s*</div>', short_answer_box, html, count=1, flags=re.DOTALL)
    else:
        # Insert before featured image or main
        html = html.replace('<div class="mb-10 rounded-2xl overflow-hidden', short_answer_box + '\n\n        <div class="mb-10 rounded-2xl overflow-hidden', 1)

    # Enriched Prose
    prose_content = '''            <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
                When procuring stainless steel sheets, pipes, flanges, or nickel alloy components, an authentic test certificate is the primary proof of metallurgical integrity. European Standard <strong>EN 10204</strong> governs the inspection documents required for metallic products across global engineering projects. Understanding the difference between <strong>Type 3.1</strong> and <strong>Type 3.2</strong> certificates ensures compliance while avoiding unnecessary inspection costs.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">The Four EN 10204 Inspection Document Types</h2>
            <div class="overflow-x-auto my-6 rounded-xl border border-slate-200 shadow-sm">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="bg-slate-900 text-white text-xs uppercase tracking-wider">
                            <th class="py-3 px-4">Document Type</th>
                            <th class="py-3 px-4">Definition</th>
                            <th class="py-3 px-4">Who Validates</th>
                            <th class="py-3 px-4">Typical Application</th>
                        </tr>
                    </thead>
                    <tbody class="text-sm divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50">
                            <td class="py-3 px-4 font-bold">EN 10204 Type 2.1</td>
                            <td class="py-3 px-4">Declaration of compliance with the order</td>
                            <td class="py-3 px-4">The manufacturer</td>
                            <td class="py-3 px-4 text-slate-600">Non-critical commercial steel, general hardware</td>
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="py-3 px-4 font-bold">EN 10204 Type 2.2</td>
                            <td class="py-3 px-4">Test report based on non-specific inspection</td>
                            <td class="py-3 px-4">The manufacturer</td>
                            <td class="py-3 px-4 text-slate-600">Standard stock items, non-critical fabrication</td>
                        </tr>
                        <tr class="hover:bg-slate-50 bg-emerald-50/50">
                            <td class="py-3 px-4 font-bold text-emerald-800">EN 10204 Type 3.1</td>
                            <td class="py-3 px-4">Inspection certificate based on specific testing of delivered product</td>
                            <td class="py-3 px-4 text-emerald-800 font-semibold">Manufacturer's independent inspection representative</td>
                            <td class="py-3 px-4 text-slate-600">Standard industrial benchmark: pressure vessels, piping, SS sheets, export orders</td>
                        </tr>
                        <tr class="hover:bg-slate-50 bg-blue-50/50">
                            <td class="py-3 px-4 font-bold text-blue-800">EN 10204 Type 3.2</td>
                            <td class="py-3 px-4">Inspection certificate based on specific testing with independent third-party witness</td>
                            <td class="py-3 px-4 text-blue-800 font-semibold">Dual validation: Manufacturer representative AND Purchaser inspector or Third-Party Agency (TPI)</td>
                            <td class="py-3 px-4 text-slate-600">Critical offshore, nuclear, subsea, defense, or high-risk statutory infrastructure</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">What does a 3.1 MTC contain?</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                An EN 10204 3.1 certificate represents specific testing conducted on the exact heat or lot delivered to the customer. A comprehensive 3.1 certificate includes:
            </p>
            <ul class="list-disc pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Manufacturer &amp; Order Identification:</strong> Mill name, purchase order number, customer name, and invoice reference.</li>
                <li><strong>Heat / Melt Number:</strong> A unique metallurgical traceability code stamped on the metal plates or pipes corresponding to the batch molten in the furnace.</li>
                <li><strong>Material Specification &amp; Grade:</strong> ASTM, ASME, EN, or IS standard (e.g. ASTM A240 Grade 304/304L or UNS S20200).</li>
                <li><strong>Chemical Composition Analysis:</strong> Exact percentage by weight of alloying elements (Carbon, Manganese, Silicon, Phosphorus, Sulfur, Chromium, Nickel, Molybdenum, Nitrogen).</li>
                <li><strong>Mechanical Test Results:</strong> Yield strength ($R_{p0.2}$), ultimate tensile strength ($R_m$), elongation percentage ($A$), and hardness values (HBW/HRB).</li>
                <li><strong>Supplementary Quality Tests:</strong> Intergranular corrosion test (IGC per ASTM A262), flattening, flaring, hydrostatic, or eddy current tests where mandated by the product standard.</li>
                <li><strong>Authorized Inspector Sign-off:</strong> The stamp and signature of the manufacturer's inspection officer, who operates independently from the manufacturing department.</li>
            </ul>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">EN 10204 3.1 vs 3.2: which do you need?</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                For over 90% of industrial projects, <strong>Type 3.1 is the standard requirement</strong>. It guarantees verified batch-specific testing without the additional lead time and inspection fees associated with external agencies.
            </p>
            <p class="text-slate-600 mb-4 leading-relaxed">
                You require <strong>Type 3.2</strong> only when project specifications, international design codes (such as ASME Section III for nuclear, or offshore subsea pipeline rules), or regulatory authorities explicitly mandate third-party witness inspection. Under Type 3.2, an independent third-party inspection agency (such as SGS, TÜV SÜD, Bureau Veritas, or DNV) attends the mill, witnesses mechanical tensile and impact testing, checks dimensional tolerances, and co-signs the certificate alongside the mill representative.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">How to check a mill test certificate</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Before accepting stainless steel or alloy stock at your warehouse or job site, perform a systematic 3-step check:
            </p>
            <ol class="list-decimal pl-6 space-y-2 text-slate-600 mb-4">
                <li><strong>Verify Stencil vs. Certificate:</strong> Confirm that the heat number embossed, stenciled, or hard-stamped on the sheet or pipe matches the certificate characters exactly.</li>
                <li><strong>Check Composition Limits:</strong> Compare the reported chemical percentages against ASTM A240 or relevant standard limits (e.g., verifying 8.0–10.5% Ni for SS 304).</li>
                <li><strong>Correlate with Positive Material Identification:</strong> For high-value orders, cross-verify the piece using handheld XRF spectroscopy to ensure that pieces were not mixed during cutting or shipping.</li>
            </ol>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Learn more about our quality control processes on our dedicated <a href="/mtc" class="text-emerald-600 font-semibold hover:underline">Quality &amp; Mill Test Certification Hub</a>.
            </p>

            <h2 class="text-2xl font-bold text-slate-900 mt-8 mb-4">Ordering 3.1 / 3.2 certified stainless steel from an Indian stockist-exporter</h2>
            <p class="text-slate-600 mb-4 leading-relaxed">
                Tatvam Overseas Inc supplies certified <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 304 sheets &amp; plates</a>, <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="text-emerald-600 font-semibold hover:underline">SS 202 sheets</a>, pipes, and high-nickel alloys with complete manufacturer EN 10204 3.1 MTCs.
            </p>
            <!-- TODO(owner): confirm whether 3.2 with named third-party agencies (SGS, TUV, BV, DNV) is arranged per order -->
            <p class="text-slate-600 mb-4 leading-relaxed">
                For export orders and specialized EPC packages, our export desk coordinates third-party inspections and pre-shipment documentation. Contact us through our structured RFQ form or connect with our technical desk on WhatsApp.
            </p>
            <div class="flex flex-wrap gap-3 mt-4">
                <a href="/contact" class="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg">
                    <i data-lucide="mail" class="w-4 h-4"></i> Request Quote with MTC
                </a>
                <a href="https://wa.me/919930301181?text=Hello%20Tatvam%20Overseas%2C%20I%20need%20a%20quote%20with%20EN%2010204%203.1%20MTC" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold px-6 py-3 rounded-xl transition-all text-sm shadow-lg">
                    <i data-lucide="message-circle" class="w-4 h-4"></i> WhatsApp Sales Desk
                </a>
            </div>'''

    html = re.sub(r'<article class="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">.*?</article>', f'<article class="prose prose-slate max-w-none text-slate-700 leading-relaxed space-y-6">\n{prose_content}\n        </article>', html, count=1, flags=re.DOTALL)

    # FAQ Section
    faq_html = '''        <!-- Frequently Asked Questions Section -->
        <section class="mt-12 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i data-lucide="help-circle" class="w-5 h-5 text-emerald-600"></i> Frequently Asked Questions: EN 10204 3.1 &amp; 3.2
            </h2>
            <div class="space-y-3">'''
    for i, (q, a) in enumerate(faqs):
        open_attr = " open" if i == 0 else ""
        faq_html += f'''
                <div class="border border-slate-200 rounded-xl overflow-hidden">
                    <details class="group"{open_attr}>
                        <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                            <span>{q}</span>
                            <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                        </summary>
                        <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                            {a}
                        </div>
                    </details>
                </div>'''
    faq_html += '''
            </div>
        </section>'''

    html = re.sub(r'<!-- Frequently Asked Questions Section -->.*?</section>', faq_html, html, count=1, flags=re.DOTALL)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("✅ Task 2: blog/what-is-en-10204-3-1-mill-test-certificate.html upgraded")


# ══════════════════════════════════════════════════════════════════════════════
# TASK 3: Upgrade /calculator
# ══════════════════════════════════════════════════════════════════════════════
def update_task3_calculator():
    path = os.path.join(BASE, "calculator.html")
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    new_title = "Stainless Steel Weight Calculator: Sheet, Pipe, Bar"
    new_desc = "Free stainless steel weight calculator for sheets, pipes, flat bars and round bars. SS 304 and 202 density, formulas and 4x8 ft weight chart."
    
    html = re.sub(r'<title>.*?</title>', f'<title>{new_title}</title>', html, count=1, flags=re.DOTALL)
    html = re.sub(r'<meta name="description" content=".*?"', f'<meta name="description" content="{new_desc}"', html, count=1)
    html = re.sub(r'<meta property="og:title" content=".*?"', f'<meta property="og:title" content="{new_title}"', html, count=1)
    html = re.sub(r'<meta property="og:description" content=".*?"', f'<meta property="og:description" content="{new_desc}"', html, count=1)
    html = re.sub(r'<meta name="twitter:title" content=".*?"', f'<meta name="twitter:title" content="{new_title}"', html, count=1)
    html = re.sub(r'<meta name="twitter:description" content=".*?"', f'<meta name="twitter:description" content="{new_desc}"', html, count=1)

    # Hero H1
    new_h1 = '<h1 class="text-3xl md:text-5xl font-black leading-tight">Stainless Steel <span class="text-emerald-400">Weight Calculator</span></h1>'
    html = re.sub(r'<h1[^>]*>.*?</h1>', new_h1, html, count=1, flags=re.DOTALL)

    # In calculator JS, update FORM_LABELS, FORMULAS, and calculation logic to support Flat Bar cleanly
    # Replace the Product Form cards to explicitly show Sheet / Plate, Pipe / Tube, Flat Bar, Round Bar
    form_cards_html = '''                    <div class="grid grid-cols-2 sm:grid-cols-4 gap-4">
                        <div class="form-card active bg-white" onclick="selectForm('sheet')">
                            <div class="form-icon" style="background:#059669"><i data-lucide="square" class="w-6 h-6" style="color:white"></i></div>
                            <div class="font-bold text-slate-900 text-sm">Sheet / Plate</div>
                            <div class="text-xs text-slate-400 mt-1">Flat sheet product</div>
                        </div>
                        <div class="form-card bg-white" onclick="selectForm('pipe')">
                            <div class="form-icon"><i data-lucide="circle" class="w-6 h-6 text-slate-500"></i></div>
                            <div class="font-bold text-slate-900 text-sm">Pipe / Tube</div>
                            <div class="text-xs text-slate-400 mt-1">Hollow section (OD/WT)</div>
                        </div>
                        <div class="form-card bg-white" onclick="selectForm('flat')">
                            <div class="form-icon"><i data-lucide="rectangle-horizontal" class="w-6 h-6 text-slate-500"></i></div>
                            <div class="font-bold text-slate-900 text-sm">Flat Bar</div>
                            <div class="text-xs text-slate-400 mt-1">Patti / Strip</div>
                        </div>
                        <div class="form-card bg-white" onclick="selectForm('bar')">
                            <div class="form-icon"><i data-lucide="minus" class="w-6 h-6 text-slate-500"></i></div>
                            <div class="font-bold text-slate-900 text-sm">Round Bar</div>
                            <div class="text-xs text-slate-400 mt-1">Solid round section</div>
                        </div>
                    </div>'''
    html = re.sub(r'<div class="grid grid-cols-2 sm:grid-cols-4 gap-4">.*?</div>\s*</div>\s*</div>\s*<!-- STEP 3', form_cards_html + '\n                </div>\n\n                <!-- STEP 3', html, count=1, flags=re.DOTALL)

    # Update calculator JS definitions
    calc_js_repl = '''    const FORM_LABELS={sheet:'Sheet / Plate',pipe:'Pipe / Tube',flat:'Flat Bar (Patti)',bar:'Round Bar',coil:'Coil / Strip'};
    const FORMULAS={
        sheet:'Weight (kg) = L(m) × W(m) × T(mm) × Density(g/cm³) × Qty',
        pipe:'Weight (kg) = π × (OD - WT) × WT × Density ÷ 1000 × Length(m) × Qty',
        flat:'Weight (kg) = Width(mm) × Thickness(mm) × Density ÷ 1000 × Length(m) × Qty',
        bar:'Weight (kg) = (π ÷ 4) × Dia²(mm) × Density ÷ 1000 × Length(m) × Qty',
        coil:'Weight (kg) = Width(mm) × Thickness(mm) × Length(m) × Density ÷ 1000 × Qty'
    };'''
    html = re.sub(r'const FORM_LABELS=\{.*?\};\s*const FORMULAS=\{.*?\};', calc_js_repl, html, count=1, flags=re.DOTALL)

    # Update selectForm and renderDimInputs in calculator.html
    dim_inputs_js = '''    function selectForm(f){
        currentForm=f;
        const fs=['sheet','pipe','flat','bar'];
        document.querySelectorAll('.form-card').forEach((card,i)=>{
            const act=fs[i]===f;
            card.classList.toggle('active',act);
            const icon=card.querySelector('.form-icon');
            if(icon) icon.style.background=act?'#059669':'#f1f5f9';
            const ic=card.querySelector('i');
            if(ic) ic.style.color=act?'white':'#64748b';
        });
        document.getElementById('form-badge').textContent=FORM_LABELS[f]||f;
        renderDimInputs();
        runCalc();
    }

    function inp(id,label,placeholder,def=''){
        return `<div class="flex flex-col"><label class="input-label">${label}</label>
            <input type="number" id="${id}" class="calc-input" placeholder="${placeholder}" value="${def}" oninput="runCalc()" min="0" step="any"></div>`;
    }

    function renderDimInputs(){
        const c=document.getElementById('dim-inputs');
        if(currentForm==='sheet'){
            c.innerHTML=`<div class="grid grid-cols-3 gap-4">${inp('c-l','Length (mm)','e.g. 2438.4','2438.4')}${inp('c-w','Width (mm)','e.g. 1219.2','1219.2')}${inp('c-t','Thickness (mm)','e.g. 1.0','1.0')}</div>
                <div class="grid grid-cols-2 gap-4">${inp('c-qty','Quantity (pcs)','e.g. 1','1')}
                <div class="flex flex-col"><label class="input-label">Dimension Unit</label>
                <select id="dim-unit" class="calc-input" onchange="runCalc()"><option value="mm">Millimeters (mm)</option><option value="inch">Inches (in)</option><option value="ft">Feet (ft)</option></select></div></div>`;
        } else if(currentForm==='pipe'){
            c.innerHTML=`<div class="grid grid-cols-2 gap-4">${inp('c-od','Outer Diameter (mm)','e.g. 48.3')}${inp('c-wt','Wall Thickness (mm)','e.g. 3.68')}</div>
                <div class="grid grid-cols-2 gap-4">${inp('c-l','Length (meters)','e.g. 6','6')}${inp('c-qty','Quantity (pcs)','e.g. 1','1')}</div>`;
        } else if(currentForm==='flat'){
            c.innerHTML=`<div class="grid grid-cols-2 gap-4">${inp('c-w','Width (mm)','e.g. 100','100')}${inp('c-t','Thickness (mm)','e.g. 10','10')}</div>
                <div class="grid grid-cols-2 gap-4">${inp('c-l','Length (meters)','e.g. 1','1')}${inp('c-qty','Quantity (pcs)','e.g. 1','1')}</div>`;
        } else if(currentForm==='bar'){
            c.innerHTML=`<div class="grid grid-cols-2 gap-4">${inp('c-dia','Diameter (mm)','e.g. 50')}${inp('c-l','Length (meters)','e.g. 1','1')}</div>${inp('c-qty','Quantity (pcs)','e.g. 1','1')}`;
        }
        document.getElementById('formula-text').textContent=FORMULAS[currentForm]||'';
    }

    function runCalc(){
        const qty=parseFloat(document.getElementById('c-qty')?.value)||1;
        let perPc=0, dims='';
        if(currentForm==='sheet'){
            let l=parseFloat(document.getElementById('c-l')?.value)||0;
            let w=parseFloat(document.getElementById('c-w')?.value)||0;
            const t=parseFloat(document.getElementById('c-t')?.value)||0;
            const unit=document.getElementById('dim-unit')?.value||'mm';
            let l_m = l / 1000, w_m = w / 1000;
            if(unit==='inch'){ l_m = (l * 0.0254); w_m = (w * 0.0254); }
            else if(unit==='ft'){ l_m = (l * 0.3048); w_m = (w * 0.3048); }
            perPc = l_m * w_m * t * currentDensity;
            dims = `${l}×${w}×${t} (${unit})`;
        } else if(currentForm==='pipe'){
            const od=parseFloat(document.getElementById('c-od')?.value)||0;
            const wt=parseFloat(document.getElementById('c-wt')?.value)||0;
            const l=parseFloat(document.getElementById('c-l')?.value)||0;
            if(od>wt){
                // FACTS: pi * (OD - WT) * WT * density / 1000 * length
                perPc = Math.PI * (od - wt) * wt * currentDensity / 1000 * l;
            }
            dims=`OD${od}×WT${wt}mm·L${l}m`;
        } else if(currentForm==='flat'){
            const w=parseFloat(document.getElementById('c-w')?.value)||0;
            const t=parseFloat(document.getElementById('c-t')?.value)||0;
            const l=parseFloat(document.getElementById('c-l')?.value)||0;
            // FACTS: width(mm) * thickness(mm) * density / 1000 * length(m)
            perPc = (w * t * currentDensity / 1000) * l;
            dims=`${w}×${t}mm·L${l}m`;
        } else if(currentForm==='bar'){
            const d=parseFloat(document.getElementById('c-dia')?.value)||0;
            const l=parseFloat(document.getElementById('c-l')?.value)||0;
            // FACTS: (pi / 4) * d^2 * density / 1000 * length(m)
            perPc = (Math.PI / 4) * d * d * currentDensity / 1000 * l;
            dims=`Ø${d}mm·L${l}m`;
        }
        calcKg=perPc*qty;
        updateDisplay(perPc,qty,dims);
        if(calcKg>0)pushHistory(dims,qty,calcKg);
    }'''

    html = re.sub(r'function selectForm\(f\)\{.*?function runCalc\(\)\{.*?if\(calcKg>0\)pushHistory\(dims,qty,calcKg\);\s*\}', dim_inputs_js, html, count=1, flags=re.DOTALL)

    # Static Crawlable section update with FAQs & JSON-LD
    calc_faqs = [
        ("How do you calculate stainless steel sheet weight?",
         "Theoretical weight (kg) = Length (m) × Width (m) × Thickness (mm) × Density (g/cm³). For standard SS 304 with density 7.93 g/cm³, a 4×8 ft sheet of 1.0 mm thickness weighs approximately 23.58 kg."),
        ("What is the formula for stainless steel pipe weight per metre?",
         "Weight per metre (kg/m) = π × (OD - WT) × WT × Density ÷ 1000, where OD is outer diameter in mm, WT is wall thickness in mm, and Density is in g/cm³ (7.93 for SS 304, approx 0.02491 × (OD - WT) × WT)."),
        ("What is the weight formula for stainless steel flat bars?",
         "Weight per metre (kg/m) = Width (mm) × Thickness (mm) × Density ÷ 1000. For a 100 mm × 10 mm SS 304 flat bar, the weight is 100 × 10 × 7.93 ÷ 1000 = 7.93 kg per metre."),
        ("What is the weight formula for stainless steel round bars?",
         "Weight per metre (kg/m) = (π ÷ 4) × Diameter² (mm) × Density ÷ 1000. For SS 304, this equals approx 0.006228 × Diameter²."),
        ("Why does SS 202 weigh slightly less than SS 304?",
         "SS 202 has a nominal density of 7.80 g/cm³ because manganese and nitrogen replace a portion of the heavier nickel (density 7.93 g/cm³ in SS 304).")
    ]

    calc_faq_json = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": q,
                "acceptedAnswer": {"@type": "Answer", "text": a}
            } for q, a in calc_faqs
        ]
    }
    
    # Check if FAQPage schema exists or insert it
    if "FAQPage" not in html:
        calc_faq_script = f'\n    <script type="application/ld+json">\n{json.dumps(calc_faq_json, indent=2)}\n    </script>'
        html = html.replace('</head>', f'{calc_faq_script}\n</head>', 1)

    # Add visible FAQ block to static section
    faq_block_html = '''                <!-- Calculator FAQ Section -->
                <div class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
                    <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <i data-lucide="help-circle" class="w-6 h-6 text-emerald-600"></i> Steel Weight Calculator FAQs
                    </h2>
                    <div class="space-y-3">'''
    for i, (q, a) in enumerate(calc_faqs):
        open_attr = " open" if i == 0 else ""
        faq_block_html += f'''
                        <div class="border border-slate-200 rounded-xl overflow-hidden">
                            <details class="group"{open_attr}>
                                <summary class="flex justify-between items-center p-4 bg-slate-50 font-bold text-slate-800 text-sm md:text-base cursor-pointer hover:bg-slate-100 transition-colors list-none">
                                    <span>{q}</span>
                                    <span class="text-emerald-600 text-xl font-bold group-open:rotate-180 transition-transform">&darr;</span>
                                </summary>
                                <div class="p-4 bg-white text-slate-600 text-sm leading-relaxed border-t border-slate-100">
                                    {a}
                                </div>
                            </details>
                        </div>'''
    faq_block_html += '''
                    </div>
                </div>'''

    if "Calculator FAQ Section" not in html:
        # Insert before Explore Stainless Steel Product Range or before </section>
        html = html.replace('<!-- Explore Stainless Steel Product Range -->', faq_block_html + '\n\n                <!-- Explore Stainless Steel Product Range -->', 1)

    # Update links in Explore section
    explore_links_html = '''                    <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-4 text-xs font-bold">
                        <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">SS 304 Sheets</span>
                            <span class="text-slate-500 font-normal">Cold &amp; hot rolled sheets &rarr;</span>
                        </a>
                        <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">SS 202 Sheets</span>
                            <span class="text-slate-500 font-normal">Jindal J1 / J4 stock &rarr;</span>
                        </a>
                        <a href="/products/stainless-steel-pipes-tubes-supplier-mumbai" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">SS Pipes &amp; Tubes</span>
                            <span class="text-slate-500 font-normal">Seamless &amp; welded pipes &rarr;</span>
                        </a>
                        <a href="/blog/ss-sheet-weight-formula-chart-304-202" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">Weight Chart Guide</span>
                            <span class="text-slate-500 font-normal">Formula &amp; density guide &rarr;</span>
                        </a>
                    </div>'''

    html = re.sub(r'<div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold">.*?</div>', explore_links_html, html, count=1, flags=re.DOTALL)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("✅ Task 3: calculator.html upgraded")


# ══════════════════════════════════════════════════════════════════════════════
# TASK 4: Update Product Pages (Tables from FACTS & Contextual Links)
# ══════════════════════════════════════════════════════════════════════════════
def update_task4_product_pages():
    # SS 202 product page
    p202_path = os.path.join(BASE, "products/ss-202-sheets-jindal-j1-j4-supplier-mumbai.html")
    with open(p202_path, "r", encoding="utf-8") as f:
        h202 = f.read()

    table_202 = '''
        <!-- ASTM A240 SS 202 Chemical Composition & Properties -->
        <section class="mt-8 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i data-lucide="layers" class="w-6 h-6 text-emerald-600"></i> ASTM A240 SS 202 Chemical Composition &amp; Specifications
            </h2>
            <p class="text-xs md:text-sm text-slate-600 mb-4 leading-relaxed">
                Grade 202 (UNS S20200) is an austenitic alloy replacing part of the nickel with manganese and nitrogen for economical fabrication. For a full comparison against 304, read our engineering guide on <a href="/blog/ss-202-vs-ss-304-difference-uses-which-to-buy" class="text-emerald-600 font-bold hover:underline">SS 202 vs SS 304: Differences, Price &amp; Which to Buy</a>.
            </p>
            <div class="overflow-x-auto my-4">
                <table class="w-full text-left text-xs md:text-sm border-collapse border border-slate-200 rounded-lg">
                    <thead class="bg-slate-900 text-white text-xs uppercase">
                        <tr>
                            <th class="py-2.5 px-3">Carbon (C)</th>
                            <th class="py-2.5 px-3">Manganese (Mn)</th>
                            <th class="py-2.5 px-3">Silicon (Si)</th>
                            <th class="py-2.5 px-3">Phosphorus (P)</th>
                            <th class="py-2.5 px-3">Sulfur (S)</th>
                            <th class="py-2.5 px-3">Chromium (Cr)</th>
                            <th class="py-2.5 px-3">Nickel (Ni)</th>
                            <th class="py-2.5 px-3">Nitrogen (N)</th>
                            <th class="py-2.5 px-3">Density</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        <tr class="hover:bg-slate-50 font-mono">
                            <td class="py-2 px-3">0.15% max</td>
                            <td class="py-2 px-3 font-bold text-slate-900">7.5–10.0%</td>
                            <td class="py-2 px-3">1.00% max</td>
                            <td class="py-2 px-3">0.060% max</td>
                            <td class="py-2 px-3">0.030% max</td>
                            <td class="py-2 px-3 font-bold text-slate-900">17.0–19.0%</td>
                            <td class="py-2 px-3 font-bold text-emerald-700">4.0–6.0%</td>
                            <td class="py-2 px-3">0.25% max</td>
                            <td class="py-2 px-3 font-bold">7.80 g/cm³</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-xs text-slate-500 italic mt-2">Values conform to ASTM A240 UNS S20200. Mill Test Certificates (EN 10204 3.1) provided with heat numbers for every order.</p>
        </section>'''

    if "ASTM A240 SS 202 Chemical Composition" not in h202:
        h202 = h202.replace('<!-- Related Reading -->', table_202 + '\n\n        <!-- Related Reading -->', 1)
        with open(p202_path, "w", encoding="utf-8") as f:
            f.write(h202)
        print("✅ Task 4: SS 202 product page updated with composition table & link")

    # SS 304 product page
    p304_path = os.path.join(BASE, "products/ss-304-sheets-plates-supplier-mumbai.html")
    with open(p304_path, "r", encoding="utf-8") as f:
        h304 = f.read()

    table_304 = '''
        <!-- ASTM A240 SS 304 Chemical Composition & Properties -->
        <section class="mt-8 bg-white rounded-2xl p-6 md:p-8 border border-slate-200/80 shadow-sm">
            <h2 class="text-xl md:text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                <i data-lucide="layers" class="w-6 h-6 text-emerald-600"></i> ASTM A240 SS 304 / 304L Chemical Composition &amp; Specifications
            </h2>
            <p class="text-xs md:text-sm text-slate-600 mb-4 leading-relaxed">
                Grade 304 (UNS S30400) is the standard 18/8 austenitic alloy for food processing, architectural cladding, and industrial fabrication. For a comparison against 200-series grades, read our analysis on <a href="/blog/ss-202-vs-ss-304-difference-uses-which-to-buy" class="text-emerald-600 font-bold hover:underline">SS 202 vs SS 304: Differences, Price &amp; Which to Buy</a>.
            </p>
            <div class="overflow-x-auto my-4">
                <table class="w-full text-left text-xs md:text-sm border-collapse border border-slate-200 rounded-lg">
                    <thead class="bg-slate-900 text-white text-xs uppercase">
                        <tr>
                            <th class="py-2.5 px-3">Grade</th>
                            <th class="py-2.5 px-3">Carbon (C)</th>
                            <th class="py-2.5 px-3">Manganese (Mn)</th>
                            <th class="py-2.5 px-3">Silicon (Si)</th>
                            <th class="py-2.5 px-3">Phosphorus (P)</th>
                            <th class="py-2.5 px-3">Sulfur (S)</th>
                            <th class="py-2.5 px-3">Chromium (Cr)</th>
                            <th class="py-2.5 px-3">Nickel (Ni)</th>
                            <th class="py-2.5 px-3">Nitrogen (N)</th>
                            <th class="py-2.5 px-3">Density</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100 font-mono">
                        <tr class="hover:bg-slate-50">
                            <td class="py-2 px-3 font-bold font-sans">SS 304</td>
                            <td class="py-2 px-3">0.07% max</td>
                            <td class="py-2 px-3">2.00% max</td>
                            <td class="py-2 px-3">0.75% max</td>
                            <td class="py-2 px-3">0.045% max</td>
                            <td class="py-2 px-3">0.030% max</td>
                            <td class="py-2 px-3 font-bold text-slate-900">17.5–19.5%</td>
                            <td class="py-2 px-3 font-bold text-emerald-700">8.0–10.5%</td>
                            <td class="py-2 px-3">0.10% max</td>
                            <td class="py-2 px-3 font-bold">7.93 g/cm³</td>
                        </tr>
                        <tr class="hover:bg-slate-50">
                            <td class="py-2 px-3 font-bold font-sans">SS 304L</td>
                            <td class="py-2 px-3 font-bold text-emerald-700">0.030% max</td>
                            <td class="py-2 px-3">2.00% max</td>
                            <td class="py-2 px-3">0.75% max</td>
                            <td class="py-2 px-3">0.045% max</td>
                            <td class="py-2 px-3">0.030% max</td>
                            <td class="py-2 px-3 font-bold text-slate-900">17.5–19.5%</td>
                            <td class="py-2 px-3 font-bold text-emerald-700">8.0–10.5%</td>
                            <td class="py-2 px-3">0.10% max</td>
                            <td class="py-2 px-3 font-bold">7.93 g/cm³</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <p class="text-xs text-slate-500 italic mt-2">Values conform to ASTM A240 UNS S30400 / S30403. EN 10204 3.1 MTC provided with full heat traceability.</p>
        </section>'''

    if "ASTM A240 SS 304 / 304L Chemical Composition" not in h304:
        h304 = h304.replace('<!-- Related Reading -->', table_304 + '\n\n        <!-- Related Reading -->', 1)
        with open(p304_path, "w", encoding="utf-8") as f:
            f.write(h304)
        print("✅ Task 4: SS 304 product page updated with composition table & link")


# ══════════════════════════════════════════════════════════════════════════════
# TASK 5: Brand & Local Signals (Khetwadi Main Address & Positioning Statement)
# ══════════════════════════════════════════════════════════════════════════════
def update_task5_brand_and_local():
    # 1. Update SITE_CONFIG in js/components.js
    comp_path = os.path.join(BASE, "js/components.js")
    with open(comp_path, "r", encoding="utf-8") as f:
        comp_js = f.read()

    pos_statement = "Tatvam Overseas Inc is a Mumbai-based stockist and exporter of stainless steel sheets (SS 304, SS 202, designer sheets), pipes and nickel alloys, supplied with EN 10204 3.1 mill test certificates."
    
    # Update SITE_CONFIG main address to Khetwadi
    comp_js = re.sub(
        r"address:\s*'[^']*'",
        "address: '61, Jamnadas Building, Shop No. 5 & 6, 10th Khetwadi Back Road, Girgaon, Mumbai - 400004'",
        comp_js
    )
    
    # Update footer description line to include positioning statement and Khetwadi primary office
    comp_js = comp_js.replace(
        "ISO 9001:2015 certified stockist and exporter of stainless steel, carbon steel, and high nickel alloys. Serving global industries since 1992 with complete traceability and MTC certification.",
        pos_statement
    )

    # In footer contact section, ensure Registered Office (Khetwadi) is prominent as primary/main address
    comp_js = comp_js.replace(
        '''                                <strong class="text-slate-300 block">Trading Office:</strong>
                                39/41, Kamal Building, 1st Kumbharwada Lane, Near Round Temple, Bhandari Street, Kalbadevi, Mumbai 400004
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <i data-lucide="building" class="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5"></i>
                            <div class="text-xs leading-relaxed text-slate-400">
                                <strong class="text-slate-300 block">Registered Office:</strong>
                                61, Jamnadas Building, Shop 5 &amp; 6, 10th Khetwadi Back Road, Girgaon, Mumbai 400004''',
        '''                                <strong class="text-slate-300 block">Main &amp; Registered Office:</strong>
                                61, Jamnadas Building, Shop 5 &amp; 6, 10th Khetwadi Back Road, Girgaon, Mumbai 400004
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <i data-lucide="building" class="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5"></i>
                            <div class="text-xs leading-relaxed text-slate-400">
                                <strong class="text-slate-300 block">Trading Office (Kalbadevi):</strong>
                                39/41, Kamal Building, 1st Kumbharwada Lane, Near Round Temple, Bhandari Street, Kalbadevi, Mumbai 400004'''
    )

    with open(comp_path, "w", encoding="utf-8") as f:
        f.write(comp_js)
    print("✅ Task 5: js/components.js updated with Khetwadi main address & positioning statement")

    # 2. Update index.html supporting text and Organization schema
    index_path = os.path.join(BASE, "index.html")
    with open(index_path, "r", encoding="utf-8") as f:
        index_html = f.read()

    # Positioning statement in supporting text under hero H1
    # Check current hero subtext
    hero_pattern = r'(<h1[^>]*>.*?</h1>\s*<p class="text-lg md:text-xl text-slate-300 max-w-2xl font-normal leading-relaxed">)(.*?)(</p>)'
    replacement_p = f'\\1{pos_statement}\\3'
    index_html = re.sub(hero_pattern, replacement_p, index_html, count=1, flags=re.DOTALL)

    with open(index_path, "w", encoding="utf-8") as f:
        f.write(index_html)
    print("✅ Task 5: index.html updated with positioning statement")

    # 3. Update contact.html & about.html to have Khetwadi as primary address
    contact_path = os.path.join(BASE, "contact.html")
    with open(contact_path, "r", encoding="utf-8") as f:
        contact_html = f.read()
    
    # Natural sentence on contact page
    loc_sentence = "Our main registered office is in Khetwadi (Girgaon), with our trading office in Kalbadevi, Mumbai, and warehouse facilities in Kalamboli, Navi Mumbai."
    if "Khetwadi" in contact_html and "main registered office" not in contact_html:
        contact_html = contact_html.replace(
            "Reach out to our sales and technical team in Mumbai.",
            f"Reach out to our sales and technical team in Mumbai. {loc_sentence}"
        )
    with open(contact_path, "w", encoding="utf-8") as f:
        f.write(contact_html)
    print("✅ Task 5: contact.html updated with Khetwadi primary address")

    about_path = os.path.join(BASE, "about.html")
    with open(about_path, "r", encoding="utf-8") as f:
        about_html = f.read()
    if pos_statement not in about_html:
        about_html = about_html.replace(
            "Serving global industries since 1992 with complete traceability and MTC certification.",
            pos_statement
        )
    with open(about_path, "w", encoding="utf-8") as f:
        f.write(about_html)
    print("✅ Task 5: about.html updated")


# ══════════════════════════════════════════════════════════════════════════════
# TASK 7: Update Sitemap lastmod for changed pages
# ══════════════════════════════════════════════════════════════════════════════
def update_task7_sitemap():
    path = os.path.join(BASE, "sitemap.xml")
    with open(path, "r", encoding="utf-8") as f:
        sitemap = f.read()

    changed_slugs = [
        "https://www.tatvamoverseasinc.com/",
        "https://www.tatvamoverseasinc.com/blog/ss-202-vs-ss-304-difference-uses-which-to-buy",
        "https://www.tatvamoverseasinc.com/blog/what-is-en-10204-3-1-mill-test-certificate",
        "https://www.tatvamoverseasinc.com/calculator",
        "https://www.tatvamoverseasinc.com/products/ss-304-sheets-plates-supplier-mumbai",
        "https://www.tatvamoverseasinc.com/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai",
        "https://www.tatvamoverseasinc.com/contact",
        "https://www.tatvamoverseasinc.com/about"
    ]

    for loc in changed_slugs:
        # Find the url entry and update lastmod
        escaped_loc = re.escape(loc)
        pattern = rf'(<loc>{escaped_loc}</loc>\s*<lastmod>)\d{{4}}-\d{{2}}-\d{{2}}(</lastmod>)'
        sitemap = re.sub(pattern, r'\g<1>2026-11-19\2', sitemap)

    with open(path, "w", encoding="utf-8") as f:
        f.write(sitemap)
    print("✅ Task 7: sitemap.xml updated with lastmod 2026-11-19 for changed pages")


if __name__ == "__main__":
    print("--- Applying GSC Optimization Tasks ---")
    update_task1_202_vs_304()
    update_task2_en10204()
    update_task3_calculator()
    update_task4_product_pages()
    update_task5_brand_and_local()
    update_task7_sitemap()
    print("--- All Optimization Scripts Executed Successfully ---")
