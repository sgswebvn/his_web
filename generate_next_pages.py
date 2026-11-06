import os
import re
import json

routes = {
    'page_home.html': 'app',
    'page_ve-mistory.html': 'app/ve-mistory',
    'page_phan-phu-lua.html': 'app/phan-phu-lua',
    'page_prod_phan-ma-hong-4in1-vu-khuc-thuy-dinh.html': 'app/phan-ma-hong-4in1-vu-khuc-thuy-dinh',
    'page_prod_phan-phu-lua-hong.html': 'app/phan-phu-lua-hong',
    'page_prod_phan-phu-lua-trong-suot.html': 'app/phan-phu-lua-trong-suot',
    'page_prod_guong-phuong-o.html': 'app/guong-phuong-o',
    'page_prod_box-sach-lich-su.html': 'app/box-sach-lich-su',
    'page_tin-tuc.html': 'app/tin-tuc',
    'page_cat_cau-chuyen-van-hoa-lich-su.html': 'app/cau-chuyen-van-hoa-lich-su',
    'page_cat_cham-soc-suc-khoe-sac-dep.html': 'app/cham-soc-suc-khoe-sac-dep',
    'page_post_vai-tip-lam-sach-da-chet.html': 'app/vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut-lam-sach-da-chet-tren-co-the-cung-mistory',
    'page_post_vai-tip-giup-ban.html': 'app/vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut',
    'page_chinh-sach-bao-mat.html': 'app/chinh-sach-bao-mat',
    'page_chinh-sach-doi-tra.html': 'app/chinh-sach-doi-tra',
    'page_chinh-sach-van-don.html': 'app/chinh-sach-van-don',
}

products_info = {
    'phan-ma-hong-4in1-vu-khuc-thuy-dinh': {
        'id': 'phan-ma-hong-4in1',
        'name': 'Phấn má hồng 4in1 Vũ Khúc Thuỷ Đình',
        'price': 289000,
        'image': '/wp-content/uploads/2026/05/thumb.png',
        'variants': ['Gió Đông', 'Mưa Xuân', 'Nắng Hạ', 'Mây Trắng']
    },
    'phan-phu-lua-hong': {
        'id': 'phan-phu-lua-hong',
        'name': 'Phấn phủ Lụa – Hồng',
        'price': 279000,
        'image': '/wp-content/uploads/2025/10/DSC9620-3-scaled-e1761623821385.webp',
        'variants': ['Tự nhiên', 'Sáng hồng']
    },
    'phan-phu-lua-trong-suot': {
        'id': 'phan-phu-lua-trong-suot',
        'name': 'Phấn phủ Lụa – Trong suốt',
        'price': 279000,
        'image': '/wp-content/uploads/2025/10/DSC9623-1-scaled-e1761623588409.webp',
        'variants': ['Trong suốt kiềm dầu']
    },
    'guong-phuong-o': {
        'id': 'guong-phuong-o',
        'name': 'Gương Phượng Ổ',
        'price': 999000,
        'image': '/wp-content/uploads/2025/10/DSC9666-scaled.webp',
        'variants': ['Mặc định']
    },
    'box-sach-lich-su': {
        'id': 'box-sach-lich-su',
        'name': 'Box sách Lịch sử',
        'price': 999000,
        'image': '/wp-content/uploads/2025/10/DSC9649-1-1-scaled-e1762316915978.webp',
        'variants': ['Mặc định']
    },
    'phan-phu-lua': {
        'id': 'phan-phu-lua-hong',
        'name': 'Phấn phủ Lụa – Hồng',
        'price': 279000,
        'image': '/wp-content/uploads/2025/10/DSC9620-3-scaled-e1761623821385.webp',
        'variants': ['Tự nhiên', 'Sáng hồng']
    }
}

