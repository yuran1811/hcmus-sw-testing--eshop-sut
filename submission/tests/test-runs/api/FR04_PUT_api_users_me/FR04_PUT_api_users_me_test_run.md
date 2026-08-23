# Test run: FR04 — PUT /api/users/me

- **Ngày chạy:** 2026-08-22
- **Requirement:** FR-04 — Quản lý hồ sơ cá nhân
- **Đặc tả:** Mục 2.2 trong `api_specification.md`
- **Tester:** Mạch Quốc Tấn
- **Kết quả:** 0 Pass, 51 Fail / 51 test case
- **Môi trường:** Newman, Node.js 22.20.0, Windows, `http://127.0.0.1:3100`, `X-Student-Id: 23127115`

> Cả 51 iteration được Newman đánh dấu Fail vì assertion dùng chung `GET profile exposes no sensitive field` thất bại: endpoint hậu kiểm luôn trả `password`. Một số luồng cập nhật chính vẫn đúng; cột Ghi chú nêu thêm lỗi nghiệp vụ nếu có.

## Kết quả chi tiết

| Test Case ID       | Result | Related Bug                  | Ghi chú                                                                                                                                                    |
| ------------------ | ------ | ---------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------- |
| FR04-USRME-DP-001  | Fail   | BUG-USRME-001                | Cập nhật đầy đủ hợp lệ — GET hậu kiểm lộ password.                                                                                                         |
| FR04-USRME-DP-002  | Fail   | BUG-USRME-001                | Unicode tiếng Việt — GET hậu kiểm lộ password.                                                                                                             |
| FR04-USRME-DP-003  | Fail   | BUG-USRME-001                | Tên một ký tự — GET hậu kiểm lộ password.                                                                                                                  |
| FR04-USRME-DP-004  | Fail   | BUG-USRME-001, BUG-USRME-003 | Tên rỗng — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                                     |
| FR04-USRME-DP-005  | Fail   | BUG-USRME-001, BUG-USRME-003 | Tên chỉ khoảng trắng — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                         |
| FR04-USRME-DP-006  | Fail   | BUG-USRME-001, BUG-USRME-003 | Tên rất dài — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                                  |
| FR04-USRME-DP-007  | Fail   | BUG-USRME-001, BUG-USRME-005 | Partial update chỉ name — Hậu trạng thái không đúng; GET hậu kiểm lộ password.                                                                             |
| FR04-USRME-DP-008  | Fail   | BUG-USRME-001                | Phone hợp lệ 10 chữ số — GET hậu kiểm lộ password.                                                                                                         |
| FR04-USRME-DP-009  | Fail   | BUG-USRME-001                | Phone hợp lệ 11 chữ số — GET hậu kiểm lộ password.                                                                                                         |
| FR04-USRME-DP-010  | Fail   | BUG-USRME-001, BUG-USRME-003 | Phone sai tiền tố — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                            |
| FR04-USRME-DP-011  | Fail   | BUG-USRME-001, BUG-USRME-003 | Phone quá ngắn — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                               |
| FR04-USRME-DP-012  | Fail   | BUG-USRME-001, BUG-USRME-003 | Phone quá dài — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                                |
| FR04-USRME-DP-013  | Fail   | BUG-USRME-001, BUG-USRME-003 | Phone chứa chữ cái — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                           |
| FR04-USRME-DP-014  | Fail   | BUG-USRME-001, BUG-USRME-003 | Phone có dấu phân cách — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                       |
| FR04-USRME-DP-015  | Fail   | BUG-USRME-001, BUG-USRME-003 | Phone kiểu number — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                            |
| FR04-USRME-DP-016  | Fail   | BUG-USRME-001, BUG-USRME-003 | Phone null — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                                   |
| FR04-USRME-DP-017  | Fail   | BUG-USRME-001                | Địa chỉ hợp lệ — GET hậu kiểm lộ password.                                                                                                                 |
| FR04-USRME-DP-018  | Fail   | BUG-USRME-001, BUG-USRME-003 | Địa chỉ rỗng — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                                 |
| FR04-USRME-DP-019  | Fail   | BUG-USRME-001, BUG-USRME-003 | Địa chỉ whitespace — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                           |
| FR04-USRME-DP-020  | Fail   | BUG-USRME-001                | Địa chỉ rất dài — GET hậu kiểm lộ password.                                                                                                                |
| FR04-USRME-DP-021  | Fail   | BUG-USRME-001, BUG-USRME-003 | Body rỗng — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                                    |
| FR04-USRME-DP-022  | Fail   | BUG-USRME-001, BUG-USRME-004 | Content-Type sai — Content-Type sai gây 500/HTML thay vì lỗi JSON 415; GET hậu kiểm lộ password.                                                           |
| FR04-USRME-ST-001  | Fail   | BUG-USRME-001                | Cập nhật thành công rồi GET — GET hậu kiểm lộ password.                                                                                                    |
| FR04-USRME-ST-002  | Fail   | BUG-USRME-001                | Bất biến ownership — GET hậu kiểm lộ password.                                                                                                             |
| FR04-USRME-ST-003  | Fail   | BUG-USRME-001                | Hai lần cập nhật — GET hậu kiểm lộ password.                                                                                                               |
| FR04-USRME-ST-004  | Fail   | BUG-USRME-001                | JWT hết hạn/bị thu hồi — Token không hợp lệ trả sai status xác thực; GET hậu kiểm lộ password.                                                             |
| FR04-USRME-ST-005  | Fail   | BUG-USRME-001, BUG-USRME-003 | Validation nguyên tử — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                         |
| FR04-USRME-ST-006  | Fail   | BUG-USRME-001, BUG-USRME-003 | Validation lỗi không đổi trường — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.              |
| FR04-USRME-ST-007  | Fail   | BUG-USRME-001                | Hai request liên tiếp giữ id/owner — GET hậu kiểm lộ password.                                                                                             |
| FR04-USRME-ST-008  | Fail   | BUG-USRME-001                | Retry sau timeout — GET hậu kiểm lộ password.                                                                                                              |
| FR04-USRME-SEC-001 | Fail   | BUG-USRME-001                | Thiếu Authorization — GET hậu kiểm lộ password.                                                                                                            |
| FR04-USRME-SEC-002 | Fail   | BUG-USRME-001                | Bearer token sai — Token không hợp lệ trả sai status xác thực; GET hậu kiểm lộ password.                                                                   |
| FR04-USRME-SEC-003 | Fail   | BUG-USRME-001, BUG-USRME-002 | Mass assignment role — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Role hoặc danh tính hậu kiểm bị thay đổi; Hậu trạng thái không đúng.         |
| FR04-USRME-SEC-004 | Fail   | BUG-USRME-001, BUG-USRME-003 | Mass assignment email — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                        |
| FR04-USRME-SEC-005 | Fail   | BUG-USRME-001, BUG-USRME-003 | IDOR bằng id trong body — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                      |
| FR04-USRME-SEC-006 | Fail   | BUG-USRME-001                | XSS trong name — GET hậu kiểm lộ password.                                                                                                                 |
| FR04-USRME-SEC-007 | Fail   | BUG-USRME-001                | XSS trong shipping_address — GET hậu kiểm lộ password.                                                                                                     |
| FR04-USRME-SEC-008 | Fail   | BUG-USRME-001                | SQL injection trong name — GET hậu kiểm lộ password.                                                                                                       |
| FR04-USRME-SEC-009 | Fail   | BUG-USRME-001                | SQL injection trong address — GET hậu kiểm lộ password.                                                                                                    |
| FR04-USRME-SEC-010 | Fail   | BUG-USRME-001, BUG-USRME-003 | Password field ngoài allow-list — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.              |
| FR04-USRME-SEC-011 | Fail   | BUG-USRME-001, BUG-USRME-003 | OTP/reset token ngoài allow-list — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.             |
| FR04-USRME-SEC-012 | Fail   | BUG-USRME-001                | JWT bị chỉnh sửa — Token không hợp lệ trả sai status xác thực; GET hậu kiểm lộ password.                                                                   |
| FR04-USRME-SEC-013 | Fail   | BUG-USRME-001, BUG-USRME-003 | Authorization scheme Basic/Token — Token không hợp lệ trả sai status xác thực; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                        |
| FR04-USRME-SEC-014 | Fail   | BUG-USRME-001, BUG-USRME-003 | Prototype pollution — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                          |
| FR04-USRME-SEC-015 | Fail   | BUG-USRME-001, BUG-USRME-003 | IDOR qua id/userId/user_id — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                   |
| FR04-USRME-SEC-016 | Fail   | BUG-USRME-001, BUG-USRME-003 | Unknown sensitive fields — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                     |
| FR04-USRME-SC-001  | Fail   | BUG-USRME-001                | Schema response thành công — GET hậu kiểm lộ password.                                                                                                     |
| FR04-USRME-SC-002  | Fail   | BUG-USRME-001                | Không lộ secret trong response — GET hậu kiểm lộ password.                                                                                                 |
| FR04-USRME-SC-003  | Fail   | BUG-USRME-001                | Schema lỗi thiếu token — GET hậu kiểm lộ password.                                                                                                         |
| FR04-USRME-SC-004  | Fail   | BUG-USRME-001, BUG-USRME-003 | Schema lỗi phone invalid — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Hậu trạng thái không đúng; GET hậu kiểm lộ password.                     |
| FR04-USRME-SC-005  | Fail   | BUG-USRME-001, BUG-USRME-002 | Schema role ngoài allow-list — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ; Role hoặc danh tính hậu kiểm bị thay đổi; Hậu trạng thái không đúng. |

## Minh chứng

- [Newman HTML report](../reports/FR04_PUT_api_users_me_2026-08-22T16-07-51-183Z.html)
- [Newman JSON report](../reports/FR04_PUT_api_users_me_2026-08-22T16-07-51-183Z.json)
- [Kết quả rút gọn](../reports/FR04_PUT_api_users_me_2026-08-22T16-07-51-183Z_results.json)
- Ảnh tổng hợp: [`FR04_newman_full_report.png`](../images/FR04_newman_full_report.png)

Assertion đầy đủ, request/response và snapshot hậu trạng thái được giữ trong report Newman; bảng trên chỉ trình bày nguyên nhân chính để tránh lặp thông tin.
