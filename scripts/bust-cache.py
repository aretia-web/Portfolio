#!/usr/bin/env python3
"""Append a content hash (?v=...) to the CSS/JS links in every HTML page.

Run after editing assets/css/styles.css or assets/js/main.js:
    python3 scripts/bust-cache.py
so browsers always download the new version instead of a cached old one.
"""
import hashlib, pathlib, re

root = pathlib.Path(__file__).resolve().parent.parent
assets = ["assets/css/styles.css", "assets/js/main.js"]
pages = [root / "index.html", root / "es" / "index.html", root / "404.html"]

for asset in assets:
    h = hashlib.sha1((root / asset).read_bytes()).hexdigest()[:8]
    name = re.escape(asset)
    for page in pages:
        text = page.read_text(encoding="utf-8")
        new = re.sub(rf'({name})(\?v=[0-9a-f]+)?"', rf'\1?v={h}"', text)
        if new != text:
            page.write_text(new, encoding="utf-8")
    print(f"{asset} -> v={h}")
