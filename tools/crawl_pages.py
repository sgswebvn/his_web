import urllib.request
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    ('home', 'https://mistory.vn/'),
    ('ve-mistory', 'https://mistory.vn/ve-mistory/'),
    ('cua-hang', 'https://mistory.vn/cua-hang/'),
    ('phan-phu-lua', 'https://mistory.vn/phan-phu-lua/'),
    ('qua-tang', 'https://mistory.vn/qua-tang/'),
    ('tin-tuc', 'https://mistory.vn/tin-tuc/'),
    ('lien-he', 'https://mistory.vn/lien-he/'),
    ('gio-hang', 'https://mistory.vn/gio-hang/'),
    ('tai-khoan', 'https://mistory.vn/tai-khoan/'),
    ('chinh-sach-bao-mat', 'https://mistory.vn/chinh-sach-bao-mat/'),
    ('chinh-sach-doi-tra', 'https://mistory.vn/chinh-sach-doi-tra/'),
    ('chinh-sach-van-don', 'https://mistory.vn/chinh-sach-van-don/'),
]

for name, url in urls:
    req = urllib.request.Request(
        url,
        headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/120.0.0.0 Safari/537.36',
            'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8'
        }
    )
    try:
        with urllib.request.urlopen(req, context=ctx, timeout=15) as resp:
            content = resp.read()
            with open(f"page_{name}.html", "wb") as f:
                f.write(content)
            print(f"[OK 200] {name} -> {len(content)} bytes ({url})")
    except Exception as e:
        print(f"[ERR] {name} ({url}): {e}")
    time.sleep(0.5)
