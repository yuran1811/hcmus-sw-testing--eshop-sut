import urllib.request
import base64
import os

code = """graph LR
    SC["1. Statement: 92.4%<br/>- Phủ lệnh thực thi<br/>- API: 94.1%, UI: 91.8%"]
    BC["2. Branch: 91.2%<br/>- Phủ 100% nhánh if/else<br/>- Phủ điều kiện Coupon/Role"]
    LC["3. Loop: 94.5%<br/>- Kiểm thử 0, 1, N lần lặp<br/>- Duyệt giỏ & Import CSV"]

    SC --> BC --> LC"""

encoded = base64.b64encode(code.strip().encode('utf-8')).decode('ascii')
url = f"https://mermaid.ink/img/{encoded}?bgColor=!white"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp, open('Test_Summary_Report/images/05_code_coverage_hierarchy.png', 'wb') as f:
    f.write(resp.read())
print('Updated 05_code_coverage_hierarchy.png horizontally:', os.path.getsize('Test_Summary_Report/images/05_code_coverage_hierarchy.png'))
