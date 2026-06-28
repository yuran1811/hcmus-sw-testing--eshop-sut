# AI Critique — Đánh giá hiệu quả sử dụng AI trong HW02

**Student ID:** 23127152  
**Công cụ:** Claude Code (claude-sonnet-4-6)  
**Ngày:** 2026-06-28  

---

## Những điều AI làm tốt

**Thiết kế test case có hệ thống.** AI hiểu đặc tả và áp dụng đúng phương pháp Domain Testing (Equivalence Partitioning) và BVA. Với FR-18, AI chủ động nhận ra cần kiểm tra cả SEC-03 (broken access control) và SEC-04 (XSS) — vượt ra ngoài chức năng hiển thị đơn thuần. Các biên trong BVA được xác định đúng điểm (ví dụ: `confirmed` vs `shipping` trong FR-10 cancel eligibility).

**Phát hiện bug bảo mật thực sự.** BUG-07 (IDOR — user token truy cập admin API) và BUG-08 (Stored XSS qua innerHTML) là hai lỗi bảo mật nghiêm trọng mà AI đặt tên đúng loại, mô tả đúng attack vector, và đề xuất test payload thực tế (`<img src=x onerror=alert(document.cookie)>`). Đây không phải kết quả ngẫu nhiên mà là từ việc AI áp dụng OWASP Top 10 vào thiết kế test.

**Tốc độ và nhất quán.** test case trải qua 4 feature được thiết kế và thực thi trong thời gian ngắn hơn nhiều so với kiểm thử thủ công hoàn toàn.

---

## Những điều AI làm chưa tốt

**Thiếu quan sát UI ngoài luồng chính.** Khi thực thi FR-10, AI bỏ sót một vấn đề nhỏ: đơn hàng ở trạng thái `canceled` vẫn hiển thị nút "Đánh dấu Đã giao" trên admin UI (backend từ chối nhưng UI gây nhầm lẫn). AI chỉ ghi chú ngắn mà không tạo bug report riêng — một tester có kinh nghiệm sẽ flag đây là UX bug.

**Không tự phát hiện lỗi kỹ thuật shell.** AI tạo ra lệnh `gh issue create` với `"$(cat <<EOF...)"` mà không biết trước rằng zsh sẽ xử lý `"` bên trong làm corrupt body. Lỗi này chỉ được phát hiện khi user chạy thực tế — AI không thể kiểm tra output của lệnh do không có quyền chạy git/gh command.

**Phụ thuộc vào spec được cung cấp.** Toàn bộ test design dựa trên `README.md` — nếu spec thiếu hoặc sai, AI cũng sẽ thiết kế sai. Không có khả năng "đặt câu hỏi business" như tester (ví dụ: "Tại sao user không được hủy từ shipping? Có ngoại lệ nào không?").

---

## Kết luận

AI phù hợp làm "test design assistant" — tăng tốc độ, đảm bảo coverage theo method, và phát hiện lỗi bảo mật theo pattern. Tuy nhiên, về mặt severity, prioritization, và UX vẫn cần con người. Mô hình hiệu quả nhất là AI + human review song song, không phải thay thế.
