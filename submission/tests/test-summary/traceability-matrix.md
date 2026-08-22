| Requirement               | Test Case                                             | Result            | Bug Issue                | Status   |
| ------------------------- | ----------------------------------------------------- | ----------------- | ------------------------ | -------- |
| FR-04 / Domain Partition  | `FR04-USRME-DP-001` đến `FR04-USRME-DP-022`           | 0 Pass / 22 Fail  | BUG-USRME-001, 003       | Executed |
| FR-04 / State Transition  | `FR04-USRME-ST-001` đến `FR04-USRME-ST-008`           | 0 Pass / 8 Fail   | BUG-USRME-001, 003       | Executed |
| FR-04 / Security          | `FR04-USRME-SEC-001` đến `FR04-USRME-SEC-016`         | 0 Pass / 16 Fail  | BUG-USRME-001, 002       | Executed |
| FR-04 / Schema Validation | `FR04-USRME-SC-001` đến `FR04-USRME-SC-005`           | 0 Pass / 5 Fail   | BUG-USRME-001, 002, 003  | Executed |
| FR-09 / Domain Partition  | `FR09-APPLY-DP-001` đến `FR09-APPLY-DP-022`           | 12 Pass / 10 Fail | BUG-APPLYCOUPON-002      | Executed |
| FR-09 / State Transition  | `FR09-APPLY-ST-001` đến `FR09-APPLY-ST-008`           | 4 Pass / 4 Fail   | BUG-APPLYCOUPON-002      | Executed |
| FR-09 / Security          | `FR09-APPLY-SEC-001` đến `FR09-APPLY-SEC-011`         | 2 Pass / 9 Fail   | BUG-APPLYCOUPON-001      | Executed |
| FR-09 / Schema Validation | `FR09-APPLY-SC-001` đến `FR09-APPLY-SC-005`           | 2 Pass / 3 Fail   | BUG-APPLYCOUPON-001, 002 | Executed |
| FR-17 / Domain Partition  | `FR17-ADMINCOUP-DP-001` đến `FR17-ADMINCOUP-DP-025`   | 0 Pass / 25 Fail  | BUG-ADMINCOUPON-002      | Executed |
| FR-17 / State Transition  | `FR17-ADMINCOUP-ST-001` đến `FR17-ADMINCOUP-ST-008`   | 0 Pass / 8 Fail   | BUG-ADMINCOUPON-002      | Executed |
| FR-17 / Security          | `FR17-ADMINCOUP-SEC-001` đến `FR17-ADMINCOUP-SEC-009` | 1 Pass / 8 Fail   | BUG-ADMINCOUPON-001      | Executed |
| FR-17 / Schema Validation | `FR17-ADMINCOUP-SC-001` đến `FR17-ADMINCOUP-SC-006`   | 1 Pass / 5 Fail   | BUG-ADMINCOUPON-001, 002 | Executed |

Chi tiết input, expected result, oracle và fixture của từng test case nằm trong thư mục `submission/tests/test-cases/api`. Lần full run ngày 2026-08-22 thực thi đủ 145 case: **22 Pass, 123 Fail**. Kết quả chi tiết nằm trong ba file `*_test_run.md`, báo cáo Newman HTML/JSON tại `submission/tests/test-runs/api/reports` và ảnh bằng chứng tại `submission/tests/test-runs/api/images`.
