import re

def inspect(fpath):
    with open(fpath, 'r', encoding='utf-8', errors='ignore') as f:
        text = f.read()
    m = re.search(r'<main[^>]*>(.*?)</main>', text, re.DOTALL)
    print(f"=== {fpath} ===")
    if m:
        main = m.group(1)
        headings = re.findall(r'<h[1-3][^>]*>(.*?)</h[1-3]>', main)
        print("Headings:", [re.sub(r'<[^>]+>', '', h).strip() for h in headings[:5]])
        forms = re.findall(r'<form[^>]*class=["\']([^"\']+)["\']', main)
        print("Forms:", forms)
    else:
        print("No main tag found")

for p in ['page_ve-mistory.html', 'page_qua-tang.html', 'page_lien-he.html', 'page_tai-khoan.html', 'page_tin-tuc.html']:
    inspect(p)
