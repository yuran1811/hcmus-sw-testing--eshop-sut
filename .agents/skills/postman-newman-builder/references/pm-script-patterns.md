# pm.test Script Patterns

Mục lục:
1. Happy path & performance
2. Schema validation
3. Negative / validation
4. Auth 401 vs RBAC 403
5. Security: injection, IDOR, mass assignment, disclosure
6. State transition
7. Chuỗi E2E với biến
8. Data-driven
9. Tiện ích dùng lại

Quy ước chung: tên test luôn dạng `<Prefix>: [TC_ID] <mô tả hành vi>`.

---

## 1. Happy path & performance

```javascript
const res = pm.response.json();

pm.test("Functional: [TC-A-LOGIN-FN-001] Đăng nhập thành công trả 200", () => {
    pm.response.to.have.status(200);
});

pm.test("Functional: [TC-A-LOGIN-FN-001] Trả về access token", () => {
    pm.expect(res).to.have.property("token");
    pm.expect(res.token).to.be.a("string").and.not.empty;
});

pm.test("Performance: [TC-A-LOGIN-FN-001] Phản hồi dưới 1000ms", () => {
    pm.expect(pm.response.responseTime).to.be.below(1000);
});

// lưu lại cho các request sau
pm.collectionVariables.set("tokenUserA", res.token);
```

Với POST tạo resource, kiểm thêm `Location` header hoặc `id` trả về:

```javascript
pm.test("Functional: [TC-B-ORDER-FN-001] Tạo đơn trả 201 kèm id hợp lệ", () => {
    pm.response.to.have.status(201);
    const id = pm.response.json().id;
    pm.expect(id).to.not.be.undefined;
    pm.collectionVariables.set("orderId", id);
});
```

## 2. Schema validation

```javascript
const orderSchema = {
    type: "object",
    required: ["id", "userId", "status", "items", "total", "createdAt"],
    properties: {
        id:        { type: ["integer", "string"] },
        userId:    { type: ["integer", "string"] },
        status:    { type: "string", enum: ["pending","confirmed","shipping","delivered","cancelled"] },
        total:     { type: "number", minimum: 0 },
        createdAt: { type: "string" },
        items: {
            type: "array",
            minItems: 1,
            items: {
                type: "object",
                required: ["productId", "quantity", "price"],
                properties: {
                    productId: { type: ["integer","string"] },
                    quantity:  { type: "integer", minimum: 1 },
                    price:     { type: "number", minimum: 0 }
                }
            }
        }
    },
    additionalProperties: false   // bắt field thừa - hay lộ rò rỉ dữ liệu
};

pm.test("Contract: [TC-B-ORDER-SCH-001] Response khớp OrderDetail schema", () => {
    pm.response.to.have.jsonSchema(orderSchema);
});

pm.test("Contract: [TC-B-ORDER-SCH-001] Content-Type là application/json", () => {
    pm.expect(pm.response.headers.get("Content-Type")).to.include("application/json");
});
```

Schema cho response lỗi cũng cần kiểm — cấu trúc lỗi phải nhất quán giữa các endpoint:

```javascript
pm.test("Contract: [TC-B-ORDER-SCH-004] Response lỗi có cấu trúc chuẩn", () => {
    pm.response.to.have.jsonSchema({
        type: "object",
        required: ["error"],
        properties: {
            error: {
                type: "object",
                required: ["code", "message"],
                properties: { code: { type: "string" }, message: { type: "string" } }
            }
        }
    });
});
```

## 3. Negative / validation

Luôn kiểm cả status **và** nội dung lỗi — nếu chỉ kiểm status, API trả 400 vì lý do khác vẫn pass.

```javascript
pm.test("Functional: [TC-A-REG-DP-007] Thiếu field email trả 400", () => {
    pm.response.to.have.status(400);
});

pm.test("Functional: [TC-A-REG-DP-007] Message nêu đúng field thiếu", () => {
    const body = pm.response.text().toLowerCase();
    pm.expect(body).to.include("email");
});

pm.test("Security: [TC-A-REG-DP-007] Lỗi không lộ stack trace", () => {
    const body = pm.response.text().toLowerCase();
    ["at object.", "stack", "sqlexception", "node_modules"].forEach(t => {
        pm.expect(body).to.not.include(t);
    });
});
```

## 4. Auth 401 vs RBAC 403 — luôn tách rời

```javascript
// Request 1: không gửi Authorization
pm.test("Security: [TC-C-PROD-SEC-001] Không token trả 401", () => {
    pm.response.to.have.status(401);
});

// Request 2: token user thường gọi endpoint admin
pm.test("Security: [TC-C-PROD-SEC-002] User thường trả 403 (không phải 401)", () => {
    pm.response.to.have.status(403);
    pm.expect(pm.response.code).to.not.eql(401,
        "403 nghĩa là 'đã xác thực nhưng không đủ quyền' - trả 401 ở đây là che lỗi phân quyền");
});

// Request 3: token hết hạn
pm.test("Security: [TC-C-PROD-SEC-003] Token hết hạn trả 401", () => {
    pm.response.to.have.status(401);
});
```

## 5. Security

### Injection

```javascript
pm.test("Security: [TC-A-SEARCH-SEC-004] SQLi payload không gây 500", () => {
    pm.expect(pm.response.code).to.not.eql(500);
    pm.expect([200, 400, 422]).to.include(pm.response.code);
});

pm.test("Security: [TC-A-SEARCH-SEC-004] Không trả về toàn bộ bản ghi", () => {
    const items = pm.response.json().data || [];
    pm.expect(items.length).to.be.below(pm.collectionVariables.get("totalProducts"));
});

pm.test("Security: [TC-A-SEARCH-SEC-005] XSS payload được escape", () => {
    pm.expect(pm.response.text()).to.not.include("<script>alert(1)</script>");
});
```

