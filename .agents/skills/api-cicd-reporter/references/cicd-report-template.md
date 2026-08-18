# CI/CD Report — <StudentID> HW06

> Khung điền sẵn. Thay mọi chỗ `<...>` bằng nội dung thật. Xoá phần hướng dẫn in nghiêng sau khi điền.

## 1. Tổng quan pipeline

| Mục | Nội dung |
|---|---|
| Repository | `<link repo công khai>` |
| File workflow | `.github/workflows/api-tests.yml` |
| Trigger | push (main, develop), pull_request, workflow_dispatch |
| Runner | ubuntu-latest |
| Thời gian chạy trung bình | `<x phút y giây>` |
| Công cụ | Newman `<version>`, newman-reporter-htmlextra |

## 2. Cấu hình pipeline

*Dán đoạn YAML chính (không cần cả file, chỉ các bước quan trọng) và giải thích từng nhóm bước.*

| Bước | Mục đích |
|---|---|
| Checkout | Lấy code SUT và collection |
| Setup Node | Môi trường chạy SUT và Newman |
| Install + Seed | Cài dependency, nạp dữ liệu test cố định để kết quả tái lập được |
| Start SUT (background) | Dựng SUT tại `localhost:3000` ngay trong job |
| Wait for healthy | Vòng lặp curl 30s, tránh Newman chạy khi SUT chưa sẵn sàng |
| Run Newman | Chạy collection + environment CI |
| Upload artifact | Lưu report HTML/JSON, `if: always()` để giữ cả khi có test fail |

### Quyết định thiết kế

*2–4 gạch đầu dòng, mỗi cái nêu lựa chọn + lý do. Gợi ý:*

- **Dựng SUT trong job thay vì trỏ tới server ngoài** — nếu trỏ ra ngoài, khi test fail không phân biệt được lỗi nghiệp vụ hay lỗi mạng, và bằng chứng "one failing test" mất giá trị.
- **Seed database cố định trước mỗi run** — các case phụ thuộc dữ liệu (IDOR cần 2 user, state transition cần đơn ở trạng thái pending) chỉ tái lập được khi dữ liệu đầu vào xác định.
- **`if: always()` ở bước upload artifact** — không có nó thì run fail sẽ mất luôn report, đúng lúc report cần nhất.
- **Student ID truyền qua GitHub Secrets** — `<lý do của bạn>`.

## 3. Run A — tất cả test pass

| Mục | Nội dung |
|---|---|
| Commit | `<hash>` — `<commit message>` |
| Link run | `<url github actions run>` |
| Kết quả | `<n>` requests, `<n>` assertions, 0 failed |
| Thời gian | `<x>s` |
| Artifact | `<link>` |

**Screenshot:** `screenshots/ci-run-pass.png`

*Nếu có case bị loại khỏi run này vì SUT có bug thật, nói rõ ở đây: case nào, bug nào, link tới GitHub Issue tương ứng.*

## 4. Run B — một test fail có chủ đích

| Mục | Nội dung |
|---|---|
| Commit | `<hash>` — `<commit message>` |
| Link run | `<url>` |
| Cách tạo lỗi | `<sửa assertion / sửa code SUT>` — mô tả cụ thể thay đổi gì |
| Test fail | `<TC_ID + tên test>` |
| Kết quả | `<n>` assertions, 1 failed |

**Đoạn log lỗi:**

```
<dán đoạn output Newman chỉ ra assertion fail, expected vs actual>
```

**Screenshot:** `screenshots/ci-run-fail.png`

*Giải thích ngắn: pipeline đã chặn đúng thứ cần chặn — job trả exit code khác 0, PR không merge được.*

## 5. Git commit log

*Trích các commit tương ứng từng bước của quy trình (generation, audit, extension, execution, CI). File đầy đủ: `git-commit-log.txt`.*

```
<hash> | <date> | feat(api1): generate 38 test cases for login endpoint
<hash> | <date> | chore(api1): audit test cases - 5 invalid, 7 incomplete corrected
<hash> | <date> | feat(api1): add 6 human-designed cases (IDOR, lockout bypass)
<hash> | <date> | test(api1): postman collection + newman run
<hash> | <date> | ci: add newman pipeline
<hash> | <date> | ci: demo run with one intentionally failing test
```

## 6. Nhận xét — pipeline này bắt được gì, không bắt được gì

*Mục ghi điểm. Viết thật, dựa trên những gì quan sát được.*

**Bắt được:**
- Regression chức năng: đổi logic validate → test DP fail ngay ở PR
- Sai lệch schema: thêm/xoá field trong response → nhóm `Contract:` fail
- Lỗi phân quyền cơ bản: `<...>`

**Không bắt được:**
- Race condition / lỗi đồng thời — Newman chạy tuần tự, không tạo được tải song song
- Suy giảm hiệu năng — chỉ assert response time từng request, không có ngưỡng p95 trên tải thật
- Lỗi phụ thuộc dữ liệu production — pipeline chạy trên seed data sạch
- `<bổ sung của bạn>`

**Cải tiến nếu có thêm thời gian:**
- `<vd: thêm job k6 chạy smoke load test sau khi Newman pass>`
- `<vd: chạy ma trận nhiều Node version / nhiều môi trường>`
