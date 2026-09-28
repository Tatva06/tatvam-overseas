// ============================================================================
// TATVAM OVERSEAS INC - COMPONENTS (Shared Header + Footer)
// Inject these into every page on DOMContentLoaded
// ============================================================================

const SITE_CONFIG = {
    phone: '+919082834775',
    phoneDisplay: '+91 90828 34775',
    email: 'sales@tatvamoverseasinc.com',
    exportEmail: 'export@tatvamoverseasinc.com',
    accountsEmail: 'accounts@tatvamoverseasinc.com',
    whatsapp: 'https://wa.me/919082834775',
    address: '39/41, Kamal Building, 1st Kumbharwada Lane, Near Round Temple, Kalbadevi, Mumbai - 400004',
    mapsUrl: 'https://maps.google.com/?q=39+41+Kamal+Building+Kumbharwada+Lane+Mumbai+400004',
    catalogUrl: 'assets/TatvamOverseasInc_Catalog_2025.pdf',
    // Social media: add URLs here when pages are created
    // linkedin: 'https://www.linkedin.com/company/YOUR-PAGE',
    // facebook: 'https://www.facebook.com/YOUR-PAGE',
    // instagram: 'https://www.instagram.com/YOUR-PAGE',
};

// ============================================================================
// GLOBAL EXPORT LANGUAGES CONFIG
// ============================================================================
const SUPPORTED_LANGUAGES = [
    { code: 'en', flag: '🇬🇧', name: 'English', native: 'English', region: 'Global' },
    { code: 'ar', flag: '🇦🇪', name: 'Arabic', native: 'العربية', region: 'Middle East' },
    { code: 'de', flag: '🇩🇪', name: 'German', native: 'Deutsch', region: 'Germany / Europe' },
    { code: 'fr', flag: '🇫🇷', name: 'French', native: 'Français', region: 'France / Africa' },
    { code: 'es', flag: '🇪🇸', name: 'Spanish', native: 'Español', region: 'Spain / Americas' },
    { code: 'it', flag: '🇮🇹', name: 'Italian', native: 'Italiano', region: 'Italy / Europe' },
    { code: 'ru', flag: '🇷🇺', name: 'Russian', native: 'Русский', region: 'CIS / Eurasia' },
    { code: 'zh-CN', flag: '🇨🇳', name: 'Chinese', native: '简体中文', region: 'Asia Pacific' },
    { code: 'ja', flag: '🇯🇵', name: 'Japanese', native: '日本語', region: 'East Asia' },
    { code: 'ko', flag: '🇰🇷', name: 'Korean', native: '한국어', region: 'East Asia' },
    { code: 'tr', flag: '🇹🇷', name: 'Turkish', native: 'Türkçe', region: 'Turkey / ME' },
    { code: 'pt', flag: '🇧🇷', name: 'Portuguese', native: 'Português', region: 'Americas / EU' }
];

function getSavedLanguage() {
    const match = document.cookie.match(/googtrans=\/en\/([a-zA-Z\-]+)/);
    if (match && match[1]) {
        const found = SUPPORTED_LANGUAGES.find(l => l.code.toLowerCase() === match[1].toLowerCase());
        if (found) return found;
    }
    const saved = localStorage.getItem('toi_user_lang');
    if (saved) {
        const found = SUPPORTED_LANGUAGES.find(l => l.code === saved);
        if (found) return found;
    }
    return SUPPORTED_LANGUAGES[0];
}

