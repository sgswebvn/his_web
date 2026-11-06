with open('tools/page_prod_phan-ma-hong-4in1-vu-khuc-thuy-dinh.html', 'r', encoding='utf-8', errors='ignore') as f:
    text = f.read()

idx = text.find('id="popup-box"')
if idx != -1:
    print("Found id=\"popup-box\" at:", idx)
    print(text[idx:idx+2500])
else:
    print("Not found id=\"popup-box\"")
