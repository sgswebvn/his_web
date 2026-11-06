import re
import os
import glob
from urllib.parse import urlparse, unquote

missing_files = set()
checked_files = set()

for html_file in glob.glob("**/index.html", recursive=True):
    with open(html_file, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # Find all src and href to local assets
    urls = re.findall(r'(?:src|href|poster)=["\'](/[^"\']+)["\']', html)
    for u in urls:
        clean = u.split('?')[0].split('#')[0]
        if any(clean.lower().endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico', '.mp4', '.css', '.js', '.ttf', '.woff', '.woff2', '.otf']):
            if clean in checked_files:
                continue
            checked_files.add(clean)
            local_path = unquote(clean.lstrip('/'))
            if not os.path.exists(local_path):
                missing_files.add(clean)

print(f"Total unique local assets referenced in HTML: {len(checked_files)}")
print(f"Missing local assets count: {len(missing_files)}")
for m in sorted(missing_files)[:20]:
    print("  [MISSING]", m)

