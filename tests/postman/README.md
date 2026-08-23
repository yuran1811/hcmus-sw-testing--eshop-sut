# Postman Collection — HW06 (23127211)

## Cách chạy

```bash
npm install -g newman newman-reporter-htmlextra

# 1. Dựng SUT (bắt buộc chạy trước, mỗi lần chạy lại backend sẽ RESET + reseed DB)
cd backend && npm run dev

# 2. Chạy collection
newman run tests/postman/collections/eshop-hw06.postman_collection.json \
  -e tests/postman/envs/local.postman_environment.json \
  --reporters cli,htmlextra,json \
  --reporter-htmlextra-export tests/postman/reports/newman-report.html \
  --reporter-json-export tests/postman/reports/newman-report.json \
  --timeout-request 10000
```

**Trước khi chạy**, mở `tests/postman/envs/local.postman_environment.json` và sửa `studentId` thành MSSV thật của bạn (đang để `23127211` làm ví dụ).

⚠️ **Lưu ý quan trọng — SUT có bug tự-xoá-chính-mình (xem bên dưới):** folder `XT - [TC-C-ADMUSER-ST-006]` thử cho admin tự xoá chính tài khoản đang dùng. Do SUT hiện KHÔNG chặn hành vi này (bug thật), sau khi chạy hết collection, tài khoản `admin@eshop.com` duy nhất trong DB **sẽ bị xoá**. Phải **restart lại `backend`** (drop + reseed DB tự động khi start) trước khi chạy lại collection lần nữa.

## Kết quả chạy thật gần nhất

_Bản v3, sau vòng đọc lại code (`backend/server.js`) để tìm thêm bug — 5 TC mới + enrich 3 TC cũ (ST-002, DP-012, SEC-008), tất cả phát hiện qua chạy chính collection này bằng Newman, không dùng curl rời để kết luận bug._

|            |                                                            |
| ---------- | ---------------------------------------------------------- |
| Requests   | 155 (0 lỗi kết nối/network)                                |
| Assertions | 215                                                        |
| Pass       | 146                                                        |
| Fail       | 69                                                         |
| Report     | `reports/newman-report.html`, `reports/newman-report.json` |

**Không sửa test cho pass** — 69 assertion fail là bằng chứng của **bug thật trong SUT**. Danh sách đầy đủ có bug report riêng trong `tests/bug-reports/<module>/`:

| Bug                                                                               | Mức độ   | TC bắt được                                                  |
| --------------------------------------------------------------------------------- | -------- | ------------------------------------------------------------ |
| BUG-ADMUSER-001 — RBAC bypass, user thường xem được `/api/admin/users`            | Critical | `TC-C-ADMUSER-SEC-004`                                       |
| BUG-ADMUSER-002 — Admin tự xoá được chính mình                                    | Critical | `TC-C-ADMUSER-ST-006`                                        |
| BUG-REGISTER-001 — Register gần như không validate gì                             | Major    | `TC-A-REGISTER-DP-001..021`, `SEC-001/006`, `ST-002/003`     |
| BUG-CART-001 — Cart gần như không validate gì                                     | Major    | `TC-B-CART-DP-002..023`, `SEC-005`                           |
| BUG-CART-002 — Thêm cùng sản phẩm KHÔNG cộng dồn số lượng (vi phạm FR-07)         | Major    | `TC-B-CART-ST-002`                                           |
| BUG-CART-003 — Giá không đối chiếu DB, tin giá client gửi                         | Major    | `TC-B-CART-DP-012`                                           |
| BUG-CART-005 — Không có API xoá sản phẩm khỏi giỏ                                 | Major    | `TC-B-CART-FN-004` (mới)                                     |
| BUG-ADMUSER-004 — DELETE id không tồn tại vẫn báo "xoá thành công"                | Major    | `TC-C-ADMUSER-ST-007` (mới)                                  |
| BUG-ADMUSER-003 — `name: null` lộ ra danh sách user                               | Major    | `TC-C-ADMUSER-SCH-001`                                       |
| BUG-REGISTER-004 — Response 500 lộ stack trace + đường dẫn server                 | Minor    | `TC-A-REGISTER-SEC-008`                                      |
| BUG-REGISTER-005 — Lộ `X-Powered-By`, CORS wildcard `*` trên mọi endpoint kể cả admin | Minor | `SEC-009`/`SEC-009`/`SEC-012` (mới, cả 3 API)                |
| BUG-ADMUSER-005 — Token lỗi trả 403 thay vì 401                                   | Minor    | `TC-B-CART-SEC-002..004`, `TC-C-ADMUSER-SEC-002/003/005/006` |

