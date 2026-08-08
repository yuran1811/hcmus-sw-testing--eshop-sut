# Checklist Template

Starting header row + worked example rows across all 9 categories. Copy this table and replace
the example rows with items for the target screen; add a 7th `Notes` column if the project
requires a failure-reason note per item (see Step 5 in SKILL.md).

| ID | Screen | Category | Checklist Item | Expected Result | Status |
|---|---|---|---|---|---|
| VIS-01 | Cart | Visual | Kiểm tra căn chỉnh giữa tên sản phẩm và giá tiền trong từng dòng Cart Item | Tên sản phẩm và giá tiền thẳng hàng theo chiều dọc trên mọi dòng | Not Run |
| FUN-01 | Cart | Functional | Nhấn nút Remove trên một sản phẩm trong Cart | Chỉ sản phẩm được chọn bị xóa khỏi Cart; các sản phẩm khác giữ nguyên | Not Run |
| VAL-01 | Cart | Validation | Nhập số lượng âm (-1) vào ô Quantity rồi rời khỏi ô | Hiển thị lỗi ngay dưới ô Quantity; giá trị không được chấp nhận | Not Run |
| NAV-01 | Cart | Navigation | Nhấn breadcrumb Home từ trang Cart | Điều hướng đúng về trang Home; không mất dữ liệu Cart hiện tại | Not Run |
| FDB-01 | Cart | Feedback | Nhấn Remove khi mạng chậm (throttle 3G) | Hiển thị trạng thái loading trên nút Remove cho đến khi xóa xong | Not Run |
| USB-01 | Cart | Usability | Xem tổng tiền Cart khi vừa thêm sản phẩm | Tổng tiền cập nhật ngay lập tức; không cần refresh trang | Not Run |
| RES-01 | Cart | Responsive | Mở trang Cart tại viewport 390x844 | Không xuất hiện thanh cuộn ngang; mọi phần tử hiển thị đầy đủ | Not Run |
| COM-01 | Cart | Compatibility | Mở trang Cart trên Firefox mới nhất | Giao diện và chức năng giống hệt trên Chrome | Not Run |
| ACC-01 | Cart | Accessibility | Điều hướng toàn bộ Cart bằng phím Tab | Focus hiển thị rõ ràng và theo đúng thứ tự đọc trên màn hình | Not Run |
