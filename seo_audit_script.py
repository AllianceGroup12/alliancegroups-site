import os
import glob
import re
import csv

html_files = glob.glob('*.html') + glob.glob('*/*.html')
html_files = [f for f in html_files if 'node_modules' not in f and 'archive' not in f]

with open('seo_inventory.csv', 'w', newline='', encoding='utf-8') as f:
    writer = csv.writer(f)
    writer.writerow(['File', 'URL', 'Title', 'H1', 'Meta Description', 'Canonical'])
    for file in html_files:
        with open(file, 'r', encoding='utf-8') as hf:
            content = hf.read()
            
            title_m = re.search(r'<title>(.*?)</title>', content, re.IGNORECASE | re.DOTALL)
            title = title_m.group(1).strip() if title_m else 'MISSING'
            
            h1_m = re.search(r'<h1[^>]*>(.*?)</h1>', content, re.IGNORECASE | re.DOTALL)
            h1 = re.sub(r'<[^>]+>', '', h1_m.group(1)).strip() if h1_m else 'MISSING'
            
            desc_m = re.search(r'<meta[^>]*name=["\']description["\'][^>]*content=["\'](.*?)["\']', content, re.IGNORECASE)
            desc = desc_m.group(1).strip() if desc_m else 'MISSING'
            
            can_m = re.search(r'<link[^>]*rel=["\']canonical["\'][^>]*href=["\'](.*?)["\']', content, re.IGNORECASE)
            canonical = can_m.group(1).strip() if can_m else 'MISSING'
            
            url = f"https://www.alliancegroups.com.au/{file.split('/')[-1]}"
            writer.writerow([file, url, title, h1, desc, canonical])

print("SEO Inventory Generated: seo_inventory.csv")
