# TC-HOTEL-009: Tính tiền phòng với Số người bằng 3 (Phụ thu 1 người 10%)

## Requirement ID

FR-HOTEL-01

## Module / Test type / Technique

Hotel Room Calculation / Functional / Boundary Value Analysis (3-Point)

## Preconditions

- Hệ thống tính giá hoạt động bình thường.
- Các tham số đầu vào được nhập đầy đủ.

## Test data

| RoomType | A |
| NumDays | 2 |
| NumPeople | 3 |
| ServiceFee | 500,000 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 3
4. Nhập Tiền dịch vụ (ServiceFee) là 500,000
5. Bấm nút Tính tiền phòng

## Expected result

Phụ thu cho 1 người thêm = 1 * 10% * 450,000 = 45,000đ.
Tổng tiền trước giảm giá = 2 * (450,000 + 45,000) + 500,000 = 1,490,000đ.
Do 1,490,000đ < 2,000,000đ nên không được giảm giá (0%).
Tổng tiền thanh toán hiển thị đúng: 1,490,000đ.

## Status / Related bugs

Not Run / None
