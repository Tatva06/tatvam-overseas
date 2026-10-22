import os
import glob
import re
from html.parser import HTMLParser

html_files = sorted(glob.glob('*.html') + glob.glob('*/*.html'))

class PageAuditor(HTMLParser):
    def __init__(self, filepath):
        super().__init__()
        self.filepath = filepath
        self.h1_count = 0
        self.title = ''
        self.in_title = False
        self.description = ''
        self.canonical = ''
        self.og_url = ''
        self.og_image = ''
        self.twitter_image = ''
        self.html_lang = ''
        self.has_viewport = False
        self.images_without_alt = []
        self.internal_links = []
        self.scripts = []
        self.in_script = False
        self.current_script_type = ''
        self.script_content = []

    def handle_starttag(self, tag, attrs):
        d = dict(attrs)
        if tag == 'html':
            self.html_lang = d.get('lang', '')
        elif tag == 'meta':
            if d.get('name') == 'viewport':
                self.has_viewport = True
            elif d.get('name') == 'description':
                self.description = d.get('content', '')
            elif d.get('property') == 'og:url':
                self.og_url = d.get('content', '')
            elif d.get('property') == 'og:image':
                self.og_image = d.get('content', '')
            elif d.get('name') == 'twitter:image':
                self.twitter_image = d.get('content', '')
        elif tag == 'link':
            if d.get('rel') == 'canonical':
                self.canonical = d.get('href', '')
        elif tag == 'title':
            self.in_title = True
        elif tag == 'h1':
            self.h1_count += 1
        elif tag == 'img':
            if 'alt' not in d or not d['alt'].strip():
                src = d.get('src', 'unknown')
                self.images_without_alt.append(src)
        elif tag == 'a':
            href = d.get('href', '')
            if href:
                self.internal_links.append(href)
        elif tag == 'script':
            self.in_script = True
            self.current_script_type = d.get('type', '')
            self.script_content = []

    def handle_endtag(self, tag):
        if tag == 'title':
            self.in_title = False
        elif tag == 'script':
            self.in_script = False
            if 'ld+json' in self.current_script_type:
                self.scripts.append(''.join(self.script_content))
            self.script_content = []

    def handle_data(self, data):
        if self.in_title:
            self.title += data
        elif self.in_script:
            self.script_content.append(data)

titles = {}
descs = {}
total_issues = 0

print("="*60)
print("HEAD INTEGRITY AUDIT REPORT")
print("="*60)

for f in html_files:
    if f in ['admin.html']:
        continue # admin is excluded backend
    with open(f, 'r', encoding='utf-8') as fp:
        raw = fp.read()
    parser = PageAuditor(f)
    parser.feed(raw)
    
    issues = []
    
    # 1. H1 Count
    if parser.h1_count != 1:
        issues.append(f'H1 count != 1 (found {parser.h1_count})')
        
    # 2. Title length (30-60 chars)
    t = parser.title.strip()
    if len(t) < 30 or len(t) > 60:
        issues.append(f'Title length: {len(t)} ("{t}")')
    if t in titles:
        titles[t].append(f)
    else:
        titles[t] = [f]
        
    # 3. Meta description length (70-160 chars)
    md = parser.description.strip()
    if f not in ['404.html']:
        if len(md) < 70 or len(md) > 160:
            issues.append(f'Meta desc length: {len(md)} ("{md}")')
        if md in descs:
            descs[md].append(f)
        else:
            descs[md] = [f]
            
    # 4. Canonical matching chosen URL form
    if f not in ['404.html']:
        if f == 'index.html':
            expected_canonical = 'https://www.tatvamoverseasinc.com/'
        else:
            clean = f.replace('.html', '')
            expected_canonical = f'https://www.tatvamoverseasinc.com/{clean}'
        if parser.canonical != expected_canonical:
            issues.append(f'Canonical mismatch: {parser.canonical} != {expected_canonical}')
            
        # 5. og:url matches canonical
        if parser.og_url != parser.canonical:
            issues.append(f'og:url ({parser.og_url}) != canonical ({parser.canonical})')
            
        # 6. og:image & twitter:image
        for img_tag, img_val in [('og:image', parser.og_image), ('twitter:image', parser.twitter_image)]:
            if not img_val:
                issues.append(f'{img_tag} missing')
            else:
                local_path = img_val.replace('https://www.tatvamoverseasinc.com/', '').replace('https://tatvamoverseasinc.com/', '')
                if not os.path.exists(local_path):
                    issues.append(f'{img_tag} file not found: {local_path}')
                    
    # 7. Images without alt
    if parser.images_without_alt:
        issues.append(f'{len(parser.images_without_alt)} images without alt: {parser.images_without_alt[:3]}')
        
    # 8. lang="en-IN" & viewport
    if parser.html_lang != 'en-IN':
        issues.append(f'lang != en-IN (got "{parser.html_lang}")')
    if not parser.has_viewport:
        issues.append('missing viewport')
        
    # 9. JSON-LD checks
    for s in parser.scripts:
        if '<!--' in s:
            issues.append('JSON-LD contains <!--')
        if '"@type": "Product"' in s or '"@type":"Product"' in s:
            issues.append('Contains @type: Product')
            
    # 10. Links to /index.html or uncleaned .html
    bad_links = []
    for l in parser.internal_links:
        if 'index.html' in l:
            bad_links.append(l)
        elif l.endswith('.html') and not l.startswith('http') and not l.startswith('mailto:') and not l.startswith('tel:'):
            bad_links.append(l)
    if bad_links:
        issues.append(f'{len(bad_links)} non-canonical internal links: {bad_links[:4]}')

    if issues:
        total_issues += len(issues)
        print(f'[FAIL] {f}: {len(issues)} issues')
        for iss in issues:
            print(f'   - {iss}')
    else:
        print(f'[PASS] {f}')

# Duplicate titles
dup_titles = {t: fl for t, fl in titles.items() if len(fl) > 1}
if dup_titles:
    print('\n[FAIL] Duplicate titles found:')
    for t, fl in dup_titles.items():
        print(f'   "{t}": {fl}')
else:
    print('\n[PASS] No duplicate titles found across all pages.')

# Duplicate descriptions
dup_descs = {d: fl for d, fl in descs.items() if len(fl) > 1}
if dup_descs:
    print('\n[FAIL] Duplicate descriptions found:')
    for d, fl in dup_descs.items():
        print(f'   "{d[:60]}...": {fl}')
else:
    print('[PASS] No duplicate descriptions found across all pages.')

print(f'\nTotal Issues Found: {total_issues}')
