"""
JPG/PNG rasmlarning yengil WebP nusxasini yasaydi (sayt shu nusxalarni ishlatadi).

Ishga tushirish:  python tools/webp.py
Faqat hali .webp nusxasi yo'q rasmlarni o'giradi; asl fayllar o'z joyida qoladi.
Talab: Pillow (pip install pillow).
"""
import os
import sys

from PIL import Image

ROOT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'public', 'images')
FOLDERS = {'portfolio': 80, os.path.join('portfolio', 'thumbs'): 78, 'dizayn': 80}

made = 0
for folder, quality in FOLDERS.items():
    path = os.path.join(ROOT, folder)
    for name in sorted(os.listdir(path)):
        base, ext = os.path.splitext(name)
        if ext.lower() not in ('.jpg', '.jpeg', '.png'):
            continue
        target = os.path.join(path, base + '.webp')
        if os.path.exists(target):
            continue
        with Image.open(os.path.join(path, name)) as im:
            im.convert('RGB').save(target, 'WEBP', quality=quality, method=6)
        made += 1
        print('  ' + os.path.join(folder, base + '.webp'))

print(f'{made} ta WebP yasaldi')
sys.exit(0)
