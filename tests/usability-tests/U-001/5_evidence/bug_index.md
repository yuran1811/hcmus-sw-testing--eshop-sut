# Bug index — U-001

> Chỉ dùng cho bug/usability finding thật. Không tạo issue từ giả thuyết hoặc template trống.

## Quy ước

- Mỗi finding đáng kể tạo một bug Markdown riêng.
- Evidence có thể là screenshot, video timestamp hoặc session note.
- `Severity` và `Priority` là hai trường độc lập.
- GitHub Issue chỉ tạo khi sinh viên đã review xong bug file.

## Index

| BUG-ID | Finding source | Sessions | Severity | Priority | Status | Evidence | GitHub Issue |
| ------ | -------------- | -------- | -------- | -------- | ------ | -------- | ------------ |
|        |                |          |          |          |        |          |              |

## Gate trước khi file Issue

[] Finding có P ID + timestamp/evidence.
[] Reproduce lại trên đúng build và từ starting state rõ ràng.
[] Expected bám FR hoặc kỳ vọng usability hợp lý.
[] Actual chỉ mô tả điều đã quan sát/xác minh.
[] Severity và Priority đã được review độc lập.
[] Evidence file mở được và đã redacted.
[] Bug file trỏ về finding gốc.
[] Sau khi tạo Issue, cập nhật link hai chiều.

## Workflow

`New → Triaged → Assigned → In Progress → Ready for Retest → Verified/Closed`
