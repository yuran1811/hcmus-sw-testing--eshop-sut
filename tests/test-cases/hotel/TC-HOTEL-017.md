# TC-HOTEL-017: Kiểm tra ngưỡng giảm giá 10% (Tổng tiền trước giảm giá = 3,999,999đ - Biên 3-Point)

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
| NumPeople | 2 |
| ServiceFee | 3,099,999 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 3,099,999
5. Bấm nút Tính tiền phòng

## Expected result

Tổng tiền trước giảm giá = 2 * (450,000 + 0) + 3,099,999 = 3,999,999đ.
Do 3,999,999đ >= 2,000,000đ và < 4,000,000đ nên được giảm giá 10%.
Tổng tiền thanh toán hiển thị đúng: 3,999,999 * 90% = 3,599,999.1đ (hoặc làm tròn thành 3,599,999đ).

## Status / Related bugs

Not Run / None
