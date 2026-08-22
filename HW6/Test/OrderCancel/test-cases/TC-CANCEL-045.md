# TC-CANCEL-045: Khôi phục và tái sử dụng mã giảm giá sau khi hủy đơn (Coupon / Voucher Quota Rollback)

## Requirement ID
FR-10, FR-07, NFR-BUS-01

## Module / Test type / Technique
Order Cancellation / End-to-End Business Flow / State Lifecycle Testing

## Preconditions
- Server SUT đang chạy tại `http://localhost:3000`
- Mã giảm giá `SUMMER50` (chỉ cho phép dùng 1 lần duy nhất cho mỗi khách hàng)
- User A đã áp dụng `SUMMER50` cho đơn `ORD-9002` (trạng thái `pending`)
- Bearer Token hợp lệ của User A
- Header `X-Student-Id: 23127148` được đính kèm trong request

## Test data
| Field | Value |
|---|---|
| Endpoint Cancel | PUT /api/orders/ORD-9002/cancel |
| Endpoint Create Order | POST /api/orders |
| Header Authorization | Bearer <User_A_Token> |
| Header X-Student-Id | 23127148 |
| Coupon Code | SUMMER50 |

## Test steps
1. Gửi request `PUT /api/orders/ORD-9002/cancel` để hủy đơn hàng đang áp dụng mã giảm giá.
2. Kiểm tra trạng thái coupon trong cơ sở dữ liệu `coupon_usages`.
3. Gửi request `POST /api/orders` tạo đơn hàng mới `ORD-9003` và áp dụng lại mã `SUMMER50`.

## Expected result
- Bước 1 trả về `200 OK`, trạng thái đơn hàng cập nhật thành `canceled`.
- Mã `SUMMER50` được hoàn lại lượt dùng hợp lệ cho User A.
- Bước 3 trả về `201 Created`, đơn hàng mới được áp dụng thành công mức giảm giá từ coupon.

## Status / Related bugs
Not Run / Business Logic Testing (Bảo vệ quyền lợi khách hàng và trải nghiệm mua sắm)
