import urllib.request
import base64
import os

code = """graph TD
    subgraph Frontend ["Frontend Clients (React / Vite / Expo)"]
        CustomerWeb["Storefront Web (:5173)<br/>Catalog, Cart, Checkout, Profile, History"]
        AdminWeb["Admin Portal (:5174)<br/>Orders, Users, Categories, CSV, Coupons"]
        MobileApp["Mobile / Expo Client<br/>Mobile Cart, Mobile Checkout, History"]
    end

    subgraph Backend ["Backend Service (Node.js / Express :3000 / :3001)"]
        AuthModule["1. Auth & Accounts (FR-01..03, 19)"]
        CatalogModule["2. Catalog & Products (FR-04..06, 14..16)"]
        CartCouponModule["3. Cart & Coupons (FR-07, 09, 17, 20..22)"]
        OrderModule["4. Orders & Checkout (FR-08, 10, 11, 18)"]
        AdminReportModule["5. Admin Reporting (FR-12, 13)"]
    end

    subgraph Storage ["Storage Layer"]
        SQLiteDB[("SQLite Database (WAL Mode)<br/>users, products, carts, orders, coupons")]
    end

    Frontend --> Backend
    AuthModule --> SQLiteDB
    CatalogModule --> SQLiteDB
    CartCouponModule --> SQLiteDB
    OrderModule --> SQLiteDB
    AdminReportModule --> SQLiteDB

    style CustomerWeb fill:#e8f4fd,stroke:#007799,stroke-width:1.5px
    style AdminWeb fill:#fef9e7,stroke:#f39c12,stroke-width:1.5px
    style MobileApp fill:#f5eef8,stroke:#8e44ad,stroke-width:1.5px
    style SQLiteDB fill:#eafaf1,stroke:#27ae60,stroke-width:2px"""

encoded = base64.b64encode(code.strip().encode('utf-8')).decode('ascii')
url = f"https://mermaid.ink/img/{encoded}?bgColor=!white"
req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
os.makedirs('Test_Summary_Report/images', exist_ok=True)
out_path = 'Test_Summary_Report/images/00_group_architecture_overview.png'
with urllib.request.urlopen(req) as resp, open(out_path, 'wb') as f:
    f.write(resp.read())
print('Saved architecture overview:', os.path.getsize(out_path))
