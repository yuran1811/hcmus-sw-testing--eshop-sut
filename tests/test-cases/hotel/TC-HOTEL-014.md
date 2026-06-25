# TC-HOTEL-014: Kiểm tra ngưỡng giảm giá 0% (Tổng tiền trước giảm giá = 1,999,999đ - Biên 3-Point)

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
| ServiceFee | 1,099,999 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 1,099,999
5. Bấm nút Tính tiền phòng

## Expected result

Tổng tiền trước giảm giá = 2 * (450,000 + 0) + 1,099,999 = 1,999,999đ.
Do 1,999,999đ < 2,000,000đ nên không được giảm giá (0%).
Tổng tiền thanh toán hiển thị đúng: 1,999,999đ.

## Status / Related bugs

Not Run / None
