# Rà soát script do AI tạo (Human Review) & khung viết AI Critique

## 1. Checklist rà soát — đi qua từng test sau khi AI sinh ra

| Hạng mục | Câu hỏi kiểm tra | Lỗi thường gặp của AI |
|---|---|---|
| **Locator** | Có dùng `getByRole`/`getByLabel`/`getByTestId` thay vì CSS class không? Có test thử chạy được không? | AI đoán class như `.btn-primary`, `.form-control` — dễ vỡ khi đổi theme/CSS framework |
| **Wait/Timing** | Có dùng `page.waitForTimeout(ms)` cố định không? | AI hay chèn `waitForTimeout` "cho chắc" thay vì để Playwright auto-wait hoặc dùng `expect(...).toBeVisible()` polling |
| **Assertion** | Assertion có kiểm tra đúng hành vi nghiệp vụ không, hay chỉ check phần tử "có tồn tại"? | AI hay dừng ở `toBeVisible()` cho mọi thứ, bỏ qua việc kiểm tra giá trị/nội dung thực tế |
| **Edge case** | Bảng 12 test case ở Bước 1 có được chuyển hết thành script không, hay AI tự rút gọn? | AI có xu hướng bỏ qua case biên (BVA) hoặc case phủ định (negative) nếu prompt không nêu rõ |
| **Test data** | Dữ liệu có thực tế không (email trùng làm 2 test case đá nhau, số lượng vượt tồn kho thật)? | AI sinh dữ liệu giả không khớp trạng thái thật của SUT (VD dùng tài khoản chưa tồn tại cho case "positive") |
| **Độc lập giữa các test** | Test có phụ thuộc thứ tự chạy hoặc dữ liệu để lại từ test trước không? | AI hay quên `test.beforeEach` để reset trạng thái (giỏ hàng, session) |
| **Cross-browser** | Selector/hành vi có khác nhau giữa Chromium/Firefox/WebKit không (đặc biệt input type=date, file upload)? | AI thường chỉ test tư duy trên Chromium |

## 2. Cách ghi log 1 lượt fix (dùng cho báo cáo "Review and fix")

Mẫu ghi cho mỗi lỗi tìm thấy:

```markdown
### Fix #1 — Locator dễ vỡ trong LoginPage.spec.ts
- **AI tạo ra:** `page.locator('.btn.btn-primary')`
- **Vấn đề:** class CSS này dùng chung cho nhiều nút trên trang → click nhầm nút "Đăng ký" khi layout đổi thứ tự.
- **Sửa thành:** `page.getByRole('button', { name: 'Đăng nhập' })`
- **Vì sao AI mắc lỗi:** prompt ban đầu không cung cấp DOM thật, chỉ mô tả bằng lời "nút đăng nhập" → AI đoán selector theo pattern phổ biến trong dữ liệu huấn luyện thay vì selector thực tế của EShop.
```

Lặp lại cho mọi lỗi đáng kể bạn tìm thấy — càng cụ thể càng tốt cho phần chấm điểm
"Review and fix (human review)".

## 3. Khung viết đoạn AI Critique (200–300 từ)

Đề bài yêu cầu trả lời 3 câu hỏi trong 1 đoạn văn liền mạch. Gợi ý cấu trúc 4 phần (mỗi
phần ~60–80 từ):

1. **Mở đầu (1–2 câu):** Tóm tắt bạn dùng AI nào, cho tính năng nào, tổng quan mức độ hữu ích.
2. **AI sai/thiếu/thiên vị ở đâu (trọng tâm):** Nêu 2–3 lỗi cụ thể nhất từ mục 2 ở trên
   (ví dụ: locator dễ vỡ, thiếu edge case biên tồn kho, assertion hời hợt). Nêu rõ, không
   chung chung.
3. **Vì sao AI không tự phát hiện ra:** Liên hệ tới nguyên nhân gốc — thiếu ngữ cảnh DOM
   thật, prompt chưa đủ ràng buộc, hoặc đặc điểm riêng của tính năng (VD: state machine
   nhiều nhánh khiến AI dễ bỏ sót nhánh invalid transition vì đề bài mô tả bằng văn xuôi
   thay vì sơ đồ).
4. **Nguyên tắc rút ra về hợp tác với AI:** Ví dụ — "chia nhỏ prompt theo từng giai đoạn
   giúp phát hiện lỗi sớm hơn", "luôn cung cấp DOM/ngữ cảnh thật thay vì mô tả bằng lời",
   "AI giỏi sinh cấu trúc lặp lại nhưng yếu ở suy luận nghiệp vụ ẩn (business rule ngầm)".

Không dùng câu chung chung kiểu "AI rất hữu ích nhưng cần con người kiểm tra" mà không có
ví dụ cụ thể — phần này được chấm dựa trên chiều sâu phân tích, không phải độ dài.

## 4. Việc bạn PHẢI tự làm (không giao cho AI)

- Xác nhận từng assertion phản ánh đúng nghiệp vụ thật của EShop (chạy tay 1 lần để đối chiếu).
- Quyết định test case nào không tự động hóa được và ghi lý do (VD: bước xác thực OTP qua email thật, thanh toán qua cổng bên thứ 3 sandbox không ổn định).
- Tự chịu trách nhiệm cuối cùng cho script — đề bài nói rõ "You are fully responsible for the final scripts."
