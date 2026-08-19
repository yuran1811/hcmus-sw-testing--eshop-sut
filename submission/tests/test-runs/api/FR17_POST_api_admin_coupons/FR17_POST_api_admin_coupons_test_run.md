# FR17 POST /api/admin/coupons Test Run

- **Ngày kiểm thử (Test Date):** 2026-08-18
- **API:** `POST /api/admin/coupons`
- **Requirement:** FR-17 - Quản lý mã giảm giá
- **Tham chiếu đặc tả API:** Mục 6.4 trong `api_specification.md`
- **Tester:** Mạch Quốc Tấn
- **Trạng thái:** Chưa chạy
- **Số test case:** 48 (42 case AI đã review và 6 case human bổ sung)

| Test Case ID           | Module            | Tester        | Result  | Related Bug | Note                                           |
| :--------------------- | :---------------- | :------------ | :------ | :---------- | :--------------------------------------------- |
| FR17-ADMINCOUP-DP-001  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Tạo coupon percent hợp lệ                      |
| FR17-ADMINCOUP-DP-002  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Tạo coupon fixed hợp lệ                        |
| FR17-ADMINCOUP-DP-003  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Thiếu code                                     |
| FR17-ADMINCOUP-DP-004  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Code rỗng                                      |
| FR17-ADMINCOUP-DP-005  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Code chỉ khoảng trắng                          |
| FR17-ADMINCOUP-DP-006  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Code trùng                                     |
| FR17-ADMINCOUP-DP-007  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Code dài                                       |
| FR17-ADMINCOUP-DP-008  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Code chứa ký tự đặc biệt                       |
| FR17-ADMINCOUP-DP-009  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Thiếu type                                     |
| FR17-ADMINCOUP-DP-010  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Type ngoài enum                                |
| FR17-ADMINCOUP-DP-011  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Type sai chữ hoa/thường                        |
| FR17-ADMINCOUP-DP-012  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | discount_value bằng 0                          |
| FR17-ADMINCOUP-DP-013  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | discount_value âm                              |
| FR17-ADMINCOUP-DP-014  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | discount_value là chuỗi                        |
| FR17-ADMINCOUP-DP-015  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Percent 100%                                   |
| FR17-ADMINCOUP-DP-016  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Percent lớn hơn 100%                           |
| FR17-ADMINCOUP-DP-017  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | min_order_amount bằng 0                        |
| FR17-ADMINCOUP-DP-018  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | min_order_amount âm                            |
| FR17-ADMINCOUP-DP-019  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Thiếu min_order_amount                         |
| FR17-ADMINCOUP-DP-020  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Thiếu expired_at                               |
| FR17-ADMINCOUP-DP-021  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | expired_at sai định dạng                       |
| FR17-ADMINCOUP-DP-022  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | expired_at là ngày không tồn tại               |
| FR17-ADMINCOUP-DP-023  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | max_uses_per_user bằng 0                       |
| FR17-ADMINCOUP-DP-024  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | max_uses_per_user âm                           |
| FR17-ADMINCOUP-DP-025  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | max_uses_per_user là chuỗi                     |
| FR17-ADMINCOUP-SC-001  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Schema response tạo thành công                 |
| FR17-ADMINCOUP-SC-002  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Schema lỗi thiếu field                         |
| FR17-ADMINCOUP-SC-003  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Schema lỗi 403                                 |
| FR17-ADMINCOUP-SC-004  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Schema lỗi 401                                 |
| FR17-ADMINCOUP-SC-005  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Schema lỗi code trùng                          |
| FR17-ADMINCOUP-SC-006  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Schema lỗi enum type                           |
| FR17-ADMINCOUP-SEC-001 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Thiếu JWT với API admin                        |
| FR17-ADMINCOUP-SEC-002 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | User thường gọi API admin                      |
| FR17-ADMINCOUP-SEC-003 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | JWT bị chỉnh sửa                               |
| FR17-ADMINCOUP-SEC-004 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | SQL injection trong code khi tạo coupon        |
| FR17-ADMINCOUP-SEC-005 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | XSS payload trong code coupon                  |
| FR17-ADMINCOUP-SEC-006 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Mass assignment nâng quyền qua body            |
| FR17-ADMINCOUP-SEC-007 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Prototype pollution và field ngoài allow-list  |
| FR17-ADMINCOUP-SEC-008 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Race condition khi tạo trùng code              |
| FR17-ADMINCOUP-SEC-009 | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Giả mạo danh tính admin qua body               |
| FR17-ADMINCOUP-ST-001  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Tạo xong thì xuất hiện trong danh sách         |
| FR17-ADMINCOUP-ST-002  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Không cho tạo trùng sau khi đã tạo             |
| FR17-ADMINCOUP-ST-003  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Coupon mới tạo có thể được áp dụng             |
| FR17-ADMINCOUP-ST-004  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Validation thất bại không tạo dữ liệu một phần |
| FR17-ADMINCOUP-ST-005  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Tạo lại coupon sau khi xóa                     |
| FR17-ADMINCOUP-ST-006  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Validation thất bại không tạo bản ghi          |
| FR17-ADMINCOUP-ST-007  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Coupon mới tạo đi qua các trạng thái sử dụng   |
| FR17-ADMINCOUP-ST-008  | api/admin/coupons | Mạch Quốc Tấn | Not Run |             | Xóa rồi tạo lại cùng code                      |
