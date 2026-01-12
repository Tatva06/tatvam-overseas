// ============================================================================
// TATVAM OVERSEAS - CORE SCRIPT (CORRECTED & CONSOLIDATED)
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
// 3. UNIVERSAL FLOATING WIDGET (Chat + Top + Language)
// ============================================================================
function initChatWidget() {
    if(document.getElementById('floating-widgets')) return;
    
    const container = document.createElement('div');
    container.id = 'floating-widgets';
    container.className = 'fixed bottom-6 right-6 z-50 flex flex-col gap-3 items-end';
    
    // 1. Google Translate Widget (Hidden until toggled)
    const langDiv = document.createElement('div');
    langDiv.id = 'google_translate_element';
    langDiv.className = 'bg-white p-2 rounded-lg shadow-xl border border-slate-200 hidden mb-2';
    
    // 2. Chat Options (Hidden by default)
    const chatOpts = `
        <div id="chat-options" class="hidden flex-col gap-3 transition-all duration-300 origin-bottom-right scale-0 opacity-0 mb-2">
            <button onclick="toggleTranslate()" class="flex items-center gap-3 bg-white text-slate-800 p-3 rounded-full shadow-xl hover:bg-slate-50 border border-slate-100">
                <span class="text-xs font-bold mr-1">Language</span>
                <div class="w-8 h-8 bg-indigo-600 rounded-full flex items-center justify-center text-white"><i data-lucide="languages" class="w-4 h-4"></i></div>
            </button>
            <a href="mtc.html" class="flex items-center gap-3 bg-white text-slate-800 p-3 rounded-full shadow-xl hover:bg-slate-50 border border-slate-100">
                <span class="text-xs font-bold mr-1">Verify MTC</span>
                <div class="w-8 h-8 bg-amber-500 rounded-full flex items-center justify-center text-white"><i data-lucide="file-check" class="w-4 h-4"></i></div>
            </a>
            <a href="https://wa.me/919869607960" target="_blank" class="flex items-center gap-3 bg-white text-slate-800 p-3 rounded-full shadow-xl hover:bg-slate-50 border border-slate-100">
                <span class="text-xs font-bold mr-1">WhatsApp</span>
                <div class="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center text-white"><i data-lucide="message-circle" class="w-5 h-5"></i></div>
            </a>
        </div>
    `;

    // 3. Main Button
    const mainBtn = `
        <button id="chat-toggle" class="bg-emerald-600 text-white p-4 rounded-full shadow-2xl hover:scale-110 transition-transform flex items-center justify-center border-4 border-white ring-2 ring-emerald-100 group" aria-label="Menu">
            <i data-lucide="plus" class="w-6 h-6 transition-transform group-hover:rotate-90"></i>
        </button>
    `;

    container.innerHTML = chatOpts + mainBtn;
    container.prepend(langDiv); // Add translate div at top
    document.body.appendChild(container);
    
    // Inject Google Translate Script dynamically
    const script = document.createElement('script');
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    document.body.appendChild(script);

    // Toggle Logic
    const toggle = document.getElementById('chat-toggle');
    const options = document.getElementById('chat-options');
    let isOpen = false;

    toggle.addEventListener('click', () => {
        isOpen = !isOpen;
        const icon = toggle.querySelector('i');
        if(isOpen) {
            options.classList.remove('hidden', 'scale-0', 'opacity-0');
            options.classList.add('flex', 'scale-100', 'opacity-100');
            icon.setAttribute('data-lucide', 'x');
            toggle.classList.replace('bg-emerald-600', 'bg-slate-800');
        } else {
            options.classList.remove('scale-100', 'opacity-100');
            options.classList.add('scale-0', 'opacity-0');
            setTimeout(() => options.classList.add('hidden'), 200);
            icon.setAttribute('data-lucide', 'plus');
            toggle.classList.replace('bg-slate-800', 'bg-emerald-600');
            // Hide translate if open
            document.getElementById('google_translate_element').classList.add('hidden');
        }
        lucide.createIcons();
    });
    
    lucide.createIcons();
}

// Global function for Google Translate
window.googleTranslateElementInit = function() {
    new google.translate.TranslateElement({pageLanguage: 'en', layout: google.translate.TranslateElement.InlineLayout.SIMPLE}, 'google_translate_element');
}

