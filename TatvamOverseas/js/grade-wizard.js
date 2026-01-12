// ============================================================================
// ENHANCED GRADE WIZARD - 100+ RECOMMENDATIONS
// ============================================================================

const wizardQuestions = [
    {
        step: 1,
        question: "Where will the material be used?",
        options: [
            { text: "Indoor (Dry Environment)", value: "indoor", icon: "home" },
            { text: "Outdoor (Rain/Weather)", value: "outdoor", icon: "cloud-rain" },
            { text: "Coastal/Marine (Salt Spray)", value: "marine", icon: "anchor" },
            { text: "Chemical Plant/Factory", value: "chemical", icon: "flask" },
            { text: "Food/Pharmaceutical", value: "food", icon: "package" },
            { text: "Power Plant/Boiler", value: "power", icon: "zap" }
        ]
    },
    {
        step: 2,
        question: "What is the operating temperature?",
        options: [
            { text: "Room Temperature (20-50°C)", value: "normal", icon: "thermometer" },
            { text: "Moderate Heat (50-200°C)", value: "medium", icon: "sun" },
            { text: "High Temperature (200-550°C)", value: "high", icon: "flame" },
            { text: "Very High (550-850°C)", value: "veryhigh", icon: "fire" },
            { text: "Extreme Heat (850°C+)", value: "extreme", icon: "zap" },
            { text: "Cryogenic (Below -20°C)", value: "cryo", icon: "snowflake" }
        ]
    },
    {
        step: 3,
        question: "What type of product form do you need?",
        options: [
            { text: "Sheets/Plates (Flat)", value: "flat", icon: "square" },
            { text: "Pipes/Tubes (Round)", value: "pipe", icon: "circle" },
            { text: "Bars/Rods (Solid)", value: "bar", icon: "minus" },
            { text: "Fittings/Flanges", value: "fitting", icon: "git-branch" },
            { text: "Fasteners (Bolts/Nuts)", value: "fastener", icon: "anchor" }
        ]
    },
    {
        step: 4,
        question: "What is your budget priority?",
        options: [
            { text: "Economy (Most Affordable)", value: "economy", icon: "dollar-sign" },
            { text: "Balanced (Good Value)", value: "balanced", icon: "trending-up" },
            { text: "Premium (Best Performance)", value: "premium", icon: "award" },
            { text: "No Compromise (Top Quality)", value: "ultra", icon: "star" }
        ]
    }
];

let wizardState = {
    currentStep: 0,
    answers: {}
};

