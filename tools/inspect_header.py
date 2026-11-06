import re

with open('page_home.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

m = re.search(r'<header[^>]*>(.*?)</header>', text, re.DOTALL)
if m:
    print("=== HEADER ===")
    print(m.group(0))

# Also search for mobile menu or drawer outside header
drawers = re.findall(r'<div[^>]*class=["\'][^"\']*(?:menu-mobile|mobile-menu|drawer|sidebar|search-popup|popup-search)[^"\']*["\'][^>]*>.*?(?:</div>)', text, re.DOTALL)
print(f"\nDrawers/popups found: {len(drawers)}")
for d in drawers[:3]:
    print(d[:300])
