# TC-CANCEL-043: Kiểm tra xử lý khi khách hàng gửi 2 yêu cầu hủy đồng thời (Concurrency Control & Race Condition)

## Requirement ID
FR-10, NFR-REL-01

## Module / Test type / Technique
Order Cancellation / Concurrency & Transaction Testing / Double Cancel Race Condition

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Đơn hàng `ORD-8888` thuộc sở hữu của User A đang ở trạng thái `pending`
- Bearer Token hợp lệ của User A
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/ORD-8888/cancel |
| Header Authorization | Bearer <User_A_Token> |
| Header Content-Type | application/json |
| Header X-Student-Id | 23127148 |
| Body.reason | "Khách hàng đổi ý" |
| Concurrency | 2 requests song song (delta t ≈ 0ms) |

## Test steps
1. Khởi tạo 2 luồng gửi đồng thời (song song) request `PUT /api/orders/ORD-8888/cancel` với cùng token User A.
2. Ghi nhận mã phản hồi và nội dung body của từng luồng.
3. Kiểm tra trạng thái cuối cùng của đơn hàng và nhật ký giao dịch trong cơ sở dữ liệu.

## Expected result
- Luồng 1 (đến trước): Trả về `200 OK`, trạng thái đơn đổi thành `canceled`.
- Luồng 2 (đến sau): Bị từ chối bởi cơ chế khóa/kiểm tra trạng thái nguyên tử, trả về `400 Bad Request` hoặc `409 Conflict`.
- Không xảy ra tình trạng hoàn tiền 2 lần (Double refund) hoặc hoàn kho 2 lần.

## Status / Related bugs
Not Run / Concurrency Testing (Đảm bảo an toàn tài chính và giao dịch)
