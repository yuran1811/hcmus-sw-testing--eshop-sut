Title: [BUG][Order Cancel] Thiếu ràng buộc kiểm tra sở hữu người dùng trong câu lệnh UPDATE trạng thái đơn hàng

## Found by Test Case
TC-CANCEL-041, TC-CANCEL-042 (Human Extended Test Case & Code Audit)

## Requirement liên quan
FR-10 (Order State Machine), SEC-01 (Broken Object Level Authorization / Concurrency)

## Severity / Priority
Major / P2

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `PUT /api/orders/:id/cancel`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Kiểm tra mã nguồn endpoint `PUT /api/orders/:id/cancel` tại `backend/server.js:321-340`.
2. Quan sát câu lệnh SELECT tra cứu ban đầu:
   ```javascript
   db.get("SELECT * FROM orders WHERE id = ? AND user_id = ?", [req.params.id, req.user.id], ...)
   ```
3. Quan sát câu lệnh UPDATE thực hiện thay đổi trạng thái sau đó:
   ```javascript
   db.run("UPDATE orders SET status = ? WHERE id = ?", ["canceled", req.params.id], ...)
   ```

## Expected result
Câu lệnh `UPDATE` phải giữ nguyên ràng buộc kiểm tra sở hữu tài khoản và trạng thái trước đó (Optimistic Concurrency Control):
```sql
UPDATE orders SET status = 'canceled' WHERE id = ? AND user_id = ? AND status IN ('pending', 'confirmed')
```
để đảm bảo tính nguyên tử và chống tranh chấp tài nguyên (Race condition / TOCTOU).

## Actual result
Câu lệnh UPDATE chỉ kiểm tra `WHERE id = ?` mà bỏ quên `AND user_id = ?` và `AND status IN (...)`. Nếu có 2 luồng xử lý đồng thời hoặc thay đổi trạng thái từ phía quản trị viên, câu lệnh UPDATE có thể ghi đè trạng thái của đơn hàng mà không kiểm tra lại điều kiện sở hữu và trạng thái hiện tại.

## Evidence
- Mã nguồn vi phạm tại `backend/server.js:333-339`:
  ```javascript
  db.run(
    "UPDATE orders SET status = ? WHERE id = ?",
    ["canceled", req.params.id],
    function (err) {
      res.json({ message: "Order canceled successfully" });
    },
  );
  ```
