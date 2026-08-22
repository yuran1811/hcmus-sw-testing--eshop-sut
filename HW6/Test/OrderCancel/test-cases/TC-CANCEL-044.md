# TC-CANCEL-044: Kiểm tra hoàn trả số lượng tồn kho sản phẩm sau khi hủy đơn (Inventory Stock Restoration Invariant)

## Requirement ID
FR-10, FR-08, NFR-DATA-01

## Module / Test type / Technique
Order Cancellation / Cross-Entity State Invariant / Inventory Synchronization

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Sản phẩm `PROD-01` có số lượng tồn khả dụng hiện tại là 7
- Đơn hàng `ORD-9001` gồm 3 đơn vị `PROD-01` đang ở trạng thái `pending`
- Bearer Token hợp lệ của chủ sở hữu đơn hàng
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint Cancel | PUT /api/orders/ORD-9001/cancel |
| Endpoint Product | GET /api/products/PROD-01 |
| Header Authorization | Bearer <User_Token> |
| Header X-Student-Id | 23127148 |
| Body.reason | "Không còn nhu cầu mua" |

## Test steps
1. Gọi `GET /api/products/PROD-01` để ghi nhận tồn kho trước khi hủy ($Stock_{before} = 7$).
2. Gọi `PUT /api/orders/ORD-9001/cancel` để thực hiện hủy đơn hàng.
3. Gọi lại `GET /api/products/PROD-01` để kiểm tra tồn kho sau khi hủy ($Stock_{after}$).

## Expected result
- Bước 2 trả về `200 OK`.
- Bước 3 trả về thông tin sản phẩm với `stock = 10` ($7 + 3 = 10$).
- Bảng lịch sử kho `inventory_transactions` ghi nhận 1 giao dịch hoàn trả gắn liền với `ORD-9001`.

## Status / Related bugs
Not Run / Data Integrity Testing (Ngăn chặn thất thoát và sai lệch tồn kho chuỗi cung ứng)