### IDOR

```javascript
// gửi bằng {{tokenUserA}} tới resource của user B
pm.test("Security: [TC-B-ORDER-SEC-007] Không truy cập được đơn của user khác", () => {
    pm.expect([403, 404]).to.include(pm.response.code);
});

pm.test("Security: [TC-B-ORDER-SEC-007] Body không chứa dữ liệu của user B", () => {
    const text = pm.response.text();
    pm.expect(text).to.not.include(pm.collectionVariables.get("userEmailB"));
});
```

### Mass assignment

```javascript
// body gửi kèm {"role": "admin"}
pm.test("Security: [TC-A-REG-SEC-009] Không leo thang quyền qua field role", () => {
    if (pm.response.code === 400) return;          // API từ chối - cũng hợp lệ
    pm.response.to.have.status(201);
    pm.expect(pm.response.json().role).to.not.eql("admin");
});
```

### Information disclosure

```javascript
pm.test("Security: [TC-A-LOGIN-SEC-011] Response không lộ field nhạy cảm", () => {
    const text = pm.response.text();
    ["passwordHash", "password", "salt", "connectionString"].forEach(f => {
        pm.expect(text).to.not.include(f);
    });
});
```

## 6. State transition

```javascript
// PATCH /orders/{{orderId}}/status  body {"status":"delivered"} khi đơn đang pending
pm.test("Functional: [TC-B-ORDER-ST-012] Từ chối nhảy cóc pending -> delivered", () => {
    pm.expect([400, 409]).to.include(pm.response.code);
});

pm.test("Functional: [TC-B-ORDER-ST-012] Trạng thái đơn không đổi sau khi bị từ chối", () => {
    pm.sendRequest({
        url: pm.environment.get("baseUrl") + "/api/orders/" + pm.collectionVariables.get("orderId"),
        method: "GET",
        header: {
            "Authorization": "Bearer " + pm.collectionVariables.get("tokenUserA"),
            "X-Student-Id": pm.environment.get("studentId")
        }
    }, (err, res) => {
        pm.expect(res.json().status).to.eql("pending");
    });
});
```

Idempotency (gọi cùng action 2 lần):

```javascript
pm.test("Functional: [TC-B-ORDER-ST-018] Confirm lần 2 không tạo thay đổi bất thường", () => {
    pm.expect([200, 409]).to.include(pm.response.code);
    if (pm.response.code === 200) {
        pm.expect(pm.response.json().status).to.eql("confirmed");
    }
});
```

## 7. Chuỗi E2E với biến

Bốn request trong cùng folder, chạy đúng thứ tự, **không chạy song song** vì phụ thuộc biến.

```javascript
// 1. POST /orders
pm.test("Functional: [TC-B-E2E-001] Tạo đơn 201", () => {
    pm.response.to.have.status(201);
    pm.collectionVariables.set("orderId", pm.response.json().id);
});

// 2. GET /orders/{{orderId}}
pm.test("Functional: [TC-B-E2E-002] Đọc lại đơn khớp dữ liệu đã tạo", () => {
    pm.response.to.have.status(200);
    pm.expect(pm.response.json().id.toString())
      .to.eql(pm.collectionVariables.get("orderId").toString());
});

// 3. PATCH /orders/{{orderId}}/status
pm.test("Functional: [TC-B-E2E-003] Cập nhật trạng thái thành công", () => {
    pm.response.to.have.status(200);
    pm.expect(pm.response.json().status).to.eql("confirmed");
});

// 4. GET lại để xác nhận đã lưu thật (không chỉ tin response của PATCH)
pm.test("Functional: [TC-B-E2E-004] Trạng thái mới được lưu bền vững", () => {
    pm.expect(pm.response.json().status).to.eql("confirmed");
});
```

## 8. Data-driven

```javascript
const expected = Number(pm.iterationData.get("expectedStatus"));
const tcId     = pm.iterationData.get("tcId");
const note     = pm.iterationData.get("note") || "";

pm.test(`Functional: [${tcId}] Trả về ${expected} — ${note}`, () => {
    pm.response.to.have.status(expected);
});

// assert thêm khi là case lỗi
if (expected >= 400) {
    pm.test(`Functional: [${tcId}] Có thông báo lỗi`, () => {
        pm.expect(pm.response.text().length).to.be.above(0);
        pm.expect(pm.response.json()).to.have.property("error");
    });
}
```

Body request dùng biến từ data file:

```json
{ "email": "{{email}}", "password": "{{password}}" }
```

## 9. Tiện ích dùng lại

Đặt trong pre-request script cấp collection để mọi folder dùng được:

```javascript
// helper: lấy header chuẩn
pm.collectionVariables.set("stdHeaders", JSON.stringify({
    "Content-Type": "application/json",
    "X-Student-Id": pm.environment.get("studentId")
}));

// helper: log gọn để chụp bằng chứng
console.log(`[${pm.info.requestName}] X-Student-Id = ${pm.environment.get("studentId")}`);
```

Test dùng chung cho mọi request (đặt ở tab Tests cấp collection):

```javascript
pm.test("Contract: Response là JSON hợp lệ", () => {
    pm.expect(() => pm.response.json()).to.not.throw();
});

pm.test("Security: Không lộ header phiên bản server", () => {
    pm.expect(pm.response.headers.get("X-Powered-By")).to.be.undefined;
});
```