BUG-CART-004 (giỏ hàng in-memory, mất khi restart) được ghi nhận qua đọc code nhưng KHÔNG tính vào danh sách trên vì không xác nhận được qua 1 lần chạy Newman tự động (cần restart backend giữa chừng) — xem ghi chú trong chính file bug report.

Case `TC-A-REGISTER-ST-006` (đăng ký đồng thời 2 email khác nhau) có 1 trong 2 request trả 400 thay vì 200 — cần điều tra thêm trước khi kết luận là bug.

### Giới hạn đã biết của bộ script (tự phát hiện qua review độc lập)

- **~112/131 case (86%) chỉ có script sinh tự động theo luật chung** (assert status + vài rule phụ như "không lộ password", "không 500"), **KHÔNG** implement đầy đủ nội dung chi tiết ở cột `ExpectedResponse` của từng case (vd các câu mô tả cụ thể như "message phải nêu đúng field thiếu"). 19 case còn lại (script viết tay + 7 case SCH mới enrich) mới thật sự đạt điều kiện VALID #4 của `audit-rubric.md` ("assert được bằng máy, không phải mô tả cảm tính") một cách đầy đủ. Nên xem đây là **bản nền (baseline) đã chạy được thật**, không phải bản hoàn thiện 100% độ chi tiết của từng `ExpectedResponse` — cần bổ sung dần nếu muốn coverage sâu hơn.
- **`pm.sendRequest` trong 2 case race-condition (`ST-004`) không đảm bảo tuyệt đối tính đồng thời** — do cơ chế bất đồng bộ của Postman Sandbox, "Request B" có thể hoàn tất sau khi item đã chuyển sang request tiếp theo, nên chỉ nên coi đây là _xấp xỉ_ race condition, không phải race condition hoàn hảo ở mức hệ điều hành.
- **Field `type: "secret"` trong environment JSON (cho `expiredToken`, `forgedToken`...) mang tính hình thức trong repo này**: `SECRET_KEY` dùng để ký các token đó đã được hardcode sẵn, công khai trong `backend/server.js` (đã nằm trong repo public theo yêu cầu nộp bài) — nên việc đánh dấu "secret" không thực sự che giấu được gì thêm ở đây. Ghi chú lại để KHÔNG hiểu nhầm là bộ này minh hoạ cách quản lý secret an toàn; nếu tái dùng pattern này cho một hệ thống có secret THẬT, phải tách token ra khỏi file version-control (dùng CI secret store), không hardcode.

## 2 case KHÔNG tự động hoá được (MANUAL)

- `TC-C-ADMUSER-SEC-010` (token của admin đã bị xoá) và `TC-C-ADMUSER-SEC-011` (token admin cũ sau khi bị hạ quyền — case Extend): không có endpoint public nào để tạo thêm admin thứ 2 hoặc đổi role của user đã tồn tại, nên không dựng được kịch bản thật qua API. 2 request này chỉ log ghi chú, không assert thật — cần test thủ công qua thao tác trực tiếp trên DB nếu muốn kiểm chứng đầy đủ.

## Cấu trúc collection

