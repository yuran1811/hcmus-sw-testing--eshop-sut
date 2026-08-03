# GUI Testing — Kiểm thử giao diện người dùng
### Seminar Testing — Group 04

**Chủ đề:** Từ checklist → manual testing → bug report → automation testing
**Phạm vi demo:** Manual + Automation | Eshop (demo) | ShopLite (bài thực hành)

**Thành viên nhóm:**
| MSSV | Họ tên |
|---|---|
| 23127219 | Ngô Bảo Long |
| 23127482 | Trần Quốc Thiện |
| 23127484 | Nguyễn Đặng Đức Thịnh |

---

## 1. Agenda — Nội dung & mục tiêu

**Nội dung trình bày:**
- Tổng quan GUI Testing
- Các cách tiến hành
- Quy trình GUI Testing
- GUI Checklist
- Manual GUI Testing
- Responsive & Accessibility
- Automation GUI Testing
- Demo Eshop
- Bài tập ShopLite

**Người tham dự có thể (mục tiêu học tập):**
- Tự xây dựng GUI Checklist
- Thực hiện kiểm thử dựa trên checklist
- Ghi Pass/Fail, evidence và bug report
- Chọn checklist phù hợp để automation
- Áp dụng quy trình cho phần mềm khác

> Goal: có thể thực hành, không chỉ nghe lý thuyết

---

## 2. GUI Testing là gì?

> GUI Testing là quá trình kiểm tra các thành phần giao diện mà người dùng nhìn thấy và tương tác trực tiếp.

**Tiêu chí:** Hiển thị đúng · Hoạt động đúng · Dễ dùng · Phản hồi rõ

**Đối tượng kiểm tra:**
Button, Input field, Dropdown, Checkbox/Radio, Menu, Modal/Popup, Product card, Form, Error message, Loading state

> GUI = nơi user tương tác trực tiếp

---

## 3. Vì sao GUI Testing quan trọng?

**Một lỗi nhỏ có thể khiến user...**
- Không hiểu cách sử dụng
- Nhập sai dữ liệu
- Không tìm thấy chức năng
- Không hoàn thành tác vụ
- Mất niềm tin vào sản phẩm

**Tác động trực tiếp đến:**
- User Experience
- Tỷ lệ hoàn thành tác vụ
- Tính chính xác dữ liệu
- Chi phí hỗ trợ
- Uy tín sản phẩm

> Tester cần kiểm tra: nhìn đúng, dùng được, phản hồi rõ

---

## 4. GUI Testing kiểm tra những gì? (8 nhóm phạm vi)

| Nhóm | Nội dung |
|---|---|
| 🎨 Visual | Vị trí, màu sắc, kích thước, font, căn chỉnh |
| ⚙️ Functional | Button, form, menu, navigation hoạt động đúng |
| 🛡️ Validation | Dữ liệu hợp lệ, không hợp lệ và thông báo lỗi |
| 🧑‍💻 Usability | Dễ hiểu, dễ thao tác, giảm nhầm lẫn |
| 📐 Responsive | Desktop, tablet, mobile hiển thị ổn |
| 🌐 Compatibility | Nhiều browser, device, OS |
| ♿ Accessibility | Keyboard, focus, label, contrast |
| 💬 Feedback | Loading, empty, error, success state |

> Không chỉ kiểm tra "đẹp", mà kiểm tra toàn bộ trải nghiệm

---

## 5. Các cách tiến hành GUI Testing

- **Design-based** — So sánh với Figma, prototype, design system
- **Checklist-based** — Dùng danh sách tiêu chí để kiểm tra có hệ thống ⭐
- **Exploratory** — Khám phá giao diện và thử thao tác bất thường
- **Responsive** — Kiểm tra nhiều kích thước màn hình
- **Compatibility** — Kiểm tra trên browser, OS, thiết bị khác nhau
- **Accessibility** — Kiểm tra keyboard, focus, label, khả năng tiếp cận

---

## 6. Manual vs Automation — Hai hướng bổ sung cho nhau

| Manual GUI Testing | Automation GUI Testing |
|---|---|
| Tester thao tác trực tiếp | Script mô phỏng thao tác người dùng |
| Phát hiện tốt lỗi visual và usability | Phù hợp regression test |
| Linh hoạt khi UI thay đổi | Chạy nhanh và lặp lại được |
| Đánh giá trải nghiệm bằng quan sát | Kết quả nhất quán, có report |
| Tốn thời gian khi chạy lại nhiều lần | Cần viết và bảo trì test script |

> Manual nhìn như người dùng. Automation kiểm tra nhanh như máy.
> Không thay thế nhau — phải kết hợp đúng chỗ.

---

## 7. Đầu vào của GUI Testing

**Tài liệu cần có:**
- Requirement / User Story
- Acceptance Criteria
- Business Rules
- Figma / Prototype
- Design System

**Ngữ cảnh test:**
- Browser và device cần hỗ trợ
- Viewport cần kiểm tra
- Test account
- Test data
- Test environment

> Đầu vào rõ → checklist rõ → bug report rõ

