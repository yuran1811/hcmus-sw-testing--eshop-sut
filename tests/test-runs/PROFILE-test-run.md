# PROFILE Test Run — Use Case Testing (FR-04)

- **Ngày kiểm thử (Test Date):** 2026-07-06

| Test Case ID      | Module  | Tester   | Result | Related Bug     | Note                                                                          |
| :---------------- | :------ | :------- | :----- | :-------------- | :---------------------------------------------------------------------------- |
| TC-PROFILE-UCT-01 | profile | AI Agent | Pass   |                 | Cập nhật thông tin cá nhân thành công với dữ liệu hợp lệ                      |
| TC-PROFILE-UCT-02 | profile | AI Agent | Fail   | BUG-PROFILE-002 | Server vẫn chấp nhận SĐT ít hơn 10 chữ số ("09123")                           |
| TC-PROFILE-UCT-03 | profile | AI Agent | Fail   | BUG-PROFILE-002 | Server vẫn chấp nhận SĐT không bắt đầu bằng 0 ("1234567890")                  |
| TC-PROFILE-UCT-04 | profile | AI Agent | Fail   | BUG-PROFILE-002 | Server vẫn chấp nhận SĐT dài hơn 11 chữ số ("0912345678901")                  |
| TC-PROFILE-UCT-05 | profile | AI Agent | Pass   |                 | Địa chỉ Email không bị thay đổi khi gửi tham số email mới trong request       |
| TC-PROFILE-UCT-06 | profile | AI Agent | Fail   | BUG-PROFILE-001 | Lỗi Privilege Escalation: User tự đổi role từ 'user' thành 'admin' thành công |
| TC-PROFILE-UCT-07 | profile | AI Agent | Pass   |                 | Từ chối request không có token với status 401 Unauthorized                    |
