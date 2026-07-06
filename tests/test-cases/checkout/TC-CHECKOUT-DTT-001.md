# TC-CHECKOUT-DTT-001: Thanh toán khi chưa đăng nhập

## Requirement ID

FR-08

## Module / Test type / Technique

Checkout / Functional / Decision Table Testing

## Preconditions

- Người dùng truy cập hệ thống dưới dạng Guest (Chưa đăng nhập)
- Rule tương ứng: Rule 1

## Test data

| Field | Value              |
| ----- | ------------------ |
| C1    | N (Chưa đăng nhập) |
| C2    | Không quan tâm     |
| C3    | Không quan tâm     |

## Test steps

1. Truy cập vào trang giỏ hàng (Cart)
2. Bấm nút Tiến hành thanh toán (Checkout)

## Expected result

Hệ thống chặn thanh toán và yêu cầu người dùng đăng nhập (chuyển hướng sang trang Login hoặc hiện modal Login).

## Status / Related bugs

Blocked / None