---

## 8. Quy trình GUI Testing (end-to-end)

```
Requirement → Component → State → Checklist → Execute → Bug Report → Re-test
```

**Trước khi test:** Đọc requirement, xác định màn hình, liệt kê component, chuẩn bị data và environment.

**Sau khi test:** Ghi actual result, pass/fail, evidence, bug report, re-test và regression.

> Checklist nằm ở trung tâm quy trình

---

## 9. Trạng thái (State) của GUI Component

| Button | Input | Màn hình |
|---|---|---|
| Default | Empty | Initial |
| Hover / Focus | Focus | Loading |
| Active | Valid / Invalid | Empty |
| Disabled | Disabled | Error |
| Loading | Read-only | Success |
| Success / Error | Required | No Permission |

> Rất nhiều lỗi GUI nằm ở trạng thái phụ, không phải trạng thái mặc định

---

## 10. GUI Checklist là gì?

> GUI Checklist là danh sách tiêu chí cần kiểm tra trên giao diện, giúp tester kiểm tra đều tay và không bỏ sót trạng thái quan trọng.

**Mục đích:**
- Tránh bỏ sót lỗi
- Chuẩn hóa cách kiểm thử
- Dễ chia công việc
- Có thể tái sử dụng
- Dễ theo dõi Pass/Fail
- Phù hợp kiểm tra nhiều màn hình

> Checklist không thay thế test case, nhưng là nền tảng để test có hệ thống

---

## 11. Các phương pháp xây dựng Checklist

| Phương pháp | Mô tả |
|---|---|
| Requirement-based | Từ requirement, user story, acceptance criteria |
| Design-based | So sánh với Figma, prototype, design system |
| Component-based | Liệt kê button, input, menu, modal, card |
| State-based | Loading, empty, error, success, disabled |
| Heuristic-based | Dựa trên usability principles như Nielsen Heuristics |
| Risk-based | Ưu tiên login, cart, checkout, payment |
| Experience-based | Dựa trên lỗi cũ, kinh nghiệm, exploratory testing |
| **Output** | Checklist có expected result rõ và có thể thực thi |

> Câu hỏi chính: checklist này được tạo từ đâu?

---

## 12. Cấu trúc GUI Checklist (template chuẩn)

| Cột | Ý nghĩa | Ví dụ |
|---|---|---|
| Checklist ID | Mã tiêu chí | FUN-01 |
| Screen / Feature | Màn hình hoặc chức năng | Cart |
| Category | Nhóm kiểm thử | Functional |
| Checklist Item | Nội dung cần kiểm tra | Xóa sản phẩm trong giỏ |
| Expected Result | Kết quả mong đợi | Chỉ sản phẩm được chọn bị xóa |
| Actual / Status / Evidence | Kết quả thực tế, trạng thái, minh chứng | Fail + screenshot |

> Checklist tốt phải đủ rõ để người khác chạy lại được

---

## 13. Ví dụ Checklist cho Eshop

| ID | Category | Checklist Item | Expected Result |
|---|---|---|---|
| VIS-01 | Visual | Kiểm tra vị trí button trên product card | Các button thẳng hàng |
| FUN-01 | Functional | Chọn danh mục sản phẩm | Hiển thị đúng danh mục |
| FUN-02 | Functional | Tìm kiếm sản phẩm | Hiển thị sản phẩm phù hợp |
| FUN-03 | Functional | Xóa một sản phẩm trong Cart | Chỉ sản phẩm được chọn bị xóa |
| VAL-01 | Validation | Bỏ trống Address và City | Lỗi nằm đúng dưới từng field |
| RES-01 | Responsive | Products tại viewport 390px | Không tràn ngang |
| ACC-01 | Accessibility | Điều hướng bằng Tab | Focus rõ và đúng thứ tự |

---

## 14. Cách sử dụng GUI Checklist (thực thi)

**Quy trình thực hiện:**
1. Chọn đúng browser, device, viewport
2. Chuẩn bị precondition
3. Thực hiện thao tác
4. So sánh Expected với Actual
5. Ghi Status và Evidence
6. Nếu Fail, tạo Bug Report

**Ví dụ kết quả:**

| ID | Actual | Status |
|---|---|---|
| RES-01 | Có thanh cuộn ngang tại 390px | Fail |
| ACC-01 | Focus rõ khi nhấn Tab | Pass |
| FUN-02 | Search không phản hồi rõ | Fail |

> Checklist phải được điền Actual Result, không chỉ viết rồi để đó

---

## 15. Manual Testing: Test Case Design

**Một GUI Test Case nên có:**
Test Case ID · Title · Preconditions · Test Steps · Test Data · Expected Result · Actual Result · Status · Evidence · Notes

**Ví dụ — TC_CART_001:** Xóa sản phẩm đầu tiên trong Cart
1. Thêm hai sản phẩm vào Cart
2. Mở Cart
3. Nhấn Remove tại sản phẩm đầu tiên

**Expected:** Chỉ sản phẩm đầu tiên bị xóa.

> Checklist giúp bao phủ rộng, Test Case giúp tái hiện chính xác