// COMPREHENSIVE RECOMMENDATION DATABASE (100+ combinations)
const gradeRecommendations = {
    // ==================== INDOOR + NORMAL TEMPERATURE ====================
    "indoor-normal-flat-economy": { grade: "SS 202", reason: "Cost-effective for indoor applications with minimal corrosion risk", alternatives: ["MS IS2062"] },
    "indoor-normal-flat-balanced": { grade: "SS 304", reason: "Industry standard for general indoor use with excellent formability", alternatives: ["SS 202", "SS 316"] },
    "indoor-normal-flat-premium": { grade: "SS 316L", reason: "Low-carbon grade prevents sensitization in welded structures", alternatives: ["SS 304L"] },
    "indoor-normal-flat-ultra": { grade: "SS 316Ti", reason: "Titanium-stabilized for critical applications requiring zero weld decay", alternatives: ["SS 321"] },
    
    "indoor-normal-pipe-economy": { grade: "MS A106 Gr.B", reason: "Most economical for non-corrosive water and air systems", alternatives: ["IS 1239"] },
    "indoor-normal-pipe-balanced": { grade: "SS 304 Seamless", reason: "Reliable for potable water and general fluid transport", alternatives: ["SS 316L"] },
    "indoor-normal-pipe-premium": { grade: "SS 316L Seamless", reason: "Superior corrosion resistance for pharmaceutical-grade fluids", alternatives: ["SS 904L"] },
    "indoor-normal-pipe-ultra": { grade: "Duplex 2205", reason: "Double strength allows reduced wall thickness and weight savings", alternatives: ["SS 316Ti"] },
    
    "indoor-normal-bar-economy": { grade: "MS Round Bar IS2062", reason: "General fabrication and structural use at lowest cost", alternatives: ["SS 202 Bar"] },
    "indoor-normal-bar-balanced": { grade: "SS 304 Round Bar", reason: "Excellent machinability for shafts and fasteners", alternatives: ["SS 316 Bar"] },
    "indoor-normal-bar-premium": { grade: "SS 316 Round Bar", reason: "Better corrosion resistance for precision components", alternatives: ["SS 17-4 PH"] },
    "indoor-normal-bar-ultra": { grade: "SS 17-4 PH Bar", reason: "Precipitation hardening steel for aerospace-grade strength", alternatives: ["Monel 400"] },
    
    "indoor-normal-fitting-balanced": { grade: "SS 304 Fittings", reason: "Standard grade for elbows, tees, and reducers", alternatives: ["SS 316 Fittings"] },
    "indoor-normal-fitting-premium": { grade: "SS 316L Fittings", reason: "Welded fittings with minimal sensitization risk", alternatives: ["Duplex 2205"] },
    
    "indoor-normal-fastener-economy": { grade: "MS Grade 8.8", reason: "High tensile carbon steel bolts for general use", alternatives: ["SS 202 A2-70"] },
    "indoor-normal-fastener-balanced": { grade: "SS 304 A2-70", reason: "Non-magnetic stainless bolts for food equipment", alternatives: ["SS 316 A4-80"] },
    "indoor-normal-fastener-premium": { grade: "SS 316 A4-80", reason: "Marine-grade fasteners with superior corrosion resistance", alternatives: ["Monel K-500"] },

    // ==================== OUTDOOR + NORMAL TEMPERATURE ====================
    "outdoor-normal-flat-economy": { grade: "SS 304", reason: "Minimum acceptable grade for outdoor weather exposure", alternatives: ["GI Sheet"] },
    "outdoor-normal-flat-balanced": { grade: "SS 316", reason: "Molybdenum addition prevents pitting from rain and pollution", alternatives: ["SS 304"] },
    "outdoor-normal-flat-premium": { grade: "SS 316L 2B", reason: "Low carbon prevents carbide precipitation in outdoor structures", alternatives: ["Duplex 2205"] },
    "outdoor-normal-flat-ultra": { grade: "Duplex 2205", reason: "High strength reduces thickness requirements for cladding", alternatives: ["Super Duplex 2507"] },
    
    "outdoor-normal-pipe-economy": { grade: "GI Pipe IS 1239", reason: "Galvanized coating provides temporary rust protection", alternatives: ["MS Black Pipe"] },
    "outdoor-normal-pipe-balanced": { grade: "SS 304 Pipe", reason: "Reliable for outdoor water lines and drainage", alternatives: ["SS 316 Pipe"] },
    "outdoor-normal-pipe-premium": { grade: "SS 316L Pipe", reason: "Essential for areas with industrial pollution or acid rain", alternatives: ["Duplex 2205"] },
    
    "outdoor-normal-bar-balanced": { grade: "SS 304 Round Bar", reason: "Outdoor railings and structural members", alternatives: ["SS 316 Bar"] },
    "outdoor-normal-bar-premium": { grade: "SS 316 Hex Bar", reason: "Machined outdoor components with corrosion resistance", alternatives: ["Duplex 2205 Bar"] },
    
    "outdoor-normal-fitting-balanced": { grade: "SS 316 Fittings", reason: "Outdoor piping joints resistant to atmospheric corrosion", alternatives: ["Duplex 2205"] },
    "outdoor-normal-fastener-balanced": { grade: "SS 316 A4-80", reason: "Weather-resistant bolts for outdoor structures", alternatives: ["Duplex Fasteners"] },

    // ==================== MARINE/COASTAL ENVIRONMENT ====================
    "marine-normal-flat-economy": { grade: "SS 316", reason: "Bare minimum for coastal areas, expect some staining", alternatives: ["SS 304 (Not Recommended)"] },
    "marine-normal-flat-balanced": { grade: "SS 316L", reason: "Industry standard for marine architecture and boat fittings", alternatives: ["Duplex 2205"] },
    "marine-normal-flat-premium": { grade: "Duplex 2205", reason: "Superior chloride resistance prevents pitting near seawater", alternatives: ["Super Duplex 2507"] },
    "marine-normal-flat-ultra": { grade: "Super Duplex 2507", reason: "Offshore oil rigs and desalination plants—ultimate marine grade", alternatives: ["6Mo (AL6XN)"] },
    
    "marine-normal-pipe-economy": { grade: "SS 316L Seamless", reason: "Minimum acceptable for marine cooling water systems", alternatives: ["Duplex 2205"] },
    "marine-normal-pipe-balanced": { grade: "Duplex 2205 Pipe", reason: "Standard for offshore platforms and shipboard piping", alternatives: ["Super Duplex 2507"] },
    "marine-normal-pipe-premium": { grade: "Super Duplex 2507", reason: "Subsea pipelines and saltwater injection lines", alternatives: ["Titanium Gr.2"] },
    "marine-normal-pipe-ultra": { grade: "Titanium Gr.2 Pipe", reason: "Ultimate seawater resistance—used in naval submarines", alternatives: ["CuNi 90/10"] },
    
    "marine-normal-bar-balanced": { grade: "Monel 400 Bar", reason: "Nickel-copper alloy for marine pump shafts", alternatives: ["SS 316 Bar"] },
    "marine-normal-bar-premium": { grade: "Duplex 2205 Round", reason: "High strength marine bolting material", alternatives: ["Super Duplex 2507"] },
    "marine-normal-bar-ultra": { grade: "Titanium Gr.5 Rod", reason: "Aerospace-grade marine components with maximum strength", alternatives: ["Monel K-500"] },
    
    "marine-normal-fitting-balanced": { grade: "Duplex 2205 Fittings", reason: "Offshore platform piping connections", alternatives: ["Super Duplex 2507"] },
    "marine-normal-fitting-premium": { grade: "Super Duplex 2507", reason: "Deepwater subsea fittings and manifolds", alternatives: ["Titanium Fittings"] },
    
    "marine-normal-fastener-balanced": { grade: "Duplex 2205 Bolts", reason: "Marine structural bolting with high tensile strength", alternatives: ["Super Duplex"] },
    "marine-normal-fastener-premium": { grade: "Monel K-500 Fasteners", reason: "Non-magnetic marine bolts for naval applications", alternatives: ["Titanium Bolts"] },

    // ==================== CHEMICAL PLANT ENVIRONMENT ====================
    "chemical-normal-flat-economy": { grade: "SS 316L", reason: "General chemical resistance for mild acids", alternatives: ["SS 904L"] },
    "chemical-normal-flat-balanced": { grade: "SS 904L", reason: "Super-austenitic for sulfuric and phosphoric acid service", alternatives: ["Hastelloy C-276"] },
    "chemical-normal-flat-premium": { grade: "Hastelloy C-276", reason: "Ultimate resistance to chlorine, HCl, and wet chlorine gas", alternatives: ["Titanium Gr.2"] },
    "chemical-normal-flat-ultra": { grade: "Titanium Gr.2", reason: "Non-reactive in almost all chemicals except HF and strong alkalis", alternatives: ["Zirconium"] },
    
    "chemical-normal-pipe-economy": { grade: "SS 316L Pipe", reason: "Chemical transfer lines for non-aggressive media", alternatives: ["SS 904L"] },
    "chemical-normal-pipe-balanced": { grade: "SS 904L Pipe", reason: "Pulp & paper bleaching lines and acid scrubbers", alternatives: ["Hastelloy C-276"] },
    "chemical-normal-pipe-premium": { grade: "Hastelloy C-276 Pipe", reason: "Chlorination systems and pesticide plants", alternatives: ["Titanium Gr.2"] },
    "chemical-normal-pipe-ultra": { grade: "Titanium Gr.2 Seamless", reason: "Ultimate chemical resistance for pharmaceutical reactors", alternatives: ["Tantalum"] },
    
    "chemical-normal-bar-balanced": { grade: "SS 904L Round Bar", reason: "Chemical pump shafts and impellers", alternatives: ["Hastelloy C-276"] },
    "chemical-normal-bar-premium": { grade: "Hastelloy C-276 Bar", reason: "Reactor stirrers and agitator shafts", alternatives: ["Titanium Gr.2"] },
    "chemical-normal-bar-ultra": { grade: "Titanium Gr.5 Bar", reason: "High-strength chemical processing equipment", alternatives: ["Hastelloy C-22"] },
    
    "chemical-normal-fitting-balanced": { grade: "SS 904L Fittings", reason: "Acid plant piping connections", alternatives: ["Hastelloy C-276"] },
    "chemical-normal-fitting-premium": { grade: "Hastelloy C-276 Fittings", reason: "Chlor-alkali plant and PVC production", alternatives: ["PTFE Lined"] },

    // ==================== FOOD & PHARMACEUTICAL ====================
    "food-normal-flat-economy": { grade: "SS 304 2B", reason: "FDA-approved food-grade stainless for dairy equipment", alternatives: ["SS 316L"] },
    "food-normal-flat-balanced": { grade: "SS 316L 2B", reason: "Higher corrosion resistance for acidic foods (ketchup, pickles)", alternatives: ["SS 304L"] },
    "food-normal-flat-premium": { grade: "SS 316L BA", reason: "Bright annealed finish prevents bacterial growth", alternatives: ["Electropolished 316L"] },
    "food-normal-flat-ultra": { grade: "SS 316L Electropolished", reason: "Pharmaceutical-grade with <0.5 Ra surface finish", alternatives: ["316L BA"] },
    
    "food-normal-pipe-economy": { grade: "SS 304 Sanitary Pipe", reason: "Dairy processing and beverage lines", alternatives: ["SS 316L"] },
    "food-normal-pipe-balanced": { grade: "SS 316L Sanitary", reason: "Food-grade piping with tri-clamp fittings", alternatives: ["SS 316L EP"] },
    "food-normal-pipe-premium": { grade: "SS 316L Electropolished", reason: "Pharmaceutical injectable manufacturing", alternatives: ["SS 316L BA"] },
    
    "food-normal-bar-balanced": { grade: "SS 316 Round Bar", reason: "Food processing machine shafts", alternatives: ["SS 304 Bar"] },
    "food-normal-fitting-balanced": { grade: "SS 316L Sanitary Fittings", reason: "Tri-clamp elbows and tees for food lines", alternatives: ["SS 304L Fittings"] },
    "food-normal-fastener-balanced": { grade: "SS 316 A4-80", reason: "Food-grade bolts meeting HACCP standards", alternatives: ["SS 304 A2-70"] },

    // ==================== POWER PLANT / BOILER ====================
    "power-medium-flat-economy": { grade: "MS IS 2062 Gr.B", reason: "Structural steel for boiler platforms and supports", alternatives: ["ASTM A516"] },
    "power-medium-flat-balanced": { grade: "ASTM A516 Gr.60/70", reason: "Boiler quality plates for pressure vessels", alternatives: ["A387 Gr.11"] },
    "power-medium-pipe-economy": { grade: "CS A106 Gr.B", reason: "Economizer and water walls in boilers", alternatives: ["IS 1239"] },
    "power-medium-pipe-balanced": { grade: "Alloy Steel P11", reason: "Superheater and reheater tubes (up to 550°C)", alternatives: ["P22"] },
    
    "power-high-pipe-economy": { grade: "Alloy Steel P11", reason: "Boiler steam lines at 510°C", alternatives: ["P22"] },
    "power-high-pipe-balanced": { grade: "Alloy Steel P22", reason: "High-pressure steam piping (550-600°C)", alternatives: ["P91"] },
    "power-high-pipe-premium": { grade: "Alloy Steel P91", reason: "Supercritical boilers with 9% chromium", alternatives: ["P92"] },
    "power-high-pipe-ultra": { grade: "Alloy Steel P92", reason: "Ultra-supercritical power plants (650°C)", alternatives: ["Inconel 625"] },
    
    "power-veryhigh-pipe-balanced": { grade: "SS 321H", reason: "Furnace tubes with titanium stabilization", alternatives: ["SS 347H"] },
    "power-veryhigh-pipe-premium": { grade: "Incoloy 800H", reason: "Heat treatment furnaces and reformer tubes", alternatives: ["SS 310S"] },
    "power-extreme-pipe-premium": { grade: "SS 310S", reason: "Furnace radiant tubes up to 1150°C", alternatives: ["Inconel 600"] },
    "power-extreme-pipe-ultra": { grade: "Inconel 600", reason: "Nuclear reactor vessels and heat exchangers", alternatives: ["Incoloy 800HT"] },

    // ==================== MODERATE HEAT (50-200°C) ====================
    "indoor-medium-flat-balanced": { grade: "SS 304H", reason: "Higher carbon for strength at elevated temperatures", alternatives: ["SS 321"] },
    "indoor-medium-pipe-balanced": { grade: "SS 321 Seamless", reason: "Titanium-stabilized for 425-850°C without sensitization", alternatives: ["SS 347"] },
    "outdoor-medium-pipe-balanced": { grade: "SS 321H", reason: "Exhaust systems and thermal piping", alternatives: ["Alloy P11"] },
    
    // ==================== HIGH HEAT (200-550°C) ====================
    "indoor-high-flat-economy": { grade: "SS 321", reason: "Industrial ovens and heat treatment fixtures", alternatives: ["SS 310S"] },
    "indoor-high-flat-balanced": { grade: "SS 310S", reason: "Furnace linings and burner components", alternatives: ["Incoloy 800"] },
    "indoor-high-pipe-balanced": { grade: "SS 321H Seamless", reason: "Heat exchanger tubes in refineries", alternatives: ["SS 347H"] },
    "indoor-high-pipe-premium": { grade: "Incoloy 800H", reason: "Petrochemical reformer tubes", alternatives: ["Inconel 600"] },
    
    // ==================== EXTREME HEAT (850°C+) ====================
    "indoor-extreme-flat-balanced": { grade: "SS 310S", reason: "Kiln furniture and ceramic industry fixtures", alternatives: ["Inconel 601"] },
    "indoor-extreme-flat-premium": { grade: "Inconel 600", reason: "Aerospace exhaust components", alternatives: ["Inconel 625"] },
    "indoor-extreme-pipe-balanced": { grade: "Inconel 600 Seamless", reason: "Jet engine exhaust ducting", alternatives: ["Inconel 625"] },
    "indoor-extreme-pipe-premium": { grade: "Inconel 625", reason: "Rocket motor components and turbine blades", alternatives: ["Haynes 230"] },
    
    // ==================== CRYOGENIC (Below -20°C) ====================
    "indoor-cryo-flat-balanced": { grade: "LTCS A333 Gr.6", reason: "Low-temperature carbon steel for LNG tanks", alternatives: ["SS 304L"] },
    "indoor-cryo-flat-premium": { grade: "SS 304L", reason: "Cryogenic storage vessels for liquid nitrogen", alternatives: ["SS 316L"] },
    "indoor-cryo-flat-ultra": { grade: "Aluminum 5083", reason: "Cryogenic aerospace tanks with extreme toughness", alternatives: ["9% Ni Steel"] },
    "indoor-cryo-pipe-balanced": { grade: "LTCS A333 Gr.6", reason: "LNG transfer lines tested at -45°C", alternatives: ["SS 304L"] },
    "indoor-cryo-pipe-premium": { grade: "SS 316L Seamless", reason: "Liquid oxygen and nitrogen piping", alternatives: ["Copper"] },
    
    // ==================== FASTENERS - SPECIAL APPLICATIONS ====================
    "marine-normal-fastener-ultra": { grade: "Titanium Grade 2 Bolts", reason: "Lightweight non-magnetic fasteners for naval vessels", alternatives: ["Monel K-500"] },
    "chemical-normal-fastener-premium": { grade: "Hastelloy C-276 Bolts", reason: "Chemical reactor flange bolting", alternatives: ["Titanium Bolts"] },
    "power-high-fastener-balanced": { grade: "B7 Studs (Alloy Steel)", reason: "High-temperature bolting for steam turbines", alternatives: ["Inconel 718"] },
    "power-extreme-fastener-premium": { grade: "Inconel 718 Bolts", reason: "Aerospace-grade fasteners for extreme conditions", alternatives: ["Nimonic 90"] }
};

