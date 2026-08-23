# Test run: FR17 — POST /api/admin/coupons

- **Ngày chạy:** 2026-08-22
- **Requirement:** FR-17 — Quản lý mã giảm giá
- **Đặc tả:** Mục 6.4 trong `api_specification.md`
- **Tester:** Mạch Quốc Tấn
- **Kết quả:** 2 Pass, 46 Fail / 48 test case
- **Môi trường:** Newman, Node.js 22.20.0, Windows, `http://127.0.0.1:3100`, `X-Student-Id: 23127115`

## Kết quả chi tiết

| Test Case ID           | Result | Related Bug                              | Ghi chú                                                                                                                                         |
| ---------------------- | ------ | ---------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------- |
| FR17-ADMINCOUP-DP-001  | Fail   | BUG-ADMINCOUPON-003                      | Tạo coupon percent hợp lệ — Tạo thành công trả 200 thay vì 201.                                                                                 |
| FR17-ADMINCOUP-DP-002  | Fail   | BUG-ADMINCOUPON-003                      | Tạo coupon fixed hợp lệ — Tạo thành công trả 200 thay vì 201.                                                                                   |
| FR17-ADMINCOUP-DP-003  | Fail   | BUG-ADMINCOUPON-002                      | Thiếu code — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ.                                                                             |
| FR17-ADMINCOUP-DP-004  | Fail   | BUG-ADMINCOUPON-002                      | Code rỗng — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                                   |
| FR17-ADMINCOUP-DP-005  | Fail   | BUG-ADMINCOUPON-002                      | Code chỉ khoảng trắng — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                       |
| FR17-ADMINCOUP-DP-006  | Fail   | BUG-ADMINCOUPON-004                      | Code trùng — Xung đột trạng thái trả sai status; Response lộ chi tiết nội bộ.                                                                   |
| FR17-ADMINCOUP-DP-007  | Fail   | BUG-ADMINCOUPON-002                      | Code dài — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                                    |
| FR17-ADMINCOUP-DP-008  | Fail   | BUG-ADMINCOUPON-002                      | Code chứa ký tự đặc biệt — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                    |
| FR17-ADMINCOUP-DP-009  | Fail   | BUG-ADMINCOUPON-002                      | Thiếu type — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                                  |
| FR17-ADMINCOUP-DP-010  | Fail   | BUG-ADMINCOUPON-002                      | Type ngoài enum — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                             |
| FR17-ADMINCOUP-DP-011  | Fail   | BUG-ADMINCOUPON-002                      | Type sai chữ hoa/thường — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                     |
| FR17-ADMINCOUP-DP-012  | Fail   | BUG-ADMINCOUPON-002                      | discount_value bằng 0 — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                       |
| FR17-ADMINCOUP-DP-013  | Fail   | BUG-ADMINCOUPON-002                      | discount_value âm — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                           |
| FR17-ADMINCOUP-DP-014  | Fail   | BUG-ADMINCOUPON-002                      | discount_value là chuỗi — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                     |
| FR17-ADMINCOUP-DP-015  | Fail   | BUG-ADMINCOUPON-003                      | Percent 100% — Tạo thành công trả 200 thay vì 201.                                                                                              |
| FR17-ADMINCOUP-DP-016  | Fail   | BUG-ADMINCOUPON-002                      | Percent lớn hơn 100% — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                        |
| FR17-ADMINCOUP-DP-017  | Fail   | BUG-ADMINCOUPON-003                      | min_order_amount bằng 0 — Tạo thành công trả 200 thay vì 201.                                                                                   |
| FR17-ADMINCOUP-DP-018  | Fail   | BUG-ADMINCOUPON-002                      | min_order_amount âm — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                         |
| FR17-ADMINCOUP-DP-019  | Fail   | BUG-ADMINCOUPON-002                      | Thiếu min_order_amount — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                      |
| FR17-ADMINCOUP-DP-020  | Fail   | BUG-ADMINCOUPON-002                      | Thiếu expired_at — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                            |
| FR17-ADMINCOUP-DP-021  | Fail   | BUG-ADMINCOUPON-002                      | expired_at sai định dạng — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                    |
| FR17-ADMINCOUP-DP-022  | Fail   | BUG-ADMINCOUPON-002                      | expired_at là ngày không tồn tại — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                            |
| FR17-ADMINCOUP-DP-023  | Fail   | BUG-ADMINCOUPON-002                      | max_uses_per_user bằng 0 — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                    |
| FR17-ADMINCOUP-DP-024  | Fail   | BUG-ADMINCOUPON-002                      | max_uses_per_user âm — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                        |
| FR17-ADMINCOUP-DP-025  | Fail   | BUG-ADMINCOUPON-002                      | max_uses_per_user là chuỗi — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                                  |
| FR17-ADMINCOUP-SC-001  | Fail   | BUG-ADMINCOUPON-003                      | Schema response tạo thành công — Tạo thành công trả 200 thay vì 201.                                                                            |
| FR17-ADMINCOUP-SC-002  | Fail   | BUG-ADMINCOUPON-002                      | Schema lỗi thiếu field — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; Schema response không đúng.          |
| FR17-ADMINCOUP-SC-003  | Fail   | BUG-ADMINCOUPON-001                      | Schema lỗi 403 — User thường vẫn tạo được coupon admin; Hậu trạng thái không đúng; Schema response không đúng.                                  |
| FR17-ADMINCOUP-SC-004  | Pass   | —                                        | Schema lỗi 401 — Đạt status, schema và hậu trạng thái mong đợi.                                                                                 |
| FR17-ADMINCOUP-SC-005  | Fail   | BUG-ADMINCOUPON-004                      | Schema lỗi code trùng — Xung đột trạng thái trả sai status; Response lộ chi tiết nội bộ.                                                        |
| FR17-ADMINCOUP-SC-006  | Fail   | BUG-ADMINCOUPON-002                      | Schema lỗi enum type — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; Schema response không đúng.            |
| FR17-ADMINCOUP-SEC-001 | Pass   | —                                        | Thiếu JWT với API admin — Đạt status, schema và hậu trạng thái mong đợi.                                                                        |
| FR17-ADMINCOUP-SEC-002 | Fail   | BUG-ADMINCOUPON-001                      | User thường gọi API admin — User thường vẫn tạo được coupon admin; Hậu trạng thái không đúng.                                                   |
| FR17-ADMINCOUP-SEC-003 | Fail   | BUG-ADMINCOUPON-005                      | JWT bị chỉnh sửa — Token không hợp lệ trả sai status xác thực.                                                                                  |
| FR17-ADMINCOUP-SEC-004 | Fail   | BUG-ADMINCOUPON-002                      | SQL injection trong code khi tạo coupon — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                     |
| FR17-ADMINCOUP-SEC-005 | Fail   | BUG-ADMINCOUPON-002                      | XSS payload trong code coupon — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                               |
| FR17-ADMINCOUP-SEC-006 | Fail   | BUG-ADMINCOUPON-001                      | Mass assignment nâng quyền qua body — User thường vẫn tạo được coupon admin; Hậu trạng thái không đúng.                                         |
| FR17-ADMINCOUP-SEC-007 | Fail   | BUG-ADMINCOUPON-002                      | Prototype pollution và field ngoài allow-list — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.               |
| FR17-ADMINCOUP-SEC-008 | Fail   | BUG-ADMINCOUPON-004                      | Race condition khi tạo trùng code — Response lộ chi tiết nội bộ; Chuỗi state/concurrency không đạt oracle.                                      |
| FR17-ADMINCOUP-SEC-009 | Fail   | BUG-ADMINCOUPON-002                      | Giả mạo danh tính admin qua body — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                            |
| FR17-ADMINCOUP-ST-001  | Fail   | BUG-ADMINCOUPON-003                      | Tạo xong thì xuất hiện trong danh sách — Tạo thành công trả 200 thay vì 201.                                                                    |
| FR17-ADMINCOUP-ST-002  | Fail   | BUG-ADMINCOUPON-003, BUG-ADMINCOUPON-004 | Không cho tạo trùng sau khi đã tạo — Tạo thành công trả 200 thay vì 201; Response lộ chi tiết nội bộ; Chuỗi state/concurrency không đạt oracle. |
| FR17-ADMINCOUP-ST-003  | Fail   | BUG-ADMINCOUPON-003, BUG-APPLYCOUPON-002 | Coupon mới tạo có thể được áp dụng — Tạo thành công trả 200 thay vì 201; Chuỗi state/concurrency không đạt oracle.                              |
| FR17-ADMINCOUP-ST-004  | Fail   | BUG-ADMINCOUPON-002                      | Validation thất bại không tạo dữ liệu một phần — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.              |
| FR17-ADMINCOUP-ST-005  | Fail   | BUG-ADMINCOUPON-003                      | Tạo lại coupon sau khi xóa — Tạo thành công trả 200 thay vì 201; Chuỗi state/concurrency không đạt oracle.                                      |
| FR17-ADMINCOUP-ST-006  | Fail   | BUG-ADMINCOUPON-002                      | Validation thất bại không tạo bản ghi — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng.                       |
| FR17-ADMINCOUP-ST-007  | Fail   | BUG-ADMINCOUPON-003, BUG-APPLYCOUPON-002 | Coupon mới tạo đi qua các trạng thái sử dụng — Tạo thành công trả 200 thay vì 201; Chuỗi state/concurrency không đạt oracle.                    |
| FR17-ADMINCOUP-ST-008  | Fail   | BUG-ADMINCOUPON-003                      | Xóa rồi tạo lại cùng code — Tạo thành công trả 200 thay vì 201; Chuỗi state/concurrency không đạt oracle.                                       |

## Minh chứng

- [Newman HTML report](../reports/FR17_POST_api_admin_coupons_2026-08-22T16-08-46-471Z.html)
- [Newman JSON report](../reports/FR17_POST_api_admin_coupons_2026-08-22T16-08-46-471Z.json)
- [Kết quả rút gọn](../reports/FR17_POST_api_admin_coupons_2026-08-22T16-08-46-471Z_results.json)
- Ảnh tổng hợp: [`FR17_newman_full_report.png`](../images/FR17_newman_full_report.png)

Assertion đầy đủ, request/response và snapshot hậu trạng thái được giữ trong report Newman; bảng trên chỉ trình bày nguyên nhân chính để tránh lặp thông tin.
