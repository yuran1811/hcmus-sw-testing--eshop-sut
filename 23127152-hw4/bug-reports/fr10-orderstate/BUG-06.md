# BUG-06: canceled → delivered được cho phép (final state bị lọt) (reconfirmed, HW04)

## Thông tin

| Trường | Giá trị |
|--------|---------|
| Bug ID | BUG-06 |
| Feature | FR-10: Order State Machine |
| Severity | Major |
| Priority | High |
| Status | Open (đã phát hiện từ HW02, vẫn còn ở HW04) |
| Phát hiện lại bởi | `e2e/fr10-orderstate/fr10-orderstate.spec.ts` — FR10-TC10 (Playwright, 3 browser) |
| File:Line | `backend/server.js:550-551` |

## Mô tả

`canceled` được mô tả là **final state** (không chuyển sang trạng thái khác), nhưng code có một nhánh riêng cho phép chuyển `canceled → delivered`.

## Bằng chứng tự động hoá (HW04)

`FR10-TC10` dựng 1 đơn hàng thật qua `POST /api/checkout`, đưa về trạng thái `canceled` qua API hợp lệ, sau đó gọi `PUT /api/admin/orders/:id/status { status: "delivered" }` và assert theo spec (`400`). Test fail nhất quán trên cả 3 browser:

```
Expected: 400
Received: 200
```

Case đối chứng `FR10-TC11` (canceled → shipping) vẫn đúng (`400`), chứng minh lỗi chỉ nằm ở đúng 1 nhánh `canceled → delivered`.

## Root Cause

```javascript
// backend/server.js:550-551
if (currentStatus === "canceled" && status === "delivered")
  isValidTransition = true;  // Sai spec — canceled phải là final state
```

## Screenshot

Test case này thuần API (không thao tác UI, đúng bản chất của state-machine backend), nên bằng chứng trực tiếp và trung thực nhất là request/response thật:

![BUG-06 evidence](../screenshots/BUG-06-fr10-canceled-to-delivered.png)

*Nguồn: `23127152-hw4/reports/fr10-orderstate/{chromium,firefox,webkit}/index.html`, test case FR10-TC10. Dữ liệu trong ảnh lấy từ lần gọi API thật (curl) ngay trên môi trường dev. Ảnh chụp UI đầy đủ (trạng thái đơn trước/sau trên Admin panel) đã có tại `tests/HW02/bug-reports/BUG-06.md`.*
