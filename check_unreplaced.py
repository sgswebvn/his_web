import glob
import re

total_unreplaced = 0
for fpath in glob.glob("**/index.html", recursive=True):
    with open(fpath, "r", encoding="utf-8", errors="ignore") as f:
        text = f.read()
    matches = set(re.findall(r'https?://mistory\.vn[^\s"\'<>]*', text))
    if matches:
        print(f"{fpath} has {len(matches)} unreplaced links:")
        for m in list(matches)[:3]:
            print("  ", m)
        total_unreplaced += len(matches)

print(f"Total unreplaced across all pages: {total_unreplaced}")
