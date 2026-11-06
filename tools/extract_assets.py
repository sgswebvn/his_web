import re
import glob
from urllib.parse import urljoin, urlparse

base_url = "https://mistory.vn"

css_files = set()
js_files = set()
img_files = set()
other_files = set()

for fpath in glob.glob("page_*.html"):
    with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # Find css
    for link in re.findall(r'<link[^>]+href=["\']([^"\']+)["\']', html, re.I):
        if '.css' in link:
            clean = link.split('?')[0]
            if clean.startswith('//'):
                clean = 'https:' + clean
            elif clean.startswith('/'):
                clean = base_url + clean
            if 'mistory.vn' in clean or clean.startswith('http'):
                css_files.add(clean)

    # Find js
    for script in re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html, re.I):
        clean = script.split('?')[0]
        if clean.startswith('//'):
            clean = 'https:' + clean
        elif clean.startswith('/'):
            clean = base_url + clean
        if 'mistory.vn' in clean or clean.startswith('http'):
            js_files.add(clean)

    # Find images
    for img in re.findall(r'(?:src|data-src|srcset|poster)=["\']([^"\']+)["\']', html, re.I):
        # handle srcset
        parts = [p.strip().split(' ')[0] for p in img.split(',') if p.strip()]
        for p in parts:
            if any(ext in p.lower() for ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico']):
                clean = p.split('?')[0]
                if clean.startswith('//'):
                    clean = 'https:' + clean
                elif clean.startswith('/'):
                    clean = base_url + clean
                if 'mistory.vn' in clean:
                    img_files.add(clean)
            elif any(ext in p.lower() for ext in ['.mp4', '.webm', '.ogg']):
                clean = p.split('?')[0]
                if clean.startswith('//'):
                    clean = 'https:' + clean
                elif clean.startswith('/'):
                    clean = base_url + clean
                if 'mistory.vn' in clean:
                    other_files.add(clean)

print(f"CSS files count: {len(css_files)}")
for c in sorted(css_files):
    print("  CSS:", c)

print(f"\nJS files count: {len(js_files)}")
for j in sorted(js_files):
    print("  JS:", j)

print(f"\nImages count: {len(img_files)}")
print(f"Other media count: {len(other_files)}")
for o in sorted(other_files):
    print("  Media:", o)
