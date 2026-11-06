import urllib.request

endpoints = [
    '/',
    '/ve-mistory/',
    '/cua-hang/',
    '/san-pham/',
    '/qua-tang/',
    '/phan-phu-lua/',
    '/phan-ma-hong-4in1-vu-khuc-thuy-dinh/',
    '/phan-phu-lua-hong/',
    '/phan-phu-lua-trong-suot/',
    '/guong-phuong-o/',
    '/box-sach-lich-su/',
    '/tin-tuc/',
    '/cau-chuyen-van-hoa-lich-su/',
    '/cham-soc-suc-khoe-sac-dep/',
    '/vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut-lam-sach-da-chet-tren-co-the-cung-mistory/',
    '/vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut/',
    '/lien-he/',
    '/gio-hang/',
    '/thanh-toan/',
    '/tai-khoan/',
    '/chinh-sach-bao-mat/',
    '/chinh-sach-doi-tra/',
    '/chinh-sach-van-don/',
    '/tim-kiem/',
    # Check custom assets
    '/wp-content/themes/gnws/custom-interactive.css',
    '/wp-content/themes/gnws/custom-interactive.js',
    '/wp-content/themes/gnws/style.css',
    '/wp-content/themes/gnws/assets/fonts/font.css',
    '/wp-content/themes/gnws/assets/fonts/BeVietnamPro-Regular.ttf',
    '/wp-content/uploads/2026/05/thumb.png',
]

failed = 0
for ep in endpoints:
    url = f"http://localhost:8080{ep}"
    try:
        with urllib.request.urlopen(url, timeout=5) as resp:
            status = resp.status
            size = len(resp.read())
            print(f"[OK {status}] {ep} ({size} bytes)")
    except Exception as e:
        print(f"[FAIL] {ep} : {e}")
        failed += 1

print(f"\nTested {len(endpoints)} endpoints. Failed: {failed}")

