import re

with open('page_home.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

for match in re.finditer(r'class=["\'][^"\']*popup-login[^"\']*["\']', text):
    start = max(0, match.start() - 200)
    end = min(len(text), match.end() + 500)
    print("Match around popup-login:")
    print(text[start:end])
