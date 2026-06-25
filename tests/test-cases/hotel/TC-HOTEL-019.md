# TC-HOTEL-019: Kiểm tra ngưỡng giảm giá 20% (Tổng tiền trước giảm giá = 4,000,001đ - Biên 3-Point)

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
| ServiceFee | 3,100,001 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 3,100,001
5. Bấm nút Tính tiền phòng

## Expected result

Tổng tiền trước giảm giá = 2 * (450,000 + 0) + 3,100,001 = 4,000,001đ.
Do 4,000,001đ >= 4,000,000đ nên được giảm giá 20%.
Tổng tiền thanh toán hiển thị đúng: 4,000,001 * 80% = 3,200,000.8đ (hoặc làm tròn thành 3,200,001đ).

## Status / Related bugs

Not Run / None
