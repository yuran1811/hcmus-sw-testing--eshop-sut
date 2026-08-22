# TC-CANCEL-041: Kiểm tra tính bất biến trạng thái (State Invariant) và Idempotency sau khi hủy đơn hàng qua GET /api/orders/:id

## Requirement ID
FR-10, FR-11

## Module / Test type / Technique
Order Cancel / State Transition & Data Integrity / End-to-End State Machine

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Tài khoản người dùng `test@eshop.com` có Bearer JWT hợp lệ
- Tồn tại đơn hàng ở trạng thái `pending` của người dùng (ví dụ: Order ID: 1)
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint | PUT /api/orders/:id/cancel & GET /api/orders/:id |
| Header Authorization | Bearer {{userToken}} |
| Header X-Student-Id | 23127148 |
| Param.id | 1 |

## Test steps
1. Gửi HTTP PUT request đến `/api/orders/1/cancel` để hủy đơn hàng đang `pending`
2. Gửi HTTP GET request đến `/api/orders/1` để truy vấn trực tiếp trạng thái đơn hàng từ database
3. Gửi tiếp HTTP PUT request lần 2 đến `/api/orders/1/cancel` để thử hủy lại đơn hàng đã hủy

## Expected result
- Bước 1 trả về `200 OK` với message "Order canceled successfully".
- Bước 2 trả về `200 OK` với `status: "canceled"`, xác nhận trạng thái được lưu bền vững trong database.
- Bước 3 trả về `400 Bad Request` với message "Cannot cancel this order.", đảm bảo tính bất biến của trạng thái terminal `canceled`.

## Status / Related bugs
Not Run / None
