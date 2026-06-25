# TC-HOTEL-012: Tính tiền phòng với Tiền dịch vụ bằng 0 (Biên hợp lệ dưới)

## Requirement ID

FR-HOTEL-01

## Module / Test type / Technique

Hotel Room Calculation / Functional / Boundary Value Analysis (2-Point)

## Preconditions

- Hệ thống tính giá hoạt động bình thường.
- Các tham số đầu vào được nhập đầy đủ.

## Test data

| RoomType | A |
| NumDays | 2 |
| NumPeople | 2 |
| ServiceFee | 0 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 0
5. Bấm nút Tính tiền phòng

## Expected result

Tổng tiền trước giảm giá = 2 * (450,000 + 0) + 0 = 900,000đ.
Do 900,000đ < 2,000,000đ nên không được giảm giá (0%).
Tổng tiền thanh toán hiển thị đúng: 900,000đ.

## Status / Related bugs

Not Run / None
