import re
import glob

all_links = set()
for fpath in glob.glob("page_*.html"):
    with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    links = set(re.findall(r'href=["\']([^"\']+)["\']', html))
    for l in links:
        if 'mistory.vn' in l or (l.startswith('/') and not l.startswith('//')):
            # normalize
            cleaned = l.split('#')[0].split('?')[0]
            if cleaned:
                all_links.add(cleaned)

print(f"Total unique internal URLs found: {len(all_links)}")
for l in sorted(all_links):
    print(l)
