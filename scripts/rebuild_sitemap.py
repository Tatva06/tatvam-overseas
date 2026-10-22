import os
import glob
import subprocess
import datetime
import xml.etree.ElementTree as ET

BASE_URL = 'https://www.tatvamoverseasinc.com'

# List all html files
files = sorted(glob.glob('*.html') + glob.glob('*/*.html'))

# Exclude non-indexable files
EXCLUDE = {'404.html', 'admin.html'}

pages = []

for f in files:
    if f in EXCLUDE:
        continue

    # Determine URL
    if f == 'index.html':
        url = f'{BASE_URL}/'
        priority = '1.0'
        changefreq = 'weekly'
    elif f in ['products.html', 'blog.html', 'about.html', 'contact.html', 'calculator.html', 'mtc.html']:
        clean = f.replace('.html', '')
        url = f'{BASE_URL}/{clean}'
        priority = '0.9'
        changefreq = 'weekly'
    elif f in ['privacypolicy.html', 'terms.html']:
        clean = f.replace('.html', '')
        url = f'{BASE_URL}/{clean}'
        priority = '0.3'
        changefreq = 'yearly'
    elif f.startswith('products/'):
        clean = f.replace('.html', '')
        url = f'{BASE_URL}/{clean}'
        priority = '0.8'
        changefreq = 'monthly'
    elif f.startswith('blog/'):
        clean = f.replace('.html', '')
        url = f'{BASE_URL}/{clean}'
        priority = '0.8'
        changefreq = 'monthly'
    else:
        clean = f.replace('.html', '')
        url = f'{BASE_URL}/{clean}'
        priority = '0.7'
        changefreq = 'monthly'

    # Get real lastmod: check git last commit date, fallback to mtime
    git_date = subprocess.getoutput(f'git log -1 --format=%cd --date=format:%Y-%m-%d -- "{f}"').strip()
    if not git_date or len(git_date) != 10:
        mtime = os.path.getmtime(f)
        lastmod = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
    else:
        # If file has uncommitted changes, use current date
        status = subprocess.getoutput(f'git status --porcelain -- "{f}"').strip()
        if status:
            mtime = os.path.getmtime(f)
            lastmod = datetime.datetime.fromtimestamp(mtime).strftime('%Y-%m-%d')
        else:
            lastmod = git_date

    pages.append({
        'url': url,
        'lastmod': lastmod,
        'changefreq': changefreq,
        'priority': priority
    })

# Deduplicate URLs just in case
seen = set()
deduped_pages = []
for p in pages:
    if p['url'] not in seen:
        seen.add(p['url'])
        deduped_pages.append(p)

# Generate XML
xml_lines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
]

for p in deduped_pages:
    xml_lines.append('  <url>')
    xml_lines.append(f'    <loc>{p["url"]}</loc>')
    xml_lines.append(f'    <lastmod>{p["lastmod"]}</lastmod>')
    xml_lines.append(f'    <changefreq>{p["changefreq"]}</changefreq>')
    xml_lines.append(f'    <priority>{p["priority"]}</priority>')
    xml_lines.append('  </url>')

xml_lines.append('</urlset>')
xml_content = '\n'.join(xml_lines) + '\n'

with open('sitemap.xml', 'w', encoding='utf-8') as f:
    f.write(xml_content)

print(f'sitemap.xml rebuilt cleanly with {len(deduped_pages)} URLs.')

# Validate with XML parser
tree = ET.parse('sitemap.xml')
root = tree.getroot()
print('Validation successful! Root tag:', root.tag, 'Children:', len(root))
