# TC-HOTEL-005: Tính tiền phòng với Số ngày ở nhỏ nhất hợp lệ (1 ngày - Biên hợp lệ)

## Requirement ID

FR-HOTEL-01

## Module / Test type / Technique

Hotel Room Calculation / Functional / Boundary Value Analysis (2-Point)

## Preconditions

- Hệ thống tính giá hoạt động bình thường.
- Các tham số đầu vào được nhập đầy đủ.

## Test data

| RoomType | A |
| NumDays | 1 |
| NumPeople | 2 |
| ServiceFee | 500,000 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 1
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 500,000
5. Bấm nút Tính tiền phòng

## Expected result

Tổng tiền trước giảm giá = 1 * (450,000 + 0) + 500,000 = 950,000đ.
Do 950,000đ < 2,000,000đ nên không được giảm giá (0%).
Tổng tiền thanh toán hiển thị đúng: 950,000đ.

## Status / Related bugs

Not Run / None
