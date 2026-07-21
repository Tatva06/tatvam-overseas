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
    linkedin: '#',   // TODO: Replace with real LinkedIn URL
    facebook: '#',   // TODO: Replace with real Facebook URL
    instagram: '#',  // TODO: Replace with real Instagram URL
};

function renderHeader() {
    const headerEl = document.getElementById('site-header');
    if (!headerEl) return;

    const currentPage = window.location.pathname.split('/').pop() || 'index.html';

    const navLinks = [
        { href: 'index.html', label: 'Home' },
        { href: 'about.html', label: 'Our Firm' },
        { href: 'products.html', label: 'Inventory' },
        { href: 'blog.html', label: 'Knowledge' },
    ];

    const desktopLinks = navLinks.map(l => `
        <a href="${l.href}" class="nav-link hover:text-white transition-colors pb-1 border-b-2 border-transparent hover:border-emerald-500/50 ${currentPage === l.href ? 'text-white border-emerald-500 font-bold' : ''}">${l.label}</a>
    `).join('');

    const mobileLinks = navLinks.map(l => `
        <a href="${l.href}" class="mobile-link block text-slate-300 hover:text-white hover:bg-slate-700 px-3 py-2 rounded transition-colors ${currentPage === l.href ? 'text-white bg-slate-700 font-bold border-l-4 border-emerald-500' : ''}">${l.label}</a>
    `).join('');

    headerEl.innerHTML = `
        <nav class="container mx-auto px-6 py-4 flex justify-between items-center" aria-label="Main Navigation">
            <a href="index.html" class="text-2xl font-black text-white flex items-center gap-2 group">
                <div class="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold group-hover:rotate-12 transition-transform shrink-0">T</div>
                <span class="whitespace-nowrap">TATVAM <span class="text-emerald-500">OVERSEAS INC</span></span>
            </a>

            <div class="hidden md:flex items-center space-x-8 text-sm font-medium text-slate-300">
                ${desktopLinks}
                <a href="contact.html" class="nav-link-btn bg-white text-emerald-900 px-5 py-2 rounded-full font-bold hover:bg-emerald-50 transition-all shadow-lg transform hover:-translate-y-0.5">Get Quote</a>
            </div>

            <button id="mobile-menu-button" class="md:hidden text-white p-2 focus:outline-none" aria-label="Open Menu" aria-expanded="false">
                <i data-lucide="menu" class="w-6 h-6"></i>
            </button>
        </nav>

        <div id="mobile-menu" class="hidden md:hidden bg-slate-800 border-t border-slate-700 p-4 space-y-4 absolute w-full left-0 z-50 shadow-2xl origin-top">
            ${mobileLinks}
            <a href="contact.html" class="block bg-emerald-600 text-white text-center py-3 rounded-lg font-bold shadow-lg hover:bg-emerald-700 transition-colors">Get Quote Now</a>
        </div>
    `;

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
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-sm">
                <!-- Company Info -->
                <div class="space-y-6">
                    <a href="index.html" class="text-2xl font-black text-white flex items-center gap-2">
                        <div class="w-8 h-8 bg-emerald-600 rounded flex items-center justify-center text-white font-bold shrink-0">T</div>
                        <span class="whitespace-nowrap">TATVAM <span class="text-emerald-500">OVERSEAS INC</span></span>
                    </a>
                    <p class="leading-relaxed text-xs text-slate-400">
                        ISO 9001:2015 certified stockist and exporter of stainless steel, carbon steel, and high nickel alloys. Serving global industries since 1992 with complete traceability and MTC certification.
                    </p>
                    <div class="flex gap-3">
                        <a href="${SITE_CONFIG.linkedin}" target="_blank" rel="noopener" class="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all" aria-label="LinkedIn">
                            <i data-lucide="linkedin" class="w-4 h-4"></i>
                        </a>
                        <a href="${SITE_CONFIG.facebook}" target="_blank" rel="noopener" class="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all" aria-label="Facebook">
                            <i data-lucide="facebook" class="w-4 h-4"></i>
                        </a>
                        <a href="${SITE_CONFIG.instagram}" target="_blank" rel="noopener" class="w-9 h-9 bg-slate-800 rounded-lg flex items-center justify-center hover:bg-emerald-600 hover:text-white transition-all" aria-label="Instagram">
                            <i data-lucide="instagram" class="w-4 h-4"></i>
                        </a>
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
                <div class="flex gap-6">
                    <a href="privacypolicy.html" class="hover:text-white transition-colors">Privacy Policy</a>
                    <a href="terms.html" class="hover:text-white transition-colors">Terms &amp; Conditions</a>
                    <a href="sitemap.xml" class="hover:text-white transition-colors">Sitemap</a>
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
