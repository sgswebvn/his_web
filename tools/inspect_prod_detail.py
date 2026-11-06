import re

with open('page_prod_phan-ma-hong-4in1-vu-khuc-thuy-dinh.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

m = re.search(r'<main[^>]*>(.*?)</main>', text, re.DOTALL)
if m:
    main = m.group(1)
    secs = re.findall(r'<section[^>]*class=["\']([^"\']+)["\']', main)
    print("Sections in single product page:")
    for s in secs:
        print(" - Section:", s)
