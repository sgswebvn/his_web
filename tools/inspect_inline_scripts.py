import re

with open('page_home.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

scripts = re.findall(r'<script[^>]*>(.*?)</script>', html, re.DOTALL)
print(f"Total script tags: {len(scripts)}")
for i, s in enumerate(scripts):
    s_clean = s.strip()
    if s_clean and len(s_clean) < 500:
        print(f"\n--- Script {i} ---")
        print(s_clean[:300])
