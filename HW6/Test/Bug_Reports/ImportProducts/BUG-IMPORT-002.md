Title: [BUG][Import Products] Bỏ qua kiểm tra miền giá trị, cho phép import sản phẩm có giá tiền âm

## Found by Test Case
TC-IMPORT-029

## Requirement liên quan
FR-16 (CSV Product Import), FR-15 (Product Management), Input Domain Validation

## Severity / Priority
Major / P2

## Environment
- OS: Windows 11 / Linux Ubuntu 22.04
- SUT Base URL: `http://localhost:3000`
- Target Endpoint: `POST /api/admin/import-products`
- Tool: Postman v10+ / Newman CLI v6.2.2

## Steps to reproduce
1. Đăng nhập tài khoản Admin để lấy Bearer JWT Token.
2. Gửi request `POST /api/admin/import-products` chứa sản phẩm có giá tiền âm:
   ```json
   {
     "products": [
       {
         "name": "Sản phẩm giá âm",
         "price": -50000,
         "description": "Negative price item",
         "imageUrl": "https://placehold.co/300x300",
         "category_id": 1
       }
     ]
   }
   ```
3. Quan sát kết quả import và kiểm tra database.

## Expected result
Giá tiền sản phẩm là một đại lượng kinh tế phải luôn $\ge 0$. Hệ thống phải từ chối bản ghi này, ghi nhận lỗi vào mảng `errors` (ví dụ: `Hàng 2: Giá sản phẩm phải lớn hơn hoặc bằng 0`) và không tăng biến đếm `inserted`.

## Actual result
Mã nguồn tại `backend/server.js:213-231` chỉ kiểm tra sự tồn tại của `row.name` mà **hoàn toàn không kiểm tra `row.price >= 0`**:
```javascript
rows.forEach((row, index) => {
  if (!row.name) {
    errors.push(`Hàng ${index + 2}: Thiếu tên sản phẩm`);
    return;
  }
  stmt.run(row.name, row.price, ...);
```
Sản phẩm với giá `-50000` được import thành công vào database với `inserted: 1`, gây sai lệch logic tính toán đơn hàng và thanh toán trên toàn hệ thống.

## Evidence
- Mã nguồn tại `backend/server.js:213-231`.
- Kiểm tra trực tiếp qua `GET /api/products`: Sản phẩm mang giá trị `price: -50000` tồn tại trong cơ sở dữ liệu.
