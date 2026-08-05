# Data-Driven Patterns

## Chọn JSON hay CSV

| Tiêu chí | JSON | CSV |
|---|---|---|
| Dữ liệu lồng nhau (mảng sản phẩm, object địa chỉ) | Được | Không |
| Dễ đọc khi review thủ công | Trung bình | Tốt |
| Import trực tiếp trong TS | `import data from '...json'` | Cần parse thư viện |
| Phù hợp | Đa số trường hợp | Bảng phẳng, nhiều dòng |

Mặc định chọn **JSON** trừ khi dữ liệu hoàn toàn phẳng và có trên ~30 dòng. Nếu dùng JSON với TypeScript, bật `resolveJsonModule: true` trong `tsconfig.json`.

Với CSV, dùng `papaparse` hoặc `csv-parse/sync`:

```typescript
import { parse } from 'csv-parse/sync';
import fs from 'fs';

const testData = parse(fs.readFileSync('data/login.data.csv'), {
  columns: true,
  skip_empty_lines: true,
});
```

## Schema tối thiểu

Mỗi object phải có đủ ba nhóm trường, thiếu nhóm nào thì report sẽ khó truy vết:

```json
{
  "id": "TC-LOGIN-003",
  "description": "Đăng nhập với mật khẩu sai",
  "type": "negative",

  "input": {
    "email": "user01@gmail.com",
    "password": "WrongPass123"
  },

  "expected": {
    "outcome": "error",
    "message": "Sai tên đăng nhập hoặc mật khẩu",
    "stayOnPage": true
  }
}
```

- **Nhóm định danh** (`id`, `description`, `type`) — để tên test trong report khớp với bảng test case gốc
- **Nhóm input** — mọi thứ script sẽ nhập vào
- **Nhóm expected** — mọi thứ script sẽ khẳng định

Đặt `id` trùng chính xác TC-ID trong bảng test case. Khi TA mở report thấy `TC-LOGIN-003` fail, họ tra ngay được ca đó trong báo cáo mà không cần đoán.

## Xử lý ca có cấu trúc khác biệt

Không phải ca nào cũng cùng khuôn. Ví dụ ca "khoá tài khoản sau 5 lần sai" cần lặp, khác hẳn ca đăng nhập thường.

**Cách sai** — quay lại hardcode:
```typescript
test('TC-LOGIN-012: lockout', async ({ page }) => {
  for (let i = 0; i < 5; i++) {          // 5 hardcode
    await login(page, 'user@x.com', 'wrong');  // dữ liệu hardcode
  }
});
```

**Cách đúng** — đưa cả tham số hành vi vào data:
```json
{
  "id": "TC-LOGIN-012",
  "description": "Khoá tài khoản sau N lần đăng nhập sai",
  "type": "edge",
  "input": { "email": "user01@gmail.com", "password": "Wrong", "attempts": 5 },
  "expected": { "outcome": "locked", "message": "Tài khoản đã bị khoá" }
}
```

```typescript
for (let i = 0; i < tc.input.attempts; i++) { ... }
```

Nếu vẫn còn ca không nhét vừa schema chung, tách thành `describe` block riêng và **file data riêng** (`login-lockout.data.json`) — vẫn tách khỏi code, chỉ là schema khác. Đừng cố nhồi mọi ca vào một schema đến mức schema đầy trường `null`.

## Trường tuỳ chọn

Dùng optional field cho ca chỉ áp dụng một phần:

```json
{ "id": "TC-CART-007", "input": { "productId": "P01", "quantity": 0 },
  "expected": { "outcome": "error", "message": "Số lượng tối thiểu là 1",
                "cartCountUnchanged": true } }
```

Trong script, kiểm tra sự tồn tại trước khi assert:
```typescript
if (tc.expected.cartCountUnchanged) {
  await expect(cartBadge(page)).toHaveText(String(initialCount));
}
```

Cách này giữ được một vòng lặp duy nhất mà vẫn phủ được ca đặc thù.

## Dữ liệu tiền điều kiện

Tài khoản, sản phẩm, coupon cần có sẵn trước khi test — tạo qua API trong `beforeAll`, không qua UI:

```typescript
test.beforeAll(async ({ request }) => {
  for (const user of seedUsers) {
    await request.post('/api/register', { data: user });
  }
});
```

Lý do: nếu tạo qua UI, một thay đổi ở form đăng ký sẽ làm hỏng toàn bộ suite đăng nhập — test fail vì lý do nằm ngoài thứ đang được kiểm thử, gây nhiễu khi phân tích kết quả.

Đặt seed data ở file riêng (`data/seed.json`) để phân biệt rõ với dữ liệu test case.
