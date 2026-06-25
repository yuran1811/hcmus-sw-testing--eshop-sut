# TC-HOTEL-006: Tính tiền phòng với Số ngày ở bằng 0 (Biên không hợp lệ)

## Requirement ID

FR-HOTEL-01

## Module / Test type / Technique

Hotel Room Calculation / Functional / Boundary Value Analysis (2-Point)

## Preconditions

- Hệ thống tính giá hoạt động bình thường.
- Các tham số đầu vào được nhập đầy đủ.

## Test data

| RoomType | A |
| NumDays | 0 |
| NumPeople | 2 |
| ServiceFee | 500,000 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 0
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 500,000
5. Bấm nút Tính tiền phòng

## Expected result

Hệ thống từ chối tính toán và hiển thị thông báo lỗi 'Số ngày ở phải lớn hơn hoặc bằng 1'.

## Status / Related bugs

Not Run / None
