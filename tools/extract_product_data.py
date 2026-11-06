import re
import glob

files = glob.glob("page_prod_*.html") + ["page_phan-phu-lua.html"]
for fpath in files:
    with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
        html = f.read()
    
    title = re.search(r'<h1[^>]*class=["\'][^"\']*product_title[^"\']*["\'][^>]*>(.*?)</h1>', html, re.DOTALL)
    if not title:
        title = re.search(r'<title>(.*?)</title>', html)
    
    price = re.search(r'<p[^>]*class=["\'][^"\']*price[^"\']*["\'][^>]*>(.*?)</p>', html, re.DOTALL)
    
    # check images
    images = re.findall(r'woocommerce-product-gallery__image[^>]*data-thumb=["\']([^"\']+)["\']', html)
    if not images:
        images = re.findall(r'<img[^>]*class=["\'][^"\']*wp-post-image[^"\']*["\'][^>]*src=["\']([^"\']+)["\']', html)
        
    print(f"=== {fpath} ===")
    print("Title:", title.group(1).strip() if title else "N/A")
    if price:
        # strip tags
        clean_price = re.sub(r'<[^>]+>', ' ', price.group(1)).strip()
        print("Price:", clean_price)
    print("Gallery images:", len(images))
    for im in images[:3]:
        print("  -", im)
