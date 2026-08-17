import urllib.request
import base64
import os

IMAGES_DIR = r"d:\Project\Testing\hcmus-sw-testing--eshop-sut\Test_Summary_Report\images"
os.makedirs(IMAGES_DIR, exist_ok=True)

diagrams = {
    "01_testing_scope_breakdown": """pie title Phân bổ Phạm vi Kiểm thử (HW02 -> HW05)
    "HW02: Domain Testing (105 TCs)" : 35
    "HW03: GUI & Usability (45 Items / 7 Sessions)" : 20
    "HW04: Automation Testing (56 TCs x 3 Browsers)" : 25
    "HW05: Performance Testing (4 Scenarios / 63k Reqs)" : 20""",

    "02_test_execution_status": """pie title Trạng thái Thực thi Test Cases Toàn diện
    "Passed (Đạt chuẩn - Baseline Valid)" : 260
    "Failed (Bẫy lỗi thành công - SUT Defect)" : 152
    "Blocked (Bị chặn bởi Regex Blocker)" : 7""",

    "03_module_defect_distribution": """pie title Phân bổ 72 Lỗi theo Phân hệ Chức năng
    "Xác thực & Quên MK (FR-01..03)" : 19
    "Thanh toán & Giỏ hàng Mobile (FR-06..20)" : 15
    "Quản lý Đơn hàng & Vòng đời (FR-10..11)" : 13
    "Quản trị User & RBAC (FR-19)" : 12
    "Danh mục & Sản phẩm CSV (FR-04..16)" : 8
    "Hạ tầng & Khóa Ghi CSDL (HW05)" : 5""",

    "04_defect_severity_breakdown": """pie title Phân loại 72 Lỗi theo Mức độ Nghiêm trọng
    "Critical / Blocker (P0)" : 12
    "Major (P1)" : 28
    "Minor (P2)" : 22
    "Trivial / Cosmetic (P3)" : 10""",

    "05_code_coverage_hierarchy": """graph LR
    SC["<b>1. Statement: 92.4%</b><br/>- Phủ lệnh thực thi<br/>- API: 94.1%, UI: 91.8%"]
    BC["<b>2. Branch: 91.2%</b><br/>- Phủ 100% nhánh if/else<br/>- Phủ điều kiện Coupon & Role"]
    LC["<b>3. Loop: 94.5%</b><br/>- Kiểm thử 0, 1, N lần lặp<br/>- Duyệt giỏ & Import CSV"]

    SC --> BC --> LC
    style SC fill:#e8f4fd,stroke:#007799,stroke-width:2px
    style BC fill:#eafaf1,stroke:#27ae60,stroke-width:2px
    style LC fill:#fef9e7,stroke:#f39c12,stroke-width:2px""",

    "06_testing_methodologies_flow": """graph LR
    ST["<b>1. Smoke Test</b><br/>Sanity Check"] --> SIT["<b>2. Integration</b><br/>API & State Machine"]
    SIT --> DT["<b>3. Domain (HW02)</b><br/>EP & 2/3-Point BVA"]
    DT --> UT["<b>4. GUI & Usability (HW03)</b><br/>45 Items / 7 Sessions"]
    UT --> AT["<b>5. Automation (HW04)</b><br/>Playwright 9-Cell"]
    AT --> PT["<b>6. Performance (HW05)</b><br/>JMeter 4 Scenarios"]
    PT --> WB["<b>7. White-box</b><br/>Statement/Branch/Loop"]

    style ST fill:#eef2f7,stroke:#4a5568,stroke-width:1.5px
    style SIT fill:#eef2f7,stroke:#4a5568,stroke-width:1.5px
    style DT fill:#e8f4fd,stroke:#007799,stroke-width:1.5px
    style UT fill:#f5eef8,stroke:#8e44ad,stroke-width:1.5px
    style AT fill:#eafaf1,stroke:#27ae60,stroke-width:1.5px
    style PT fill:#fef9e7,stroke:#f39c12,stroke-width:1.5px
    style WB fill:#ebf5fb,stroke:#2980b9,stroke-width:1.5px""",

    "07_recommendations_action_plan": """graph LR
    R1["<b>1. PostgreSQL 16</b><br/>Row Locking & PgBouncer"] --> R2["<b>2. Server Checkout</b><br/>Authoritative DB Tx"]
    R2 --> R3["<b>3. Strict RBAC</b><br/>requireAdmin & DOMPurify"]
    R3 --> R4["<b>4. Redis Caching</b><br/>Cache Catalog & Products"]
    R4 --> R5["<b>5. CI/CD Gate</b><br/>P95 Guard < 500ms"]

    style R1 fill:#e8f4fd,stroke:#007799,stroke-width:2px
    style R2 fill:#eafaf1,stroke:#27ae60,stroke-width:2px
    style R3 fill:#fdf2e9,stroke:#e67e22,stroke-width:2px
    style R4 fill:#f5eef8,stroke:#8e44ad,stroke-width:2px
    style R5 fill:#e8f8f5,stroke:#1abc9c,stroke-width:2px"""
}

for name, code in diagrams.items():
    encoded = base64.b64encode(code.strip().encode("utf-8")).decode("ascii")
    url = f"https://mermaid.ink/img/{encoded}?bgColor=!white"
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    out_path = os.path.join(IMAGES_DIR, f"{name}.png")
    try:
        with urllib.request.urlopen(req, timeout=15) as resp, open(out_path, "wb") as f:
            f.write(resp.read())
        print(f"Rendered {name}.png ({os.path.getsize(out_path)} bytes)")
    except Exception as e:
        print(f"Error {name}: {e}")

print("All diagrams refreshed successfully!")
