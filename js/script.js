// ============================================================================
// TATVAM OVERSEAS INC - CORE SCRIPT (CORRECTED & CONSOLIDATED)
// ============================================================================

// Configuration
const CONFIG = {
    densities: {
        'SS 304': 7.93,
        'SS 316': 7.98,
        'SS 202': 7.80,
        'MS': 7.85,
        'Inconel': 8.44,
        'Monel': 8.80,
        'Hastelloy': 8.89
    },
    defaultDensity: 7.93
};

// 1. UTILITIES
function escapeHtml(unsafe) {
    if (!unsafe) return "";
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(unsafe).replace(/[&<>"']/g, m => map[m]);
}

const IMAGES = {
    sheets: [
        "assets/images/pool/sheets_prod.jpg"
    ],
    pipes: [
        "assets/images/pool/pipes.jpg"
    ],
    tubes: [
        "assets/images/pool/tubes.jpg"
    ],
    bars: [
        "assets/images/pool/rods.jpg"
    ],
    coils: [
        "assets/images/pool/coils.jpg"
    ],
    circles: [
        "assets/images/pool/circles.jpg"
    ],
    plates: [
        "assets/images/pool/plates.jpg"
    ],
    flats: [
        "assets/images/pool/sheets_prod.jpg"
    ],
    fittings: [
        "assets/images/pool/pipes.jpg"
    ],
    general: [
        "assets/images/pool/warehouse.jpg"
    ]
};

function getProductImage(product) {
    if (product.image && !product.image.includes('placehold.co')) {
        return product.image;
    }

    const category = (product.category || "").toLowerCase();

    if (category.includes('pipe')) return IMAGES.pipes[0];
    if (category.includes('tube') && category.includes('instrument')) return IMAGES.tubes[0];
    if (category.includes('tube')) return IMAGES.tubes[0];
    if (category.includes('coil') || category.includes('slitting')) return IMAGES.coils[0];
    if (category.includes('circle') || category.includes('ring')) return IMAGES.circles[0];
    if (category.includes('plate')) return IMAGES.plates[0];
    if (category.includes('sheet') || category.includes('specialty')) return IMAGES.sheets[0];
    if (category.includes('flat') || category.includes('patti')) return IMAGES.flats[0];
    if (category.includes('bar') || category.includes('rod') || category.includes('wire')) return IMAGES.bars[0];
    if (category.includes('fitting') || category.includes('flange') || category.includes('fastener')) return IMAGES.fittings[0];

    return IMAGES.general[0];
}

// 2. INITIALIZATION
window.addEventListener('load', () => {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        preloader.classList.add('opacity-0');
        setTimeout(() => preloader.style.display = 'none', 500);
    }
    
    highlightActiveNav();
});

document.addEventListener('DOMContentLoaded', () => {
    if (typeof lucide !== 'undefined') lucide.createIcons();
    if (typeof AOS !== 'undefined') AOS.init({ duration: 800, offset: 50, once: true });

    // Hero Slider
    const slides = document.querySelectorAll('.slide');
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove('active');
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add('active');
        }, 5000);
    }

    // Render Home Content
    const homeProdGrid = document.getElementById('home-product-grid');
    if (homeProdGrid && typeof products !== 'undefined') {
        renderInventory(homeProdGrid, products.slice(0, 4));
    }
    
    const homeBlogGrid = document.getElementById('home-blog-grid');
    if (homeBlogGrid && typeof blogs !== 'undefined') {
        renderBlog(homeBlogGrid, blogs.slice(0, 3));
    }

    initChatWidget();
    initNewsletterInterceptor();
    initSmartSearch();
});

// 3. NAVIGATION HIGHLIGHTING
function highlightActiveNav() {
    const currentPage = window.location.pathname.split("/").pop() || "index.html";
    
    document.querySelectorAll('.nav-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.remove('text-slate-300', 'border-transparent');
            link.classList.add('text-white', 'border-emerald-500', 'font-bold');
        }
    });
    
    document.querySelectorAll('.mobile-link').forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage) {
            link.classList.add('text-white', 'bg-slate-700', 'font-bold', 'border-l-4', 'border-emerald-500');
        }
    });
}

// ============================================================================
// 3. UNIVERSAL FLOATING WIDGET & CHAT SYSTEM (Consolidated & Premium)
// ============================================================================
class SmartFloatingWidget {
    constructor() {
        this.menuOpen = false;
        this.chatOpen = false;
        this.messages = [];
        this.init();
    }
    
