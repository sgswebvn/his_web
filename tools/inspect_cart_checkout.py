import re

with open('page_gio-hang.html', 'r', encoding='utf-8', errors='ignore') as f:
    cart_text = f.read()

m = re.search(r'<main[^>]*>(.*?)</main>', cart_text, re.DOTALL)
if m:
    print("Cart main length:", len(m.group(1)))
    print("Cart snippet:", m.group(1)[:1000])

with open('page_checkout.html', 'r', encoding='utf-8', errors='ignore') as f:
    checkout_text = f.read()

m2 = re.search(r'<main[^>]*>(.*?)</main>', checkout_text, re.DOTALL)
if m2:
    print("\nCheckout main length:", len(m2.group(1)))
    print("Checkout snippet:", m2.group(1)[:1000])
