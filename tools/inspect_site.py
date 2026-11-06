import re
import json

with open('index_raw.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Extract links
links = set(re.findall(r'href=["\']([^"\']+)["\']', html))
internal_links = {l for l in links if 'mistory.vn' in l or (l.startswith('/') and not l.startswith('//'))}
print("=== Internal links ===")
for l in sorted(internal_links):
    print(l)

# Extract images
images = set(re.findall(r'src=["\']([^"\']+\.(?:png|jpg|jpeg|webp|svg|gif)[^"\']*)["\']', html, re.I))
# Also check srcset and data-src
data_srcs = set(re.findall(r'data-src=["\']([^"\']+)["\']', html, re.I))
srcset = set(re.findall(r'srcset=["\']([^"\']+)["\']', html, re.I))
print(f"\n=== Images count: src={len(images)}, data-src={len(data_srcs)}, srcset={len(srcset)} ===")

# Extract stylesheets
styles = set(re.findall(r'href=["\']([^"\']+\.css[^"\']*)["\']', html, re.I))
print(f"\n=== Stylesheets count: {len(styles)} ===")
for s in sorted(styles)[:15]:
    print(s)

# Extract scripts
scripts = set(re.findall(r'src=["\']([^"\']+\.js[^"\']*)["\']', html, re.I))
print(f"\n=== Scripts count: {len(scripts)} ===")
for sc in sorted(scripts)[:15]:
    print(sc)

# Check classes and plugins used
print("\n=== Generator and plugins detected ===")
for m in re.finditer(r'<meta name="generator" content="([^"]+)"', html):
    print("Generator:", m.group(1))

# Check for elementor, woocommerce, flatsome, etc.
if 'elementor' in html.lower():
    print("Found 'elementor'")
if 'woocommerce' in html.lower():
    print("Found 'woocommerce'")
if 'flatsome' in html.lower():
    print("Found 'flatsome'")
if 'contact-form-7' in html.lower():
    print("Found 'contact-form-7'")
