# FR09 POST /api/apply-coupon Test Run

- **Ngày kiểm thử (Test Date):**
- **API:** `POST /api/apply-coupon`
- **Requirement:** FR-09 - Áp dụng mã giảm giá
- **Tham chiếu đặc tả API:** Mục 5.1 trong `api_specification.md`
- **Tester:** Mạch Quốc Tấn
- **Trạng thái:** Chưa chạy
- **Số test case:** 46 (40 case AI đã review và 6 case human bổ sung)

| Test Case ID       | Module           | Tester        | Result  | Related Bug | Note                                                |
| :----------------- | :--------------- | :------------ | :------ | :---------- | :-------------------------------------------------- |
| FR09-APPLY-DP-001  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Áp dụng mã phần trăm SAVE10 hợp lệ                  |
| FR09-APPLY-DP-002  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Áp dụng mã fixed BIGBUY hợp lệ                      |
| FR09-APPLY-DP-003  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Áp dụng mã VIP100 tại đúng ngưỡng tối thiểu         |
| FR09-APPLY-DP-004  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền đúng bằng ngưỡng tối thiểu                |
| FR09-APPLY-DP-005  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền thấp hơn ngưỡng tối thiểu một đơn vị      |
| FR09-APPLY-DP-006  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Mã giảm giá đã hết hạn                              |
| FR09-APPLY-DP-007  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Mã giảm giá không tồn tại                           |
| FR09-APPLY-DP-008  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Code rỗng                                           |
| FR09-APPLY-DP-009  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Code chỉ có khoảng trắng                            |
| FR09-APPLY-DP-010  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Code null                                           |
| FR09-APPLY-DP-011  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Code sai chữ hoa/thường                             |
| FR09-APPLY-DP-012  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Code quá dài                                        |
| FR09-APPLY-DP-013  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền bằng 0                                    |
| FR09-APPLY-DP-014  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền âm                                        |
| FR09-APPLY-DP-015  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền là chuỗi số                               |
| FR09-APPLY-DP-016  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền là chuỗi có ký tự                         |
| FR09-APPLY-DP-017  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền có phần thập phân                         |
| FR09-APPLY-DP-018  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tổng tiền rất lớn                                   |
| FR09-APPLY-DP-019  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Thiếu total_amount                                  |
| FR09-APPLY-DP-020  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Thiếu code                                          |
| FR09-APPLY-DP-021  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Thiếu user_id trong body                            |
| FR09-APPLY-DP-022  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | user_id sai kiểu                                    |
| FR09-APPLY-SC-001  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Schema response thành công                          |
| FR09-APPLY-SC-002  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Schema và công thức tiền sau giảm                   |
| FR09-APPLY-SC-003  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Schema lỗi mã không tồn tại                         |
| FR09-APPLY-SC-004  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Schema lỗi 401                                      |
| FR09-APPLY-SC-005  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Schema lỗi validation total_amount                  |
| FR09-APPLY-SEC-001 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Thiếu JWT khi áp dụng mã                            |
| FR09-APPLY-SEC-002 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | JWT không hợp lệ                                    |
| FR09-APPLY-SEC-003 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | SQL injection trong code                            |
| FR09-APPLY-SEC-004 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Injection qua total_amount                          |
| FR09-APPLY-SEC-005 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | XSS payload trong code                              |
| FR09-APPLY-SEC-006 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | IDOR qua user_id trong body                         |
| FR09-APPLY-SEC-007 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Mass assignment field ngoài spec                    |
| FR09-APPLY-SEC-008 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Không lộ dữ liệu nhạy cảm                           |
| FR09-APPLY-SEC-009 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Race condition tại giới hạn lượt dùng               |
| FR09-APPLY-SEC-010 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Tampering discount và trạng thái coupon trong body  |
| FR09-APPLY-SEC-011 | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Ký tự điều khiển và payload mã hóa trong code       |
| FR09-APPLY-ST-001  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Chuyển trạng thái từ chưa dùng sang đã dùng một lần |
| FR09-APPLY-ST-002  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Không cho dùng SAVE10 lần thứ hai                   |
| FR09-APPLY-ST-003  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | VIP100 cho phép dùng lần thứ hai                    |
| FR09-APPLY-ST-004  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | VIP100 không cho dùng lần thứ ba                    |
| FR09-APPLY-ST-005  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Không áp dụng mã đã bị vô hiệu hóa                  |
| FR09-APPLY-ST-006  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Request bị từ chối không tiêu lượt dùng             |
| FR09-APPLY-ST-007  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Áp dụng phép tính không tự làm thay đổi lượt dùng   |
| FR09-APPLY-ST-008  | api/apply-coupon | Mạch Quốc Tấn | Not Run |             | Biên thời gian expired_at                           |
