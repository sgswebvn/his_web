import os
import re

page_map = {
    'page_home.html': 'index.html',
    'page_ve-mistory.html': 've-mistory/index.html',
    'page_cua-hang.html': 'cua-hang/index.html',
    'page_qua-tang.html': 'qua-tang/index.html',
    'page_phan-phu-lua.html': 'phan-phu-lua/index.html',
    'page_prod_phan-ma-hong-4in1-vu-khuc-thuy-dinh.html': 'phan-ma-hong-4in1-vu-khuc-thuy-dinh/index.html',
    'page_prod_phan-phu-lua-hong.html': 'phan-phu-lua-hong/index.html',
    'page_prod_phan-phu-lua-trong-suot.html': 'phan-phu-lua-trong-suot/index.html',
    'page_prod_guong-phuong-o.html': 'guong-phuong-o/index.html',
    'page_prod_box-sach-lich-su.html': 'box-sach-lich-su/index.html',
    'page_tin-tuc.html': 'tin-tuc/index.html',
    'page_cat_cau-chuyen-van-hoa-lich-su.html': 'cau-chuyen-van-hoa-lich-su/index.html',
    'page_cat_cham-soc-suc-khoe-sac-dep.html': 'cham-soc-suc-khoe-sac-dep/index.html',
    'page_post_vai-tip-lam-sach-da-chet.html': 'vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut-lam-sach-da-chet-tren-co-the-cung-mistory/index.html',
    'page_post_vai-tip-giup-ban.html': 'vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut/index.html',
    'page_lien-he.html': 'lien-he/index.html',
    'page_gio-hang.html': 'gio-hang/index.html',
    'page_checkout.html': 'thanh-toan/index.html',
    'page_tai-khoan.html': 'tai-khoan/index.html',
    'page_chinh-sach-bao-mat.html': 'chinh-sach-bao-mat/index.html',
    'page_chinh-sach-doi-tra.html': 'chinh-sach-doi-tra/index.html',
    'page_chinh-sach-van-don.html': 'chinh-sach-van-don/index.html',
}

# Add san-pham category alias
page_map['page_cua-hang.html.san-pham'] = 'san-pham/index.html'

def process_html(html, target_rel):
    # 1. Replace host links
    html = re.sub(r'https?://mistory\.vn/', '/', html)
    html = re.sub(r'https?://mistory\.vn', '/', html)
    html = re.sub(r'//mistory\.vn/', '/', html)

    # 2. Fix cloudflare beacon / email-decode errors
    html = re.sub(r'<script[^>]*static\.cloudflareinsights\.com[^>]*>.*?</script>', '', html, flags=re.DOTALL)
    
    # 3. Inject custom CSS before </head>
    custom_css_tag = '\n<link rel="stylesheet" href="/wp-content/themes/gnws/custom-interactive.css">\n</head>'
    if '</head>' in html and 'custom-interactive.css' not in html:
        html = html.replace('</head>', custom_css_tag, 1)

    # 4. Inject custom JS before </body>
    custom_js_tag = '\n<script src="/wp-content/themes/gnws/custom-interactive.js"></script>\n</body>'
    if '</body>' in html and 'custom-interactive.js' not in html:
        html = html.replace('</body>', custom_js_tag, 1)

    return html

print("=== Building cloned site pages ===")
for src, dest in page_map.items():
    actual_src = src.replace('.san-pham', '')
    if not os.path.exists(actual_src):
        print(f"[MISSING] {actual_src}")
        continue
    with open(actual_src, 'r', encoding='utf-8', errors='ignore') as f:
        content = f.read()
    
    processed = process_html(content, dest)
    
    dest_dir = os.path.dirname(dest)
    if dest_dir:
        os.makedirs(dest_dir, exist_ok=True)
    with open(dest, 'w', encoding='utf-8') as f:
        f.write(processed)
    print(f"[BUILT] {dest} ({len(processed)} bytes)")

# 5. Build search results page tim-kiem/index.html
os.makedirs('tim-kiem', exist_ok=True)
with open('cua-hang/index.html', 'r', encoding='utf-8') as f:
    cua_hang = f.read()

# Customize cua-hang into search page
search_page = re.sub(
    r'<title>.*?</title>',
    '<title>Tìm kiếm - Mistory</title>',
    cua_hang
)
# Modify banner title
search_page = search_page.replace(
    'Cửa hàng',
    'Kết quả tìm kiếm'
)
search_script = """
<script>
document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const q = (params.get('s') || '').trim();
    const titleEl = document.querySelector('h1, h2');
    if (titleEl) {
        titleEl.textContent = q ? 'Kết quả tìm kiếm cho: "' + q + '"' : 'Tất cả sản phẩm';
    }
});
</script>
"""
if '</body>' in search_page:
    search_page = search_page.replace('</body>', search_script + '\n</body>', 1)

with open('tim-kiem/index.html', 'w', encoding='utf-8') as f:
    f.write(search_page)
print("[BUILT] tim-kiem/index.html")

print("\nAll pages successfully built!")

