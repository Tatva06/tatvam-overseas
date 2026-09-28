#!/usr/bin/env python3
import os
import subprocess
import base64

# Load logo as base64
with open('assets/images/tatvam-logo.png', 'rb') as f:
    logo_b64 = base64.b64encode(f.read()).decode('utf-8')

html_content = f"""<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Tatvam Overseas Inc - Product Offerings Catalog 2025-2026</title>
<style>
    @page {{
        size: A4;
        margin: 15mm 15mm 18mm 15mm;
        @bottom-right {{
            content: "Page " counter(page);
            font-size: 8pt;
            color: #64748b;
        }}
    }}
    * {{
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        -webkit-print-color-adjust: exact;
        print-color-adjust: exact;
    }}
    body {{
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
        color: #1e293b;
        background: #ffffff;
        font-size: 9.5pt;
        line-height: 1.45;
    }}
    .page {{
        page-break-after: always;
        position: relative;
        padding-bottom: 20px;
    }}
    .page:last-child {{
        page-break-after: avoid;
    }}
    .header {{
        display: flex;
        justify-content: space-between;
        align-items: center;
        border-bottom: 2px solid #059669;
        padding-bottom: 12px;
        margin-bottom: 16px;
    }}
    .logo-img {{
        height: 38px;
        width: auto;
    }}
    .header-right {{
        text-align: right;
        font-size: 8pt;
        color: #475569;
        line-height: 1.35;
    }}
    .header-right strong {{
        color: #0f172a;
    }}
    .title-banner {{
        background: linear-gradient(135deg, #064e3b 0%, #0f172a 100%);
        color: #ffffff;
        padding: 24px;
        border-radius: 8px;
        margin-bottom: 20px;
    }}
    .title-banner h1 {{
        font-size: 22pt;
        font-weight: 800;
        letter-spacing: -0.5px;
        margin-bottom: 4px;
    }}
    .title-banner p {{
        font-size: 10.5pt;
        color: #a7f3d0;
        font-weight: 500;
    }}
    .stat-badge-row {{
        display: flex;
        gap: 12px;
        margin-top: 14px;
    }}
    .stat-badge {{
        background: rgba(255, 255, 255, 0.12);
        border: 1px solid rgba(255, 255, 255, 0.25);
        padding: 6px 12px;
        border-radius: 6px;
        font-size: 8pt;
        color: #f1f5f9;
    }}
    .stat-badge strong {{
        color: #34d399;
    }}
    h2.section-title {{
        font-size: 13pt;
        font-weight: 800;
        color: #0f172a;
        border-left: 4px solid #059669;
        padding-left: 10px;
        margin: 16px 0 10px 0;
        text-transform: uppercase;
        letter-spacing: 0.5px;
        display: flex;
        justify-content: space-between;
        align-items: center;
    }}
    h2.section-title span.tag {{
        font-size: 7.5pt;
        font-weight: 700;
        background: #ecfdf5;
        color: #047857;
        border: 1px solid #a7f3d0;
        padding: 2px 8px;
        border-radius: 999px;
    }}
    table.spec-table {{
        width: 100%;
        border-collapse: collapse;
        font-size: 8.5pt;
        margin-bottom: 14px;
    }}
    table.spec-table th {{
        background: #f1f5f9;
        color: #0f172a;
        font-weight: 700;
        text-align: left;
        padding: 6px 8px;
        border: 1px solid #cbd5e1;
        font-size: 8pt;
        text-transform: uppercase;
    }}
    table.spec-table td {{
        padding: 6px 8px;
        border: 1px solid #e2e8f0;
        vertical-align: top;
    }}
    table.spec-table tr:nth-child(even) {{
        background: #f8fafc;
    }}
    .grade-pill {{
        display: inline-block;
        background: #e2e8f0;
        color: #1e293b;
        font-size: 7.5pt;
        font-weight: 600;
        padding: 1px 5px;
        border-radius: 4px;
        margin: 1px 2px;
    }}
    .grade-pill.highlight {{
        background: #dcfce7;
        color: #15803d;
        border: 1px solid #86efac;
    }}
    .card-grid {{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 12px;
        margin-bottom: 14px;
    }}
    .info-card {{
        border: 1px solid #e2e8f0;
        border-radius: 6px;
        padding: 10px 12px;
        background: #fafafa;
    }}
    .info-card h4 {{
        font-size: 9pt;
        font-weight: 700;
        color: #0f172a;
        margin-bottom: 4px;
    }}
    .info-card p {{
        font-size: 8pt;
        color: #475569;
        line-height: 1.35;
    }}
    .quality-box {{
        background: #ecfdf5;
        border: 1px solid #a7f3d0;
        border-radius: 6px;
        padding: 12px;
        margin-top: 14px;
    }}
    .quality-box h3 {{
        color: #065f46;
        font-size: 10pt;
        font-weight: 800;
        margin-bottom: 6px;
    }}
    .quality-box ul {{
        list-style: none;
        padding: 0;
        font-size: 8.5pt;
        color: #047857;
    }}
    .quality-box li {{
        margin-bottom: 4px;
        display: flex;
        align-items: center;
    }}
    .quality-box li::before {{
        content: "✓";
        font-weight: bold;
        color: #059669;
        margin-right: 6px;
    }}
    .footer-bar {{
        margin-top: 16px;
        padding-top: 10px;
        border-top: 1px solid #e2e8f0;
        display: flex;
        justify-content: space-between;
        font-size: 7.5pt;
        color: #64748b;
    }}
    .contact-banner {{
        background: #0f172a;
        color: #ffffff;
        padding: 16px;
        border-radius: 8px;
        margin-top: 20px;
    }}
    .contact-banner-grid {{
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        font-size: 8pt;
    }}
    .contact-banner-grid strong {{
        color: #34d399;
        display: block;
        font-size: 8.5pt;
        margin-bottom: 2px;
    }}
</style>
</head>
<body>

<!-- ========================================================================= -->
<!-- PAGE 1: COVER & EXECUTIVE SUMMARY -->
<!-- ========================================================================= -->
<div class="page">
    <div class="header">
        <div>
            <img src="data:image/png;base64,{logo_b64}" class="logo-img" alt="Tatvam Overseas Inc Logo">
            <div style="font-size:11pt; font-weight:800; color:#0f172a; margin-top:2px;">TATVAM OVERSEAS INC</div>
        </div>
        <div class="header-right">
            <strong>GOVT OF INDIA REGISTERED EXPORTER</strong><br>
            GSTIN: 27AHIPJ6958M1ZK | IEC: AHIPJ6958M | UDYAM: UDYAM-MH-19-0338145<br>
            ISO 9001:2015 Certified | Mumbai, India
        </div>
    </div>

    <div class="title-banner">
        <h1>TECHNICAL PRODUCT CATALOG</h1>
        <p>Comprehensive Stockholder, Manufacturer &amp; Exporter Portfolio (2025–2026)</p>
        <div class="stat-badge-row">
            <div class="stat-badge">Origin: <strong>Jindal / Prime Mills</strong></div>
            <div class="stat-badge">MTC Standard: <strong>EN 10204 3.1 Traceable</strong></div>
            <div class="stat-badge">Export Destinations: <strong>15+ Countries</strong></div>
            <div class="stat-badge">Industry Legacy: <strong>22+ Years</strong></div>
        </div>
    </div>

    <h2 class="section-title">Corporate Profile &amp; Approved Vendor Status <span class="tag">Vendor Registration</span></h2>
    <p style="font-size: 9pt; color:#334155; margin-bottom: 12px; line-height: 1.5;">
        <strong>Tatvam Overseas Inc</strong> (and family concern <em>Dhyan Industries</em>) is a premier Indian stockist, supplier, and exporter of high-integrity Ferrous &amp; Non-Ferrous metals, specialized Stainless Steels, Carbon Steels, Alloy Steels, and Nickel Superalloys. Operating from the heart of Mumbai's commercial metal market with centralized warehousing, we cater to EPC contractors, public sector undertakings (PSUs), boiler fabricators, offshore platforms, and petrochemical refineries worldwide.
    </p>

    <div class="card-grid">
        <div class="info-card">
            <h4>Piping &amp; Tubular Range</h4>
            <p>1/2" NB to 24" NB Seamless and 1/2" to 72" Welded (ERW/EFW). Pressure ratings from Sch 5 to Sch XXS. Stocked in ASTM A312, A213, A269, A358, A106, A333, A335.</p>
        </div>
        <div class="info-card">
            <h4>Flats, Coils, Foils &amp; Plates</h4>
            <p>0.02 mm ultra-thin foils up to 140 mm heavy rolling plates. Widths: 1000 / 1250 / 1500 / 1800 / 2000 mm. Jindal prime stainless steel coils with custom slit widths.</p>
        </div>
        <div class="info-card">
            <h4>Buttweld &amp; Forged Fittings</h4>
            <p>Seamless &amp; Welded Elbows, Equal/Reducing Tees, Concentric/Eccentric Reducers, End Caps (1/2" to 72"). High pressure forged 3000# / 6000# / 9000# SW &amp; NPT.</p>
        </div>
        <div class="info-card">
            <h4>Flanges, Fasteners &amp; Ferrule</h4>
            <p>ASME B16.5 flanges (150# to 2500#), ASTM A193 B7/B8/B8M high tensile studs with A194 2H/8 nuts, and 6,000 / 10,000 PSI double-ferrule compression tube fittings.</p>
        </div>
    </div>

    <h2 class="section-title">Major Industries Served <span class="tag">Global Sectors</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:25%;">Energy &amp; Thermal</th>
            <th style="width:25%;">Hydrocarbons &amp; Petrochem</th>
            <th style="width:25%;">Process &amp; Chemical</th>
            <th style="width:25%;">Marine &amp; Infrastructure</th>
        </tr>
        <tr>
            <td>
                • Power Houses &amp; Boilers<br>
                • Supercritical Steam Lines<br>
                • Heat Exchangers &amp; Condensers<br>
                • Nuclear &amp; Solar Thermal
            </td>
            <td>
                • Oil &amp; Gas Refineries<br>
                • Offshore Drilling Platforms<br>
                • Cross-Country Pipelines<br>
                • Fertilizer Manufacturing
            </td>
            <td>
                • Chemical &amp; Acid Plants<br>
                • Pharmaceutical Cleanrooms<br>
                • Synthetic Yarn &amp; Textiles<br>
                • Glass &amp; Cement Plants
            </td>
            <td>
                • Shipbuilding &amp; Marine Hulls<br>
                • Desalination Plants<br>
                • Port Trusts &amp; Heavy Bridges<br>
                • Coal Mines &amp; Cold Storages
            </td>
        </tr>
    </table>

    <div class="quality-box">
        <h3>Quality &amp; Testing Assurance: EN 10204 3.1 Certified</h3>
        <ul>
            <li>Every dispatch is accompanied by an authentic Mill Test Certificate (MTC) with 100% heat number and lot traceability.</li>
            <li>In-house Positive Material Identification (PMI) using Thermo Scientific Niton XRF analyzers before dispatch.</li>
            <li>Third Party Inspection (TPI) accepted: TUV Nord, DNV, Bureau Veritas (BV), SGS, Lloyds Register, and CEIL.</li>
        </ul>
    </div>

    <div class="footer-bar">
        <span>Tatvam Overseas Inc | ISO 9001:2015 Certified Stockist &amp; Exporter</span>
        <span>sales@tatvamoverseasinc.com | +91 90828 34775</span>
    </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 2: STAINLESS STEEL PRODUCTS -->
<!-- ========================================================================= -->
<div class="page">
    <div class="header">
        <div>
            <img src="data:image/png;base64,{logo_b64}" class="logo-img" alt="Tatvam Overseas Inc Logo">
            <div style="font-size:11pt; font-weight:800; color:#0f172a; margin-top:2px;">TATVAM OVERSEAS INC</div>
        </div>
        <div class="header-right">
            <strong>SECTION A: STAINLESS STEEL OFFERINGS</strong><br>
            Austenitic, Ferritic &amp; Martensitic Grades<br>
            Jindal Prime Stockist &amp; Global Exporter
        </div>
    </div>

    <h2 class="section-title">(A.1) Stainless Steel Pipes &amp; Tubes <span class="tag">ASTM A312 / A213 / A269 / A358</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:20%;">Parameter</th>
            <th style="width:80%;">Stock Range &amp; Technical Capabilities</th>
        </tr>
        <tr>
            <td><strong>Grades Stocked</strong></td>
            <td>
                <span class="grade-pill highlight">SS 304</span>
                <span class="grade-pill highlight">SS 304L</span>
                <span class="grade-pill">SS 304H</span>
                <span class="grade-pill highlight">SS 316</span>
                <span class="grade-pill highlight">SS 316L</span>
                <span class="grade-pill">SS 316H</span>
                <span class="grade-pill highlight">SS 316Ti</span>
                <span class="grade-pill">SS 317L</span>
                <span class="grade-pill highlight">SS 321</span>
                <span class="grade-pill">SS 321H</span>
                <span class="grade-pill highlight">SS 310S</span>
                <span class="grade-pill">SS 347</span>
                <span class="grade-pill">SS 202</span>
            </td>
        </tr>
        <tr>
            <td><strong>Manufacturing Specs</strong></td>
            <td>ASTM A312 (Pipes), ASTM A213 (Boiler &amp; Heat Exchanger Tubes), ASTM A269 (General Service Tubes), ASTM A358 (Large Diameter Welded EFW)</td>
        </tr>
        <tr>
            <td><strong>Seamless Sizes</strong></td>
            <td>1/2" NB to 24" NB (15 mm to 600 mm NB) — Cold Drawn &amp; Hot Finished</td>
        </tr>
        <tr>
            <td><strong>Welded (ERW/EFW) Sizes</strong></td>
            <td>1/2" NB to 48" NB (up to 72" NB on custom fabricated projects with 100% X-ray / Radiography)</td>
        </tr>
        <tr>
            <td><strong>Schedules &amp; Walls</strong></td>
            <td>Schedule 5S, 10S, 40S, 80S, 160, XS, XXS (Wall thickness from 0.8 mm up to 30 mm)</td>
        </tr>
        <tr>
            <td><strong>Tubing OD Range</strong></td>
            <td>Outside Diameter: 1/8" OD to 6" OD (3.17 mm to 152.4 mm OD); Thickness: 20 SWG to 6 mm</td>
        </tr>
        <tr>
            <td><strong>Origins &amp; Brands</strong></td>
            <td>Jindal, European, Japanese, Domestic Prime Mills with full MTC to EN 10204 3.1</td>
        </tr>
    </table>

    <h2 class="section-title">(A.2) SS Plates, Sheets, Coils, Foils &amp; Structurals <span class="tag">ASTM A240 / A276 / A479</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:22%;">Product Form</th>
            <th style="width:25%;">Grades Available</th>
            <th style="width:25%;">Size &amp; Thickness Envelope</th>
            <th style="width:28%;">Surface Finish &amp; Condition</th>
        </tr>
        <tr>
            <td><strong>Stainless Steel Coils &amp; Slit Strips</strong></td>
            <td>304, 304L, 316, 316L, 310S, 321, 409M, 410, 202</td>
            <td>Thickness: <strong>0.02 mm (Foil) to 12 mm</strong><br>Width: 1000, 1250, 1500, 1800, 2000 mm</td>
            <td>2B Cold Rolled, No.1 Hot Rolled, BA Bright Annealed, Slit Edge</td>
        </tr>
        <tr>
            <td><strong>Heavy Plates &amp; Boiler Sheets</strong></td>
            <td>304/304L, 316/316L, 316Ti, 317L, 321, 310S, 347, 904L</td>
            <td>Thickness: <strong>3.0 mm to 140 mm</strong><br>Cut to size, Plasma / Laser profiling</td>
            <td>Hot Rolled Annealed &amp; Pickled (HRAP / No.1), 100% UT tested</td>
        </tr>
        <tr>
            <td><strong>SS Angles &amp; Channels</strong></td>
            <td>304, 304L, 316, 316L, 310, 202</td>
            <td>Angles: 20x20x3 mm to 100x100x12 mm<br>Channels: 75x40 mm to 200x75 mm</td>
            <td>Hot Rolled, Laser Welded, Pickled finish for structural frames</td>
        </tr>
        <tr>
            <td><strong>Round Bars, Rods &amp; Hex</strong></td>
            <td>304, 304L, 316, 316L, 316Ti, 321, 410, 420, 431</td>
            <td>Dia 3 mm to 350 mm; Hex 6 mm to 65 mm<br>Cut length up to 6000 mm</td>
            <td>Bright Drawn (h9/h11), Centerless Peeled, Polished, Forged Rough Turned</td>
        </tr>
        <tr>
            <td><strong>Circles, Rings &amp; Patta</strong></td>
            <td>304, 316L, 310, 202 (J4/J1)</td>
            <td>Diameter 50 mm to 1500 mm<br>Thickness 0.5 mm to 50 mm</td>
            <td>Circle sheared, Waterjet cut, CNC machined edges for vessel ends</td>
        </tr>
    </table>

    <div class="footer-bar">
        <span>Tatvam Overseas Inc | Section A: Stainless Steel</span>
        <span>sales@tatvamoverseasinc.com | +91 90828 34775</span>
    </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 3: CARBON STEEL, ALLOY STEEL & MILD STEEL -->
<!-- ========================================================================= -->
<div class="page">
    <div class="header">
        <div>
            <img src="data:image/png;base64,{logo_b64}" class="logo-img" alt="Tatvam Overseas Inc Logo">
            <div style="font-size:11pt; font-weight:800; color:#0f172a; margin-top:2px;">TATVAM OVERSEAS INC</div>
        </div>
        <div class="header-right">
            <strong>SECTION B: CARBON &amp; ALLOY STEEL</strong><br>
            Power Plant, Boiler Quality &amp; Heavy Infrastructure<br>
            ASTM, ASME, BS, DIN &amp; IS Standards
        </div>
    </div>

    <h2 class="section-title">(B.1) Carbon &amp; Alloy Steel Pipes <span class="tag">High Temp &amp; Cryogenic</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:24%;">Standard / Specification</th>
            <th style="width:20%;">Grades</th>
            <th style="width:24%;">Size &amp; Schedule</th>
            <th style="width:32%;">Application Highlights</th>
        </tr>
        <tr>
            <td><strong>ASTM A106 / ASME SA106</strong><br>(Seamless High-Temp)</td>
            <td>Grade B, Grade C</td>
            <td>1/2" NB to 24" NB<br>Sch 40, 80, 160, XXS</td>
            <td>Standard refinery process piping, high temperature steam distribution lines.</td>
        </tr>
        <tr>
            <td><strong>ASTM A333 / ASME SA333</strong><br>(Low Temperature LTCS)</td>
            <td>Grade 6</td>
            <td>1/2" NB to 24" NB<br>Sch 40 to Sch XXS</td>
            <td>Cryogenic and sub-zero service down to -45°C. Full Charpy V-notch impact certified.</td>
        </tr>
        <tr>
            <td><strong>ASTM A335 / ASME SA335</strong><br>(Chrome-Moly Alloy Steel)</td>
            <td>P1, P2, P5, P9, P11, P22, P91</td>
            <td>1/2" NB to 24" NB Seamless<br>Heavy wall schedules</td>
            <td>Supercritical thermal boilers, power stations, hydrogen reform heaters (Creep resistant).</td>
        </tr>
        <tr>
            <td><strong>IS 1239 / IS 3589 &amp; A53</strong><br>(Indian Standard CS Pipes)</td>
            <td>IS 1239 (Pt 1) Lt/Med/Hvy<br>IS 3589 Fe 330, Fe 410</td>
            <td>1/2" NB to 48" NB<br>ERW &amp; Seamless</td>
            <td>Water transmission, firefighting networks, structural piling, compressed air.</td>
        </tr>
        <tr>
            <td><strong>API 5L / ISO 3183</strong><br>(Cross Country Line Pipe)</td>
            <td>Grade B, X42, X52, X60, X65 (PSL 1 &amp; PSL 2)</td>
            <td>2" NB to 48" NB<br>Welded &amp; Seamless</td>
            <td>High pressure crude oil, natural gas transport lines, offshore subsea duty.</td>
        </tr>
    </table>

    <h2 class="section-title">(B.2) Boiler Quality &amp; Structural Steel Plates <span class="tag">ASTM A516 / IS 2062</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:25%;">Standard</th>
            <th style="width:25%;">Grades Stocked</th>
            <th style="width:25%;">Thickness Envelope</th>
            <th style="width:25%;">Condition &amp; Testing</th>
        </tr>
        <tr>
            <td><strong>ASTM A516 / ASME SA516</strong><br>(Boiler Quality BQ Plates)</td>
            <td>Grade 60, Grade 70</td>
            <td>5 mm to 150 mm<br>Widths up to 3000 mm</td>
            <td>Normalized (N), HIC tested, NACE MR0175 compliant, Low S &amp; P.</td>
        </tr>
        <tr>
            <td><strong>ASTM A515 / ASME SA515</strong><br>(Intermediate Temp Vessels)</td>
            <td>Grade 60, Grade 70</td>
            <td>6 mm to 100 mm</td>
            <td>Coarse-grain practice for medium and higher temperature boilers.</td>
        </tr>
        <tr>
            <td><strong>IS 2062 (Bureau of Indian Standards)</strong><br>(Structural Steel Plates/Angles)</td>
            <td>Grade E250 (Gr. A, B, C)<br>Grade E350 (High Tensile)</td>
            <td>Sheets: 1.2 to 4 mm<br>Plates: 5 mm to 120 mm</td>
            <td>Killed steel, impact tested at 0°C / -20°C for structural fabrication.</td>
        </tr>
    </table>

    <h2 class="section-title">(B.3) Carbon &amp; Alloy Pipe Fittings &amp; Flanges <span class="tag">ASTM A234 / A105</span></h2>
    <div class="card-grid">
        <div class="info-card">
            <h4>Buttweld Fittings (ASTM A234 WPB / WPC)</h4>
            <p>1/2" to 24" Seamless &amp; up to 72" Welded. 90°/45° Long Radius Elbows, Concentric/Eccentric Reducers, Equal &amp; Reducing Tees, End Caps. Beveled ends to ASME B16.9.</p>
        </div>
        <div class="info-card">
            <h4>Alloy Steel Buttweld (ASTM A234 WP11 / WP22 / WP91)</h4>
            <p>Chrome-Moly fittings engineered to match A335 alloy pipe specifications for superheater steam piping and refinery reformer applications with 100% PWHT.</p>
        </div>
        <div class="info-card">
            <h4>Forged Flanges (ASTM A105 / A350 LF2)</h4>
            <p>Weld Neck (WNRF), Slip-On (SORF), Blind (BLRF), Socket Weld, Threaded. Classes: 150#, 300#, 600#, 900#, 1500#, 2500#. Serrated finish to ASME B16.5.</p>
        </div>
        <div class="info-card">
            <h4>High Pressure Forged Fittings (ASTM A105 3000# / 6000#)</h4>
            <p>1/4" to 4" NB Socket Weld and NPT/BSPT Threaded Elbows, Tees, Couplings, Half Couplings, Hex Nipples, Unions, Swage Nipples to ASME B16.11.</p>
        </div>
    </div>

    <div class="footer-bar">
        <span>Tatvam Overseas Inc | Section B: Carbon &amp; Alloy Steel</span>
        <span>sales@tatvamoverseasinc.com | +91 90828 34775</span>
    </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 4: NICKEL SUPERALLOYS & EXOTIC METALS -->
<!-- ========================================================================= -->
<div class="page">
    <div class="header">
        <div>
            <img src="data:image/png;base64,{logo_b64}" class="logo-img" alt="Tatvam Overseas Inc Logo">
            <div style="font-size:11pt; font-weight:800; color:#0f172a; margin-top:2px;">TATVAM OVERSEAS INC</div>
        </div>
        <div class="header-right">
            <strong>SECTION C: HIGH NICKEL &amp; SPECIAL ALLOYS</strong><br>
            Corrosion, Acid &amp; Extreme Temperature Service<br>
            Full Traceability to Leading Global Smelters
        </div>
    </div>

    <h2 class="section-title">(C.1) Nickel Alloys, Monel, Inconel &amp; Hastelloy <span class="tag">Exotic Materials</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:20%;">Material Family</th>
            <th style="width:25%;">Specific Grades</th>
            <th style="width:25%;">Forms Supplied</th>
            <th style="width:30%;">Key Service Environments</th>
        </tr>
        <tr>
            <td><strong>Inconel® Alloys</strong></td>
            <td>
                <span class="grade-pill highlight">Inconel 600</span>
                <span class="grade-pill highlight">Inconel 625</span>
                <span class="grade-pill">Inconel 718</span>
                <span class="grade-pill">Inconel 601</span>
            </td>
            <td>Pipes, Seamless Tubes, Round Bars, Plates, Flanges, Fasteners</td>
            <td>Oxidation up to 1100°C, extreme marine pitting, jet turbine exhausts, sour gas wells.</td>
        </tr>
        <tr>
            <td><strong>Incoloy® Alloys</strong></td>
            <td>
                <span class="grade-pill highlight">Incoloy 800</span>
                <span class="grade-pill">Incoloy 800H</span>
                <span class="grade-pill highlight">Incoloy 825</span>
            </td>
            <td>Seamless Tubes, Heat Exchanger Pipes, Round Rods, Plates</td>
            <td>High-temperature carburization, nitric/phosphoric/sulfuric acid environments.</td>
        </tr>
        <tr>
            <td><strong>Monel® Alloys</strong></td>
            <td>
                <span class="grade-pill highlight">Monel 400</span>
                <span class="grade-pill">Monel K-500</span>
            </td>
            <td>Rods, Shafts, Sheets, Condenser Tubes, U-Bolts, Flanges</td>
            <td>Seawater pumps, propeller shafts, hydrofluoric acid alkylation, crude oil distillation.</td>
        </tr>
        <tr>
            <td><strong>Hastelloy® Alloys</strong></td>
            <td>
                <span class="grade-pill highlight">Hastelloy C-276</span>
                <span class="grade-pill">Hastelloy C-22</span>
                <span class="grade-pill">Hastelloy B-2</span>
            </td>
            <td>Plates, Pipes, Buttweld Fittings, Flanges, Valves</td>
            <td>Wet chlorine gas, hypochlorite, severe ferric/cupric chloride, hydrochloric acid.</td>
        </tr>
        <tr>
            <td><strong>Pure Nickel</strong></td>
            <td>
                <span class="grade-pill">Nickel 200</span>
                <span class="grade-pill">Nickel 201</span>
            </td>
            <td>Sheets, Plates, Wires, Seamless Pipes, Rods</td>
            <td>Caustic soda evaporators, caustic alkalis, food processing, rayon manufacturing.</td>
        </tr>
        <tr>
            <td><strong>Cupro-Nickel (Cu-Ni)</strong></td>
            <td>
                <span class="grade-pill highlight">Cu-Ni 90/10 (C70600)</span>
                <span class="grade-pill highlight">Cu-Ni 70/30 (C71500)</span>
            </td>
            <td>Condenser Tubes (ASTM B111), Pipes (ASTM B466), Flanges</td>
            <td>Desalination plants, marine condenser tubing, seawater intake lines (anti-fouling).</td>
        </tr>
        <tr>
            <td><strong>Titanium &amp; Specialty</strong></td>
            <td>
                <span class="grade-pill">Titanium Gr. 2</span>
                <span class="grade-pill">Titanium Gr. 5</span>
                <span class="grade-pill highlight">SS 904L</span>
                <span class="grade-pill">Alloy 20</span>
            </td>
            <td>Plates, Seamless Tubes, Round Bars, Forged Rings</td>
            <td>Chlor-alkali, offshore oil platforms, aerospace brackets, sulfuric acid digestion.</td>
        </tr>
        <tr>
            <td><strong>Duplex &amp; Super Duplex</strong></td>
            <td>
                <span class="grade-pill highlight">Duplex 2205 (S31803)</span>
                <span class="grade-pill highlight">Super Duplex 2507</span>
            </td>
            <td>Pipes, Plates, Flanges, Buttweld Fittings, Fasteners</td>
            <td>2x strength of 316, chloride stress corrosion cracking immunity, reverse osmosis.</td>
        </tr>
    </table>

    <h2 class="section-title">(C.2) Copper &amp; Brass Products <span class="tag">Non-Ferrous Metals</span></h2>
    <div class="card-grid">
        <div class="info-card">
            <h4>Electrolytic Copper (ETP / DHP / OFC)</h4>
            <p>Pipes, Tubes, Busbars, Sheets, Strips, and Round Rods. Purity 99.9% min for high electrical and thermal conductivity in heat exchangers, electrical switchboards, and solar panels.</p>
        </div>
        <div class="info-card">
            <h4>Commercial &amp; Naval Brass</h4>
            <p>Naval Brass (C46400), Cartridge Brass (70/30), Free Cutting Brass (IS 319 / C36000) in Rods, Hex, Tubes, Sheets, and Threaded Components for marine hardware and precision instrumentation.</p>
        </div>
    </div>

    <div class="footer-bar">
        <span>Tatvam Overseas Inc | Section C: High Nickel &amp; Exotic Alloys</span>
        <span>sales@tatvamoverseasinc.com | +91 90828 34775</span>
    </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 5: FASTENERS, INSTRUMENTATION & HIGH PRESSURE FITTINGS -->
<!-- ========================================================================= -->
<div class="page">
    <div class="header">
        <div>
            <img src="data:image/png;base64,{logo_b64}" class="logo-img" alt="Tatvam Overseas Inc Logo">
            <div style="font-size:11pt; font-weight:800; color:#0f172a; margin-top:2px;">TATVAM OVERSEAS INC</div>
        </div>
        <div class="header-right">
            <strong>SECTION D: HARDWARE, FITTINGS &amp; FLANGES</strong><br>
            High Tensile Bolting, Double Ferrule &amp; Forged Components<br>
            Full Traceability &amp; Pressure Certified
        </div>
    </div>

    <h2 class="section-title">(D.1) Industrial Fasteners, Studs, Bolts &amp; Nuts <span class="tag">ASTM A193 / A194</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:25%;">Fastener Type</th>
            <th style="width:35%;">Material Grades</th>
            <th style="width:40%;">Size Range &amp; Standards</th>
        </tr>
        <tr>
            <td><strong>High Temp Stud Bolts &amp; Heavy Hex Nuts</strong></td>
            <td>
                • Studs: ASTM A193 Grade B7, B7M, B16<br>
                • Nuts: ASTM A194 Grade 2H, 2HM, Grade 4, Grade 7
            </td>
            <td>M10 to M100 (3/8" to 4" dia), cut lengths up to 4 meters. Zinc plated, Cadmium, PTFE Xylan coated, Hot-Dip Galvanized.</td>
        </tr>
        <tr>
            <td><strong>Stainless Steel Fasteners (A2 / A4)</strong></td>
            <td>
                • Studs/Bolts: ASTM A193 B8 (304), B8M (316), B8T (321)<br>
                • Nuts: ASTM A194 Grade 8, Grade 8M; ISO 3506 A2-70, A4-80
            </td>
            <td>M6 to M64 full thread, half thread hex head bolts, allen socket screws, spring &amp; flat washers. Anti-galling coatings available.</td>
        </tr>
        <tr>
            <td><strong>High Nickel Superalloy Fasteners</strong></td>
            <td>Inconel 625, Inconel 718, Monel 400, Hastelloy C-276, Titanium Gr. 2, Duplex 2205, Super Duplex 2507</td>
            <td>Custom CNC machined precision studs and 12-point bolts for subsea manifolds and aerospace furnaces.</td>
        </tr>
    </table>

    <h2 class="section-title">(D.2) Double Ferrule Compression Tube Fittings <span class="tag">Up to 10,000 PSI</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:25%;">Fitting Category</th>
            <th style="width:35%;">Configurations</th>
            <th style="width:40%;">Specs &amp; Materials</th>
        </tr>
        <tr>
            <td><strong>Double Ferrule Tube Fittings</strong></td>
            <td>Male Connector, Female Connector, Union, Union Tee, Union Elbow, Reducing Union, Bulkhead Union, Port Connector, Tube End Reducer, Cap, Plug</td>
            <td>
                • Tube OD: 1/8" to 1" (3 mm to 25 mm)<br>
                • Threads: NPT, BSPT, BSPP (1/8" to 1")<br>
                • Materials: SS 316, 316L, Monel 400, Brass, Inconel<br>
                • Pressure: Up to 6,000 / 10,000 PSI leak-tight
            </td>
        </tr>
        <tr>
            <td><strong>Instrumentation Valves &amp; Manifolds</strong></td>
            <td>Needle Valves, Ball Valves (1000# to 6000#), Check Valves, Gauge Valves, 2-Way, 3-Way &amp; 5-Way Valve Manifolds</td>
            <td>Precision stem packing in PTFE / Grafoil for high pressure instrumentation lines and impulse tubing.</td>
        </tr>
    </table>

    <h2 class="section-title">(D.3) High Pressure Forged Fittings <span class="tag">ASME B16.11 / 3000# 6000# 9000#</span></h2>
    <div class="card-grid">
        <div class="info-card">
            <h4>Socket Weld (SW) Fittings</h4>
            <p>90° Elbows, 45° Elbows, Tees, Crosses, Couplings, Half Couplings, Caps. Class 3000, 6000, 9000 in ASTM A105, A350 LF2, ASTM A182 F304L, F316L, F321, F11, F22.</p>
        </div>
        <div class="info-card">
            <h4>Screwed / Threaded (NPT / BSPT)</h4>
            <p>Full Couplings, Reducing Couplings, Hex Nipples, Swage Nipples, Street Elbows, Square / Hex Head Plugs, Bushings. Class 2000, 3000, 6000. Clean CNC cut threads.</p>
        </div>
    </div>

    <div class="footer-bar">
        <span>Tatvam Overseas Inc | Section D: Fasteners, Instrumentation &amp; Forged Fittings</span>
        <span>sales@tatvamoverseasinc.com | +91 90828 34775</span>
    </div>
</div>

<!-- ========================================================================= -->
<!-- PAGE 6: QUALITY ASSURANCE, EXPORT PACKING & CONTACT DETAILS -->
<!-- ========================================================================= -->
<div class="page">
    <div class="header">
        <div>
            <img src="data:image/png;base64,{logo_b64}" class="logo-img" alt="Tatvam Overseas Inc Logo">
            <div style="font-size:11pt; font-weight:800; color:#0f172a; margin-top:2px;">TATVAM OVERSEAS INC</div>
        </div>
        <div class="header-right">
            <strong>ORDERING, LOGISTICS &amp; VERIFICATION</strong><br>
            Quality Assurance &amp; Vendor Registration<br>
            Direct Factory &amp; Warehouse Dispatch
        </div>
    </div>

    <h2 class="section-title">Quality Assurance &amp; Inspection Protocols <span class="tag">ISO 9001:2015</span></h2>
    <table class="spec-table">
        <tr>
            <th style="width:25%;">Inspection Stage</th>
            <th style="width:40%;">Test Method / Procedure</th>
            <th style="width:35%;">Standard Reference</th>
        </tr>
        <tr>
            <td><strong>Chemical Verification</strong></td>
            <td>PMI (Positive Material Identification) with handheld XRF Analyzer; Spectro chemical laboratory analysis</td>
            <td>ASTM A751 / EN 10204 3.1</td>
        </tr>
        <tr>
            <td><strong>Mechanical Testing</strong></td>
            <td>Tensile strength, Yield strength, % Elongation, Hardness (Brinell / Rockwell / Vickers), Charpy V-Notch Impact</td>
            <td>ASTM A370 / ISO 6892</td>
        </tr>
        <tr>
            <td><strong>Non-Destructive Testing (NDT)</strong></td>
            <td>100% Ultrasonic Testing (UT), Eddy Current testing for tubes, Radiography (RT) for welded seams, Dye Penetrant (DP)</td>
            <td>ASME Sec V, ASTM A388, ASTM E213</td>
        </tr>
        <tr>
            <td><strong>Corrosion Resistance Tests</strong></td>
            <td>Intergranular Corrosion Test (IGC Practice A, B, C, E), Pitting resistance testing, HIC &amp; SSCC tests for NACE MR0175</td>
            <td>ASTM A262 Practice E, NACE TM0284</td>
        </tr>
        <tr>
            <td><strong>Dimensional &amp; Hydrostatic</strong></td>
            <td>Full vernier caliper, micrometer wall verification, Hydrostatic pressure holding test up to design limits</td>
            <td>ASME B36.10M / ASME B36.19M</td>
        </tr>
    </table>

    <h2 class="section-title">Export Packaging &amp; Sea-Worthy Logistics <span class="tag">Zero Damage Guarantee</span></h2>
    <div class="card-grid">
        <div class="info-card">
            <h4>Pipes &amp; Heavy Tubing</h4>
            <p>End plastic caps, hexagonal bundling with high tensile steel strapping, waterproof plastic wrapping, timber wooden cradles for long sea voyages.</p>
        </div>
        <div class="info-card">
            <h4>Plates, Sheets &amp; Coils</h4>
            <p>Fumigated wooden skids, corrugated sheet wrapping, moisture-absorbing silica pouches, metal edge corner protectors to prevent transit bending.</p>
        </div>
        <div class="info-card">
            <h4>Fittings, Flanges &amp; Fasteners</h4>
            <p>Individually wrapped with bubble film, packed in ISPM-15 heat-treated fumigated wooden plywood boxes with inner poly-liner protection.</p>
        </div>
        <div class="info-card">
            <h4>Documentation &amp; Shipping</h4>
            <p>Commercial Invoice, Packing List, Certificate of Origin (Chamber of Commerce), Bill of Lading, Legalized Embassy docs, Letter of Credit (LC) compliant.</p>
        </div>
    </div>

    <div class="contact-banner">
        <h3 style="font-size:12pt; font-weight:800; margin-bottom: 10px; color:#ffffff;">REGISTER TATVAM OVERSEAS INC AS YOUR APPROVED VENDOR</h3>
        <p style="font-size:8.5pt; color:#cbd5e1; margin-bottom: 12px;">Send your tender inquiries, Bill of Materials (BOM), or stock availability checks to our senior sales desk. We respond within 2 to 4 hours with official quotations and MTC samples.</p>
        <div class="contact-banner-grid">
            <div>
                <strong>REGISTERED OFFICE</strong>
                61, Jamnadas Building, Shop 5 &amp; 6,<br>
                10th Khetwadi Back Road, Girgaon,<br>
                Mumbai - 400004, Maharashtra, India
            </div>
            <div>
                <strong>TRADING HUB &amp; WAREHOUSE</strong>
                39/41, Kamal Building, 1st Kumbharwada Lane,<br>
                Near Round Temple, Bhandari Street,<br>
                Mumbai - 400004, Maharashtra, India
            </div>
            <div>
                <strong>DIRECT ENQUIRIES &amp; DESK</strong>
                Email: <strong>sales@tatvamoverseasinc.com</strong><br>
                Export: <strong>export@tatvamoverseasinc.com</strong><br>
                Phone: <strong>+91 90828 34775</strong> / <strong>+91 98696 07960</strong><br>
                Web: <strong>www.tatvamoverseasinc.com</strong>
            </div>
        </div>
    </div>

    <div class="footer-bar">
        <span>Tatvam Overseas Inc | Comprehensive Technical Catalog 2025-2026</span>
        <span>GSTIN: 27AHIPJ6958M1ZK | IEC: AHIPJ6958M | UDYAM: UDYAM-MH-19-0338145 | Page 6 of 6</span>
    </div>
</div>

</body>
</html>
"""

with open('/tmp/catalog.html', 'w') as f:
    f.write(html_content)

print('Wrote /tmp/catalog.html successfully.')
