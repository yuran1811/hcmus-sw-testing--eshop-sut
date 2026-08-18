# FR04 PUT /api/users/me Test Run

- **Ngày kiểm thử (Test Date):**
- **API:** `PUT /api/users/me`
- **Requirement:** FR-04 - Quản lý hồ sơ cá nhân
- **Tham chiếu đặc tả API:** Mục 2.2 trong `api_specification.md`
- **Tester:** Mạch Quốc Tấn
- **Trạng thái:** Chưa chạy
- **Số test case:** 51 (44 case AI đã review và 7 case human bổ sung)

| Test Case ID       | Module       | Tester        | Result  | Related Bug | Note                                           |
| :----------------- | :----------- | :------------ | :------ | :---------- | :--------------------------------------------- |
| FR04-USRME-DP-001  | api/users/me | Mạch Quốc Tấn | Not Run |             | Cập nhật hồ sơ với dữ liệu hợp lệ đầy đủ       |
| FR04-USRME-DP-002  | api/users/me | Mạch Quốc Tấn | Not Run |             | Tên và địa chỉ tiếng Việt có dấu               |
| FR04-USRME-DP-003  | api/users/me | Mạch Quốc Tấn | Not Run |             | Biên dưới hợp lệ của trường họ tên             |
| FR04-USRME-DP-004  | api/users/me | Mạch Quốc Tấn | Not Run |             | Họ tên rỗng                                    |
| FR04-USRME-DP-005  | api/users/me | Mạch Quốc Tấn | Not Run |             | Họ tên chỉ có khoảng trắng                     |
| FR04-USRME-DP-006  | api/users/me | Mạch Quốc Tấn | Not Run |             | Họ tên vượt độ dài hợp lý                      |
| FR04-USRME-DP-007  | api/users/me | Mạch Quốc Tấn | Not Run |             | Cập nhật một phần trường họ tên                |
| FR04-USRME-DP-008  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại hợp lệ 10 chữ số                 |
| FR04-USRME-DP-009  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại hợp lệ 11 chữ số                 |
| FR04-USRME-DP-010  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại sai tiền tố                      |
| FR04-USRME-DP-011  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại quá ngắn                         |
| FR04-USRME-DP-012  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại quá dài                          |
| FR04-USRME-DP-013  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại chứa chữ cái                     |
| FR04-USRME-DP-014  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại có ký tự phân tách               |
| FR04-USRME-DP-015  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại gửi dưới dạng number             |
| FR04-USRME-DP-016  | api/users/me | Mạch Quốc Tấn | Not Run |             | Số điện thoại null                             |
| FR04-USRME-DP-017  | api/users/me | Mạch Quốc Tấn | Not Run |             | Địa chỉ giao hàng hợp lệ                       |
| FR04-USRME-DP-018  | api/users/me | Mạch Quốc Tấn | Not Run |             | Địa chỉ rỗng                                   |
| FR04-USRME-DP-019  | api/users/me | Mạch Quốc Tấn | Not Run |             | Địa chỉ chỉ có khoảng trắng                    |
| FR04-USRME-DP-020  | api/users/me | Mạch Quốc Tấn | Not Run |             | Địa chỉ quá dài                                |
| FR04-USRME-DP-021  | api/users/me | Mạch Quốc Tấn | Not Run |             | Body rỗng                                      |
| FR04-USRME-DP-022  | api/users/me | Mạch Quốc Tấn | Not Run |             | Sai Content-Type                               |
| FR04-USRME-ST-001  | api/users/me | Mạch Quốc Tấn | Not Run |             | Trạng thái dữ liệu sau cập nhật thành công     |
| FR04-USRME-ST-002  | api/users/me | Mạch Quốc Tấn | Not Run |             | Bất biến quyền sở hữu hồ sơ                    |
| FR04-USRME-ST-003  | api/users/me | Mạch Quốc Tấn | Not Run |             | Cập nhật lặp lại                               |
| FR04-USRME-ST-004  | api/users/me | Mạch Quốc Tấn | Not Run |             | Trạng thái xác thực hết hạn                    |
| FR04-USRME-ST-005  | api/users/me | Mạch Quốc Tấn | Not Run |             | Validation nguyên tử                           |
| FR04-USRME-SEC-001 | api/users/me | Mạch Quốc Tấn | Not Run |             | Thiếu Authorization header                     |
| FR04-USRME-SEC-002 | api/users/me | Mạch Quốc Tấn | Not Run |             | Token không hợp lệ                             |
| FR04-USRME-SEC-003 | api/users/me | Mạch Quốc Tấn | Not Run |             | Mass assignment trường role                    |
| FR04-USRME-SEC-004 | api/users/me | Mạch Quốc Tấn | Not Run |             | Mass assignment trường email                   |
| FR04-USRME-SEC-005 | api/users/me | Mạch Quốc Tấn | Not Run |             | Thử cập nhật user khác bằng id trong body      |
| FR04-USRME-SEC-006 | api/users/me | Mạch Quốc Tấn | Not Run |             | XSS trong họ tên                               |
| FR04-USRME-SEC-007 | api/users/me | Mạch Quốc Tấn | Not Run |             | XSS trong địa chỉ                              |
| FR04-USRME-SEC-008 | api/users/me | Mạch Quốc Tấn | Not Run |             | SQL injection trong họ tên                     |
| FR04-USRME-SEC-009 | api/users/me | Mạch Quốc Tấn | Not Run |             | SQL injection trong địa chỉ                    |
| FR04-USRME-SEC-010 | api/users/me | Mạch Quốc Tấn | Not Run |             | Trường mật khẩu ngoài đặc tả                   |
| FR04-USRME-SEC-011 | api/users/me | Mạch Quốc Tấn | Not Run |             | Trường OTP/reset token ngoài đặc tả            |
| FR04-USRME-SEC-012 | api/users/me | Mạch Quốc Tấn | Not Run |             | JWT bị chỉnh sửa                               |
| FR04-USRME-SEC-013 | api/users/me | Mạch Quốc Tấn | Not Run |             | Authorization scheme không hợp lệ              |
| FR04-USRME-SEC-014 | api/users/me | Mạch Quốc Tấn | Not Run |             | Prototype pollution qua field ngoài allow-list |
| FR04-USRME-SEC-015 | api/users/me | Mạch Quốc Tấn | Not Run |             | Token A không thể chọn user B qua alias id     |
| FR04-USRME-SEC-016 | api/users/me | Mạch Quốc Tấn | Not Run |             | Unknown field không được ghi vào hồ sơ         |
| FR04-USRME-SC-001  | api/users/me | Mạch Quốc Tấn | Not Run |             | Schema response thành công                     |
| FR04-USRME-SC-002  | api/users/me | Mạch Quốc Tấn | Not Run |             | Không lộ dữ liệu nhạy cảm trong response       |
| FR04-USRME-SC-003  | api/users/me | Mạch Quốc Tấn | Not Run |             | Schema lỗi 401                                 |
| FR04-USRME-SC-004  | api/users/me | Mạch Quốc Tấn | Not Run |             | Schema lỗi validation phone                    |
| FR04-USRME-SC-005  | api/users/me | Mạch Quốc Tấn | Not Run |             | Schema với trường role ngoài đặc tả            |
| FR04-USRME-ST-006  | api/users/me | Mạch Quốc Tấn | Not Run |             | Validation lỗi không đổi hồ sơ                 |
| FR04-USRME-ST-007  | api/users/me | Mạch Quốc Tấn | Not Run |             | Hai PUT liên tiếp giữ owner/id                 |
| FR04-USRME-ST-008  | api/users/me | Mạch Quốc Tấn | Not Run |             | Retry sau timeout không nhân bản cập nhật      |
