# Báo cáo CI/CD — HW06

## 1. Cấu hình pipeline
- File workflow: `.github/workflows/newman-ci.yml`
- Trigger: push vào `main`, pull request vào `main`, và chạy thủ công (`workflow_dispatch`)
- Các bước chính: checkout → cài Node.js → khởi động SUT → cài Newman → chạy `newman run` với collection + environment → upload báo cáo HTML làm artifact

## 2. Lần chạy #1 — Toàn bộ test PASS
- Commit: `<commit hash>` — `<commit message>`
- Link Actions run: `<link>`
- Ảnh chụp màn hình: `<đính kèm ảnh>`
- Kết quả: `<số test pass>/<tổng số test>` pass

## 3. Lần chạy #2 — Có 1 test FAIL
- Commit: `<commit hash>` — `<commit message>`
- Link Actions run: `<link>`
- Ảnh chụp màn hình: `<đính kèm ảnh>`
- Test case fail: `<Test_ID>` — Nguyên nhân: `<mô tả ngắn: cố ý thay đổi expected result để minh họa / bug thật chưa fix>`

## 4. Nhận xét
<Ngắn gọn: pipeline có phát hiện đúng lỗi không, thời gian chạy, độ ổn định>
