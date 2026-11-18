#!/usr/bin/env python3
"""
Task 3 & 5 updates on index.html:
1. Remove ICBM and geo.* meta tags.
2. In 'Specialized Stainless Steel Stock', add cards for SS 304 Sheets & Plates and Designer SS Sheets.
3. Link all 5 blog posts in home-blog-grid.
4. Fix duplicate alt text on warehouse image (line 1040) and gallery image (line 1116).
5. Footer CTA phrasing updated to emphasize exporter and stockist from India.
6. Link country pages (/export/uae, /export/saudi-arabia, /export/kenya, /export/nigeria, /export/vietnam) and /export-terms in the Exporting section.
7. Update Schema (Organization areaServed with key export countries).
"""

import re

def update_index():
    with open("index.html", "r", encoding="utf-8") as f:
        html = f.read()

    # 1. Remove ICBM and geo.* meta tags
    geo_pattern = r'\s*<!-- Geo Tags.*?-->\s*<meta name="geo\.region".*?>\s*<meta name="geo\.placename".*?>\s*<meta name="geo\.position".*?>\s*<meta name="ICBM".*?>'
    html = re.sub(geo_pattern, '', html, flags=re.DOTALL)

    # 2. Update Organization Schema areaServed
    old_desc = '"description": "ISO 9001:2015 certified stockist and exporter of stainless steel, carbon steel, and high nickel alloys since 1992. Serving 15+ countries from Mumbai.",'
    new_desc = '''"description": "ISO 9001:2015 certified stockist and exporter of stainless steel, carbon steel, and high nickel alloys since 1992. Serving 15+ countries from Mumbai.",
      "areaServed": ["India", "United Arab Emirates", "Saudi Arabia", "Oman", "Kenya", "Nigeria", "Vietnam", "Malaysia", "Qatar", "Kuwait"],'''
    if old_desc in html and '"areaServed"' not in html:
        html = html.replace(old_desc, new_desc)

    # 3. Specialized Stainless Steel Stock: Replace 3-card grid with 5-card responsive grid
    old_specialized = """                    <div class="grid md:grid-cols-3 gap-6">
                        <!-- SS 202 Sheets -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 overflow-hidden bg-slate-100 relative">
                                <img src="assets/images/pool/sheets_prod.webp" alt="SS 202 Sheets Jindal J1 J4 Supplier Mumbai" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="250">
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">Jindal J1 / J4</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">SS 202 Sheets (Jindal J1, J4)</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    SS 202 sheets in Jindal J1, J4 and other 200-series grades. A wide range of sizes and thicknesses.
                                </p>
                                <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View SS 202 Sheets <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>

                        <!-- SS Circles & Discs -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-circles-discs.webp (stainless steel circles / discs) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="disc" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Circles &amp; Discs</span>
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">Grades 202 / 304</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">SS Circles &amp; Discs</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    Precision circle blanks and circular discs for utensils, deep drawing, cookers, and tank ends in SS 202 and SS 304. Custom diameters arranged.
                                </p>
                                <a href="/products/ss-circles-discs-supplier-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View SS Circles <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>

                        <!-- SS Patta / Patti -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-patta-patti.webp (stainless steel patta / patti / flat strips) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="align-justify" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Flat Strips &amp; Bars</span>
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">SS 202 &amp; 304</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">SS Patta / Patti (SS 202 &amp; 304)</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    Slit edge and sheared flat strips and flat bars in SS 202 and 304 for gates, architectural railings, brackets, frames, and trim fabrication.
                                </p>
                                <a href="/products/ss-patta-patti-flats-strips-supplier-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View Patta / Patti <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>
                    </div>"""

    new_specialized = """                    <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        <!-- SS 304 Sheets & Plates -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 overflow-hidden bg-slate-100 relative">
                                <img src="assets/images/pool/sheets_prod.webp" alt="SS 304 Sheets Plates Supplier Mumbai" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="250">
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">ASTM A240 / 304L</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">SS 304 Sheets &amp; Plates</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    ASTM A240 Stainless Steel 304 &amp; 304L sheets and plates (0.5 mm to 50 mm). 2B, No.4, 8K mirror with full EN 10204 3.1 MTC.
                                </p>
                                <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View SS 304 Sheets &amp; Rates <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>

                        <!-- SS 202 Sheets -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 overflow-hidden bg-slate-100 relative">
                                <img src="assets/images/pool/sheets_prod.webp" alt="SS 202 Sheets Jindal J1 J4 Supplier Mumbai" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="250">
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">Jindal J1 / J4</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">SS 202 Sheets (Jindal J1, J4)</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    Prime Jindal J1 and J4 sheets (0.5 mm to 3.0 mm). Economical for utensils, furniture, and interior panels in 2B and No.4 finishes.
                                </p>
                                <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View SS 202 Sheets &amp; Rates <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>

                        <!-- Decorative / Designer SS Sheets -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 overflow-hidden bg-slate-100 relative">
                                <img src="assets/images/pool/pvd_designer_sheets.webp" alt="Decorative Stainless Steel Sheets PVD Mirror Etched Mumbai" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="250">
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">PVD &amp; 8K Mirror</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">Designer SS Sheets (PVD, Mirror, Etched)</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    PVD Titanium Gold, Rose Gold, Black, 8K Super Mirror, Etched, and 3D Water Ripple finishes for luxury hotel lobbies and elevator cabins.
                                </p>
                                <a href="/products/decorative-stainless-steel-sheets-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View Designer Sheets <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>

                        <!-- SS Circles & Discs -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-circles-discs.webp (stainless steel circles / discs) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="disc" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Circles &amp; Discs</span>
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">Grades 202 / 304</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">SS Circles &amp; Discs</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    Precision circle blanks and circular discs for utensils, deep drawing, cookers, and tank ends in SS 202 and SS 304. Custom diameters arranged.
                                </p>
                                <a href="/products/ss-circles-discs-supplier-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View SS Circles <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>

                        <!-- SS Patta / Patti -->
                        <article class="bg-white rounded-2xl border border-slate-200/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
                            <div class="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-patta-patti.webp (stainless steel patta / patti / flat strips) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="align-justify" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Flat Strips &amp; Bars</span>
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">SS 202 &amp; 304</span>
                            </div>
                            <div class="p-6 flex flex-col flex-grow">
                                <h4 class="text-lg font-bold text-slate-900 group-hover:text-emerald-600 transition-colors mb-2">SS Patta / Patti (SS 202 &amp; 304)</h4>
                                <p class="text-slate-600 text-xs leading-relaxed mb-4 flex-grow">
                                    Slit edge and sheared flat strips and flat bars in SS 202 and 304 for gates, architectural railings, brackets, frames, and trim fabrication.
                                </p>
                                <a href="/products/ss-patta-patti-flats-strips-supplier-mumbai" class="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 mt-auto">
                                    View Patta / Patti <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                                </a>
                            </div>
                        </article>
                    </div>"""
    
    if old_specialized in html:
        html = html.replace(old_specialized, new_specialized)
    else:
        print("Warning: old_specialized block not found exactly, using regex replace.")
        html = re.sub(r'<div class="grid md:grid-cols-3 gap-6">\s*<!-- SS 202 Sheets -->.*?<!-- SS Patta / Patti -->.*?</article>\s*</div>', new_specialized, html, flags=re.DOTALL)

    # 4. Link all 5 blog posts in home-blog-grid
    old_blog_grid_regex = r'<div id="home-blog-grid" class="grid md:grid-cols-3 gap-8">\s*<!-- Static SEO Blog Cards -->.*?</div>\s*</div>\s*</section>'
    
    new_blog_grid = """<div id="home-blog-grid" class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    <!-- Static SEO Blog Cards -->
                    <!-- 1. SS 202 vs SS 304 -->
                    <article class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                        <div class="h-48 relative overflow-hidden">
                            <img src="assets/images/pool/sheets_prod.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="225" alt="SS 202 vs SS 304 Differences and Uses">
                            <span class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Technical Guide</span>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="text-xs text-slate-400 mb-2">Oct 21, 2026 · 6 min read</div>
                            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                <a href="/blog/ss-202-vs-ss-304-difference-uses-which-to-buy">SS 202 vs SS 304: Differences, Uses and Which Grade to Buy</a>
                            </h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-3">Compare SS 202 and SS 304 stainless steel: composition, corrosion resistance, uses and how to verify the grade you receive. A practical guide for buyers.</p>
                            <a href="/blog/ss-202-vs-ss-304-difference-uses-which-to-buy" class="mt-auto text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                Read Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                            </a>
                        </div>
                    </article>

                    <!-- 2. SS Sheet Finishes -->
                    <article class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                        <div class="h-48 relative overflow-hidden">
                            <img src="assets/images/pool/sheets_mirror.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="225" alt="Stainless Steel Sheet Finishes 2B BA No.4 8K Mirror">
                            <span class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Technical Guide</span>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="text-xs text-slate-400 mb-2">Oct 21, 2026 · 6 min read</div>
                            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                <a href="/blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror">Stainless Steel Sheet Finishes: 2B, BA, No.4 &amp; 8K Mirror Explained</a>
                            </h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-3">Understand stainless steel sheet finishes from 2B and BA to No.4 brushed and 8K mirror. Compare production methods, reflectivity, fabrication suitability, and selection tips.</p>
                            <a href="/blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror" class="mt-auto text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                Read Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                            </a>
                        </div>
                    </article>

                    <!-- 3. SS 304 vs SS 316L -->
                    <article class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                        <div class="h-48 relative overflow-hidden">
                            <img src="assets/images/pool/sheets_blog.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="225" alt="SS 304 vs SS 316L Metallurgical Comparison">
                            <span class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Metallurgy</span>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="text-xs text-slate-400 mb-2">Oct 12, 2025 · 8 min read</div>
                            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                <a href="/blog/ss-304-vs-ss-316l-which-to-choose">SS 304 vs SS 316L: Which Grade Should You Choose?</a>
                            </h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-3">A thorough metallurgical and cost comparison between SS 304 and SS 316L. Learn when molybdenum addition is mandatory and when SS 304 delivers maximum value.</p>
                            <a href="/blog/ss-304-vs-ss-316l-which-to-choose" class="mt-auto text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                Read Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                            </a>
                        </div>
                    </article>

                    <!-- 4. EN 10204 3.1 Mill Test Certificate -->
                    <article class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                        <div class="h-48 relative overflow-hidden">
                            <img src="assets/images/pool/lab.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="225" alt="EN 10204 3.1 Mill Test Certificate Guide">
                            <span class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Quality Assurance</span>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="text-xs text-slate-400 mb-2">Nov 20, 2025 · 6 min read</div>
                            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                <a href="/blog/what-is-en-10204-3-1-mill-test-certificate">What is an EN 10204 3.1 Mill Test Certificate (MTC)?</a>
                            </h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-3">Understand the exact requirements of an EN 10204 3.1 inspection certificate. Heat traceability, chemical analysis verification, and counterfeit prevention.</p>
                            <a href="/blog/what-is-en-10204-3-1-mill-test-certificate" class="mt-auto text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                Read Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                            </a>
                        </div>
                    </article>

                    <!-- 5. IBR Boiler Pipes -->
                    <article class="bg-white rounded-xl border border-slate-200 hover:shadow-lg transition-all overflow-hidden flex flex-col group">
                        <div class="h-48 relative overflow-hidden">
                            <img src="assets/images/pool/alloy_pipes.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" loading="lazy" decoding="async" width="400" height="225" alt="IBR Certified Boiler Pipes P11 P22">
                            <span class="absolute top-3 right-3 bg-white/90 backdrop-blur px-2.5 py-1 rounded-full text-xs font-bold text-emerald-700">Engineering</span>
                        </div>
                        <div class="p-5 flex flex-col flex-grow">
                            <div class="text-xs text-slate-400 mb-2">Jan 15, 2026 · 7 min read</div>
                            <h3 class="text-lg font-bold text-slate-900 mb-2 group-hover:text-emerald-600 transition-colors">
                                <a href="/blog/ibr-certified-boiler-pipes-p11-p22-guide">IBR Certified Boiler Pipes: ASTM A335 P11 &amp; P22 Guide</a>
                            </h3>
                            <p class="text-sm text-slate-500 mb-4 line-clamp-3">Technical selection criteria for high-pressure alloy pipes under the Indian Boiler Regulations (IBR). Form III-A certification and high-temperature limits.</p>
                            <a href="/blog/ibr-certified-boiler-pipes-p11-p22-guide" class="mt-auto text-xs font-bold text-emerald-600 flex items-center gap-1.5 hover:gap-2.5 transition-all">
                                Read Guide <i data-lucide="arrow-right" class="w-3.5 h-3.5"></i>
                            </a>
                        </div>
                    </article>
                </div>
            </div>
        </section>"""
    html = re.sub(old_blog_grid_regex, new_blog_grid, html, flags=re.DOTALL)

    # 5. Fix duplicate alt text
    # Line 1040: Mr. Champalal Jain photo
    html = html.replace('alt="Stainless steel sheets stacked on pallets"\n                            class="rounded-2xl shadow-2xl relative z-10 w-full"',
                        'alt="Tatvam Overseas central warehouse stocking prime stainless steel sheets and coils in Mumbai"\n                            class="rounded-2xl shadow-2xl relative z-10 w-full"')
    # Line 1116: Material gallery image
    html = html.replace('<img src="assets/images/pool/sheets_blog.jpg" alt="Stainless steel sheets stacked on pallets"',
                        '<img src="assets/images/pool/sheets_blog.jpg" alt="Cold rolled stainless steel sheets stacked on wooden pallets ready for dispatch"')

    # 6. Update Footer CTA phrasing
    old_cta_phrase = 'Get competitive quotations with full MTC\n                    documentation from a stockist, dealer &amp; supplier of stainless steel and alloys in Mumbai.'
    new_cta_phrase = 'Get competitive quotations with full EN 10204 3.1 MTC\n                    documentation from an established stainless steel &amp; alloy exporter and stockist shipping worldwide from Mumbai, India.'
    if old_cta_phrase in html:
        html = html.replace(old_cta_phrase, new_cta_phrase)
    else:
        html = re.sub(r'Get competitive quotations with full MTC.*?in Mumbai\.',
                      'Get competitive quotations with full EN 10204 3.1 MTC documentation from an established stainless steel & alloy exporter and stockist shipping worldwide from Mumbai, India.',
                      html)

    # 7. Update Exporting to 15+ Countries section with links
    # Replace CIF / FOB / CFR Terms with link to /export-terms
    html = html.replace('<span class="text-sm font-semibold text-slate-700">CIF / FOB / CFR Terms</span>',
                        '<a href="/export-terms" class="text-sm font-semibold text-emerald-700 hover:underline">CIF / FOB / CFR Terms &rarr;</a>')

    # Update active export markets grid items to link to destination pages
    html = html.replace('<div class="text-white text-xs font-bold">UAE</div>',
                        '<a href="/export/uae" class="block text-white text-xs font-bold hover:text-emerald-400 transition-colors">UAE &rarr;</a>')
    html = html.replace('<div class="text-white text-xs font-bold">Saudi Arabia</div>',
                        '<a href="/export/saudi-arabia" class="block text-white text-xs font-bold hover:text-emerald-400 transition-colors">Saudi Arabia &rarr;</a>')
    html = html.replace('<div class="text-white text-xs font-bold">Kenya</div>',
                        '<a href="/export/kenya" class="block text-white text-xs font-bold hover:text-emerald-400 transition-colors">Kenya &rarr;</a>')
    html = html.replace('<div class="text-white text-xs font-bold">Nigeria</div>',
                        '<a href="/export/nigeria" class="block text-white text-xs font-bold hover:text-emerald-400 transition-colors">Nigeria &rarr;</a>')
    html = html.replace('<div class="text-white text-xs font-bold">Vietnam</div>',
                        '<a href="/export/vietnam" class="block text-white text-xs font-bold hover:text-emerald-400 transition-colors">Vietnam &rarr;</a>')

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("index.html updated successfully.")

if __name__ == "__main__":
    update_index()
