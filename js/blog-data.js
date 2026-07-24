// ============================================================================
// TATVAM OVERSEAS INC — BLOG DATA (ENRICHED v2.0)
// Each article: rich HTML content, comparison tables, FAQs, related posts, CTAs
// ============================================================================

const CATEGORY_COLORS = {
  "Technical Guide":    { bg: "bg-blue-100",    text: "text-blue-700",    dot: "bg-blue-500"    },
  "Market Trends":      { bg: "bg-amber-100",   text: "text-amber-700",   dot: "bg-amber-500"   },
  "Corrosion Science":  { bg: "bg-red-100",     text: "text-red-700",     dot: "bg-red-500"     },
  "Industry Focus":     { bg: "bg-purple-100",  text: "text-purple-700",  dot: "bg-purple-500"  },
  "Fabrication":        { bg: "bg-orange-100",  text: "text-orange-700",  dot: "bg-orange-500"  },
  "Aesthetics":         { bg: "bg-pink-100",    text: "text-pink-700",    dot: "bg-pink-500"    },
  "Quality Assurance":  { bg: "bg-teal-100",    text: "text-teal-700",    dot: "bg-teal-500"    },
  "Material Science":   { bg: "bg-indigo-100",  text: "text-indigo-700",  dot: "bg-indigo-500"  },
  "Basics":             { bg: "bg-slate-100",   text: "text-slate-700",   dot: "bg-slate-500"   },
  "Specialty Alloys":   { bg: "bg-violet-100",  text: "text-violet-700",  dot: "bg-violet-500"  },
  "Environment":        { bg: "bg-green-100",   text: "text-green-700",   dot: "bg-green-500"   },
  "Maintenance":        { bg: "bg-cyan-100",    text: "text-cyan-700",    dot: "bg-cyan-500"    },
  "Utility":            { bg: "bg-lime-100",    text: "text-lime-700",    dot: "bg-lime-500"    },
  "Architecture":       { bg: "bg-rose-100",    text: "text-rose-700",    dot: "bg-rose-500"    },
  "default":            { bg: "bg-emerald-100", text: "text-emerald-700", dot: "bg-emerald-500" }
};

function getCategoryStyle(cat) {
  return CATEGORY_COLORS[cat] || CATEGORY_COLORS["default"];
}

// Reusable CTA block
function blogCTA() {
  return `
    <div class="mt-10 rounded-2xl bg-gradient-to-br from-slate-900 to-emerald-900 p-8 text-center text-white shadow-xl">
      <p class="text-xs uppercase tracking-widest text-emerald-400 font-bold mb-2">Ready to Source?</p>
      <h3 class="text-2xl font-black mb-2">Looking for Stainless Steel Products?</h3>
      <p class="text-slate-300 mb-6 text-sm max-w-md mx-auto">Get competitive quotes with full Mill Test Certificates from Tatvam Overseas Inc — Mumbai's trusted stockist since 1992.</p>
      <div class="flex flex-col sm:flex-row gap-3 justify-center">
        <a href="contact.html" class="bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-7 py-3 rounded-xl transition-all shadow-lg hover:shadow-emerald-500/30 text-sm">Request a Quote</a>
        <a href="products.html" class="bg-white/10 hover:bg-white/20 text-white font-bold px-7 py-3 rounded-xl transition-all border border-white/20 text-sm">Explore Products</a>
        <a href="contact.html" class="bg-transparent hover:bg-white/10 text-emerald-300 font-bold px-7 py-3 rounded-xl transition-all border border-emerald-600 text-sm">Contact Sales</a>
      </div>
    </div>`;
}

// Reusable author block
function blogAuthor(date, readingTime) {
  return `
    <div class="flex items-center gap-4 py-4 border-y border-slate-200 my-6">
      <div class="w-11 h-11 rounded-full bg-gradient-to-br from-emerald-600 to-slate-800 flex items-center justify-center text-white font-black text-lg shadow-md">T</div>
      <div>
        <p class="font-bold text-slate-900 text-sm">Tatvam Overseas Inc Technical Team</p>
        <p class="text-xs text-slate-500">Published: ${date} &nbsp;·&nbsp; Last Updated: July 19, 2026 &nbsp;·&nbsp; <span class="text-emerald-600 font-semibold">${readingTime}</span></p>
      </div>
    </div>`;
}

// Related posts renderer — called at runtime
function relatedPostsHTML(ids) {
  if (typeof blogs === 'undefined') return '';
  const related = ids.map(id => blogs.find(b => b.id === id)).filter(Boolean);
  if (!related.length) return '';
  return `
    <div class="mt-10">
      <h3 class="text-lg font-black text-slate-900 mb-4 flex items-center gap-2">
        <span class="w-1 h-5 bg-emerald-500 rounded-full inline-block"></span> Related Articles
      </h3>
      <div class="grid sm:grid-cols-2 gap-4">
        ${related.map(p => `
          <div onclick="openBlogModal('${p.id}')" class="cursor-pointer flex gap-3 items-start bg-slate-50 hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 rounded-xl p-4 transition-all group">
            <img src="${p.image}" class="w-16 h-16 object-cover rounded-lg flex-shrink-0" alt="${p.title}" loading="lazy">
            <div>
              <p class="font-bold text-sm text-slate-900 group-hover:text-emerald-700 leading-snug">${p.title}</p>
              <p class="text-xs text-slate-500 mt-1">${p.date} · ${p.readingTime || '4 min read'}</p>
            </div>
          </div>`).join('')}
      </div>
    </div>`;
}

