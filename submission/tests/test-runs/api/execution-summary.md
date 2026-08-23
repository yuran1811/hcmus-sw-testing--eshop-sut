# Tóm tắt thực thi API — Full run 2026-08-22

## Kết quả

| API                            | Test case |   Pass |    Fail | Assertion fail | Newman HTML                                                         |
| ------------------------------ | --------: | -----: | ------: | -------------: | ------------------------------------------------------------------- |
| FR04 `PUT /api/users/me`       |        51 |      0 |      51 |            168 | `reports/FR04_PUT_api_users_me_2026-08-22T16-07-51-183Z.html`       |
| FR09 `POST /api/apply-coupon`  |        46 |     20 |      26 |             70 | `reports/FR09_POST_api_apply_coupon_2026-08-22T16-08-24-818Z.html`  |
| FR17 `POST /api/admin/coupons` |        48 |      2 |      46 |            147 | `reports/FR17_POST_api_admin_coupons_2026-08-22T16-08-46-471Z.html` |
| **Tổng**                       |   **145** | **22** | **123** |        **385** |                                                                     |

Mọi request trong collection đều chạy qua collection-level pre-request script và log `X-Student-Id: 23127115`. SUT chạy tại `http://127.0.0.1:3100`; fixture chạy tại `http://127.0.0.1:3001`. Các HTML/JSON và `_results.json` là output nguyên bản của Newman.

## Bằng chứng hình ảnh

- `images/FR04_newman_summary_view.png`, `FR09_newman_summary_view.png`, `FR17_newman_summary_view.png`: summary rõ số iteration/assertion/failure.
- `images/FR04_failed_tests_detail.png`, `FR09_failed_tests_detail.png`, `FR17_failed_tests_detail.png`: chi tiết failure hiển thị trực tiếp từ report.
- Ba file `*_newman_full_report.png`: ảnh toàn bộ báo cáo.

## Phân tích failure

385 assertion failure được phân tích và gom theo nguyên nhân gốc thành 17 bug report: 5 bug FR04, 7 bug FR09 và 5 bug FR17 tại `submission/tests/bug-reports/api/` (Issues #330–#346; Issue #347 đã đóng do false positive). Một test case Fail khi có ít nhất một assertion sai; vì vậy assertion fail không được dùng làm số lượng bug.

## Postman MCP

- User xác thực: `machquoctan2005`.
- Personal workspace: `HW06 API Testing - 23127115` — `9a939122-dbbc-4d6d-ab27-ebc1fdd42e23`.
- Collection cloud: `HW06 EShop API Evidence - 23127115` — `57640965-415351b4-2fe4-42a5-a9ae-1f81bb29711b`.
- Environment cloud: `HW06 Local - 23127115` — `57640965-8e75e2df-6507-4621-b555-e80ebc224bef`.
- Mock server đã tạo thành công: `HW06 Coupon Mock - 23127115`, UID `57640965-6b698f55-8127-4695-9baa-88c698819703`.
- Environment dành cho cloud monitor: `HW06 Mock Monitor - 23127115` — `57640965-6a4798bb-2eef-4e9e-af83-927e3bde60ef`.
- Monitor đã tạo và bật lịch: `HW06 Mock API Monitor - 23127115` — `57640965-1f19e4bc-32df-41e0-9c5a-fc4f81cec9eb`, cron `0 8 * * *`, múi giờ `Asia/Ho_Chi_Minh`.
- Lần chạy monitor thành công mới nhất: job `1f19e511-2326-4c30-b076-d25299cfd14a`, HTTP 200, 1 request, 1 assertion, 0 failure, thời gian phản hồi 209 ms. Monitor dùng Mock Server công khai vì Postman Cloud không thể phân giải `127.0.0.1` của máy local.

## Bằng chứng chống gian lận đã hoàn thành

- `images/postman_console_student_id.png`: Postman Console của lần chạy thật, có dòng `[X-Student-Id] Header set = 23127115` và request gọi SUT local.
- `images/github_api_bug_issues_01.png`, `images/github_api_bug_issues_02.png`: các GitHub Issues thật trên repository, bao phủ Issues #330–#346.

Ảnh Postman Console là bằng chứng header bắt buộc; ảnh Newman/Playwright chỉ bổ sung bằng chứng kết quả thực thi và không thay thế ảnh console này.
