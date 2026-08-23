# Test run: FR09 — POST /api/apply-coupon

- **Ngày chạy:** 2026-08-22
- **Requirement:** FR-09 — Mã giảm giá
- **Đặc tả:** Mục 5.1 trong `api_specification.md`
- **Tester:** Mạch Quốc Tấn
- **Kết quả:** 20 Pass, 26 Fail / 46 test case
- **Môi trường:** Newman, Node.js 22.20.0, Windows, `http://127.0.0.1:3100`, `X-Student-Id: 23127115`

## Kết quả chi tiết

| Test Case ID       | Result | Related Bug         | Ghi chú                                                                                                       |
| ------------------ | ------ | ------------------- | ------------------------------------------------------------------------------------------------------------- |
| FR09-APPLY-DP-001  | Fail   | BUG-APPLYCOUPON-002 | Áp dụng mã phần trăm SAVE10 hợp lệ — Công thức discount/final amount sai.                                     |
| FR09-APPLY-DP-002  | Fail   | BUG-APPLYCOUPON-005 | Áp dụng mã fixed BIGBUY hợp lệ — Từ chối tổng tiền đúng bằng ngưỡng tối thiểu.                                |
| FR09-APPLY-DP-003  | Fail   | BUG-APPLYCOUPON-005 | Áp dụng mã VIP100 tại đúng ngưỡng tối thiểu — Từ chối tổng tiền đúng bằng ngưỡng tối thiểu.                   |
| FR09-APPLY-DP-004  | Fail   | BUG-APPLYCOUPON-005 | Tổng tiền đúng bằng ngưỡng tối thiểu — Từ chối tổng tiền đúng bằng ngưỡng tối thiểu.                          |
| FR09-APPLY-DP-005  | Pass   | —                   | Tổng tiền thấp hơn ngưỡng tối thiểu một đơn vị — Đạt status, schema và hậu trạng thái mong đợi.               |
| FR09-APPLY-DP-006  | Pass   | —                   | Mã giảm giá đã hết hạn — Đạt status, schema và hậu trạng thái mong đợi.                                       |
| FR09-APPLY-DP-007  | Pass   | —                   | Mã giảm giá không tồn tại — Đạt status, schema và hậu trạng thái mong đợi.                                    |
| FR09-APPLY-DP-008  | Pass   | —                   | Code rỗng — Đạt status, schema và hậu trạng thái mong đợi.                                                    |
| FR09-APPLY-DP-009  | Fail   | BUG-APPLYCOUPON-006 | Code chỉ có khoảng trắng — Dữ liệu sai định dạng bị phân loại thành mã không tồn tại và trả 404 thay vì 400.  |
| FR09-APPLY-DP-010  | Pass   | —                   | Code null — Đạt status, schema và hậu trạng thái mong đợi.                                                    |
| FR09-APPLY-DP-011  | Pass   | —                   | Code sai chữ hoa/thường — Đạt status, schema và hậu trạng thái mong đợi.                                      |
| FR09-APPLY-DP-012  | Pass   | —                   | Code quá dài — Đạt status, schema và hậu trạng thái mong đợi.                                                 |
| FR09-APPLY-DP-013  | Pass   | —                   | Tổng tiền bằng 0 — Đạt status, schema và hậu trạng thái mong đợi.                                             |
| FR09-APPLY-DP-014  | Pass   | —                   | Tổng tiền âm — Đạt status, schema và hậu trạng thái mong đợi.                                                 |
| FR09-APPLY-DP-015  | Fail   | BUG-APPLYCOUPON-003 | Tổng tiền là chuỗi số — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ.                                |
| FR09-APPLY-DP-016  | Pass   | —                   | Tổng tiền là chuỗi có ký tự — Đạt status, schema và hậu trạng thái mong đợi.                                  |
| FR09-APPLY-DP-017  | Fail   | BUG-APPLYCOUPON-003 | Tổng tiền có phần thập phân — API chấp nhận hoặc phân loại sai dữ liệu không hợp lệ.                          |
| FR09-APPLY-DP-018  | Fail   | BUG-APPLYCOUPON-002 | Tổng tiền rất lớn — Công thức discount/final amount sai.                                                      |
| FR09-APPLY-DP-019  | Pass   | —                   | Thiếu total_amount — Đạt status, schema và hậu trạng thái mong đợi.                                           |
| FR09-APPLY-DP-020  | Pass   | —                   | Thiếu code — Đạt status, schema và hậu trạng thái mong đợi.                                                   |
| FR09-APPLY-DP-021  | Fail   | BUG-APPLYCOUPON-002 | Thiếu user_id trong body — Công thức discount/final amount sai.                                               |
| FR09-APPLY-DP-022  | Fail   | BUG-APPLYCOUPON-002 | user_id sai kiểu — Công thức discount/final amount sai.                                                       |
| FR09-APPLY-SC-001  | Fail   | BUG-APPLYCOUPON-002 | Schema response thành công — Công thức discount/final amount sai; Schema response không đúng.                 |
| FR09-APPLY-SC-002  | Fail   | BUG-APPLYCOUPON-005 | Schema và công thức tiền sau giảm — Từ chối tổng tiền đúng bằng ngưỡng tối thiểu; Schema response không đúng. |
| FR09-APPLY-SC-003  | Pass   | —                   | Schema lỗi mã không tồn tại — Đạt status, schema và hậu trạng thái mong đợi.                                  |
| FR09-APPLY-SC-004  | Fail   | BUG-APPLYCOUPON-001 | Schema lỗi 401 — Token không hợp lệ trả sai status xác thực; Schema response không đúng.                      |
| FR09-APPLY-SC-005  | Pass   | —                   | Schema lỗi validation total_amount — Đạt status, schema và hậu trạng thái mong đợi.                           |
| FR09-APPLY-SEC-001 | Fail   | BUG-APPLYCOUPON-001 | Thiếu JWT khi áp dụng mã — Token không hợp lệ trả sai status xác thực.                                        |
| FR09-APPLY-SEC-002 | Fail   | BUG-APPLYCOUPON-001 | JWT không hợp lệ — Token không hợp lệ trả sai status xác thực.                                                |
| FR09-APPLY-SEC-003 | Pass   | —                   | SQL injection trong code — Đạt status, schema và hậu trạng thái mong đợi.                                     |
| FR09-APPLY-SEC-004 | Pass   | —                   | Injection qua total_amount — Đạt status, schema và hậu trạng thái mong đợi.                                   |
| FR09-APPLY-SEC-005 | Fail   | BUG-APPLYCOUPON-006 | XSS payload trong code — Dữ liệu sai định dạng bị phân loại thành mã không tồn tại và trả 404 thay vì 400.    |
| FR09-APPLY-SEC-006 | Fail   | BUG-APPLYCOUPON-002 | IDOR qua user_id trong body — Công thức discount/final amount sai.                                            |
| FR09-APPLY-SEC-007 | Fail   | BUG-APPLYCOUPON-007 | Mass assignment field ngoài spec — API chấp nhận field ngoài allow-list và trả 200.                           |
| FR09-APPLY-SEC-008 | Fail   | BUG-APPLYCOUPON-002 | Không lộ dữ liệu nhạy cảm — Công thức discount/final amount sai.                                              |
| FR09-APPLY-SEC-009 | Fail   | BUG-APPLYCOUPON-008 | Race condition tại giới hạn lượt dùng — Hai request đồng thời đều trả 200.                                    |
| FR09-APPLY-SEC-010 | Fail   | BUG-APPLYCOUPON-007 | Tampering discount và trạng thái coupon trong body — API chấp nhận field ngoài allow-list và trả 200.         |
| FR09-APPLY-SEC-011 | Fail   | BUG-APPLYCOUPON-006 | Ký tự điều khiển/payload mã hóa bị phân loại thành mã không tồn tại và trả 404 thay vì 400.                   |
| FR09-APPLY-ST-001  | Fail   | BUG-APPLYCOUPON-002 | Chuyển trạng thái từ chưa dùng sang đã dùng một lần — Công thức discount/final amount sai.                    |
| FR09-APPLY-ST-002  | Fail   | BUG-APPLYCOUPON-004 | Không cho dùng SAVE10 lần thứ hai — Xung đột trạng thái trả sai status.                                       |
| FR09-APPLY-ST-003  | Pass   | —                   | VIP100 cho phép dùng lần thứ hai — Đạt status, schema và hậu trạng thái mong đợi.                             |
| FR09-APPLY-ST-004  | Fail   | BUG-APPLYCOUPON-004 | VIP100 không cho dùng lần thứ ba — Xung đột trạng thái trả sai status.                                        |
| FR09-APPLY-ST-005  | Pass   | —                   | Không áp dụng mã đã bị vô hiệu hóa — Đạt status, schema và hậu trạng thái mong đợi.                           |
| FR09-APPLY-ST-006  | Pass   | —                   | Request bị từ chối không tiêu lượt dùng — Đạt status, schema và hậu trạng thái mong đợi.                      |
| FR09-APPLY-ST-007  | Fail   | BUG-APPLYCOUPON-002 | Áp dụng phép tính không tự làm thay đổi lượt dùng — Công thức discount/final amount sai.                      |
| FR09-APPLY-ST-008  | Pass   | —                   | Biên thời gian expired_at — Đạt status, schema và hậu trạng thái mong đợi.                                    |

## Minh chứng

- [Newman HTML report](../reports/FR09_POST_api_apply_coupon_2026-08-22T16-08-24-818Z.html)
- [Newman JSON report](../reports/FR09_POST_api_apply_coupon_2026-08-22T16-08-24-818Z.json)
- [Kết quả rút gọn](../reports/FR09_POST_api_apply_coupon_2026-08-22T16-08-24-818Z_results.json)
- Ảnh tổng hợp: [`FR09_newman_full_report.png`](../images/FR09_newman_full_report.png)

Assertion đầy đủ, request/response và snapshot hậu trạng thái được giữ trong report Newman; bảng trên chỉ trình bày nguyên nhân chính để tránh lặp thông tin.