function initHiddenGoogleTranslate() {
    if (window._googleTranslateLoaded) return;
    window._googleTranslateLoaded = true;

    // Suppress Google Translate intrusive banners and body offset
    if (!document.getElementById('toi-translate-styles')) {
        const style = document.createElement('style');
        style.id = 'toi-translate-styles';
        style.textContent = `
            .goog-te-banner-frame,
            iframe.goog-te-banner-frame,
            .goog-te-banner,
            .skiptranslate.goog-te-banner-frame,
            iframe.skiptranslate,
            body > .skiptranslate,
            #goog-gt-tt,
            .goog-te-balloon-frame {
                display: none !important;
                visibility: hidden !important;
                opacity: 0 !important;
                height: 0 !important;
                width: 0 !important;
                position: absolute !important;
                left: -9999px !important;
            }
            html.translated-ltr body,
            html.translated-rtl body,
            body {
                top: 0px !important;
                position: static !important;
                margin-top: 0px !important;
            }
            .goog-tooltip, .goog-tooltip:hover {
                display: none !important;
            }
            .goog-text-highlight {
                background-color: transparent !important;
                box-shadow: none !important;
            }
            font {
                background-color: transparent !important;
                box-shadow: none !important;
            }
            /* Clean Guaranteed Navigation Spacing */
            .toi-nav-links {
                display: flex !important;
                align-items: center !important;
                gap: 2rem !important; /* 32px separation */
            }
            .toi-nav-link {
                color: #cbd5e1 !important;
                font-size: 0.875rem !important;
                font-weight: 500 !important;
                padding-bottom: 0.25rem !important;
                border-bottom: 2px solid transparent !important;
                transition: color 0.2s, border-color 0.2s !important;
                text-decoration: none !important;
                white-space: nowrap !important;
            }
            .toi-nav-link:hover {
                color: #ffffff !important;
                border-bottom-color: rgba(16, 185, 129, 0.6) !important;
            }
            .toi-nav-link.active {
                color: #ffffff !important;
                font-weight: 700 !important;
                border-bottom-color: #10b981 !important;
            }
            .toi-nav-actions {
                display: flex !important;
                align-items: center !important;
                gap: 1.25rem !important;
            }
            @media (max-width: 1024px) {
                .toi-nav-links {
                    gap: 1.25rem !important;
                }
            }
        `;
        document.head.appendChild(style);

        // Continuous observer to guarantee body top is never shifted by Google
        try {
            const obs = new MutationObserver(() => {
                if (document.body && document.body.style.top && document.body.style.top !== '0px') {
                    document.body.style.top = '0px';
                }
                const banner = document.querySelector('.goog-te-banner-frame, iframe.skiptranslate');
                if (banner) banner.style.display = 'none';
            });
            obs.observe(document.documentElement, { attributes: true, subtree: true, attributeFilter: ['style', 'class'] });
        } catch (e) {}
    }

    // Hidden container for Google's native select element
    if (!document.getElementById('google_translate_hidden_holder')) {
        const div = document.createElement('div');
        div.id = 'google_translate_hidden_holder';
        div.style.cssText = 'position:absolute;left:-9999px;top:-9999px;width:0;height:0;overflow:hidden;visibility:hidden;';
        div.innerHTML = '<div id="google_translate_element_hidden"></div>';
        document.body.appendChild(div);
    }

    window.googleTranslateElementInitUniversal = function() {
        new google.translate.TranslateElement(
            { pageLanguage: 'en', autoDisplay: false },
            'google_translate_element_hidden'
        );
    };

    const s = document.createElement('script');
    s.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInitUniversal';
    document.body.appendChild(s);
}

window.selectSiteLanguage = function(langCode, langName, flag) {
    const domain = window.location.hostname;
    
    // Set cookie
    if (langCode === 'en') {
        document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
        if (domain && domain !== 'localhost') {
            document.cookie = "googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=." + domain + ";";
        }
    } else {
        document.cookie = `googtrans=/en/${langCode}; path=/;`;
        if (domain && domain !== 'localhost' && !domain.match(/^\d+\.\d+\.\d+\.\d+$/)) {
            document.cookie = `googtrans=/en/${langCode}; path=/; domain=.${domain};`;
        }
    }

    localStorage.setItem('toi_user_lang', langCode);
    localStorage.setItem('toi_user_lang_name', langName);
    localStorage.setItem('toi_user_lang_flag', flag);

    // Close panel
    const panel = document.getElementById('header-translate-panel');
    if (panel) panel.classList.add('hidden');

    // Trigger translate combo if already in DOM
    const combo = document.querySelector('.goog-te-combo');
    if (combo) {
        combo.value = langCode;
        combo.dispatchEvent(new Event('change'));
        // Update label
        const flagEl = document.getElementById('header-active-flag');
        const labelEl = document.getElementById('header-active-label');
        if (flagEl) flagEl.textContent = flag;
        if (labelEl) labelEl.textContent = langName;
    } else {
        window.location.reload();
    }
};

function renderHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLang = getSavedLanguage();

    const navLinks = [
        { href: 'index.html', label: 'Home' },
        { href: 'about.html', label: 'Our Firm' },
        { href: 'products.html', label: 'Inventory' },
        { href: 'blog.html', label: 'Knowledge' },
    ];

    const desktopLinks = navLinks.map(l => `
        <a href="${l.href}" class="toi-nav-link ${currentPage === l.href ? 'active' : ''}">${l.label}</a>
    `).join('');

    const mobileLinks = navLinks.map(l => `
        <a href="${l.href}" class="mobile-link block text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded transition-colors ${currentPage === l.href ? 'text-white bg-slate-700 font-bold border-l-4 border-emerald-500' : ''}">${l.label}</a>
    `).join('');

    const desktopLangOptions = SUPPORTED_LANGUAGES.map(l => {
        const isActive = l.code === currentLang.code;
        return `
            <button onclick="selectSiteLanguage('${l.code}', '${l.native}', '${l.flag}')" type="button" class="w-full text-left px-3 py-2 rounded-xl flex items-center justify-between hover:bg-slate-800 transition-colors group cursor-pointer ${isActive ? 'bg-slate-800/90 border border-emerald-500/40' : ''}">
                <div class="flex items-center gap-2.5">
                    <span class="text-base leading-none shrink-0">${l.flag}</span>
                    <div class="leading-tight">
                        <div class="text-xs font-bold ${isActive ? 'text-emerald-400' : 'text-slate-200 group-hover:text-emerald-400'} transition-colors">${l.native}</div>
                        <div class="text-[10px] text-slate-400">${l.name} &bull; ${l.region}</div>
                    </div>
                </div>
                ${isActive ? '<i data-lucide="check" class="w-3.5 h-3.5 text-emerald-400 shrink-0"></i>' : ''}
            </button>
        `;
    }).join('');

    const mobileLangOptions = SUPPORTED_LANGUAGES.map(l => {
        const isActive = l.code === currentLang.code;
        return `
            <button onclick="selectSiteLanguage('${l.code}', '${l.native}', '${l.flag}')" type="button" class="text-left px-2.5 py-2 rounded-lg flex items-center gap-2 hover:bg-slate-700 transition-colors text-xs font-medium cursor-pointer ${isActive ? 'bg-emerald-600/30 border border-emerald-500 text-white font-bold' : 'bg-slate-900/60 text-slate-300 border border-slate-700/50'}">
                <span class="text-sm leading-none shrink-0">${l.flag}</span>
                <span class="truncate">${l.native}</span>
            </button>
        `;
    }).join('');

    headerEl.innerHTML = `
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center" aria-label="Main Navigation">
            <!-- Brand Logo -->
            <a href="index.html" class="flex items-center gap-3.5 group outline-none focus:outline-none focus-visible:ring-2 focus-visible:ring-emerald-500 rounded shrink-0">
                <img src="assets/images/tatvam-logo.svg" alt="Tatvam Overseas Inc Logo" class="h-9 w-auto group-hover:scale-105 transition-transform shrink-0 drop-shadow">
                <div class="flex flex-col leading-none">
                    <span class="text-xl font-black text-white tracking-wider">TATVAM</span>
                    <span class="text-[10px] font-extrabold text-emerald-400 tracking-[0.24em] uppercase mt-1">OVERSEAS INC</span>
                </div>
            </a>

            <!-- Center Navigation Links (With Guaranteed 32px Gap) -->
            <div class="hidden md:flex toi-nav-links">
                ${desktopLinks}
            </div>

            <!-- Right Actions: Language Selector + Get Quote Button -->
            <div class="hidden md:flex toi-nav-actions">
                <!-- Premium Language Picker Dropdown -->
                <div class="relative" id="header-lang-wrapper">
                    <button id="header-lang-btn" onclick="toggleHeaderTranslate(event)" type="button" title="Change Language" class="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-semibold transition-all shadow-sm cursor-pointer" aria-label="Change Language" aria-expanded="false" aria-haspopup="true">
                        <span id="header-active-flag" class="text-sm leading-none">${currentLang.flag}</span>
                        <span id="header-active-label" class="text-xs font-semibold">${currentLang.native}</span>
                        <i data-lucide="chevron-down" class="w-3 h-3 text-slate-400"></i>
                    </button>

                    <!-- Dropdown Panel (Positioned pixel-perfectly under button) -->
                    <div id="header-translate-panel" class="hidden absolute right-0 top-full mt-2 w-72 bg-slate-900/98 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-2xl p-2 z-[100] ring-1 ring-black/50">
                        <div class="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                            <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                <i data-lucide="globe" class="w-3.5 h-3.5 text-emerald-400"></i> Select Language
                            </span>
                            <span class="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Global Exporter</span>
                        </div>
                        <div class="py-1 max-h-72 overflow-y-auto space-y-0.5">
                            ${desktopLangOptions}
                        </div>
                    </div>
                </div>

                <a href="contact.html" class="nav-link-btn bg-white text-emerald-900 px-5 py-2 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-lg transform hover:-translate-y-0.5 text-sm whitespace-nowrap">Get Quote</a>
            </div>

            <!-- Mobile Trigger & Globe -->
            <div class="flex items-center gap-2 md:hidden">
                <button id="header-lang-btn-mobile" onclick="toggleHeaderTranslate(event)" type="button" title="Change Language" class="flex items-center gap-1.5 text-slate-300 hover:text-white p-2 rounded-lg bg-slate-800/80 border border-slate-700/60" aria-label="Change Language">
                    <span class="text-sm">${currentLang.flag}</span>
                    <i data-lucide="globe" class="w-4 h-4 text-emerald-400"></i>
                </button>
                <button id="mobile-menu-button" class="text-white p-2 focus:outline-none" aria-label="Open Menu" aria-expanded="false">
                    <i data-lucide="menu" class="w-6 h-6"></i>
                </button>
            </div>
        </nav>

        <!-- Mobile Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-slate-800 border-t border-slate-700 p-4 space-y-4 absolute w-full left-0 z-50 shadow-2xl origin-top">
            ${mobileLinks}
            
            <!-- Mobile Language Selector Section -->
            <div class="border-t border-slate-700/80 pt-3">
                <div class="flex items-center justify-between mb-2">
                    <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                        <i data-lucide="globe" class="w-3.5 h-3.5 text-emerald-400"></i> Select Language / اللغة
                    </span>
                    <span class="text-[10px] text-emerald-400 font-semibold">12 Export Regions</span>
                </div>
                <div class="grid grid-cols-2 gap-1.5 max-h-48 overflow-y-auto pr-1">
                    ${mobileLangOptions}
                </div>
            </div>

            <a href="contact.html" class="block bg-emerald-600 text-white text-center py-3 rounded-lg font-bold shadow-lg hover:bg-emerald-700 transition-colors">Get Quote Now</a>
        </div>
    `;

    // Initialize hidden Google Translate engine in background
    initHiddenGoogleTranslate();

    // Re-create icons for new elements
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Mobile menu toggle
    const btn = document.getElementById('mobile-menu-button');
    const menu = document.getElementById('mobile-menu');
    if (btn && menu) {
        btn.addEventListener('click', () => {
            const isOpen = !menu.classList.contains('hidden');
            menu.classList.toggle('hidden');
            btn.setAttribute('aria-expanded', String(!isOpen));
        });
    }

    // Toggle translate panel (desktop & mobile fallback)
    window.toggleHeaderTranslate = function(e) {
        if (e) e.stopPropagation();
        const panel = document.getElementById('header-translate-panel');
        if (!panel) return;
        panel.classList.toggle('hidden');
        if (typeof lucide !== 'undefined') lucide.createIcons();
    };

    // Close translate panel when clicking outside
    document.addEventListener('click', function(e) {
        const panel = document.getElementById('header-translate-panel');
        const btn = document.getElementById('header-lang-btn');
        const mobileBtn = document.getElementById('header-lang-btn-mobile');
        if (panel && !panel.classList.contains('hidden')) {
            if (!panel.contains(e.target) && (!btn || !btn.contains(e.target)) && (!mobileBtn || !mobileBtn.contains(e.target))) {
                panel.classList.add('hidden');
            }
        }
    });
}