template_code = """'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

const MAIN_HTML = __RAW_HTML__;

export default function Page() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState('__DEFAULT_VARIANT__');

  useEffect(() => {
    // 1. Popup Box (Drawer purchase modal)
    const openBtns = document.querySelectorAll('[data-btn-popup="#popup-box"], [data-btn-popup]');
    const popupBox = document.getElementById('popup-box');
    const closeBtns = document.querySelectorAll('.close-popup-btn, #popup-box .close-btn');

    openBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (popupBox) popupBox.classList.add('active');
      });
    });

    closeBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        if (popupBox) popupBox.classList.remove('active');
      });
    });

    // 2. Swatches selection
    const swatches = document.querySelectorAll('.woo-variation-swatches-item, .swatch-item, .item-attribute');
    swatches.forEach(s => {
      s.addEventListener('click', function() {
        swatches.forEach(el => el.classList.remove('active', 'selected'));
        this.classList.add('active', 'selected');
        const v = this.getAttribute('data-value') || (this as HTMLElement).innerText.trim();
        if (v) setSelectedVariant(v);
      });
    });

    // 3. Quantity buttons
    const qtyInputs = document.querySelectorAll<HTMLInputElement>('input.qty, input[name="quantity"]');
    qtyInputs.forEach(input => {
      const minus = input.parentElement?.querySelector('.qty-minus, .btn-minus, button.minus');
      const plus = input.parentElement?.querySelector('.qty-plus, .btn-plus, button.plus');
      if (minus) {
        minus.addEventListener('click', () => {
          let val = parseInt(input.value, 10) || 1;
          if (val > 1) input.value = String(val - 1);
        });
      }
      if (plus) {
        plus.addEventListener('click', () => {
          let val = parseInt(input.value, 10) || 1;
          input.value = String(val + 1);
        });
      }
    });

    // 4. Add to cart button
    const addBtns = document.querySelectorAll('.single_add_to_cart_button, form.cart button[type="submit"], .add-to-cart-btn');
    addBtns.forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const input = document.querySelector<HTMLInputElement>('input.qty, input[name="quantity"]');
        const qty = input ? (parseInt(input.value, 10) || 1) : 1;
        addToCart({
          id: '__PROD_ID__',
          name: '__PROD_NAME__',
          variant: selectedVariant,
          price: __PROD_PRICE__,
          image: '__PROD_IMAGE__',
          url: '__PROD_URL__'
        }, qty);
      });
    });

    // 5. Accordion content-btn in news/categories
    document.querySelectorAll('.content-wrapper').forEach(wrapper => {
      const btn = wrapper.querySelector('.content-btn');
      const block = wrapper.querySelector<HTMLElement>('.content-block');
      if (btn && block) {
        btn.addEventListener('click', () => {
          const isAct = btn.classList.contains('active');
          if (isAct) {
            btn.classList.remove('active');
            block.classList.remove('show');
            block.style.display = 'none';
          } else {
            btn.classList.add('active');
            block.classList.add('show');
            block.style.display = 'block';
          }
        });
      }
    });

    // 6. Video Fancybox fallback
    const videoBtn = document.querySelector('a[href*="0605_VKTD_FINALE.mp4"]');
    if (videoBtn) {
      videoBtn.addEventListener('click', (e) => {
        if (typeof (window as any).$ === 'undefined' || !(window as any).$.fancybox) {
          e.preventDefault();
          window.open('/wp-content/uploads/2026/05/0605_VKTD_FINALE.mp4', '_blank');
        }
      });
    }
  }, [addToCart, selectedVariant]);

  return (
    <div
      dangerouslySetInnerHTML={{ __html: MAIN_HTML }}
    />
  );
}
"""

for src, target_dir in routes.items():
    src_path = os.path.join('tools', src)
    if not os.path.exists(src_path):
        continue

    with open(src_path, 'r', encoding='utf-8', errors='ignore') as f:
        html = f.read()

    html = re.sub(r'https?://mistory\.vn/', '/', html)
    html = re.sub(r'https?://mistory\.vn', '/', html)
    html = re.sub(r'//mistory\.vn/', '/', html)

    m = re.search(r'<main[^>]*>(.*?)</main>', html, re.DOTALL)
    if m:
        main_content = f"<main class=\"site-main\">{m.group(1)}</main>"
    else:
        b = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
        body = b.group(1) if b else html
        body = re.sub(r'<header[^>]*>.*?</header>', '', body, flags=re.DOTALL)
        body = re.sub(r'<footer[^>]*>.*?</footer>', '', body, flags=re.DOTALL)
        body = re.sub(r'<div[^>]*mobile-menu[^>]*>.*?</div>\s*</div>\s*</div>', '', body, flags=re.DOTALL)
        main_content = f"<main class=\"site-main\">{body}</main>"

    slug = os.path.basename(target_dir)
    p_info = products_info.get(slug, {
        'id': 'san-pham',
        'name': 'Sản phẩm Mistory',
        'price': 289000,
        'image': '/wp-content/uploads/2026/05/thumb.png',
        'variants': ['Mặc định']
    })

    raw_html_js = json.dumps(main_content)

    page_code = template_code.replace('__RAW_HTML__', raw_html_js)
    page_code = page_code.replace('__DEFAULT_VARIANT__', p_info['variants'][0])
    page_code = page_code.replace('__PROD_ID__', p_info['id'])
    page_code = page_code.replace('__PROD_NAME__', p_info['name'])
    page_code = page_code.replace('__PROD_PRICE__', str(p_info['price']))
    page_code = page_code.replace('__PROD_IMAGE__', p_info['image'])
    page_code = page_code.replace('__PROD_URL__', '/' + slug if slug != 'app' else '/')

    os.makedirs(target_dir, exist_ok=True)
    out_file = os.path.join(target_dir, 'page.tsx')
    with open(out_file, 'w', encoding='utf-8') as f:
        f.write(page_code)

print("Updated Next.js pages with HTMLInputElement typing.")
