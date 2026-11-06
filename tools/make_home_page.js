const fs = require('fs');

const home = fs.readFileSync('tools/page_home.html', 'utf8');
const m = home.match(/<main[\s\S]*?<\/main>/i);
if (!m) {
  console.log('No main in page_home.html');
  process.exit(1);
}

let mainHtml = m[0];
// Remove intro clouds
mainHtml = mainHtml.replace(/<div class="home-hero-intro-clouds[\s\S]*?<\/div>/i, '');
// Clean URLs
mainHtml = mainHtml.replaceAll('https://mistory.vn/', '/');
mainHtml = mainHtml.replaceAll('http://mistory.vn/', '/');

const fileContent = `'use client';

import React, { useEffect, useState } from 'react';
import { useCart } from '@/context/CartContext';

const MAIN_HTML = ${JSON.stringify(mainHtml)};

export default function HomePage() {
  const { addToCart } = useCart();
  const [selectedVariant, setSelectedVariant] = useState('Gió Đông');

  useEffect(() => {
    // Accordion toggle
    document.querySelectorAll('.content-wrapper').forEach(wrapper => {
      const btn = wrapper.querySelector('.content-btn');
      const block = wrapper.querySelector('.content-block') as HTMLElement | null;
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

    // Video modal fallback
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
`;

fs.writeFileSync('app/page.tsx', fileContent, 'utf8');
console.log('Wrote app/page.tsx, size:', fileContent.length);