    init() {
        if (document.getElementById('floating-widgets')) return;
        this.createWidgetDOM();
        this.loadQuickReplies();
        
        // Listeners
        const toggleBtn = document.getElementById('chat-toggle');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => this.toggleMenu());
        }
        
        const chatForm = document.getElementById('chat-form');
        if (chatForm) {
            chatForm.addEventListener('submit', (e) => {
                e.preventDefault();
                const input = document.getElementById('chat-input');
                if (input && input.value.trim()) {
                    this.sendMessage(input.value);
                    input.value = '';
                }
            });
        }
        
        // Show notification badge on chat after 10s
        setTimeout(() => this.showWelcomeNotification(), 10000);
    }
    
    createWidgetDOM() {
        const container = document.createElement('div');
        container.id = 'floating-widgets';
        container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end font-sans';
        
        // Google Translate Element
        const langDiv = document.createElement('div');
        langDiv.id = 'google_translate_element';
        langDiv.className = 'bg-white p-2 rounded-lg shadow-xl border border-slate-200 hidden mb-2';
        container.appendChild(langDiv);
        
        // Chat Window
        const chatWindow = document.createElement('div');
        chatWindow.id = 'chat-window';
        chatWindow.className = 'hidden flex-col bg-white rounded-2xl shadow-2xl border border-slate-200 w-80 max-w-sm h-[480px] mb-2 overflow-hidden transition-all duration-300 origin-bottom-right scale-95 opacity-0';
        chatWindow.innerHTML = `
            <!-- Chat Header -->
            <div class="bg-gradient-to-r from-emerald-600 to-emerald-500 text-white p-4 flex justify-between items-center shrink-0">
                <div class="flex items-center gap-3">
                    <div class="w-8 h-8 bg-white rounded-full flex items-center justify-center text-emerald-600 font-bold">T</div>
                    <div>
                        <h4 class="font-bold text-xs leading-tight">Tatvam Assistant</h4>
                        <p class="text-[9px] text-emerald-100">Typically responds within 2-4 business hours</p>
                    </div>
                </div>
                <button id="chat-close-btn" class="text-white/80 hover:text-white">
                    <i data-lucide="x" class="w-4 h-4"></i>
                </button>
            </div>
            <!-- Chat Messages -->
            <div id="chat-messages" class="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50"></div>
            <!-- Quick Replies -->
            <div id="quick-replies" class="p-2 border-t border-slate-200 bg-white overflow-x-auto shrink-0 no-scrollbar">
                <div class="flex gap-1.5 min-w-max"></div>
            </div>
            <!-- Input Form -->
            <div class="p-3 border-t border-slate-200 bg-white shrink-0">
                <form id="chat-form" class="flex gap-2">
                    <input type="text" id="chat-input" placeholder="Ask about grades, stock..." 
                           class="flex-1 border border-slate-200 rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-emerald-500 bg-slate-50">
                    <button type="submit" class="bg-emerald-600 text-white px-3 py-2 rounded-lg hover:bg-emerald-500 transition-colors flex items-center justify-center">
                        <i data-lucide="send" class="w-3.5 h-3.5"></i>
                    </button>
                </form>
            </div>
        `;
        container.appendChild(chatWindow);
        
        // Menu Options Container
        const menuOptions = document.createElement('div');
        menuOptions.id = 'chat-options';
        menuOptions.className = 'hidden flex-col gap-3 transition-all duration-300 origin-bottom-right scale-0 opacity-0 mb-2';
        menuOptions.innerHTML = `
            <!-- Live Chat Assistant Button -->
            <button id="btn-open-chat" class="flex items-center gap-3 bg-white text-slate-800 p-3 rounded-full shadow-xl hover:bg-slate-50 border border-slate-100 group transition-all">
                <span class="text-xs font-bold mr-1">AI Assistant</span>
                <div class="w-8 h-8 bg-emerald-600 rounded-full flex items-center justify-center text-white relative">
                    <i data-lucide="message-square" class="w-4 h-4"></i>
                    <span id="chat-badge" class="hidden absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-bold w-4 h-4 rounded-full flex items-center justify-center">1</span>
                </div>
            </button>
            <!-- Change Language -->
            <button id="btn-toggle-lang" class="flex items-center gap-3 bg-white text-slate-800 p-3 rounded-full shadow-xl hover:bg-slate-50 border border-slate-100 transition-all">
                <span class="text-xs font-bold mr-1">Language</span>
                <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white"><i data-lucide="languages" class="w-4 h-4"></i></div>
            </button>

            <!-- WhatsApp -->
            <a href="https://wa.me/919082834775" target="_blank" class="flex items-center gap-3 bg-white text-slate-800 p-3 rounded-full shadow-xl hover:bg-slate-50 border border-slate-100 transition-all">
                <span class="text-xs font-bold mr-1">WhatsApp</span>
                <div class="w-8 h-8 bg-[#25D366] rounded-full flex items-center justify-center text-white"><i data-lucide="message-circle" class="w-4 h-4"></i></div>
            </a>
        `;
        container.appendChild(menuOptions);
        
        // Toggle Button
        const toggleBtn = document.createElement('button');
        toggleBtn.id = 'chat-toggle';
        toggleBtn.className = 'bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-105 transition-transform flex items-center justify-center border-4 border-white ring-2 ring-emerald-100 group';
        toggleBtn.setAttribute('aria-label', 'Open quick options');
        toggleBtn.innerHTML = `<i data-lucide="plus" class="w-6 h-6 transition-transform group-hover:rotate-90"></i>`;
        container.appendChild(toggleBtn);
        
        document.body.appendChild(container);
        
        // Internal Button Listeners
        document.getElementById('btn-open-chat').addEventListener('click', () => this.toggleChat());
        document.getElementById('btn-toggle-lang').addEventListener('click', () => this.toggleTranslate());
        document.getElementById('chat-close-btn').addEventListener('click', () => this.toggleChat(false));
        
        // Google translate callback initializer
        window.googleTranslateElementInit = function() {
            new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
        }
        
        // Inject Google Translate script dynamically
        const script = document.createElement('script');
        script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
        document.body.appendChild(script);
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    
    toggleMenu(show) {
        this.menuOpen = show !== undefined ? show : !this.menuOpen;
        const options = document.getElementById('chat-options');
        const toggle = document.getElementById('chat-toggle');
        
        if (this.menuOpen) {
            options.classList.remove('hidden', 'scale-0', 'opacity-0');
            options.classList.add('flex', 'scale-100', 'opacity-100');
            toggle.innerHTML = `<i data-lucide="x" class="w-6 h-6 transition-transform group-hover:rotate-90"></i>`;
            toggle.classList.replace('bg-emerald-600', 'bg-slate-800');
        } else {
            options.classList.remove('scale-100', 'opacity-100');
            options.classList.add('scale-0', 'opacity-0');
            setTimeout(() => options.classList.add('hidden'), 200);
            toggle.innerHTML = `<i data-lucide="plus" class="w-6 h-6 transition-transform group-hover:rotate-90"></i>`;
            toggle.classList.replace('bg-slate-800', 'bg-emerald-600');
            
            // Auto close chat/translate if open
            if (this.chatOpen) this.toggleChat(false);
            const trans = document.getElementById('google_translate_element');
            if (trans) trans.classList.add('hidden');
        }
        if (typeof lucide !== 'undefined') lucide.createIcons();
    }
    
    toggleChat(show) {
        this.chatOpen = show !== undefined ? show : !this.chatOpen;
        const chatWindow = document.getElementById('chat-window');
        const badge = document.getElementById('chat-badge');
        
        if (this.chatOpen) {
            if (badge) badge.classList.add('hidden');
            chatWindow.classList.remove('hidden');
            setTimeout(() => {
                chatWindow.classList.remove('scale-95', 'opacity-0');
                chatWindow.classList.add('scale-100', 'opacity-100');
            }, 10);
            
            if (this.messages.length === 0) {
                setTimeout(() => {
                    this.addBotMessage("👋 Hello! I'm your Tatvam Assistant. I can recommend grades, check stock guidelines, or help you contact sales. What are you looking for today?");
                }, 400);
            }
        } else {
            chatWindow.classList.remove('scale-100', 'opacity-100');
            chatWindow.classList.add('scale-95', 'opacity-0');
            setTimeout(() => chatWindow.classList.add('hidden'), 300);
        }
    }
    
    toggleTranslate() {
        const el = document.getElementById('google_translate_element');
        if (el) el.classList.toggle('hidden');
    }
    
    showWelcomeNotification() {
        if (this.chatOpen) return;
        const badge = document.getElementById('chat-badge');
        if (badge) badge.classList.remove('hidden');
        
        // Pulse toggle button
        const toggle = document.getElementById('chat-toggle');
        if (toggle) {
            toggle.classList.add('animate-pulse');
            setTimeout(() => toggle.classList.remove('animate-pulse'), 3000);
        }
    }
    
    loadQuickReplies() {
        const replies = [
            { text: '💰 Get Price Quote', action: 'price' },
            { text: '📦 Check Stock', action: 'stock' },
            { text: '📞 Call Me Back', action: 'callback' },
            { text: '📧 Email Sales', action: 'email' }
        ];
        
        const container = document.querySelector('#quick-replies .flex');
        if (container) {
            container.innerHTML = replies.map(r => `
                <button type="button" class="quick-reply-btn bg-slate-100 border border-slate-200 text-slate-700 text-[10px] font-bold px-3 py-1.5 rounded-full hover:bg-emerald-50 hover:text-emerald-700 hover:border-emerald-300 transition-all whitespace-nowrap">
                    ${r.text}
                </button>
            `).join('');
            
            // Event delegation
            container.querySelectorAll('button').forEach((btn, idx) => {
                btn.addEventListener('click', () => this.handleQuickReply(replies[idx].action));
            });
        }
    }
    
    sendMessage(text) {
        this.addUserMessage(text);
        
        setTimeout(() => {
            const response = this.generateResponse(text);
            this.addBotMessage(response);
        }, 800);
    }
    
    addUserMessage(text) {
        this.messages.push({ type: 'user', text, time: new Date() });
        this.renderMessages();
    }
    
    addBotMessage(text) {
        this.messages.push({ type: 'bot', text, time: new Date() });
        this.renderMessages();
    }
    
    renderMessages() {
        const container = document.getElementById('chat-messages');
        if (!container) return;
        
        container.innerHTML = this.messages.map(m => `
            <div class="flex ${m.type === 'user' ? 'justify-end' : 'justify-start'}">
                <div class="max-w-[85%] ${m.type === 'user' ? 'bg-emerald-600 text-white rounded-br-none' : 'bg-white border border-slate-200 text-slate-800 rounded-bl-none'} rounded-2xl px-3 py-2 shadow-sm text-xs leading-normal">
                    <p>${m.text.replace(/\n/g, '<br>')}</p>
                    <span class="text-[8px] ${m.type === 'user' ? 'text-emerald-100' : 'text-slate-400'} block mt-1 text-right">
                        ${m.time.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                    </span>
                </div>
            </div>
        `).join('');
        
        container.scrollTop = container.scrollHeight;
    }
    
    generateResponse(input) {
        const lower = input.toLowerCase();
        
        if (lower.includes('price') || lower.includes('cost') || lower.includes('rate')) {
            return "I'll gladly connect you with our sales team for current pricing. What grade are you interested in? (e.g., SS 304, SS 316, Inconel 625)";
        }
        if (lower.includes('304') || lower.includes('316') || lower.includes('steel')) {
            return "Great choice! SS 304/316 are our most popular grades. Would you like sheets, pipes, or bars? Also, what quantity do you need?";
        }
        if (lower.includes('stock') || lower.includes('available')) {
            return "We maintain 7000+ tons of ready stock in Mumbai. For specific availability, please share: Grade, Form (Sheet/Pipe), Size, and Quantity.";
        }
        if (lower.includes('delivery') || lower.includes('shipping')) {
            return "📦 Delivery timelines:\n• Mumbai: Same day\n• Maharashtra: 2-3 days\n• Pan-India: 4-7 days\n• Export: 15-30 days\n\nWhere should we deliver?";
        }
        if (lower.includes('certificate') || lower.includes('mtc') || lower.includes('test')) {
            return "✅ All material comes with Mill Test Certificate (MTC) per EN 10204 3.1. We also provide:\n• Heat number traceability\n• TPI inspection (on request)\n• NABL lab reports";
        }
        
        return "For the fastest response, feel free to:\n\n1️⃣ WhatsApp us: +91 9082834775\n2️⃣ Call: +91 9082834775\n3️⃣ Email: sales@tatvamoverseasinc.com\n\nWhat other questions can I answer for you?";
    }
    
    handleQuickReply(action) {
        switch(action) {
            case 'price':
                this.sendMessage('I need a price quote');
                break;
            case 'stock':
                this.sendMessage('Do you have this in stock?');
                break;
            case 'callback':
                window.location.href = 'contact.html';
                break;
            case 'email':
                window.location.href = 'mailto:sales@tatvamoverseasinc.com';
                break;
        }
    }
}

