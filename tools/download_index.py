import urllib.request
import ssl

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

req = urllib.request.Request(
    'https://mistory.vn/',
    headers={
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8',
        'Accept-Language': 'vi,en-US;q=0.9,en;q=0.8',
    }
)

print("Fetching https://mistory.vn/ ...")
with urllib.request.urlopen(req, context=ctx, timeout=20) as resp:
    content = resp.read()
    with open('index_raw.html', 'wb') as f:
        f.write(content)
    print(f"Downloaded {len(content)} bytes successfully!")
