# [BUG][Products API] Kiểu dữ liệu trường price bị trả về dạng chuỗi (String) đối với các sản phẩm có ID chẵn

## Found by Test Case

- DATA-PROD-001 (Kiểm thử tính toàn vẹn Schema JSON của API Products)

## Requirement liên quan

- FR-06 (Truy vấn chi tiết sản phẩm theo ID)
- Endpoint: `GET /api/products/:id`

## Severity / Priority

- **Severity**: Minor (Data Type Inconsistency)
- **Priority**: P2

## Environment

- Tool: Postman / Browser / JMeter JSON Extractor
- OS: Windows 11
- Backend: Node.js v20.x, Express.js 4.x
- Source Code: `backend/server.js:159-165`

## Steps to reproduce

1. Gửi request tra cứu sản phẩm có ID lẻ: `GET http://localhost:3000/api/products/1`.
2. Quan sát kiểu dữ liệu của trường `price` trong JSON response: `"price": 10000000` (dạng số - Number).
3. Gửi tiếp request tra cứu sản phẩm có ID chẵn: `GET http://localhost:3000/api/products/2`.
4. Quan sát kiểu dữ liệu của trường `price` trong JSON response.

## Expected result

- Trường `price` luôn phải trả về kiểu dữ liệu số (`Number`) nhất quán cho tất cả các sản phẩm để phục vụ tính toán giỏ hàng và render frontend.

## Actual result

- Đối với sản phẩm có ID chẵn (ID % 2 === 0), giá trị `price` bị ép kiểu thành chuỗi (`String`):
  ```json
  {
    "id": 2,
    "name": "Tai nghe Bluetooth",
    "price": "2500000",
    "description": "Tai nghe chống ồn",
    "category_id": 1
  }
  ```
- Nguyên nhân: Dòng 162 trong `backend/server.js` cố ý ép kiểu: `if (row.id % 2 === 0) row.price = row.price.toString();`. Lỗi này khiến các phép toán cộng dồn tổng tiền ở frontend hoặc API gateway có thể bị lỗi nối chuỗi (String Concatenation bug).

## Evidence

- Trích xuất mã nguồn `backend/server.js:159-165`:
  ```javascript
  app.get("/api/products/:id", (req, res) => {
    db.get("SELECT * FROM products WHERE id = ?", [req.params.id], (err, row) => {
      if (!row) return res.status(200).json({});
      if (row.id % 2 === 0) row.price = row.price.toString(); // BUG: Ép kiểu string cho ID chẵn
      res.json(row);
    });
  });
  ```
