# HW06 API Test Run 01 — Postman + Newman

## Thông tin lần chạy

|                 |                                                                                       |
| --------------- | ------------------------------------------------------------------------------------- |
| Ngày            | 2026-08-23                                                                            |
| Người thực hiện | 23127211                                                                              |
| Tool            | Postman collection + Newman CLI (`newman-reporter-htmlextra`)                         |
| Collection      | `tests/postman/collections/eshop-hw06.postman_collection.json`                        |
| Environment     | `tests/postman/envs/local.postman_environment.json` (`baseUrl=http://localhost:3000`) |
| SUT             | Node.js + Express + SQLite, `backend/` — chạy `node server.js` local                  |
| Backend build   | nhánh `hw06/23127211`, commit `47748c1`                                               |

## Lệnh chạy

```bash
newman run tests/postman/collections/eshop-hw06.postman_collection.json \
  -e tests/postman/envs/local.postman_environment.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export tests/postman/reports/newman-report.html \
  --reporter-json-export tests/postman/reports/newman-report.json \
  --timeout-request 10000
```

## Kết quả

|                                 |                                                                  |
| ------------------------------- | ---------------------------------------------------------------- |
| Requests                        | 155 (0 lỗi kết nối)                                              |
| Assertions                      | 215                                                              |
| Pass                            | 146                                                              |
| Fail                            | 69                                                               |
| Report                          | `tests/postman/reports/newman-report.html`, `newman-report.json` |
| Console evidence (X-Student-Id) | `tests/postman/screenshots/newman-console-x-student-id.png`      |

**Không sửa test cho pass.** Toàn bộ assertion fail đã được phân loại: bug thật trong SUT → viết bug report (`tests/bug-reports/`, mỗi bug kèm 1 screenshot bằng chứng); case tự nó sai/chưa chốt được với spec → ghi trong `AuditReason`/`Note` của `TC_*.csv`.
