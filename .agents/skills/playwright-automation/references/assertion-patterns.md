# Assertion Patterns

Yêu cầu: **tối thiểu 3 pattern khác nhau** trên toàn suite của mỗi tính năng. Cần hiểu "khác nhau" ở đây là khác về *loại điều được khẳng định*, không phải khác tên hàm.

## Điều gì tính là một pattern riêng

`toHaveText()` và `toContainText()` cùng khẳng định nội dung văn bản — tính là **một** pattern. Ngược lại `toHaveURL()` (điều hướng) và `toBeVisible()` (hiển thị) khẳng định hai loại điều khác nhau — tính là **hai** pattern.

Sáu nhóm dưới đây là sáu pattern độc lập:

| Nhóm | Khẳng định điều gì | Hàm tiêu biểu |
|---|---|---|
| **Hiển thị** | Phần tử có/không xuất hiện | `toBeVisible()`, `toBeHidden()` |
| **Nội dung** | Văn bản đúng như mong đợi | `toHaveText()`, `toContainText()` |
| **Điều hướng** | URL/tiêu đề trang sau hành động | `toHaveURL()`, `toHaveTitle()` |
| **Trạng thái phần tử** | Enabled/disabled/checked/giá trị input | `toBeDisabled()`, `toHaveValue()`, `toBeChecked()` |
| **Số lượng** | Bao nhiêu phần tử khớp locator | `toHaveCount()` |
| **Phản hồi mạng/API** | Mã trạng thái, nội dung response | `expect(response.status()).toBe(...)` |

Dùng 3 nhóm là đủ điều kiện, nhưng 4–5 nhóm cho thấy suite phủ sâu hơn và giúp phần gap analysis có nội dung để phân tích.

## Map ca kiểm thử vào pattern

Lập bảng này trong Phase 1 và giữ nó trong báo cáo — TA dùng nó để kiểm nhanh yêu cầu ≥3 pattern:

| TC-ID | Loại | Pattern chính | Pattern phụ |
|---|---|---|---|
| TC-LOGIN-001 | positive | Điều hướng (`toHaveURL`) | Nội dung (`toContainText` header) |
| TC-LOGIN-003 | negative | Hiển thị (`toBeVisible` thông báo lỗi) | Điều hướng (vẫn ở `/login`) |
| TC-LOGIN-008 | edge | Trạng thái (`toBeDisabled` nút submit) | — |
| TC-LOGIN-012 | edge | Nội dung (thông báo khoá) | Số lượng (`toHaveCount` số lần thử) |

## Nguyên tắc theo loại ca

**Ca positive** — khẳng định trạng thái mới đã đến. Chỉ kiểm tra "không có lỗi" là quá yếu; phải kiểm tra kết quả mong đợi thực sự xuất hiện.

```typescript
// Yếu: chỉ biết không crash
await expect(page.locator('.error')).toBeHidden();

// Tốt: khẳng định đích đến
await expect(page).toHaveURL('/');
await expect(page.getByRole('banner')).toContainText(`Chào, ${tc.expected.userName}`);
```

**Ca negative** — khẳng định cả hai chiều: lỗi *có* hiện, và hành động *không* xảy ra. Bỏ vế thứ hai là lỗ hổng phổ biến: một ứng dụng vừa hiện lỗi vừa cho vào trang chủ vẫn "pass" test viết thiếu.

```typescript
await expect(errorMessage(page)).toHaveText(tc.expected.message);
await expect(page).toHaveURL(/\/login/);   // vế thứ hai, đừng bỏ
```

**Ca edge/biên** — khẳng định đúng tại điểm biên, không chỉ khẳng định "có lỗi". Nếu ca kiểm tra giới hạn 100 ký tự, phải phân biệt được 100 (chấp nhận) với 101 (từ chối), chứ không chỉ "nhập dài thì báo lỗi".

## Web-first assertion và auto-wait

Playwright tự động chờ và thử lại các `expect()` trên locator cho đến khi đạt hoặc hết timeout. Đây là lý do không cần `waitForTimeout`.

```typescript
// Đúng: auto-wait, retry tới khi element hiện
await expect(page.getByText('Đặt hàng thành công')).toBeVisible();

// Sai: chờ cứng, vừa chậm vừa vẫn flaky
await page.waitForTimeout(3000);
expect(await page.getByText('Đặt hàng thành công').isVisible()).toBe(true);
```

Chú ý dòng sai thứ hai: `await ... .isVisible()` trả về boolean **ngay lập tức**, không retry. Đây là lỗi AI hay mắc vì nó "trông giống" assertion đúng. Quy tắc: `expect()` phải bọc **locator**, không bọc kết quả của một hàm đã `await`.

## Chờ phản hồi mạng khi cần

Với ca phụ thuộc API cụ thể (ví dụ áp mã giảm giá), khẳng định luôn cả phản hồi:

```typescript
const [response] = await Promise.all([
  page.waitForResponse(r => r.url().includes('/api/coupon') && r.request().method() === 'POST'),
  applyCouponButton(page).click(),
]);
expect(response.status()).toBe(tc.expected.httpStatus);
await expect(discountLine(page)).toHaveText(tc.expected.discountText);
```

Pattern này vừa tính là nhóm thứ sáu, vừa giúp phân biệt lỗi frontend với lỗi backend khi debug — nếu API trả 200 mà UI không cập nhật, bug nằm ở frontend.

## Soft assertion khi cần kiểm nhiều điểm

Khi muốn thu thập tất cả sai lệch trong một lần chạy thay vì dừng ở lỗi đầu tiên:

```typescript
await expect.soft(productTitle(page)).toHaveText(tc.expected.title);
await expect.soft(productPrice(page)).toHaveText(tc.expected.price);
await expect.soft(stockBadge(page)).toBeVisible();
```

Hữu ích cho ca kiểm tra trang chi tiết nhiều trường. Lưu ý test vẫn được đánh dấu fail nếu có soft assertion nào không đạt — chỉ khác là nó chạy tiếp để báo đủ lỗi.
