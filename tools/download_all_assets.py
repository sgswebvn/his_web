import os
import re
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
        with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
            content = resp.read()
            with open(local_path, 'wb') as f:
                f.write(content)
            print(f"[OK] {url} -> {local_path} ({len(content)} bytes)")
            return True
    except Exception as e:
        print(f"[FAIL] {url} : {e}")
        return False

# 1. Download CSS files
css_list = [
    "https://mistory.vn/wp-content/plugins/contact-form-7/includes/css/styles.css",
    "https://mistory.vn/wp-content/plugins/payoneer-checkout/assets/css/frontend/payoneer-checkout.min.css",
    "https://mistory.vn/wp-content/plugins/woo-variation-swatches/assets/css/frontend.min.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/client/blocks/all-products.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/client/blocks/cart.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/client/blocks/packages-style.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/client/blocks/wc-blocks.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/css/brands.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/css/photoswipe/default-skin/default-skin.min.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/css/photoswipe/photoswipe.min.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/css/select2.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/css/woocommerce-layout.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/css/woocommerce-smallscreen.css",
    "https://mistory.vn/wp-content/plugins/woocommerce/assets/css/woocommerce.css",
    "https://mistory.vn/wp-content/themes/gnws/assets/alert/css/cf7simplepopup-core.css",
    "https://mistory.vn/wp-content/themes/gnws/assets/fonts/font.css",
    "https://mistory.vn/wp-content/themes/gnws/assets/libs/flickity.min.css",
    "https://mistory.vn/wp-content/themes/gnws/assets/libs/jquery.fancybox.css",
    "https://mistory.vn/wp-content/themes/gnws/css/woocommerce.min.css",
    "https://mistory.vn/wp-content/themes/gnws/style.css",
    "https://mistory.vn/wp-includes/blocks/paragraph/style.min.css"
]

print("=== Downloading CSS files ===")
for u in css_list:
    path = unquote(urlparse(u).path.lstrip('/'))
    download_file(u, path)

# 2. Parse downloaded CSS for fonts and images
font_urls = set()
css_images = set()

for u in css_list:
    path = unquote(urlparse(u).path.lstrip('/'))
    if os.path.exists(path):
        with open(path, 'r', encoding='utf-8', errors='ignore') as f:
            css_text = f.read()
        urls_in_css = re.findall(r'url\([\'"]?([^\'")]+)[\'"]?\)', css_text)
        css_dir = os.path.dirname(u)
        for rel in urls_in_css:
            if rel.startswith('data:'):
                continue
            if rel.startswith('http'):
                full = rel
            elif rel.startswith('/'):
                full = "https://mistory.vn" + rel
            else:
                # relative to css file
                import urllib.parse
                full = urllib.parse.urljoin(u, rel)
            
            clean = full.split('?')[0].split('#')[0]
            if any(clean.lower().endswith(ext) for ext in ['.woff', '.woff2', '.ttf', '.eot', '.otf']):
                font_urls.add(clean)
            elif any(clean.lower().endswith(ext) for ext in ['.png', '.jpg', '.jpeg', '.svg', '.webp', '.gif']):
                css_images.add(clean)

print(f"\n=== Found {len(font_urls)} fonts in CSS ===")
for fu in sorted(font_urls):
    p = unquote(urlparse(fu).path.lstrip('/'))
    download_file(fu, p)

print(f"\n=== Found {len(css_images)} images in CSS ===")
for ci in sorted(css_images):
    p = unquote(urlparse(ci).path.lstrip('/'))
    download_file(ci, p)
