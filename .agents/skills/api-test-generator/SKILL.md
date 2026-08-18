---
name: api-test-generator
description: Sinh bộ test case API (>= 35 case/endpoint) từ API specification theo quy trình 5 bước có kiểm soát - domain partition, state transition, security SEC-01..SEC-07, schema validation, negative/boundary. LUÔN dùng skill này khi người dùng nhắc tới "sinh test case API", "test case cho endpoint", "API testing HW06", "EShop API", "test case từ api_specification.md", hoặc đưa ra một endpoint/spec và muốn có bộ test case có cấu trúc - kể cả khi họ chỉ nói ngắn gọn "viết test cho API login".
---

# EShop API Test Generator

Sinh test case API một cách **có kỷ luật**: không phải một prompt "generate all test cases", mà đi qua từng bước của kỹ thuật thiết kế test, mỗi bước có output kiểm chứng được.

Lý do quan trọng: đề bài HW06 chấm trên _chất lượng_ và _khả năng truy vết_ của test case. Một bộ 35 case sinh ào ạt sẽ trùng lặp, thiếu state transition và security. Đi từng bước mới đảm bảo coverage thật.

## Trước khi bắt đầu — thu thập input

Cần có đủ những thứ sau. Nếu thiếu, **hỏi người dùng thay vì tự bịa field**:

- [ ] Endpoint: method + path (vd `POST /api/auth/login`)
- [ ] Trích đoạn `api_specification.md` mô tả endpoint đó: request body/query param, response happy case, response error, status code
- [ ] FR liên quan (FR-01..FR-19) và pool (A/B/C)
- [ ] Mục SEC-01..SEC-07 trong spec — đọc nguyên văn, **không suy đoán nội dung từng SEC**
- [ ] Rule nghiệp vụ đặc biệt: unique constraint, lockout sau N lần sai, coupon hết hạn, quy tắc chuyển trạng thái đơn hàng...
- [ ] Role/permission trong hệ thống (guest / user / admin) — cần cho case 401 vs 403

Nếu người dùng chỉ đưa repo `https://github.com/ttbhanh/eshop-sut`, đọc `api_specification.md` trước rồi tóm tắt lại contract của endpoint để họ xác nhận, sau đó mới sinh test.

## Quy trình 5 bước

Chạy tuần tự. Sau mỗi bước, in ra kết quả bước đó rồi mới sang bước tiếp — người dùng cần thấy được từng chặng để đưa vào AI Audit Report.

### Bước 1 — Phân rã contract (Contract decomposition)

Lập bảng liệt kê mọi thành phần có thể tác động vào endpoint:

| Thành phần | Tên           | Kiểu   | Bắt buộc | Ràng buộc từ spec     |
| ---------- | ------------- | ------ | -------- | --------------------- |
| body       | email         | string | có       | format email, max 255 |
| header     | Authorization | string | có       | Bearer token          |
| query      | page          | int    | không    | >= 1, default 1       |

Ghi rõ thành phần nào spec **không nói gì** — đó chính là nguồn của các case INCOMPLETE và bug tiềm năng sau này.

### Bước 2 — Domain partition trên từng tham số

Với **mỗi** tham số ở bước 1, chia miền giá trị thành các lớp tương đương + giá trị biên. Xem `references/test-taxonomy.md` mục "Domain partition" để lấy bảng mẫu cho từng kiểu dữ liệu (string, number, enum, date, email, password, id).

Quy tắc: mỗi tham số phải sinh tối thiểu 1 valid class + 2 invalid class + 2 boundary. Đây là nơi tạo ra phần lớn số lượng trong 35 case.

### Bước 3 — State transition (nếu endpoint có trạng thái)

Áp dụng cho FR-10 (order state machine), FR-02 (account lockout), FR-03 (reset password 2 bước), FR-09 (coupon), FR-18 (admin đổi trạng thái đơn).

Cách làm: vẽ bảng chuyển trạng thái đầy đủ, gồm **cả ô hợp lệ và ô không hợp lệ**, rồi mỗi ô là 1 test case.

```
          | confirm | ship | deliver | cancel
pending   |   OK    |  X   |    X    |   OK
confirmed |   X     |  OK  |    X    |   OK?
shipping  |   X     |  X   |   OK    |   X
delivered |   X     |  X   |    X    |   X
cancelled |   X     |  X   |    X    |   X
```

Ô `X` là các **invalid transition** — AI hay bỏ sót nhóm này nhất, mà đây lại là nơi bug thật hay nằm. Sinh test case cho tất cả ô X, kỳ vọng 400/409 chứ không phải 200.

Ô có dấu `?` (spec không nói rõ) → đánh dấu là câu hỏi mở, đừng tự quyết kỳ vọng; ghi vào cột Note để người dùng xác minh với spec.

### Bước 4 — Security (SEC-01 → SEC-07)

Đọc `references/security-checklist.md`. Với mỗi SEC trong spec, sinh ít nhất 1 case, ưu tiên các nhóm:

