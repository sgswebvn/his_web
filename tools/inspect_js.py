import re

with open('wp-content/themes/gnws/js/script.min.js', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

selectors = set(re.findall(r"\$\(['\"]([#\.\w\-\_\s\>\:\,]+)['\"]\)", text))
print(f"Count of jQuery selectors in script.min.js: {len(selectors)}")
for s in sorted(selectors)[:35]:
    if len(s) < 50:
        print(" -", s)
