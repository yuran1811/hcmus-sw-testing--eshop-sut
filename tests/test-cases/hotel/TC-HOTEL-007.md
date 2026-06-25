# TC-HOTEL-007: Tính tiền phòng với Số người bằng 0 (Biên không hợp lệ dưới)

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
| NumPeople | 0 |
| ServiceFee | 500,000 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 0
4. Nhập Tiền dịch vụ (ServiceFee) là 500,000
5. Bấm nút Tính tiền phòng

## Expected result

Hệ thống từ chối tính toán và hiển thị thông báo lỗi 'Số lượng người phải từ 1 đến 4'.

## Status / Related bugs

Not Run / None
