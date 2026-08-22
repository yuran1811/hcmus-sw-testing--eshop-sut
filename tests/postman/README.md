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

_Bản v2, sau vòng review độc lập trên chính Entry #3 (xem `ai-audit-report.md`): đã enrich 7 case SCH bằng assertion cụ thể dựa trên response shape thật, và bỏ 2 assertion "always true" giả ở case MANUAL để số liệu pass/fail phản ánh đúng thực tế._

|            |                                                            |
| ---------- | ---------------------------------------------------------- |
| Requests   | 145 (0 lỗi kết nối/network)                                |
| Assertions | 199                                                        |
| Pass       | 140                                                        |
| Fail       | 59                                                         |
| Report     | `reports/newman-report.html`, `reports/newman-report.json` |

**Không sửa test cho pass** (theo đúng chỉ dẫn skill) — 59 assertion fail là bằng chứng của **bug thật trong SUT**, sẽ được đưa vào bước Report Bug tiếp theo (skill `bug-reporting`). Các nhóm bug lớn nhất phát hiện được:

1. **[CRITICAL] `GET /api/admin/users` không kiểm tra role — chỉ cần có token hợp lệ (bất kỳ user thường nào) là xem được toàn bộ danh sách user.** Vi phạm trực tiếp SEC-03 ("API Admin phải kiểm tra role='admin' trong Token, không chỉ kiểm tra sự tồn tại của Token"). → `TC-C-ADMUSER-SEC-004`.
2. **[CRITICAL] Admin có thể tự xoá chính tài khoản đang đăng nhập** — vi phạm FR-19 ("ngoại trừ không được xóa chính tài khoản đang đăng nhập"). Vì hệ thống chỉ seed đúng 1 admin mặc định, bug này gây **mất quyền truy cập admin toàn hệ thống**. → `TC-C-ADMUSER-ST-006` (case Extend).
3. **[MAJOR] `POST /api/register` hầu như không validate gì** — chấp nhận email sai định dạng, password không đủ độ phức tạp, name rỗng/null/number, email trùng (không có unique constraint), SQLi payload trong email. → `TC-A-REGISTER-DP-001..021`, `SEC-001`, `SEC-006`, `ST-002/003`.
4. **[MAJOR] `POST /api/cart` hầu như không validate gì** — chấp nhận price/quantity âm, 0, chuỗi, số thực; chấp nhận id sản phẩm không tồn tại; **không đối chiếu price với DB** (chấp nhận giá giả mạo — rủi ro bảo mật nghiêm trọng nếu logic checkout cũng tin theo). → `TC-B-CART-DP-002..023`, `SEC-005`.
5. **[MAJOR — mới phát hiện nhờ enrich SCH] Dữ liệu `name: null` (do bug #3 chấp nhận) bị trả thẳng ra `GET /api/admin/users` mà không lọc/validate lại** — hệ quả dây chuyền của bug #3, chỉ lộ ra sau khi case `TC-C-ADMUSER-SCH-001` được viết assertion đủ chặt (kiểm tra kiểu dữ liệu từng field thay vì chỉ status). → `TC-C-ADMUSER-SCH-001`.
6. **[MINOR] Token không hợp lệ (rỗng/hết hạn/sai chữ ký/alg=none) trả về 403 thay vì 401** trên cả 2 endpoint có auth — sai quy ước (401 = chưa xác thực, 403 = đã xác thực nhưng không đủ quyền). → `TC-B-CART-SEC-002..004`, `TC-C-ADMUSER-SEC-002/003/005/006`.
7. **[MINOR] `POST /api/register` trả 500 (không phải 400/415) khi `Content-Type: text/plain` kèm JSON body** — lỗi không được xử lý (unhandled exception). → `TC-A-REGISTER-SEC-008`.

Case `TC-A-REGISTER-ST-006` (đăng ký đồng thời 2 email khác nhau) có 1 trong 2 request trả 400 thay vì 200 — cần điều tra thêm (có thể do race thật ở tầng DB, hoặc do kỹ thuật `pm.sendRequest` mô phỏng song song chưa hoàn hảo) trước khi kết luận là bug.

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