function initChatWidget() {
    window.floatingWidget = new SmartFloatingWidget();
}

// 5. RENDER HELPERS
function renderInventory(container, data) {
    if (!container || !data) return;
    
    container.innerHTML = data.map(p => `
        <div class="bg-white rounded-xl border hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer overflow-hidden" onclick="openProductModal('${p.id}')">
            <div class="h-48 bg-slate-100 relative">
                <img src="${getProductImage(p)}" class="w-full h-full object-cover" loading="lazy" alt="${escapeHtml(p.grade)}">
                <div class="absolute top-3 left-3 bg-slate-900/90 text-white text-xs font-bold px-2 py-1 rounded">${escapeHtml(p.category)}</div>
            </div>
            <div class="p-5">
                <h3 class="text-lg font-bold text-slate-900 mb-2">${escapeHtml(p.grade)}</h3>
                <p class="text-sm text-slate-500 line-clamp-2 mb-4">${escapeHtml(p.description)}</p>
                <div class="flex justify-between items-center text-xs font-bold text-emerald-600 uppercase">
                    View Specs <i data-lucide="arrow-right" class="w-4 h-4"></i>
                </div>
            </div>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderBlog(container, data) {
    if (!container || !data) return;
    
    container.innerHTML = data.map(b => `
        <article class="bg-white rounded-xl border hover:shadow-lg transition-all cursor-pointer overflow-hidden" onclick="openBlogModal('${b.id}')">
            <div class="h-48 relative">
                <img src="${b.image}" class="w-full h-full object-cover" loading="lazy" alt="${escapeHtml(b.title)}">
                <span class="absolute top-3 right-3 bg-white/90 px-2 py-1 rounded text-xs font-bold text-emerald-700">${escapeHtml(b.category)}</span>
            </div>
            <div class="p-5">
                <div class="text-xs text-slate-400 mb-2">${escapeHtml(b.date)}</div>
                <h3 class="text-lg font-bold text-slate-900 mb-2 line-clamp-2">${escapeHtml(b.title)}</h3>
                <p class="text-sm text-slate-500 line-clamp-3">${escapeHtml(b.snippet)}</p>
            </div>
        </article>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// 6. MODAL SYSTEM WITH CALCULATOR
// ============================================================================
// 5. UPGRADED SMART CALCULATOR (Inside Modal)
// ============================================================================

let currentDensity = 7.93; // Default
let currentCalcMode = 'sheet'; // Default

function openProductModal(id) {
    if (typeof products === 'undefined') return;
    const p = products.find(prod => prod.id === id);
    if (!p) return;
    
    // 1. Get Density (Auto-detect from data)
    // Checks p.phys.Density -> "7.93 g/cm3" -> extracts 7.93
    const densityStr = p.phys?.Density || "7.85";
    currentDensity = parseFloat(densityStr.match(/[\d\.]+/)?.[0] || 7.85);

    // 2. Determine Default Tab based on Category
    const cat = p.category.toLowerCase();
    if (cat.includes('pipe') || cat.includes('tube')) currentCalcMode = 'pipe';
    else if (cat.includes('bar') || cat.includes('rod')) currentCalcMode = 'bar';
    else currentCalcMode = 'sheet';

    const modal = document.getElementById('common-modal');
    const body = document.getElementById('modal-body');
    
    // 3. Generate Specs & Chem HTML
    const chemRows = p.chem ? Object.entries(p.chem).map(([k,v]) => 
        `<div class="flex justify-between border-b border-slate-100 py-1"><span class="font-bold text-slate-700">${k}</span><span>${v}</span></div>`
    ).join('') : 'Contact for details';

    // 4. Modal HTML
    body.innerHTML = `
        <div class="grid md:grid-cols-2 gap-0 h-full">
            <div class="p-6 bg-slate-50/50 flex flex-col">
                <img src="${getProductImage(p)}" class="w-full h-56 object-cover rounded-lg shadow-md mb-4">
                <h2 class="text-2xl font-black text-slate-900 mb-1">${p.grade}</h2>
                <span class="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded mb-4 w-fit">${p.department}</span>
                <p class="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">${p.description}</p>
                <div class="flex gap-3 mt-auto">
                    <a href="contact.html" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded text-center transition-colors text-sm shadow-md">Get Quote</a>
                    <a href="https://wa.me/919082834775?text=Inquiry%20for%20${p.grade}" target="_blank" class="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-3 rounded text-center transition-colors text-sm flex items-center justify-center gap-2"><i data-lucide="message-circle" class="w-4 h-4 text-green-500"></i> WhatsApp</a>
                </div>
            </div>

            <div class="p-6 overflow-y-auto max-h-[80vh] no-scrollbar">
                
                <div class="bg-slate-900 text-white p-5 rounded-xl shadow-lg border border-slate-700 mb-6">
                    <div class="flex justify-between items-center mb-4">
                        <h4 class="font-bold flex items-center gap-2"><i data-lucide="calculator" class="w-4 h-4 text-emerald-400"></i> Weight Calc</h4>
                        <span class="text-[10px] bg-slate-800 px-2 py-1 rounded text-emerald-400 font-mono border border-slate-600">Density: ${currentDensity}</span>
                    </div>

                    <div class="flex gap-1 mb-4 bg-slate-800 p-1 rounded-lg">
                        <button onclick="switchTab('sheet')" class="calc-tab flex-1 py-1 text-xs font-bold rounded ${currentCalcMode === 'sheet' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Sheet</button>
                        <button onclick="switchTab('pipe')" class="calc-tab flex-1 py-1 text-xs font-bold rounded ${currentCalcMode === 'pipe' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Pipe</button>
                        <button onclick="switchTab('bar')" class="calc-tab flex-1 py-1 text-xs font-bold rounded ${currentCalcMode === 'bar' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Bar</button>
                        <button onclick="switchTab('coil')" class="calc-tab flex-1 py-1 text-xs font-bold rounded ${currentCalcMode === 'coil' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}">Coil</button>
                    </div>

                    <div id="calc-inputs" class="space-y-3">
                        </div>

                    <div class="flex justify-between items-end border-t border-slate-700 pt-3 mt-3">
                        <span class="text-slate-400 text-xs" id="calc-formula">Formula: L x W x T x Density</span>
                        <span id="calc-output" class="text-2xl font-bold text-emerald-400">0.00 kg</span>
                    </div>
                </div>

                <div class="space-y-4">
                    <div>
                        <h4 class="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider border-b border-slate-200 pb-1">Standards & Range</h4>
                        <div class="text-sm text-slate-600 grid grid-cols-2 gap-2">
                            <div><span class="font-bold">Std:</span> ${p.specs?.standards?.join(", ") || '-'}</div>
                            <div><span class="font-bold">Size:</span> ${p.specs?.range || '-'}</div>
                        </div>
                    </div>
                    <div>
                        <h4 class="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider border-b border-slate-200 pb-1">Chemical Composition</h4>
                        <div class="text-sm space-y-1">${chemRows}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.classList.add('active'), 10);
    
    // Initialize the correct tab inputs immediately
    switchTab(currentCalcMode);
    lucide.createIcons();
}

// Switch Tab Logic
function switchTab(mode) {
    currentCalcMode = mode;
    const container = document.getElementById('calc-inputs');
    const formulaDisplay = document.getElementById('calc-formula');
    
    // Update Tab UI
    document.querySelectorAll('.calc-tab').forEach(btn => {
        if(btn.innerText.toLowerCase() === mode) {
            btn.className = 'calc-tab flex-1 py-1 text-xs font-bold rounded bg-emerald-600 text-white transition-all';
        } else {
            btn.className = 'calc-tab flex-1 py-1 text-xs font-bold rounded text-slate-400 hover:text-white transition-all';
        }
    });

    // Inject Inputs based on Mode
    if (mode === 'sheet') {
        container.innerHTML = `
            <div class="grid grid-cols-3 gap-2">
                <input type="number" id="c-l" placeholder="Length (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
                <input type="number" id="c-w" placeholder="Width (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
                <input type="number" id="c-t" placeholder="Thk (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
            </div>
            <input type="number" id="c-qty" placeholder="Quantity (Nos)" value="1" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
        `;
        formulaDisplay.innerText = "Weight = L × W × T × Density / 10⁶";
    } 
    else if (mode === 'pipe') {
        container.innerHTML = `
            <div class="grid grid-cols-2 gap-2">
                <input type="number" id="c-od" placeholder="Outer Dia (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
                <input type="number" id="c-wt" placeholder="Wall Thk (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
            </div>
            <div class="grid grid-cols-2 gap-2">
                <input type="number" id="c-l" placeholder="Length (Meter)" value="6" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
                <input type="number" id="c-qty" placeholder="Quantity" value="1" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
            </div>
        `;
        formulaDisplay.innerText = "Weight = (OD-WT) × WT × 0.02466 × Density Factor × L";
    } 
    else if (mode === 'bar') {
        container.innerHTML = `
            <div class="grid grid-cols-2 gap-2">
                <input type="number" id="c-dia" placeholder="Diameter (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
                <input type="number" id="c-l" placeholder="Length (Meter)" value="1" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
            </div>
            <input type="number" id="c-qty" placeholder="Quantity (Nos)" value="1" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
        `;
        formulaDisplay.innerText = "Weight = Dia² × 0.000785 × Density × L";
    }
    else if (mode === 'coil') {
        container.innerHTML = `
            <div class="grid grid-cols-2 gap-2">
                <input type="number" id="c-w" placeholder="Width (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
                <input type="number" id="c-t" placeholder="Thickness (mm)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
            </div>
            <input type="number" id="c-l" placeholder="Length (Meter)" class="bg-slate-800 border border-slate-600 rounded p-2 text-sm text-white w-full" oninput="runCalc()">
        `;
        formulaDisplay.innerText = "Weight = W × T × L × Density / 1000";
    }
    runCalc();
}

// Calculation Logic
const calcHistory = []; // Capped at 10 entries

function runCalc() {
    let weight = 0;
    const qty = parseFloat(document.getElementById('c-qty')?.value) || 1;
    let formula = '';
    let params = {};
    
    if (currentCalcMode === 'sheet') {
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        const w = parseFloat(document.getElementById('c-w')?.value) || 0;
        const t = parseFloat(document.getElementById('c-t')?.value) || 0;
        // Formula: L(mm) * W(mm) * T(mm) * Density / 1,000,000
        weight = (l * w * t * currentDensity / 1000000);
        formula = `${l} × ${w} × ${t} × ${currentDensity} ÷ 1,000,000`;
        params = { length: l, width: w, thickness: t, qty, type: 'Sheet' };
    }
    else if (currentCalcMode === 'pipe') {
        const od = parseFloat(document.getElementById('c-od')?.value) || 0;
        const wt = parseFloat(document.getElementById('c-wt')?.value) || 0;
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        if (od > wt) {
            // Factor 0.02466 is for Carbon Steel (7.85). Adjust for current density.
            const densityFactor = currentDensity / 7.85;
            weight = (od - wt) * wt * 0.02466 * densityFactor * l;
            formula = `(${od} - ${wt}) × ${wt} × 0.02466 × ${densityFactor.toFixed(4)} × ${l}`;
            params = { outerDia: od, wallThickness: wt, length: l, qty, type: 'Pipe' };
        }
    }
    else if (currentCalcMode === 'bar') {
        const dia = parseFloat(document.getElementById('c-dia')?.value) || 0;
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        const radCm = dia / 20;
        const vol = (Math.PI * radCm * radCm) * (l * 100);
        weight = (vol * currentDensity) / 1000;
        formula = `π × (${dia}/2)² × ${l} × ${currentDensity} ÷ 10`;
        params = { diameter: dia, length: l, qty, type: 'Bar' };
    }
    else if (currentCalcMode === 'coil') {
        const w = parseFloat(document.getElementById('c-w')?.value) || 0;
        const t = parseFloat(document.getElementById('c-t')?.value) || 0;
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        // Width(mm) * Thk(mm) * Len(m) * Density / 1000
        weight = (w * t * l * currentDensity / 1000);
        formula = `${w} × ${t} × ${l} × ${currentDensity} ÷ 1,000`;
        params = { width: w, thickness: t, length: l, qty, type: 'Coil' };
    }

    weight = weight * qty;
    const output = document.getElementById('calc-output');
    if (output) {
        output.innerText = weight > 0 ? weight.toFixed(2) + " kg" : "0.00 kg";
        
        // Remove old export button if any
        const oldBtn = document.getElementById('calc-export');
        if (oldBtn) oldBtn.remove();
        
        if (weight > 0) {
            if (calcHistory.length >= 10) calcHistory.shift();
            calcHistory.push({
                timestamp: new Date().toLocaleString(),
                params,
                weight: weight.toFixed(2),
                formula
            });
            
            const exportBtn = document.createElement('button');
            exportBtn.id = 'calc-export';
            exportBtn.className = 'mt-2 text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded transition-all block w-fit shadow-md';
            exportBtn.innerHTML = '📋 Copy Result';
            exportBtn.onclick = exportCalcResult;
            output.parentElement.appendChild(exportBtn);
        }
    }
}

function exportCalcResult() {
    const last = calcHistory[calcHistory.length - 1];
    if (!last) return;
    
    const text = `
TATVAM OVERSEAS INC - Weight Calculation
=====================================
Date: ${last.timestamp}
Type: ${last.params.type}
Formula: ${last.formula}
Result: ${last.weight} kg
Density: ${currentDensity} g/cm³

Parameters:
${JSON.stringify(last.params, null, 2)}

---
Contact: sales@tatvamoverseasinc.com | +91 9082834775
    `.trim();
    
    navigator.clipboard.writeText(text).then(() => {
        alert('✅ Calculation copied to clipboard!');
    }).catch(() => {
        // Fallback
        const textarea = document.createElement('textarea');
        textarea.value = text;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
        alert('✅ Calculation copied!');
    });
}
// Smart Search with Autocomplete & Fuzzy Matching
function initSmartSearch() {
    const searchInput = document.getElementById('search-input');
    if (!searchInput || typeof products === 'undefined') return;
    
    // Create autocomplete container
    const autocomplete = document.createElement('div');
    autocomplete.id = 'autocomplete';
    autocomplete.className = 'absolute top-full left-0 right-0 bg-white border border-slate-300 rounded-b-lg shadow-xl z-50 max-h-96 overflow-y-auto hidden';
    searchInput.parentElement.appendChild(autocomplete);
    
    // Build search index
    const searchIndex = products.map(p => ({
        id: p.id,
        text: `${p.grade} ${p.description} ${p.category} ${p.department}`.toLowerCase(),
        grade: p.grade,
        category: p.category,
        image: getProductImage(p)
    }));
    
    let debounceTimer;
    searchInput.addEventListener('input', (e) => {
        clearTimeout(debounceTimer);
        const query = e.target.value.toLowerCase().trim();
        
        if (query.length < 2) {
            autocomplete.classList.add('hidden');
            return;
        }
        
        debounceTimer = setTimeout(() => {
            // Fuzzy search
            const results = searchIndex
                .map(item => {
                    const score = fuzzyScore(query, item.text);
                    return { ...item, score };
                })
                .filter(item => item.score > 0.3)
                .sort((a, b) => b.score - a.score)
                .slice(0, 5);
            
            if (results.length === 0) {
                autocomplete.innerHTML = '<div class="p-4 text-slate-400 text-sm text-center">No matches found</div>';
                autocomplete.classList.remove('hidden');
                return;
            }
            
            autocomplete.innerHTML = results.map(r => `
                <div class="flex items-center gap-3 p-3 hover:bg-slate-50 cursor-pointer border-b last:border-0" 
                     onclick="selectSearchResult('${r.id}')">
                    <img src="${r.image}" class="w-12 h-12 object-cover rounded" alt="${r.grade}">
                    <div class="flex-1">
                        <div class="font-bold text-sm text-slate-900">${r.grade}</div>
                        <div class="text-xs text-slate-500">${r.category}</div>
                    </div>
                    <i data-lucide="arrow-right" class="w-4 h-4 text-slate-400"></i>
                </div>
            `).join('');
            
            autocomplete.classList.remove('hidden');
            lucide.createIcons();
        }, 300);
    });
    
    // Close on outside click
    document.addEventListener('click', (e) => {
        if (!searchInput.contains(e.target) && !autocomplete.contains(e.target)) {
            autocomplete.classList.add('hidden');
        }
    });
}

function fuzzyScore(query, text) {
    // Simple fuzzy matching algorithm
    let score = 0;
    let queryIndex = 0;
    
    for (let i = 0; i < text.length && queryIndex < query.length; i++) {
        if (text[i] === query[queryIndex]) {
            score += 1;
            queryIndex++;
        }
    }
    
    // Boost exact substring matches
    if (text.includes(query)) score += query.length;
    
    return score / Math.max(query.length, text.length);
}

function selectSearchResult(id) {
    document.getElementById('autocomplete')?.classList.add('hidden');
    openProductModal(id);
}

// initSmartSearch is called from the main DOMContentLoaded handler above

function openBlogModal(id) {
    try {
        if (typeof blogs === 'undefined') return;
        const post = blogs.find(b => b.id === id);
        if (!post) return;
        
        const modal = document.getElementById('common-modal');
        const body = document.getElementById('modal-body');
        
        if (!modal || !body) return;
        
        // Remove old width constraints if any and apply new modal styles
        const modalContent = modal.querySelector('.modal-content');
        if (modalContent) {
            modalContent.className = 'modal-content relative w-[95%] max-w-4xl max-h-[90vh] flex flex-col bg-slate-50 rounded-2xl overflow-hidden shadow-2xl';
        }
        
        const style = typeof getCategoryStyle === 'function' ? getCategoryStyle(post.category) : {bg: 'bg-emerald-100', text: 'text-emerald-700'};
        const authorHtml = typeof blogAuthor === 'function' ? blogAuthor(post.date, post.readingTime || '5 min read') : '';
        const ctaHtml = typeof blogCTA === 'function' ? blogCTA() : '';
        const relatedHtml = typeof relatedPostsHTML === 'function' && post.relatedIds ? relatedPostsHTML(post.relatedIds) : '';

        body.className = "flex flex-col h-full overflow-y-auto no-scrollbar relative";
        
        // Generate the TOC dynamically from content structure if applicable, or just let content handle it
        
        body.innerHTML = `
            <!-- Cover Header -->
            <div class="relative h-[250px] md:h-[400px] shrink-0 w-full overflow-hidden">
                <img src="${post.coverImage || post.image}" class="absolute inset-0 w-full h-full object-cover" alt="${escapeHtml(post.title)}">
                <div class="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/60 to-transparent"></div>

                <div class="absolute bottom-0 left-0 w-full p-6 md:p-12 text-white">
                    <nav class="flex text-[10px] md:text-xs font-bold uppercase tracking-wider text-emerald-400 mb-4" aria-label="Breadcrumb">
                        <ol class="inline-flex items-center space-x-1 md:space-x-2">
                            <li class="inline-flex items-center"><a href="blog.html" class="hover:text-white transition-colors flex items-center gap-1"><i data-lucide="home" class="w-3 h-3"></i> Knowledge Base</a></li>
                            <li><span class="mx-1 text-slate-500">/</span></li>
                            <li><span class="hover:text-white transition-colors cursor-pointer" onclick="closeModal(); filterBlogs('${post.category}')">${escapeHtml(post.category)}</span></li>
                        </ol>
                    </nav>
                    <h1 class="text-3xl md:text-5xl font-black mb-4 leading-tight">${escapeHtml(post.title)}</h1>
                    <div class="flex items-center gap-4 text-xs md:text-sm text-slate-300 font-medium">
                        <span class="flex items-center gap-1"><i data-lucide="calendar" class="w-4 h-4"></i> ${escapeHtml(post.date)}</span>
                        <span class="w-1 h-1 rounded-full bg-slate-500"></span>
                        <span class="flex items-center gap-1"><i data-lucide="clock" class="w-4 h-4"></i> ${escapeHtml(post.readingTime || '5 min read')}</span>
                    </div>
                </div>
            </div>

            <!-- Content Area -->
            <div class="bg-slate-50 p-6 md:p-12 flex-grow">
                <div class="max-w-3xl mx-auto">
                    ${authorHtml}
                    
                    <div class="prose prose-slate prose-emerald max-w-none 
                        prose-headings:font-black prose-headings:tracking-tight 
                        prose-h2:text-2xl md:prose-h2:text-3xl prose-h2:mt-10 prose-h2:mb-4 prose-h2:text-slate-900
                        prose-h3:text-xl md:prose-h3:text-2xl prose-h3:mt-8 prose-h3:mb-3 prose-h3:text-slate-800
                        prose-p:leading-relaxed prose-p:text-slate-600 prose-p:mb-6
                        prose-ul:my-6 prose-li:text-slate-600
                        prose-a:text-emerald-600 prose-a:font-bold prose-a:no-underline hover:prose-a:underline
                        prose-strong:text-slate-900
                        prose-table:overflow-x-auto prose-table:block md:prose-table:table prose-table:w-full prose-table:border-collapse
                        prose-th:bg-slate-900 prose-th:text-white prose-th:p-3 prose-th:text-left prose-th:text-sm
                        prose-td:p-3 prose-td:border-b prose-td:border-slate-200 prose-td:text-sm prose-td:text-slate-700
                        marker:text-emerald-500 prose-blockquote:border-l-4 prose-blockquote:border-emerald-500 prose-blockquote:bg-emerald-50/50 prose-blockquote:p-4 prose-blockquote:italic">
                        ${post.content}
                    </div>
                    
                    ${ctaHtml}
                    ${relatedHtml}
                </div>
            </div>
        `;
        
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => modal.classList.add('active'), 10);
        
        if (typeof lucide !== 'undefined') lucide.createIcons();
        
    } catch (error) {
        console.error('Error opening blog modal:', error);
    }
}
function closeModal() {
const modal = document.getElementById('common-modal');
if (!modal) return;
modal.classList.remove('active');
setTimeout(() => {
    modal.classList.remove('flex');
    modal.classList.add('hidden');
}, 300);
}
// Close modal on outside click
document.getElementById('common-modal')?.addEventListener('click', (e) => {
if (e.target === document.getElementById('common-modal')) {
closeModal();
}
});
// Note: Mobile menu toggle is handled by js/components.js renderHeader()
// If pages use static HTML header instead, this is a fallback:
document.addEventListener('DOMContentLoaded', () => {
    const mobileBtn = document.getElementById('mobile-menu-button');
    if (mobileBtn && !mobileBtn._componentsBound) {
        mobileBtn.addEventListener('click', function() {
            const menu = document.getElementById('mobile-menu');
            if (menu) {
                menu.classList.toggle('hidden');
                this.setAttribute('aria-expanded', String(!menu.classList.contains('hidden')));
            }
        });
    }
});
// Back to top button
window.addEventListener('scroll', function() {
const backToTop = document.getElementById('backToTop');
if (backToTop) {
if (window.scrollY > 500) {
backToTop.classList.remove('opacity-0', 'pointer-events-none');
} else {
backToTop.classList.add('opacity-0', 'pointer-events-none');
}
}
});

function initNewsletterInterceptor() {
    // Newsletter form is now handled by components.js via #newsletter-form ID.
    // This function is kept as a no-op for backward compatibility.
}

// ============================================================================
// EXIT INTENT CAPTURE — initialized with 5s delay on homepage
// ============================================================================
class ExitIntentCapture {
    constructor() {
        this.triggered = false;
        this.init();
    }

    init() {
        if (sessionStorage.getItem('exitIntentShown')) return;
        if (window.innerWidth < 768) return;

        document.addEventListener('mouseleave', (e) => {
            if (e.clientY <= 0 && !this.triggered) this.show();
        });
        window.addEventListener('popstate', () => {
            if (!this.triggered) this.show();
        });
    }

    show() {
        this.triggered = true;
        sessionStorage.setItem('exitIntentShown', 'true');

        const overlay = document.createElement('div');
        overlay.id = 'exit-intent-modal';
        overlay.className = 'fixed inset-0 bg-black/80 backdrop-blur-sm z-[99999] flex items-center justify-center';
        overlay.innerHTML = `
            <div class="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 p-8 relative border-2 border-emerald-500">
                <button onclick="this.closest('#exit-intent-modal').remove()"
                        class="absolute top-4 right-4 text-slate-400 hover:text-white text-2xl">&times;</button>
                <div class="text-center mb-6">
                    <div class="inline-block p-4 bg-emerald-500/20 rounded-full mb-4">
                        <i data-lucide="alert-circle" class="w-12 h-12 text-emerald-400"></i>
                    </div>
                    <h2 class="text-3xl font-black mb-2">Wait! Don't Leave Empty-Handed</h2>
                    <p class="text-slate-300 text-lg">Get instant access to our <strong>2025 Steel Price List</strong> + <strong>Grade Selection Guide</strong></p>
                </div>
                <div class="bg-slate-800/50 rounded-xl p-6 mb-6">
                    <ul class="space-y-3 text-sm">
                        <li class="flex items-start gap-3"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i><span><strong>Live Pricing:</strong> Updated SS 304/316/Inconel rates</span></li>
                        <li class="flex items-start gap-3"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i><span><strong>Grade Comparison Chart:</strong> Which steel for your application?</span></li>
                        <li class="flex items-start gap-3"><i data-lucide="check-circle" class="w-5 h-5 text-emerald-400 shrink-0 mt-0.5"></i><span><strong>Weight Calculator Excel:</strong> Automated calculation tool</span></li>
                    </ul>
                </div>
                <form id="exit-form" class="space-y-4">
                    <input type="hidden" name="access_key" value="e65ddd09-27a6-4380-aef9-4f4465c4449f">
                    <input type="hidden" name="subject" value="Exit Intent - Price List Request">
                    <input type="checkbox" name="botcheck" class="hidden">
                    <div class="grid md:grid-cols-2 gap-4">
                        <input type="text" name="name" required placeholder="Your Name" class="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none w-full">
                        <input type="email" name="email" required placeholder="Work Email" class="bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none w-full">
                    </div>
                    <input type="tel" name="phone" placeholder="Phone (Optional)" class="w-full bg-slate-700 border border-slate-600 rounded-lg px-4 py-3 text-white placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none">
                    <button type="submit" class="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-lg transition-all shadow-lg flex items-center justify-center gap-2">
                        <i data-lucide="download" class="w-5 h-5"></i> Send Me The Price List (FREE)
                    </button>
                    <p class="text-xs text-slate-400 text-center">No spam. Unsubscribe anytime.</p>
                </form>
                <div id="exit-success" class="hidden text-center py-8">
                    <div class="inline-block p-4 bg-emerald-500/20 rounded-full mb-4">
                        <i data-lucide="check-circle" class="w-16 h-16 text-emerald-400"></i>
                    </div>
                    <h3 class="text-2xl font-bold mb-2">Inquiry Received</h3>
                    <p class="text-slate-300 text-sm mb-4">Our sales team will email you a customized price list shortly.</p>
                    <div class="flex flex-col sm:flex-row gap-3 justify-center items-center">
                        <a href="assets/TatvamOverseasInc_Catalog_2025.pdf" download class="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-6 py-3 rounded-lg text-sm transition-all flex items-center justify-center gap-2 shadow-lg">
                            <i data-lucide="download" class="w-4 h-4"></i> Download Full Catalog
                        </a>
                        <button onclick="this.closest('#exit-intent-modal').remove()" class="w-full sm:w-auto bg-slate-700 hover:bg-slate-600 px-6 py-3 rounded-lg text-sm transition-all">Close</button>
                    </div>
                </div>
            </div>
        `;

        document.body.appendChild(overlay);
        if (typeof lucide !== 'undefined') lucide.createIcons();

        const form = document.getElementById('exit-form');
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = form.querySelector('button');
            btn.disabled = true;
            btn.innerHTML = '<i data-lucide="loader-2" class="w-5 h-5 animate-spin mx-auto"></i>';
            if (typeof lucide !== 'undefined') lucide.createIcons();
            try {
                const res = await fetch('https://api.web3forms.com/submit', { method: 'POST', body: new FormData(form) });
                if (res.ok) {
                    form.classList.add('hidden');
                    document.getElementById('exit-success').classList.remove('hidden');
                    if (typeof lucide !== 'undefined') lucide.createIcons();
                    if (typeof gtag !== 'undefined') gtag('event', 'lead_capture', { event_category: 'Exit Intent', event_label: 'Price List Download' });
                }
            } catch {
                alert('Something went wrong. Please email us at sales@tatvamoverseasinc.com');
            }
        });

        overlay.addEventListener('click', (e) => { if (e.target === overlay) overlay.remove(); });
    }
}

function initExitIntent() {
    setTimeout(() => new ExitIntentCapture(), 5000);
}