const blogs = [

  // ══════════════════════════════════════════════════════════════════════════
  // 1. SS 304 vs SS 316 — FEATURED
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ss-304-vs-316",
    title: "SS 304 vs SS 316: The Definitive Buyer's Guide",
    date: "Oct 12, 2025",
    category: "Technical Guide",
    featured: true,
    image: "assets/images/pool/sheets_blog.jpg",
    coverImage: "assets/images/pool/sheets_blog.jpg",
    readingTime: "8 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "SS 304 vs SS 316 Stainless Steel: Complete Comparison Guide | Tatvam Overseas Inc",
    seoDescription: "Detailed comparison of SS 304 and SS 316 stainless steel — chemical composition, PREN, cost, corrosion resistance, and when to choose which grade.",
    keywords: ["SS 304 vs 316", "304 vs 316 stainless steel", "which stainless steel grade", "molybdenum stainless", "marine grade stainless"],
    tags: ["SS 304", "SS 316", "Grade Comparison", "Technical Guide", "Corrosion"],
    snippet: "SS 304 and SS 316 look identical on the surface — but in a coastal or chemical environment, choosing the wrong one can cost you thousands. This definitive guide breaks down the Molybdenum difference, PREN values, pricing, and the exact conditions where each grade should be specified.",
    relatedIds: ["pitting-corrosion", "surface-finishes", "railing-selection", "ss-202-applications"],
    content: (function() {
      return `
      <nav class="bg-slate-50 border border-slate-200 rounded-xl p-4 mb-8 text-sm">
        <p class="font-bold text-slate-900 mb-2 text-xs uppercase tracking-wider">Table of Contents</p>
        <ol class="list-decimal list-inside space-y-1 text-slate-600">
          <li><a href="#intro" class="hover:text-emerald-600">Introduction</a></li>
          <li><a href="#chem" class="hover:text-emerald-600">Chemical Composition Comparison</a></li>
          <li><a href="#pren" class="hover:text-emerald-600">PREN & Corrosion Resistance</a></li>
          <li><a href="#mech" class="hover:text-emerald-600">Mechanical Properties</a></li>
          <li><a href="#cost" class="hover:text-emerald-600">Cost & Availability</a></li>
          <li><a href="#when" class="hover:text-emerald-600">When to Choose Which Grade</a></li>
          <li><a href="#apps" class="hover:text-emerald-600">Applications by Industry</a></li>
          <li><a href="#faq" class="hover:text-emerald-600">FAQs</a></li>
          <li><a href="#takeaway" class="hover:text-emerald-600">Key Takeaways</a></li>
        </ol>
      </nav>

      <h2 id="intro" class="text-2xl font-black text-slate-900 mt-6 mb-3">Introduction</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">SS 304 and SS 316 are the two most widely stocked austenitic stainless steel grades in the world. In a godown, they look identical — same silver surface, same cold-rolled feel. Yet in a coastal project or a pharmaceutical reactor, specifying the wrong one is an expensive mistake. The difference comes down to a single element: <strong>Molybdenum</strong>.</p>
      <p class="mb-4 text-slate-700 leading-relaxed">SS 316 contains 2–3% Molybdenum (Mo), which dramatically improves resistance to chloride pitting. SS 304 has none. This guide walks through the full technical comparison so engineers, procurement teams, and fabricators can make the right call every time.</p>

      <h2 id="chem" class="text-2xl font-black text-slate-900 mt-8 mb-3">Chemical Composition Comparison</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white">
            <tr><th class="px-4 py-3">Element</th><th class="px-4 py-3">SS 304 / 304L</th><th class="px-4 py-3">SS 316 / 316L</th><th class="px-4 py-3">Why it Matters</th></tr>
          </thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Chromium (Cr)</td><td class="px-4 py-3">18.0–20.0%</td><td class="px-4 py-3">16.0–18.0%</td><td class="px-4 py-3">Forms passive oxide layer</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Nickel (Ni)</td><td class="px-4 py-3">8.0–10.5%</td><td class="px-4 py-3">10.0–14.0%</td><td class="px-4 py-3">Ductility, austenite stability</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold text-emerald-700">Molybdenum (Mo)</td><td class="px-4 py-3 text-red-500 font-bold">None</td><td class="px-4 py-3 text-emerald-600 font-bold">2.0–3.0%</td><td class="px-4 py-3 font-semibold">Anti-pitting in chlorides ← KEY</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Carbon — 304</td><td class="px-4 py-3">≤ 0.08%</td><td class="px-4 py-3">≤ 0.08%</td><td class="px-4 py-3">Standard grade carbon</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Carbon — L grade</td><td class="px-4 py-3">≤ 0.03% (304L)</td><td class="px-4 py-3">≤ 0.03% (316L)</td><td class="px-4 py-3">Better weldability, no sensitisation</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Manganese (Mn)</td><td class="px-4 py-3">≤ 2.0%</td><td class="px-4 py-3">≤ 2.0%</td><td class="px-4 py-3">Deoxidiser</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-slate-400 mb-6">Standards: ASTM A240 / EN 10088-2 / IS 6911</p>

      <h2 id="pren" class="text-2xl font-black text-slate-900 mt-8 mb-3">PREN & Corrosion Resistance</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">The <strong>Pitting Resistance Equivalent Number (PREN)</strong> quantifies a steel's resistance to chloride pitting. Higher is better.</p>
      <p class="font-mono text-sm bg-slate-900 text-emerald-400 p-3 rounded-lg mb-4">PREN = %Cr + 3.3(%Mo) + 16(%N)</p>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Grade</th><th class="px-4 py-3">PREN (approx.)</th><th class="px-4 py-3">Environment Suitability</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">SS 202</td><td class="px-4 py-3">~15</td><td class="px-4 py-3">Indoor, dry environments only</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">SS 304</td><td class="px-4 py-3">~18</td><td class="px-4 py-3">Indoor, food processing, mild outdoors</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold text-emerald-700">SS 316</td><td class="px-4 py-3 font-bold text-emerald-700">~24</td><td class="px-4 py-3">Marine, coastal, chemical, pharma</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Duplex 2205</td><td class="px-4 py-3 font-bold">~35</td><td class="px-4 py-3">Offshore, severe chloride service</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="mech" class="text-2xl font-black text-slate-900 mt-8 mb-3">Mechanical Properties</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Property</th><th class="px-4 py-3">SS 304</th><th class="px-4 py-3">SS 316</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Yield Strength</td><td class="px-4 py-3">205 MPa min</td><td class="px-4 py-3">205 MPa min</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Tensile Strength</td><td class="px-4 py-3">515 MPa min</td><td class="px-4 py-3">515 MPa min</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Elongation</td><td class="px-4 py-3">40% min</td><td class="px-4 py-3">40% min</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Hardness (max)</td><td class="px-4 py-3">201 HB / 92 HRB</td><td class="px-4 py-3">217 HB / 95 HRB</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-semibold">Density</td><td class="px-4 py-3">7.93 g/cm³</td><td class="px-4 py-3">7.98 g/cm³</td></tr>
          </tbody>
        </table>
      </div>
      <p class="mb-4 text-slate-600 text-sm"><strong>Note:</strong> Both grades have identical mechanical properties. The specification premium for 316 is purely about corrosion performance, not strength.</p>

      <h2 id="cost" class="text-2xl font-black text-slate-900 mt-8 mb-3">Cost & Availability</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">SS 316 typically costs <strong>20–30% more</strong> than SS 304 in the Mumbai market, primarily due to higher Nickel content (10–14% vs 8–10.5%) and the addition of Molybdenum. Both grades are ex-stock at Tatvam Overseas Inc in sheets, pipes, bars, and flanges.</p>
      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-amber-800 text-sm">💡 Procurement Tip</p>
        <p class="text-amber-700 text-sm mt-1">If your environment is not coastal or chemically aggressive, specifying 316 where 304 is sufficient wastes 20–30% of your material budget. Consult our technical team to confirm grade suitability before procurement.</p>
      </div>

      <h2 id="when" class="text-2xl font-black text-slate-900 mt-8 mb-3">When to Choose Which Grade</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Application</th><th class="px-4 py-3">Recommended Grade</th><th class="px-4 py-3">Reason</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">Kitchen sinks, countertops</td><td class="px-4 py-3 font-bold text-emerald-700">SS 304</td><td class="px-4 py-3">Food safe, mild acids, cost effective</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Interior railings (dry)</td><td class="px-4 py-3 font-bold text-emerald-700">SS 304 or 202</td><td class="px-4 py-3">No chloride exposure</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3">Coastal balcony railings</td><td class="px-4 py-3 font-bold text-blue-700">SS 316</td><td class="px-4 py-3">Salt spray; 304 will stain/pit</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Food processing tanks</td><td class="px-4 py-3 font-bold text-emerald-700">SS 304</td><td class="px-4 py-3">HACCP compliant, cleanable</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3">Pharmaceutical reactors</td><td class="px-4 py-3 font-bold text-blue-700">SS 316L</td><td class="px-4 py-3">Sanitising chemicals + low carbon</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Marine fittings</td><td class="px-4 py-3 font-bold text-blue-700">SS 316</td><td class="px-4 py-3">PREN 24 vs 18</td></tr>
            <tr class="bg-white"><td class="px-4 py-3">Chemical plants (HCl, H₂SO₄)</td><td class="px-4 py-3 font-bold text-purple-700">316L / 317L / Duplex</td><td class="px-4 py-3">Stronger acid resistance needed</td></tr>
          </tbody>
        </table>
      </div>

      <h2 id="apps" class="text-2xl font-black text-slate-900 mt-8 mb-3">Applications by Industry</h2>
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 class="font-bold text-blue-800 mb-2">SS 304 Typical Uses</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Dairy & food processing equipment</li><li>Kitchen appliances & sinks</li><li>Interior architectural cladding</li><li>Heat exchangers (non-chloride)</li><li>Pressure vessels (general)</li><li>Hospital furniture & equipment</li>
          </ul>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h4 class="font-bold text-emerald-800 mb-2">SS 316 Typical Uses</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Marine & offshore piping</li><li>Pharmaceutical & biotech reactors</li><li>Coastal architectural elements</li><li>Seawater heat exchangers</li><li>Chemical plant piping</li><li>Salt & brine handling equipment</li>
          </ul>
        </div>
      </div>

      <h2 id="faq" class="text-2xl font-black text-slate-900 mt-8 mb-3">Frequently Asked Questions</h2>
      <div class="space-y-3 mb-8">
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">Can I substitute 304 for 316? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">Only in non-chloride, non-aggressive environments. For any coastal, marine, or chemical duty, substituting 304 for 316 will cause premature failure. Contact our team for a free grade suitability review.</div>
        </details>
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">What is the difference between 316 and 316L? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">316L has lower carbon (≤ 0.03% vs ≤ 0.08%). The "L" grade is specified for welded applications to prevent sensitisation (intergranular corrosion at weld zones). For non-welded applications, 316 and 316L perform identically.</div>
        </details>
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">Does 316 rust? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">In extreme conditions (concentrated HCl, crevices in seawater), 316 can still pit. No grade is "rust proof." The passive chromium oxide layer can be broken by chlorides, acids, and iron contamination from grinding. Passivation and regular cleaning maintain the protective layer.</div>
        </details>
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">Is SS 316 food safe? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">Yes. Both SS 304 and SS 316 are food safe to HACCP and FDA standards. SS 316 is preferred for salty or acidic foods (soy sauce, ketchup, vinegar) because the Molybdenum prevents pitting which could harbour bacteria.</div>
        </details>
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">How can I tell 304 and 316 apart without a lab? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">You cannot tell them apart visually or by a magnet test. Both are non-magnetic (austenitic). The only field method is a <strong>Molybdenum spot test kit</strong> or a <strong>XRF (Positive Material Identification) gun</strong>. Always request the Mill Test Certificate (MTC) with the heat number stamped on the material.</div>
        </details>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 id="takeaway" class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>The only structural difference is <strong>2–3% Molybdenum</strong> in SS 316.</li>
          <li>SS 316 has a PREN of ~24 vs ~18 for 304 — <strong>33% more resistant to chloride pitting</strong>.</li>
          <li>Mechanical strength is <strong>identical</strong> — the premium is for corrosion performance only.</li>
          <li>316 costs <strong>20–30% more</strong>. Only specify it where the environment demands it.</li>
          <li>Always use <strong>316L for welded assemblies</strong> to prevent sensitisation.</li>
          <li>Verify grade with MTC + XRF gun — <strong>never rely on a magnet test</strong>.</li>
        </ul>
      </div>`;
    })()
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 2. MAGNETISM IN STEEL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "magnetism-in-steel",
    title: "Why is My Stainless Steel Magnetic?",
    date: "Oct 05, 2025",
    category: "Technical Guide",
    featured: false,
    image: "assets/images/pool/factory.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Why Stainless Steel is Magnetic — Ferritic vs Austenitic Explained | Tatvam Overseas Inc",
    seoDescription: "Busting the magnet test myth. Understand why SS 430, SS 409 are magnetic and how cold working makes SS 304 mildly magnetic. Technical guide.",
    keywords: ["stainless steel magnet test", "is stainless steel magnetic", "ferritic vs austenitic", "304 magnetic", "430 magnetic"],
    tags: ["Magnetism", "Ferritic", "Austenitic", "Technical Guide", "Quality"],
    snippet: "Busting the myth that 'Good Steel is Non-Magnetic'. Magnetism in stainless steel is determined by its crystal structure — not its quality or grade. A magnet test alone cannot tell you if steel is 304 or 202.",
    relatedIds: ["ss-304-vs-316", "ferritic-stainless", "avoid-cheating"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Magnet Myth</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Walk into any steel market in Mumbai, and you'll see buyers pulling out a magnet to test steel quality. The logic: "If it doesn't stick, it's 304." This is dangerously wrong. Magnetism in stainless steel is purely a function of <strong>atomic crystal structure</strong> — not grade quality or corrosion resistance.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">The Three Crystal Structures</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Family</th><th class="px-4 py-3">Common Grades</th><th class="px-4 py-3">Magnetic?</th><th class="px-4 py-3">Typical Use</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Austenitic</td><td class="px-4 py-3">SS 201, 202, 304, 316</td><td class="px-4 py-3 text-green-600 font-bold">Non-magnetic*</td><td class="px-4 py-3">Food, pharma, architecture</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Ferritic</td><td class="px-4 py-3">SS 409, 410, 430</td><td class="px-4 py-3 text-red-600 font-bold">Strongly Magnetic</td><td class="px-4 py-3">Automotive, appliances</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-semibold">Martensitic</td><td class="px-4 py-3">SS 410, 420, 431</td><td class="px-4 py-3 text-red-600 font-bold">Magnetic</td><td class="px-4 py-3">Cutlery, pump shafts</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-xs text-slate-400 mb-6">*Cold working (bending, cutting) can induce mild magnetism in austenitic grades.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Why Cold Working Causes Magnetism in 304</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">When austenitic SS 304 is severely cold-worked (bent sharply, cut, pressed), some austenite transforms to martensite — a magnetic phase. This is why SS 304 tubes at bends may attract a magnet weakly. It does NOT indicate inferior quality or wrong grade.</p>
      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-amber-800 text-sm">⚠️ Field Reality</p>
        <p class="text-amber-700 text-sm mt-1">SS 202 (which rusts in outdoor/coastal use) is also non-magnetic. A buyer testing with a magnet cannot distinguish 304 from 202. The ONLY reliable field test is a Molybdenum spot-test kit or XRF gun. Always demand the MTC.</p>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Frequently Asked Questions</h2>
      <div class="space-y-3 mb-8">
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">Is SS 430 lower quality because it's magnetic? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">No. SS 430 is a premium ferritic grade used in refrigerators, washing machines, and dishwashers globally. It is highly corrosion resistant to citric and nitric acids. The magnetic property is a feature — it allows magnetic seals in appliances.</div>
        </details>
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">My 304 railing is slightly magnetic at the bends — is it fake? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">Not necessarily. Cold forming induces martensite in 304. The straight sections will be non-magnetic while bent sections may be slightly magnetic. Verify with MTC and if in doubt, request an XRF (PMI) test.</div>
        </details>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Magnetism reveals <strong>crystal family</strong>, not corrosion resistance or quality.</li>
          <li>Ferritic (430) and Martensitic (410, 420) grades are <strong>always magnetic</strong>.</li>
          <li>Austenitic (304, 316, 202) are non-magnetic but <strong>cold working can add mild magnetism</strong>.</li>
          <li>Never use a magnet alone to distinguish 304 from 202 — use a <strong>spot test or MTC</strong>.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 3. PIPE VS TUBE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pipe-vs-tube",
    title: "Pipe vs. Tube: The Real Technical Difference",
    date: "Sept 20, 2025",
    category: "Technical Guide",
    featured: false,
    image: "assets/images/pool/pipes.jpg",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Pipe vs Tube — What's the Difference? NB, OD, Schedule Explained | Tatvam Overseas Inc",
    seoDescription: "In the steel industry, pipe and tube are NOT interchangeable. Learn how NB (Nominal Bore) vs OD (Outer Diameter) and Schedule vs Gauge affect your specification.",
    keywords: ["pipe vs tube", "nominal bore vs OD", "pipe schedule", "tube gauge", "stainless steel pipe tube difference"],
    tags: ["Pipes", "Tubes", "Technical Guide", "Basics", "Specification"],
    snippet: "In the steel industry, 'pipe' and 'tube' are not interchangeable. Pipes transport fluids and are sized by Nominal Bore (ID). Tubes provide structural strength and are sized by OD. Getting this wrong leads to wrong material, wrong wall thickness, and rejected deliveries.",
    relatedIds: ["ss-304-vs-316", "calculating-weight", "sheet-vs-plate"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Why This Distinction Matters</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Many fabricators use "pipe" and "tube" interchangeably when placing orders. The result: wrong dimensions, mismatched fittings, and costly rejections. In the steel industry, these are two distinct product categories with different sizing conventions, standards, and end uses.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Pipe vs. Tube — Side by Side</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Attribute</th><th class="px-4 py-3 text-blue-300">PIPE</th><th class="px-4 py-3 text-emerald-300">TUBE</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Primary Purpose</td><td class="px-4 py-3">Transport fluids/gas under pressure</td><td class="px-4 py-3">Structural strength, heat transfer, decoration</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Sized by</td><td class="px-4 py-3 font-bold text-blue-700">ID / Nominal Bore (NB)</td><td class="px-4 py-3 font-bold text-emerald-700">OD (Outer Diameter)</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Wall thickness defined by</td><td class="px-4 py-3">Schedule (Sch 10, 40, 80, 160)</td><td class="px-4 py-3">BWG / SWG / mm gauge</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Key standards</td><td class="px-4 py-3">ASTM A312, ASME B36.19</td><td class="px-4 py-3">ASTM A554, ASTM A269</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Typical sections</td><td class="px-4 py-3">Round only (for pipes)</td><td class="px-4 py-3">Round, Square, Rectangle, Oval</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Example application</td><td class="px-4 py-3">Chemical plant process line</td><td class="px-4 py-3">Stair railing, furniture frame</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Understanding Pipe Schedule</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">For a given Nominal Bore (say 2" NB), the <strong>OD is always fixed</strong>. What changes is the wall thickness, defined by the "Schedule" number. Higher Schedule = thicker wall = heavier = higher pressure rating.</p>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Schedule</th><th class="px-4 py-3">Wall Thickness (2" NB)</th><th class="px-4 py-3">Typical Use</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">Sch 5S</td><td class="px-4 py-3">2.77 mm</td><td class="px-4 py-3">Low pressure, slurry lines</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Sch 10S</td><td class="px-4 py-3">3.05 mm</td><td class="px-4 py-3">Food & pharma, low pressure</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">Sch 40S</td><td class="px-4 py-3 font-bold">3.91 mm</td><td class="px-4 py-3 font-bold">Standard industrial (most common)</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Sch 80S</td><td class="px-4 py-3">5.54 mm</td><td class="px-4 py-3">High pressure chemical lines</td></tr>
            <tr class="bg-white"><td class="px-4 py-3">Sch 160</td><td class="px-4 py-3">8.74 mm</td><td class="px-4 py-3">Very high pressure / refineries</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Seamless vs. Welded (ERW)</h2>
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 class="font-bold text-blue-800 mb-2">Seamless Pipes</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>No weld seam — uniform structure</li><li>Higher pressure rating</li><li>For critical / high-pressure service</li><li>ASTM A312 standard</li><li>More expensive; longer lead time</li>
          </ul>
        </div>
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h4 class="font-bold text-emerald-800 mb-2">Welded (ERW) Pipes/Tubes</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Made from coiled strip, seam welded</li><li>Lower cost; wide range of sizes</li><li>Decorative, structural, general use</li><li>ASTM A554 / IS 6913</li><li>Seam inspection required for critical use</li>
          </ul>
        </div>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Frequently Asked Questions</h2>
      <div class="space-y-3 mb-8">
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">Can I use a decorative tube in a pressure line? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">No. Decorative tubes (ASTM A554) are not rated for pressure service. They have no hydrostatic test requirement. For pressure lines, always specify pipes to ASTM A312 with hydrostatic testing and MTC.</div>
        </details>
        <details class="border border-slate-200 rounded-xl overflow-hidden group">
          <summary class="px-5 py-4 font-semibold text-slate-900 cursor-pointer flex justify-between items-center hover:bg-slate-50">What does "2 inch NB, Sch 40" mean? <span class="text-emerald-600 group-open:rotate-45 transition-transform text-xl">+</span></summary>
          <div class="px-5 pb-4 text-slate-600 text-sm leading-relaxed">A pipe with Nominal Bore of 2 inches (actual OD = 60.3mm), with a Schedule 40 wall thickness of 3.91mm. The inside bore after accounting for wall thickness is approximately 52.5mm.</div>
        </details>
      </div>
      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li><strong>Pipe = fluid transport</strong>, sized by NB/ID, thickness by Schedule.</li>
          <li><strong>Tube = structural/decorative</strong>, sized by OD, thickness by BWG/SWG/mm.</li>
          <li>Seamless pipes are for high-pressure critical service; ERW is for general and decorative use.</li>
          <li>Always specify: Grade + Standard (ASTM A312/A554) + Size (NB or OD) + Schedule/Gauge.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 4. SURFACE FINISHES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "surface-finishes",
    title: "Mastering Surface Finishes: 2B, BA, No.4, Mirror & PVD",
    date: "Aug 10, 2025",
    category: "Aesthetics",
    featured: false,
    image: "assets/images/pool/hairline.jpg",
    readingTime: "7 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Stainless Steel Surface Finishes: 2B vs BA vs Mirror vs Hairline vs PVD | Tatvam Overseas Inc",
    seoDescription: "Complete guide to stainless steel surface finishes — 2B, BA, No.1, No.4, 8K Mirror, Hairline, Scotch Brite, PVD, Etched, Embossed. When to use each.",
    keywords: ["stainless steel surface finishes", "2B vs BA finish", "mirror finish stainless", "hairline finish", "PVD coating stainless", "No 4 finish"],
    tags: ["Surface Finish", "2B", "Mirror", "Hairline", "PVD", "Aesthetics"],
    snippet: "The finish on stainless steel affects far more than appearance — it impacts hygiene, cleanability, corrosion resistance, and application suitability. This guide covers every major finish from industrial 2B to luxury PVD Gold, with Ra values and applications.",
    relatedIds: ["pvd-coating", "buffing-polishing", "ss-304-vs-316"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Why Surface Finish Matters Beyond Aesthetics</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">The surface finish of stainless steel is not just cosmetic. The <strong>Ra (Roughness Average)</strong> value of a surface directly affects bacterial adhesion in food/pharma applications, corrosion resistance (smoother = fewer sites for chloride attack), and ease of cleaning. Getting the finish right is as important as choosing the right grade.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Complete Finish Comparison Table</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Finish</th><th class="px-4 py-3">Ra (µm)</th><th class="px-4 py-3">Appearance</th><th class="px-4 py-3">Typical Applications</th><th class="px-4 py-3">Standard</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">No.1 (HR)</td><td class="px-4 py-3">Ra > 5</td><td class="px-4 py-3">Rough, dull grey</td><td class="px-4 py-3">Pressure vessels, structural plates</td><td class="px-4 py-3">ASTM A480</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold">2D (CR)</td><td class="px-4 py-3">Ra 0.5–1.5</td><td class="px-4 py-3">Dull, matt</td><td class="px-4 py-3">Deep drawing stock, tanks</td><td class="px-4 py-3">ASTM A480</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold text-emerald-700">2B ⭐ Most Common</td><td class="px-4 py-3">Ra 0.1–0.5</td><td class="px-4 py-3">Smooth, slight sheen</td><td class="px-4 py-3">General purpose, food equipment, tanks</td><td class="px-4 py-3">ASTM A480</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold">BA (Bright Annealed)</td><td class="px-4 py-3">Ra ≤ 0.1</td><td class="px-4 py-3">Bright, semi-reflective</td><td class="px-4 py-3">Appliances, automotive trim</td><td class="px-4 py-3">EN 10088-2</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">No.4 / Hairline</td><td class="px-4 py-3">Ra 0.2–0.5</td><td class="px-4 py-3">Directional grain lines</td><td class="px-4 py-3">Kitchens, elevators, facades</td><td class="px-4 py-3">ASTM A480</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold">Scotch Brite</td><td class="px-4 py-3">Ra 0.3–0.8</td><td class="px-4 py-3">Soft mat sheen</td><td class="px-4 py-3">Food equipment, healthcare</td><td class="px-4 py-3">Commercial</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">No.8 / 8K Mirror</td><td class="px-4 py-3">Ra ≤ 0.05</td><td class="px-4 py-3">Highly reflective</td><td class="px-4 py-3">Architectural columns, lift panels</td><td class="px-4 py-3">ASTM A480</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold">Etched</td><td class="px-4 py-3">Varies</td><td class="px-4 py-3">Patterned / matte design</td><td class="px-4 py-3">Decorative panels, lift interiors</td><td class="px-4 py-3">Commercial</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">Embossed</td><td class="px-4 py-3">N/A (3D)</td><td class="px-4 py-3">Raised pattern</td><td class="px-4 py-3">Anti-slip, chequered plate, decorative</td><td class="px-4 py-3">Commercial</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-bold text-amber-700">PVD (Gold/Black/Bronze)</td><td class="px-4 py-3">≤ 0.05 substrate</td><td class="px-4 py-3">Rich colour, scratch-resistant</td><td class="px-4 py-3">Luxury hotels, high-end interiors</td><td class="px-4 py-3">Commercial</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Which Finish for Which Application?</h2>
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 class="font-bold text-slate-800 mb-2">Food & Pharmaceutical</h4>
          <p class="text-sm text-slate-600">Use <strong>2B or Electropolished</strong> (Ra &lt; 0.5 µm). Pharma clean rooms specify Ra &lt; 0.8 µm. Rough surfaces harbour bacteria.</p>
        </div>
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 class="font-bold text-slate-800 mb-2">Elevator / Lift Cabins</h4>
          <p class="text-sm text-slate-600">Mirror 8K or Hairline No.4. Mirror shows fingerprints more but offers premium aesthetics. Hairline is practical and hides daily wear.</p>
        </div>
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 class="font-bold text-slate-800 mb-2">Industrial Tanks & Vessels</h4>
          <p class="text-sm text-slate-600"><strong>2B or No.1</strong> is standard. No aesthetic requirement — focus on grade and wall thickness.</p>
        </div>
        <div class="bg-slate-50 border border-slate-200 rounded-xl p-4">
          <h4 class="font-bold text-slate-800 mb-2">Hotel & Retail Interiors</h4>
          <p class="text-sm text-slate-600"><strong>PVD Gold, Rose Gold, or Black</strong> for premium impact. Mirror for columns. Hairline for reception counters.</p>
        </div>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li><strong>2B</strong> is the world's most common finish — smooth, versatile, cost-effective.</li>
          <li><strong>No.4 / Hairline</strong> is the architect's favourite — hides scratches, timeless grain.</li>
          <li><strong>8K Mirror</strong> is for premium aesthetics — requires PVC film protection and careful handling.</li>
          <li><strong>PVD</strong> is permanent colour — not paint, not plating; a ceramic-hard vacuum coating.</li>
          <li>For food/pharma: Ra value matters more than visual appearance.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 5. PITTING CORROSION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pitting-corrosion",
    title: "What is Pitting Corrosion & How to Prevent It",
    date: "July 15, 2025",
    category: "Corrosion Science",
    featured: false,
    image: "assets/images/pool/rust.jpg",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Pitting Corrosion in Stainless Steel — Causes, PREN, and Prevention | Tatvam Overseas Inc",
    seoDescription: "Pitting corrosion is the most dangerous form of localised corrosion in stainless steel. Learn about PREN numbers, chloride attack, and how to choose the right grade.",
    keywords: ["pitting corrosion stainless steel", "PREN number", "chloride corrosion", "stainless steel corrosion prevention", "316 vs 304 corrosion"],
    tags: ["Corrosion", "PREN", "Chloride", "SS 304", "SS 316", "Corrosion Science"],
    snippet: "Pitting is the most treacherous form of corrosion — the surface looks fine while deep holes tunnel through the metal, leading to sudden structural failure. Understanding PREN numbers and chloride chemistry could save your project from catastrophic failure.",
    relatedIds: ["ss-304-vs-316", "corrosion-types", "railing-rust"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">What is Pitting Corrosion?</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Pitting is a highly localised form of corrosion where small cavities (pits) form on the metal surface while the surrounding area remains unaffected. The deceptive part: the steel looks clean until the pit has tunnelled deep enough to cause perforation or structural failure. Engineers in pharmaceutical, marine, and chemical industries consider pitting the most dangerous failure mode in stainless steel.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">How Pitting Initiates — The Science</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Stainless steel derives its corrosion resistance from a thin (2–3 nm) self-healing chromium oxide passive film. When <strong>chloride ions (Cl⁻)</strong> concentrate at the surface — from sea air, pool water, cleaning agents, or salt — they penetrate and locally break down this film. Once the film fails at a point, an electrochemical cell forms: the pit becomes an anode (anodic dissolution) while the surrounding passive steel acts as a large cathode. The pit grows autocatalytically — it generates its own acidic environment that accelerates further metal dissolution.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">PREN — Pitting Resistance Equivalent Number</h2>
      <p class="mb-3 text-slate-700">PREN quantifies resistance to chloride pitting. Higher = better.</p>
      <p class="font-mono text-sm bg-slate-900 text-emerald-400 p-3 rounded-lg mb-4">PREN = %Cr + 3.3 × %Mo + 16 × %N</p>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Grade</th><th class="px-4 py-3">PREN</th><th class="px-4 py-3">Suitable for</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">SS 202</td><td class="px-4 py-3">~15</td><td class="px-4 py-3">Indoor only, dry environments</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">SS 304</td><td class="px-4 py-3">~18</td><td class="px-4 py-3">Mild outdoor, food processing</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold text-emerald-700">SS 316</td><td class="px-4 py-3 font-bold text-emerald-700">~24</td><td class="px-4 py-3">Coastal, marine, pharmaceutical</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">SS 317L</td><td class="px-4 py-3">~28</td><td class="px-4 py-3">Chemical scrubbers, pulp & paper</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold text-blue-700">Duplex 2205</td><td class="px-4 py-3 font-bold text-blue-700">~35</td><td class="px-4 py-3">Offshore pipelines, desalination</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-bold text-purple-700">Super Duplex 2507</td><td class="px-4 py-3 font-bold text-purple-700">&gt;40</td><td class="px-4 py-3">Seawater injection, subsea</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Prevention Strategies</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">1</span><div><strong class="text-slate-900">Choose the Right PREN</strong><p class="text-sm text-slate-600 mt-0.5">Match the grade to the environment. Don't use 304 in coastal or pool water applications.</p></div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">2</span><div><strong class="text-slate-900">Passivation After Fabrication</strong><p class="text-sm text-slate-600 mt-0.5">Pickling and passivation (citric or nitric acid treatment) restores and strengthens the passive layer after cutting, welding, and forming.</p></div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">3</span><div><strong class="text-slate-900">Eliminate Crevices</strong><p class="text-sm text-slate-600 mt-0.5">Standing water in crevices concentrates chlorides. Use full-penetration welds, avoid overlapping joints that trap moisture.</p></div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">4</span><div><strong class="text-slate-900">Regular Cleaning</strong><p class="text-sm text-slate-600 mt-0.5">Chloride deposits on surfaces attack the passive layer. Regular washing with neutral cleaners prevents build-up.</p></div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-0.5 rounded text-xs mt-0.5">5</span><div><strong class="text-slate-900">Avoid Iron Contamination</strong><p class="text-sm text-slate-600 mt-0.5">Using carbon steel tools or grinding wheels on SS embeds iron particles that initiate pitting. Use dedicated SS tools.</p></div></li>
      </ul>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Pitting is <strong>localised and autocatalytic</strong> — it accelerates as it progresses.</li>
          <li>Chloride ions are the primary cause. Higher Cl⁻ = higher grade needed.</li>
          <li>Use PREN to select grade: <strong>SS 304 for mild, SS 316 for coastal, Duplex for offshore</strong>.</li>
          <li>Passivation after fabrication is non-negotiable in corrosive environments.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 6. FERRITIC STAINLESS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ferritic-stainless",
    title: "The Rise of 400-Series Ferritic Stainless Steel",
    date: "July 22, 2025",
    category: "Material Science",
    featured: false,
    image: "assets/images/pool/factory.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "SS 400 Series Ferritic Stainless Steel — SS 409, 410, 430 Guide | Tatvam Overseas Inc",
    seoDescription: "Ferritic stainless steels (SS 409, 430) contain no Nickel — making them price-stable and ideal for automotive exhaust, appliances, and cookware.",
    keywords: ["ferritic stainless steel", "SS 430", "SS 409 automotive exhaust", "400 series stainless", "magnetic stainless steel"],
    tags: ["400 Series", "Ferritic", "SS 430", "SS 409", "Automotive", "Appliances"],
    snippet: "Magnetic, Nickel-free, and price-stable — ferritic stainless steels are dominating automotive exhaust systems and home appliances. Understanding when SS 430 outperforms SS 304 at 30% lower cost.",
    relatedIds: ["magnetism-in-steel", "ss-304-vs-316", "role-of-nickel"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Why Ferritic is Growing</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Every time Nickel prices spike on the LME, the stainless steel industry pivots harder toward ferritic grades (400 series). With <strong>zero or minimal Nickel content</strong>, their pricing is stable and significantly cheaper than 304 or 316. For the right applications, they offer excellent corrosion resistance and long service life.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Key Ferritic Grades Comparison</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Grade</th><th class="px-4 py-3">Cr%</th><th class="px-4 py-3">Key Feature</th><th class="px-4 py-3">Primary Use</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">SS 409 / 409M</td><td class="px-4 py-3">10.5–11.7%</td><td class="px-4 py-3">Ti-stabilised; excellent oxidation resistance</td><td class="px-4 py-3">Automotive exhaust, mufflers, bus bodies</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold">SS 410</td><td class="px-4 py-3">11.5–13.5%</td><td class="px-4 py-3">Martensitic; heat treatable</td><td class="px-4 py-3">Pump shafts, cutlery, valve components</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">SS 420</td><td class="px-4 py-3">12–14%</td><td class="px-4 py-3">Higher C; reaches 52 HRC hardness</td><td class="px-4 py-3">Knife blades, surgical scissors</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-bold">SS 430</td><td class="px-4 py-3">16–18%</td><td class="px-4 py-3">Better corrosion resistance; not weldable</td><td class="px-4 py-3">Dishwashers, washing machines, decorative</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">SS 409M — The Automotive Standard</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">More than <strong>90% of global passenger car exhaust systems</strong> are made from SS 409M. It handles exhaust gas temperatures up to 700°C, resists oxidation, and is easily formed and welded. Despite being magnetic, it is a top-quality engineering alloy — the magnet test tells you nothing useful here.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">SS 430 — The Appliance Industry Standard</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Refrigerator doors, dishwasher interiors, and washing machine drums are almost universally SS 430. Its 16–18% Chromium gives excellent resistance to citric and nitric acids from food. However, it <strong>cannot be conventionally welded</strong> (grain growth at HAZ causes embrittlement) and must not be used outdoors or near salt water.</p>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>400 series has <strong>no Nickel</strong> — price-stable vs volatile 300-series pricing.</li>
          <li>SS 409M dominates automotive exhaust; SS 430 dominates appliances.</li>
          <li>Both are magnetic — magnetism is not a quality defect.</li>
          <li>SS 430 <strong>cannot be welded conventionally</strong> and should not be used outdoors.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 7. ROLE OF NICKEL
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "role-of-nickel",
    title: "Why is Nickel So Expensive & How it Drives Stainless Steel Prices",
    date: "June 30, 2025",
    category: "Market Trends",
    featured: false,
    image: "assets/images/pool/market.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Why Nickel Prices Drive Stainless Steel Cost — LME, Surcharge Explained | Tatvam Overseas Inc",
    seoDescription: "Nickel is the most volatile raw material in stainless steel. Understand how LME Nickel prices translate to stainless steel alloy surcharges and procurement timing.",
    keywords: ["nickel price stainless steel", "LME nickel", "stainless steel alloy surcharge", "why stainless steel expensive", "nickel market"],
    tags: ["Nickel", "LME", "Market Trends", "Pricing", "SS 304"],
    snippet: "Nickel makes stainless steel ductile and non-magnetic — and it's the most expensive ingredient in SS 304 and 316. When LME Nickel spikes, your stainless steel quote changes overnight. Here's how the pricing mechanism actually works.",
    relatedIds: ["price-factors", "jindal-vs-imported", "ss-202-applications"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Role of Nickel in Stainless Steel</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Nickel is the element that stabilises the <strong>austenitic structure</strong> in 200 and 300-series stainless steel. Without Nickel, Chromium-only steel would be ferritic (magnetic) and less ductile. Nickel makes the steel formable, weldable, and non-magnetic — critical for food-grade and architectural applications.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Nickel Content by Grade</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Grade</th><th class="px-4 py-3">Ni Content</th><th class="px-4 py-3">LME Nickel Exposure</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">SS 202</td><td class="px-4 py-3">0.3–1.5%</td><td class="px-4 py-3 text-green-600">Very Low</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold">SS 304</td><td class="px-4 py-3 font-bold">8.0–10.5%</td><td class="px-4 py-3 text-amber-600 font-bold">High</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">SS 316</td><td class="px-4 py-3 font-bold">10.0–14.0%</td><td class="px-4 py-3 text-red-600 font-bold">Very High</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">SS 430</td><td class="px-4 py-3">≤ 0.75%</td><td class="px-4 py-3 text-green-600">Negligible</td></tr>
            <tr class="bg-white"><td class="px-4 py-3">Duplex 2205</td><td class="px-4 py-3">4.5–6.5%</td><td class="px-4 py-3 text-amber-600">Medium</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">How the Alloy Surcharge Works</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Stainless steel is priced as: <strong>Base Price + Alloy Surcharge (AS)</strong>. The Alloy Surcharge is recalculated monthly by major mills (Jindal, SAIL, POSCO) based on average LME prices for Nickel, Chromium, and Molybdenum. When Nickel at LME moves by $1,000/MT, the SS 304 surcharge moves by approximately ₹3–5/kg in the Indian market.</p>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-amber-800 text-sm">📊 Procurement Strategy</p>
        <p class="text-amber-700 text-sm mt-1">When LME Nickel is historically low (&lt; $14,000/MT), lock in large orders. When it's high (&gt; $20,000/MT), consider switching to 202 for non-critical applications or negotiate forward contracts.</p>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Nickel is ~60% of the alloy surcharge in SS 304 pricing.</li>
          <li>LME Nickel trades daily — SS prices are updated monthly by Indian mills.</li>
          <li>SS 202 and SS 430 have minimal Nickel — far less price volatility.</li>
          <li>Monitor <a href="https://www.lme.com" target="_blank" class="text-emerald-600 underline">lme.com</a> for Nickel prices to time your purchases.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 8. DUPLEX 2205
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "duplex-steel-benefits",
    title: "Duplex 2205: Double the Strength, Half the Wall Thickness",
    date: "Aug 29, 2025",
    category: "Technical Guide",
    featured: false,
    image: "assets/images/pool/pipes.jpg",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Duplex 2205 Stainless Steel — Properties, PREN, Applications | Tatvam Overseas Inc",
    seoDescription: "Duplex 2205 offers 450 MPa yield strength (double SS 316) with PREN 35. Find out when and why Oil & Gas and chemical plants specify duplex over austenitic grades.",
    keywords: ["duplex 2205 stainless steel", "S31803 duplex", "duplex vs 316", "duplex yield strength", "offshore stainless steel"],
    tags: ["Duplex 2205", "Offshore", "High Strength", "PREN", "Chemical"],
    snippet: "Duplex 2205 has a dual ferritic-austenitic microstructure that gives it 450 MPa yield strength — double that of SS 316 — combined with a PREN of 35. It allows thinner walls in pressure vessels, reducing weight and material cost. Here's when to specify it.",
    relatedIds: ["ss-304-vs-316", "pitting-corrosion", "duplex-welding"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">What Makes Duplex Different?</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Duplex stainless steel has a microstructure of approximately <strong>50% ferrite + 50% austenite</strong>. This hybrid structure is the source of its exceptional properties: the ferrite provides high strength, the austenite provides ductility and corrosion resistance.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Duplex 2205 vs. SS 316L — Key Comparison</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Property</th><th class="px-4 py-3">SS 316L</th><th class="px-4 py-3 text-emerald-300">Duplex 2205</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Yield Strength</td><td class="px-4 py-3">205 MPa</td><td class="px-4 py-3 font-bold text-emerald-700">450 MPa (2× higher)</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Tensile Strength</td><td class="px-4 py-3">515 MPa</td><td class="px-4 py-3 font-bold text-emerald-700">620 MPa</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">PREN</td><td class="px-4 py-3">~24</td><td class="px-4 py-3 font-bold text-emerald-700">34–36</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">SCC Resistance</td><td class="px-4 py-3 text-amber-600">Susceptible</td><td class="px-4 py-3 font-bold text-emerald-700">Excellent</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Cost vs 316</td><td class="px-4 py-3">Baseline</td><td class="px-4 py-3">+25–40%</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Max Temperature</td><td class="px-4 py-3">925°C (intermittent)</td><td class="px-4 py-3 text-red-600">300°C max service</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">The Wall Thickness Advantage</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Because Duplex 2205 has twice the yield strength of 316L, ASME pressure vessel codes allow thinner walls for the same design pressure. A pipe that requires 10mm wall in SS 316L may only need 6mm wall in Duplex 2205. This reduces:</p>
      <ul class="list-disc pl-5 space-y-1 mb-4 text-slate-700 text-sm">
        <li>Material weight (lighter structure, lower freight cost)</li>
        <li>Total material cost (despite higher price per kg)</li>
        <li>Weld volume (faster fabrication)</li>
      </ul>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-amber-800 text-sm">⚠️ Temperature Limitation</p>
        <p class="text-amber-700 text-sm mt-1">Duplex must not be used above 300°C in continuous service. Elevated temperatures promote sigma phase embrittlement, causing brittleness. For high-temperature duty, use SS 321, SS 347, or SS 310S.</p>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Duplex 2205 yield strength: <strong>450 MPa</strong> — double SS 316L.</li>
          <li>PREN of 34–36 — significantly better than 316L's 24.</li>
          <li>Thinner walls allowed → <strong>lighter weight, potentially lower total cost</strong>.</li>
          <li>Temperature limited to 300°C max — not for hot service.</li>
          <li>Welding requires strict ferrite control — specify ER2209 filler wire.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 9. UNDERSTANDING MTC
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "understanding-mtc",
    title: "How to Read a Mill Test Certificate (MTC): A Complete Guide",
    date: "Sept 28, 2025",
    category: "Quality Assurance",
    featured: false,
    image: "assets/images/pool/lab.jpg",
    readingTime: "7 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "How to Read a Mill Test Certificate (MTC) for Stainless Steel | Tatvam Overseas Inc",
    seoDescription: "A Mill Test Certificate is the birth certificate of your steel. Learn to verify heat numbers, chemical composition, mechanical properties, and detect fake or mismatched MTCs.",
    keywords: ["mill test certificate", "MTC stainless steel", "heat number verification", "material traceability", "ASTM A240 certificate"],
    tags: ["MTC", "Quality", "Traceability", "Heat Number", "Certification"],
    snippet: "Never accept steel without an MTC. The Mill Test Certificate is the legal document that proves what you received is what you ordered. Learn to read Chemical Composition, verify Heat Numbers, and spot fraudulent or mismatched certificates.",
    relatedIds: ["avoid-cheating", "jindal-vs-imported", "food-grade-certification"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Why the MTC is Non-Negotiable</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">A Mill Test Certificate (also called Material Test Report — MTR) is the legal traceability document that links the steel in your hands to the mill that produced it. Without it, you have no proof of grade, chemistry, or mechanical properties. For export, pharmaceutical, or pressure vessel applications, accepting steel without an MTC is not just risky — it can void insurance, approvals, and warranties.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Key Fields to Verify on an MTC</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Field</th><th class="px-4 py-3">What to Check</th><th class="px-4 py-3">Red Flag</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Heat / Lot Number</td><td class="px-4 py-3">Must be stamped on material AND match MTC</td><td class="px-4 py-3 text-red-600">Missing stamp or mismatch = reject</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Grade</td><td class="px-4 py-3">Does it state SS 304 / ASTM A240 TP304?</td><td class="px-4 py-3 text-red-600">Vague "SS" or handwritten grade</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Chemical Composition</td><td class="px-4 py-3">Cr%, Ni%, Mo%, C% — verify against ASTM limits</td><td class="px-4 py-3 text-red-600">Ni% below 8% in "304" is wrong</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Mechanical Properties</td><td class="px-4 py-3">UTS, Yield, Elongation — check against standard</td><td class="px-4 py-3 text-red-600">Missing mechanical data</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Mill Name & Stamp</td><td class="px-4 py-3">Jindal, SAIL, POSCO, etc. — official mill letterhead</td><td class="px-4 py-3 text-red-600">Trader-issued MTC (not mill-issued)</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Standard Reference</td><td class="px-4 py-3">ASTM A240/A312, EN 10088, IS 6911</td><td class="px-4 py-3 text-red-600">No standard cited</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Chemistry Limits for SS 304 per ASTM A240</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Element</th><th class="px-4 py-3">Min</th><th class="px-4 py-3">Max</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">Chromium (Cr)</td><td class="px-4 py-3">18.00%</td><td class="px-4 py-3">20.00%</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Nickel (Ni)</td><td class="px-4 py-3">8.00%</td><td class="px-4 py-3">10.50%</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3">Carbon (C)</td><td class="px-4 py-3">—</td><td class="px-4 py-3">0.08%</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Manganese (Mn)</td><td class="px-4 py-3">—</td><td class="px-4 py-3">2.00%</td></tr>
            <tr class="bg-white"><td class="px-4 py-3">Phosphorus (P)</td><td class="px-4 py-3">—</td><td class="px-4 py-3">0.045%</td></tr>
          </tbody>
        </table>
      </div>

      <div class="bg-red-50 border-l-4 border-red-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-red-800 text-sm">🚨 Common Fraud Alert</p>
        <p class="text-red-700 text-sm mt-1">Some traders issue their own "MTC" on their letterhead — this is NOT a mill certificate. A genuine MTC must be on the originating mill's letterhead with the mill's stamp. If in doubt, contact the mill directly with the heat number to verify. Tatvam Overseas Inc supplies only genuine mill-certified material with verifiable heat numbers.</p>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Always demand a <strong>mill-issued</strong> MTC, not a trader-issued certificate.</li>
          <li>Verify the <strong>Heat Number</strong> is physically stamped on every piece.</li>
          <li>Cross-check Ni% for 304 (must be 8–10.5%) — this is the easiest fraud to catch.</li>
          <li>For critical applications, use <strong>XRF (PMI gun)</strong> to verify chemistry in field.</li>
          <li>Tatvam Overseas Inc maintains an <a href="mtc.html" class="text-emerald-600 underline">online MTC verification portal</a> for all supplied material.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 10. AVOID CHEATING
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "avoid-cheating",
    title: "7 Red Flags: How to Avoid Getting Cheated When Buying Stainless Steel",
    date: "Nov 20, 2025",
    category: "Market Trends",
    featured: false,
    image: "assets/images/pool/factory.jpg",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "7 Red Flags When Buying Stainless Steel — Avoid Fraud | Tatvam Overseas Inc",
    seoDescription: "Under-gauge material, fake stamping, and grade substitution are common scams in the Indian steel market. Learn to protect yourself with these 7 red flags.",
    keywords: ["stainless steel buying tips", "steel fraud", "under gauge stainless", "fake 304", "MTC verification", "steel buying guide India"],
    tags: ["Market", "Buying Tips", "Fraud Prevention", "Quality", "MTC"],
    snippet: "Buying SS 304 and getting SS 202. Ordering 1mm and getting 0.85mm. Fake mill stamping on imported coils. The Indian steel market has real fraud risks. Here are 7 actionable red flags that every procurement professional must know.",
    relatedIds: ["understanding-mtc", "jindal-vs-imported", "hidden-cost-undergauge"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Real Risks in the Indian Market</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">India's stainless steel market is large, competitive, and unfortunately, prone to quality adulteration. From large infrastructure projects to small fabrication shops, procurement teams routinely encounter grade substitution, under-gauge material, and fake certification. Here are 7 red flags to protect yourself.</p>

      <div class="space-y-5 mb-8">
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <div class="flex gap-3 items-start">
            <span class="bg-red-100 text-red-700 font-black text-sm px-3 py-1 rounded-full mt-0.5 flex-shrink-0">01</span>
            <div>
              <h3 class="font-bold text-slate-900 mb-1">The "Magnet Test" Substitute</h3>
              <p class="text-sm text-slate-600">Using a magnet to verify "304 is non-magnetic" will not distinguish SS 304 from SS 202 — both are austenitic and non-magnetic. Only a <strong>Molybdenum spot test, XRF PMI gun, or MTC verification</strong> can confirm grade.</p>
            </div>
          </div>
        </div>
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <div class="flex gap-3 items-start">
            <span class="bg-red-100 text-red-700 font-black text-sm px-3 py-1 rounded-full mt-0.5 flex-shrink-0">02</span>
            <div>
              <h3 class="font-bold text-slate-900 mb-1">Under-Gauge Material</h3>
              <p class="text-sm text-slate-600">You order 1.0mm and receive 0.85mm. The "tolerance" saves them 15% material cost but reduces your product's structural integrity by the same margin. <strong>Always carry a digital vernier caliper</strong> and measure 10 random points across a sheet.</p>
            </div>
          </div>
        </div>
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <div class="flex gap-3 items-start">
            <span class="bg-red-100 text-red-700 font-black text-sm px-3 py-1 rounded-full mt-0.5 flex-shrink-0">03</span>
            <div>
              <h3 class="font-bold text-slate-900 mb-1">Fake or Re-used Stamping</h3>
              <p class="text-sm text-slate-600">Any printer can print "JSPL 304" on a packing label or stamp it on a coil edge. Always <strong>cross-reference the heat number</strong> directly with the mill (Jindal's website has a heat number verification portal). Tatvam Overseas Inc provides genuine mill-issued MTCs only.</p>
            </div>
          </div>
        </div>
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <div class="flex gap-3 items-start">
            <span class="bg-amber-100 text-amber-700 font-black text-sm px-3 py-1 rounded-full mt-0.5 flex-shrink-0">04</span>
            <div>
              <h3 class="font-bold text-slate-900 mb-1">Trader-Issued MTCs (Not Mill MTCs)</h3>
              <p class="text-sm text-slate-600">Some traders issue their own "Material Certificate" on their letterhead — this has no legal standing. A genuine MTC comes from the originating mill on its official letterhead with a verifiable heat number.</p>
            </div>
          </div>
        </div>
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <div class="flex gap-3 items-start">
            <span class="bg-amber-100 text-amber-700 font-black text-sm px-3 py-1 rounded-full mt-0.5 flex-shrink-0">05</span>
            <div>
              <h3 class="font-bold text-slate-900 mb-1">Price Too Good to Be True</h3>
              <p class="text-sm text-slate-600">SS 304 has a market price band. If a supplier quotes 15–20% below the prevailing market rate, it's almost certainly 202 or imported material without proper certification. Real discounts of 2–5% are possible from large stockists — not 15–20%.</p>
            </div>
          </div>
        </div>
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <div class="flex gap-3 items-start">
            <span class="bg-amber-100 text-amber-700 font-black text-sm px-3 py-1 rounded-full mt-0.5 flex-shrink-0">06</span>
            <div>
              <h3 class="font-bold text-slate-900 mb-1">Mixed Bundling</h3>
              <p class="text-sm text-slate-600">Good-quality sheets are placed on top of the bundle for inspection; inferior material is buried inside. Always inspect a random sample from the middle of the bundle before accepting the lot.</p>
            </div>
          </div>
        </div>
        <div class="border border-slate-200 rounded-xl p-5 bg-white shadow-sm">
          <div class="flex gap-3 items-start">
            <span class="bg-slate-100 text-slate-700 font-black text-sm px-3 py-1 rounded-full mt-0.5 flex-shrink-0">07</span>
            <div>
              <h3 class="font-bold text-slate-900 mb-1">No Weight-Based Pricing</h3>
              <p class="text-sm text-slate-600">Buying "per sheet" instead of "per kg" makes under-gauging invisible. Always <strong>buy by weight</strong> and verify the theoretical weight (L × W × T × density) against the actual delivery weight on your weigh bridge.</p>
            </div>
          </div>
        </div>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Never rely on magnet, colour, or label alone to verify grade.</li>
          <li>Always demand <strong>original mill MTC</strong> with heat number stamped on material.</li>
          <li>Measure gauge with a vernier caliper at multiple points.</li>
          <li>Buy <strong>by weight, not per sheet</strong>.</li>
          <li>If price is &gt; 10% below market, investigate before ordering.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 11. WELDING 316L
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "welding-316l",
    title: "Welding SS 316L Without Sensitisation — A Fabricator's Guide",
    date: "Nov 12, 2025",
    category: "Fabrication",
    featured: false,
    image: "assets/images/pool/welding.jpg",
    readingTime: "7 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Welding Stainless Steel SS 316L — Sensitisation, Filler Wire, Pickling | Tatvam Overseas Inc",
    seoDescription: "Complete guide to welding SS 316L stainless steel. Prevent sensitisation (weld decay) with correct filler wire selection, interpass temperature control, and post-weld pickling.",
    keywords: ["welding stainless steel", "316L welding guide", "ER316L filler wire", "sensitisation stainless", "weld decay", "pickling passivation"],
    tags: ["Welding", "SS 316L", "Fabrication", "Sensitisation", "Technical Guide"],
    snippet: "Welding stainless steel incorrectly causes 'weld decay' — intergranular corrosion that destroys the weld zone. Here's how to use ER316L filler wire, maintain correct interpass temperatures, and pickle the weld to restore the passive layer.",
    relatedIds: ["corrosion-types", "duplex-welding", "pitting-corrosion"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Understanding Sensitisation (Weld Decay)</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">When stainless steel is held in the temperature range of <strong>425–800°C</strong> (which happens in the Heat Affected Zone during welding), chromium carbides (Cr₂₃C₆) precipitate at grain boundaries. This depletes chromium from the adjacent zone below the critical 10.5% threshold, leaving a narrow band without corrosion protection. This is called <strong>sensitisation</strong> or "weld decay," and it's the most common cause of corrosion failure in welded SS structures.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Welding Process Comparison</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Process</th><th class="px-4 py-3">Pros</th><th class="px-4 py-3">Cons</th><th class="px-4 py-3">Best for SS 316L?</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">TIG (GTAW)</td><td class="px-4 py-3">Clean, low heat input, no spatter</td><td class="px-4 py-3">Slow, skilled welder needed</td><td class="px-4 py-3 text-emerald-700 font-bold">Yes — preferred</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold">MIG (GMAW)</td><td class="px-4 py-3">Fast, good for thick sections</td><td class="px-4 py-3">More spatter; higher heat input</td><td class="px-4 py-3">Yes, with correct wire</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">MMA (SMAW)</td><td class="px-4 py-3">Flexible, low equipment cost</td><td class="px-4 py-3">Slag inclusion risk; higher heat</td><td class="px-4 py-3 text-amber-600">Use with caution</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-bold">Plasma (PAW)</td><td class="px-4 py-3">Very precise, narrow HAZ</td><td class="px-4 py-3">High equipment cost</td><td class="px-4 py-3 text-emerald-700 font-bold">Yes — for critical</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Filler Wire Selection</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Base Metal</th><th class="px-4 py-3">Recommended TIG/MIG Wire</th><th class="px-4 py-3">Electrode (MMA)</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">SS 304</td><td class="px-4 py-3 font-bold">ER308L</td><td class="px-4 py-3">E308L-16</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">SS 316 / 316L</td><td class="px-4 py-3 font-bold">ER316L</td><td class="px-4 py-3">E316L-16</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3">Duplex 2205</td><td class="px-4 py-3 font-bold">ER2209</td><td class="px-4 py-3">E2209-16</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3">SS 321</td><td class="px-4 py-3 font-bold">ER321 or ER347</td><td class="px-4 py-3">E347-16</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Critical Welding Controls</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs mt-0.5 flex-shrink-0">✓</span><div><strong>Use L-grade base metal</strong> — SS 316L (≤ 0.03%C) prevents sensitisation at grain boundaries.</div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs mt-0.5 flex-shrink-0">✓</span><div><strong>Interpass temperature ≤ 150°C</strong> — Allow the weld to cool. Never lay another pass on red-hot previous pass.</div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs mt-0.5 flex-shrink-0">✓</span><div><strong>Back-purge with Argon</strong> — Purge the root side of the weld with Argon to prevent oxidation (sugaring) on the inside of pipes.</div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs mt-0.5 flex-shrink-0">✓</span><div><strong>Post-weld pickling & passivation</strong> — Remove heat tint (oxidised zone) using pickling paste (HNO₃/HF mixture), then passivate with citric or nitric acid solution.</div></li>
        <li class="flex gap-3 items-start"><span class="bg-emerald-100 text-emerald-700 font-bold px-2 py-1 rounded text-xs mt-0.5 flex-shrink-0">✓</span><div><strong>Dedicated SS tools</strong> — Never use grinding wheels, wire brushes, or clamps that have touched carbon steel on stainless.</div></li>
      </ul>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Always use <strong>316L (low carbon)</strong> for welded assemblies.</li>
          <li>Correct filler: <strong>ER316L for TIG/MIG</strong>, E316L-16 for MMA.</li>
          <li>Control interpass temperature: <strong>max 150°C between passes</strong>.</li>
          <li>Back-purge with Argon to prevent root sugaring in pipe welds.</li>
          <li>Always pickle + passivate after welding to restore the passive layer.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 12. PVD COATING
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "pvd-coating",
    title: "What is PVD Coating on Stainless Steel? Gold, Rose Gold, Black & More",
    date: "Feb 20, 2025",
    category: "Aesthetics",
    featured: false,
    image: "assets/images/pool/etched.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "PVD Coating on Stainless Steel — Gold, Rose Gold, Black Finish | Tatvam Overseas Inc",
    seoDescription: "Physical Vapour Deposition (PVD) creates scratch-resistant coloured stainless steel. Learn about PVD Gold, Rose Gold, Black, Bronze, and Champagne finishes.",
    keywords: ["PVD coating stainless steel", "gold stainless steel sheet", "black stainless steel", "rose gold steel", "PVD vs paint", "coloured stainless steel"],
    tags: ["PVD", "Gold Finish", "Black Steel", "Aesthetics", "Interior Design"],
    snippet: "PVD (Physical Vapour Deposition) is how we get luxurious Gold, Rose Gold, and Black stainless steel — without paint, without plating, without peeling. The ceramic-hard TiN coating is more scratch-resistant than the steel underneath.",
    relatedIds: ["surface-finishes", "buffing-polishing", "ss-304-vs-316"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">What is PVD?</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Physical Vapour Deposition (PVD) is a vacuum coating process where target material (Titanium, Zirconium, or Chromium) is vaporised by an electron beam or magnetron sputtering and deposited atom-by-atom onto the stainless steel surface. The result is a <strong>0.3–0.5 µm thin ceramic film</strong> (typically TiN for gold, TiAlN for rose gold, ZrN for champagne, TiC for black) that is chemically bonded to the substrate.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">PVD Colours Available</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">PVD Colour</th><th class="px-4 py-3">Compound</th><th class="px-4 py-3">Hardness (HV)</th><th class="px-4 py-3">Typical Application</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold" style="color:#b8860b;">PVD Gold</td><td class="px-4 py-3">TiN</td><td class="px-4 py-3">2000–2500</td><td class="px-4 py-3">Hotel lobbies, luxury retail, lift panels</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold" style="color:#b76e79;">PVD Rose Gold</td><td class="px-4 py-3">TiAlN</td><td class="px-4 py-3">2200–2800</td><td class="px-4 py-3">Bathrooms, high-end residential, jewelry display</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold text-slate-900">PVD Black</td><td class="px-4 py-3">TiC / CrN</td><td class="px-4 py-3">2500–3000</td><td class="px-4 py-3">Contemporary interiors, feature walls, high-end kitchen</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold" style="color:#8B7355;">PVD Bronze</td><td class="px-4 py-3">TiAlN</td><td class="px-4 py-3">2000–2500</td><td class="px-4 py-3">Premium hospitality, architectural facades</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-bold" style="color:#c8a951;">PVD Champagne</td><td class="px-4 py-3">ZrN</td><td class="px-4 py-3">2000–2400</td><td class="px-4 py-3">Office interiors, reception counters</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">PVD vs. Paint vs. Electroplating</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Attribute</th><th class="px-4 py-3">PVD</th><th class="px-4 py-3">Paint / Powder Coat</th><th class="px-4 py-3">Electroplating</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Thickness</td><td class="px-4 py-3">0.3–0.5 µm</td><td class="px-4 py-3">50–150 µm</td><td class="px-4 py-3">5–25 µm</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Hardness</td><td class="px-4 py-3 text-emerald-700 font-bold">2000–3000 HV</td><td class="px-4 py-3">~200 HV</td><td class="px-4 py-3">~500 HV</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Peeling Risk</td><td class="px-4 py-3 text-emerald-700 font-bold">None (atomic bond)</td><td class="px-4 py-3 text-red-600">Yes</td><td class="px-4 py-3 text-amber-600">Possible at edges</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Colour Consistency</td><td class="px-4 py-3 text-amber-600">Batch control needed</td><td class="px-4 py-3 text-emerald-700">Excellent</td><td class="px-4 py-3">Good</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-semibold">Environmental</td><td class="px-4 py-3 text-emerald-700">No toxic waste</td><td class="px-4 py-3 text-amber-600">VOC emissions</td><td class="px-4 py-3 text-red-600">Heavy metal waste</td></tr>
          </tbody>
        </table>
      </div>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-amber-800 text-sm">💡 Colour Matching Note</p>
        <p class="text-amber-700 text-sm mt-1">PVD colour consistency can vary between production batches. For large architectural projects, specify all sheets from a single batch. Tatvam Overseas Inc maintains batch records for colour-matched reorders.</p>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>PVD is an atomic ceramic bond — it <strong>never peels or cracks</strong>.</li>
          <li>PVD Gold (TiN) hardness reaches 2000–2500 HV — harder than the steel underneath.</li>
          <li>Available in Gold, Rose Gold, Black, Bronze, Champagne, Blue, Green.</li>
          <li>Colour varies slightly between batches — order all from one batch for large projects.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 13. CORROSION TYPES
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "corrosion-types",
    title: "5 Types of Corrosion Every Engineer Must Know",
    date: "Feb 05, 2025",
    category: "Corrosion Science",
    featured: false,
    image: "assets/images/pool/rust.jpg",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "5 Types of Stainless Steel Corrosion — Galvanic, Crevice, Pitting, SCC | Tatvam Overseas Inc",
    seoDescription: "Understand galvanic, crevice, pitting, intergranular, and stress corrosion cracking in stainless steel. Engineering design tips to prevent each type.",
    keywords: ["types of corrosion stainless steel", "galvanic corrosion", "crevice corrosion", "SCC stainless steel", "intergranular corrosion"],
    tags: ["Corrosion", "SCC", "Galvanic", "Crevice", "Corrosion Science"],
    snippet: "Not all corrosion is equal. Stainless steel can fail from 5 distinct corrosion mechanisms — galvanic, crevice, pitting, intergranular (weld decay), and stress corrosion cracking. Understanding each helps you design structures that last decades.",
    relatedIds: ["pitting-corrosion", "railing-rust", "welding-316l"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Why Stainless Steel Still Corrodes</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Stainless steel is highly corrosion resistant — but it is not "stainless forever." The chromium oxide passive film that protects it can be broken by mechanical damage, chemical attack, electrochemical cells, or thermal cycling. Knowing which type of corrosion threatens your application helps you select the right grade and design features to prevent it.</p>

      <div class="space-y-5 mb-8">
        <div class="border border-red-200 bg-red-50 rounded-xl p-5">
          <h3 class="font-black text-red-800 text-lg mb-2">1. Galvanic Corrosion</h3>
          <p class="text-sm text-slate-700 mb-2"><strong>Cause:</strong> When two dissimilar metals contact each other in the presence of an electrolyte (water/moisture), an electrochemical cell forms. The less noble metal (anode) corrodes rapidly.</p>
          <p class="text-sm text-slate-700 mb-2"><strong>Classic Example:</strong> Stainless steel bolts fastening carbon steel structure in a wet environment. The carbon steel corrodes aggressively.</p>
          <p class="text-sm font-semibold text-red-700">Prevention: Use insulating bushings/washers between dissimilar metals, or use all-SS fasteners.</p>
        </div>
        <div class="border border-amber-200 bg-amber-50 rounded-xl p-5">
          <h3 class="font-black text-amber-800 text-lg mb-2">2. Crevice Corrosion</h3>
          <p class="text-sm text-slate-700 mb-2"><strong>Cause:</strong> In tight crevices (under washers, in threaded connections, at overlapping joints), oxygen is depleted and chlorides concentrate. The passive layer fails in this low-oxygen zone.</p>
          <p class="text-sm font-semibold text-amber-700">Prevention: Use full-penetration welds instead of overlap joints; specify higher PREN grades (316 or duplex) for crevice-prone designs.</p>
        </div>
        <div class="border border-orange-200 bg-orange-50 rounded-xl p-5">
          <h3 class="font-black text-orange-800 text-lg mb-2">3. Pitting Corrosion</h3>
          <p class="text-sm text-slate-700 mb-2"><strong>Cause:</strong> Chloride ions locally break the passive film, creating autocatalytic pits that grow deeper while the surface looks clean.</p>
          <p class="text-sm font-semibold text-orange-700">Prevention: Select grade based on PREN (environment-matched). Clean regularly to remove chloride deposits.</p>
        </div>
        <div class="border border-purple-200 bg-purple-50 rounded-xl p-5">
          <h3 class="font-black text-purple-800 text-lg mb-2">4. Intergranular Corrosion (Sensitisation / Weld Decay)</h3>
          <p class="text-sm text-slate-700 mb-2"><strong>Cause:</strong> Welding holds metal at 425–800°C, precipitating chromium carbides at grain boundaries. Adjacent zones are chromium-depleted and corrode selectively.</p>
          <p class="text-sm font-semibold text-purple-700">Prevention: Use L-grade (304L, 316L), stabilised grades (321, 347), control interpass temperatures, post-weld pickle.</p>
        </div>
        <div class="border border-blue-200 bg-blue-50 rounded-xl p-5">
          <h3 class="font-black text-blue-800 text-lg mb-2">5. Stress Corrosion Cracking (SCC)</h3>
          <p class="text-sm text-slate-700 mb-2"><strong>Cause:</strong> Tensile stress + chloride environment causes sudden brittle cracking even in high-grade austenitic steels. SS 304 and 316 are susceptible above ~60°C in chloride environments.</p>
          <p class="text-sm font-semibold text-blue-700">Prevention: Use Duplex 2205 (far more SCC-resistant), reduce residual stresses via heat treatment, avoid chloride-contaminated insulation on hot SS surfaces.</p>
        </div>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li><strong>Galvanic:</strong> Insulate dissimilar metals, or use same metal family.</li>
          <li><strong>Crevice:</strong> Full-penetration welds, avoid standing water in joints.</li>
          <li><strong>Pitting:</strong> Match grade PREN to chloride level of the environment.</li>
          <li><strong>Intergranular:</strong> Use L-grades, control welding temperature, post-weld pickle.</li>
          <li><strong>SCC:</strong> Use Duplex 2205 in hot chloride service; 304/316 are susceptible.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 14. CALCULATING WEIGHT
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "calculating-weight",
    title: "How to Calculate Stainless Steel Weight — Sheets, Pipes & Bars",
    date: "March 01, 2025",
    category: "Utility",
    featured: false,
    image: "assets/images/pool/plates.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Stainless Steel Weight Calculator — Sheets, Pipes, Bars Formula | Tatvam Overseas Inc",
    seoDescription: "Step-by-step formulas for calculating stainless steel weight for sheets, plates, round pipes, round bars, and flat bars. With density values for all grades.",
    keywords: ["stainless steel weight calculator", "SS weight formula", "steel sheet weight", "pipe weight calculation", "bar weight calculator"],
    tags: ["Weight Calculator", "Formula", "Utility", "Sheets", "Pipes", "Bars"],
    snippet: "Accurate weight calculation is essential for logistics, costing, and procurement. Here are the exact formulas for sheets/plates, round pipes, round bars, and flat bars — with the correct density values for every stainless steel grade.",
    relatedIds: ["sheet-vs-plate", "pipe-vs-tube", "hidden-cost-undergauge"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Density by Grade</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Grade Family</th><th class="px-4 py-3">Grades</th><th class="px-4 py-3">Density (g/cm³)</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">Austenitic 300</td><td class="px-4 py-3">304, 316, 321, 347</td><td class="px-4 py-3 font-bold">7.93–7.98</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Austenitic 200</td><td class="px-4 py-3">202, 201</td><td class="px-4 py-3 font-bold">7.80</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3">Ferritic 400</td><td class="px-4 py-3">409, 430, 446</td><td class="px-4 py-3 font-bold">7.70–7.80</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Martensitic 400</td><td class="px-4 py-3">410, 420, 431</td><td class="px-4 py-3 font-bold">7.75–7.80</td></tr>
            <tr class="bg-white"><td class="px-4 py-3">Duplex</td><td class="px-4 py-3">2205, 2507</td><td class="px-4 py-3 font-bold">7.80</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Formulas</h2>

      <div class="space-y-5 mb-8">
        <div class="bg-slate-900 rounded-xl p-5 text-white">
          <h4 class="font-bold text-emerald-400 mb-2">Sheet / Plate Weight</h4>
          <code class="text-sm">Weight (kg) = Length (m) × Width (m) × Thickness (mm) × Density (g/cm³)</code>
          <p class="text-slate-400 text-xs mt-2">Example: SS 304 sheet, 2.5m × 1.25m × 2mm = 2.5 × 1.25 × 2 × 7.93 = <strong class="text-white">49.6 kg</strong></p>
        </div>
        <div class="bg-slate-900 rounded-xl p-5 text-white">
          <h4 class="font-bold text-emerald-400 mb-2">Round Pipe Weight</h4>
          <code class="text-sm">Weight (kg/m) = π/4 × [(OD² − ID²)] × Density × 0.001</code>
          <p class="text-slate-400 text-xs mt-2">Or simplified: (OD − WT) × WT × 0.02466 × Density (for SS 304 = 0.02466 × 7.93)</p>
          <p class="text-slate-400 text-xs mt-1">Example: 2" NB, Sch 40 pipe (OD 60.3mm, WT 3.91mm): (60.3 − 3.91) × 3.91 × 0.02466 × 7.93 = <strong class="text-white">5.44 kg/m</strong></p>
        </div>
        <div class="bg-slate-900 rounded-xl p-5 text-white">
          <h4 class="font-bold text-emerald-400 mb-2">Round Bar Weight</h4>
          <code class="text-sm">Weight (kg/m) = (D²/4) × π × Density × 0.001</code>
          <p class="text-slate-400 text-xs mt-2">Simplified: D² × 0.006162 (for SS 304 = 0.006162 × 7.93 ÷ 7.93 adjustment)<br>Or use: D(mm)² × 0.006162 kg/m for 7.93 density</p>
          <p class="text-slate-400 text-xs mt-1">Example: 50mm diameter SS 304 bar = 50² × 0.006162 = <strong class="text-white">15.4 kg/m</strong></p>
        </div>
        <div class="bg-slate-900 rounded-xl p-5 text-white">
          <h4 class="font-bold text-emerald-400 mb-2">Flat Bar (Patti) Weight</h4>
          <code class="text-sm">Weight (kg/m) = Width (mm) × Thickness (mm) × Density × 0.001</code>
          <p class="text-slate-400 text-xs mt-1">Example: 50mm × 6mm SS 304 flat bar = 50 × 6 × 7.93 × 0.001 = <strong class="text-white">2.38 kg/m</strong></p>
        </div>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>SS 304/316 density = <strong>7.93/7.98 g/cm³</strong> — use this for all 300-series weight calculations.</li>
          <li>Always calculate theoretical weight and compare with your delivery challan weight — significant deviation indicates under-gauge or wrong grade.</li>
          <li>For logistics planning, allow 3–5% tolerance for standard mill material.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 15. SHEET VS PLATE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "sheet-vs-plate",
    title: "Sheet vs. Plate vs. Coil: Where are the Boundaries?",
    date: "March 15, 2025",
    category: "Basics",
    featured: false,
    image: "assets/images/pool/plates.jpg",
    readingTime: "4 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Stainless Steel Sheet vs Plate vs Coil — Thickness & Finish Differences | Tatvam Overseas Inc",
    seoDescription: "What's the difference between a stainless steel sheet and a plate? Where does a sheet end and a plate begin? And what is a coil? Clear definitions with industry standards.",
    keywords: ["steel sheet vs plate", "stainless steel plate definition", "coil vs sheet steel", "sheet thickness", "plate thickness stainless"],
    tags: ["Sheet", "Plate", "Coil", "Basics", "Thickness"],
    snippet: "At what thickness does a Sheet become a Plate? What exactly is a Coil? These are industry-specific definitions that affect pricing, standards, and lead times. The answer may surprise even experienced buyers.",
    relatedIds: ["calculating-weight", "pipe-vs-tube", "understanding-mtc"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Definitions</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Product</th><th class="px-4 py-3">Thickness</th><th class="px-4 py-3">Typical Finish</th><th class="px-4 py-3">Manufacturing</th><th class="px-4 py-3">Primary Standard</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold text-emerald-700">Sheet</td><td class="px-4 py-3">&lt; 5mm (or &lt; 3/16")</td><td class="px-4 py-3">2B, BA, Mirror, Hairline</td><td class="px-4 py-3">Cold Rolled</td><td class="px-4 py-3">ASTM A240</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold text-blue-700">Plate</td><td class="px-4 py-3">≥ 5mm (≥ 3/16")</td><td class="px-4 py-3">No.1 (HR), 2D</td><td class="px-4 py-3">Hot Rolled</td><td class="px-4 py-3">ASTM A240</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-bold text-amber-700">Coil</td><td class="px-4 py-3">0.10mm to 6mm</td><td class="px-4 py-3">2B, BA, HR</td><td class="px-4 py-3">CR or HR, wound on mandrel</td><td class="px-4 py-3">ASTM A240, JIS G4305</td></tr>
          </tbody>
        </table>
      </div>
      <p class="text-sm text-slate-500 mb-4">Note: The 5mm dividing line is a commercial convention in India. Some international standards define differently. In practice, flat stock between 3–6mm is often supplied in either sheet or plate form depending on mill capabilities.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Why This Matters for Your Order</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex gap-3 items-start"><span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span><div><strong>Lead Time:</strong> Sheets (2B finish) are typically ex-stock. Plates (No.1 finish) may need 7–14 days for non-standard sizes.</div></li>
        <li class="flex gap-3 items-start"><span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span><div><strong>Price:</strong> Plates are generally priced slightly higher per kg due to heavier rolling costs and lower volume.</div></li>
        <li class="flex gap-3 items-start"><span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span><div><strong>Surface:</strong> Cold-rolled sheets have controlled 2B surface. Hot-rolled plates have rough mill scale — secondary finishing needed for cosmetic applications.</div></li>
        <li class="flex gap-3 items-start"><span class="w-2 h-2 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span><div><strong>Applications:</strong> Sheets for fabrication, cladding, and forming. Plates for pressure vessels, structural, and heavy fabrication.</div></li>
      </ul>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li><strong>Sheet:</strong> &lt; 5mm, Cold Rolled, 2B/BA/Mirror finish.</li>
          <li><strong>Plate:</strong> ≥ 5mm, Hot Rolled, No.1 (rough) surface.</li>
          <li><strong>Coil:</strong> Wound strip from mill; cut-to-length for sheets or slit for patti/strips.</li>
          <li>Always specify thickness in mm, finish required, and standard (ASTM A240) on your PO.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 16. RAILING SELECTION
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "railing-selection",
    title: "Best Grade for Railings: Indoor vs. Outdoor vs. Coastal",
    date: "April 28, 2025",
    category: "Architecture",
    featured: false,
    image: "assets/images/pool/factory.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Best Stainless Steel Grade for Railings — SS 202 vs 304 vs 316 | Tatvam Overseas Inc",
    seoDescription: "Choosing the wrong grade for railings is the most common and costly mistake. SS 202 for indoor, SS 304 for outdoor, SS 316 for coastal. Detailed breakdown.",
    keywords: ["stainless steel railing grade", "SS 202 railing", "SS 304 outdoor railing", "316 coastal railing", "best stainless steel for handrail"],
    tags: ["Railings", "Architecture", "SS 202", "SS 304", "SS 316", "Grade Selection"],
    snippet: "SS 202 railings turn brown outdoors within a year. SS 304 railings pit at the seaside. Only SS 316 handles coastal salt spray without staining. This grade selection guide for railings and balustrades will save your project from premature failure.",
    relatedIds: ["ss-304-vs-316", "railing-rust", "pitting-corrosion"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Grade Selection Decision Tree</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Environment</th><th class="px-4 py-3">Recommended Grade</th><th class="px-4 py-3">Pipe Section</th><th class="px-4 py-3">Finish</th><th class="px-4 py-3">Why</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Indoor, dry (mall, hotel, home)</td><td class="px-4 py-3 font-bold text-amber-700">SS 202 J4</td><td class="px-4 py-3">Round / Square ERW</td><td class="px-4 py-3">Mirror or Satin</td><td class="px-4 py-3">Cost effective, no moisture exposure</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Semi-outdoor (covered car park, corridor)</td><td class="px-4 py-3 font-bold text-emerald-700">SS 304</td><td class="px-4 py-3">ERW Round Pipe</td><td class="px-4 py-3">Satin / Hairline</td><td class="px-4 py-3">Handles humidity; economical</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Outdoor, non-coastal (garden, terrace)</td><td class="px-4 py-3 font-bold text-emerald-700">SS 304</td><td class="px-4 py-3">ERW Round Pipe</td><td class="px-4 py-3">Satin / Hairline</td><td class="px-4 py-3">Handles rain and pollution</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Coastal (&lt;5km from sea)</td><td class="px-4 py-3 font-bold text-blue-700">SS 316</td><td class="px-4 py-3">Seamless preferred</td><td class="px-4 py-3">Satin</td><td class="px-4 py-3">Salt spray needs Mo protection</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-semibold">Marine / Offshore / Ship</td><td class="px-4 py-3 font-bold text-purple-700">SS 316 or Duplex</td><td class="px-4 py-3">Seamless pipes</td><td class="px-4 py-3">Passivated</td><td class="px-4 py-3">Constant salt water exposure</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Common Mistakes to Avoid</h2>
      <ul class="list-none space-y-3 mb-6">
        <li class="flex gap-3 items-start"><span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span><div><strong>Using SS 202 outdoors:</strong> 202 contains less Cr and Ni than 304. In outdoor humidity with pollution, it will develop rust spots and brown staining within 6–12 months.</div></li>
        <li class="flex gap-3 items-start"><span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span><div><strong>Using 304 at the coast:</strong> Within 1–2 km of the sea, salt air is enough to cause tea-staining and pitting on 304 pipe surfaces, especially in weld zones.</div></li>
        <li class="flex gap-3 items-start"><span class="w-2 h-2 bg-red-500 rounded-full mt-2 flex-shrink-0"></span><div><strong>Skipping passivation after welding:</strong> Weld zones must be pickled and passivated — the heat tint (blue/gold oxidation zone) is a chromium-depleted zone that will corrode first.</div></li>
      </ul>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li><strong>Indoor = SS 202</strong> (cost effective, excellent in dry conditions).</li>
          <li><strong>Outdoor/covered = SS 304</strong> (handles humidity and rain).</li>
          <li><strong>Coastal = SS 316</strong> (non-negotiable within 5km of sea).</li>
          <li>Always passivate weld zones — heat tint corrodes first.</li>
          <li>Specify <strong>ERW ASTM A554</strong> for decorative/structural; <strong>seamless ASTM A312</strong> for pressure applications.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 17. FOOD GRADE
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "food-grade-steel",
    title: "What Exactly is 'Food Grade' Stainless Steel?",
    date: "May 25, 2025",
    category: "Industry Focus",
    featured: false,
    image: "assets/images/pool/lab.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Food Grade Stainless Steel — SS 304 vs SS 316 for Food Processing | Tatvam Overseas Inc",
    seoDescription: "Is SS 202 food safe? What grade is required for HACCP compliance? Difference between SS 304 and SS 316 in food and pharmaceutical applications.",
    keywords: ["food grade stainless steel", "food safe stainless steel", "HACCP stainless steel", "SS 304 food grade", "316 pharmaceutical grade"],
    tags: ["Food Grade", "HACCP", "Pharmaceutical", "SS 304", "SS 316", "Industry Focus"],
    snippet: "There is no single 'Food Grade Certificate' — it's determined by grade, surface finish, and application. SS 304 is the standard for most food equipment; SS 316L is required for salty, acidic, or pharmaceutical service. SS 202 should NOT be used for wet food contact.",
    relatedIds: ["ss-304-vs-316", "surface-finishes", "pharmaceutical-standards"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">What "Food Grade" Actually Means</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">"Food Grade" is not a single certification — it is a combination of <strong>grade, surface finish, and fabrication quality</strong> that meets regulatory standards (HACCP, FDA 21 CFR, EU 1935/2004). The material must not migrate harmful substances to food, must be cleanable, and must not harbour bacteria in surface crevices.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Grade Selection for Food Applications</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Grade</th><th class="px-4 py-3">Food Safe?</th><th class="px-4 py-3">Best For</th><th class="px-4 py-3">Avoid For</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold">SS 202</td><td class="px-4 py-3 text-red-600 font-bold">NOT recommended</td><td class="px-4 py-3">Dry food packaging, storage racks</td><td class="px-4 py-3">Wet food contact, acid foods</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-bold text-emerald-700">SS 304</td><td class="px-4 py-3 text-emerald-700 font-bold">Yes ✓</td><td class="px-4 py-3">General food equipment, dairy, bakery, brewing</td><td class="px-4 py-3">Salty/brine environments</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold text-emerald-700">SS 316L</td><td class="px-4 py-3 text-emerald-700 font-bold">Yes ✓ (preferred)</td><td class="px-4 py-3">Soy sauce, ketchup, vinegar, brine, pharma</td><td class="px-4 py-3">Cost-prohibitive for dry food</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-bold">SS 430</td><td class="px-4 py-3 text-amber-600">Limited</td><td class="px-4 py-3">Dry food handling, oven interiors</td><td class="px-4 py-3">Acidic or wet food contact</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Surface Finish Requirements</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">For food contact surfaces, EHEDG (European Hygienic Engineering & Design Group) and 3-A Sanitary Standards specify:</p>
      <ul class="list-disc pl-5 space-y-1 mb-6 text-slate-700 text-sm">
        <li><strong>General food contact:</strong> Ra ≤ 0.8 µm (2B or better)</li>
        <li><strong>Critical food zones:</strong> Ra ≤ 0.4 µm</li>
        <li><strong>Pharmaceutical (GMP):</strong> Ra ≤ 0.25 µm or electropolished</li>
        <li>No pits, crevices, or overlapping joints where food can accumulate</li>
      </ul>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>SS 304 is the standard food-grade material for most food processing equipment.</li>
          <li>SS 316L is required for salty, acidic foods (ketchup, soy sauce, vinegar) and pharma.</li>
          <li>SS 202 is NOT suitable for wet food contact — it can leach metals and corrode.</li>
          <li>Surface finish matters as much as grade: Ra ≤ 0.8 µm for food contact.</li>
          <li>No single "Food Grade Certificate" exists — compliance is a combination of grade + finish + fabrication quality.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 18. PLASMA VS LASER
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "plasma-vs-laser",
    title: "Cutting Stainless Steel: Plasma vs. Fiber Laser — When to Use Which",
    date: "Nov 05, 2025",
    category: "Fabrication",
    featured: false,
    image: "assets/images/pool/welding.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Plasma Cutting vs Laser Cutting Stainless Steel — Comparison Guide | Tatvam Overseas Inc",
    seoDescription: "Fiber laser cutting offers precision and no dross up to 25mm. Plasma cutting is more economical for thick plates above 25mm. Complete comparison for fabricators.",
    keywords: ["laser cutting stainless steel", "plasma cutting vs laser", "fiber laser cutter", "stainless steel cutting method", "CNC cutting steel"],
    tags: ["Fabrication", "Laser Cutting", "Plasma", "CNC", "Cutting"],
    snippet: "Fiber laser cutting gives pristine edges with tight tolerances, but becomes uneconomical above 25mm. Plasma cutting handles thick plates cheaply but leaves a rougher edge. Here's exactly when to use each method.",
    relatedIds: ["welding-316l", "surface-protection", "custom-fabrication"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Technology Overview</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Attribute</th><th class="px-4 py-3">Fiber Laser</th><th class="px-4 py-3">Plasma (CNC)</th><th class="px-4 py-3">Waterjet</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Max thickness (SS)</td><td class="px-4 py-3">Up to 25–30mm</td><td class="px-4 py-3">Up to 150mm</td><td class="px-4 py-3">Up to 200mm</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Edge quality</td><td class="px-4 py-3 text-emerald-700 font-bold">Excellent (no dross)</td><td class="px-4 py-3 text-amber-600">Moderate (some dross)</td><td class="px-4 py-3 text-emerald-700">Excellent (no HAZ)</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Dimensional tolerance</td><td class="px-4 py-3">±0.1–0.2mm</td><td class="px-4 py-3">±0.5–1mm</td><td class="px-4 py-3">±0.1–0.3mm</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Heat Affected Zone (HAZ)</td><td class="px-4 py-3 text-amber-600">Narrow (0.2–0.5mm)</td><td class="px-4 py-3 text-red-600">Wide (2–5mm)</td><td class="px-4 py-3 text-emerald-700">None</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Speed</td><td class="px-4 py-3 text-emerald-700">Fast (thin sections)</td><td class="px-4 py-3 text-emerald-700">Fast (thick sections)</td><td class="px-4 py-3 text-red-600">Slow</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3 font-semibold">Relative cost</td><td class="px-4 py-3 text-amber-600">High (machine cost)</td><td class="px-4 py-3 text-emerald-700">Lower</td><td class="px-4 py-3 text-red-600">Highest</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Decision Guide</h2>
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <h4 class="font-bold text-blue-800 mb-2">Use Fiber Laser When:</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Thickness ≤ 20mm</li>
            <li>High precision required (±0.2mm)</li>
            <li>Complex profiles from DXF/DWG</li>
            <li>Decorative panels, architectural</li>
            <li>Minimal HAZ needed (near welds)</li>
          </ul>
        </div>
        <div class="bg-orange-50 border border-orange-200 rounded-xl p-4">
          <h4 class="font-bold text-orange-800 mb-2">Use Plasma When:</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Thickness &gt; 20mm (plates)</li>
            <li>Cost is priority over precision</li>
            <li>Simple profiles (straight cuts)</li>
            <li>Structural/pressure vessel work</li>
            <li>Edge will be machined after cutting</li>
          </ul>
        </div>
      </div>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-amber-800 text-sm">💡 PVC Film Note</p>
        <p class="text-amber-700 text-sm mt-1">Standard blue/clear PVC film on sheets burns under laser. Specify <strong>"Fiber Laser Film"</strong> (grey/black backing) when ordering sheets for laser processing. This transparent-to-laser film protects the surface during handling but allows the beam through cleanly.</p>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Fiber Laser: best for ≤ 20mm, high precision, complex profiles.</li>
          <li>Plasma: best for &gt; 25mm plates where edge quality is secondary.</li>
          <li>Waterjet: best for zero-HAZ cutting of critical parts or composites.</li>
          <li>Specify "Fiber Laser Film" PVC for sheets that will be laser processed.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 19. RAILING RUST FIX
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "railing-rust",
    title: "Why Your SS 304 Railing is Rusting (And How to Fix It)",
    date: "Nov 15, 2025",
    category: "Corrosion Science",
    featured: false,
    image: "assets/images/pool/rust.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Why SS 304 Stainless Steel Railing is Rusting — Causes & Fixes | Tatvam Overseas Inc",
    seoDescription: "SS 304 railings can show rust spots even in indoor environments due to iron contamination, acid exposure, or grade substitution. Here's how to diagnose and fix it.",
    keywords: ["stainless steel railing rusting", "why 304 is rusting", "iron contamination SS", "rust stainless steel railing fix", "passivation stainless"],
    tags: ["Corrosion", "Railings", "Iron Contamination", "Passivation", "Fix"],
    snippet: "You paid for SS 304 but your railing has brown rust spots. Before blaming the supplier, consider these 3 more likely causes: iron contamination from grinding, acid exposure from cleaning chemicals, or actual grade fraud. Here's how to diagnose and fix each.",
    relatedIds: ["corrosion-types", "railing-selection", "avoid-cheating"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Cause 1: Iron Contamination (Most Common)</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">If your fabricator used the <strong>same grinding wheel, wire brush, or cutting disc</strong> on carbon steel (MS) before using it on your SS railing, iron particles embed in the SS surface. These iron particles then rust — the SS itself is fine, but the embedded iron corrodes. The rust appears as small, random brown spots.</p>
      <p class="mb-4 text-slate-700 font-semibold">Fix: Use a passivation solution (citric acid 10% or nitric acid 20%) or passivation paste. Apply, wait 30 minutes, wash off with water. This dissolves the free iron particles. Use <strong>dedicated SS-only tools</strong> going forward.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Cause 2: Acid or Chemical Attack</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Toilet cleaners (hydrochloric/muriatic acid), floor cleaning acids, or bleach used near SS railings can permanently damage the passive layer. The damage manifests as pitting, discolouration, or widespread rust-like staining.</p>
      <p class="mb-4 text-slate-700 font-semibold">Fix: If caught early, passivation may restore the surface. If deep pitting has occurred, the surface must be mechanically polished (re-ground and re-polished) before passivation. Use only neutral pH cleaners near SS.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Cause 3: Grade Substitution</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">If none of the above apply, the railing may have been made from <strong>SS 202 sold as SS 304</strong>. SS 202 has lower Cr (13–17% vs 18–20%) and corrodes in outdoor/humid environments. Test with a Molybdenum spot test kit or request an XRF test.</p>
      <p class="mb-4 text-slate-700 font-semibold">Fix: If grade fraud is confirmed, the material must be replaced with genuine SS 304. File a complaint with the supplier and request MTC verification.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Maintenance Protocol</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Frequency</th><th class="px-4 py-3">Action</th><th class="px-4 py-3">Product</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3">Weekly</td><td class="px-4 py-3">Wipe down to remove fingerprints and dust</td><td class="px-4 py-3">Mild soap + water, dry cloth</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Monthly</td><td class="px-4 py-3">Clean any staining or build-up</td><td class="px-4 py-3">Neutral pH SS cleaner</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3">Annually</td><td class="px-4 py-3">Full passivation treatment</td><td class="px-4 py-3">10% citric acid solution</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3">Never</td><td class="px-4 py-3">Use acid cleaners or steel wool</td><td class="px-4 py-3">Avoid HCl, bleach, wire wool</td></tr>
          </tbody>
        </table>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Most SS railing rust is <strong>iron contamination from fabrication tools</strong>, not grade failure.</li>
          <li>Fix with passivation (citric acid) — works in most cases.</li>
          <li>Acid cleaners destroy the passive layer — use only neutral pH products.</li>
          <li>If widespread rusting, verify grade with XRF or spot test — may be grade fraud.</li>
          <li>Annual passivation maintenance extends service life significantly.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 20. PRICE FACTORS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "price-factors",
    title: "Why Stainless Steel Prices Change Daily — The Alloy Surcharge Explained",
    date: "Oct 05, 2025",
    category: "Market Trends",
    featured: false,
    image: "assets/images/pool/market.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Why Stainless Steel Prices Fluctuate — LME Nickel, Alloy Surcharge | Tatvam Overseas Inc",
    seoDescription: "Stainless steel pricing is driven by LME Nickel, Chromium, and Molybdenum commodity prices. Learn how alloy surcharges are calculated and how to time your purchases.",
    keywords: ["stainless steel price", "alloy surcharge", "LME nickel price", "why stainless price changes", "steel market India"],
    tags: ["Pricing", "LME", "Nickel", "Market", "Surcharge"],
    snippet: "Stainless steel doesn't have a fixed market price — it changes daily based on LME Nickel, Chromium, and Molybdenum commodity prices. Understanding how the Alloy Surcharge (AS) works lets you time procurement optimally and manage project budgets accurately.",
    relatedIds: ["role-of-nickel", "jindal-vs-imported", "ss-202-applications"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Two-Part Price Structure</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Stainless steel price = <strong>Base Price + Alloy Surcharge (AS)</strong>. The base price covers manufacturing costs (rolling, annealing, finishing). The Alloy Surcharge covers the variable raw material cost of Nickel, Chromium, and Molybdenum — which trade on global commodity markets.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Alloy Surcharge Drivers</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Element</th><th class="px-4 py-3">Market</th><th class="px-4 py-3">Impact on SS 304 AS</th><th class="px-4 py-3">Impact on SS 316 AS</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Nickel (Ni)</td><td class="px-4 py-3">LME, London</td><td class="px-4 py-3 font-bold text-red-600">~60% of surcharge</td><td class="px-4 py-3 font-bold text-red-600">~55% of surcharge</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Chromium (Cr)</td><td class="px-4 py-3">China spot market</td><td class="px-4 py-3 font-bold text-amber-600">~30% of surcharge</td><td class="px-4 py-3 font-bold text-amber-600">~20% of surcharge</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-semibold">Molybdenum (Mo)</td><td class="px-4 py-3">Metal Bulletin</td><td class="px-4 py-3 text-green-600">Minimal (none in 304)</td><td class="px-4 py-3 font-bold text-amber-600">~25% of surcharge</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Procurement Timing Strategy</h2>
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h4 class="font-bold text-emerald-800 mb-2">When to Buy More</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>LME Nickel &lt; $14,000/MT</li>
            <li>Annual lows (typically Q1 or Q3)</li>
            <li>After price corrections</li>
            <li>Lock forward contracts when feasible</li>
          </ul>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 class="font-bold text-red-800 mb-2">When to Buy Minimum</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>LME Nickel &gt; $20,000/MT</li>
            <li>Geopolitical events (Russia is top Ni producer)</li>
            <li>EV battery demand spikes</li>
            <li>Consider switching to 202 for non-critical items</li>
          </ul>
        </div>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>SS price = Base + Alloy Surcharge. <strong>AS changes monthly</strong> with LME Nickel.</li>
          <li>Nickel drives ~60% of the 304 alloy surcharge — monitor LME weekly.</li>
          <li>Time large purchases when Nickel is historically low.</li>
          <li>For Nickel-price-hedged applications, switch to <strong>SS 430 or SS 202</strong>.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 21. JINDAL VS IMPORTED
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "jindal-vs-imported",
    title: "Jindal vs. Imported Stainless Steel: Which Should You Buy?",
    date: "Jan 15, 2025",
    category: "Market Trends",
    featured: false,
    image: "assets/images/pool/market.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Jindal vs Imported Stainless Steel — Which is Better? | Tatvam Overseas Inc",
    seoDescription: "Honest comparison of Jindal Stainless vs imported Chinese/Indonesian stainless steel. When to pay the Jindal premium and when imported is acceptable.",
    keywords: ["Jindal stainless steel", "imported vs domestic stainless steel", "Jindal vs China stainless", "Indian stainless steel mills", "Posco stainless India"],
    tags: ["Jindal", "Imported", "Market", "India", "Quality"],
    snippet: "Jindal Stainless is India's gold standard — consistent chemistry, tight gauge control. But imported (Posco, Tsingshan) can be 10–15% cheaper and perfectly acceptable for many applications. Here's the honest Total Cost of Ownership analysis.",
    relatedIds: ["understanding-mtc", "avoid-cheating", "price-factors"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Landscape of Indian Stainless Steel Supply</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">India's stainless steel supply comes from domestic mills (Jindal Stainless, SAIL, Chromeni) and imports (POSCO-India, Tsingshan Indonesia, Yieh United Taiwan). Each has a distinct price and quality profile. The right choice depends entirely on your application, quality requirements, and project constraints.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Comparison Matrix</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Criteria</th><th class="px-4 py-3">Jindal Stainless</th><th class="px-4 py-3">POSCO-India / Yieh</th><th class="px-4 py-3">Tsingshan Indonesia</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Chemistry consistency</td><td class="px-4 py-3 text-emerald-700 font-bold">Excellent</td><td class="px-4 py-3 text-emerald-700">Very Good</td><td class="px-4 py-3 text-amber-600">Good</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Gauge tolerance</td><td class="px-4 py-3 text-emerald-700 font-bold">±0.03mm (tight)</td><td class="px-4 py-3 text-emerald-700">±0.05mm</td><td class="px-4 py-3 text-amber-600">±0.1mm (wider)</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">MTC traceability</td><td class="px-4 py-3 text-emerald-700 font-bold">Full, verifiable online</td><td class="px-4 py-3 text-emerald-700">Full</td><td class="px-4 py-3 text-amber-600">Available, verify needed</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Price vs Jindal</td><td class="px-4 py-3">Baseline</td><td class="px-4 py-3 text-emerald-700">5–8% lower</td><td class="px-4 py-3 text-emerald-700">10–15% lower</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-semibold">Best for</td><td class="px-4 py-3">Pharma, export, pressure vessels</td><td class="px-4 py-3">General industrial, architectural</td><td class="px-4 py-3">Furniture, utensils, non-critical</td></tr>
          </tbody>
        </table>
      </div>

      <div class="bg-amber-50 border-l-4 border-amber-400 p-4 rounded-r-xl mb-6">
        <p class="font-bold text-amber-800 text-sm">💡 Procurement Recommendation</p>
        <p class="text-amber-700 text-sm mt-1">For pharmaceutical tanks, pressure vessels, export projects, or anything requiring 3rd-party inspection — specify Jindal or SAIL. For general fabrication (furniture, interiors, general engineering) where gauge tolerance of ±0.1mm is acceptable, imported material at 10–15% savings is a sound choice.</p>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Jindal = tightest gauge, best MTC traceability, highest price. Specify for critical applications.</li>
          <li>POSCO/Yieh = excellent quality, 5–8% savings. Good for most industrial applications.</li>
          <li>Tsingshan = good quality, 10–15% savings. Suitable for general fabrication.</li>
          <li>Always verify MTC for any imported material — check Ni% against ASTM limits.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 22. SS 202 APPLICATIONS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "ss-202-applications",
    title: "Is SS 202 a Viable Alternative to SS 304? Honest Analysis",
    date: "Sept 15, 2025",
    category: "Market Trends",
    featured: false,
    image: "assets/images/pool/sheets_blog.jpg",
    readingTime: "5 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "SS 202 vs SS 304 — When to Use SS 202 as an Alternative | Tatvam Overseas Inc",
    seoDescription: "With rising Nickel prices, many buyers switch to SS 202. When is it a viable alternative to 304 and when is it a false economy? Honest technical comparison.",
    keywords: ["SS 202 vs 304", "SS 202 alternative 304", "202 stainless steel applications", "200 series stainless steel", "is 202 food grade"],
    tags: ["SS 202", "SS 304", "200 Series", "Market", "Grade Comparison"],
    snippet: "When Nickel prices spike, the stainless market pivots to SS 202. It's 20–30% cheaper and looks identical to 304 — but has lower corrosion resistance. Here are the applications where 202 is genuinely suitable and the ones where it will fail.",
    relatedIds: ["ss-304-vs-316", "role-of-nickel", "railing-selection"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">SS 202 vs SS 304 — Chemical Comparison</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Element</th><th class="px-4 py-3">SS 202 (J4)</th><th class="px-4 py-3">SS 304</th><th class="px-4 py-3">Implication</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Chromium (Cr)</td><td class="px-4 py-3">15–17%</td><td class="px-4 py-3">18–20%</td><td class="px-4 py-3">304 has better passive layer</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Nickel (Ni)</td><td class="px-4 py-3">1.0–1.5%</td><td class="px-4 py-3">8.0–10.5%</td><td class="px-4 py-3">Key cost difference</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-semibold">Manganese (Mn)</td><td class="px-4 py-3">8–10% (replaces Ni)</td><td class="px-4 py-3">≤ 2%</td><td class="px-4 py-3">202 uses Mn to stabilise austenite</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3 font-semibold">Molybdenum (Mo)</td><td class="px-4 py-3">None</td><td class="px-4 py-3">None</td><td class="px-4 py-3">Neither has Mo (unlike 316)</td></tr>
            <tr class="bg-white"><td class="px-4 py-3 font-semibold">PREN (approx.)</td><td class="px-4 py-3">~15</td><td class="px-4 py-3">~18</td><td class="px-4 py-3">304 is 20% more pitting resistant</td></tr>
          </tbody>
        </table>
      </div>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Where 202 is Suitable vs. Where it Fails</h2>
      <div class="grid sm:grid-cols-2 gap-4 mb-6">
        <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-4">
          <h4 class="font-bold text-emerald-800 mb-2">✓ Good Applications for SS 202</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Indoor stair railings and balustrades</li>
            <li>Hotel and mall furniture (indoor)</li>
            <li>Decorative panels and lifts (indoor)</li>
            <li>Utensils (pressure cookers, woks)</li>
            <li>Interior architectural cladding</li>
            <li>Dry food storage racks</li>
          </ul>
        </div>
        <div class="bg-red-50 border border-red-200 rounded-xl p-4">
          <h4 class="font-bold text-red-800 mb-2">✗ Do NOT Use SS 202 For</h4>
          <ul class="text-sm text-slate-700 space-y-1 list-disc list-inside">
            <li>Outdoor railings or facades</li>
            <li>Coastal or marine applications</li>
            <li>Wet food processing equipment</li>
            <li>Pharmaceutical tanks</li>
            <li>Chemical environments</li>
            <li>Swimming pools or brine</li>
          </ul>
        </div>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>SS 202 is <strong>20–30% cheaper</strong> than 304 due to lower Nickel content.</li>
          <li>SS 202 is perfectly suitable for <strong>indoor, dry environments</strong>.</li>
          <li>In any outdoor, wet, or corrosive environment — 202 will fail. Use 304 minimum.</li>
          <li>SS 202 is <strong>NOT recommended for wet food contact</strong>.</li>
          <li>202 and 304 look identical — always verify grade with MTC before using in critical applications.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 23. STORAGE TIPS
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "storage-tips",
    title: "How to Store Stainless Steel Correctly in Your Warehouse",
    date: "Oct 10, 2025",
    category: "Maintenance",
    featured: false,
    image: "assets/images/pool/factory.jpg",
    readingTime: "4 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Stainless Steel Storage Guide — Preventing Rust and Contamination | Tatvam Overseas Inc",
    seoDescription: "Proper stainless steel storage prevents rust bloom, iron contamination, and surface damage. Essential guidelines for godowns and fabrication shops.",
    keywords: ["stainless steel storage", "how to store stainless steel", "SS warehouse storage", "prevent rust in storage", "steel godown storage"],
    tags: ["Storage", "Maintenance", "Warehouse", "Contamination Prevention"],
    snippet: "Storing SS on bare concrete, near carbon steel grinding dust, or without proper segregation causes 'rust bloom' and iron contamination — even before the steel reaches the customer. Here are the essential storage rules for any godown or fabrication shop.",
    relatedIds: ["railing-rust", "corrosion-types", "understanding-mtc"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Why Proper Storage Matters</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Stainless steel can be contaminated and damaged before it ever reaches your customer if stored incorrectly. The most common cause of "rust bloom" on new SS material is not grade failure — it's <strong>poor storage practice</strong>. Iron contamination from concrete floors, carbon steel proximity, and improper covering causes surface corrosion that is difficult to reverse.</p>

      <div class="space-y-4 mb-8">
        <div class="flex gap-4 items-start p-4 bg-white border border-slate-200 rounded-xl">
          <div class="bg-emerald-100 text-emerald-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">1</div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">Never Store on Bare Concrete</h3>
            <p class="text-sm text-slate-600">Concrete contains calcium, chlorides, and moisture that transfer to SS and initiate surface corrosion. Always store SS on <strong>wooden pallets</strong> (minimum 15cm elevation).</p>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4 bg-white border border-slate-200 rounded-xl">
          <div class="bg-emerald-100 text-emerald-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">2</div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">Segregate from Carbon Steel</h3>
            <p class="text-sm text-slate-600">Store SS completely separate from carbon steel/mild steel material. Grinding or cutting MS near SS causes iron particles to land on the SS surface and corrode. Maintain a <strong>dedicated SS-only storage zone</strong>.</p>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4 bg-white border border-slate-200 rounded-xl">
          <div class="bg-emerald-100 text-emerald-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">3</div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">Keep PVC Film Intact</h3>
            <p class="text-sm text-slate-600">Decorative-finish SS sheets arrive with PVC protective film. Keep this film on until the material reaches the final installation point. Remove film only just before installation to prevent scratching.</p>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4 bg-white border border-slate-200 rounded-xl">
          <div class="bg-emerald-100 text-emerald-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">4</div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">Cover in Open Storage</h3>
            <p class="text-sm text-slate-600">If stored outdoors or in open sheds, cover with industrial tarpaulins. Moisture + salt air contamination in coastal regions can cause surface staining even on covered material.</p>
          </div>
        </div>
        <div class="flex gap-4 items-start p-4 bg-white border border-slate-200 rounded-xl">
          <div class="bg-emerald-100 text-emerald-700 font-black text-lg w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0">5</div>
          <div>
            <h3 class="font-bold text-slate-900 mb-1">Use Non-Marring Lifting Equipment</h3>
            <p class="text-sm text-slate-600">When handling sheets with forklifts or cranes, use rubber-coated forks or nylon slings. Steel chains or bare metal forks scratch and embed iron in the SS surface.</p>
          </div>
        </div>
      </div>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>Store SS on <strong>wooden pallets</strong> — never on bare concrete.</li>
          <li>Create a <strong>dedicated SS-only zone</strong> away from any MS/carbon steel activity.</li>
          <li>Keep <strong>PVC film intact</strong> until final installation.</li>
          <li>Use rubber-coated handling equipment to prevent surface contamination.</li>
          <li>"Rust bloom" in storage is usually <strong>iron contamination, not SS failure</strong> — fixable with passivation.</li>
        </ul>
      </div>`
  },

  // ══════════════════════════════════════════════════════════════════════════
  // 24. SUSTAINABILITY
  // ══════════════════════════════════════════════════════════════════════════
  {
    id: "sustainability",
    title: "Is Stainless Steel Sustainable? The Lifecycle Analysis",
    date: "Jan 01, 2025",
    category: "Environment",
    featured: false,
    image: "assets/images/pool/factory.jpg",
    readingTime: "4 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-07-19",
    seoTitle: "Is Stainless Steel Sustainable? Recyclability, Lifecycle, Carbon Footprint | Tatvam Overseas Inc",
    seoDescription: "Stainless steel is 100% recyclable with 60% recycled content in new production. Compare its lifecycle carbon footprint against painted carbon steel and plastic alternatives.",
    keywords: ["stainless steel sustainability", "stainless steel recyclable", "green building materials", "stainless carbon footprint", "sustainable steel"],
    tags: ["Sustainability", "Environment", "Recyclability", "Green Building"],
    snippet: "Any sheet of SS 304 you buy today contains approximately 60% recycled scrap. Stainless steel is 100% recyclable, has a 50+ year service life, and requires no surface coatings — making it one of the greenest structural materials available.",
    relatedIds: ["food-grade-steel", "ss-304-vs-316"],
    content: `
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">The Circular Economy of Stainless Steel</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Stainless steel is inherently circular. It is <strong>100% recyclable</strong> at end of life — no degradation in quality or composition occurs during recycling. The global recycling rate for stainless steel is over 80%, and a typical new SS sheet contains <strong>~60% recycled scrap</strong>.</p>

      <h2 class="text-2xl font-black text-slate-900 mt-8 mb-3">Lifecycle Comparison vs. Alternatives</h2>
      <div class="overflow-x-auto mb-6 rounded-xl border border-slate-200 shadow-sm">
        <table class="w-full text-sm text-left">
          <thead class="bg-slate-900 text-white"><tr><th class="px-4 py-3">Material</th><th class="px-4 py-3">Service Life</th><th class="px-4 py-3">Recyclability</th><th class="px-4 py-3">Maintenance</th><th class="px-4 py-3">Carbon Footprint (lifetime)</th></tr></thead>
          <tbody>
            <tr class="border-b bg-white"><td class="px-4 py-3 font-bold text-emerald-700">Stainless Steel</td><td class="px-4 py-3 font-bold">50+ years</td><td class="px-4 py-3 font-bold text-emerald-700">100%</td><td class="px-4 py-3">Very low</td><td class="px-4 py-3 text-emerald-700 font-bold">Low (per service year)</td></tr>
            <tr class="border-b bg-slate-50"><td class="px-4 py-3">Painted Carbon Steel</td><td class="px-4 py-3">10–20 years</td><td class="px-4 py-3">~90% (after stripping)</td><td class="px-4 py-3">High (repaint every 5–7 yr)</td><td class="px-4 py-3 text-amber-600">Medium</td></tr>
            <tr class="border-b bg-white"><td class="px-4 py-3">Aluminium (anodised)</td><td class="px-4 py-3">30–40 years</td><td class="px-4 py-3">~75%</td><td class="px-4 py-3">Low</td><td class="px-4 py-3 text-amber-600">Medium-High (high smelting energy)</td></tr>
            <tr class="bg-slate-50"><td class="px-4 py-3">Plastic (UPVC)</td><td class="px-4 py-3">15–25 years</td><td class="px-4 py-3 text-red-600">~30%</td><td class="px-4 py-3">Low</td><td class="px-4 py-3 text-red-600">Very High (fossil fuel origin)</td></tr>
          </tbody>
        </table>
      </div>

      <p class="mb-4 text-slate-700 leading-relaxed">The initial production of stainless steel is energy-intensive, but amortized over its 50+ year service life with zero maintenance coatings and 100% recyclability at end of life, <strong>stainless steel has one of the lowest lifetime carbon footprints per service year</strong> of any structural material.</p>

      <div class="bg-emerald-50 border border-emerald-200 rounded-xl p-5 mb-8">
        <h3 class="font-black text-slate-900 text-lg mb-3">⚡ Key Takeaways</h3>
        <ul class="text-slate-700 text-sm space-y-2 list-disc list-inside">
          <li>New SS contains ~60% recycled content. Global recycling rate &gt; 80%.</li>
          <li>50+ year service life with minimal maintenance vs 10–20 years for painted steel.</li>
          <li>No paint, no coating, no hazardous surface treatment chemicals required.</li>
          <li>Highest lifetime sustainability among common structural metals when analysed per service year.</li>
        </ul>
      </div>`
  }

];

// Attach related posts HTML function to each blog's rendered modal content
// (called dynamically by script.js openBlogModal)