// Initialize Wizard
function initGradeWizard() {
    wizardState = { currentStep: 0, answers: {} };
    renderWizardStep();
}

// Render Current Step
function renderWizardStep() {
    const container = document.getElementById('wizard-question-container');
    const progressBar = document.getElementById('wizard-progress');
    const stepText = document.getElementById('wizard-step-text');
    const percentText = document.getElementById('wizard-percent');
    const backBtn = document.getElementById('btn-back');
    
    const currentQuestion = wizardQuestions[wizardState.currentStep];
    const progress = ((wizardState.currentStep + 1) / wizardQuestions.length) * 100;
    
    // Update UI
    if (progressBar) progressBar.style.width = progress + '%';
    if (stepText) stepText.textContent = `Step ${wizardState.currentStep + 1} of ${wizardQuestions.length}`;
    if (percentText) percentText.textContent = Math.round(progress) + '%';
    if (backBtn) backBtn.disabled = wizardState.currentStep === 0;
    
    // Render Question
    container.innerHTML = `
        <h3 class="text-xl font-bold mb-6" id="wizard-question">${currentQuestion.question}</h3>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4" id="wizard-options">
            ${currentQuestion.options.map(opt => `
                <button onclick="selectOption('${opt.value}')" 
                        class="flex items-center gap-4 p-4 bg-slate-700 hover:bg-slate-600 rounded-xl border-2 border-transparent hover:border-emerald-500 transition-all text-left group">
                    <div class="w-12 h-12 bg-slate-800 rounded-full flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500 group-hover:text-white transition-all">
                        <i data-lucide="${opt.icon}" class="w-6 h-6"></i>
                    </div>
                    <div class="flex-1">
                        <div class="font-bold text-white">${opt.text}</div>
                    </div>
                    <i data-lucide="chevron-right" class="w-5 h-5 text-slate-500 group-hover:text-emerald-400 transition-colors"></i>
                </button>
            `).join('')}
        </div>
    `;
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Handle Option Selection
function selectOption(value) {
    const currentQuestion = wizardQuestions[wizardState.currentStep];
    wizardState.answers[`step${wizardState.currentStep + 1}`] = value;
    
    if (wizardState.currentStep < wizardQuestions.length - 1) {
        wizardState.currentStep++;
        renderWizardStep();
    } else {
        showRecommendations();
    }
}

// Previous Step
function prevStep() {
    if (wizardState.currentStep > 0) {
        wizardState.currentStep--;
        renderWizardStep();
    }
}

// Show Final Recommendations
function showRecommendations() {
    const container = document.getElementById('wizard-question-container');
    const resultsDiv = document.getElementById('wizard-results');
    const navDiv = document.getElementById('wizard-nav');
    
    container.classList.add('hidden');
    resultsDiv.classList.remove('hidden');
    navDiv.classList.add('hidden');
    
    // Build lookup key
    const environment = wizardState.answers.step1 || 'indoor';
    const temperature = wizardState.answers.step2 || 'normal';
    const form = wizardState.answers.step3 || 'flat';
    const budget = wizardState.answers.step4 || 'balanced';
    
    const lookupKey = `${environment}-${temperature}-${form}-${budget}`;
    
    // Find exact and partial matches
    const exactMatch = gradeRecommendations[lookupKey];
    const recommendations = [];
    
    if (exactMatch) {
        recommendations.push({ 
            ...exactMatch, 
            priority: "Perfect Match",
            icon: "check-circle"
        });
        
        // Add alternatives from the exact match
        if (exactMatch.alternatives) {
            exactMatch.alternatives.slice(0, 2).forEach(alt => {
                recommendations.push({
                    grade: alt,
                    reason: "Alternative option for this application",
                    priority: "Alternative",
                    icon: "git-branch"
                });
            });
        }
    } else {
        // Find closest matches
        Object.keys(gradeRecommendations).forEach(key => {
            const parts = key.split('-');
            const matchScore = [
                parts[0] === environment ? 2 : 0,
                parts[1] === temperature ? 2 : 0,
                parts[2] === form ? 1 : 0,
                parts[3] === budget ? 1 : 0
            ].reduce((a, b) => a + b, 0);
            
            if (matchScore >= 4 && recommendations.length < 3) {
                recommendations.push({ 
                    ...gradeRecommendations[key], 
                    priority: matchScore >= 5 ? "Good Match" : "Consider",
                    icon: matchScore >= 5 ? "star" : "info"
                });
            }
        });
    }
    
    // Fallback if no matches
    if (recommendations.length === 0) {
        recommendations.push({
            grade: "SS 304",
            reason: "General purpose stainless steel - contact us for specific recommendations",
            priority: "Contact Sales",
            icon: "help-circle"
        });
    }
    
    // Render Results
    document.getElementById('wizard-recommendations').innerHTML = recommendations.map((rec, idx) => `
        <div class="bg-slate-800 border-2 ${idx === 0 ? 'border-emerald-500' : 'border-slate-700'} rounded-xl p-6 hover:border-emerald-400 transition-all">
            <div class="flex justify-between items-start mb-3">
                <h4 class="text-xl font-bold text-white flex items-center gap-2">
                    <i data-lucide="${rec.icon || 'check-circle'}" class="w-5 h-5 ${idx === 0 ? 'text-emerald-400' : 'text-slate-400'}"></i>
                    ${rec.grade}
                </h4>
                <span class="bg-emerald-500/20 text-emerald-400 px-3 py-1 rounded-full text-xs font-bold">${rec.priority}</span>
            </div>
            <p class="text-slate-300 text-sm mb-4">${rec.reason}</p>
            <div class="flex gap-2">
                <a href="products.html" class="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white text-center py-2 rounded-lg font-bold text-sm transition-colors">
                    View in Inventory
                </a>
                <a href="contact.html" class="flex-1 bg-slate-700 hover:bg-slate-600 text-white text-center py-2 rounded-lg font-bold text-sm transition-colors">
                    Get Quote
                </a>
            </div>
        </div>
    `).join('');
    
    if (typeof lucide !== 'undefined') lucide.createIcons();
}

// Reset Wizard
function resetWizard() {
    const resultsDiv = document.getElementById('wizard-results');
    const navDiv = document.getElementById('wizard-nav');
    
    resultsDiv.classList.add('hidden');
    navDiv.classList.remove('hidden');
    
    initGradeWizard();
}

// Auto-initialize on page load
if (document.getElementById('grade-wizard')) {
    document.addEventListener('DOMContentLoaded', initGradeWizard);
}