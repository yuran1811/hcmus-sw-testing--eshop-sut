# Báo cáo CI/CD — HW06 API Testing

## Cấu hình pipeline

- Workflow: `HW06 API Testing - Newman CI (23127115)` tại `.github/workflows/hw06-newman-ci.yml`
- Nhánh: `hw6/23127115-mqtan`
- Trigger: push vào nhánh và chạy thủ công bằng `workflow_dispatch`
- Runtime: Ubuntu, Node.js 22, Newman 6
- SUT chạy bên trong runner và Newman gọi `http://127.0.0.1`, không gọi deployment bên ngoài.
- Header bắt buộc: `X-Student-Id: 23127115` được thêm ở collection-level pre-request script.

Pipeline gồm hai job:

1. `API Smoke Tests - FR04, FR09, FR17`: chạy năm request setup/đại diện cho FR04, FR09 và FR17; xuất HTML/JSON artifact.
2. `Full API Regression - 145 Test Cases`: chạy ba collection data-driven thật. Các lỗi SUT đã biết vẫn được giữ nguyên và report luôn được upload để đánh giá.

## Lần chạy minh chứng 1 — Tất cả smoke test Pass

- Commit: [`8e7a99e`](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/commit/8e7a99ec5eb02a7133d5a8fca5e34db70c7ee164).
- Actions run: [Pass — Success](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32650809959).
- Kết quả thực tế: 5 request, 5/5 assertion Pass; cả hai job hoàn tất và tạo 2 artifacts.
- Ảnh: `images/github_actions_ci_pass.png`.

## Lần chạy minh chứng 2 — Chính xác một smoke test Fail

- Commit: [`ab9aa7e`](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/commit/ab9aa7e1832f3316b6860c7e2863bacec5ad9299).
- Actions run: [Một assertion Fail — Failure](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32650917696).
- Case minh họa: `FR17 - Create coupon contract` đổi expected status từ `200` sang `201`, trong khi SUT hiện trả `200`.
- Kết quả thực tế: 5 request, 4 assertion Pass, đúng 1 assertion Fail. Log Newman ghi `expected response to have status code 201 but got 200`.
- Ảnh: `images/github_actions_ci_one_failure.png`.

## Nhận xét

Hai run minh họa khả năng pipeline phát hiện regression ở mức assertion. Sau run minh họa, oracle FR17 được phục hồi về `200` để nhánh tiếp tục xanh. Job full regression vẫn phản ánh trung thực các defect thật và cung cấp report Newman làm artifact; smoke job không thay thế bộ 145 test case.

Run xác nhận sau khi phục hồi oracle: commit [`0f37908`](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/commit/0f37908c948712c5b8bba81be13bc78e7d22be90), [Actions — Success](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32650992078). Không cần ảnh riêng vì ảnh Pass đã thể hiện đầy đủ trạng thái pipeline thành công.
