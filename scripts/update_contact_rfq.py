#!/usr/bin/env python3
"""
Task 6: Overhaul /contact to a structured global RFQ form
Fields:
- Product Name / Grade
- Product Form
- Dimensions / Thickness
- Surface Finish
- Quantity (kg/sheets)
- Destination Country / Port
- Incoterm (CIF/FOB/EXW/CFR)
- Delivery Timeframe
- MTC / Testing Requirement
- Contact Name, Company Name, Email, Phone
- Detailed Requirements / Message
"""

import re

def update_contact():
    path = "contact.html"
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()

    # Form heading update
    old_heading = r'<h2 class="text-3xl font-bold text-slate-900 mb-2">Send us a Message</h2>\s*<p class="text-slate-500 text-sm">.*?</p>'
    new_heading = """<h2 class="text-3xl font-bold text-slate-900 mb-2">Request a Price Quotation (RFQ)</h2>
                    <p class="text-slate-500 text-sm">Submit your material specifications for domestic or export delivery. Formal quotation provided within 2-4 working hours (Mon-Sat, 9 AM-7 PM IST).</p>"""
    html = re.sub(old_heading, new_heading, html, flags=re.DOTALL)

    # Overhaul Form Fields
    form_start_regex = r'<form action="https://api\.web3forms\.com/submit" method="POST" id="contactForm" class="space-y-6"\s*novalidate>.*?</form>'

    new_form_content = """<form action="https://api.web3forms.com/submit" method="POST" id="contactForm" class="space-y-6" novalidate>
                    <!-- Web3Forms Config -->
                    <input type="hidden" name="access_key" value="e65ddd09-27a6-4380-aef9-4f4465c4449f">
                    <input type="hidden" name="subject" value="New RFQ Quotation Request - Tatvam Overseas Website">
                    <input type="hidden" name="from_name" value="Tatvam RFQ System">
                    <input type="checkbox" name="botcheck" class="hidden" style="display: none;" tabindex="-1" autocomplete="off">

                    <!-- Inquiry Category Selector -->
                    <fieldset class="focus-within:ring-2 focus-within:ring-emerald-500/20 rounded-lg p-1 -m-1">
                        <legend class="block text-xs font-bold text-slate-700 uppercase mb-3 px-1">Order Destination Type</legend>
                        <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
                            <label class="cursor-pointer">
                                <input type="radio" name="inquiry_type" value="Domestic Quote (India)" class="peer sr-only" checked aria-label="Domestic Quote">
                                <div class="text-center py-3 px-3 border-2 border-slate-200 rounded-lg text-xs md:text-sm font-bold text-slate-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-all hover:bg-slate-50 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500">
                                    <i data-lucide="truck" class="w-4 h-4 mx-auto mb-1"></i>
                                    Domestic (India)
                                </div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="inquiry_type" value="Export Inquiry" class="peer sr-only" aria-label="Export Inquiry">
                                <div class="text-center py-3 px-3 border-2 border-slate-200 rounded-lg text-xs md:text-sm font-bold text-slate-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-all hover:bg-slate-50 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500">
                                    <i data-lucide="plane" class="w-4 h-4 mx-auto mb-1"></i>
                                    Global Export
                                </div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="inquiry_type" value="Stock Availability Check" class="peer sr-only" aria-label="Stock Check">
                                <div class="text-center py-3 px-3 border-2 border-slate-200 rounded-lg text-xs md:text-sm font-bold text-slate-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-all hover:bg-slate-50 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500">
                                    <i data-lucide="package-search" class="w-4 h-4 mx-auto mb-1"></i>
                                    Stock Check
                                </div>
                            </label>
                            <label class="cursor-pointer">
                                <input type="radio" name="inquiry_type" value="Custom Processing / Project" class="peer sr-only" aria-label="Custom Project">
                                <div class="text-center py-3 px-3 border-2 border-slate-200 rounded-lg text-xs md:text-sm font-bold text-slate-500 peer-checked:bg-emerald-50 peer-checked:text-emerald-700 peer-checked:border-emerald-500 transition-all hover:bg-slate-50 peer-focus-visible:ring-2 peer-focus-visible:ring-emerald-500">
                                    <i data-lucide="layers" class="w-4 h-4 mx-auto mb-1"></i>
                                    Custom Project
                                </div>
                            </label>
                        </div>
                    </fieldset>

                    <!-- Section: Material Details -->
                    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block">1. Material Specifications</span>
                        
                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label for="product_grade" class="block text-xs font-bold text-slate-700 uppercase mb-1">Material Grade <span class="text-red-500">*</span></label>
                                <select id="product_grade" name="product_grade" required class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none">
                                    <option value="" disabled selected>Select Grade</option>
                                    <option value="SS 304 / 304L">SS 304 / 304L (Standard)</option>
                                    <option value="SS 202 (Jindal J1 / J4)">SS 202 (Jindal J1 / J4)</option>
                                    <option value="SS 316 / 316L">SS 316 / 316L (Marine Grade)</option>
                                    <option value="Designer / PVD SS Sheet">Designer / PVD Decorative Sheet</option>
                                    <option value="SS Circles & Discs">SS Circles &amp; Discs</option>
                                    <option value="SS Patta / Patti (Flats)">SS Patta / Patti (Flat Strips)</option>
                                    <option value="Inconel 625 / 600">Inconel 625 / 600</option>
                                    <option value="Duplex 2205 / Super Duplex">Duplex 2205 / Super Duplex</option>
                                    <option value="Alloy Steel P11 / P22 (IBR)">Alloy Steel P11 / P22 (IBR)</option>
                                    <option value="Carbon Steel A106 / API 5L">Carbon Steel A106 / API 5L</option>
                                    <option value="Other High Nickel Alloy">Other High Nickel Alloy</option>
                                </select>
                            </div>
                            <div>
                                <label for="product_form" class="block text-xs font-bold text-slate-700 uppercase mb-1">Product Form <span class="text-red-500">*</span></label>
                                <select id="product_form" name="product_form" required class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none">
                                    <option value="" disabled selected>Select Form</option>
                                    <option value="Sheet / Plate">Sheet / Plate</option>
                                    <option value="Slit Coil / Strip">Slit Coil / Strip</option>
                                    <option value="Seamless Pipe / Tube">Seamless Pipe / Tube</option>
                                    <option value="Round Bar / Rod">Round Bar / Rod</option>
                                    <option value="Circle / Disc Blank">Circle / Disc Blank</option>
                                    <option value="Fittings / Flanges">Fittings / Flanges</option>
                                </select>
                            </div>
                        </div>

                        <div class="grid md:grid-cols-3 gap-4">
                            <div>
                                <label for="dimensions_thickness" class="block text-xs font-bold text-slate-700 uppercase mb-1">Size &amp; Thickness <span class="text-red-500">*</span></label>
                                <input type="text" id="dimensions_thickness" name="dimensions_thickness" required
                                       class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none"
                                       placeholder="e.g. 4x8 ft, 1.5 mm">
                            </div>
                            <div>
                                <label for="surface_finish" class="block text-xs font-bold text-slate-700 uppercase mb-1">Surface Finish</label>
                                <select id="surface_finish" name="surface_finish" class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none">
                                    <option value="2B Cold Rolled Mill Finish" selected>2B Cold Rolled (Standard)</option>
                                    <option value="No.4 Hairline Satin (Laser Film)">No.4 Hairline (Laser PVC)</option>
                                    <option value="BA Bright Annealed">BA Bright Annealed</option>
                                    <option value="8K Super Mirror">8K Super Mirror</option>
                                    <option value="PVD Titanium Gold">PVD Titanium Gold</option>
                                    <option value="PVD Rose Gold">PVD Rose Gold</option>
                                    <option value="PVD Black Titanium">PVD Black Titanium</option>
                                    <option value="Chemical Etched / 3D Ripple">Chemical Etched / 3D Ripple</option>
                                    <option value="No.1 Hot Rolled Pickled">No.1 Hot Rolled Pickled</option>
                                </select>
                            </div>
                            <div>
                                <label for="quantity" class="block text-xs font-bold text-slate-700 uppercase mb-1">Quantity <span class="text-red-500">*</span></label>
                                <input type="text" id="quantity" name="quantity" required
                                       class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none"
                                       placeholder="e.g. 500 kg, 20 sheets, 1 FCL">
                            </div>
                        </div>
                    </div>

                    <!-- Section: Shipping & Quality Logistics -->
                    <div class="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-4">
                        <span class="text-xs font-bold text-emerald-800 uppercase tracking-wider block">2. Delivery &amp; Inspection Terms</span>
                        
                        <div class="grid md:grid-cols-3 gap-4">
                            <div>
                                <label for="destination_port" class="block text-xs font-bold text-slate-700 uppercase mb-1">Destination Country &amp; Port <span class="text-red-500">*</span></label>
                                <input type="text" id="destination_port" name="destination_port" required
                                       class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none"
                                       placeholder="e.g. UAE (Jebel Ali), Dammam, Mumbai">
                            </div>
                            <div>
                                <label for="incoterm" class="block text-xs font-bold text-slate-700 uppercase mb-1">Preferred Incoterm</label>
                                <select id="incoterm" name="incoterm" class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none">
                                    <option value="CIF (Cost, Insurance & Freight)">CIF (Port of Discharge)</option>
                                    <option value="FOB (Free on Board - JNPT/Nhava Sheva)">FOB (JNPT / Nhava Sheva)</option>
                                    <option value="CFR (Cost & Freight)">CFR (Cost and Freight)</option>
                                    <option value="EXW (Ex-Warehouse Mumbai)">EXW (Ex-Warehouse Mumbai)</option>
                                </select>
                            </div>
                            <div>
                                <label for="mtc_inspection" class="block text-xs font-bold text-slate-700 uppercase mb-1">MTC / Testing Required</label>
                                <select id="mtc_inspection" name="mtc_inspection" class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none">
                                    <option value="EN 10204 3.1 Mill Test Certificate (Standard)" selected>EN 10204 3.1 MTC (Standard)</option>
                                    <option value="Third-Party Inspection (TPI: SGS/TUV/BV)">Third-Party TPI (SGS/TUV/BV)</option>
                                    <option value="PMI Spectrometry Test Certificate">PMI Spectrometry Test</option>
                                    <option value="Standard Mill TC">Standard Mill TC</option>
                                </select>
                            </div>
                        </div>

                        <div>
                            <label for="timeframe" class="block text-xs font-bold text-slate-700 uppercase mb-1">Delivery Timeframe Required</label>
                            <select id="timeframe" name="timeframe" class="w-full px-3 py-2.5 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-white outline-none">
                                <option value="Immediate / Ex-Stock Dispatch">Immediate / Ready Ex-Stock</option>
                                <option value="Within 1-2 Weeks">Within 1-2 Weeks</option>
                                <option value="Within 30 Days (Scheduled Production)">Within 30 Days</option>
                                <option value="Planning / Future Project Tender">Project Tender / Budgetary</option>
                            </select>
                        </div>
                    </div>

                    <!-- Section: Contact Details -->
                    <div class="space-y-4">
                        <span class="text-xs font-bold text-slate-700 uppercase tracking-wider block">3. Contact Information</span>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label for="name" class="block text-xs font-bold text-slate-700 uppercase mb-1">Contact Name <span class="text-red-500">*</span></label>
                                <input type="text" id="name" name="name" required
                                       class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-slate-50 outline-none"
                                       placeholder="Full Name">
                            </div>
                            <div>
                                <label for="company" class="block text-xs font-bold text-slate-700 uppercase mb-1">Company / Organization <span class="text-red-500">*</span></label>
                                <input type="text" id="company" name="company" required
                                       class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-slate-50 outline-none"
                                       placeholder="Company / Firm Name">
                            </div>
                        </div>

                        <div class="grid md:grid-cols-2 gap-4">
                            <div>
                                <label for="email" class="block text-xs font-bold text-slate-700 uppercase mb-1">Corporate Email <span class="text-red-500">*</span></label>
                                <input type="email" id="email" name="email" required
                                       class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-slate-50 outline-none"
                                       placeholder="procurement@company.com">
                            </div>
                            <div>
                                <label for="phone" class="block text-xs font-bold text-slate-700 uppercase mb-1">Phone / WhatsApp (with Country Code) <span class="text-red-500">*</span></label>
                                <input type="tel" id="phone" name="phone" required
                                       class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-slate-50 outline-none"
                                       placeholder="+971 50 1234567 or +91 99303 01181">
                            </div>
                        </div>
                    </div>

                    <!-- Additional Notes / Message -->
                    <div>
                        <div class="flex justify-between items-center mb-1">
                            <label for="message" class="block text-xs font-bold text-slate-700 uppercase">Additional Specifications / Notes</label>
                            <span id="charCount" class="text-xs text-slate-400 font-medium font-mono">0/1000</span>
                        </div>
                        <textarea id="message" name="message" rows="4" maxlength="1000"
                                  class="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-emerald-500 focus:bg-white text-sm bg-slate-50 resize-none outline-none"
                                  placeholder="Provide any custom tolerances, specific mill brand requirements (e.g. Jindal), cutting dimensions, or delivery instructions..."></textarea>
                    </div>

                    <!-- Submit Button -->
                    <button type="submit" id="submitBtn"
                            class="w-full bg-slate-900 hover:bg-emerald-600 focus:ring-4 focus:ring-emerald-500/30 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-emerald-500/20 transition-all transform active:scale-[0.99] flex items-center justify-center gap-2 text-base outline-none disabled:opacity-70 disabled:cursor-not-allowed">
                        <span id="btnText" class="flex items-center gap-2"><i data-lucide="send" class="w-5 h-5"></i> Submit Formal RFQ</span>
                        <i data-lucide="loader-2" id="btnSpinner" class="w-5 h-5 animate-spin hidden"></i>
                    </button>

                    <!-- Trust Badges -->
                    <div class="pt-4 flex flex-wrap justify-center gap-4 text-xs font-bold text-slate-500 border-t border-slate-100">
                        <span class="flex items-center gap-1.5"><i data-lucide="shield-check" class="w-4 h-4 text-emerald-500"></i> ISO 9001:2015</span>
                        <span class="flex items-center gap-1.5"><i data-lucide="file-check-2" class="w-4 h-4 text-emerald-500"></i> EN 10204 3.1 MTC</span>
                        <span class="flex items-center gap-1.5"><i data-lucide="ship" class="w-4 h-4 text-emerald-500"></i> JNPT FOB / Global CIF</span>
                    </div>

                    <!-- Success Message Overlay -->
                    <div id="success-overlay"
                         class="absolute inset-0 bg-white/95 backdrop-blur-sm z-10 flex flex-col items-center justify-center text-center p-8 hidden opacity-0 transition-opacity duration-300 rounded-2xl">
                        <div class="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mb-6 shadow-inner transform scale-0 transition-transform duration-500 delay-100"
                             id="success-icon-container">
                            <i data-lucide="check" class="w-10 h-10"></i>
                        </div>
                        <h3 class="text-3xl font-black text-slate-900 mb-2">RFQ Received!</h3>
                        <p class="text-slate-600 mb-6 max-w-sm">Thank you for contacting Tatvam Overseas Inc. Our commercial desk will review your specifications and email your formal quotation within 2-4 working hours.</p>
                        <button type="button" onclick="resetForm()"
                                class="bg-slate-100 text-slate-700 font-bold px-6 py-2 rounded-full hover:bg-slate-200 transition-colors focus:ring-2 focus:ring-slate-300 outline-none">Submit Another Inquiry</button>
                    </div>
                </form>"""

    html = re.sub(form_start_regex, new_form_content, html, flags=re.DOTALL)

    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print("contact.html RFQ form updated successfully.")

if __name__ == "__main__":
    update_contact()
