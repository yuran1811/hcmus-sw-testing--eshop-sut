# TC-PLAS-019: Kết quả của lần tìm kiếm mới nhất không bị response cũ ghi đè

## Requirement ID

FR-05

## Module / Test type / Technique

Product List & Search / Reliability / Domain Testing (State/Timing Partitioning)

## Preconditions

- Có thể trì hoãn response tìm `MacBook` lâu hơn response tìm `AirPods`.
- Fixture CSDL có hai sản phẩm tên chính xác `MacBook` và `AirPods`, giúp exact/contains đều trả về tập riêng như nhau.

## Test data

| Request | Query | Delay |
| --- | --- | ---: |
| 1 | `MacBook` | 2000 ms |
| 2 | `AirPods` | 100 ms |

## Test steps

1. Gửi tìm kiếm `MacBook`.
2. Ngay lập tức đổi thành `AirPods` và gửi lần hai.
3. Chờ cả hai response hoàn tất.

## Expected result

- Giao diện cuối cùng hiển thị từ khóa và kết quả `AirPods`, không bị response `MacBook` đến muộn ghi đè.
- Trạng thái loading kết thúc chính xác và không trộn hai tập kết quả.

## EC / Partition Covered

EC18 (nhiều request đang chờ) + OC10 (latest-request-wins)

## Status / Related bugs

Not Run / N/A
