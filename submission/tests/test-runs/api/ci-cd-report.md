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

- Commit: [`0fc1f65`](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/commit/0fc1f65f42bf8e0642b577318dfe7d6ed76d2907).
- Actions run: [run #1 — Success](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32649778557).
- Kết quả thực tế: 5 request, 5/5 assertion Pass; cả hai job hoàn tất và tạo 2 artifacts.
- Ảnh: `images/github_actions_ci_pass.png`.

## Lần chạy minh chứng 2 — Chính xác một smoke test Fail

- Commit: [`dcb00a3`](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/commit/dcb00a329f49de40a487d46be4f08f8d3904054c).
- Actions run: [run #2 — Failure](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32649895190).
- Case minh họa: `FR17 - Create coupon contract` đổi expected status từ `200` sang `201`, trong khi SUT hiện trả `200`.
- Kết quả thực tế: 5 request, 4 assertion Pass, đúng 1 assertion Fail. Log Newman ghi `expected response to have status code 201 but got 200`.
- Ảnh: `images/github_actions_ci_one_failure.png`.

## Nhận xét

Hai run minh họa khả năng pipeline phát hiện regression ở mức assertion. Sau run minh họa, oracle FR17 được phục hồi về `200` để nhánh tiếp tục xanh. Job full regression vẫn phản ánh trung thực các defect thật và cung cấp report Newman làm artifact; smoke job không thay thế bộ 145 test case.