function renderFooter() {
    const footerEl = document.getElementById('site-footer');
    if (!footerEl) return;

    const year = new Date().getFullYear();

    footerEl.innerHTML = `
        <!-- Newsletter Section -->
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
                        <input type="email" name="email" placeholder="Enter your work email address" required
                               class="flex-1 bg-slate-800 text-white px-5 py-3 rounded-lg outline-none border border-slate-700 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/50 text-sm transition-all"
                               aria-label="Email address for newsletter">
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
                    <a href="index.html" class="flex items-center gap-3.5 group">
                        <img src="assets/images/tatvam-logo.svg" alt="Tatvam Overseas Inc Logo" class="h-9 w-auto group-hover:scale-105 transition-transform shrink-0 drop-shadow">
                        <div class="flex flex-col leading-none">
                            <span class="text-xl font-black text-white tracking-wider">TATVAM</span>
                            <span class="text-[10px] font-extrabold text-emerald-400 tracking-[0.24em] uppercase mt-1">OVERSEAS INC</span>
                        </div>
                    </a>
                    <p class="leading-relaxed text-xs text-slate-400">
                        ISO 9001:2015 certified stockist and exporter of stainless steel, carbon steel, and high nickel alloys. Serving global industries since 1992 with complete traceability and MTC certification.
                    </p>
                    <div class="pt-2 text-[11px] text-slate-500 space-y-1">
                        <div><strong class="text-slate-400">GSTIN:</strong> 27AHIPJ6958M1ZK</div>
                        <div><strong class="text-slate-400">IEC:</strong> AHIPJ6958M (DGFT Govt of India)</div>
                        <div><strong class="text-slate-400">UDYAM:</strong> UDYAM-MH-19-0338145 (MSME Mfg)</div>
                    </div>
                </div>

                <!-- Products -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-emerald-500 pl-3">Top Products</h4>
                    <ul class="space-y-3">
                        <li><a href="products.html" class="hover:text-emerald-400 transition-colors block">SS 304 / 304L Sheets</a></li>
                        <li><a href="products.html" class="hover:text-emerald-400 transition-colors block">SS 316 / 316L Marine Plates</a></li>
                        <li><a href="products.html" class="hover:text-emerald-400 transition-colors block">Alloy Steel P11/P22 Pipes</a></li>
                        <li><a href="products.html" class="hover:text-emerald-400 transition-colors block">Inconel 625 Seamless Tubes</a></li>
                        <li><a href="products.html" class="hover:text-emerald-400 transition-colors block">Duplex 2205 Flanges</a></li>
                        <li>
                            <a href="${SITE_CONFIG.catalogUrl}" target="_blank" class="text-emerald-500 font-bold hover:text-emerald-400 flex items-center gap-2 mt-4">
                                <i data-lucide="download" class="w-3 h-3"></i> Download Full Catalog (PDF)
                            </a>
                        </li>
                    </ul>
                </div>

                <!-- Company -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-emerald-500 pl-3">Our Firm</h4>
                    <ul class="space-y-3">
                        <li><a href="about.html" class="hover:text-emerald-400 transition-colors block">About Tatvam Overseas Inc</a></li>
                        <li><a href="products.html" class="hover:text-emerald-400 transition-colors block">Complete Inventory</a></li>
                        <li><a href="mtc.html" class="hover:text-emerald-400 transition-colors block">Quality &amp; MTC Generator</a></li>
                        <li><a href="blog.html" class="hover:text-emerald-400 transition-colors block">Technical Knowledge Hub</a></li>
                        <li><a href="contact.html" class="hover:text-emerald-400 transition-colors block">Contact &amp; Locations</a></li>
                        <li><a href="privacypolicy.html" class="hover:text-emerald-400 transition-colors block">Privacy Policy</a></li>
                        <li><a href="terms.html" class="hover:text-emerald-400 transition-colors block">Terms &amp; Conditions</a></li>
                    </ul>
                </div>

                <!-- Contact -->
                <div>
                    <h4 class="text-white font-bold mb-6 uppercase tracking-wider text-xs border-l-2 border-emerald-500 pl-3">Mumbai Headquarters</h4>
                    <ul class="space-y-5">
                        <li class="flex items-start gap-3">
                            <i data-lucide="map-pin" class="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5"></i>
                            <span class="text-xs leading-relaxed">
                                39/41, Kamal Building,<br>
                                1st Kumbharwada Lane,<br>
                                Near Round Temple,<br>
                                Mumbai - 400004, Maharashtra
                            </span>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="phone" class="w-5 h-5 text-emerald-500 flex-shrink-0"></i>
                            <a href="tel:${SITE_CONFIG.phone}" class="text-xs font-mono text-white hover:text-emerald-400 transition-colors">${SITE_CONFIG.phoneDisplay}</a>
                        </li>
                        <li class="flex items-center gap-3">
                            <i data-lucide="mail" class="w-5 h-5 text-emerald-500 flex-shrink-0"></i>
                            <a href="mailto:${SITE_CONFIG.email}" class="text-xs hover:text-emerald-400 transition-colors">${SITE_CONFIG.email}</a>
                        </li>
                        <li class="pt-2">
                            <a href="contact.html" class="block w-full py-3 border-2 border-emerald-600 text-emerald-400 text-center font-bold rounded-lg hover:bg-emerald-600 hover:text-white transition-all text-xs uppercase tracking-widest shadow-lg">
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
                <p>&copy; ${year} Tatvam Overseas Inc. All Rights Reserved. Designed with excellence by <strong>Tatvam Studios</strong>.</p>
                <div class="flex items-center gap-6">
                    <a href="privacypolicy.html" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="terms.html" class="hover:text-white transition-colors">Terms &amp; Conditions</a>
                    <a href="sitemap.xml" class="hover:text-white transition-colors">Sitemap</a>
                    <a href="https://wa.me/919082834775" target="_blank" rel="noopener" title="WhatsApp" class="hover:text-white transition-colors flex items-center gap-1"><i data-lucide="message-circle" class="w-3 h-3"></i> WhatsApp</a>
                </div>
            </div>
        </div>
    `;

    // Newsletter form handler
    const nlForm = document.getElementById('newsletter-form');
    if (nlForm) {
        nlForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const emailInput = nlForm.querySelector('input[type="email"]');
            const submitBtn = nlForm.querySelector('button[type="submit"]');
            if (!emailInput || !submitBtn) return;

            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i data-lucide="loader-2" class="w-4 h-4 animate-spin mx-auto"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();

            try {
                const response = await fetch('https://api.web3forms.com/submit', {
                    method: 'POST',
                    body: new FormData(nlForm)
                });
                const result = await response.json();
                if (result.success) {
                    const successDiv = document.createElement('div');
                    successDiv.className = 'flex flex-col sm:flex-row items-center gap-4 bg-emerald-950/50 border border-emerald-800 p-4 rounded-lg text-white text-sm w-full lg:w-1/2 justify-between';
                    successDiv.innerHTML = `
                        <div class="flex items-center gap-2 text-emerald-400 font-bold">
                            <i data-lucide="check-circle" class="w-5 h-5 shrink-0"></i>
                            <span>Subscribed!</span>
                        </div>
                        <p class="text-xs text-slate-300 flex-1 text-center sm:text-left">We've registered your email for market updates.</p>
                        <a href="${SITE_CONFIG.catalogUrl}" download class="bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded text-xs transition-all flex items-center gap-1.5 shadow-md w-full sm:w-auto justify-center">
                            <i data-lucide="download" class="w-3.5 h-3.5"></i> Download Catalog
                        </a>
                    `;
                    nlForm.replaceWith(successDiv);
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                } else {
                    throw new Error('Submission failed');
                }
            } catch {
                alert('Something went wrong. Please try again or email us at ' + SITE_CONFIG.email);
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }
        });
    }

    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Auto-render on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    renderHeader();
    renderFooter();
});
