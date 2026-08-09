# TC-PLAS-013: Payload SQL injection không làm thay đổi tập kết quả

## Requirement ID

FR-05, SEC-05

## Module / Test type / Technique

Product List & Search / Security / Domain Testing (Equivalence Partitioning)

## Preconditions

- CSDL có ít nhất ba sản phẩm và không sản phẩm nào chứa payload thử nghiệm trong tên.

## Test data

| Field | Value |
| --- | --- |
| search | `' OR 1=1 --` |

## Test steps

1. Nhập payload và gửi tìm kiếm.
2. Kiểm tra response API, số kết quả, giao diện và log lỗi hiển thị cho người dùng.

## Expected result

- Payload được coi là dữ liệu, không trả về toàn bộ danh sách và không làm thay đổi câu SQL.
- Hiển thị empty state thân thiện; không HTTP 500, không lộ lỗi CSDL, không render payload thành HTML.

## EC / Partition Covered

EC15 (SQL injection payload) + OC3 + OC5

## Status / Related bugs

Pass / None

