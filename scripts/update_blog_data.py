import re

with open('js/blog-data.js', 'r', encoding='utf-8') as f:
    text = f.read()

# 1. Update Post 1 image and featured and snippet and content
p1_old = '''    id: "ss-202-vs-ss-304-difference-uses-which-to-buy",
    title: "SS 202 vs SS 304: Differences, Uses and Which Grade to Buy",
    date: "Oct 21, 2026",
    category: "Technical Guide",
    featured: true,
    image: "assets/images/pool/sheets_prod.jpg",
    coverImage: "assets/images/pool/sheets_prod.jpg",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-10-21",
    seoTitle: "SS 202 vs SS 304: Differences, Uses and Which Grade to Buy | Tatvam Overseas",
    seoDescription: "Compare SS 202 and SS 304 stainless steel: composition, corrosion resistance, uses and how to verify the grade you receive. A practical guide for buyers.",
    keywords: ["SS 202 vs 304", "SS 202 difference SS 304", "which stainless steel grade to buy", "200 series vs 300 series", "SS 202 food grade"],
    tags: ["SS 202", "SS 304", "Grade Comparison", "Technical Guide"],
    snippet: "Compare SS 202 and SS 304 stainless steel: composition, corrosion resistance, uses and how to verify the grade you receive. A practical guide for buyers.",
    relatedIds: ["ss-304-vs-316", "stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror"],
    content: (function() {
      return `
      <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
        Compare SS 202 and SS 304 stainless steel: composition, corrosion resistance, uses and how to verify the grade you receive. A practical guide for buyers.
      </p>
      <h2 class="text-2xl font-black text-slate-900 mt-6 mb-3">Chemical Composition: Nickel vs Manganese</h2>
      <p class="mb-4 text-slate-700 leading-relaxed">Grade 304 contains 18-20% Chromium and 8-10.5% Nickel. Grade 202 conserves nickel by replacing part of it with 7.5-10% Manganese and Nitrogen, reducing raw material cost while maintaining an austenitic structure for indoor dry use.</p>
      `;
    })()'''

p1_new = '''    id: "ss-202-vs-ss-304-difference-uses-which-to-buy",
    title: "SS 202 vs SS 304: Differences, Uses and Which Grade to Buy",
    date: "Oct 21, 2026",
    category: "Technical Guide",
    featured: false,
    image: "assets/images/pool/sheets_prod.webp",
    coverImage: "assets/images/pool/sheets_prod.webp",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-10-22",
    seoTitle: "SS 202 vs SS 304: Differences & Uses | Tatvam Overseas",
    seoDescription: "Compare SS 202 and SS 304 stainless steel: composition, corrosion resistance, uses and how to verify the grade you receive. A practical guide for buyers.",
    keywords: ["SS 202 vs 304", "SS 202 difference SS 304", "which stainless steel grade to buy", "200 series vs 300 series", "SS 202 food grade"],
    tags: ["SS 202", "SS 304", "Grade Comparison", "Technical Guide"],
    snippet: "SS 304 contains roughly 8 to 10.5% nickel and offers better corrosion resistance and formability. SS 202 replaces part of the nickel with manganese and nitrogen, so it usually costs less but resists corrosion less well. Choose 202 for dry indoor uses such as utensils and interior panels, and 304 for food processing, outdoor or humid environments.",
    relatedIds: ["ss-304-vs-316", "stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror"],
    content: (function() {
      return `
      <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
        SS 304 contains roughly 8 to 10.5% nickel and offers better corrosion resistance and formability. SS 202 replaces part of the nickel with manganese and nitrogen, so it usually costs less but resists corrosion less well. Choose 202 for dry indoor uses such as utensils and interior panels, and 304 for food processing, outdoor or humid environments.
      </p>
      `;
    })()'''

assert p1_old in text, 'p1_old not matched'
text = text.replace(p1_old, p1_new)