- **AuthN**: không token / token hết hạn / token sai chữ ký → kỳ vọng 401
- **AuthZ (RBAC)**: user thường gọi endpoint admin → kỳ vọng **403, không phải 401** (luôn tách 2 case riêng, gộp lại là che mất lỗi phân quyền)
- **IDOR**: user A truy cập resource của user B bằng cách đổi id → kỳ vọng 403/404, tuyệt đối không phải 200
- **Injection**: payload SQLi/XSS/NoSQL → kỳ vọng KHÔNG 500, dữ liệu được escape hoặc từ chối 400
- **Mass assignment / privilege escalation**: gửi thêm field `role: "admin"`, `isAdmin: true`, `price: 0` vào body → kỳ vọng bị bỏ qua hoặc 400
- **Rate limit / lockout**: lặp request vượt ngưỡng → 429 hoặc khoá tài khoản theo FR-02

Lưu ý an toàn: chỉ chạy trên môi trường local/test của SUT, dùng payload đủ để kiểm tra hành vi sanitize, không dùng payload phá huỷ dữ liệu trên hệ thống không thuộc quyền kiểm soát.

### Bước 5 — Schema validation

Với mỗi response code có trong spec (200/201/400/401/403/404/409/422...), sinh 1 case kiểm tra **hình dạng response khớp spec**:

- Content-Type đúng `application/json`
- Đủ field required, đúng kiểu dữ liệu
- Không có field thừa rò rỉ dữ liệu nhạy cảm (`password`, `passwordHash`, `token` của user khác, stack trace trong 500)
- Response lỗi có cấu trúc nhất quán giữa các endpoint

Đặt tên test có tiền tố `Contract:` cho nhóm này, `Functional:` cho các nhóm còn lại — tách bạch giúp maintain và giúp đọc report Newman dễ hơn.

## Định dạng output

Mỗi test case phải có đủ các cột dưới đây (chi tiết ràng buộc từng cột: `references/testcase-schema.md`):

| Cột                 | Ý nghĩa                                                    |
| ------------------- | ---------------------------------------------------------- |
| TC_ID               | `TC-<POOL>-<FEATURE>-<CAT>-<NNN>`, vd `TC-A-LOGIN-SEC-004` |
| Category            | DP / ST / SEC / SCH / FN                                   |
| Title               | Mô tả 1 dòng, bắt đầu bằng động từ                         |
| Precondition        | Trạng thái dữ liệu cần có trước khi chạy                   |
| Method + Endpoint   |                                                            |
| Headers             | Gồm `X-Student-Id: {StudentID}`                            |
| Request body/params | JSON cụ thể, không viết "dữ liệu hợp lệ" chung chung       |
| Expected status     |                                                            |
| Expected response   | Field/message cụ thể cần assert                            |
| Spec ref            | FR-xx / SEC-xx / mục trong spec                            |
| Note                | Ghi "spec chưa định nghĩa" nếu kỳ vọng là suy luận         |

`CAT` viết tắt: `DP` domain partition, `ST` state transition, `SEC` security, `SCH` schema, `FN` functional/happy path.

Xuất song song 2 dạng: bảng Markdown (để dán vào báo cáo) và CSV (để mở bằng Excel như đề bài yêu cầu).

## Chỉ tiêu coverage tối thiểu cho 1 API

Trước khi kết thúc, tự kiểm và báo cáo bảng này:

| Nhóm                             | Tối thiểu                                                           |
| -------------------------------- | ------------------------------------------------------------------- |
| FN (happy path, gồm cả biến thể) | 3                                                                   |
| DP                               | 15                                                                  |
| ST                               | 5 (bỏ qua nếu endpoint hoàn toàn stateless — phải giải thích lý do) |
| SEC                              | 8 (phủ hết SEC-01..SEC-07 xuất hiện trong spec)                     |
| SCH                              | 4                                                                   |
| **Tổng**                         | **>= 35**                                                           |

Nếu endpoint stateless mà không đủ 35, bù bằng DP và SEC — đừng nhân bản case chỉ để đủ số, TA chấm trên chất lượng.

## Những điều tuyệt đối không làm

- **Không tự vẽ diagram cho người dùng.** Đề bài mục 11 quy định diagram thiết kế test generator phải do sinh viên tự vẽ, không được AI sinh. Skill này có `assets/diagram-brief.md` mô tả các khối cần có để người dùng **tự vẽ** bằng draw.io/Excalidraw; không xuất ra file PNG/Mermaid thay họ.
- Không bịa field không có trong spec — nếu thiếu thông tin, liệt kê giả định thành một mục riêng "Assumptions" để người dùng xác nhận.
- Không đánh dấu case là "pass/fail" — skill này chỉ thiết kế, việc chạy thuộc về skill `postman-newman-builder`.

## Tài nguyên kèm theo

- `references/test-taxonomy.md` — bảng partition mẫu theo kiểu dữ liệu, mẫu bảng state transition
- `references/security-checklist.md` — checklist SEC + payload mẫu an toàn
- `references/testcase-schema.md` — ràng buộc từng cột, header CSV chuẩn
- `scripts/generator_pseudocode.py` — pseudocode nộp kèm cho mục 7 của đề bài
- `assets/diagram-brief.md` — mô tả các khối để sinh viên tự vẽ diagram
