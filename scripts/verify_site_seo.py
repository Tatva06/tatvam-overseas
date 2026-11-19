#!/usr/bin/env python3
"""
Comprehensive site-wide SEO audit for all updated pages.
"""
import glob, re, json, xml.etree.ElementTree as ET

def audit_site():
    print("=== SITE-WIDE SEO VERIFICATION AUDIT ===")
    
    pages = [
        "blog/ss-202-vs-ss-304-difference-uses-which-to-buy.html",
        "blog/what-is-en-10204-3-1-mill-test-certificate.html",
        "calculator.html",
        "products/ss-304-sheets-plates-supplier-mumbai.html",
        "products/ss-202-sheets-jindal-j1-j4-supplier-mumbai.html",
        "index.html",
        "about.html",
        "contact.html",
        "blog.html"
    ]
    
    titles = {}
    descs = {}
    
    for p in pages:
        with open(p, "r", encoding="utf-8") as f:
            content = f.read()
            
        m_title = re.search(r'<title>(.*?)</title>', content, re.DOTALL)
        title = m_title.group(1).strip() if m_title else "MISSING"
        clean_title = re.sub(r'\s+', ' ', title).replace('&amp;', '&').replace('&ndash;', '–').replace('&mdash;', '—')
        
        m_desc = re.search(r'<meta\s+name=[\"\']description[\"\']\s+content=[\"\'](.*?)[\"\']', content, re.DOTALL)
        if not m_desc:
            m_desc = re.search(r'<meta\s+content=[\"\'](.*?)[\"\']\s+name=[\"\']description[\"\']', content, re.DOTALL)
        desc = m_desc.group(1).strip() if m_desc else "MISSING"
        clean_desc = re.sub(r'\s+', ' ', desc).replace('&amp;', '&')
        
        h1s = re.findall(r'<h1[^>]*>(.*?)</h1>', content, re.DOTALL)
        
        print(f"\nPage: {p}")
        print(f"  Title ({len(clean_title)} chars): {clean_title}")
        print(f"  Meta Desc ({len(clean_desc)} chars): {clean_desc}")
        print(f"  H1 count: {len(h1s)}")
        
        assert len(clean_title) <= 60, f"Title > 60 chars in {p}: {len(clean_title)}"
        assert len(clean_desc) <= 155, f"Desc > 155 chars in {p}: {len(clean_desc)}"
        assert len(h1s) == 1, f"Expected 1 H1 in {p}, found {len(h1s)}"
        
        # Check duplicate
        if clean_title in titles:
            raise AssertionError(f"Duplicate title between {p} and {titles[clean_title]}: {clean_title}")
        titles[clean_title] = p
        
        if clean_desc in descs:
            raise AssertionError(f"Duplicate desc between {p} and {descs[clean_desc]}: {clean_desc}")
        descs[clean_desc] = p
        
        # Check JSON-LD
        schema_scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
        for s in schema_scripts:
            try:
                data = json.loads(s.strip())
            except Exception as e:
                raise AssertionError(f"Invalid JSON-LD in {p}: {e}")

    # Sitemap check
    tree = ET.parse("sitemap.xml")
    root = tree.getroot()
    urls = [u.find('{http://www.sitemaps.org/schemas/sitemap/0.9}loc').text for u in root.findall('{http://www.sitemaps.org/schemas/sitemap/0.9}url')]
    print(f"\nSitemap check: {len(urls)} URLs found. XML is valid.")
    assert len(urls) >= 38, f"Expected >= 38 URLs in sitemap, got {len(urls)}"

    print("\nALL CHECKS PASSED PERFECTLY! ✅")

if __name__ == "__main__":
    audit_site()
