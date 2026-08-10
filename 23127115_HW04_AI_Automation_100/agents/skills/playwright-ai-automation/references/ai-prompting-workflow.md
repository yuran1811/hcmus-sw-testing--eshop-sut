# Quy trình dẫn dắt AI theo từng bước (không dùng 1 prompt chung chung)

Nguyên tắc cốt lõi của đề bài: **"drive an AI tool — step by step, not with a single
generic prompt"**. Không bao giờ gõ kiểu *"viết script Playwright test đăng nhập cho tôi"*
rồi copy-paste nguyên khối. Thay vào đó, chia nhỏ thành 5 giai đoạn, mỗi giai đoạn có một
prompt riêng, và **bạn đọc + sửa output trước khi sang giai đoạn tiếp theo**.

## Giai đoạn 0 — Chuẩn bị input cho AI

Trước khi prompt, chuẩn bị sẵn:
1. Bảng test case (từ `references/test-design-techniques.md`).
2. Cấu trúc HTML/DOM thực tế của trang (chụp `page.locator` khả dụng, hoặc dán đoạn HTML
   liên quan) — AI cho locator chính xác hơn nhiều nếu thấy DOM thật thay vì đoán.
3. Quy ước đặt tên file trong repo của bạn (`pages/LoginPage.ts`, `tests/login.spec.ts`...).

## Giai đoạn 1 — Sinh Page Object trước

**Prompt mẫu:**
> "Đây là HTML của trang đăng nhập EShop: [dán HTML]. Hãy viết một Page Object
> `LoginPage` bằng Playwright + TypeScript, gồm các locator (ưu tiên `getByRole`,
> `getByLabel`, `getByTestId` — tránh CSS selector dựa vào class do framework CSS sinh
> ra) và các method `login(email, password)`, `getErrorMessage()`. Không viết test case,
> chỉ viết Page Object."

**Việc bạn phải làm sau khi nhận kết quả:** kiểm tra từng locator có thực sự khớp DOM
không (AI hay đoán locator generic như `.btn` — đây chính là điểm cần ghi lại trong Bước
4 Review). Sửa lại bằng `data-testid` hoặc `getByRole` chính xác trước khi đi tiếp.

## Giai đoạn 2 — Sinh từng test case một (hoặc theo nhóm nhỏ 2–3 case liên quan)

**Prompt mẫu (lặp lại cho từng TC hoặc nhóm nhỏ):**
> "Dùng Page Object `LoginPage` ở trên, viết 1 test Playwright cho test case sau:
> [dán đúng 1 dòng trong bảng test case, ví dụ TC-02: đăng nhập sai mật khẩu]. Test phải
> assert đúng thông báo lỗi hiển thị trên UI, dùng `expect(locator).toHaveText(...)`."

Lặp lại cho tất cả ≥12 test case, mỗi lần chỉ đưa 1–3 case. Điều này giúp bạn review kịp
thời thay vì phải đọc lại 400 dòng code một lúc — và cũng chính là "AI-first strategy"
đề bài yêu cầu (dẫn dắt AI theo từng bước của kỹ thuật, không phải một prompt khổng lồ).

## Giai đoạn 3 — Trích xuất dữ liệu test ra file riêng

**Prompt mẫu:**
> "Trong các test trên, hãy trích toàn bộ giá trị input/expected (email, password, error
> message mong đợi...) ra một mảng JSON theo cấu trúc `{id, email, password, expectedError}`.
> Sau đó viết lại các test để đọc dữ liệu từ file `data/login.json` bằng vòng lặp
> `for (const tc of testData)`, dùng `test(`${tc.id} - ...`, ...)` để mỗi dòng dữ liệu
> vẫn hiển thị như 1 test case riêng trong report."

Việc này bắt buộc để đạt yêu cầu "test data trong file `.csv`/`.json` riêng, không hardcode
mảng/object trong script."

## Giai đoạn 4 — Đa dạng hóa assertion pattern

**Prompt mẫu:**
> "Rà soát lại các test này và đảm bảo có ít nhất 3 kiểu assertion khác nhau trong toàn bộ
> bộ test của tính năng này: (1) assertion trên trạng thái/thuộc tính phần tử UI — ví dụ
> `toBeVisible`/`toBeDisabled`; (2) assertion trên nội dung/giá trị — ví dụ `toHaveText`/
> `toHaveValue`; (3) assertion trên phản hồi mạng hoặc URL — ví dụ `expect(response.status()).toBe(200)`
> hoặc `toHaveURL`. Hãy chỉ ra assertion nào thuộc loại nào."

## Giai đoạn 5 — Ghi log ngay lập tức (không để dồn)

Ngay sau mỗi giai đoạn, ghi lại tương tác vào AI Audit Log bằng skill đồng hành
`ai-audit-logger` (hoặc chạy `scripts/log_interaction.py` của skill đó) — gồm tên công cụ
AI, thời điểm, prompt, và output. Đừng đợi đến cuối buổi mới nhớ lại — dễ thiếu và sai.

## Vì sao chia nhỏ như vậy lại quan trọng (dùng cho phần AI Critique)

Khi bạn chia prompt thành nhiều giai đoạn nhỏ, bạn sẽ **thấy rõ AI sai ở giai đoạn nào**:
- Nếu locator sai → thường là do AI không thấy DOM thật, chỉ đoán theo tên biến thông
  thường (giai đoạn 1).
- Nếu thiếu edge case → thường do bảng test case ở Bước 1 (test-design) chưa đủ chi tiết,
  hoặc bạn quên đưa case đó vào prompt giai đoạn 2.
- Nếu assertion yếu (chỉ check `toBeVisible` cho mọi thứ) → do prompt giai đoạn 2 không
  yêu cầu rõ loại assertion, AI mặc định chọn cái dễ nhất.
- Nếu wait không ổn định (dùng `page.waitForTimeout` cố định) → do AI được huấn luyện
  trên nhiều ví dụ code cũ dùng sleep thay vì auto-waiting của Playwright; cần yêu cầu rõ
  "không dùng waitForTimeout, dùng auto-waiting/expect polling".

Ghi lại đúng nguyên nhân này (không chỉ hiện tượng) là thứ khiến bài phân tích Gap
Analysis / AI Critique (Bước 4) có chiều sâu, thay vì liệt kê "AI sai vài chỗ" chung chung.
