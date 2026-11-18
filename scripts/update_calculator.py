#!/usr/bin/env python3
"""
Task 4: Optimize /calculator for "ss sheet weight calculator"
- Title: SS Sheet Weight Calculator: 304, 202, 316 | Tatvam (51 chars <= 60)
- Meta description: SS sheet weight calculator. Calculate weight per sheet for SS 304, 202, 316, pipes and bars with exact densities. Free tool by Tatvam Overseas Mumbai. (152 chars <= 155)
- H1: SS Sheet Weight Calculator: Stainless Steel Sheets & Plates
- Static crawlable weight formula and densities
- Weight-per-sheet reference table (4x8 ft, 5x10 ft)
- Internal links to 304, 202, decorative sheets, stainless steel hub, and 202 vs 304 blog post
- Keep interactive calculator fully functional
"""

import re

def update_calculator():
    with open("calculator.html", "r", encoding="utf-8") as f:
        html = f.read()

    # Title
    html = re.sub(r'<title>.*?</title>',
                  '<title>SS Sheet Weight Calculator: 304, 202, 316 | Tatvam</title>',
                  html)

    # Meta Description
    new_desc = 'SS sheet weight calculator. Calculate weight per sheet for SS 304, 202, 316, pipes and bars with exact densities. Free tool by Tatvam Overseas Mumbai.'
    html = re.sub(r'<meta\s+name=[\"\']description[\"\']\s+content=[\"\'].*?[\"\']',
                  f'<meta name="description" content="{new_desc}">',
                  html)

    # OG & Twitter
    html = re.sub(r'<meta\s+property=[\"\']og:title[\"\']\s+content=[\"\'].*?[\"\']',
                  '<meta property="og:title" content="SS Sheet Weight Calculator: 304, 202, 316 | Tatvam">',
                  html)
    html = re.sub(r'<meta\s+property=[\"\']og:description[\"\']\s+content=[\"\'].*?[\"\']',
                  f'<meta property="og:description" content="{new_desc}">',
                  html)
    html = re.sub(r'<meta\s+name=[\"\']twitter:title[\"\']\s+content=[\"\'].*?[\"\']',
                  '<meta name="twitter:title" content="SS Sheet Weight Calculator: 304, 202, 316 | Tatvam">',
                  html)
    html = re.sub(r'<meta\s+name=[\"\']twitter:description[\"\']\s+content=[\"\'].*?[\"\']',
                  f'<meta name="twitter:description" content="{new_desc}">',
                  html)

    # Hero H1 & Intro
    old_hero = r'<h1 class="text-3xl md:text-5xl font-black leading-tight">Steel Weight <span class="text-emerald-400">Calculator</span></h1>\s*<p class="text-slate-400 mt-3 max-w-xl text-base">.*?</p>'
    new_hero = """<h1 class="text-3xl md:text-5xl font-black leading-tight">SS Sheet Weight <span class="text-emerald-400">Calculator</span></h1>
                    <p class="text-slate-400 mt-3 max-w-xl text-base">Calculate theoretical weight per sheet for SS 304, SS 202, SS 316, pipes, coils, and round bars using certified material densities. Instant WhatsApp quote for Mumbai and export orders.</p>"""
    html = re.sub(old_hero, new_hero, html, flags=re.DOTALL)

    # Static Reference Content before </main>
    static_content = """        <!-- Static Crawlable Guide & Weight Reference Tables -->
        <section class="mt-16 pt-12 border-t border-slate-200">
            <div class="max-w-4xl mx-auto space-y-12">
                
                <!-- Formula Card -->
                <div class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
                    <h2 class="text-2xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <i data-lucide="calculator" class="w-6 h-6 text-emerald-600"></i> How to Calculate Stainless Steel Sheet Weight
                    </h2>
                    <p class="text-slate-600 text-sm leading-relaxed mb-6">
                        To calculate the theoretical weight of any stainless steel sheet, plate, or strip manually, multiply the length, width, thickness (all in millimeters), and the material density (in g/cm&sup3;), then divide by 1,000,000:
                    </p>
                    
                    <div class="bg-slate-900 text-emerald-400 font-mono text-sm md:text-base p-5 rounded-xl border border-slate-800 text-center shadow-inner">
                        Weight (kg) = Length (mm) &times; Width (mm) &times; Thickness (mm) &times; Density (g/cm&sup3;) &divide; 1,000,000
                    </div>

                    <div class="mt-6">
                        <h3 class="text-base font-bold text-slate-900 mb-3">Certified Density Values for Steel &amp; High Alloys</h3>
                        <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">SS 304 / 304L</span>
                                <strong class="text-slate-900 text-sm font-mono">7.93 g/cm&sup3;</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">SS 202 (Jindal J1/J4)</span>
                                <strong class="text-slate-900 text-sm font-mono">7.80 g/cm&sup3;</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">SS 316 / 316L</span>
                                <strong class="text-slate-900 text-sm font-mono">7.98 g/cm&sup3;</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">Duplex 2205</span>
                                <strong class="text-slate-900 text-sm font-mono">7.80 g/cm&sup3;</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">Carbon Steel (A106)</span>
                                <strong class="text-slate-900 text-sm font-mono">7.85 g/cm&sup3;</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">Inconel 625</span>
                                <strong class="text-slate-900 text-sm font-mono">8.44 g/cm&sup3;</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">Inconel 600</span>
                                <strong class="text-slate-900 text-sm font-mono">8.47 g/cm&sup3;</strong>
                            </div>
                            <div class="p-3 bg-slate-50 rounded-lg border border-slate-100">
                                <span class="text-slate-500 block">Monel 400</span>
                                <strong class="text-slate-900 text-sm font-mono">8.80 g/cm&sup3;</strong>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Standard Weight Reference Table -->
                <div class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
                    <h2 class="text-2xl font-bold text-slate-900 mb-2 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <i data-lucide="table" class="w-6 h-6 text-emerald-600"></i> Standard Stainless Steel Sheet Weight Chart
                    </h2>
                    <p class="text-xs text-slate-500 mb-6">
                        Theoretical weight per sheet in kilograms for common industrial sizes: 4 ft &times; 8 ft (1219 &times; 2438 mm) and 5 ft &times; 10 ft (1500 &times; 3000 mm).
                    </p>
                    <div class="overflow-x-auto">
                        <table class="w-full text-left text-xs md:text-sm border-collapse border border-slate-200 rounded-lg overflow-hidden">
                            <thead class="bg-slate-100 text-slate-800 uppercase font-bold text-[11px]">
                                <tr>
                                    <th class="py-3 px-3 border border-slate-200">Thickness</th>
                                    <th class="py-3 px-3 border border-slate-200">Approx Gauge</th>
                                    <th class="py-3 px-3 border border-slate-200">SS 304: 4 &times; 8 ft</th>
                                    <th class="py-3 px-3 border border-slate-200">SS 202: 4 &times; 8 ft</th>
                                    <th class="py-3 px-3 border border-slate-200">SS 304: 5 &times; 10 ft</th>
                                    <th class="py-3 px-3 border border-slate-200">SS 316L: 4 &times; 8 ft</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-slate-100 font-mono text-xs">
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">0.50 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">26 Gauge</td><td class="py-2.5 px-3">~11.78 kg</td><td class="py-2.5 px-3">~11.59 kg</td><td class="py-2.5 px-3">~17.84 kg</td><td class="py-2.5 px-3">~11.86 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">0.80 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">22 Gauge</td><td class="py-2.5 px-3">~18.85 kg</td><td class="py-2.5 px-3">~18.54 kg</td><td class="py-2.5 px-3">~28.55 kg</td><td class="py-2.5 px-3">~18.97 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">1.00 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">20 Gauge</td><td class="py-2.5 px-3">~23.57 kg</td><td class="py-2.5 px-3">~23.18 kg</td><td class="py-2.5 px-3">~35.69 kg</td><td class="py-2.5 px-3">~23.72 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">1.20 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">18 Gauge</td><td class="py-2.5 px-3">~28.28 kg</td><td class="py-2.5 px-3">~27.82 kg</td><td class="py-2.5 px-3">~42.82 kg</td><td class="py-2.5 px-3">~28.46 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">1.50 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">16 Gauge</td><td class="py-2.5 px-3">~35.35 kg</td><td class="py-2.5 px-3">~34.77 kg</td><td class="py-2.5 px-3">~53.53 kg</td><td class="py-2.5 px-3">~35.58 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">2.00 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">14 Gauge</td><td class="py-2.5 px-3">~47.14 kg</td><td class="py-2.5 px-3">~46.36 kg</td><td class="py-2.5 px-3">~71.37 kg</td><td class="py-2.5 px-3">~47.44 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">2.50 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">12 Gauge</td><td class="py-2.5 px-3">~58.92 kg</td><td class="py-2.5 px-3">~57.95 kg</td><td class="py-2.5 px-3">~89.21 kg</td><td class="py-2.5 px-3">~59.30 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">3.00 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">11 Gauge</td><td class="py-2.5 px-3">~70.71 kg</td><td class="py-2.5 px-3">~69.54 kg</td><td class="py-2.5 px-3">~107.06 kg</td><td class="py-2.5 px-3">~71.16 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">4.00 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">8 Gauge</td><td class="py-2.5 px-3">~94.28 kg</td><td class="py-2.5 px-3">~92.72 kg</td><td class="py-2.5 px-3">~142.74 kg</td><td class="py-2.5 px-3">~94.88 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">5.00 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">3/16 inch</td><td class="py-2.5 px-3">~117.85 kg</td><td class="py-2.5 px-3">~115.90 kg</td><td class="py-2.5 px-3">~178.43 kg</td><td class="py-2.5 px-3">~118.60 kg</td></tr>
                                <tr class="hover:bg-slate-50"><td class="py-2.5 px-3 font-semibold text-slate-900 font-sans">6.00 mm</td><td class="py-2.5 px-3 text-slate-500 font-sans">1/4 inch</td><td class="py-2.5 px-3">~141.42 kg</td><td class="py-2.5 px-3">~139.08 kg</td><td class="py-2.5 px-3">~214.11 kg</td><td class="py-2.5 px-3">~142.32 kg</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>

                <!-- Explore Stainless Steel Product Range -->
                <div class="bg-white rounded-2xl p-8 border border-slate-200/80 shadow-sm">
                    <h2 class="text-xl font-bold text-slate-900 mb-4 pb-2 border-b border-slate-100 flex items-center gap-2">
                        <i data-lucide="package" class="w-5 h-5 text-emerald-600"></i> Explore Prime Stainless Steel Stock &amp; Pricing
                    </h2>
                    <p class="text-slate-600 text-sm leading-relaxed mb-6">
                        Tatvam Overseas Inc maintains extensive inventory across all primary austenitic and decorative grades in Mumbai. Browse our core product catalogs or connect with our sales team for daily rates:
                    </p>
                    <div class="grid sm:grid-cols-2 md:grid-cols-3 gap-4 text-xs font-bold">
                        <a href="/products/ss-304-sheets-plates-supplier-mumbai" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">SS 304 Sheets &amp; Plates</span>
                            <span class="text-slate-500 font-normal">0.5 mm - 50 mm, 2B, No.4, 8K &rarr;</span>
                        </a>
                        <a href="/products/ss-202-sheets-jindal-j1-j4-supplier-mumbai" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">SS 202 Sheets (Jindal J1/J4)</span>
                            <span class="text-slate-500 font-normal">Economical 200 series for interior &rarr;</span>
                        </a>
                        <a href="/products/decorative-stainless-steel-sheets-mumbai" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">Designer SS Sheets</span>
                            <span class="text-slate-500 font-normal">PVD Gold, Rose Gold, Black, Mirror &rarr;</span>
                        </a>
                        <a href="/products/stainless-steel" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">Stainless Steel Hub</span>
                            <span class="text-slate-500 font-normal">Complete portfolio of sheets, pipes &rarr;</span>
                        </a>
                        <a href="/blog/ss-202-vs-ss-304-difference-uses-which-to-buy" class="p-4 rounded-xl bg-slate-50 hover:bg-emerald-50 hover:text-emerald-700 transition-colors border border-slate-200 flex flex-col justify-between">
                            <span class="text-slate-900 text-sm mb-1">SS 202 vs SS 304 Guide</span>
                            <span class="text-slate-500 font-normal">Compare metallurgy, uses &amp; costs &rarr;</span>
                        </a>
                        <a href="/contact" class="p-4 rounded-xl bg-emerald-600 text-white hover:bg-emerald-500 transition-colors shadow flex flex-col justify-between">
                            <span class="text-white text-sm mb-1">Request Price Quotation</span>
                            <span class="text-emerald-100 font-normal">Quote within 2-4 working hours &rarr;</span>
                        </a>
                    </div>
                </div>

            </div>
        </section>
    </main>"""

    html = html.replace('    </main>', static_content)

    with open("calculator.html", "w", encoding="utf-8") as f:
        f.write(html)
    print("calculator.html updated successfully.")

if __name__ == "__main__":
    update_calculator()