# 2. Update Post 2 image and snippet and content
p2_old = '''    id: "stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror",
    title: "Stainless Steel Sheet Finishes: 2B, BA, No.4 and 8K Mirror Explained",
    date: "Oct 21, 2026",
    category: "Technical Guide",
    featured: false,
    image: "assets/images/pool/sheets_mirror.png",
    coverImage: "assets/images/pool/sheets_mirror.png",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-10-21",
    seoTitle: "Stainless Steel Sheet Finishes: 2B, BA, No.4 & 8K Mirror Explained | Tatvam Overseas",
    seoDescription: "Understand stainless steel sheet finishes from 2B and BA to No.4 brushed and 8K mirror. Compare production methods, reflectivity, fabrication suitability, and selection criteria.",
    keywords: ["stainless steel finishes", "2B vs BA finish", "No.4 brushed stainless", "8K mirror stainless", "sheet surface finishes"],
    tags: ["Surface Finishes", "2B", "BA", "No.4", "8K Mirror", "Technical Guide"],
    snippet: "Stainless steel sheet finishes range from rough hot-rolled No.1 to mirror-like 8K. Compare production methods, reflectivity, fabrication suitability, and practical tips.",
    relatedIds: ["ss-202-vs-ss-304-difference-uses-which-to-buy", "ss-304-vs-316"],
    content: (function() {
      return `
      <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
        Quick answer: Stainless steel sheet finishes range from rough hot-rolled No.1 to mirror-like 8K. 2B is the smooth, general-purpose cold-rolled finish. BA is brighter and more reflective. No.4 is a brushed satin finish that hides scratches, and 8K is a polished mirror finish. Pick the finish by look, cleaning needs and how the sheet will be formed or fabricated.
      </p>
      `;
    })()'''

p2_new = '''    id: "stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror",
    title: "Stainless Steel Sheet Finishes: 2B, BA, No.4 and 8K Mirror Explained",
    date: "Oct 21, 2026",
    category: "Technical Guide",
    featured: false,
    image: "assets/images/pool/sheets_mirror.webp",
    coverImage: "assets/images/pool/sheets_mirror.webp",
    readingTime: "6 min read",
    author: "Tatvam Overseas Inc Technical Team",
    lastUpdated: "2026-10-22",
    seoTitle: "SS Sheet Finishes: 2B, BA, No.4, 8K | Tatvam Overseas",
    seoDescription: "Understand stainless steel sheet finishes from 2B and BA to No.4 and 8K mirror. Compare production, reflectivity, fabrication suitability, and selection.",
    keywords: ["stainless steel finishes", "2B vs BA finish", "No.4 brushed stainless", "8K mirror stainless", "sheet surface finishes"],
    tags: ["Surface Finishes", "2B", "BA", "No.4", "8K Mirror", "Technical Guide"],
    snippet: "Quick answer: Stainless steel sheet finishes range from rough hot-rolled No.1 to mirror-like 8K. 2B is the smooth, general-purpose cold-rolled finish. BA is brighter and more reflective. No.4 is a brushed satin finish that hides scratches, and 8K is a polished mirror finish. Pick the finish by look, cleaning needs and how the sheet will be formed or fabricated.",
    relatedIds: ["ss-202-vs-ss-304-difference-uses-which-to-buy", "ss-304-vs-316"],
    content: (function() {
      return `
      <p class="lead text-lg text-slate-700 font-medium leading-relaxed mb-6">
        Quick answer: Stainless steel sheet finishes range from rough hot-rolled No.1 to mirror-like 8K. 2B is the smooth, general-purpose cold-rolled finish. BA is brighter and more reflective. No.4 is a brushed satin finish that hides scratches, and 8K is a polished mirror finish. Pick the finish by look, cleaning needs and how the sheet will be formed or fabricated.
      </p>
      `;
    })()'''

assert p2_old in text, 'p2_old not matched'
text = text.replace(p2_old, p2_new)

# 3. Fix missing relatedIds
replacements = {
    '"buffing-polishing"': '"stainless-steel-sheet-finishes-2b-ba-no4-8k-mirror"',
    '"duplex-welding"': '"welding-316l"',
    '"food-grade-certification"': '"avoid-cheating"',
    '"hidden-cost-undergauge"': '"understanding-mtc"',
    '"pharmaceutical-standards"': '"ss-304-vs-316"',
    '"surface-protection"': '"sheet-vs-plate"',
    '"custom-fabrication"': '"welding-316l"'
}

for bad, good in replacements.items():
    text = text.replace(bad, good)

with open('js/blog-data.js', 'w', encoding='utf-8') as f:
    f.write(text)

print('js/blog-data.js updated successfully!')
