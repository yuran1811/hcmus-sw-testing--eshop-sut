# Báo cáo CI/CD — HW06 API Testing

## Cấu hình pipeline

- Workflow: `.github/workflows/hw06-newman-ci.yml`
- Nhánh: `hw6/23127115-mqtan`
- Trigger: push vào nhánh và chạy thủ công bằng `workflow_dispatch`
- Runtime: Ubuntu, Node.js 22, Newman 6
- SUT chạy bên trong runner và Newman gọi `http://127.0.0.1`, không gọi deployment bên ngoài.
- Header bắt buộc: `X-Student-Id: 23127115` được thêm ở collection-level pre-request script.

Pipeline gồm hai job:

1. `CI smoke contract`: chạy năm request setup/đại diện cho FR04, FR09 và FR17; xuất HTML/JSON artifact.
2. `Full regression - 145 cases`: chạy ba collection data-driven thật. Các lỗi SUT đã biết vẫn được giữ nguyên và report luôn được upload để đánh giá.

## Lần chạy minh chứng 1 — Tất cả smoke test Pass

- Commit: sẽ cập nhật sau khi workflow chạy.
- Actions run: sẽ cập nhật sau khi workflow chạy.
- Kết quả: dự kiến 5/5 assertion Pass.
- Ảnh: `images/github_actions_ci_pass.png`.

## Lần chạy minh chứng 2 — Chính xác một smoke test Fail

- Commit: sẽ cập nhật sau khi workflow chạy.
- Actions run: sẽ cập nhật sau khi workflow chạy.
- Case minh họa: `FR17 - Create coupon contract` đổi expected status từ `200` sang `201`, trong khi SUT hiện trả `200`.
- Kết quả dự kiến: 4 assertion Pass, 1 assertion Fail.
- Ảnh: `images/github_actions_ci_one_failure.png`.

## Nhận xét

Hai run minh họa khả năng pipeline phát hiện regression ở mức assertion. Job full regression vẫn phản ánh trung thực các defect thật và cung cấp report Newman làm artifact; smoke job không thay thế bộ 145 test case.
