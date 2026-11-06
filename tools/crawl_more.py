import urllib.request
import ssl
import time

ctx = ssl.create_default_context()
ctx.check_hostname = False
ctx.verify_mode = ssl.CERT_NONE

urls = [
    ('prod_phan-ma-hong-4in1-vu-khuc-thuy-dinh', 'https://mistory.vn/phan-ma-hong-4in1-vu-khuc-thuy-dinh/'),
    ('prod_phan-phu-lua-hong', 'https://mistory.vn/phan-phu-lua-hong/'),
    ('prod_phan-phu-lua-trong-suot', 'https://mistory.vn/phan-phu-lua-trong-suot/'),
    ('prod_guong-phuong-o', 'https://mistory.vn/guong-phuong-o/'),
    ('prod_box-sach-lich-su', 'https://mistory.vn/box-sach-lich-su/'),
    ('cat_cau-chuyen-van-hoa-lich-su', 'https://mistory.vn/cau-chuyen-van-hoa-lich-su/'),
    ('cat_cham-soc-suc-khoe-sac-dep', 'https://mistory.vn/cham-soc-suc-khoe-sac-dep/'),
    ('post_vai-tip-lam-sach-da-chet', 'https://mistory.vn/vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut-lam-sach-da-chet-tren-co-the-cung-mistory/'),
    ('post_vai-tip-giup-ban', 'https://mistory.vn/vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut/'),
    ('checkout', 'https://mistory.vn/thanh-toan/'),
    ('checkout_alt', 'https://mistory.vn/checkout/'),
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
            print(f"[OK {resp.status}] {name} -> {len(content)} bytes ({url})")
    except Exception as e:
        print(f"[ERR] {name} ({url}): {e}")
    time.sleep(0.4)
