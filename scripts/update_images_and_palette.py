import os, re

def update_index_and_products():
    # 1. Update index.html
    with open("index.html", "r", encoding="utf-8") as f:
        idx = f.read()

    old_idx_circles = """                            <div class="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-circles-discs.webp (stainless steel circles / discs) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="disc" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Circles &amp; Discs</span>
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">Grades 202 / 304</span>
                            </div>"""

    new_idx_circles = """                            <div class="h-48 relative overflow-hidden bg-slate-100">
                                <img src="/assets/images/pool/ss-circles-discs.webp" alt="Stainless Steel Circles &amp; Discs in Mumbai" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="250">
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">Grades 202 / 304</span>
                            </div>"""

    old_idx_patta = """                            <div class="h-48 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-patta-patti.webp (stainless steel patta / patti / flat strips) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="align-justify" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Flat Strips &amp; Bars</span>
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">SS 202 &amp; 304</span>
                            </div>"""

    new_idx_patta = """                            <div class="h-48 relative overflow-hidden bg-slate-100">
                                <img src="/assets/images/pool/ss-patta-patti.webp" alt="Stainless Steel Patta, Patti &amp; Flat Strips in Mumbai" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" width="400" height="250">
                                <span class="absolute top-3 left-3 bg-slate-900/80 text-white text-[11px] font-bold px-2.5 py-1 rounded backdrop-blur">SS 202 &amp; 304</span>
                            </div>"""

    if old_idx_circles in idx:
        idx = idx.replace(old_idx_circles, new_idx_circles)
    if old_idx_patta in idx:
        idx = idx.replace(old_idx_patta, new_idx_patta)

    with open("index.html", "w", encoding="utf-8") as f:
        f.write(idx)
    print("Updated index.html")

    # 2. Update products/stainless-steel.html
    with open("products/stainless-steel.html", "r", encoding="utf-8") as f:
        ss_html = f.read()

    old_ss_circles = """                        <!-- Card: SS Circles & Discs -->
                        <div class="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
                            <div class="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-circles-discs.webp (stainless steel circles / discs) -->
                                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="disc" class="w-5 h-5"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Circles &amp; Discs</span>
                            </div>"""

    new_ss_circles = """                        <!-- Card: SS Circles & Discs -->
                        <div class="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
                            <img src="/assets/images/pool/ss-circles-discs.webp" alt="SS Circles &amp; Discs 202 304 Supplier Mumbai" width="400" height="200" loading="lazy" class="w-full h-40 object-cover">"""

    old_ss_patta = """                        <!-- Card: SS Patta / Patti -->
                        <div class="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
                            <div class="h-40 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-patta-patti.webp (stainless steel patta / patti / flat strips) -->
                                <div class="w-10 h-10 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="align-justify" class="w-5 h-5"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Flats &amp; Strips</span>
                            </div>"""

    new_ss_patta = """                        <!-- Card: SS Patta / Patti -->
                        <div class="border border-slate-200 rounded-xl overflow-hidden hover:shadow-lg transition-all flex flex-col">
                            <img src="/assets/images/pool/ss-patta-patti.webp" alt="SS Patta Patti Flat Strips 202 304 Mumbai" width="400" height="200" loading="lazy" class="w-full h-40 object-cover">"""

    if old_ss_circles in ss_html:
        ss_html = ss_html.replace(old_ss_circles, new_ss_circles)
    if old_ss_patta in ss_html:
        ss_html = ss_html.replace(old_ss_patta, new_ss_patta)

    with open("products/stainless-steel.html", "w", encoding="utf-8") as f:
        f.write(ss_html)
    print("Updated products/stainless-steel.html")

    # 3. Update products.html
    with open("products.html", "r", encoding="utf-8") as f:
        p_html = f.read()

    old_p_circles = """                            <div class="h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-circles-discs.webp (stainless steel circles / discs) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="disc" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Circles &amp; Discs</span>
                                <div class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur uppercase tracking-wider">SS 202 / 304</div>
                            </div>"""

    new_p_circles = """                            <div class="h-44 bg-slate-100 relative overflow-hidden">
                                <img src="/assets/images/pool/ss-circles-discs.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="400" height="250" alt="SS Circles &amp; Discs (202, 304)">
                                <div class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur uppercase tracking-wider">SS 202 / 304</div>
                            </div>"""

    old_p_patta = """                            <div class="h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-patta-patti.webp (stainless steel patta / patti / flat strips) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="align-justify" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">Flats &amp; Strips</span>
                                <div class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur uppercase tracking-wider">SS 202 / 304</div>
                            </div>"""

    new_p_patta = """                            <div class="h-44 bg-slate-100 relative overflow-hidden">
                                <img src="/assets/images/pool/ss-patta-patti.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="400" height="250" alt="SS Patta / Patti (SS 202 &amp; 304)">
                                <div class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur uppercase tracking-wider">SS 202 / 304</div>
                            </div>"""

    old_p_rings = """                        <div class="product-card bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group cursor-pointer overflow-hidden flex flex-col h-full relative" onclick="openProductModal('ss-circles')" data-id="ss-circles" data-department="Stainless Steel" data-category="Flat Products" data-search="ss circles &amp; rings flat products stainless steel astm a240 precision-cut stainless steel circles and forged rings for various industrial applications.">
                            <div class="h-44 bg-gradient-to-br from-slate-800 to-slate-900 flex flex-col items-center justify-center relative p-4 text-center">
                                <!-- TODO: Add image assets/images/pool/ss-circles-discs.webp (stainless steel circles / discs) -->
                                <div class="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 mb-2">
                                    <i data-lucide="disc" class="w-6 h-6"></i>
                                </div>
                                <span class="text-xs font-bold text-slate-200">SS Circles &amp; Rings</span>
                                <div class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur uppercase tracking-wider">Flat Products</div>
                            </div>"""

    new_p_rings = """                        <div class="product-card bg-white rounded-xl border border-slate-200 hover:border-emerald-500 hover:shadow-lg transition-all group cursor-pointer overflow-hidden flex flex-col h-full relative" onclick="openProductModal('ss-circles')" data-id="ss-circles" data-department="Stainless Steel" data-category="Flat Products" data-search="ss circles &amp; rings flat products stainless steel astm a240 precision-cut stainless steel circles and forged rings for various industrial applications.">
                            <div class="h-44 bg-slate-100 relative overflow-hidden">
                                <img src="/assets/images/pool/ss-circles-discs.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="400" height="250" alt="SS Circles &amp; Rings">
                                <div class="absolute top-3 left-3 bg-slate-900/90 text-white text-[10px] font-bold px-2 py-1 rounded backdrop-blur uppercase tracking-wider">Flat Products</div>
                            </div>"""

    if old_p_circles in p_html:
        p_html = p_html.replace(old_p_circles, new_p_circles)
    if old_p_patta in p_html:
        p_html = p_html.replace(old_p_patta, new_p_patta)
    if old_p_rings in p_html:
        p_html = p_html.replace(old_p_rings, new_p_rings)

    p_html = p_html.replace(
        '<img src="/assets/images/pool/rods.jpg" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="400" height="250" alt="SS 202 Flat Bar (Patti)">',
        '<img src="/assets/images/pool/ss-patta-patti.webp" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" decoding="async" width="400" height="250" alt="SS 202 Flat Bar (Patti)">'
    )

    with open("products.html", "w", encoding="utf-8") as f:
        f.write(p_html)
    print("Updated products.html")

update_index_and_products()
