import re

with open('page_home.html', 'r', encoding='utf-8', errors='ignore') as f:
    html = f.read()

# Let's inspect headers, nav, main sections
sections = re.findall(r'<section[^>]*class=["\']([^"\']+)["\']', html)
print(f"Sections found ({len(sections)}):")
for s in sections[:20]:
    print(" - Section class:", s)

# Check header
header_match = re.search(r'<header[^>]*>.*?</header>', html, re.DOTALL)
if header_match:
    print(f"\nHeader found, length: {len(header_match.group(0))}")

# Check footer
footer_match = re.search(r'<footer[^>]*>.*?</footer>', html, re.DOTALL)
if footer_match:
    print(f"\nFooter found, length: {len(footer_match.group(0))}")

# Check forms
forms = re.findall(r'<form[^>]*class=["\']([^"\']+)["\']', html)
print(f"\nForms found ({len(forms)}):")
for f in forms:
    print(" - Form class:", f)
