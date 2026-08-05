# Gap Analysis Guide

Phần này chấm ở mức Bloom G9.3 (Analyse) — điều được đánh giá không phải là "AI có sai không" (luôn có), mà là **bạn có nhận ra sai ở đâu và giải thích được vì sao** hay không.

## Khuôn viết cho mỗi lỗi

Ba thành phần, thiếu một thì mất giá trị phân tích:

**Bằng chứng** → trỏ đúng `file:dòng` và trích đoạn code sai
**Nguyên nhân** → vì sao AI mắc lỗi này (chất lượng prompt / giới hạn mô hình / đặc thù tính năng)
**Cách sửa** → code sau khi sửa và lý do cách mới ổn định hơn

## Ví dụ đối chiếu

**Viết yếu** (không được điểm phân tích):
> AI đôi khi sinh selector không ổn định và thiếu một số assertion. Tôi đã sửa lại cho đúng.

**Viết tốt**:
> **Bằng chứng** — `tests/login.spec.ts:12`, AI sinh:
> ```typescript
> page.locator('label:has-text("Username") + input')
> ```
> **Nguyên nhân** — Prompt chỉ cung cấp mô tả test case dạng văn xuôi, không kèm DOM thật. AI suy luận locator từ giả định rằng input là sibling liền kề của label. Đây là giới hạn cố hữu khi agent làm việc "mù": không có Accessibility Tree thật, nó buộc phải đoán cấu trúc DOM và có xu hướng dựng ra locator trông hợp lý nhưng chưa được xác minh.
> **Cách sửa** —
> ```typescript
> page.getByLabel('Username')
> ```
> `getByLabel` dựa vào liên kết ngữ nghĩa `<label for>` / `aria-label` thay vì vị trí trong DOM, nên không vỡ khi lập trình viên bọc input trong `<div>` hay đổi thứ tự phần tử. Sau khi kết nối Playwright MCP và đọc snapshot thật, tôi xác nhận trang có label đúng chuẩn nên chuyển được toàn bộ locator sang nhóm accessibility.

## Các nhóm lỗi AI thường gặp

Dùng danh mục này để rà soát — không phải để chép nguyên, mà để biết chỗ nào cần nhìn kỹ.

### 1. Locator giòn
Sinh CSS/XPath theo cấu trúc (`div > div:nth-child(3) > button`, `label:has-text(...) + input`) thay vì theo vai trò/nhãn.
*Nguyên nhân điển hình*: AI chỉ đọc mã nguồn tĩnh `.jsx` nên không phân biệt được placeholder với label, không thấy được DOM sau khi render.

### 2. Assertion một chiều
Ca negative chỉ khẳng định thông báo lỗi hiện, quên khẳng định hành động **không** xảy ra (vẫn ở trang cũ, giỏ hàng không đổi).
*Nguyên nhân điển hình*: test case viết dạng "hiển thị lỗi X", AI bám sát câu chữ mà không suy ra hệ quả ngầm định.

### 3. Assertion không retry
`expect(await locator.isVisible()).toBe(true)` — trông giống assertion nhưng chụp giá trị boolean tại một thời điểm, không auto-wait.
*Nguyên nhân điển hình*: mô hình học từ nhiều mã nguồn Selenium/Jest cũ, nơi pattern này phổ biến.

### 4. Chờ cứng bằng thời gian
`page.waitForTimeout(3000)` để "cho chắc".
*Nguyên nhân điển hình*: đây là cách sửa flaky test dễ nhất và xuất hiện dày đặc trong dữ liệu huấn luyện — dù nó chỉ giấu vấn đề chứ không giải quyết.

### 5. Dữ liệu hardcode
Object `const TEST_USER = {...}` ngay trong spec, hoặc mảng test case nhúng trong file.
*Nguyên nhân điển hình*: prompt không nêu rõ ràng buộc tách dữ liệu; AI tối ưu cho "code chạy được" chứ không cho "code đúng chuẩn bài tập".

### 6. Thiếu ca biên
Sinh đủ ca positive/negative hiển nhiên nhưng bỏ sót biên thật (giá trị đúng bằng giới hạn, chuỗi rỗng, khoảng trắng, ký tự Unicode, số âm).
*Nguyên nhân điển hình*: AI phủ theo mô tả được cấp; nếu bảng test case đầu vào đã thiếu thì output cũng thiếu — lỗi truyền từ khâu thiết kế.

### 7. Bỏ qua tiền điều kiện
Viết test đăng nhập mà không đảm bảo tài khoản tồn tại; test giỏ hàng mà không đảm bảo sản phẩm còn hàng.
*Nguyên nhân điển hình*: AI không có tri thức về trạng thái cơ sở dữ liệu thật của SUT.

### 8. Không tính đến khác biệt trình duyệt
Selector hoặc assertion chỉ đúng trên Chromium.
*Nguyên nhân điển hình*: mặc định đa số ví dụ trong dữ liệu huấn luyện chạy Chromium.

## Ba loại nguyên nhân — phân biệt cho đúng

Đề bài hỏi rõ *"why it missed them (prompt quality, model limitations, or characteristics of the feature)"*. Ba loại này khác nhau và không nên gán bừa:

**Chất lượng prompt** — thông tin cần thiết vốn có sẵn nhưng bạn không cung cấp. Ví dụ: không nêu ràng buộc tách data file, nên AI hardcode. Lỗi thuộc về người dùng, và sửa được bằng cách viết prompt tốt hơn.

**Giới hạn mô hình** — thông tin không nằm trong tầm với của AI. Ví dụ: không có quyền truy cập trình duyệt nên không đọc được DOM sau render, buộc phải đoán locator. Sửa bằng công cụ (Playwright MCP), không sửa bằng prompt.

**Đặc thù tính năng** — tri thức nghiệp vụ không suy ra được từ mã nguồn. Ví dụ: quy tắc khoá tài khoản sau 5 lần là quyết định nghiệp vụ, không đọc được từ code frontend. Sửa bằng cách cung cấp đặc tả.

Phân biệt được ba loại này là điểm khác biệt giữa bài phân tích khá và bài phân tích tốt — nó cho thấy bạn hiểu AI thiếu gì chứ không chỉ thấy AI sai.

## Nguyên tắc rút ra (phần cuối báo cáo)

Đề yêu cầu nêu *"principle you have learned about collaborating with AI"*. Nguyên tắc tốt phải cụ thể và kiểm chứng được từ chính trải nghiệm trong bài, không phải câu khẩu hiệu.

*Yếu*: "Cần kiểm tra kỹ output của AI."

*Tốt*: "AI sinh code dựa trên giả định về môi trường mà nó không quan sát được. Trong bài này, mọi lỗi locator đều xuất phát từ việc AI suy DOM từ mã nguồn tĩnh. Nguyên tắc rút ra: trước khi yêu cầu sinh script, phải cấp cho AI quyền quan sát thực tế (qua Playwright MCP hoặc snapshot DOM) — chuyển nó từ trạng thái đoán sang trạng thái xác minh. Ràng buộc nêu trong prompt (tách data, số assertion pattern) cũng cần nêu trước khi sinh code, vì sửa sau tốn công hơn nhiều so với nêu đúng ngay từ đầu."
