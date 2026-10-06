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
            /* ══ Two-Tier Header ══ */
            .toi-top-bar {
                background: #ffffff;
                background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60'%3E%3Cpath d='M0 30h60M30 0v60' stroke='%23e2e8f0' stroke-width='0.6'/%3E%3Ccircle cx='30' cy='30' r='1.2' fill='%23cbd5e1'/%3E%3Ccircle cx='0' cy='0' r='1.2' fill='%23cbd5e1'/%3E%3Ccircle cx='60' cy='0' r='1.2' fill='%23cbd5e1'/%3E%3Ccircle cx='0' cy='60' r='1.2' fill='%23cbd5e1'/%3E%3Ccircle cx='60' cy='60' r='1.2' fill='%23cbd5e1'/%3E%3C/svg%3E");
                border-bottom: 1px solid #e2e8f0;
                position: relative;
                z-index: 20;
            }
            /* Desktop nav bar */
            .toi-nav-desktop {
                display: none;
                position: relative;
                background: transparent;
                height: 40px;
                overflow: hidden;
                z-index: 10;
            }
            @media (min-width: 768px) {
                .toi-nav-desktop { display: block; }
                .toi-mobile-nav  { display: none !important; }
            }
            /* Full-width dark slate bar with diagonal left cut */
            .toi-nav-slab {
                position: absolute;
                inset: 0;
                background: #0f172a;
                clip-path: polygon(3% 0%, 100% 0%, 100% 100%, 0% 100%);
                z-index: 0;
            }
            /* Nav links row on top of slab */
            .toi-nav-links {
                position: absolute;
                top: 0; right: 0; bottom: 0; left: 0;
                display: flex;
                align-items: center;
                justify-content: flex-end;
                padding: 0 1.5rem;
                gap: 0;
                z-index: 1;
            }
            .toi-nav-link {
                display: flex !important;
                align-items: center !important;
                height: 100% !important;
                padding: 0 1.1rem !important;
                color: #94a3b8 !important;
                font-size: 0.72rem !important;
                font-weight: 700 !important;
                letter-spacing: 0.12em !important;
                border-bottom: 3px solid transparent !important;
                transition: color 0.15s, border-color 0.15s !important;
                text-decoration: none !important;
                white-space: nowrap !important;
                text-transform: uppercase !important;
            }
            .toi-nav-link:hover {
                color: #ffffff !important;
                border-bottom-color: rgba(34,197,94,0.55) !important;
            }
            .toi-nav-link.active {
                color: #ffffff !important;
                font-weight: 800 !important;
                border-bottom-color: #22c55e !important;
            }
            /* WhatsApp pill button */
            .toi-wa-btn {
                display: inline-flex;
                align-items: center;
                gap: 7px;
                padding: 8px 20px;
                border-radius: 9999px;
                border: 2px solid #16a34a;
                color: #16a34a;
                background: transparent;
                font-weight: 700;
                font-size: 0.82rem;
                letter-spacing: 0.04em;
                text-decoration: none;
                transition: background 0.18s, color 0.18s;
                white-space: nowrap;
                cursor: pointer;
            }
            .toi-wa-btn:hover { background: #16a34a; color: #fff; }
            .toi-wa-btn:hover svg path { fill: #fff; }
            /* GET QUOTE diagonal button */
            .toi-quote-btn {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                padding: 10px 28px 10px 36px;
                background: #16a34a;
                color: #fff;
                font-weight: 900;
                font-size: 0.8rem;
                letter-spacing: 0.12em;
                text-transform: uppercase;
                text-decoration: none;
                clip-path: polygon(15% 0, 100% 0, 100% 100%, 0% 100%);
                transition: background 0.18s;
                white-space: nowrap;
                cursor: pointer;
                line-height: 1;
            }
            .toi-quote-btn:hover { background: #15803d; }
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
    // Override header bg so white top-bar shows correctly
    headerEl.style.background = 'transparent';

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const currentLang = getSavedLanguage();

    const navLinks = [
        { href: 'index.html', label: 'Home' },
        { href: 'about.html', label: 'Our Firm' },
        { href: 'products.html', label: 'Inventory' },
        { href: 'blog.html', label: 'Knowledge' },
        { href: 'contact.html', label: 'Contact' },
    ];

    const desktopLinks = navLinks.map(l => `
        <a href="${l.href}" class="toi-nav-link${currentPage === l.href ? ' active' : ''}" translate="no">${l.label}</a>
    `).join('');

    const mobileLinks = navLinks.map(l => `
        <a href="${l.href}" translate="no"
           class="block px-4 py-3 text-sm font-medium uppercase tracking-wide transition-colors border-l-2 ${currentPage === l.href ? 'text-white border-emerald-500 bg-slate-800/60 font-bold' : 'text-slate-300 border-transparent hover:text-white hover:border-emerald-400/50 hover:bg-slate-800/40'}">${l.label}</a>
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
        <!-- ═══════════════════════════════════════════════════ -->
        <!-- TOP BAR: White — Logo + Company Name + CTA Buttons -->
        <!-- ═══════════════════════════════════════════════════ -->
        <div class="toi-top-bar">
            <div class="container mx-auto px-6 py-3 flex items-center justify-between gap-6">

                <!-- Brand: Logo + Name -->
                <a href="index.html" translate="no" class="flex items-center gap-3 group shrink-0" aria-label="Tatvam Overseas Inc">
                    <div class="bg-white rounded-md border border-slate-200 shadow-sm p-1 shrink-0 group-hover:shadow-md transition-shadow">
                        <img src="assets/TATVAM LOGO.jpg" alt="TOI – Tatvam Overseas Inc Logo"
                             class="h-10 w-auto object-contain block" translate="no" loading="eager">
                    </div>
                    <div class="leading-tight" translate="no">
                        <div class="text-[16px] font-black text-slate-900 tracking-widest leading-none">TATVAM OVERSEAS INC</div>
                        <div class="text-[9.5px] text-slate-400 tracking-[0.2em] uppercase mt-0.5 font-semibold">
                            MUMBAI &nbsp;&middot;&nbsp; EST. 1992 &nbsp;&middot;&nbsp; ISO 9001:2015
                        </div>
                    </div>
                </a>

                <!-- Desktop: Language + WhatsApp + GET QUOTE -->
                <div class="hidden lg:flex items-center gap-0 shrink-0">

                    <!-- Language selector (compact, before the buttons) -->
                    <div class="relative mr-4" id="header-lang-wrapper">
                        <button id="header-lang-btn" onclick="toggleHeaderTranslate(event)" type="button"
                            class="flex items-center gap-1.5 px-3 py-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 border border-slate-200 text-xs font-bold transition-all cursor-pointer"
                            aria-label="Change Language" aria-expanded="false" aria-haspopup="true" translate="no">
                            <span id="header-active-flag" class="text-sm leading-none">${currentLang.flag}</span>
                            <i data-lucide="chevron-down" class="w-3 h-3 shrink-0"></i>
                        </button>
                        <div id="header-translate-panel" class="hidden absolute right-0 top-full mt-2 w-72 bg-slate-900/98 backdrop-blur-xl border border-slate-700/80 shadow-2xl rounded-2xl p-2 z-[100] ring-1 ring-black/50">
                            <div class="px-3 py-2 border-b border-slate-800 flex items-center justify-between">
                                <span class="text-[11px] font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                                    <i data-lucide="globe" class="w-3.5 h-3.5 text-emerald-400"></i> Select Language
                                </span>
                                <span class="text-[10px] text-emerald-400 font-semibold px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">Global Exporter</span>
                            </div>
                            <div class="py-1 max-h-72 overflow-y-auto space-y-0.5">${desktopLangOptions}</div>
                        </div>
                    </div>

                    <!-- WhatsApp: outlined pill button matching reference image -->
                    <a href="https://wa.me/919082834775" target="_blank" rel="noopener"
                       class="flex items-center gap-2 px-5 py-2.5 rounded-full border-2 border-emerald-500 hover:bg-emerald-50 text-emerald-600 font-bold text-sm tracking-wide transition-all group cursor-pointer shrink-0">
                        <svg class="w-4 h-4 shrink-0" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                        </svg>
                        <span>WhatsApp</span>
                    </a>

                    <!-- GET QUOTE: solid green slanted parallelogram button -->
                    <a href="contact.html" translate="no"
                       class="flex items-center gap-2.5 pl-8 pr-7 py-[11px] bg-emerald-600 hover:bg-emerald-500 text-white font-black text-sm tracking-[0.12em] uppercase transition-all shrink-0 cursor-pointer ml-px"
                       style="clip-path: polygon(22px 0%, 100% 0%, 100% 100%, 0% 100%); letter-spacing:0.1em;">
                        GET QUOTE
                        <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6"/>
                        </svg>
                    </a>
                </div>

                <!-- Mobile CTAs -->
                <div class="flex items-center gap-2 lg:hidden">
                    <a href="https://wa.me/919082834775" target="_blank"
                       class="flex items-center gap-1.5 text-emerald-600 font-bold text-sm bg-emerald-50 px-3 py-1.5 rounded-full border border-emerald-200">
                        <i data-lucide="message-circle" class="w-4 h-4"></i> WA
                    </a>
                    <a href="contact.html" class="text-white font-bold text-sm bg-emerald-600 px-3.5 py-1.5 rounded-full">
                        Quote
                    </a>
                </div>
            </div>
        </div>

        <!-- ════════════ ROW 2: 40px dark nav, full-width diagonal cut ════════════ -->
        <nav class="toi-nav-desktop" aria-label="Main Navigation">
            <div class="toi-nav-slab"></div>
            <div class="toi-nav-links" translate="no">
                ${desktopLinks}
                <span style="color:#334155; padding:0 14px 0 4px; display:flex; align-items:center; flex-shrink:0;" aria-hidden="true">
                    <svg width="9" height="9" viewBox="0 0 10 10" fill="currentColor"><polygon points="5,0 10,5 5,10 0,5"/></svg>
                </span>
            </div>
        </nav>

        <!-- Mobile Nav Bar (visible only < 768px) -->
        <nav class="toi-mobile-nav" style="background:#0f172a; border-bottom:1px solid #334155; z-index:10; position:relative;" aria-label="Mobile Navigation">
            <div style="padding:10px 16px; display:flex; align-items:center;">
                <button id="mobile-menu-button" style="background:none; border:none; color:#fff; cursor:pointer; display:flex; align-items:center; gap:8px; font-size:0.8rem; font-weight:700; letter-spacing:0.1em; text-transform:uppercase;" aria-label="Open Menu" aria-expanded="false">
                    <i data-lucide="menu" style="width:20px;height:20px;"></i>
                    <span style="color:#94a3b8;">Menu</span>
                </button>
            </div>
        </nav>

        <!-- Mobile Slide-down Menu -->
        <div id="mobile-menu" class="hidden md:hidden bg-slate-900 border-t border-slate-800 absolute w-full left-0 z-50 shadow-2xl">
            <div class="space-y-0.5 py-2">
                ${mobileLinks}
            </div>
            <div class="border-t border-slate-800 px-4 py-3">
                <span class="text-[10px] font-bold uppercase tracking-widest text-slate-500 flex items-center gap-1.5 mb-2">
                    <i data-lucide="globe" class="w-3 h-3 text-emerald-400"></i> Language
                </span>
                <div class="grid grid-cols-2 gap-1.5 max-h-36 overflow-y-auto">${mobileLangOptions}</div>
            </div>
            <div class="px-4 pb-4 pt-2">
                <a href="contact.html" class="block bg-emerald-600 text-white text-center py-3 rounded-lg font-bold text-sm uppercase tracking-wide hover:bg-emerald-500 transition-colors" translate="no">
                    Get Quote Now
                </a>
            </div>
        </div>
    `;

    // Initialize hidden Google Translate engine in background
    initHiddenGoogleTranslate();

    // Re-create icons for new elements
    if (typeof lucide !== 'undefined') lucide.createIcons();

    // Mobile menu toggle — bind to all .mobile-menu-btn + #mobile-menu-button
    const menu = document.getElementById('mobile-menu');
    document.querySelectorAll('#mobile-menu-button, .mobile-menu-btn').forEach(btn => {
        if (btn && menu) {
            btn.addEventListener('click', () => {
                const isOpen = !menu.classList.contains('hidden');
                menu.classList.toggle('hidden');
                btn.setAttribute('aria-expanded', String(!isOpen));
            });
        }
    });

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
                    <a href="index.html" class="inline-block group">
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
