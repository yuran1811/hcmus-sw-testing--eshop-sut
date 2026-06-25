# TC-HOTEL-010: Tính tiền phòng với Số người bằng 4 (Biên hợp lệ trên, Phụ thu 2 người 10%)

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
| NumPeople | 4 |
| ServiceFee | 500,000 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 4
4. Nhập Tiền dịch vụ (ServiceFee) là 500,000
5. Bấm nút Tính tiền phòng

## Expected result

Phụ thu cho 2 người thêm = 2 * 10% * 450,000 = 90,000đ.
Tổng tiền trước giảm giá = 2 * (450,000 + 90,000) + 500,000 = 1,580,000đ.
Do 1,580,000đ < 2,000,000đ nên không được giảm giá (0%).
Tổng tiền thanh toán hiển thị đúng: 1,580,000đ.

## Status / Related bugs

Not Run / None