---

## 16. Manual Testing: Bug Report

**Bug report cần có:**
- Bug ID & Title
- Environment
- Preconditions
- Steps to Reproduce
- Expected vs Actual
- Severity & Priority
- Screenshot / Video

**Nguyên tắc viết:**
- Tiêu đề mô tả đúng lỗi
- Steps rõ ràng, chạy lại được
- Expected và Actual không mơ hồ
- Environment đầy đủ
- Evidence phải thể hiện được lỗi

> Developer đọc là tái hiện được lỗi

---

## 17. Từ Checklist đến Bug Report

```
Checklist Item → Execute → Fail → Evidence → Bug Report → Re-test
```

**Ví dụ:**
- **Checklist:** Product List không được tràn ngang tại viewport 390px.
- **Bug Report — Title:** Product List bị tràn ngang tại viewport 390px. **Severity:** Medium. **Priority:** High.

> Checklist Fail không dừng ở Fail — phải chuyển thành bug có evidence

---

## 18. Test Result & Test Summary

**Ví dụ thống kê:**

| Chỉ số | Giá trị |
|---|---|
| Total | 20 |
| Pass | 10 |
| Fail | 8 |
| Blocked | 1 |
| Not Run | 1 |
| Pass Rate | 50% |

**Test Summary cần nêu:**
- Khu vực nhiều lỗi nhất
- Lỗi ảnh hưởng luồng chính
- Viewport hoặc browser có rủi ro
- Lỗi Severity cao
- Có thể release hay chưa
- Phần cần regression test

> Báo cáo giúp biến kết quả test thành quyết định

---

## 19. Kiểm thử trên nhiều môi trường (Responsive / Compatibility / Accessibility)

| 📱 Responsive | 🌐 Compatibility | ♿ Accessibility |
|---|---|---|
| 1440×900 | Chrome | Tab navigation |
| 768×1024 | Edge | Focus indicator |
| 390×844 | Firefox nếu có | Input label |
| Không tràn ngang | Font, layout nhất quán | Enter / Space |
| Menu không bị che | Luồng chính hoạt động | Error message rõ |

> Cùng một checklist có thể chạy trên nhiều environment khác nhau

---

## 20. Automation GUI Testing

**Automation mô phỏng user:**
Mở browser → Truy cập trang → Nhập dữ liệu → Click button → Kiểm tra URL → Kiểm tra text hiển thị → Chụp screenshot → Xuất test report

**Vì sao chọn Playwright?**
- Dễ setup
- Hỗ trợ Chromium, Firefox, WebKit
- Auto-wait tốt
- Có screenshot, video, trace
- Phù hợp demo E2E

> Automation phù hợp nhất với flow ổn định và cần chạy lại nhiều lần

---

## 21. Từ Checklist đến Automation Test

**Phù hợp automation:** Login, Search, Navigation, Add to Cart, Remove Cart Item, Form validation, Checkout, Horizontal overflow cơ bản

**Ví dụ Playwright:**
```javascript
test('RES-01: không tràn ngang tại 390px', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto('/products');

  const hasOverflow = await page.evaluate(() =>
    document.documentElement.scrollWidth >
    document.documentElement.clientWidth
  );

  expect(hasOverflow).toBeFalsy();
});
```

> Không phải checklist nào cũng nên automation

---

## 22. Kế hoạch demo trên Eshop

| Demo 1 📝 | Demo 2 📐 | Demo 3 🤖 |
|---|---|---|
| **Manual GUI Testing bằng Checklist** | **Responsive, Compatibility, Accessibility** | **Automation bằng Playwright** |
| Tạo checklist | Desktop, tablet, mobile | Chọn checklist ổn định |
| Chạy Visual, Functional, Validation | Chrome, Edge | Viết test |
| Ghi Pass/Fail | Tab, focus, menu, overflow | Chạy report |
| Viết bug report | | So sánh manual vs automation |

> Eshop là hệ thống demo chính trong video

---

## 23. Bài tập thực hành: ShopLite

**Yêu cầu:**
- Chọn một màn hình hoặc chức năng
- Xác định component và trạng thái
- Chọn phương pháp xây dựng checklist
- Viết ít nhất 10 checklist item
- Bao phủ ít nhất 3 nhóm GUI Testing

**Kết quả cần nộp:**
- Checklist đã chạy
- Actual Result và Pass/Fail
- Kiểm tra ít nhất 2 viewport
- Ít nhất 1 Bug Report
- Đề xuất 2 checklist item phù hợp để automation

> Eshop để xem nhóm làm mẫu. ShopLite để người tham dự tự áp dụng.

---

## 24. Tổng kết

| 👀 Manual | ✅ Checklist | ⚡ Automation |
|---|---|---|
| Giúp quan sát giao diện như người dùng thật | Giúp kiểm tra có hệ thống và không bỏ sót | Giúp kiểm tra lại nhanh và nhất quán |

> **GUI Testing hiệu quả = đúng cơ sở + checklist rõ + evidence tốt + manual/automation đúng chỗ.**
