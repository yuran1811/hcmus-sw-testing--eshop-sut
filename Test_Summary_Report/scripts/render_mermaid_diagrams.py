import re
import os
import base64
import urllib.request
import urllib.parse
import json

MD_FILE = r"d:\Project\Testing\hcmus-sw-testing--eshop-sut\Test_Summary_Report\23127148_Comprehensive_Test_Summary_Report_HW02_HW05.md"
IMAGES_DIR = r"d:\Project\Testing\hcmus-sw-testing--eshop-sut\Test_Summary_Report\images"

os.makedirs(IMAGES_DIR, exist_ok=True)

with open(MD_FILE, "r", encoding="utf-8") as f:
    content = f.read()

# Pattern for mermaid blocks
pattern = r"```mermaid\n([\s\S]*?)\n```"

diagram_names = [
    "01_testing_scope_breakdown",
    "02_test_execution_status",
    "03_module_defect_distribution",
    "04_defect_severity_breakdown",
    "05_code_coverage_hierarchy",
    "06_testing_methodologies_flow",
    "07_recommendations_action_plan"
]

matches = list(re.finditer(pattern, content))
print(f"Found {len(matches)} mermaid diagrams.")

def get_mermaid_image(code_str, filename):
    # mermaid.ink uses base64 encoded json or direct string
    clean_code = code_str.strip()
    encoded = base64.b64encode(clean_code.encode("utf-8")).decode("ascii")
    url = f"https://mermaid.ink/img/{encoded}?bgColor=!white"
    
    img_path = os.path.join(IMAGES_DIR, f"{filename}.png")
    headers = {"User-Agent": "Mozilla/5.0"}
    req = urllib.request.Request(url, headers=headers)
    try:
        with urllib.request.urlopen(req, timeout=15) as resp, open(img_path, "wb") as out_file:
            out_file.write(resp.read())
        print(f"Saved {img_path} ({os.path.getsize(img_path)} bytes)")
        return True
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
        return False

# Download all images
for i, m in enumerate(matches):
    diag_name = diagram_names[i] if i < len(diagram_names) else f"diagram_{i+1}"
    get_mermaid_image(m.group(1), diag_name)

# Now replace the mermaid blocks in markdown with image tags
new_content = content
for i, m in enumerate(matches):
    diag_name = diagram_names[i] if i < len(diagram_names) else f"diagram_{i+1}"
    img_rel_path = f"images/{diag_name}.png"
    img_tag = f'<div align="center">\n  <img src="{img_rel_path}" alt="{diag_name}" width="650" />\n</div>'
    new_content = new_content.replace(m.group(0), img_tag, 1)

with open(MD_FILE, "w", encoding="utf-8") as f:
    f.write(new_content)

print("Markdown updated with embedded images!")
