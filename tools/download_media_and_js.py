import os
import re
import glob
import urllib.request
import ssl
from urllib.parse import urlparse, unquote

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'Accept': '*/*'
}

def download_file(url, local_path):
    if os.path.exists(local_path) and os.path.getsize(local_path) > 0:
        return True
    os.makedirs(os.path.dirname(local_path), exist_ok=True)
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=30) as resp:
            content = resp.read()
            with open(local_path, 'wb') as f:
                f.write(content)
            print(f"[OK] {url} -> {local_path} ({len(content)} bytes)")
            return True
    except Exception as e:
        print(f"[FAIL] {url} : {e}")
        return False

# Collect all image, media, and js URLs from all html files
assets = set()

for fpath in glob.glob("page_*.html"):
    with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()

    # JS
    for src in re.findall(r'<script[^>]+src=["\']([^"\']+)["\']', html, re.I):
        clean = src.split('?')[0]
        if clean.startswith('//'):
            clean = 'https:' + clean
        elif clean.startswith('/'):
            clean = "https://mistory.vn" + clean
        if 'mistory.vn' in clean:
            assets.add(clean)

    # Images & Media
    for attr in re.findall(r'(?:src|data-src|srcset|poster|href)=["\']([^"\']+)["\']', html, re.I):
        parts = [p.strip().split(' ')[0] for p in attr.split(',') if p.strip()]
        for p in parts:
            clean = p.split('?')[0]
            if clean.startswith('//'):
                clean = 'https:' + clean
            elif clean.startswith('/'):
                clean = "https://mistory.vn" + clean
            
            if 'mistory.vn' in clean:
                lower = clean.lower()
                if any(lower.endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.ico', '.mp4', '.webm', '.ogg']):
                    assets.add(clean)

print(f"Total assets to download: {len(assets)}")

success = 0
failed = 0
for u in sorted(assets):
    path = unquote(urlparse(u).path.lstrip('/'))
    if download_file(u, path):
        success += 1
    else:
        failed += 1

print(f"\nDone! Success: {success}, Failed: {failed}")
