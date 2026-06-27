# BUG-10: Không có filter/search/pagination cho danh sách đơn hàng Admin

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-10 |
| Feature | FR-18: Admin Order Management |
| Severity | Minor |
| Priority | Low |
| Status | Open |
| File:Line | `backend/server.js:510-523`, `frontend-admin/src/App.jsx:777-877` |

## Mô tả

API `GET /api/admin/orders` trả về toàn bộ đơn hàng không có bộ lọc, tìm kiếm hoặc phân trang. Ở hệ thống thực với hàng nghìn đơn, điều này gây ra:
- Tải chậm
- Không thể lọc theo trạng thái, người dùng, ngày
- UI hiển thị toàn bộ mà không có pagination

## Expected

- Filter theo status (pending/confirmed/shipping/delivered/canceled)
- Filter theo user
- Pagination (hoặc ít nhất giới hạn số lượng)
- Tìm kiếm theo order ID hoặc tên người dùng

## Actual

API trả về tất cả orders không giới hạn:
```sql
SELECT orders.*, users.name as user_name 
FROM orders 
LEFT JOIN users ON orders.user_id = users.id
ORDER BY orders.id DESC
```

## Ghi chú

Đây là thiếu sót về tính năng (missing feature), không phải bug logic. Ảnh hưởng đến scalability.

## Screenshots

**Admin Orders tab — hiển thị toàn bộ danh sách, không có ô search/filter/pagination:**

![Orders Tab No Filter](../playwright-tests/screenshots/FR18/FR18-B1-orders-tab.png)

*Playwright script: `playwright-tests/fr18-focused.spec.js` — DT-FR18-23*
