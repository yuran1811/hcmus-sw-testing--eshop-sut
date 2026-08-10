#!/usr/bin/env bash
# scaffold_playwright_project.sh
#
# Khởi tạo cấu trúc thư mục + playwright.config.ts mẫu cho quy trình automation
# của HW04 (data-driven, đa trình duyệt, report gắn Run by / timestamp).
#
# Cách dùng:
#   ./scaffold_playwright_project.sh <ten-thu-muc-du-an> <StudentID>
#
# Ví dụ:
#   ./scaffold_playwright_project.sh eshop-automation 25127001

set -euo pipefail

PROJECT_DIR="${1:?Thiếu tên thư mục dự án. Cách dùng: ./scaffold_playwright_project.sh <ten-du-an> <StudentID>}"
STUDENT_ID="${2:?Thiếu StudentID. Cách dùng: ./scaffold_playwright_project.sh <ten-du-an> <StudentID>}"

mkdir -p "$PROJECT_DIR"/{pages,tests/auth,tests/cart,tests/admin,data,utils,bugs}
cd "$PROJECT_DIR"

if [ ! -f package.json ]; then
  npm init -y >/dev/null
fi

npm install -D @playwright/test csv-parse >/dev/null 2>&1 || true

cat > playwright.config.ts <<EOF
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  retries: 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
  ],
  metadata: {
    'Run by': '${STUDENT_ID}',
    'Run at': new Date().toISOString(),
    'SUT': 'EShop e-commerce demo',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
  ],
  use: {
    screenshot: 'only-on-failure',
    trace: 'retain-on-failure',
  },
});
EOF

cat > utils/readCsv.ts <<'EOF'
import fs from 'fs';
import { parse } from 'csv-parse/sync';

export function readCsv<T = Record<string, string>>(path: string): T[] {
  const content = fs.readFileSync(path, 'utf-8');
  return parse(content, { columns: true, skip_empty_lines: true });
}
EOF

cat > README.md <<EOF
# EShop Automation — HW04

Run by: ${STUDENT_ID}

## Cách chạy
\`\`\`bash
npx playwright test              # chạy toàn bộ 3 trình duyệt
npx playwright show-report       # mở báo cáo HTML
\`\`\`

## Tóm tắt test (điền sau khi chạy xong)
- Số tính năng:
- Số test case tự động hóa / đã chạy / đạt / không đạt:
- Số lượt chạy trình duyệt:
- Số bug:
- Link video demo:
EOF

echo "Đã khởi tạo dự án tại: $(pwd)"
echo "Bước tiếp theo: dùng AI để tạo Page Object trong pages/, viết test trong tests/, dữ liệu trong data/"