window.toggleTranslate = function() {
    const el = document.getElementById('google_translate_element');
    el.classList.toggle('hidden');
}

// 5. RENDER HELPERS
function renderInventory(container, data) {
    if (!container || !data) return;
    
    container.innerHTML = data.map(p => `
        <div class="bg-white rounded-xl border hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer overflow-hidden" onclick="openProductModal('${p.id}')">
            <div class="h-48 bg-slate-100 relative">
                <img src="${p.image}" class="w-full h-full object-cover" loading="lazy" alt="${escapeHtml(p.grade)}">
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
                <img src="${p.image}" class="w-full h-56 object-cover rounded-lg shadow-md mb-4">
                <h2 class="text-2xl font-black text-slate-900 mb-1">${p.grade}</h2>
                <span class="inline-block bg-emerald-100 text-emerald-800 text-xs font-bold px-2 py-1 rounded mb-4 w-fit">${p.department}</span>
                <p class="text-sm text-slate-600 leading-relaxed mb-6 flex-grow">${p.description}</p>
                <div class="flex gap-3 mt-auto">
                    <a href="contact.html" class="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-3 rounded text-center transition-colors text-sm shadow-md">Get Quote</a>
                    <a href="https://wa.me/919869607960?text=Inquiry%20for%20${p.grade}" target="_blank" class="flex-1 bg-white border border-slate-300 text-slate-700 font-bold py-3 rounded text-center transition-colors text-sm flex items-center justify-center gap-2"><i data-lucide="message-circle" class="w-4 h-4 text-green-500"></i> WhatsApp</a>
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
function runCalc() {
    let weight = 0;
    const qty = parseFloat(document.getElementById('c-qty')?.value) || 1;
    
    if (currentCalcMode === 'sheet') {
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        const w = parseFloat(document.getElementById('c-w')?.value) || 0;
        const t = parseFloat(document.getElementById('c-t')?.value) || 0;
        // Formula: L(mm) * W(mm) * T(mm) * Density / 1,000,000
        weight = (l * w * t * currentDensity / 1000000);
    }
    else if (currentCalcMode === 'pipe') {
        const od = parseFloat(document.getElementById('c-od')?.value) || 0;
        const wt = parseFloat(document.getElementById('c-wt')?.value) || 0;
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        if (od > wt) {
            // Factor 0.02466 is for Carbon Steel (7.85). Adjust for current density.
            const densityFactor = currentDensity / 7.85;
            weight = (od - wt) * wt * 0.02466 * densityFactor * l;
        }
    }
    else if (currentCalcMode === 'bar') {
        const dia = parseFloat(document.getElementById('c-dia')?.value) || 0;
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        // Formula: Dia^2 * 0.0007854 * Density * Length
        // Standard Factor 0.006165 is for 7.85 density per meter. 
        // Let's use pure volume: Area * Length * Density
        // Area (cm2) = (Dia/20)^2 * 3.14159
        // Vol (cm3) = Area * (L*100)
        // Wt = Vol * Density / 1000
        const radCm = dia / 20;
        const vol = (Math.PI * radCm * radCm) * (l * 100);
        weight = (vol * currentDensity) / 1000;
    }
    else if (currentCalcMode === 'coil') {
        const w = parseFloat(document.getElementById('c-w')?.value) || 0;
        const t = parseFloat(document.getElementById('c-t')?.value) || 0;
        const l = parseFloat(document.getElementById('c-l')?.value) || 0;
        // Width(mm) * Thk(mm) * Len(m) * Density / 1000
        weight = (w * t * l * currentDensity / 1000);
    }

    weight = weight * qty;
    document.getElementById('calc-output').innerText = weight > 0 ? weight.toFixed(2) + " kg" : "0.00 kg";
}
// Enhanced Calculator with History & Export
const calcHistory = [];

function runCalc(type) {
    try {
        const density = currentDensity;
        let weight = 0;
        let formula = '';
        let params = {};
        
        if (type === 'pipe') {
            const od = parseFloat(document.getElementById('calc-od')?.value) || 0;
            const thk = parseFloat(document.getElementById('calc-thk')?.value) || 0;
            const len = parseFloat(document.getElementById('calc-len')?.value) || 0;
            
            if (od > thk && od > 0 && thk > 0 && len > 0) {
                weight = (od - thk) * thk * 0.0246615 * density * len;
                formula = `(${od} - ${thk}) × ${thk} × 0.0246615 × ${density} × ${len}`;
                params = { od, thk, len, type: 'Pipe' };
            }
        } else if (type === 'rod') {
            const dia = parseFloat(document.getElementById('calc-dia')?.value) || 0;
            const len = parseFloat(document.getElementById('calc-len')?.value) || 0;
            
            if (dia > 0 && len > 0) {
                weight = dia * dia * 0.0007854 * density * len;
                formula = `${dia}² × 0.0007854 × ${density} × ${len}`;
                params = { dia, len, type: 'Rod' };
            }
        } else if (type === 'plate') {
            const l = parseFloat(document.getElementById('calc-l')?.value) || 0;
            const w = parseFloat(document.getElementById('calc-w')?.value) || 0;
            const t = parseFloat(document.getElementById('calc-t')?.value) || 0;
            
            if (l > 0 && w > 0 && t > 0) {
                weight = (l * w * t * density) / 1000000;
                formula = `${l} × ${w} × ${t} × ${density} ÷ 1,000,000`;
                params = { l, w, t, type: 'Plate' };
            }
        }

        const output = document.getElementById('calc-output');
        if (output) {
            output.textContent = weight > 0 ? weight.toFixed(2) + ' kg' : '0.00 kg';
            
            // Add to history
            if (weight > 0) {
                calcHistory.push({
                    timestamp: new Date().toLocaleString(),
                    type,
                    params,
                    weight: weight.toFixed(2),
                    formula
                });
                
                // Show export button if not exists
                if (!document.getElementById('calc-export')) {
                    const exportBtn = document.createElement('button');
                    exportBtn.id = 'calc-export';
                    exportBtn.className = 'mt-2 text-xs bg-slate-700 hover:bg-slate-600 px-3 py-1 rounded text-white';
                    exportBtn.innerHTML = '📋 Copy Result';
                    exportBtn.onclick = exportCalcResult;
                    output.parentElement.appendChild(exportBtn);
                }
            }
        }
    } catch (error) {
        console.error('Calculator error:', error);
    }
 if (weight > 0) {
           // Show export button
           const exportBtn = `
               <button onclick="exportCalcResult()" 
                       class="mt-2 text-xs bg-emerald-600 text-white 
                              px-3 py-1 rounded">
                   📋 Copy Result
               </button>
           `;
           document.getElementById('calc-output').parentElement
               .insertAdjacentHTML('beforeend', exportBtn);
       }}

function exportCalcResult() {
    const last = calcHistory[calcHistory.length - 1];
    if (!last) return;
    
    const text = `
TATVAM OVERSEAS - Weight Calculation
=====================================
Date: ${last.timestamp}
Type: ${last.params.type}
Formula: ${last.formula}
Result: ${last.weight} kg
Density: ${currentDensity} g/cm³

Parameters:
${JSON.stringify(last.params, null, 2)}

---
Contact: sales@tatvamoverseas.com | +91 9869607960
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
        image: p.image
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

// Initialize on page load
document.addEventListener('DOMContentLoaded', initSmartSearch);

function openBlogModal(id) {
try {
if (typeof blogs === 'undefined') return;
const post = blogs.find(b => b.id === id);
    if (!post) return;
    
    const modal = document.getElementById('common-modal');
    const body = document.getElementById('modal-body');
    
    if (!modal || !body) return;
    
    body.innerHTML = `
        <div class="p-8">
            <img src="${post.image}" class="w-full h-64 object-cover rounded-lg mb-6" alt="${escapeHtml(post.title)}">
            <div class="flex items-center gap-2 mb-4 text-sm text-slate-500">
                <span class="text-emerald-600 font-bold">${escapeHtml(post.category)}</span> • 
                <span>${escapeHtml(post.date)}</span>
            </div>
            <h2 class="text-3xl font-black text-slate-900 mb-6">${escapeHtml(post.title)}</h2>
            <div class="prose max-w-none">${post.content}</div>
        </div>
    `;
    
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    setTimeout(() => modal.classList.add('active'), 10);
    
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
// Mobile menu toggle
document.getElementById('mobile-menu-button')?.addEventListener('click', function() {
const menu = document.getElementById('mobile-menu');
if (menu) {
menu.classList.toggle('hidden');
this.setAttribute('aria-expanded', !menu.classList.contains('hidden'));
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
