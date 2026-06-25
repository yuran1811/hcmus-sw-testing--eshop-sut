# TC-HOTEL-013: Tính tiền phòng với Tiền dịch vụ bằng -1 (Biên không hợp lệ)

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
| ServiceFee | -1 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'A'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là -1
5. Bấm nút Tính tiền phòng

## Expected result

Hệ thống từ chối tính toán và hiển thị thông báo lỗi 'Tiền dịch vụ không được âm'.

## Status / Related bugs

Not Run / None
