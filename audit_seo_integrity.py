import os
import re
import json
from html.parser import HTMLParser

FILES_TO_CHECK = [
    "index.html",
    "about.html",
    "products.html",
    "blog.html",
    "contact.html",
    "calculator.html",
    "mtc.html",
    "privacypolicy.html",
    "terms.html",
    "404.html",
    "products/ss-304-sheets-plates-supplier-mumbai.html",
    "products/ss-316l-sheets-plates-supplier-mumbai.html",
    "products/stainless-steel-pipes-tubes-supplier-mumbai.html",
    "products/alloy-steel-p11-p22-ibr-pipes-mumbai.html",
    "products/carbon-steel-a106-api-5l-pipes-mumbai.html",
    "products/inconel-625-600-supplier-india.html",
    "products/duplex-2205-supplier-india.html",
    "products/ss-round-bars-angles-flats-supplier-mumbai.html",
    "blog/ss-304-vs-ss-316l-which-to-choose.html",
    "blog/what-is-en-10204-3-1-mill-test-certificate.html",
    "blog/ibr-certified-boiler-pipes-p11-p22-guide.html"
]

class SEOAuditor(HTMLParser):
    def __init__(self):
        super().__init__()
        self.title = ""
        self.in_title = False
        self.meta_desc = ""
        self.has_meta_keywords = False
        self.h1_count = 0
        self.scripts = []
        self.in_script = False
        self.current_script_type = ""
        self.current_script_content = ""

    def handle_starttag(self, tag, attrs):
        attr_dict = {k.lower(): v for k, v in attrs if v is not None}
        if tag == "title":
            self.in_title = True
        elif tag == "meta":
            name = attr_dict.get("name", "").lower()
            if name == "description":
                self.meta_desc = attr_dict.get("content", "")
            elif name == "keywords":
                self.has_meta_keywords = True
        elif tag == "h1":
            self.h1_count += 1
        elif tag == "script":
            stype = attr_dict.get("type", "").lower()
            if stype == "application/ld+json":
                self.in_script = True
                self.current_script_type = stype
                self.current_script_content = ""

    def handle_endtag(self, tag):
        if tag == "title":
            self.in_title = False
        elif tag == "script" and self.in_script:
            self.in_script = False
            self.scripts.append(self.current_script_content)
            self.current_script_content = ""

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_script:
            self.current_script_content += data

results = []
all_passed = True

print("=== STARTING TECHNICAL SEO INTEGRITY AUDIT ===")

for filepath in FILES_TO_CHECK:
    if not os.path.exists(filepath):
        print(f"❌ MISSING FILE: {filepath}")
        all_passed = False
        continue

    with open(filepath, "r", encoding="utf-8") as f:
        content = f.read()

    auditor = SEOAuditor()
    auditor.feed(content)

    issues = []

    # Title check (except 404 which can be simple)
    title_clean = auditor.title.strip()
    title_len = len(title_clean)
    if filepath != "404.html":
        if title_len > 65:
            issues.append(f"Title too long ({title_len} > 65): '{title_clean}'")
        elif title_len < 10:
            issues.append(f"Title too short ({title_len}): '{title_clean}'")

    # Meta desc check (except 404 which is noindex)
    if filepath != "404.html":
        desc_clean = auditor.meta_desc.strip()
        desc_len = len(desc_clean)
        if desc_len < 140 or desc_len > 160:
            issues.append(f"Meta desc length {desc_len} not in 140-160: '{desc_clean}'")

    # Meta keywords check
    if auditor.has_meta_keywords:
        issues.append("Contains forbidden <meta name='keywords'>")

    # H1 count check
    if auditor.h1_count != 1:
        issues.append(f"Expected exactly 1 <h1>, found {auditor.h1_count}")

    # JSON-LD validation
    for i, s in enumerate(auditor.scripts):
        s_clean = s.strip()
        if s_clean:
            try:
                json.loads(s_clean)
            except Exception as e:
                issues.append(f"JSON-LD script #{i+1} parse error: {e}")

    # Non-www domain check: regex for tatvamoverseasinc.com not preceded by www. or @ or mailto:
    non_www_matches = re.findall(r'(?<!www\.)(?<!@)(?<!mailto:)tatvamoverseasinc\.com', content)
    if non_www_matches:
        issues.append(f"Found {len(non_www_matches)} non-www domain mentions (must use www.tatvamoverseasinc.com)")

    # 90828 phone number check (ONLY allowed on contact.html for Tatva Jain)
    if filepath != "contact.html":
        if "90828" in content:
            issues.append("Found forbidden personal phone 90828 outside contact.html")

    if issues:
        all_passed = False
        print(f"❌ {filepath}:")
        for iss in issues:
            print(f"   - {iss}")
    else:
        status_line = f"✅ {filepath} -> Title ({title_len}c)"
        if filepath != "404.html":
            status_line += f" | Desc ({desc_len}c) | H1: {auditor.h1_count} | JSON-LD: {len(auditor.scripts)} valid"
        print(status_line)

print("\n=== AUDIT SUMMARY ===")
if all_passed:
    print("🎯 ALL 21 HTML FILES PASSED 100% OF SEO, INTEGRITY, SCHEMA, AND BRANDING TESTS!")
else:
    print("⚠️ SOME CHECKS FAILED. PLEASE REVIEW ISSUES ABOVE.")
