# AUTH Test Run — State Transition Testing (FR-02)

- **Ngày kiểm thử (Test Date):** 2026-07-06

| Test Case ID   | Module | Tester   | Result  | Related Bug                | Note                                                                         |
| :------------- | :----- | :------- | :------ | :------------------------- | :--------------------------------------------------------------------------- |
| TC-AUTH-STT-01 | auth   | AI Agent | Pass    |                            | Đăng nhập thành công, thu được JWT token                                     |
| TC-AUTH-STT-02 | auth   | AI Agent | Fail    | BUG-AUTH-001               | Bộ đếm sai bị tăng 2 đơn vị (nhảy từ 0 lên 2) thay vì 1 đơn vị               |
| TC-AUTH-STT-03 | auth   | AI Agent | Blocked | BUG-AUTH-001               | Không thể đưa tài khoản về trạng thái sai 1 lần do lỗi nhảy bộ đếm của TC-02 |
| TC-AUTH-STT-04 | auth   | AI Agent | Fail    | BUG-AUTH-001, BUG-AUTH-003 | Lần sai thứ 2 làm bộ đếm đạt 4 và bị khóa tài khoản ngay lập tức             |
| TC-AUTH-STT-05 | auth   | AI Agent | Fail    | BUG-AUTH-003               | Không đăng nhập được ở lần 3 do tài khoản đã bị khóa bất ngờ ở lần 2         |
| TC-AUTH-STT-06 | auth   | AI Agent | Fail    | BUG-AUTH-002               | Khóa tài khoản 180s (3 phút) thay vì 30s                                     |
| TC-AUTH-STT-07 | auth   | AI Agent | Pass    |                            | Từ chối đăng nhập với status 403 khi tài khoản đang trong thời gian bị khóa  |
| TC-AUTH-STT-08 | auth   | AI Agent | Pass    |                            | Từ chối đăng nhập với status 403 khi tài khoản đang trong thời gian bị khóa  |
| TC-AUTH-STT-09 | auth   | AI Agent | Fail    | BUG-AUTH-002               | Hết 30s tài khoản vẫn chưa gỡ khóa do bị khóa 180s                           |
| TC-AUTH-STT-10 | auth   | AI Agent | Fail    | BUG-AUTH-002               | Hết 30s không đăng nhập lại được do chưa gỡ khóa                             |
