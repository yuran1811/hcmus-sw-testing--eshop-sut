# BUG-REGISTER-004: Response lỗi 500 lộ stack trace và đường dẫn tuyệt đối của server

## Found by Test Case

TC-A-REGISTER-SEC-008 (case có sẵn trong bộ audit; script Postman được enrich thêm assertion kiểm tra nội dung response không chứa dấu hiệu stack trace)

## Requirement liên quan

SEC checklist nhóm G (Information disclosure — "Lỗi 500 trả về stack trace / tên bảng / connection string")

## Severity / Priority

Minor / P2

## Environment

- Tool: Postman + Newman
- Backend: Node.js + Express, chạy local tại `http://localhost:3000`
- Build: nhánh `hw06/23127211`, commit `47748c1`

## Steps to reproduce

Chạy collection `tests/postman/collections/eshop-hw06.postman_collection.json` (folder `API1 - POST /api/register / SEC - Security / [TC-A-REGISTER-SEC-008]`): `POST /api/register` với `Content-Type: text/plain` kèm body JSON hợp lệ.

## Expected result

Response lỗi (400/415) không được chứa stack trace, tên file, hay đường dẫn hệ thống của server.

## Actual result

Assertion `Security: [TC-A-REGISTER-SEC-008] Response lỗi KHÔNG lộ stack trace / đường dẫn tuyệt đối server` FAIL — response HTML mặc định của Express chứa nguyên văn stack trace, bao gồm đường dẫn tuyệt đối tới source code trên máy chủ.

## Evidence

`tests/postman/reports/newman-report.json` — item `[TC-A-REGISTER-SEC-008]`, message assertion:
`Response chứa dấu hiệu lộ stack trace: "at Layer.": expected '<!DOCTYPE html>...` (nội dung đầy đủ có chứa `TypeError: Cannot destructure property 'name' of 'req.body' as it is undefined` kèm đường dẫn file server).

## Notes

Cùng nguyên nhân gốc với việc trả 500 thay vì 400/415 (status code đã fail trong cùng TC này) — Express dùng error handler mặc định khi route không có try/catch, error handler mặc định của Express (ở môi trường không set `NODE_ENV=production`) in nguyên văn `err.stack` ra response. Sửa cùng lúc với status code: thêm middleware xử lý lỗi tường minh, không dùng error handler mặc định của Express khi triển khai thật.
