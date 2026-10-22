import os
import glob
import re
import datetime
import xml.etree.ElementTree as ET

# List of all HTML files
all_html_files = sorted(glob.glob('*.html') + glob.glob('*/*.html'))

HEADER_TEMPLATE = '''        <div class="toi-top-bar">
            <div class="container mx-auto px-6 py-3 flex items-center justify-between gap-6">
                <!-- Brand: Logo + Name -->
                <a href="/" translate="no" class="flex items-center gap-3 group shrink-0" aria-label="Tatvam Overseas Inc">
                    <div class="bg-white rounded-md border border-slate-200 shadow-sm p-1 shrink-0 group-hover:shadow-md transition-shadow">
                        <img src="/assets/TATVAM LOGO.jpg" alt="TOI – Tatvam Overseas Inc Logo" class="h-10 w-auto object-contain block" translate="no" loading="eager" width="120" height="40">
                    </div>
                    <div class="leading-tight" translate="no">
                        <div class="text-[16px] font-black text-slate-900 tracking-widest leading-none">TATVAM OVERSEAS INC</div>
                        <div class="text-[9.5px] text-slate-400 tracking-[0.2em] uppercase mt-0.5 font-semibold">
                            MUMBAI &nbsp;&middot;&nbsp; EST. 1992 &nbsp;&middot;&nbsp; ISO 9001:2015
                        </div>
                    </div>
                </a>

                <!-- Desktop: Language + WhatsApp + GET QUOTE -->
                <div class="toi-desktop-cta items-center gap-0 shrink-0">
                    <div class="relative mr-4" id="header-lang-wrapper">
                        <button id="header-lang-btn" onclick="toggleHeaderTranslate(event)" type="button" class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-bold transition-all cursor-pointer" aria-label="Change Language" aria-expanded="false" aria-haspopup="true" translate="no">
                            <span id="header-active-flag" class="text-sm leading-none">🇮🇳</span>
                            <i data-lucide="chevron-down" class="w-3 h-3 shrink-0"></i>
                        </button>
                    </div>

                    <a href="https://wa.me/919930301181" target="_blank" rel="noopener noreferrer" class="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-600 font-bold text-sm tracking-wide transition-all group cursor-pointer shrink-0">
                        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>WhatsApp</span>
                    </a>

                    <a href="/contact" translate="no" class="flex items-center gap-2.5 pl-8 pr-7 py-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-[0.12em] uppercase transition-all shrink-0 cursor-pointer ml-px" style="clip-path: polygon(22px 0%, 100% 0%, 100% 100%, 0% 100%); letter-spacing:0.1em;">
                        GET QUOTE
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </a>
                </div>

                <!-- Mobile CTAs -->
                <div class="toi-mobile-cta items-center gap-2">
                    <a href="https://wa.me/919930301181" target="_blank" rel="noopener noreferrer" class="flex items-center gap-1.5 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                        <i data-lucide="message-circle" class="w-4 h-4"></i> WA
                    </a>
                    <a href="/contact" class="text-white font-bold text-sm bg-emerald-600 px-3.5 py-1.5 rounded-full">
                        Quote
                    </a>
                </div>
            </div>
        </div>

        <nav class="toi-nav-desktop" aria-label="Main Navigation">
            <div class="toi-nav-slab"></div>
            <div class="toi-nav-links" translate="no">
                <a href="/" class="toi-nav-link" translate="no">Home</a>
                <a href="/about" class="toi-nav-link" translate="no">Our Firm</a>
                <a href="/products" class="toi-nav-link" translate="no">Inventory</a>
                <a href="/blog" class="toi-nav-link" translate="no">Knowledge</a>
                <a href="/contact" class="toi-nav-link" translate="no">Contact</a>
                <span style="color:#334155; padding:0 14px 0 4px; display:flex; align-items:center; flex-shrink:0;" aria-hidden="true">
                    <svg width="9" height="9" viewBox="0 0 100 100" fill="currentColor"><polygon points="50,0 100,50 50,100 0,50"/></svg>
                </span>
            </div>
        </nav>

        <nav class="toi-mobile-nav" style="background:#0f172a; border-bottom:1px solid #334155; z-index:10; position:relative;" aria-label="Mobile Navigation">
            <div style="padding:10px 16px; display:flex; align-items:center;">
                <button id="mobile-menu-button" style="background:none; border:none; color:#fff; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:0.8rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;" aria-label="Open Menu" aria-expanded="false">
                    <i data-lucide="menu" style="width:20px;height:20px;"></i>
                    <span style="color:#94a3b8;">Menu</span>
                </button>
            </div>
        </nav>'''

