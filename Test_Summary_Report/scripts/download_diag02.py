import urllib.request
import base64
import os

code = """pie title Phân bổ Trạng thái Thực thi Test Cases
    "Passed (Đạt chuẩn - Baseline Valid)" : 326
    "Failed (Bẫy lỗi - SUT Defect)" : 75
    "Blocked (Bị chặn bởi Blocker)" : 7"""

encoded = base64.b64encode(code.strip().encode('utf-8')).decode('ascii')
url = f"https://mermaid.ink/img/{encoded}?bgColor=!white"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
with urllib.request.urlopen(req) as resp, open('Test_Summary_Report/images/02_test_execution_status.png', 'wb') as f:
    f.write(resp.read())
print('Saved 02_test_execution_status.png successfully:', os.path.getsize('Test_Summary_Report/images/02_test_execution_status.png'))
