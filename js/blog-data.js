const blogs = [
    // --- TECHNICAL GUIDES ---
    {
        id: "ss-304-vs-316",
        title: "SS 304 vs SS 316: The Definitive Guide",
        date: "Oct 12, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
        snippet: "The battle of the austenitics. Understanding the critical differences in Molybdenum content, corrosion resistance, and pricing.",
        content: `
            <p class="mb-4">Visually, SS 304 and SS 316 look identical. However, their chemical composition dictates their lifespan in harsh environments.</p>
            <h4 class="font-bold text-lg text-slate-900 mt-4 mb-2">The Molybdenum Difference</h4>
            <p class="mb-4"><strong>SS 316</strong> contains 2-3% Molybdenum. This specific element forms a passive layer that resists pitting from chlorides (salt water) and acids. <strong>SS 304</strong> lacks this, making it vulnerable in marine zones.</p>
            <h4 class="font-bold text-lg text-slate-900 mt-4 mb-2">Cost vs. Value</h4>
            <p>While SS 316 costs 20-30% more, using SS 304 in a coastal project will result in rust within months. The 'cheaper' option is often more expensive in the long run.</p>
        `
    },
    {
        id: "magnetism-in-steel",
        title: "Why is my Stainless Steel Magnetic?",
        date: "Oct 05, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=600&auto=format&fit=crop&q=80",
        snippet: "Busting the myth that 'Good Steel is Non-Magnetic'. Understanding the physics of Ferritic vs. Austenitic structures.",
        content: `
            <p class="mb-4">Many buyers use a magnet to test steel quality. This is a flaw. Magnetism is determined by the atomic crystal structure, not quality.</p>
            <ul class="list-disc pl-5 space-y-2 mb-4">
                <li><strong>Austenitic (304, 316, 202):</strong> Generally non-magnetic. However, cold working (bending/cutting) can induce slight magnetism.</li>
                <li><strong>Ferritic (430, 409M):</strong> Strongly magnetic. These are still high-quality stainless steels used in automotive and appliances.</li>
                <li><strong>Martensitic (410, 420):</strong> Magnetic and hardenable.</li>
            </ul>
            <p><strong>Conclusion:</strong> A magnet test only tells you the <em>grade family</em>, not the corrosion resistance.</p>
        `
    },
    {
        id: "pipe-vs-tube",
        title: "Pipe vs. Tube: What is the difference?",
        date: "Sept 20, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        snippet: "It's not just a name. Pipes transport fluids; Tubes provide structure. Understanding NB (Nominal Bore) vs OD (Outer Diameter).",
        content: `
            <p class="mb-4">In the steel industry, these terms are not interchangeable.</p>
            <div class="grid grid-cols-2 gap-4 border border-slate-200 rounded p-4 mb-4">
                <div>
                    <h5 class="font-bold text-emerald-600">PIPE</h5>
                    <p class="text-sm">Measured by <strong>ID (Inside Diameter)</strong> or NB (Nominal Bore). Designed for carrying fluids/gas under pressure. Wall thickness is defined by "Schedule" (e.g., Sch 40).</p>
                </div>
                <div>
                    <h5 class="font-bold text-emerald-600">TUBE</h5>
                    <p class="text-sm">Measured by <strong>OD (Outer Diameter)</strong>. Designed for structural strength (furniture, heat exchangers). Wall thickness is defined by Gauge (SWG/BWG).</p>
                </div>
            </div>
        `
    },
    {
        id: "surface-finishes",
        title: "Mastering Surface Finishes: 2B, No.4, Mirror",
        date: "Aug 10, 2025",
        category: "Aesthetics",
        image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600&auto=format&fit=crop&q=80",
        snippet: "A visual guide to surface finishes. Why choosing the right finish affects both aesthetics and hygiene.",
        content: `
            <p class="mb-4">The Ra (Roughness Average) of a surface affects bacterial growth and corrosion.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>2B (Mill Finish):</strong> Smooth, dull grey. Standard for tanks and industrial equipment.</li>
                <li><strong>No. 4 (Brushed/Satin):</strong> Visible grain lines (180-240 grit). Used in elevators and kitchens to hide fingerprints.</li>
                <li><strong>No. 8 (Mirror):</strong> Highly polished, reflective. Used for architectural columns and decorative cladding.</li>
                <li><strong>BA (Bright Annealed):</strong> A bright, cold-rolled finish often used in appliances.</li>
            </ul>
        `
    },
    {
        id: "pitting-corrosion",
        title: "What is Pitting Corrosion?",
        date: "July 15, 2025",
        category: "Corrosion Science",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
        snippet: "The most dangerous form of localized corrosion. Why chlorides are the enemy and how PREN numbers help you choose.",
        content: `
            <p class="mb-4">Pitting is like a cavity in a tooth. The surface looks fine, but deep holes form underneath, leading to sudden structural failure.</p>
            <p class="mb-4"><strong>Cause:</strong> Chloride ions (salt) break the passive chromium oxide layer locally.</p>
            <p><strong>Solution:</strong> Use grades with high PREN (Pitting Resistance Equivalent Number). <br>Formula: <code>PREN = %Cr + 3.3(%Mo) + 16(%N)</code>.</p>
            <p>SS 304 PREN ≈ 18 <br>SS 316 PREN ≈ 24 <br>Duplex 2205 PREN ≈ 35.</p>
        `
    },

    // --- MATERIAL SCIENCE ---
    {
        id: "ferritic-stainless",
        title: "The Rise of 400 Series (Ferritic) Steel",
        date: "July 22, 2025",
        category: "Material Science",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
        snippet: "Magnetic, cheaper, and reliable. Why grades like 409M and 430 are dominating the automotive and appliance sectors.",
        content: `
            <p class="mb-4">Ferritic stainless steels contain little to no Nickel, making them price-stable unlike the volatile 300 series.</p>
            <p class="mb-4"><strong>SS 409M:</strong> The automotive standard. Used in 90% of exhaust systems globally due to high-temperature oxidation resistance.</p>
            <p><strong>SS 430:</strong> The appliance standard. Used in dishwasher linings and fridge doors. Excellent resistance to citric and nitric acids.</p>
        `
    },
    {
        id: "role-of-nickel",
        title: "Why is Nickel so expensive?",
        date: "June 30, 2025",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&auto=format&fit=crop&q=80",
        snippet: "Nickel gives steel its ductility and non-magnetic properties. Understanding why the LME Nickel price drives the SS 304 surcharge.",
        content: `
            <p class="mb-4">Nickel is the most expensive ingredient in austenitic stainless steel. It stabilizes the austenite structure, making the steel ductile (formable) and non-magnetic.</p>
            <p>When Nickel prices spike on the London Metal Exchange (LME), the price of SS 304 and 316 rises immediately. This is why many manufacturers switch to low-nickel 200 series or no-nickel 400 series during market peaks.</p>
        `
    },
    {
        id: "duplex-steel-benefits",
        title: "Duplex 2205: Double Strength, Half Thickness",
        date: "Aug 29, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1535813547-99c456a41d4a?w=600&auto=format&fit=crop&q=80",
        snippet: "Why Oil & Gas industries prefer Duplex 2205. High strength allows for lighter structures without compromising durability.",
        content: `<p class="mb-4">Duplex steel has a microstructure of 50% ferrite and 50% austenite. This hybrid structure results in yield strengths of 450 MPa+ (double that of 304/316) and superior resistance to Stress Corrosion Cracking (SCC).</p>`
    },
    {
        id: "precipitation-hardening",
        title: "What is 17-4 PH Stainless Steel?",
        date: "June 10, 2025",
        category: "Specialty Alloys",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        snippet: "Combining the corrosion resistance of 304 with the hardness of tool steel. The aerospace wonder material.",
        content: `
            <p class="mb-4">17-4 PH (Precipitation Hardening) contains Copper. By heat treating it (aging), precipitates form that lock the crystal lattice, creating immense strength.</p>
            <p>It is widely used in pump shafts, aerospace structural parts, and turbine blades where standard 316 would bend or break.</p>
        `
    },

    // --- APPLICATION SPECIFIC ---
    {
        id: "food-grade-steel",
        title: "What exactly is 'Food Grade' Stainless?",
        date: "May 25, 2025",
        category: "Industry Focus",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
        snippet: "Is SS 202 food safe? Why is 304 the hygiene standard? We break down the HACCP requirements.",
        content: `
            <p class="mb-4">"Food Grade" usually refers to <strong>SS 304</strong>. It resists corrosion from food acids (tomatoes, citrus, milk) and sanitizing chemicals.</p>
            <p><strong>SS 316</strong> is required for foods with high salt content (soy sauce, ketchup). <strong>SS 202</strong> is NOT recommended for wet food contact as it can leach metals over time due to lower corrosion resistance.</p>
        `
    },
    {
        id: "ss-202-applications",
        title: "Is SS 202 a Viable Alternative?",
        date: "Sept 15, 2025",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1574634534894-89d7576c8259?w=600&auto=format&fit=crop&q=80",
        snippet: "With rising nickel prices, many fabricators are switching to the 200 series. We analyze the pros and cons.",
        content: `<p class="mb-4">SS 202 is excellent for indoor applications like stair railings and furniture. However, strictly avoid it for marine use or outdoor cladding.</p>`
    },
    {
        id: "high-heat-310s",
        title: "Choosing Steel for Furnaces: SS 310S",
        date: "May 12, 2025",
        category: "Industry Focus",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
        snippet: "When temperatures hit 1000°C, standard steel scales and fails. Enter SS 310S.",
        content: `
            <p class="mb-4">Standard 304 scales (oxidizes) at 870°C. <strong>SS 310S</strong> can withstand up to 1150°C in continuous service.</p>
            <p>This is due to its high Chromium (25%) and Nickel (20%) content. It is essential for burner nozzles, kiln linings, and heat treatment baskets.</p>
        `
    },
    {
        id: "railing-selection",
        title: "Best Grade for Modular Railings",
        date: "April 28, 2025",
        category: "Architecture",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        snippet: "Indoor vs Outdoor railings require different grades to maintain their shine. A guide for fabricators.",
        content: `
            <p class="mb-4"><strong>Indoor:</strong> SS 202 is the industry standard. It holds a high mirror polish and is cost-effective in dry environments.</p>
            <p><strong>Outdoor/Balcony:</strong> You MUST use SS 304. Humidity and pollution will turn SS 202 yellow/brown within a year outdoors.</p>
            <p><strong>Coastal:</strong> Only SS 316 will survive the salt spray without tea-staining.</p>
        `
    },
    {
        id: "pharmaceutical-standards",
        title: "Steel for Pharma: Why Electropolishing matters",
        date: "April 10, 2025",
        category: "Industry Focus",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
        snippet: "In pharmaceutical tanks, smoothness is sterility. Understanding <0.5 Ra finishes.",
        content: `
            <p class="mb-4">Pharma tanks primarily use SS 316L. However, the grade is not enough. The surface must be <strong>Electropolished</strong>.</p>
            <p>This electrochemical process removes microscopic peaks on the surface, making it impossible for bacteria to hide. It also enriches the surface chromium, boosting corrosion resistance.</p>
        `
    },

    // --- QUALITY & BASICS ---
    {
        id: "understanding-mtc",
        title: "How to Read a Mill Test Certificate (MTC)",
        date: "Sept 28, 2025",
        category: "Quality Assurance",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        snippet: "The MTC is the birth certificate of your steel. Learn how to verify Heat Numbers and Chemical Analysis.",
        content: `
            <p class="mb-4">Never accept steel without an MTC. Key things to check:</p>
            <ol class="list-decimal pl-5 space-y-2">
                <li><strong>Heat Number:</strong> Must be stamped on the material and match the paper.</li>
                <li><strong>Chemical Composition:</strong> Does the Nickel % match the standard (e.g., 8% for 304)?</li>
                <li><strong>Standard:</strong> Is it ASTM A240 or EN 10088?</li>
            </ol>
        `
    },
    {
        id: "sheet-vs-plate",
        title: "Sheet vs. Plate: Where is the line?",
        date: "March 15, 2025",
        category: "Basics",
        image: "https://images.unsplash.com/photo-1531834685032-c34bf0d8b939?w=600&auto=format&fit=crop&q=80",
        snippet: "At what thickness does a Sheet become a Plate? The answer might surprise you.",
        content: `
            <p class="mb-4">Generally, stainless steel under <strong>5mm (or 3/16 inch)</strong> is considered a <strong>Sheet</strong> and is often Cold Rolled (2B finish).</p>
            <p>Anything <strong>5mm and thicker</strong> is considered a <strong>Plate</strong> and is usually Hot Rolled (HR No.1 finish). Plates are used for structural tanks, while sheets are used for cladding and light fabrication.</p>
        `
    },
    {
        id: "calculating-weight",
        title: "How to Calculate Stainless Steel Weight",
        date: "March 01, 2025",
        category: "Utility",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
        snippet: "Stop guessing. The formula for estimating sheet and pipe weight for logistics planning.",
        content: `
            <p class="mb-4"><strong>Sheets/Plates:</strong> Length (m) × Width (m) × Thickness (mm) × Density = Weight (kg).</p>
            <p class="mb-4"><strong>Densities:</strong><br>SS 304/316 = 7.98<br>SS 400 Series = 7.7<br>SS 202 = 7.8</p>
            <p><em>Example:</em> 1 sheet of 304 (2.5m x 1.25m x 2mm) = 2.5 * 1.25 * 2 * 7.98 = 49.875 kg.</p>
        `
    },
    {
        id: "pvd-coating",
        title: "What is PVD Coating on Stainless Steel?",
        date: "Feb 20, 2025",
        category: "Aesthetics",
        image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600&auto=format&fit=crop&q=80",
        snippet: "How we get Gold, Rose Gold, and Black steel without painting. The science of Physical Vapor Deposition.",
        content: `
            <p class="mb-4">PVD (Physical Vapor Deposition) is a vacuum coating process. Titanium ions are vaporized and deposited onto the steel surface.</p>
            <p>Unlike paint, PVD is atomic. It does not peel or crack. It creates a super-hard ceramic layer that is more scratch-resistant than the steel underneath.</p>
        `
    },
    {
        id: "corrosion-types",
        title: "5 Types of Corrosion you must know",
        date: "Feb 05, 2025",
        category: "Corrosion Science",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
        snippet: "Rust isn't just rust. Understanding Galvanic, Crevice, and Intergranular corrosion helps you design better.",
        content: `
            <p class="mb-4">1. <strong>General Corrosion:</strong> Uniform loss of metal (rare in SS).</p>
            <p class="mb-4">2. <strong>Galvanic:</strong> When SS touches Carbon Steel in water, the Carbon Steel rots rapidly.</p>
            <p class="mb-4">3. <strong>Crevice:</strong> Occurs in tight gaps (under washers) where oxygen cannot reach.</p>
            <p class="mb-4">4. <strong>Intergranular:</strong> Caused by welding heat (Sensitization).</p>
        `
    },
    {
        id: "jindal-vs-imported",
        title: "Jindal vs. Imported: What should you buy?",
        date: "Jan 15, 2025",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        snippet: "A frank comparison of domestic Indian mills versus imported materials from China/Indonesia.",
        content: `
            <p class="mb-4"><strong>Jindal Stainless</strong> is the gold standard for quality consistency in India. Their material usually commands a premium due to strict adherence to chemistry.</p>
            <p><strong>Imported (Indonesia/China):</strong> Often cheaper. While many mills are excellent (Tsingshan, Posco), one must be careful about thickness tolerance (under-gauge material).</p>
        `
    },
    {
        id: "sustainability",
        title: "Is Stainless Steel Sustainable?",
        date: "Jan 01, 2025",
        category: "Environment",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
        snippet: "100% Recyclable. Why stainless steel is the greenest choice for construction.",
        content: `
            <p class="mb-4">Stainless steel is theoretically 100% recyclable. In fact, any new sheet you buy contains approx 60% recycled scrap.</p>
            <p>Its long lifecycle (50+ years) means it rarely needs replacement, significantly lowering its carbon footprint compared to painted carbon steel or plastics.</p>
        `
    },
    // ... (Assume your other 20 existing articles are here - keeping brevity for this response) ...

    // --- NEW PRACTICAL ARTICLES (15+ Added as requested) ---
    {
        id: "avoid-cheating",
        title: "How to Avoid Getting Cheated: 7 Red Flags",
        date: "Nov 20, 2025",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        snippet: "Don't pay for 304 and get 202. Learn about under-gauge scams, fake stamping, and how to spot them.",
        content: `
            <h4 class="font-bold text-lg mb-2">1. The 'Magnet' Trick</h4>
            <p class="mb-4">Sellers often say 'Non-magnetic is 304'. Wrong. 202 is also non-magnetic but rusts. Always use a chemical spot test kit (Molybdenum test).</p>
            <h4 class="font-bold text-lg mb-2">2. Under-Gauge Material</h4>
            <p class="mb-4">You order 1.0mm, you get 0.85mm. This 'tolerance' saves them 15% cost but weakens your product. Always carry a digital vernier caliper to the godown.</p>
            <h4 class="font-bold text-lg mb-2">3. Fake Stamping</h4>
            <p>Anyone can stamp 'JSPL 304' on a sheet. Request the Mill Test Certificate (MTC) and verify the Heat Number with the mill directly.</p>
        `
    },
    {
        id: "jindal-vs-imported-tco",
        title: "Jindal vs. ArcelorMittal vs. Imported: TCO Analysis",
        date: "Nov 18, 2025",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
        snippet: "Is Jindal worth the premium? When should you choose imported (Posco/Tsingshan)? A Total Cost of Ownership analysis.",
        content: `
            <p class="mb-4"><strong>Jindal Stainless:</strong> Consistent chemistry, perfect gauge control. Best for pharmaceutical and critical projects. Premium price.</p>
            <p class="mb-4"><strong>Imported (China/Indonesia):</strong> 10-15% cheaper. Good for general fabrication (furniture, utensils). Watch out for thickness variation.</p>
            <p><strong>Recommendation:</strong> For pressure vessels and export jobs, stick to Indian Prime mills like Jindal or SAIL.</p>
        `
    },
    {
        id: "railing-rust",
        title: "Why Your SS 304 Railing is Rusting (And Fixes)",
        date: "Nov 15, 2025",
        category: "Corrosion Science",
        image: "https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&auto=format&fit=crop&q=80",
        snippet: "You paid for 304, but it's turning brown. Is it fake? Or is it contamination? Solutions for balcony railings.",
        content: `
            <p class="mb-4"><strong>1. Iron Contamination:</strong> If your fabricator used the same grinding wheel for MS (Iron) and SS, iron particles embedded in your SS railing are rusting, not the SS itself.</p>
            <p class="mb-4"><strong>2. Acid Rain/Cleaning:</strong> Did your maid use Harpic or acid to clean the floor? Acid fumes destroy the SS passive layer instantly.</p>
            <p><strong>Fix:</strong> Passivation. Scrub with a Scotch-Brite pad and citric acid solution to restore the chromium oxide layer.</p>
        `
    },
    {
        id: "welding-316l",
        title: "Welding 316L Without Sensitization",
        date: "Nov 12, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        snippet: "Preventing 'Weld Decay'. Guide to interpass temperatures, filler wire selection (ER316L), and pickling.",
        content: `
            <p class="mb-4">Sensitization occurs when chromium carbide forms at grain boundaries between 425-800°C, leading to corrosion.</p>
            <ul class="list-disc pl-5 space-y-2">
                <li><strong>Use Low Carbon (L) Grade:</strong> SS 316L has <0.03% carbon, preventing carbide precipitation.</li>
                <li><strong>Keep it Cool:</strong> Maintain interpass temperature below 150°C.</li>
                <li><strong>Post-Weld Cleaning:</strong> Always pickle and passivate the weld seam to remove heat tint.</li>
            </ul>
        `
    },
    {
        id: "hidden-cost-undergauge",
        title: "The Hidden Cost of Under-Gauge Material",
        date: "Nov 10, 2025",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1531834685032-c34bf0d8b939?w=600&auto=format&fit=crop&q=80",
        snippet: "Buying by sheet vs. buying by weight. How a 0.1mm difference affects your project's structural integrity.",
        content: "<p>If you buy a '1mm' sheet that is actually 0.8mm, you are losing 20% material strength. For tanks, this can lead to catastrophic bursting. Always buy by weight if possible.</p>"
    },
    {
        id: "buffing-polishing",
        title: "Buffing vs. Electro-Polishing: Which is better?",
        date: "Nov 08, 2025",
        category: "Aesthetics",
        image: "https://images.unsplash.com/photo-1590486803833-1c5dc8ddd4c8?w=600&auto=format&fit=crop&q=80",
        snippet: "Mechanical buffing shines, but Electropolishing cleans. Why Pharma demands EP.",
        content: "<p>Buffing smears metal over microscopic pits, trapping bacteria. Electro-polishing removes surface metal, creating a chemically clean, bacteria-free surface.</p>"
    },
    {
        id: "plasma-vs-laser",
        title: "Cutting Steel: Plasma vs. Fiber Laser",
        date: "Nov 05, 2025",
        category: "Fabrication",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
        snippet: "When to use Laser (Precision) vs. Plasma (Cost/Thickness). A guide for thick plate cutting.",
        content: "<p><strong>Laser:</strong> Perfect for sheets up to 25mm. High precision, zero dross. Expensive.</p><p><strong>Plasma:</strong> Best for plates 25mm to 100mm. Rougher edge, heat affected zone (HAZ), but much cheaper.</p>"
    },
    {
        id: "duplex-welding",
        title: "How to Weld Duplex 2205",
        date: "Oct 30, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
        snippet: "Duplex is stronger but trickier. The importance of heat input and using ER2209 filler.",
        content: "<p>Welding Duplex requires controlling the ferrite-austenite balance. Cooling too fast results in too much ferrite (brittle). Using ER2209 filler (higher nickel) promotes austenite formation in the weld.</p>"
    },
    {
        id: "titanium-grades",
        title: "Titanium Gr.2 vs Gr.5: What's the difference?",
        date: "Oct 25, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
        snippet: "Commercially Pure (CP) vs Alloy. Why chemical plants use Gr.2 and aerospace uses Gr.5.",
        content: "<p><strong>Grade 2:</strong> 99% Pure Titanium. Excellent corrosion resistance, good formability. Used in heat exchangers.</p><p><strong>Grade 5 (Ti-6Al-4V):</strong> Alloyed with Aluminum/Vanadium. Double the strength, but harder to form. Used in aircraft parts.</p>"
    },
    {
        id: "pipe-vs-tube-2",
        title: "Pipe vs. Tube: The Real Difference",
        date: "Oct 20, 2025",
        category: "Basics",
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&auto=format&fit=crop&q=80",
        snippet: "It's not just semantics. NB (Nominal Bore) vs OD (Outer Diameter). Schedule vs Gauge.",
        content: "<p><strong>Pipe:</strong> Measured by ID (flow capacity). Specified by Schedule (wall thickness).</p><p><strong>Tube:</strong> Measured by OD (structural fit). Specified by BWG/SWG.</p>"
    },
    {
        id: "surface-protection",
        title: "PVC Coating: Laser vs. Fiber Film",
        date: "Oct 15, 2025",
        category: "Fabrication",
        image: "https://images.unsplash.com/photo-1589793907316-f9401541f88d?w=600&auto=format&fit=crop&q=80",
        snippet: "Why standard PVC melts under a laser cutter. Choosing the right 'Fiber Laser Film' for processing.",
        content: "<p>Standard PVC absorbs laser energy and burns onto the steel. Fiber Laser Film (usually grey/black on the back) allows the beam to pass through cleanly.</p>"
    },
    {
        id: "storage-tips",
        title: "How to Store Stainless Steel Correctly",
        date: "Oct 10, 2025",
        category: "Maintenance",
        image: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
        snippet: "Preventing contamination in the warehouse. Why you should never store SS on bare concrete or near Carbon Steel.",
        content: "<p>Use wooden pallets. Cover with tarps. Keep away from grinding dust of MS (Mild Steel) to prevent 'rust bloom'.</p>"
    },
    {
        id: "price-factors",
        title: "Why Stainless Steel Prices Change Daily",
        date: "Oct 05, 2025",
        category: "Market Trends",
        image: "https://images.unsplash.com/photo-1616401784845-180882ba9ba8?w=600&auto=format&fit=crop&q=80",
        snippet: "The role of LME Nickel and Chrome. Understanding the 'Alloy Surcharge'.",
        content: "<p>Stainless steel pricing is 60% driven by Nickel. Follow the LME (London Metal Exchange) Nickel chart to predict next month's steel prices.</p>"
    },
    {
        id: "food-grade-certification",
        title: "What is 'Food Grade' Certification?",
        date: "Oct 01, 2025",
        category: "Industry Focus",
        image: "https://images.unsplash.com/photo-1581092921461-eab62e97a780?w=600&auto=format&fit=crop&q=80",
        snippet: "Does an MTC prove food safety? Understanding NSF/ANSI 51 requirements.",
        content: "<p>There is no single 'Food Grade Certificate'. The material must be 304/316 and the finish must be smooth enough (Ra < 0.8) to prevent bacterial growth.</p>"
    },
    {
        id: "high-temp-alloys",
        title: "Selecting Alloys for 1000°C+",
        date: "Sept 25, 2025",
        category: "Technical Guide",
        image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?w=600&auto=format&fit=crop&q=80",
        snippet: "When 310S isn't enough. Moving to Incoloy 800 and Inconel 600 for furnace applications.",
        content: "<p>SS 310S works up to 1150°C. For higher temps or cyclic heating (rapid heating/cooling), Incoloy 800HT or Inconel 600 offers better creep rupture strength.</p>"
    }

];