```
EShop API Testing - HW06 (collection)
├── [pre-request script cấp collection: X-Student-Id + Content-Type mặc định]
├── 00 - Setup (login Admin, User A, đăng ký+login User B, set biến email dùng chung)
├── API1 - POST /api/register (FN/DP/ST/SEC/SCH + chuỗi XT re-register sau khi bị admin xoá)
├── API2 - POST /api/cart (FN/DP/ST/SEC/SCH + chuỗi XT sản phẩm bị xoá sau khi đã thêm giỏ)
├── API3 - GET /api/admin/users (FN/DP/ST/SEC/SCH + chuỗi XT admin tự xoá chính mình)
└── 99 - Teardown (health-check cuối cùng)
```

145 request = 131 case từ `TC_*.csv` (trừ 3 case được viết lại thành chuỗi E2E nhiều bước) + 9 request chuỗi E2E (3 case × 3 bước trung bình) + 5 request Setup + 1 Teardown.

## Danh sách Postman features đã dùng

| Feature                                    | Dùng vào việc gì                                                                                                                                                                        | Bằng chứng                                                                        |
| ------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------- |
| **Collection**                             | 1 collection cho cả 3 API, 145 request                                                                                                                                                  | `collections/eshop-hw06.postman_collection.json`                                  |
| **Folder (nhiều cấp)**                     | API → Category (FN/DP/ST/SEC/SCH) → request; riêng 3 case cross-endpoint tách thành folder `XT - ...` chứa chuỗi request nhiều bước                                                     | Cấu trúc trong file collection, hiển thị trong report HTML                        |
| **Environment + Environment variable**     | `local`/`ci` tách biệt, biến `baseUrl`/`studentId` — đổi môi trường không sửa request                                                                                                   | `envs/local.postman_environment.json`, `envs/ci.postman_environment.json`         |
| **Collection variable**                    | `adminToken`, `tokenUserA`, `tokenUserB`, `regSharedEmail`, `xtProductId`... sinh ra khi chạy, dùng lại xuyên suốt                                                                      | Khai báo ở `collection.variable`, set trong các script `Setup`                    |
| **Pre-request script (cấp collection)**    | Gắn `X-Student-Id` cho toàn bộ 145 request + `console.log` làm bằng chứng, tự thêm `Content-Type` khi có body                                                                           | `collection.event[0]`, log xuất hiện trong Newman CLI output khi chạy `--verbose` |
| **Tests script (pm.test)**                 | Toàn bộ 199 assertion, đặt tên `Functional:`/`Security:`/`Contract:` kèm TC_ID để truy vết ngược                                                                                        | Mọi item trong collection                                                         |
| **Dynamic variables (`{{$timestamp}}`)**   | Email tạo user mới luôn động, tránh vi phạm unique constraint khi chạy lại nhiều lần (fix từ vòng review độc lập của Entry #2)                                                          | Body của các request tạo user trong API1                                          |
| **`pm.sendRequest`**                       | Bắn request song song trong test script để mô phỏng race condition thật (`TC-A-REGISTER-ST-004`, `TC-B-CART-ST-004`), và trong các case cần gọi thêm request phụ để xác minh trạng thái | Script 2 case `ST-004`                                                            |
| **Chuỗi E2E nhiều request phụ thuộc biến** | 3 case cross-endpoint (Extend) viết thành folder `XT -...` gồm 2-3 request chạy tuần tự, truyền id/email qua collection variable                                                        | Folder `XT - ...` trong mỗi API                                                   |
| **Newman CLI**                             | Chạy headless, xuất report — dùng được thẳng trong CI/CD                                                                                                                                | Lệnh ở mục "Cách chạy"                                                            |
| **newman-reporter-htmlextra**              | Report HTML nộp kèm, phân nhóm theo folder                                                                                                                                              | `reports/newman-report.html`                                                      |
| **JSON reporter**                          | Trích số liệu pass/fail để tổng hợp bảng báo cáo                                                                                                                                        | `reports/newman-report.json`                                                      |

_Chưa dùng: Workspace, Monitor, Mock Server (tính năng cloud của Postman) — bộ này được dựng và chạy hoàn toàn qua CLI/file theo đúng quy trình CI/CD-friendly, không mở app Postman._