FOOTER_TEMPLATE = '''        <!-- Newsletter Section -->
        <div class="bg-slate-950 border-b border-slate-800 py-10">
            <div class="container mx-auto px-6">
                <div class="flex flex-col lg:flex-row justify-between items-center gap-6">
                    <div class="text-center lg:text-left lg:w-1/2">
                        <h3 class="text-white font-bold text-xl mb-2 flex items-center justify-center lg:justify-start gap-2">
                            <i data-lucide="mail" class="w-5 h-5 text-emerald-500"></i>
                            Subscribe to Market Updates
                        </h3>
                        <p class="text-sm text-slate-500">Get weekly LME nickel rates, steel price trends, and new stock alerts delivered to your inbox.</p>
                    </div>
                    <form id="newsletter-form" class="flex flex-col sm:flex-row w-full lg:w-1/2 gap-3">
                        <input type="hidden" name="access_key" value="e65ddd09-27a6-4380-aef9-4f4465c4449f">
                        <input type="hidden" name="subject" value="Newsletter Subscription - Tatvam Overseas Inc">
                        <input type="checkbox" name="botcheck" class="hidden" style="display:none;">
                        <input type="email" name="email" placeholder="Enter your work email address" required class="flex-1 bg-slate-800 text-white px-5 py-3 rounded-lg outline-none border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 text-sm transition-all" aria-label="Email address for newsletter">
                        <button type="submit" class="bg-emerald-600 hover:bg-emerald-500 text-white px-8 py-3 rounded-lg font-bold text-sm transition-all shadow-lg hover:shadow-xl whitespace-nowrap">
                            Subscribe Now
                        </button>
                    </form>
                </div>
            </div>
        </div>

        <!-- Main Footer -->
        <div class="container mx-auto px-6 py-16">
            <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-10 text-sm">
                <!-- Company Info -->
                <div class="space-y-6">
                    <a href="/" class="inline-block group">
                        <div class="flex flex-col leading-none">
                            <span class="text-xl font-black text-white tracking-wider group-hover:text-emerald-400 transition-colors">TATVAM</span>
                            <span class="text-[10px] font-extrabold text-emerald-400 tracking-[0.24em] uppercase mt-1">OVERSEAS INC</span>
                        </div>
                    </a>
                    <p class="leading-relaxed text-xs text-slate-400">
                        ISO 9001:2015 certified stockist and exporter of stainless steel, carbon steel, and high nickel alloys. Serving global industries since 1992 with complete traceability and MTC certification.
                    </p>
                    <div class="pt-2 text-[11px] text-slate-500 space-y-1">
                        <div><strong class="text-slate-400">GSTIN:</strong> 27AHIPJ6958M1ZK</div>
                        <div><strong class="text-slate-400">IEC:</strong> AHIPJ6958M</div>
                        <div><strong class="text-slate-400">UDYAM:</strong> UDYAM-MH-19-0338145 (MSME)</div>
                    </div>
                    <div class="pt-3 border-t border-slate-800">
                        <span class="text-slate-400 font-bold text-[11px] uppercase tracking-wider block mb-2">Find us on</span>
                        <div class="flex flex-wrap items-center gap-2 text-xs">
                            <a href="https://www.indiamart.com/tatvam-overseas-inc/" target="_blank" rel="noopener" class="text-emerald-400 hover:text-emerald-300 font-semibold transition-colors">IndiaMART</a>
                        </div>
                    </div>
                </div>

                <!-- Products -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-emerald-500 pl-3">Top Products</h4>
                    <ul class="space-y-3">
                        <li><a href="/products" class="hover:text-emerald-400 transition-colors block">SS 304 / 304L Sheets</a></li>
                        <li><a href="/products" class="hover:text-emerald-400 transition-colors block">SS 316 / 316L Marine Plates</a></li>
                        <li><a href="/products/decorative-stainless-steel-sheets-mumbai" class="hover:text-emerald-400 transition-colors block">Decorative SS Sheets</a></li>
                        <li><a href="/products" class="hover:text-emerald-400 transition-colors block">Alloy Steel P11/P22 Pipes</a></li>
                        <li><a href="/products" class="hover:text-emerald-400 transition-colors block">Inconel 625 Seamless Tubes</a></li>
                        <li><a href="/products" class="hover:text-emerald-400 transition-colors block">Duplex 2205 Flanges</a></li>
                        <li>
                            <a href="/assets/TatvamOverseasInc_Catalog_2025.pdf" target="_blank" class="text-emerald-500 font-bold hover:text-emerald-400 flex items-center gap-2 mt-4">
                                <i data-lucide="download" class="w-3 h-3"></i> Product Catalogue
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Company -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-emerald-500 pl-3">Our Firm</h4>
                    <ul class="space-y-3">
                        <li><a href="/about" class="hover:text-emerald-400 transition-colors block">About Tatvam Overseas Inc</a></li>
                        <li><a href="/products" class="hover:text-emerald-400 transition-colors block">Complete Inventory</a></li>
                        <li><a href="/mtc" class="hover:text-emerald-400 transition-colors block">Quality &amp; MTC</a></li>
                        <li><a href="/blog" class="hover:text-emerald-400 transition-colors block">Technical Knowledge Hub</a></li>
                        <li><a href="/contact" class="hover:text-emerald-400 transition-colors block">Contact &amp; Locations</a></li>
                        <li><a href="/privacypolicy" class="hover:text-emerald-400 transition-colors block">Privacy Policy</a></li>
                        <li><a href="/terms" class="hover:text-emerald-400 transition-colors block">Terms &amp; Conditions</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-emerald-500 pl-3">Mumbai Offices &amp; Contact</h4>
                    <ul class="space-y-4">
                        <li class="flex items-start gap-3">
                            <i data-lucide="map-pin" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"></i>
                            <div class="text-xs leading-relaxed">
                                <strong class="text-slate-300 block">Trading Office:</strong>
                                39/41, Kamal Building, 1st Kumbharwada Lane, Near Round Temple, Bhandari Street, Kalbadevi, Mumbai 400004
                            </div>
                        </li>
                        <li class="flex items-start gap-3">
                            <i data-lucide="building" class="w-5 h-5 text-slate-500 flex-shrink-0 mt-0.5"></i>
                            <div class="text-xs leading-relaxed text-slate-400">
                                <strong class="text-slate-300 block">Registered Office:</strong>
                                61, Jamnadas Building, Shop 5 &amp; 6, 10th Khetwadi Back Road, Girgaon, Mumbai 400004
                            </div>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="phone" class="w-5 h-5 text-emerald-500 flex-shrink-0"></i>
                            <a href="tel:+919930301181" class="text-xs font-mono text-white hover:text-emerald-400 transition-colors">+91 99303 01181</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="mail" class="w-5 h-5 text-emerald-500 flex-shrink-0"></i>
                            <a href="mailto:sales@tatvamoverseasinc.com" class="text-xs hover:text-emerald-400 transition-colors">sales@tatvamoverseasinc.com</a>
                        </li>
                        <li class="pt-2">
                            <a href="/contact" class="block w-full py-3 border-2 border-emerald-600 text-emerald-400 text-center font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg">
                                Request Quote
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Copyright -->
        <div class="bg-black py-5 border-t border-slate-800">
            <div class="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-slate-600 uppercase tracking-wider">
                <p>&copy; 2026 Tatvam Overseas Inc. All Rights Reserved.</p>
                <div class="flex items-center gap-6">
                    <a href="/privacypolicy" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="/terms" class="hover:text-white transition-colors">Terms &amp; Conditions</a>
                    <a href="/sitemap.xml" class="hover:text-white transition-colors">Sitemap</a>
                    <a href="https://wa.me/919930301181" target="_blank" rel="noopener noreferrer" title="Chat on WhatsApp" class="hover:text-white transition-colors flex items-center gap-1"><i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp</a>
                </div>
            </div>
        </div>'''

