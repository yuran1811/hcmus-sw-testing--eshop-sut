# Multi-Browser & HTML Report

## Yêu cầu cần thoả

- 3 trình duyệt: chromium / firefox / webkit (hoặc chrome / edge / firefox)
- Mỗi tính năng chạy đủ 3 → tối thiểu 9 lượt chạy toàn suite
- HTML report hiển thị **`Run by: {StudentID}`** kèm **ISO timestamp**

Ràng buộc "Run by" là điều khoản chống gian lận — TA mở report ra kiểm trực tiếp. Nếu chuỗi này không hiện, coi như không có bằng chứng thực thi.

## Ba cách gắn "Run by", theo thứ tự ưu tiên

### Cách 1 — Custom reporter (hiện rõ nhất, khuyến nghị)

Ghi trực tiếp vào file HTML sau khi report được sinh, nên chắc chắn hiển thị:

`reporters/stamp-reporter.ts`
```typescript
import type { Reporter } from '@playwright/test/reporter';
import fs from 'fs';
import path from 'path';

const STUDENT_ID = process.env.STUDENT_ID ?? 'UNKNOWN';

export default class StampReporter implements Reporter {
  private startedAt = new Date().toISOString();

  onEnd() {
    const file = path.join('playwright-report', 'index.html');
    if (!fs.existsSync(file)) return;

    const banner = `<div style="padding:12px 16px;background:#111;color:#fff;
      font-family:monospace;font-size:14px">
      Run by: ${STUDENT_ID} &nbsp;|&nbsp; Started: ${this.startedAt}
      </div>`;

    const html = fs.readFileSync(file, 'utf-8')
      .replace('<body>', `<body>${banner}`);
    fs.writeFileSync(file, html);
  }
}
```

Đăng ký trong config: `reporter: [['html'], ['./reporters/stamp-reporter.ts']]`

### Cách 2 — Metadata trong config (đơn giản nhất)

```typescript
metadata: {
  'Run by': process.env.STUDENT_ID ?? '23127xxx',
  'Started at': new Date().toISOString(),
},
```

Metadata hiện ở phần đầu report Playwright. Nhược điểm: tuỳ phiên bản Playwright, chỗ hiển thị có thể kín đáo — nên **kiểm tra bằng mắt** sau khi sinh report, đừng giả định là có.

### Cách 3 — Test annotation (bổ sung, không thay thế)

```typescript
test.beforeEach(async ({}, testInfo) => {
  testInfo.annotations.push({
    type: 'Run by',
    description: `${process.env.STUDENT_ID} @ ${new Date().toISOString()}`,
  });
});
```

Hiện trong chi tiết từng test. Dùng kèm cách 1 hoặc 2 để có dấu vết ở cả hai cấp.

**Khuyến nghị**: dùng cách 1 + cách 3. Sau khi chạy, mở `playwright-report/index.html` xác nhận chuỗi hiện đúng trước khi quay video demo.

## Cấu hình project 3 trình duyệt

```typescript
projects: [
  { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  { name: 'firefox',  use: { ...devices['Desktop Firefox'] } },
  { name: 'webkit',   use: { ...devices['Desktop Safari'] } },
],
```

Chạy toàn bộ 3 trình duyệt (mặc định khi không truyền `--project`):
```bash
STUDENT_ID=23127xxx npx playwright test
```

Chạy riêng một trình duyệt để debug:
```bash
STUDENT_ID=23127xxx npx playwright test --project=firefox
```

Chạy một tính năng trên cả 3:
```bash
STUDENT_ID=23127xxx npx playwright test tests/login.spec.ts
```

## Bẫy thường gặp khi chạy đa trình duyệt

**WebKit trên Linux thiếu thư viện hệ thống.** Cài trước khi chạy:
```bash
npx playwright install --with-deps webkit
```

**Test pass ở chromium nhưng fail ở webkit/firefox.** Ba nguyên nhân phổ biến:

1. *Selector phụ thuộc cách render riêng của Chromium* — sửa bằng cách chuyển sang `getByRole`/`getByLabel`.
2. *Khác biệt tốc độ render* — nếu đã dùng web-first assertion thì hiếm gặp; nếu vẫn xảy ra, tăng `expect.timeout` chứ đừng thêm `waitForTimeout`.
3. *Khác biệt hành vi thật của trình duyệt* (định dạng ngày, validation của input type=date) — **đây có thể là bug thật đáng báo cáo**, đừng vội sửa script để "cho pass".

Điểm số 3 đáng lưu ý: cross-browser bug là loại bug mà chỉ automation mới phát hiện được ở quy mô này. Nếu tìm ra một cái, nó là nguyên liệu tốt cho cả bug report lẫn phần phân tích.

**Chạy song song gây xung đột dữ liệu.** Nếu các test dùng chung một tài khoản và sửa đổi trạng thái của nó, chạy song song sẽ chồng chéo. Hai hướng xử lý:
- Mỗi ca dùng dữ liệu riêng (email có hậu tố ngẫu nhiên) — ưu tiên hướng này
- Hoặc `fullyParallel: false` + `workers: 1` — chậm hơn nhưng chắc chắn

## Cấu hình khi chạy lấy bằng chứng cuối

```typescript
retries: 0,              // không che giấu flaky
screenshot: 'only-on-failure',
video: 'retain-on-failure',
trace: 'retain-on-failure',
```

Screenshot khi fail chính là ảnh đính kèm GitHub Issue mà đề bài yêu cầu — không cần chụp màn hình thủ công. Trace file mở bằng `npx playwright show-trace` giúp xác định lỗi script hay bug thật, rất hữu ích cho Phase 4.
