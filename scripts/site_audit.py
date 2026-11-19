#!/usr/bin/env python3
"""
site_audit.py
Scans every HTML and JS file in the workspace to find any .html internal link,
bad canonical, bad og:url, or bad JSON-LD reference.
"""
import glob, os, re, json

def audit():
    html_files = sorted(glob.glob("**/*.html", recursive=True))
    js_files = sorted(glob.glob("js/**/*.js", recursive=True))
    
    print(f"Total HTML files to scan: {len(html_files)}")
    print(f"Total JS files to scan: {len(js_files)}")
    print("=" * 70)
    
    audit_results = {}
    
    for f in html_files:
        with open(f, "r", encoding="utf-8") as fp:
            content = fp.read()
            
        # 1. Canonical
        can_matches = re.findall(r'<link\s+rel=[\"\']canonical[\"\']\s+href=[\"\']([^\"\']+)[\"\']', content)
        if not can_matches:
            can_matches = re.findall(r'<link\s+href=[\"\']([^\"\']+)[\"\']\s+rel=[\"\']canonical[\"\']', content)
        canonical = can_matches[0] if can_matches else None
        
        # 2. og:url
        og_matches = re.findall(r'<meta\s+property=[\"\']og:url[\"\']\s+content=[\"\']([^\"\']+)[\"\']', content)
        if not og_matches:
            og_matches = re.findall(r'<meta\s+content=[\"\']([^\"\']+)[\"\']\s+property=[\"\']og:url[\"\']', content)
        og_url = og_matches[0] if og_matches else None
        
        # 3. JSON-LD URLs
        schema_scripts = re.findall(r'<script type="application/ld\+json">(.*?)</script>', content, re.DOTALL)
        json_urls = []
        for s in schema_scripts:
            # find all urls inside json
            urls = re.findall(r'\"(?:url|@id|mainEntityOfPage|item)\":\s*\"([^\"]+)\"', s)
            json_urls.extend(urls)
            
        # 4. Internal links ending in .html
        all_hrefs = re.findall(r'href=[\"\']([^\"\']+)[\"\']', content)
        internal_html_links = [
            h for h in all_hrefs
            if '.html' in h and not h.startswith(('http://', 'https://', 'mailto:', 'tel:'))
            or ('tatvamoverseasinc.com' in h and '.html' in h)
        ]
        
        bad_canonical = canonical and (canonical.endswith('.html') or 'http://' in canonical or '://tatvamoverseasinc.com' in canonical)
        bad_og = og_url and (og_url.endswith('.html') or 'http://' in og_url or '://tatvamoverseasinc.com' in og_url)
        bad_json = [u for u in json_urls if u.endswith('.html') or 'http://' in u or '://tatvamoverseasinc.com' in u]
        
        audit_results[f] = {
            "canonical": canonical,
            "bad_canonical": bad_canonical,
            "og_url": og_url,
            "bad_og": bad_og,
            "bad_json": bad_json,
            "internal_html_links": internal_html_links
        }
        
        if bad_canonical or bad_og or bad_json or internal_html_links:
            print(f"ISSUE in {f}:")
            if bad_canonical: print(f"  Canonical: {canonical}")
            if bad_og: print(f"  og:url: {og_url}")
            if bad_json: print(f"  JSON-LD bad URLs: {bad_json}")
            if internal_html_links: print(f"  Internal .html links: {internal_html_links}")

    print("=" * 70)
    print("JS files check:")
    for jf in js_files:
        with open(jf, "r", encoding="utf-8") as fp:
            jcontent = fp.read()
        j_links = re.findall(r'[\"\'](/[a-zA-Z0-9_\-\./]+\.html[^\"]*)[\"\']', jcontent)
        if j_links:
            print(f"ISSUE in {jf}: {j_links}")

if __name__ == "__main__":
    audit()