FAVICON_BLOCK = '''    <link rel="icon" href="/favicon.ico" sizes="48x48">
    <link rel="icon" href="/favicon-48x48.png" type="image/png" sizes="48x48">
    <link rel="apple-touch-icon" href="/apple-touch-icon.png">'''

def fix_html_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    # 1. Favicon replacement
    # Remove any existing inline data-URI SVG favicon or old icon links
    content = re.sub(r'<link[^>]*rel=[\"\']icon[\"\'][^>]*href=[\"\']data:image/svg\+xml[^\"\']*[\"\'][^>]*>\s*', '', content)
    content = re.sub(r'<link[^>]*href=[\"\']data:image/svg\+xml[^\"\']*[\"\'][^>]*rel=[\"\']icon[\"\'][^>]*>\s*', '', content)
    # Check if real favicons already present
    if '/favicon.ico' not in content:
        # Insert after <meta charset="UTF-8"> or after viewport
        content = re.sub(r'(<meta name=[\"\']viewport[\"\'][^>]*>)', r'\1\n' + FAVICON_BLOCK, content, count=1)

    # 2. Lucide script pin
    content = re.sub(
        r'<script[^>]*src=[\"\']https://unpkg\.com/lucide(@latest)?[\"\'][^>]*></script>',
        '<script defer src="https://unpkg.com/lucide@1.61.0/dist/umd/lucide.min.js"></script>',
        content
    )

    # 3. Google Fonts display=swap and weight normalization
    content = re.sub(
        r'https://fonts\.googleapis\.com/css2\?family=Inter:wght@[0-9;]+(&family=Montserrat:wght@[0-9;]+)?(&display=swap)?',
        'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
        content
    )

    # 4. Canonical & og:url clean form
    clean_path = filepath.replace('.html', '')
    if clean_path == 'index':
        clean_url = 'https://www.tatvamoverseasinc.com/'
    else:
        clean_url = f'https://www.tatvamoverseasinc.com/{clean_path}'

    # Replace canonical href
    content = re.sub(r'<link rel=[\"\']canonical[\"\'] href=[\"\'][^\"\']+[\"\']\s*/?>',
                     f'<link rel="canonical" href="{clean_url}">', content)

    # Replace og:url content
    content = re.sub(r'<meta property=[\"\']og:url[\"\'] content=[\"\'][^\"\']+[\"\']\s*/?>',
                     f'<meta property="og:url" content="{clean_url}">', content)

    # 5. Fix titles & descriptions on specific files
    if filepath == 'index.html':
        content = re.sub(r'<title>.*?</title>',
                         '<title>Stainless Steel &amp; Nickel Alloy Stockist | Tatvam Overseas</title>', content, flags=re.DOTALL)
    elif filepath == 'products.html':
        content = re.sub(r'<title>.*?</title>',
                         '<title>Stainless Steel &amp; Alloy Products Stock | Tatvam Overseas</title>', content, flags=re.DOTALL)
    elif filepath == 'blog/ss-202-vs-ss-304-difference-uses-which-to-buy.html':
        content = re.sub(r'<title>.*?</title>',
                         '<title>SS 202 vs SS 304: Differences &amp; Uses | Tatvam Overseas</title>', content, flags=re.DOTALL)
    elif filepath == 'blog/stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror.html':
        content = re.sub(r'<title>.*?</title>',
                         '<title>SS Sheet Finishes: 2B, BA, No.4, 8K | Tatvam Overseas</title>', content, flags=re.DOTALL)
        content = re.sub(r'<meta name=[\"\']description[\"\'] content=[\"\'].*?[\"\']',
                         '<meta name="description" content="Understand stainless steel sheet finishes from 2B and BA to No.4 and 8K mirror. Compare production, reflectivity, fabrication suitability, and selection."', content)
    elif filepath == 'about.html':
        content = re.sub(r'<meta name=[\"\']description[\"\'] content=[\"\'].*?[\"\']',
                         '<meta name="description" content="Stockist, dealer &amp; supplier of stainless steel and alloys in Mumbai since 1992. ISO 9001:2015 certified supplier of SS 304, 316 &amp; nickel alloys for export."', content)
    elif filepath == 'blog.html':
        content = re.sub(r'<meta name=[\"\']description[\"\'] content=[\"\'].*?[\"\']',
                         '<meta name="description" content="Technical steel guides, grade comparisons &amp; MTC certification insights from Tatvam Overseas Inc, Mumbai stockist of stainless steel and alloy products."', content)

    # 6. Missing og:image / twitter:image
    if filepath == 'mtc.html':
        content = re.sub(
            r'<meta property=[\"\']og:image[\"\'] content=[\"\'][^\"\']+[\"\']>',
            '<meta property="og:image" content="https://www.tatvamoverseasinc.com/assets/images/pool/lab.webp">\n    <meta name="twitter:image" content="https://www.tatvamoverseasinc.com/assets/images/pool/lab.webp">',
            content
        )
    elif filepath in ['calculator.html', 'privacypolicy.html', 'terms.html']:
        if 'property="og:image"' not in content:
            img_tags = '''    <meta property="og:image" content="https://www.tatvamoverseasinc.com/assets/images/tatvamoverseasinc-warehouse-stock.jpg">
    <meta name="twitter:image" content="https://www.tatvamoverseasinc.com/assets/images/tatvamoverseasinc-warehouse-stock.jpg">'''
            content = re.sub(r'(<meta property=[\"\']og:title[\"\'][^>]*>)', r'\1\n' + img_tags, content, count=1)

    # 7. Pre-render Header & Footer in raw HTML (for all except 404.html / admin.html if header exists)
    if '<header id="site-header"' in content:
        # Match <header id="site-header"[^>]*>.*?</header>
        content = re.sub(
            r'(<header id=[\"\']site-header[\"\'][^>]*>)(.*?)(</header>)',
            r'\1\n' + HEADER_TEMPLATE + r'\n\3',
            content,
            flags=re.DOTALL
        )

    if '<footer id="site-footer"' in content:
        content = re.sub(
            r'(<footer id=[\"\']site-footer[\"\'][^>]*>)(.*?)(</footer>)',
            r'\1\n' + FOOTER_TEMPLATE + r'\n\3',
            content,
            flags=re.DOTALL
        )

    # 8. Clean Internal Links:
    # index.html -> /
    content = re.sub(r'href=[\"\'](?:../)?index\.html[\"\']', 'href="/"', content)
    content = re.sub(r'href=[\"\']/index\.html[\"\']', 'href="/"', content)

    # Other root pages
    for page in ['about', 'products', 'blog', 'contact', 'mtc', 'calculator', 'privacypolicy', 'terms']:
        content = re.sub(rf'href=[\"\'](?:../)?{page}\.html[\"\']', f'href="/{page}"', content)
        content = re.sub(rf'href=[\"\']/{page}\.html[\"\']', f'href="/{page}"', content)

    # Product subpages
    content = re.sub(r'href=[\"\'](?:\.\./)?products/([a-zA-Z0-9\-]+)\.html[\"\']', r'href="/products/\1"', content)
    # If inside /products/ directory, relative link like href="decorative-stainless-steel-sheets-mumbai.html"
    if filepath.startswith('products/'):
        content = re.sub(r'href=[\"\']([a-zA-Z0-9\-]+)\.html[\"\']', r'href="/products/\1"', content)

    # Blog subpages
    content = re.sub(r'href=[\"\'](?:\.\./)?blog/([a-zA-Z0-9\-]+)\.html[\"\']', r'href="/blog/\1"', content)
    if filepath.startswith('blog/'):
        content = re.sub(r'href=[\"\']([a-zA-Z0-9\-]+)\.html[\"\']', r'href="/blog/\1"', content)

    # 9. Clean JSON-LD URLs (strip .html, replace index.html with /)
    def clean_json_url(match):
        u = match.group(1)
        u = u.replace('/index.html', '/')
        u = re.sub(r'\.html$', '', u)
        return f'"{u}"'

    content = re.sub(r'\"(https://(?:www\.)?tatvamoverseasinc\.com/[^\"]*)\"', clean_json_url, content)

    # 10. Performance: Hero/LCP images should be eager + fetchpriority="high", not lazy
    # Find the main hero section image if any
    if filepath == 'index.html':
        content = re.sub(
            r'(<img[^>]*src=[\"\']assets/images/tatvamoverseasinc-warehouse-stock\.jpg[\"\'][^>]*)(loading=[\"\']lazy[\"\'])',
            r'\1loading="eager" fetchpriority="high"',
            content
        )
    elif filepath == 'about.html':
        content = re.sub(
            r'(<img[^>]*src=[\"\']assets/images/tatvamoverseasinc-warehouse\.jpg[\"\'][^>]*)(loading=[\"\']lazy[\"\'])',
            r'\1loading="eager" fetchpriority="high"',
            content
        )
    elif filepath.startswith('blog/'):
        # In blog posts, hero image should be eager
        content = re.sub(
            r'(<img[^>]*src=[\"\']\.\./assets/images/pool/[^\"]+[\"\'][^>]*)(loading=[\"\']lazy[\"\'])',
            r'\1loading="eager" fetchpriority="high"',
            content,
            count=1
        )

    # Write modified content
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

print(f'Processed {len(all_html_files)} HTML files.')
