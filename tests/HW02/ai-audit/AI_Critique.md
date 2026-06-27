# AI Critique — HW02 Domain Testing

## Nhận xét về quá trình sử dụng AI

Trong quá trình thực hiện bài tập HW02, tôi đã sử dụng Claude Code (claude-sonnet-4-6) như một trợ lý testing và phát hiện một số điểm yếu đáng lưu ý.

**Điểm AI làm tốt:** AI thực sự mạnh trong việc khám phá codebase một cách có hệ thống — khi được giao nhiệm vụ rõ ràng (tìm files liên quan, đọc code, xác định biến đầu vào), AI thực hiện nhanh và chính xác. AI phát hiện được hầu hết các bugs rõ ràng trong code như `login_attempts + 2`, `lockout 180000ms`, `type="text"` cho password, và `dangerouslySetInnerHTML`.

**Điểm AI thiếu sót:** AI có xu hướng thiếu các test case ở ranh giới giữa các lớp hệ thống. Cụ thể, AI không tự đề xuất kiểm tra sự không nhất quán giữa UI và API (BUG-11: mobile UI ẩn nút hủy khi shipping nhưng backend vẫn cho phép). Đây là loại bug chỉ xuất hiện khi test cross-layer — một điều AI không làm được nếu không được nhắc rõ phải kiểm tra cả frontend lẫn backend đồng thời. Tương tự, AI bỏ sót các test case security-oriented như gọi API bypass UI (cancel shipping qua API trực tiếp), vì AI mặc định tập trung vào happy path.

**Lý do AI thất bại ở đây:** AI hoạt động tốt nhất khi bài toán được scope rõ ràng (một file, một feature). Khi cần suy luận về behavior tích hợp giữa nhiều lớp, AI cần được cung cấp context đầy đủ và được hỏi đúng câu hỏi. Prompt "test feature X" thường không đủ — cần "test feature X bao gồm cả sự nhất quán với API và behavior khi bypass UI".

**Bài học rút ra:** Khi cộng tác với AI trong testing, vai trò của tester là thiết kế *chiến lược test* (quyết định loại test nào, phạm vi nào, risk nào cần ưu tiên) — còn AI đảm nhận phần *thực thi kỹ thuật* (đọc code, thiết kế test case cụ thể, viết báo cáo). Tester phải liên tục review và bổ sung các test case mà AI bỏ sót, đặc biệt ở vùng ranh giới giữa các layers và các test case security-minded. AI là công cụ mạnh nhưng cần được dẫn dắt bởi tư duy phân tích của con người để đạt coverage đầy đủ.
