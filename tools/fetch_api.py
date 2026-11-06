import urllib.request
import json
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

def get_json(url):
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
        }
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=10) as resp:
            return json.loads(resp.read().decode('utf-8'))
    except Exception as e:
        print(f"Failed {url}: {e}")
        return None

pages = get_json('https://mistory.vn/wp-json/wp/v2/pages?per_page=100')
if pages:
    print(f"\n--- PAGES ({len(pages)}) ---")
    for p in pages:
        print(f"ID: {p['id']}, Slug: {p['slug']}, Link: {p['link']}, Title: {p['title']['rendered']}")

posts = get_json('https://mistory.vn/wp-json/wp/v2/posts?per_page=100')
if posts:
    print(f"\n--- POSTS ({len(posts)}) ---")
    for p in posts:
        print(f"ID: {p['id']}, Slug: {p['slug']}, Link: {p['link']}, Title: {p['title']['rendered']}")

# Check products via wc or wp/v2
products = get_json('https://mistory.vn/wp-json/wp/v2/product?per_page=100')
if products:
    print(f"\n--- PRODUCTS (wp/v2/product) ({len(products)}) ---")
    for p in products:
        print(f"ID: {p['id']}, Slug: {p['slug']}, Link: {p['link']}, Title: {p['title']['rendered']}")
else:
    store_prods = get_json('https://mistory.vn/wp-json/wc/store/v1/products?per_page=100')
    if store_prods:
        print(f"\n--- PRODUCTS (wc/store/v1/products) ({len(store_prods)}) ---")
        for p in store_prods:
            print(f"ID: {p['id']}, Name: {p['name']}, Permalink: {p.get('permalink')}")

menus = get_json('https://mistory.vn/wp-json/wp/v2/menus')
if menus:
    print(f"\n--- MENUS ({len(menus)}) ---")
    for m in menus:
        print(m)
