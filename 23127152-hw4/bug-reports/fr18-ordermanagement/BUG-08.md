# BUG-08: XSS qua shipping_address trong Admin Orders (reconfirmed, HW04 — không automate lại được qua UI)

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-08 |
| Feature | FR-18: Order Management (Admin) |
| Severity | Critical |
| Priority | High |
| Status | Open — đã phát hiện từ HW02 (`tests/HW02/bug-reports/BUG-08.md`), **không tự động hoá lại được qua UI thuần ở HW04** |
| File:Line | `frontend-admin/src/App.jsx:801-803` |

## Mô tả

Cột "Địa chỉ" trong tab Đơn hàng của Admin dùng `dangerouslySetInnerHTML` để render trực tiếp `shipping_address` — không sanitize. Payload HTML/script chèn vào sẽ được parse thành phần tử DOM thật thay vì hiển thị dạng text.

## Vì sao KHÔNG có trong bộ automation UI-only của HW04

Đã thử thiết kế test case tự động cho bug này (tạo đơn với `shipping_address` là payload XSS, kiểm tra render trong Admin Orders), nhưng phát hiện: **`frontend-web/src/pages/Checkout.jsx` không hề gửi `shipping_address` lên server khi đặt hàng qua UI thật**:

```javascript
// Checkout.jsx — handleCheckout()
await axios.post('http://localhost:3000/api/checkout', {
  items: cart,
  total_amount: finalAmount,
  coupon_id: couponResult?.coupon_id || null
  // Không có shipping_address ở đây
}, { headers: token ? { Authorization: `Bearer ${token}` } : {} });
```

Dù backend có lưu cột `shipping_address` và `Profile.jsx` có form cho user tự sửa địa chỉ, **luồng Checkout không đọc/gửi field này** — nghĩa là mọi đơn hàng đặt qua UI thật (Cart → Checkout) luôn có `shipping_address = NULL`. Không có đường nào qua UI thuần để đưa payload XSS vào một đơn hàng; cách duy nhất là gọi thẳng API `POST /api/checkout` với `shipping_address` trong body — đúng kiểu "bypass UI" mà đề bài yêu cầu **không được dùng**.

→ Test case này bị loại khỏi bộ automation UI-only, ghi nhận là **"không automate được qua UI, lý do: SUT có lỗ hổng chức năng khác (Checkout UI không thu thập địa chỉ giao hàng) khiến vector tấn công XSS chỉ reachable qua API"**.

## Bằng chứng gốc (HW02, qua API — vẫn còn giá trị tham khảo)

Xem đầy đủ tại `tests/HW02/bug-reports/BUG-08.md`, bao gồm screenshot payload `<b>` bị render đậm và script tag được chèn vào DOM.

## Root Cause

```jsx
// frontend-admin/src/App.jsx:801-803
<td
  className="p-3 font-mono text-sm"
  dangerouslySetInnerHTML={{ __html: o.shipping_address || "Chưa cập nhật" }}
/>
// Phải là: <td className="p-3 font-mono text-sm">{o.shipping_address || "Chưa cập nhật"}</td>
```

## Ghi chú bổ sung (phát hiện phụ)

Việc Checkout UI không thu thập địa chỉ giao hàng — dù backend lưu trữ và Profile có form nhập — bản thân nó cũng là một khiếm khuyết chức năng (đơn hàng thật sự không bao giờ có địa chỉ giao) đáng ghi nhận, dù nằm ngoài phạm vi FR-18.
