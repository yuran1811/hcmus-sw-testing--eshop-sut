# Chọn tính năng (Mục 5) & Chuẩn bị Bảo vệ vấn đáp (Mục 13)

## 1. Chọn tính năng — tránh trùng lặp trong nhóm

Đề bài yêu cầu: tự động hóa **cùng 3 tính năng web đã chọn ở HW02**, mỗi Nhóm A/B/C chọn
đúng 1 tính năng, và **không trùng** với các thành viên khác trong nhóm.

Quy trình gợi ý:
1. Lập bảng dùng chung cho cả nhóm (Google Sheet hoặc file `feature-selection.md` trong
   repo) liệt kê: Họ tên — MSSV — Tính năng Nhóm A — Tính năng Nhóm B — Tính năng Nhóm C.
2. Mỗi thành viên điền lựa chọn của mình vào bảng **trước khi bắt đầu code** để cả nhóm
   thấy được xung đột sớm.
3. Nếu bạn chưa hoàn thành HW02: tự khai báo 3 tính năng (1 mỗi Nhóm A/B/C) trực tiếp
   trong báo cáo HW04, kèm 1 câu nêu rõ lý do (VD: "HW02 chưa hoàn thành do ...").

Mẫu khai báo trong báo cáo:
```markdown
## Tính năng đã chọn
| Nhóm | Mã | Tên tính năng | Trùng với HW02? |
|---|---|---|---|
| A | FR-02 | Đăng nhập và khóa tài khoản | Có, giữ nguyên như HW02 |
| B | FR-09 | Mã giảm giá | Có, giữ nguyên như HW02 |
| C | FR-14 | Quản lý danh mục (CRUD) | Có, giữ nguyên như HW02 |
```

## 2. Chuẩn bị Bảo vệ vấn đáp (5–7 phút, ngẫu nhiên 30% sinh viên)

Vì có thể bị gọi bảo vệ, hãy chuẩn bị sẵn khả năng trả lời (không cần nộp riêng, nhưng nên
chuẩn bị trước khi hết hạn):

**Câu hỏi khả năng cao sẽ được hỏi — và nơi tìm câu trả lời trong bài làm của bạn:**

| Câu hỏi | Chuẩn bị dựa trên |
|---|---|
| "Giải thích vì sao bạn chọn assertion pattern X cho test case Y?" | `playwright-setup.md` §4 + chính test case đó |
| "Test case này thuộc kỹ thuật thiết kế nào?" | Bảng test case ở `test-design-techniques.md` |
| "AI ban đầu viết gì, tại sao sai, bạn sửa thế nào?" | Log fix ở `review-and-critique.md` §2 |
| "Vì sao bug này không tự động hóa được?" | Mục "Test case không tự động hóa được" trong bug report |
| "Chạy thử lại 1 test ngay bây giờ được không?" | Đảm bảo project chạy được `npx playwright test` trên máy demo, không chỉ chạy 1 lần rồi thôi |
| "MSSV trong report này của ai, sao xác nhận đây là bạn tự chạy?" | Giải thích cơ chế `metadata`/`environmentInfo` trong config — xem `playwright-setup.md` §6 |

**Mẹo:** luyện tập chạy lại toàn bộ suite từ đầu (`git clone` repo vào 1 máy sạch → cài
dependency → chạy) ít nhất 1 lần trước hạn nộp, để chắc chắn khi bị hỏi vấn đáp bạn có thể
demo trực tiếp mà không gặp lỗi môi trường.
