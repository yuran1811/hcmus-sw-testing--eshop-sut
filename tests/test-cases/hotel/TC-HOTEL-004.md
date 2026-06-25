# TC-HOTEL-004: Tính tiền phòng với loại phòng không hợp lệ

## Requirement ID

FR-HOTEL-01

## Module / Test type / Technique

Hotel Room Calculation / Functional / Equivalence Partitioning & BVA

## Preconditions

- Hệ thống tính giá hoạt động bình thường.
- Các tham số đầu vào được nhập đầy đủ.

## Test data

| RoomType | D |
| NumDays | 2 |
| NumPeople | 2 |
| ServiceFee | 500,000 |

## Test steps

1. Nhập Loại phòng (RoomType) là 'D'
2. Nhập Số ngày ở (NumDays) là 2
3. Nhập Số lượng người (NumPeople) là 2
4. Nhập Tiền dịch vụ (ServiceFee) là 500,000
5. Bấm nút Tính tiền phòng

## Expected result

Hệ thống từ chối tính toán và hiển thị thông báo lỗi 'Loại phòng không hợp lệ'.

## Status / Related bugs

Not Run / None
