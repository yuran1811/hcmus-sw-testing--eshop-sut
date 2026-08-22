# Bằng chứng Postman Monitor

- Monitor: `HW06 Mock API Monitor - 23127115`
- Monitor UID: `57640965-1f19e4bc-32df-41e0-9c5a-fc4f81cec9eb`
- Collection UID: `57640965-415351b4-2fe4-42a5-a9ae-1f81bb29711b`
- Environment UID: `57640965-6a4798bb-2eef-4e9e-af83-927e3bde60ef`
- Lịch chạy: `0 8 * * *`, múi giờ `Asia/Ho_Chi_Minh`
- Job ID: `1f19e511-2326-4c30-b076-d25299cfd14a`
- Thời điểm bắt đầu: `2026-08-22T17:44:06.324Z`
- Thời điểm kết thúc: `2026-08-22T17:44:07.278Z`
- Trạng thái Postman: `success`
- Kết quả: 1 request, 1 assertion, 0 request failure, 0 assertion failure
- HTTP response: 200 OK
- Response time: 209 ms

Monitor gọi request `POST /api/apply-coupon` qua Postman Mock Server công khai. Mock trả HTTP 200 với response example, response là JSON và assertion `Response is JSON` đạt. Kết quả kiểm thử chức năng chính thức vẫn là full Newman run trên SUT local và không được thay thế bởi monitor này.

Postman Cloud không thể gọi `127.0.0.1`; lần thử local trước đó trả `NETERR: getaddrinfo ENOTFOUND 127.0.0.1`. Vì vậy monitor dùng mock environment là cấu hình phù hợp để chứng minh tính năng cloud monitor được tạo, lên lịch và thực thi thật.
