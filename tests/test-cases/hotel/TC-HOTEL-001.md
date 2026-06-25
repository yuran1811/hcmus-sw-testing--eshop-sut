# TC-HOTEL-001: Tính tiền phòng loại A với số người hợp lệ (2 người), không phụ thu

## Requirement ID

FR-HOTEL-01

## Module / Test type / Technique

Hotel Room Calculation / Functional / Equivalence Partitioning & BVA

## Preconditions

- Hệ thống tính giá hoạt động bình thường.
- Các tham số đầu vào được nhập đầy đủ.

## Test data

| RoomType | A |
| NumDays | 2 |
| NumPeople | 2 |
| ServiceFee | 500,000 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 500,000
5. Bấm nút Tính tiền phòng

## Expected result

Tổng tiền trước giảm giá = 2 * (450,000 + 0) + 500,000 = 1,400,000đ.
Do 1,400,000đ < 2,000,000đ nên không được giảm giá (0%).
Tổng tiền thanh toán hiển thị đúng: 1,400,000đ.

## Status / Related bugs

Not Run / None
