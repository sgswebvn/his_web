import urllib.request

endpoints = [
    '/',
    '/ve-mistory',
    '/cua-hang',
    '/san-pham',
    '/qua-tang',
    '/phan-ma-hong-4in1-vu-khuc-thuy-dinh',
    '/phan-phu-lua-hong',
    '/phan-phu-lua-trong-suot',
    '/guong-phuong-o',
    '/box-sach-lich-su',
    '/tin-tuc',
    '/lien-he',
    '/gio-hang',
    '/thanh-toan',
    '/tai-khoan',
    '/tim-kiem',
    '/chinh-sach-bao-mat',
    # Assets in public
    '/wp-content/themes/gnws/assets/fonts/font.css',
    '/wp-content/themes/gnws/style.css',
    '/wp-content/uploads/2026/05/thumb.png',
]

failed = 0
for ep in endpoints:
    url = f"http://localhost:3000{ep}"
    try:
        with urllib.request.urlopen(url, timeout=5) as resp:
            headers = dict(resp.getheaders())
            print(f"[OK {resp.status}] {ep} -> {headers.get('Content-Type', 'unknown')}")
    except Exception as e:
        print(f"[FAIL] {ep} : {e}")
        failed += 1

print(f"\nNext.js verified: {len(endpoints) - failed}/{len(endpoints)} passed.")

