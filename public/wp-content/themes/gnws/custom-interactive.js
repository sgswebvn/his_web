/**
 * Mistory Clone - Interactive Functional Engine
 * Handles Cart, Checkout, Swatches, Search, Forms, and Navigation
 */

(function () {
    'use strict';

    // 1. PRODUCTS DATA
    const PRODUCTS = [
        {
            id: 'phan-ma-hong-4in1',
            slug: 'phan-ma-hong-4in1-vu-khuc-thuy-dinh',
            url: '/phan-ma-hong-4in1-vu-khuc-thuy-dinh/',
            name: 'Phấn má hồng 4in1 Vũ Khúc Thuỷ Đình',
            price: 289000,
            regularPrice: 359000,
            image: '/wp-content/uploads/2026/05/thumb.png',
            category: 'Sản phẩm',
            variants: ['Gió Đông', 'Mưa Xuân', 'Nắng Hạ', 'Mây Trắng']
        },
        {
            id: 'phan-phu-lua-hong',
            slug: 'phan-phu-lua-hong',
            url: '/phan-phu-lua-hong/',
            name: 'Phấn phủ Lụa – Hồng',
            price: 279000,
            regularPrice: 329000,
            image: '/wp-content/uploads/2025/10/DSC9620-3-scaled-e1761623821385.webp',
            category: 'Sản phẩm',
            variants: ['Tự nhiên', 'Sáng hồng']
        },
        {
            id: 'phan-phu-lua-trong-suot',
            slug: 'phan-phu-lua-trong-suot',
            url: '/phan-phu-lua-trong-suot/',
            name: 'Phấn phủ Lụa – Trong suốt',
            price: 279000,
            regularPrice: 329000,
            image: '/wp-content/uploads/2025/10/DSC9623-1-scaled-e1761623588409.webp',
            category: 'Sản phẩm',
            variants: ['Trong suốt kiềm dầu']
        },
        {
            id: 'guong-phuong-o',
            slug: 'guong-phuong-o',
            url: '/guong-phuong-o/',
            name: 'Gương Phượng Ổ',
            price: 999000,
            regularPrice: 999000,
            image: '/wp-content/uploads/2025/10/DSC9666-scaled.webp',
            category: 'Quà tặng',
            variants: ['Mặc định']
        },
        {
            id: 'box-sach-lich-su',
            slug: 'box-sach-lich-su',
            url: '/box-sach-lich-su/',
            name: 'Box sách Lịch sử',
            price: 999000,
            regularPrice: 999000,
            image: '/wp-content/uploads/2025/10/DSC9649-1-1-scaled-e1762316915978.webp',
            category: 'Quà tặng',
            variants: ['Mặc định']
        }
    ];

    // Articles data for search
    const ARTICLES = [
        {
            title: 'Vài tip giúp bạn tận hưởng trọn vẹn từng giây phút làm sạch da chết',
            url: '/vai-tip-giup-ban-tan-huong-tron-ven-tung-giay-phut-lam-sach-da-chet-tren-co-the-cung-mistory/',
            category: 'Chăm sóc sức khỏe - sắc đẹp'
        },
        {
            title: 'Câu chuyện văn hóa - lịch sử và nguồn cảm hứng Hai Bà Trưng',
            url: '/cau-chuyen-van-hoa-lich-su/',
            category: 'Câu chuyện văn hóa - lịch sử'
        }
    ];

    // Helper: format VND
    function formatVND(amount) {
        return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount).replace('₫', '₫');
    }

    // 2. CART ENGINE
    window.MistoryCart = {
        STORAGE_KEY: 'mistory_cart_v1',
        COUPON_KEY: 'mistory_applied_coupon',

        getCart: function () {
            try {
                const data = localStorage.getItem(this.STORAGE_KEY);
                if (data) return JSON.parse(data);
            } catch (e) {
                console.error('Error loading cart', e);
            }
            // default demo cart with 1 item so user immediately sees rich cart UI if not empty
            const defaultCart = [
                {
                    id: 'phan-ma-hong-4in1',
                    name: 'Phấn má hồng 4in1 Vũ Khúc Thuỷ Đình',
                    variant: 'Gió Đông',
                    price: 289000,
                    regularPrice: 359000,
                    image: '/wp-content/uploads/2026/05/thumb.png',
                    url: '/phan-ma-hong-4in1-vu-khuc-thuy-dinh/',
                    quantity: 1
                }
            ];
            this.saveCart(defaultCart);
            return defaultCart;
        },

        saveCart: function (cart) {
            try {
                localStorage.setItem(this.STORAGE_KEY, JSON.stringify(cart));
            } catch (e) {
                console.error('Error saving cart', e);
            }
            this.updateBadge();
        },

        addItem: function (item, qty) {
            qty = parseInt(qty, 10) || 1;
            const cart = this.getCart();
            const existingIndex = cart.findIndex(c => c.id === item.id && c.variant === item.variant);
            if (existingIndex > -1) {
                cart[existingIndex].quantity += qty;
            } else {
                cart.push({
                    id: item.id,
                    name: item.name,
                    variant: item.variant || 'Mặc định',
                    price: item.price,
                    regularPrice: item.regularPrice || item.price,
                    image: item.image,
                    url: item.url || '/cua-hang/',
                    quantity: qty
                });
            }
            this.saveCart(cart);
            this.showToast(`Đã thêm <strong>${item.name}</strong> (${item.variant || 'Mặc định'}) vào giỏ hàng!`);
        },

        updateQuantity: function (index, qty) {
            const cart = this.getCart();
            if (cart[index]) {
                if (qty <= 0) {
                    cart.splice(index, 1);
                } else {
                    cart[index].quantity = qty;
                }
                this.saveCart(cart);
            }
        },

        removeItem: function (index) {
            const cart = this.getCart();
            if (cart[index]) {
                const removed = cart.splice(index, 1);
                this.saveCart(cart);
                this.showToast(`Đã xóa <strong>${removed[0].name}</strong> khỏi giỏ hàng.`);
            }
        },

        clearCart: function () {
            localStorage.removeItem(this.STORAGE_KEY);
            localStorage.removeItem(this.COUPON_KEY);
            this.updateBadge();
        },

        getCount: function () {
            const cart = this.getCart();
            return cart.reduce((total, item) => total + (item.quantity || 1), 0);
        },

        getSubtotal: function () {
            const cart = this.getCart();
            return cart.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0);
        },

        getCoupon: function () {
            return localStorage.getItem(this.COUPON_KEY) || null;
        },

        applyCoupon: function (code) {
            const cleanCode = (code || '').trim().toUpperCase();
            if (cleanCode === 'MISTORY10') {
                localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: 'MISTORY10', discountPercent: 10, discountAmount: 0 }));
                return { success: true, message: 'Đã áp dụng mã ưu đãi MISTORY10 (Giảm 10%)!' };
            } else if (cleanCode === 'FREESHIP') {
                localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: 'FREESHIP', discountPercent: 0, freeShip: true }));
                return { success: true, message: 'Đã áp dụng mã FREESHIP (Miễn phí vận chuyển)!' };
            } else if (cleanCode === 'MISTORY50K') {
                localStorage.setItem(this.COUPON_KEY, JSON.stringify({ code: 'MISTORY50K', discountPercent: 0, discountAmount: 50000 }));
                return { success: true, message: 'Đã áp dụng mã giảm giá 50.000₫!' };
            } else {
                return { success: false, message: 'Mã giảm giá không hợp lệ hoặc đã hết hạn.' };
            }
        },

        removeCoupon: function () {
            localStorage.removeItem(this.COUPON_KEY);
        },

        updateBadge: function () {
            const count = this.getCount();
            document.querySelectorAll('.cart-btn .count, .cart .count').forEach(el => {
                el.textContent = count;
            });
        },

        showToast: function (msg) {
            const existing = document.getElementById('mistory-toast');
            if (existing) existing.remove();

            const toast = document.createElement('div');
            toast.id = 'mistory-toast';
            toast.className = 'mistory-toast';
            toast.innerHTML = `
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#FBE196" stroke-width="2">
                    <path d="M20 6L9 17l-5-5"/>
                </svg>
                <div style="font-size: 14px; line-height: 1.4;">${msg}</div>
                <a href="/gio-hang/" style="margin-left: 10px; background: #EBD5C1; color: #522F05; padding: 6px 14px; border-radius: 9999px; font-size: 12px; font-weight: 700; text-decoration: none; white-space: nowrap;">Xem giỏ</a>
            `;
            document.body.appendChild(toast);
            setTimeout(() => {
                if (toast.parentNode) {
                    toast.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
                    toast.style.opacity = '0';
                    toast.style.transform = 'translateY(20px)';
                    setTimeout(() => toast.remove(), 400);
                }
            }, 3800);
        }
    };

    // 3. INITIALIZE ON DOM READY
    document.addEventListener('DOMContentLoaded', function () {
        MistoryCart.updateBadge();
        initHeaderInteractions();
        initSearch();
        initMobileMenu();
        initAccordions();
        initProductPageInteractions();
        initCartPage();
        initCheckoutPage();
        initAccountPage();
        initContactAndNewsletterForms();
    });

    // --- Header & Sticky ---
    function initHeaderInteractions() {
        const headerBg = document.querySelector('.header-bg');
        if (headerBg) {
            const handleScroll = () => {
                if (window.scrollY > 40) {
                    headerBg.classList.add('active');
                } else {
                    headerBg.classList.remove('active');
                }
            };
            window.addEventListener('scroll', handleScroll);
            handleScroll();
        }

        // Fix Account button link to /tai-khoan/
        document.querySelectorAll('.popup-login-btn').forEach(btn => {
            btn.style.cursor = 'pointer';
            btn.addEventListener('click', () => {
                window.location.href = '/tai-khoan/';
            });
        });
    }

    // --- Search functionality ---
    function initSearch() {
        const searchBtns = document.querySelectorAll('.search-btn');
        const boxSearch = document.querySelector('.box-search');
        if (!boxSearch) return;

        searchBtns.forEach(btn => {
            btn.addEventListener('click', function (e) {
                e.stopPropagation();
                boxSearch.classList.toggle('active');
                const input = boxSearch.querySelector('input[name="s"]');
                if (input && boxSearch.classList.contains('active')) {
                    input.focus();
                }
            });
        });

        // Close search when clicking outside
        document.addEventListener('click', function (e) {
            if (!boxSearch.contains(e.target) && !e.target.closest('.search-btn')) {
                boxSearch.classList.remove('active');
            }
        });

        // Live search dropdown
        const searchInput = boxSearch.querySelector('input[name="s"]');
        if (searchInput) {
            let resultsDropdown = document.createElement('div');
            resultsDropdown.className = 'mistory-search-results';
            resultsDropdown.style.display = 'none';
            boxSearch.appendChild(resultsDropdown);

            searchInput.addEventListener('input', function () {
                const q = this.value.trim().toLowerCase();
                if (q.length < 2) {
                    resultsDropdown.style.display = 'none';
                    return;
                }

                const matchedProds = PRODUCTS.filter(p => p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q));
                const matchedArts = ARTICLES.filter(a => a.title.toLowerCase().includes(q));

                if (matchedProds.length === 0 && matchedArts.length === 0) {
                    resultsDropdown.innerHTML = `<div style="padding: 16px; text-align: center; color: #888; font-size: 14px;">Không tìm thấy kết quả nào cho "<strong>${q}</strong>"</div>`;
                    resultsDropdown.style.display = 'block';
                    return;
                }

                let html = '<div style="padding: 10px 16px; background: #FAF5EE; font-size: 12px; font-weight: 700; color: #522F05; text-transform: uppercase; letter-spacing: 0.05em;">Sản phẩm gợi ý</div>';
                matchedProds.forEach(p => {
                    html += `
                        <a href="${p.url}" class="mistory-search-item">
                            <img src="${p.image}" alt="${p.name}" style="width: 44px; height: 44px; object-fit: contain; border-radius: 8px; background: #F8F4EE; padding: 2px;">
                            <div style="flex: 1;">
                                <div style="font-weight: 600; font-size: 14px; line-height: 1.3;">${p.name}</div>
                                <div style="font-size: 13px; color: #522F05; font-weight: 700; margin-top: 2px;">${formatVND(p.price)}</div>
                            </div>
                        </a>
                    `;
                });

                if (matchedArts.length > 0) {
                    html += '<div style="padding: 10px 16px; background: #FAF5EE; font-size: 12px; font-weight: 700; color: #522F05; text-transform: uppercase; letter-spacing: 0.05em; border-top: 1px solid #EBD5C1;">Bài viết</div>';
                    matchedArts.forEach(a => {
                        html += `
                            <a href="${a.url}" class="mistory-search-item">
                                <div style="flex: 1;">
                                    <div style="font-weight: 500; font-size: 13px;">${a.title}</div>
                                    <div style="font-size: 11px; color: #888; margin-top: 2px;">${a.category}</div>
                                </div>
                            </a>
                        `;
                    });
                }

                resultsDropdown.innerHTML = html;
                resultsDropdown.style.display = 'block';
            });
        }
    }

    // --- Mobile Menu Toggle ---
    function initMobileMenu() {
        const toggleBtn = document.querySelector('.toggle-menu-btn');
        const mobileMenu = document.querySelector('.mobile-menu');
        if (!toggleBtn || !mobileMenu) return;

        toggleBtn.addEventListener('click', function () {
            mobileMenu.classList.toggle('active');
        });

        // Check if there is a close button in mobile menu
        const closeBtn = mobileMenu.querySelector('.close-menu-btn, .close-btn, svg.close');
        if (closeBtn) {
            closeBtn.addEventListener('click', function () {
                mobileMenu.classList.remove('active');
            });
        }

        // Add a close button if missing
        if (!mobileMenu.querySelector('.mistory-mobile-close')) {
            const closeX = document.createElement('button');
            closeX.className = 'mistory-mobile-close';
            closeX.style.cssText = 'position: absolute; top: 16px; right: 16px; background: #522F05; color: #FFF; width: 36px; height: 36px; border-radius: 50%; border: none; font-size: 20px; display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 1000;';
            closeX.innerHTML = '&times;';
            closeX.onclick = () => mobileMenu.classList.remove('active');
            mobileMenu.appendChild(closeX);
        }

        // Submenu accordion toggles in mobile menu
        mobileMenu.querySelectorAll('.menu-item-has-children > a').forEach(a => {
            a.addEventListener('click', function (e) {
                const sub = this.nextElementSibling;
                if (sub && sub.classList.contains('sub-menu')) {
                    e.preventDefault();
                    sub.style.display = (sub.style.display === 'block') ? 'none' : 'block';
                }
            });
        });
    }

    // --- Accordions in Cửa Hàng & Tin Tức ---
    function initAccordions() {
        document.querySelectorAll('.content-wrapper').forEach(wrapper => {
            const btn = wrapper.querySelector('.content-btn');
            const block = wrapper.querySelector('.content-block');
            if (btn && block) {
                btn.addEventListener('click', function () {
                    const isActive = btn.classList.contains('active');
                    if (isActive) {
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
    }

    // --- Product Detail Page Interactions ---
    function initProductPageInteractions() {
        const cartForm = document.querySelector('form.cart, form.variations_form');
        if (!cartForm) return;

        // Current product resolution
        const currentPath = window.location.pathname;
        let currentProd = PRODUCTS.find(p => currentPath.includes(p.slug)) || PRODUCTS[0];

        let selectedVariant = currentProd.variants[0] || 'Mặc định';

        // Variation swatches / buttons
        const swatchItems = document.querySelectorAll('.woo-variation-swatches-item, .swatch-item, .item-attribute');
        swatchItems.forEach(item => {
            item.style.cursor = 'pointer';
            item.addEventListener('click', function () {
                swatchItems.forEach(s => s.classList.remove('active', 'selected'));
                this.classList.add('active', 'selected');

                // Read variant label
                const label = this.getAttribute('data-value') || this.getAttribute('data-tooltip') || this.innerText.trim();
                if (label) {
                    selectedVariant = label;
                    const labelDisplay = document.querySelector('.attribute-value, .selected-variation-item');
                    if (labelDisplay) labelDisplay.textContent = label;
                }
            });
        });

        // Quantity controls
        const qtyInput = cartForm.querySelector('input.qty, input[name="quantity"]');
        const minusBtn = cartForm.querySelector('.qty-minus, .btn-minus, button.minus');
        const plusBtn = cartForm.querySelector('.qty-plus, .btn-plus, button.plus');

        if (qtyInput) {
            if (minusBtn) {
                minusBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    let v = parseInt(qtyInput.value, 10) || 1;
                    if (v > 1) qtyInput.value = v - 1;
                });
            }
            if (plusBtn) {
                plusBtn.addEventListener('click', function (e) {
                    e.preventDefault();
                    let v = parseInt(qtyInput.value, 10) || 1;
                    qtyInput.value = v + 1;
                });
            }
        }

        // Add to Cart button
        const addToCartBtn = cartForm.querySelector('button[type="submit"], button.single_add_to_cart_button, .add-to-cart-btn');
        if (addToCartBtn) {
            addToCartBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;
                MistoryCart.addItem({
                    id: currentProd.id,
                    name: currentProd.name,
                    variant: selectedVariant,
                    price: currentProd.price,
                    regularPrice: currentProd.regularPrice,
                    image: currentProd.image,
                    url: currentProd.url
                }, qty);
            });
        }

        // Buy Now button if present
        const buyNowBtn = cartForm.querySelector('.buy-now-btn, button.btn-buy-now');
        if (buyNowBtn) {
            buyNowBtn.addEventListener('click', function (e) {
                e.preventDefault();
                const qty = qtyInput ? (parseInt(qtyInput.value, 10) || 1) : 1;
                MistoryCart.addItem({
                    id: currentProd.id,
                    name: currentProd.name,
                    variant: selectedVariant,
                    price: currentProd.price,
                    regularPrice: currentProd.regularPrice,
                    image: currentProd.image,
                    url: currentProd.url
                }, qty);
                window.location.href = '/thanh-toan/';
            });
        }
    }

    // --- Cart Page Rendering ---
    function initCartPage() {
        const isCartPage = window.location.pathname.includes('/gio-hang');
        if (!isCartPage) return;

        const mainContainer = document.querySelector('main .container');
        if (!mainContainer) return;

        function renderCart() {
            const cart = MistoryCart.getCart();
            const subtotal = MistoryCart.getSubtotal();
            const couponRaw = MistoryCart.getCoupon();
            let coupon = null;
            try {
                if (couponRaw) coupon = JSON.parse(couponRaw);
            } catch (e) {}

            let discount = 0;
            let isFreeShip = false;
            if (coupon) {
                if (coupon.discountPercent) discount = Math.round(subtotal * (coupon.discountPercent / 100));
                if (coupon.discountAmount) discount = coupon.discountAmount;
                if (coupon.freeShip) isFreeShip = true;
            }

            const shippingFee = (subtotal > 500000 || isFreeShip || subtotal === 0) ? 0 : 30000;
            const total = Math.max(0, subtotal - discount + shippingFee);

            if (cart.length === 0) {
                mainContainer.innerHTML = `
                    <div class="mistory-card text-center py-16 max-w-xl mx-auto my-12">
                        <div class="w-20 h-20 mx-auto mb-6 rounded-full bg-[#FAF5EE] flex items-center justify-center text-[#522F05]">
                            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                                <circle cx="9" cy="21" r="1"/><circle cx="20" cy="21" r="1"/>
                                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
                            </svg>
                        </div>
                        <h2 class="font-beauty text-3xl font-medium text-[#522F05] mb-3">Giỏ hàng của bạn đang trống</h2>
                        <p class="text-sm text-[#775A38] mb-8">Hãy khám phá bộ sưu tập tuyệt mỹ từ Mistory và chọn sản phẩm yêu thích.</p>
                        <a href="/cua-hang/" class="mistory-btn-primary">Khám phá cửa hàng</a>
                    </div>
                `;
                return;
            }

            let rowsHtml = '';
            cart.forEach((item, index) => {
                const itemSubtotal = item.price * (item.quantity || 1);
                rowsHtml += `
                    <tr class="mistory-cart-row">
                        <td class="mistory-cart-cell" style="width: 45%;">
                            <div class="flex items-center gap-4">
                                <a href="${item.url}">
                                    <img src="${item.image}" alt="${item.name}" style="width: 80px; height: 80px; object-fit: contain; border-radius: 12px; background: #FAF6F0; padding: 4px;">
                                </a>
                                <div>
                                    <a href="${item.url}" class="font-medium text-[#522F05] text-base hover:opacity-80 transition" style="display: block; line-height: 1.3;">
                                        ${item.name}
                                    </a>
                                    <span style="display: inline-block; margin-top: 4px; font-size: 12px; padding: 2px 10px; background: #F5EBE1; color: #522F05; border-radius: 9999px;">
                                        Phiên bản: ${item.variant || 'Mặc định'}
                                    </span>
                                </div>
                            </div>
                        </td>
                        <td class="mistory-cart-cell text-center" style="font-weight: 600; color: #522F05;">
                            ${formatVND(item.price)}
                        </td>
                        <td class="mistory-cart-cell text-center">
                            <div class="mistory-qty-control">
                                <button type="button" class="mistory-qty-btn btn-cart-minus" data-index="${index}">-</button>
                                <input type="text" class="mistory-qty-input" value="${item.quantity}" readonly>
                                <button type="button" class="mistory-qty-btn btn-cart-plus" data-index="${index}">+</button>
                            </div>
                        </td>
                        <td class="mistory-cart-cell text-center" style="font-weight: 700; color: #522F05;">
                            ${formatVND(itemSubtotal)}
                        </td>
                        <td class="mistory-cart-cell text-center">
                            <button type="button" class="btn-cart-remove text-red-500 hover:text-red-700 transition" data-index="${index}" style="background: none; border: none; font-size: 20px; cursor: pointer;">
                                &times;
                            </button>
                        </td>
                    </tr>
                `;
            });

            mainContainer.innerHTML = `
                <div class="pt-6 pb-14">
                    <div class="mb-8">
                        <div class="text-xs uppercase tracking-wider text-[#775A38] mb-1">
                            <a href="/" class="hover:underline">Trang chủ</a> / <span class="font-semibold text-[#522F05]">Giỏ hàng</span>
                        </div>
                        <h1 class="font-beauty text-3xl lg:text-5xl font-medium text-[#522F05]">Giỏ hàng của bạn</h1>
                    </div>

                    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                        <!-- Table Column -->
                        <div class="lg:col-span-8">
                            <div class="overflow-x-auto">
                                <table class="mistory-cart-table">
                                    <thead>
                                        <tr class="text-xs uppercase tracking-wider text-[#775A38] border-b border-[#EBD5C1]">
                                            <th class="text-left pb-3 font-semibold">Sản phẩm</th>
                                            <th class="text-center pb-3 font-semibold">Đơn giá</th>
                                            <th class="text-center pb-3 font-semibold">Số lượng</th>
                                            <th class="text-center pb-3 font-semibold">Tạm tính</th>
                                            <th class="text-center pb-3 font-semibold">Xóa</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        ${rowsHtml}
                                    </tbody>
                                </table>
                            </div>

                            <div class="flex flex-wrap items-center justify-between gap-4 mt-6">
                                <div class="flex items-center gap-2">
                                    <input type="text" id="coupon-code-input" placeholder="Mã ưu đãi (VD: MISTORY10)" class="mistory-input" style="width: 240px;" value="${coupon ? coupon.code : ''}">
                                    <button type="button" id="apply-coupon-btn" class="mistory-btn-secondary" style="padding: 12px 20px;">Áp dụng</button>
                                </div>
                                <div class="flex items-center gap-3">
                                    <a href="/cua-hang/" class="mistory-btn-secondary" style="padding: 12px 20px;">Tiếp tục mua hàng</a>
                                    <button type="button" id="clear-cart-btn" class="text-xs text-[#775A38] hover:text-red-600 underline" style="background: none; border: none; cursor: pointer;">Xóa hết</button>
                                </div>
                            </div>
                            ${coupon ? `
                                <div class="mt-3 text-sm text-green-700 flex items-center gap-2">
                                    <span>Đã áp dụng mã: <strong>${coupon.code}</strong></span>
                                    <button type="button" id="remove-coupon-btn" class="text-xs text-red-500 underline ml-2">Gỡ mã</button>
                                </div>
                            ` : ''}
                        </div>

                        <!-- Summary Column -->
                        <div class="lg:col-span-4">
                            <div class="mistory-card">
                                <h3 class="font-beauty text-2xl font-medium text-[#522F05] pb-4 mb-4 border-b border-[#F0E2D4]">Cộng giỏ hàng</h3>
                                <div class="space-y-3 text-sm mb-6">
                                    <div class="flex justify-between text-[#522F05]">
                                        <span>Tạm tính</span>
                                        <span class="font-semibold">${formatVND(subtotal)}</span>
                                    </div>
                                    ${discount > 0 ? `
                                        <div class="flex justify-between text-green-700">
                                            <span>Giảm giá (${coupon.code})</span>
                                            <span class="font-semibold">-${formatVND(discount)}</span>
                                        </div>
                                    ` : ''}
                                    <div class="flex justify-between text-[#522F05]">
                                        <span>Giao hàng</span>
                                        <span class="font-semibold">${shippingFee === 0 ? '<span class="text-green-700">Miễn phí</span>' : formatVND(shippingFee)}</span>
                                    </div>
                                    <div class="pt-3 border-t border-[#F0E2D4] flex justify-between items-baseline">
                                        <span class="font-beauty text-lg text-[#522F05]">Tổng thanh toán</span>
                                        <span class="font-bold text-2xl text-[#522F05]">${formatVND(total)}</span>
                                    </div>
                                </div>
                                <a href="/thanh-toan/" class="mistory-btn-primary w-full text-center py-3.5 block">
                                    Tiến hành thanh toán
                                </a>
                                <div class="mt-4 text-center text-xs text-[#8B7355]">
                                    Miễn phí vận chuyển toàn quốc cho đơn hàng từ 500.000₫
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;

            // Bind interactive events
            mainContainer.querySelectorAll('.btn-cart-minus').forEach(btn => {
                btn.addEventListener('click', function () {
                    const idx = parseInt(this.getAttribute('data-index'), 10);
                    const currentQty = cart[idx].quantity || 1;
                    MistoryCart.updateQuantity(idx, currentQty - 1);
                    renderCart();
                });
            });

            mainContainer.querySelectorAll('.btn-cart-plus').forEach(btn => {
                btn.addEventListener('click', function () {
                    const idx = parseInt(this.getAttribute('data-index'), 10);
                    const currentQty = cart[idx].quantity || 1;
                    MistoryCart.updateQuantity(idx, currentQty + 1);
                    renderCart();
                });
            });

            mainContainer.querySelectorAll('.btn-cart-remove').forEach(btn => {
                btn.addEventListener('click', function () {
                    const idx = parseInt(this.getAttribute('data-index'), 10);
                    MistoryCart.removeItem(idx);
                    renderCart();
                });
            });

            const clearBtn = mainContainer.querySelector('#clear-cart-btn');
            if (clearBtn) {
                clearBtn.addEventListener('click', function () {
                    if (confirm('Bạn có chắc muốn xóa toàn bộ giỏ hàng?')) {
                        MistoryCart.clearCart();
                        renderCart();
                    }
                });
            }

            const applyCouponBtn = mainContainer.querySelector('#apply-coupon-btn');
            if (applyCouponBtn) {
                applyCouponBtn.addEventListener('click', function () {
                    const input = mainContainer.querySelector('#coupon-code-input');
                    const res = MistoryCart.applyCoupon(input ? input.value : '');
                    alert(res.message);
                    renderCart();
                });
            }

            const removeCouponBtn = mainContainer.querySelector('#remove-coupon-btn');
            if (removeCouponBtn) {
                removeCouponBtn.addEventListener('click', function () {
                    MistoryCart.removeCoupon();
                    renderCart();
                });
            }
        }

        renderCart();
    }

    // --- Checkout Page Rendering ---
    function initCheckoutPage() {
        const isCheckoutPage = window.location.pathname.includes('/thanh-toan');
        if (!isCheckoutPage) return;

        const mainContainer = document.querySelector('main .container');
        if (!mainContainer) return;

        const cart = MistoryCart.getCart();
        if (cart.length === 0) {
            mainContainer.innerHTML = `
                <div class="mistory-card text-center py-16 max-w-xl mx-auto my-12">
                    <h2 class="font-beauty text-3xl font-medium text-[#522F05] mb-3">Giỏ hàng của bạn đang trống</h2>
                    <p class="text-sm text-[#775A38] mb-8">Vui lòng chọn sản phẩm trước khi tiến hành thanh toán.</p>
                    <a href="/cua-hang/" class="mistory-btn-primary">Quay lại cửa hàng</a>
                </div>
            `;
            return;
        }

        const subtotal = MistoryCart.getSubtotal();
        const couponRaw = MistoryCart.getCoupon();
        let coupon = null;
        try { if (couponRaw) coupon = JSON.parse(couponRaw); } catch(e){}

        let discount = 0;
        let isFreeShip = false;
        if (coupon) {
            if (coupon.discountPercent) discount = Math.round(subtotal * (coupon.discountPercent / 100));
            if (coupon.discountAmount) discount = coupon.discountAmount;
            if (coupon.freeShip) isFreeShip = true;
        }

        const shippingFee = (subtotal > 500000 || isFreeShip) ? 0 : 30000;
        const total = Math.max(0, subtotal - discount + shippingFee);

        let itemsHtml = '';
        cart.forEach(item => {
            itemsHtml += `
                <div class="flex items-center justify-between py-3 border-b border-[#F0E4D7] text-sm">
                    <div class="flex items-center gap-3">
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px; object-fit: contain; border-radius: 8px; background: #FAF5EE;">
                        <div>
                            <div class="font-medium text-[#522F05]">${item.name}</div>
                            <div class="text-xs text-[#8B7355]">Phiên bản: ${item.variant} &times; ${item.quantity}</div>
                        </div>
                    </div>
                    <div class="font-semibold text-[#522F05]">${formatVND(item.price * item.quantity)}</div>
                </div>
            `;
        });

        mainContainer.innerHTML = `
            <div class="pt-6 pb-16">
                <div class="mb-8">
                    <div class="text-xs uppercase tracking-wider text-[#775A38] mb-1">
                        <a href="/" class="hover:underline">Trang chủ</a> / <a href="/gio-hang/" class="hover:underline">Giỏ hàng</a> / <span class="font-semibold text-[#522F05]">Thanh toán</span>
                    </div>
                    <h1 class="font-beauty text-3xl lg:text-5xl font-medium text-[#522F05]">Thanh toán đơn hàng</h1>
                </div>

                <form id="checkout-form" class="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
                    <!-- Billing Form Column -->
                    <div class="lg:col-span-7">
                        <div class="mistory-card">
                            <h2 class="font-beauty text-2xl font-medium text-[#522F05] pb-3 mb-5 border-b border-[#F0E4D7]">Thông tin giao hàng</h2>
                            
                            <div class="space-y-4">
                                <div>
                                    <label class="block text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-1.5">Họ và tên người nhận <span class="text-red-500">*</span></label>
                                    <input type="text" name="billing_name" required placeholder="Nguyễn Văn A" class="mistory-input">
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-1.5">Số điện thoại <span class="text-red-500">*</span></label>
                                        <input type="tel" name="billing_phone" required placeholder="0912345678" pattern="[0-9]{10}" class="mistory-input">
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-1.5">Địa chỉ Email <span class="text-red-500">*</span></label>
                                        <input type="email" name="billing_email" required placeholder="email@example.com" class="mistory-input">
                                    </div>
                                </div>

                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label class="block text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-1.5">Tỉnh / Thành phố <span class="text-red-500">*</span></label>
                                        <select name="billing_city" required class="mistory-input">
                                            <option value="">Chọn Tỉnh / Thành phố</option>
                                            <option value="Hà Nội" selected>Hà Nội</option>
                                            <option value="TP. Hồ Chí Minh">TP. Hồ Chí Minh</option>
                                            <option value="Đà Nẵng">Đà Nẵng</option>
                                            <option value="Hải Phòng">Hải Phòng</option>
                                            <option value="Cần Thơ">Cần Thơ</option>
                                            <option value="Huế">Huế</option>
                                            <option value="Quảng Ninh">Quảng Ninh</option>
                                            <option value="Khánh Hòa">Khánh Hòa</option>
                                        </select>
                                    </div>
                                    <div>
                                        <label class="block text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-1.5">Quận / Huyện <span class="text-red-500">*</span></label>
                                        <input type="text" name="billing_district" required placeholder="Ví dụ: Quận Hoàn Kiếm" class="mistory-input">
                                    </div>
                                </div>

                                <div>
                                    <label class="block text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-1.5">Địa chỉ cụ thể (Số nhà, tên đường, phường/xã) <span class="text-red-500">*</span></label>
                                    <input type="text" name="billing_address" required placeholder="Số 123 Đường ABC, Phường XYZ" class="mistory-input">
                                </div>

                                <div>
                                    <label class="block text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-1.5">Ghi chú đơn hàng (Tuỳ chọn)</label>
                                    <textarea name="billing_note" rows="3" placeholder="Ghi chú về thời gian giao hàng, chỉ dẫn địa chỉ..." class="mistory-input"></textarea>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Order Summary Column -->
                    <div class="lg:col-span-5">
                        <div class="mistory-card">
                            <h2 class="font-beauty text-2xl font-medium text-[#522F05] pb-3 mb-4 border-b border-[#F0E4D7]">Đơn hàng của bạn</h2>
                            
                            <div class="mb-5">
                                ${itemsHtml}
                            </div>

                            <div class="space-y-2 text-sm pb-4 mb-4 border-b border-[#F0E4D7]">
                                <div class="flex justify-between text-[#522F05]">
                                    <span>Tạm tính</span>
                                    <span class="font-semibold">${formatVND(subtotal)}</span>
                                </div>
                                ${discount > 0 ? `
                                    <div class="flex justify-between text-green-700">
                                        <span>Giảm giá</span>
                                        <span class="font-semibold">-${formatVND(discount)}</span>
                                    </div>
                                ` : ''}
                                <div class="flex justify-between text-[#522F05]">
                                    <span>Phí giao hàng</span>
                                    <span class="font-semibold">${shippingFee === 0 ? '<span class="text-green-700">Miễn phí</span>' : formatVND(shippingFee)}</span>
                                </div>
                                <div class="flex justify-between items-baseline pt-2 text-[#522F05]">
                                    <span class="font-beauty text-lg">Tổng tiền</span>
                                    <span class="font-bold text-2xl">${formatVND(total)}</span>
                                </div>
                            </div>

                            <!-- Payment Methods -->
                            <h3 class="text-xs font-semibold uppercase tracking-wider text-[#775A38] mb-3">Phương thức thanh toán</h3>
                            <div class="space-y-2 mb-6">
                                <label class="mistory-payment-option active block" id="opt-cod">
                                    <div class="flex items-center gap-3">
                                        <input type="radio" name="payment_method" value="cod" checked class="accent-[#522F05]">
                                        <span class="font-medium text-sm text-[#522F05]">Thanh toán khi nhận hàng (COD)</span>
                                    </div>
                                    <p class="text-xs text-[#775A38] mt-1 pl-6">Thanh toán bằng tiền mặt trực tiếp cho nhân viên giao hàng khi nhận sản phẩm.</p>
                                </label>

                                <label class="mistory-payment-option block" id="opt-bank">
                                    <div class="flex items-center gap-3">
                                        <input type="radio" name="payment_method" value="bank" class="accent-[#522F05]">
                                        <span class="font-medium text-sm text-[#522F05]">Chuyển khoản ngân hàng (VietQR)</span>
                                    </div>
                                    <div class="bank-details hidden text-xs text-[#522F05] mt-2.5 pl-6 bg-[#FAF6F0] p-3 rounded-lg border border-[#ECD4C2]">
                                        <p><strong>Ngân hàng:</strong> Ngân hàng TMCP Quân Đội (MB Bank)</p>
                                        <p><strong>Số tài khoản:</strong> 8888 6666 9999</p>
                                        <p><strong>Chủ tài khoản:</strong> CTY TNHH MISTORY VIETNAM</p>
                                        <p><strong>Nội dung:</strong> [Mã đơn hàng] - SĐT</p>
                                    </div>
                                </label>

                                <label class="mistory-payment-option block" id="opt-card">
                                    <div class="flex items-center gap-3">
                                        <input type="radio" name="payment_method" value="card" class="accent-[#522F05]">
                                        <span class="font-medium text-sm text-[#522F05]">Thẻ tín dụng / Ghi nợ quốc tế (Visa, Mastercard)</span>
                                    </div>
                                </label>
                            </div>

                            <button type="submit" class="mistory-btn-primary w-full text-center py-4 font-bold text-base tracking-wide">
                                Đặt hàng ngay (${formatVND(total)})
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        `;

        // Payment method selector highlighting
        const form = mainContainer.querySelector('#checkout-form');
        form.querySelectorAll('input[name="payment_method"]').forEach(radio => {
            radio.addEventListener('change', function () {
                form.querySelectorAll('.mistory-payment-option').forEach(opt => opt.classList.remove('active'));
                const parent = this.closest('.mistory-payment-option');
                if (parent) parent.classList.add('active');

                const bankDetails = form.querySelector('.bank-details');
                if (bankDetails) {
                    bankDetails.classList.toggle('hidden', this.value !== 'bank');
                }
            });
        });

        // Form submit handler
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const orderCode = 'MS-' + Math.floor(100000 + Math.random() * 900000);
            const name = form.querySelector('input[name="billing_name"]').value;
            const phone = form.querySelector('input[name="billing_phone"]').value;
            const address = form.querySelector('input[name="billing_address"]').value;
            const city = form.querySelector('select[name="billing_city"]').value;
            const payMethod = form.querySelector('input[name="payment_method"]:checked').value;

            // Clear cart
            MistoryCart.clearCart();

            // Success View
            mainContainer.innerHTML = `
                <div class="mistory-card max-w-2xl mx-auto my-12 text-center py-12 px-6">
                    <div class="w-20 h-20 mx-auto mb-5 rounded-full bg-[#EBF7F2] flex items-center justify-center text-[#27A072]">
                        <svg width="42" height="42" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
                            <polyline points="20 6 9 17 4 12"></polyline>
                        </svg>
                    </div>
                    <h1 class="font-beauty text-3xl md:text-4xl text-[#522F05] font-medium mb-3">Đặt hàng thành công!</h1>
                    <p class="text-sm text-[#775A38] mb-6">Cảm ơn quý khách <strong>${name}</strong> đã tin tưởng lựa chọn sản phẩm của Mistory.</p>

                    <div class="bg-[#FAF5EE] rounded-xl p-6 text-left max-w-lg mx-auto mb-8 border border-[#EBD5C1] space-y-2 text-sm text-[#522F05]">
                        <div class="flex justify-between border-b border-[#E8DEC9] pb-2 font-bold">
                            <span>Mã đơn hàng:</span>
                            <span class="text-[#845014]">${orderCode}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Số điện thoại:</span>
                            <span>${phone}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Địa chỉ giao hàng:</span>
                            <span class="text-right">${address}, ${city}</span>
                        </div>
                        <div class="flex justify-between">
                            <span>Phương thức thanh toán:</span>
                            <span>${payMethod === 'cod' ? 'COD (Thanh toán khi nhận hàng)' : payMethod === 'bank' ? 'Chuyển khoản VietQR' : 'Thẻ quốc tế'}</span>
                        </div>
                        <div class="flex justify-between pt-2 border-t border-[#E8DEC9] font-bold text-base">
                            <span>Tổng thanh toán:</span>
                            <span class="text-[#845014]">${formatVND(total)}</span>
                        </div>
                    </div>

                    ${payMethod === 'bank' ? `
                        <div class="bg-white border-2 border-dashed border-[#522F05] rounded-xl p-5 max-w-lg mx-auto mb-8 text-sm text-[#522F05]">
                            <h4 class="font-bold text-base mb-2">Thông tin chuyển khoản:</h4>
                            <p>Ngân hàng: <strong>MB Bank (Chi nhánh Hà Nội)</strong></p>
                            <p>Số tài khoản: <strong style="letter-spacing: 1px;">8888 6666 9999</strong></p>
                            <p>Chủ tài khoản: <strong>CTY TNHH MISTORY VIETNAM</strong></p>
                            <p>Nội dung chuyển khoản: <strong class="text-red-700">${orderCode} ${phone}</strong></p>
                            <p class="text-xs text-[#888] mt-2">Hệ thống sẽ tự động xác nhận đơn ngay khi nhận được thanh toán.</p>
                        </div>
                    ` : ''}

                    <div class="flex items-center justify-center gap-4">
                        <a href="/" class="mistory-btn-primary">Về trang chủ</a>
                        <a href="/cua-hang/" class="mistory-btn-secondary">Tiếp tục mua hàng</a>
                    </div>
                </div>
            `;
        });
    }

    // --- Account Page Interactions ---
    function initAccountPage() {
        const isAccountPage = window.location.pathname.includes('/tai-khoan');
        if (!isAccountPage) return;

        const loginForm = document.querySelector('form.woocommerce-form-login, #form-login form');
        if (loginForm) {
            loginForm.addEventListener('submit', function (e) {
                e.preventDefault();
                const userInput = loginForm.querySelector('input[name="username"]');
                const name = (userInput && userInput.value.trim()) ? userInput.value.trim() : 'Khách hàng Mistory';
                localStorage.setItem('mistory_user', JSON.stringify({ name: name, loggedIn: true }));

                alert(`Đăng nhập thành công! Chào mừng ${name} đến với Mistory.`);
                window.location.reload();
            });
        }

        // Check if user is logged in
        const user = localStorage.getItem('mistory_user');
        if (user) {
            try {
                const u = JSON.parse(user);
                if (u.loggedIn) {
                    const wrap = document.querySelector('#customer_login-form, #customer_login');
                    if (wrap) {
                        wrap.innerHTML = `
                            <div class="mistory-card text-center py-10">
                                <h2 class="font-beauty text-3xl text-[#522F05] mb-2">Xin chào, ${u.name}!</h2>
                                <p class="text-sm text-[#775A38] mb-6">Bạn đang đăng nhập vào tài khoản Mistory.</p>
                                <div class="space-y-3 max-w-sm mx-auto mb-6 text-sm">
                                    <a href="/gio-hang/" class="block p-3 rounded-lg bg-[#FAF5EE] text-[#522F05] hover:bg-[#F0E4D7] font-medium">Giỏ hàng của tôi</a>
                                    <a href="/cua-hang/" class="block p-3 rounded-lg bg-[#FAF5EE] text-[#522F05] hover:bg-[#F0E4D7] font-medium">Lịch sử đơn hàng (0 đơn)</a>
                                </div>
                                <button type="button" id="logout-btn" class="text-xs text-red-600 underline cursor-pointer">Đăng xuất</button>
                            </div>
                        `;
                        document.getElementById('logout-btn').onclick = () => {
                            localStorage.removeItem('mistory_user');
                            window.location.reload();
                        };
                    }
                }
            } catch (e) {}
        }
    }

    // --- Contact & Newsletter Forms ---
    function initContactAndNewsletterForms() {
        document.querySelectorAll('form').forEach(form => {
            // Check if it's contact or subscribe form
            if (form.classList.contains('wpcf7-form') || form.closest('.form-lien-he') || form.closest('.home-2-footer-subscribe')) {
                form.addEventListener('submit', function (e) {
                    e.preventDefault();
                    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
                    const originalText = submitBtn ? (submitBtn.innerText || submitBtn.value) : '';
                    if (submitBtn) {
                        if (submitBtn.tagName === 'INPUT') submitBtn.value = 'Đang gửi...';
                        else submitBtn.innerText = 'Đang gửi...';
                        submitBtn.disabled = true;
                    }

                    setTimeout(() => {
                        if (submitBtn) {
                            if (submitBtn.tagName === 'INPUT') submitBtn.value = originalText;
                            else submitBtn.innerText = originalText;
                            submitBtn.disabled = false;
                        }
                        alert('Cảm ơn bạn đã liên hệ với Mistory! Chúng tôi sẽ phản hồi trong thời gian sớm nhất.');
                        form.reset();
                    }, 600);
                });
            }
        });
    }

})();

