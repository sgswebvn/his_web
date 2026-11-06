import re

with open('page_cua-hang.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

products = re.findall(r'<li[^>]*class=["\'][^"\']*product[^"\']*["\'][^>]*>(.*?)</li>', html, re.DOTALL)
print(f"Products in shop page: {len(products)}")

for i, p in enumerate(products):
    title = re.search(r'<h[23][^>]*>(.*?)</h[23]>', p)
    price = re.search(r'<span[^>]*class=["\'][^"\']*woocommerce-Price-amount[^"\']*["\'][^>]*>(.*?)</span>', p)
    link = re.search(r'<a[^>]*href=["\']([^"\']+)["\']', p)
    img = re.search(r'<img[^>]*src=["\']([^"\']+)["\']', p)
    print(f"\n--- Product {i+1} ---")
    print("Title:", re.sub(r'<[^>]+>', '', title.group(1)).strip() if title else "N/A")
    print("Link:", link.group(1) if link else "N/A")
    print("Image:", img.group(1) if img else "N/A")
    print("Price HTML:", re.sub(r'<[^>]+>', ' ', price.group(0)).strip() if price else "N/A")
