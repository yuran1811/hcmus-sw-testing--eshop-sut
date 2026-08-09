# HW04 – AI Automation Testing on EShop

**Mã số sinh viên:** 23127211.
**Họ và tên:** Nguyễn Lê Hồ Anh Khoa.
**Mã bài tập:** HW04-AI.
**Ngày nộp:** 10/08/2026.
**Điểm tự đánh giá:** 100.

---

## Phương pháp tiếp cận (AI-First Automation Methodology)

Cả 3 feature đều đi theo đúng quy trình 5 phase của skill [`playwright-automation`](.agents/skills/playwright-automation/SKILL.md) — AI **không** nhận một prompt hộp đen kiểu "hãy viết script cho tính năng X", mà đi qua từng phase có điểm dừng xác nhận của con người (toàn bộ log nguyên văn nằm tại `docs/anh-khoa/ai audit report.md`):

1. **Phase 1 — Chiến lược & Ánh xạ (grounding).** AI đọc đồng thời toàn bộ bảng test case (`tests/test-cases/<feature>/`) và source thật (`frontend-web`/`frontend-admin`/`backend`), đối chiếu từng điểm nghi ngờ của người dùng bằng số dòng cụ thể, và tự tìm thêm gap chưa được nêu. Không sinh code ở phase này.
2. **Phase 2 — Sinh dữ liệu & script.** Viết `tests/e2e/test-data/<feature>.json` trước (đầy đủ ca, có mục `knownIssues` giải thích từng sai khác SUT-vs-SRS kèm số dòng), rồi mới viết `tests/e2e/specs/<feature>.spec.ts` lặp qua dữ liệu — không hardcode giá trị thay đổi theo ca.
3. **Phase 3 — Cấu hình đa trình duyệt & report.** `playwright.config.ts` chạy 3 project (chromium/firefox/webkit), bơm `Run by: 23127211` + ISO timestamp vào cả `title` và `metadata` của HTML reporter.
4. **Phase 4 — Thực thi & phân loại kết quả thật.** Chạy thật trên server thật (không mock), phân loại mỗi ca fail vào đúng 1 trong 3 nhóm: lỗi script (sửa ngay) / bug thật của SUT (viết bug report) / không tự động hoá được (ghi lý do).
5. **Phase 5 — Gap analysis & audit log.** Ghi lại đúng bộ ba **Bằng chứng → Nguyên nhân → Cách sửa** cho mỗi lỗi AI mắc phải (xem mục Gap Analysis của từng feature bên dưới), cập nhật `docs/anh-khoa/ai audit report.md` ngay sau mỗi lượt.

**Nguyên tắc xuyên suốt:** `expected` trong mọi file `test-data/*.json` bám đúng SRS (`README.md` gốc của SUT), **không** chỉnh theo hành vi lỗi hiện tại để "làm cho xanh" — một assertion fail chính là bằng chứng bug, không phải lỗi automation. Việc này được xác minh lại bằng Playwright MCP (chạy thật, đọc Accessibility Tree, không suy đoán từ file `.jsx` tĩnh) trong lượt rà soát cuối trước khi chấp nhận kết quả.

---

# 1. FR-01 — Đăng ký tài khoản (Pool A)

## 1.1 Automation

- **Script:** `tests/e2e/specs/register.spec.ts` · **Data:** `tests/e2e/test-data/register.json` · **17 test case** (`TC-REGISTER-001` → `017`), chuyển thể từ `tests/test-cases/register/`.
- **5 assertion pattern:** điều hướng (`toHaveURL`), thuộc tính DOM/Constraint Validation API (`validity.valueMissing`), nội dung văn bản (`errorBanner.toContainText`), network request (`page.on('request')` đếm số lần gọi `/api/register`), phản hồi API tầng backend (`GET /api/users/me` kiểm hash mật khẩu).

## 1.2 Kết quả thực thi (3 browser)

| Chromium        | Firefox         | WebKit          |
| :-------------- | :-------------- | :-------------- |
| 9 Pass / 8 Fail | 9 Pass / 8 Fail | 9 Pass / 8 Fail |

Kết quả **giống hệt nhau tuyệt đối** trên cả 3 browser — không có sai lệch do đặc thù engine trình duyệt.

## 1.3 Bug Report

| Bug ID               | Tiêu đề                                                             | Found by TC                 | Severity | Priority | GitHub Issue #                                                              |
| -------------------- | ------------------------------------------------------------------- | --------------------------- | -------- | -------- | --------------------------------------------------------------------------- |
| **BUG-REGISTER-001** | Regex mật khẩu phía frontend chặn TẤT CẢ mật khẩu hợp lệ theo FR-01 | TC-REGISTER-001, -015, -016 | Critical | P1       | [#215](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/215) |
| **BUG-REGISTER-002** | Form đăng ký thiếu trường "Xác nhận mật khẩu"                       | TC-REGISTER-013, -014       | Major    | P2       | [#216](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/216) |
| **BUG-REGISTER-003** | Không validate định dạng email khi đăng ký                          | TC-REGISTER-003             | Major    | P2       | [#217](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/217) |
| **BUG-REGISTER-004** | Không kiểm tra email trùng khi đăng ký                              | TC-REGISTER-004             | Critical | P1       | [#218](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/218) |
| **BUG-REGISTER-005** | (SEC-01) Mật khẩu lưu plaintext trong CSDL                          | TC-REGISTER-017             | Blocker  | P0       | [#219](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/219) |

## 1.4 AI Gap Analysis

### Lỗi #1 — Dữ liệu test khiến 2 bug khác nhau bị nhầm lẫn, che khuất lẫn nhau

**Phân loại:** Hardcode data trùng lặp giữa các ca không liên quan.

**Bằng chứng** — `tests/e2e/test-data/register.json`, ca `TC-REGISTER-003`/`004` (bản gốc): dùng chung mật khẩu `Abcd123!` với `TC-REGISTER-001`. Xác minh trực tiếp bằng Playwright MCP (điền form thật, không đoán): cả 2 ca đều dừng ở banner _"Mật khẩu quá yếu!..."_ thay vì thông báo về email — nghĩa là assertion `contains: "email"` / `contains: "tồn tại"` fail **sai lý do**.

**Nguyên nhân:** `Chất lượng prompt`. `BUG-REGISTER-001` (mật khẩu hợp lệ theo FR-01 luôn bị regex lỗi chặn) đã được AI tự phát hiện và ghi vào `knownIssues` từ trước, nhưng khi soạn dữ liệu cho `TC-REGISTER-003`/`004`, AI không tự đối chiếu ngược "mật khẩu baseline mình vừa dùng có nằm trong tập bị chặn hay không" — mỗi ca được soạn độc lập theo đúng mô tả gốc của nó mà không kiểm tra tương tác chéo với bug đã biết ở ca khác.

**Cách sửa:** Tách `TC-REGISTER-003`/`004` khỏi vòng lặp UI chính, gọi thẳng `POST /api/register` (giống cách đã làm với `TC-REGISTER-017`/SEC-01) để cô lập đúng lỗi cần kiểm, không phụ thuộc trạng thái mật khẩu. `TC-REGISTER-004` dùng email tạm riêng (không phải `test@eshop.com`) để không phá dữ liệu đăng nhập dùng chung với `cart.json`/`product.json`. Đã chạy lại xác nhận: cả 2 ca giờ fail đúng lý do (email không được validate/không kiểm trùng), không còn bị lẫn với bug mật khẩu.

## 1.5 Test case không tự động hoá qua UI

| TC-ID                    | Lý do không tự động hoá                                       | Hướng xử lý thay thế                                       |
| ------------------------ | ------------------------------------------------------------- | ---------------------------------------------------------- |
| TC-REGISTER-013, 014     | Form không có trường "Xác nhận mật khẩu"                      | Đổi sang assert sự TỒN TẠI của field                       |
| TC-REGISTER-017 (SEC-01) | Mật khẩu hợp lệ luôn bị regex chặn, không đăng ký được qua UI | Gọi thẳng API `/api/register → /api/login → /api/users/me` |
| TC-REGISTER-003, 004     | Cùng lý do trên (xem Gap #1)                                  | Gọi thẳng API, tách khỏi vòng lặp UI                       |

---

# 2. FR-07 — Giỏ hàng (Pool B)

## 2.1 Automation

- **Script:** `tests/e2e/specs/cart.spec.ts` · **Data:** `tests/e2e/test-data/cart.json` · **13 test case** (`TC-CART-001` → `013`).
- **5 assertion pattern:** đối chiếu UI với dữ liệu gốc từ API (`assertLines`), sự tồn tại của element bắt buộc (`toHaveCount`), nội dung văn bản hiển thị (`getByText`/`toContainText`), sự kiện trình duyệt (`page.on('dialog')`), điều hướng (`toHaveURL`).

## 2.2 Kết quả thực thi (3 browser)

| Chromium         | Firefox          | WebKit           |
| :--------------- | :--------------- | :--------------- |
| 1 Pass / 12 Fail | 1 Pass / 12 Fail | 1 Pass / 12 Fail |

Giống hệt nhau tuyệt đối trên cả 3 browser.

## 2.3 Bug Report

| Bug ID           | Tiêu đề                                                                     | Found by TC                      | Severity | Priority | GitHub Issue #                                                              |
| ---------------- | --------------------------------------------------------------------------- | -------------------------------- | -------- | -------- | --------------------------------------------------------------------------- |
| **BUG-CART-001** | Nút "Thêm vào giỏ hàng" ở trang chi tiết nuốt mất lượt bấm đầu tiên         | TC-CART-001                      | Critical | P1       | [#220](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/220) |
| **BUG-CART-002** | Thêm lại sản phẩm đã có tạo dòng trùng thay vì cộng dồn số lượng            | TC-CART-002                      | Major    | P2       | [#221](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/221) |
| **BUG-CART-003** | Bảng giỏ hàng không có nút +/- để chỉnh số lượng                            | TC-CART-003, -004, -005          | Major    | P2       | [#222](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/222) |
| **BUG-CART-004** | Xoá sản phẩm khỏi giỏ không có dialog xác nhận                              | TC-CART-007, -008                | Major    | P2       | [#223](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/223) |
| **BUG-CART-005** | Sai nhãn chữ trong bảng giỏ hàng ("Giá"/"Tổng tạm tính")                    | TC-CART-001, -006                | Minor    | P3       | [#224](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/224) |
| **BUG-CART-006** | Trạng thái giỏ hàng rỗng thiếu icon/hình minh hoạ (FR-24)                   | TC-CART-009                      | Minor    | P3       | [#225](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/225) |
| **BUG-CART-007** | Nhãn nút "quay lại mua sắm" không nhất quán giữa 2 trạng thái giỏ hàng      | _(ngoài 13 TC gốc — xem Gap #1)_ | Minor    | P3       | [#226](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/226) |
| **BUG-CART-008** | Ô Số lượng không chặn 0/âm/rỗng — tạo dòng giỏ hàng hiển thị NaN            | TC-CART-011                      | Critical | P1       | [#227](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/227) |
| **BUG-CART-009** | Giỏ hàng bị mất hoàn toàn sau khi tải lại trang (F5)                        | TC-CART-013                      | Major    | P2       | [#228](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/228) |
| **BUG-CART-010** | Route `/checkout` không có guard, vào thẳng URL khi chưa đăng nhập vẫn được | TC-CART-012                      | Critical | P1       | [#229](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/229) |

## 2.4 AI Gap Analysis

### Lỗi #1 — Setup của 1 test case nhắm nhầm trạng thái UI mà chính AI đã biết là không nhất quán

**Phân loại:** Thiếu ca biên / mâu thuẫn nội bộ giữa các ca.

**Bằng chứng** — `tests/e2e/test-data/cart.json`, ca `TC-CART-010` (bản gốc): `setup` seed sẵn 1 sản phẩm trước khi tìm link "Tiếp tục mua sắm". Nhưng chính `knownIssues` của cùng file này đã ghi rõ: nhãn nút quay lại chỉ đúng "Tiếp tục mua sắm" ở trạng thái giỏ **rỗng** (`Cart.jsx:24`); khi giỏ **có hàng** nút đổi thành "← Mua tiếp" (`Cart.jsx:66-68`). Xác minh lại bằng Playwright MCP (đọc `getByRole('link').allTextContents()` ở cả 2 trạng thái) xác nhận đúng như vậy.

**Nguyên nhân:** `Đặc thù tính năng`. AI đã phát hiện đúng bug nhãn không nhất quán và ghi vào `knownIssues`, nhưng khi thiết kế **setup** cho một ca KHÁC (`TC-CART-010`, vốn theo đúng Preconditions gốc "giỏ có thể có hoặc không có sản phẩm"), AI chọn nhánh "có sản phẩm" mà không tự đối chiếu lại với phát hiện của chính mình — hai phần output (bug tự tìm ra vs. thiết kế setup của ca khác) không được cross-check với nhau dù cùng nằm trong 1 file.

**Cách sửa:** Đổi `setup` của `TC-CART-010` về mảng rỗng (giỏ RỖNG) — đúng nhánh mà nhãn khớp spec, nhờ đó test thực sự kiểm được hành vi điều hướng (mục đích thật của ca này) thay vì luôn fail ngay ở bước tìm link. Bug nhãn không nhất quán vẫn được ghi nhận độc lập tại `BUG-CART-007`.

### Lỗi #2 — Vòng lặp BVA dùng assertion cứng, chỉ báo được kết quả của bộ dữ liệu đầu tiên

**Phân loại:** Assertion yếu (che giấu kết quả của các ca sau trong cùng 1 test).

**Bằng chứng** — `tests/e2e/specs/cart.spec.ts`, case `quantityGuard` (bản gốc): vòng `for` qua 4 bộ dữ liệu biên (D1=`0`, D2=`-1`, D3=`""`, D4=`1`) dùng `expect()` thường (không phải `.soft()`). Chạy thật: `expect().toHaveCount(0)` fail ngay ở D1 → Playwright ném lỗi, vòng lặp dừng, D2/D3/D4 **không bao giờ được kiểm** trong lần chạy đó.

**Nguyên nhân:** `Giới hạn mô hình`. AI áp dụng đúng pattern "kiểm nhiều bộ dữ liệu biên trong 1 test" nhưng không tính đến việc `expect()` (không phải `expect.soft()`) sẽ **dừng cả vòng lặp** ngay khi 1 bộ dữ liệu fail — hệ quả thực thi của framework, không phải lỗi tư duy về nghiệp vụ.

**Cách sửa:** Đổi cả 2 nhánh (`shouldAdd`/`!shouldAdd`) sang `expect.soft()`. Chạy lại: lộ thêm rằng D2 (âm) và D3 (rỗng) cũng bị lỗi tương tự D1 (trước đó hoàn toàn không thấy được), đúng tinh thần "1 lần chạy phơi bày được nhiều finding" mà skill yêu cầu.

## 2.5 Test case không tự động hoá qua UI

Không có ca nào trong 13 ca phải chuyển hẳn sang API — toàn bộ automate được qua UI (khác FR-01/FR-15).

---

# 3. FR-15 — Quản lý Sản phẩm Admin (Pool C)

## 3.1 Automation

- **Script:** `tests/e2e/specs/product.spec.ts` · **Data:** `tests/e2e/test-data/product.json` · **18 test case** (`TC-PRODUCT-001` → `018`).
- **5 assertion pattern:** thao tác form UI đối chiếu API, Constraint Validation API (`validity.valueMissing`), phản hồi API (`res.ok()`), mã trạng thái HTTP (`toContain(res.status())`), sự tồn tại của element bắt buộc (`toHaveCount`).

## 3.2 Kết quả thực thi (3 browser)

| Chromium         | Firefox          | WebKit           |
| :--------------- | :--------------- | :--------------- |
| 7 Pass / 11 Fail | 8 Pass / 10 Fail | 8 Pass / 10 Fail |

`TC-PRODUCT-015` flaky giữa các lần chạy (không cố định theo browser cụ thể) — xem Gap #2.

## 3.3 Bug Report

| Bug ID              | Tiêu đề                                                                                      | Found by TC                      | Severity | Priority | GitHub Issue #                                                              |
| ------------------- | -------------------------------------------------------------------------------------------- | -------------------------------- | -------- | -------- | --------------------------------------------------------------------------- |
| **BUG-PRODUCT-001** | (SEC-02) API tạo/sửa/xoá sản phẩm không yêu cầu xác thực (JWT)                               | TC-PRODUCT-013                   | Blocker  | P0       | [#230](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/230) |
| **BUG-PRODUCT-002** | (SEC-03) `authenticateToken` không kiểm tra role — user thường thực hiện được thao tác admin | TC-PRODUCT-014                   | Blocker  | P0       | [#231](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/231) |
| **BUG-PRODUCT-003** | Không validate Giá sản phẩm (chấp nhận 0, âm, trống, không phải số)                          | TC-PRODUCT-007, -008, -009, -010 | Critical | P1       | [#232](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/232) |
| **BUG-PRODUCT-004** | Tên sản phẩm không giới hạn độ dài tối đa 255 ký tự                                          | TC-PRODUCT-006                   | Minor    | P3       | [#233](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/233) |
| **BUG-PRODUCT-005** | Danh mục không thực sự bắt buộc (UI không cho bỏ trống, backend không kiểm tồn tại)          | TC-PRODUCT-011, -012             | Major    | P2       | [#234](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/234) |
| **BUG-PRODUCT-006** | Sửa 1 sản phẩm làm đổi TÊN hiển thị của TẤT CẢ sản phẩm khác                                 | TC-PRODUCT-015                   | Critical | P1       | [#235](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/235) |
| **BUG-PRODUCT-007** | Giá sản phẩm trong danh sách Admin hiển thị không có dấu phân cách hàng nghìn (FR-21)        | TC-PRODUCT-017                   | Minor    | P3       | [#236](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/236) |

## 3.4 AI Gap Analysis

### Lỗi #1 — Locator khớp chuỗi con thay vì chính xác, khớp nhầm hàng loạt dòng khác trong bảng

**Phân loại:** Locator giòn.

**Bằng chứng** — `tests/e2e/specs/product.spec.ts`:

```typescript
// Code AI sinh ra (bản gốc)
function productRow(page: Page, name: string): Locator {
  return productTable(page).filter({ hasText: name });
}
```

Chạy thật `TC-PRODUCT-003` (tên sản phẩm boundary = 1 ký tự `"A"`): `productRow(page, 'A')` khớp **5-6 dòng** trong bảng thay vì đúng 1 dòng, vì `filter({ hasText })` của Playwright khớp **chuỗi con, không phân biệt hoa/thường** — bất kỳ dòng nào chứa chữ "a"/"A" ở bất cứ đâu (tên sản phẩm khác, giá, nút...) đều khớp. `expect(...).toHaveCount(1)` fail sai lý do (không phải vì sản phẩm không tồn tại, mà vì locator quá rộng).

**Nguyên nhân:** `Chất lượng prompt` kết hợp `Đặc thù tính năng`. Helper `productRow()` được dùng chung cho MỌI test case, phần lớn dùng tên có token `{{unique}}` (dài, gần như không đụng hàng) nên `hasText` substring "tình cờ" hoạt động đúng suốt 17/18 ca — chỉ riêng `TC-PRODUCT-002`/`003` (test biên độ dài tên, dùng chuỗi lặp ký tự `A`) mới bộc lộ điểm yếu, vì đây là kết hợp đặc biệt giữa (a) một helper dùng chung, thiết kế cho dữ liệu dài/duy nhất, và (b) đúng loại dữ liệu biên (ký tự lặp, ngắn) mà BVA cố tình sinh ra để test giới hạn.

**Cách sửa:**

```typescript
// Code sau khi sửa
function productRow(page: Page, name: string): Locator {
  return productTable(page).filter({ has: page.getByRole('cell', { name, exact: true }) });
}
```

Khớp **chính xác** nội dung cell "Tên SP" (`getByRole('cell', { name, exact: true })`) thay vì toàn bộ text của cả dòng — ổn định với mọi độ dài tên, đã xác minh lại bằng Playwright MCP (tạo/xoá sản phẩm tên `"A"` thật, đếm số dòng khớp) trước khi sửa vào script, và chạy lại toàn suite xác nhận `TC-PRODUCT-003` pass, không ảnh hưởng 17 ca còn lại.

### Lỗi #2 — Bug hiển thị phụ thuộc thời điểm alert() chặn luồng JS, khiến 1 test case flaky

**Phân loại:** Đặc thù tính năng (race condition ở SUT, không phải lỗi script).

**Bằng chứng** — chạy 2 lượt full suite liên tiếp cho `TC-PRODUCT-015`: lượt 1 fail cả 3 browser; lượt 2 chỉ fail chromium, pass ở firefox/webkit. `frontend-admin/src/App.jsx:110-114` gọi `alert("Cập nhật thành công!")` **ngay sau** `setProducts(fakeMassUpdatedProducts)` — `alert()` chặn đồng bộ luồng JS trong trình duyệt thật, nên thời điểm React thực sự flush DOM phụ thuộc việc engine trình duyệt xử lý dialog nhanh hay chậm so với `expect.soft()` đang chờ đọc DOM.

**Nguyên nhân:** `Đặc thù tính năng`. Đây là race condition có thật trong chính SUT (không phải AI viết assertion sai) — `expect.soft()` với retry mặc định (5s) đủ để bắt được bug trong đa số trường hợp nhưng không tuyệt đối 100%, vì bug gốc phụ thuộc thời điểm dialog được xử lý.

**Cách sửa:** Không sửa assertion (bug chức năng mass-rename là có thật, đã xác nhận qua source và qua ảnh chụp — xem `BUG-PRODUCT-006`, ảnh chụp còn cho thấy hiện tượng nghiêm trọng hơn dự kiến: **toàn bộ 9 sản phẩm** trong bảng bị đổi tên trùng, không chỉ 1 sản phẩm khác). Ghi nhận rõ tính flaky trong bug report và báo cáo này thay vì cố "sửa cho xanh" — che giấu flakiness sẽ làm mất đúng dữ liệu quý cho gap analysis.

## 3.5 Test case không tự động hoá qua UI

| TC-ID               | Lý do không tự động hoá                                                                | Hướng xử lý thay thế                          |
| ------------------- | -------------------------------------------------------------------------------------- | --------------------------------------------- |
| TC-PRODUCT-010      | `input type="number"` không cho nhập ký tự `abc` qua UI                                | Gọi thẳng `POST /api/products`                |
| TC-PRODUCT-011      | Không thể tạo trạng thái "chưa chọn danh mục" qua UI (select luôn có giá trị mặc định) | Đổi sang assert sự TỒN TẠI của option rỗng    |
| TC-PRODUCT-012      | Chỉ có thể chọn category từ danh sách có sẵn qua UI                                    | Gọi thẳng API với `category_id` không tồn tại |
| TC-PRODUCT-013, 014 | Cần kiểm response code khi thiếu token / sai role — không thao tác qua form            | Dùng `request` fixture gọi thẳng API          |

---

# 4. Agent Skills

## 4.1 `playwright-automation` — QA Automation Architect (Playwright)

- **Vai trò:** Biến bảng test case (≥12 ca) thành suite Playwright data-driven chạy đa trình duyệt, kèm HTML report có dấu vết tác giả và gap analysis trung thực.
- **Quy tắc bất di bất dịch (4 điều, luôn kiểm trước khi kết thúc mỗi phase):** không hardcode data trong `.spec.ts`; ≥3 assertion pattern; cấm `page.waitForTimeout()`; ưu tiên locator theo accessibility (`getByRole`/`getByLabel`/`getByPlaceholder`) hơn CSS/XPath cấu trúc.
- **Quy trình 5 phase, có điểm dừng xác nhận giữa Phase 1 → 2** (chính là chốt "human review" mà đề bài yêu cầu): Chiến lược & Ánh xạ → Sinh data+script → Cấu hình đa trình duyệt → Thực thi & phân loại → Gap analysis + audit log. Chi tiết áp dụng thật cho từng feature: xem mục 1–3 ở trên.
- **Giá trị quan sát được trong dự án:** buộc AI phải tự phân loại MỖI ca fail vào đúng 1 trong 3 nhóm (lỗi script / bug thật / không automate được) thay vì gộp mơ hồ — đây chính là cơ chế tách được 4 lỗi script thật (mục Gap Analysis) khỏi 22 bug thật của SUT.

## 4.2 `bug-reporting` — Bug Reporting Specialist

- **Vai trò:** Chuẩn hoá 1 defect quan sát được thành bug report đúng field của `templates/bug_report.md`, sinh đồng thời GitHub Issue body + file `.md` tại `tests/bug-reports/[module]/`.
- **Áp dụng thật:** dùng cho toàn bộ 22 bug của 3 feature. Sau khi viết xong 22 file, quay lại xác nhận từng bug bằng Playwright MCP (tái hiện đúng bước "Steps to reproduce", chụp ảnh thật) — không dùng ảnh dựng/giả, kể cả 5 bug chỉ tồn tại ở tầng API (dựng trang tối giản hiển thị request/response thật rồi chụp, có ghi rõ đây là bằng chứng tầng API).

## 4.3 `ai-audit-logger` — Audit Compliance Assistant

- **Vai trò:** Lớp ghi log chạy kèm các skill khác — bắt buộc copy nguyên văn, đầy đủ output gốc vào `docs/anh-khoa/ai audit report.md`, không tóm tắt.
- **Giá trị quan sát được:** toàn bộ nội dung "AI Gap Analysis" của báo cáo này chỉ viết lại chính xác được nhờ log này tồn tại nguyên văn — không có nó, không thể chứng minh AI đã đọc source ở đâu, sai ở đâu, sửa lúc nào.

## 4.4 Con người verify ở đâu

- **Ở Phase 1 (grounding):** người dùng tự đọc trước source và nêu nghi ngờ cụ thể (số dòng), AI verify lại — không để AI tự grounding một mình.
- **Ở Phase 4 (thực thi):** phát hiện lỗi tự đưa flag `--reporter=list` khi chạy CLI ghi đè hoàn toàn cấu hình `reporter` trong `playwright.config.ts` (mất báo cáo "Run by: 23127211") — tự phát hiện qua việc kiểm tra file report có tồn tại đúng chỗ hay không, không tin tưởng mù quáng vào "lệnh chạy xong không lỗi = kết quả đúng".
- **Ở giai đoạn rà soát cuối:** dùng Playwright MCP điều hướng trình duyệt thật để xác nhận lại từng locator/hành vi thay vì tin vào việc đọc file `.jsx` tĩnh — đây là cách duy nhất bắt được cả 4 lỗi ở mục Gap Analysis, vì cả 4 đều chỉ lộ ra khi chạy thật, không lộ ra khi chỉ đọc code.

---

## Github-issues

![Github-issues](<github-issues(1).png>)
![Github-issues](<github-issues(2).png>)

---

## Git Commit Log (mục 12)

Đạt yêu cầu **≥8 commit đụng file `.spec.ts`, trải trên ≥4 ngày khác nhau** — hiện có **8 commit / 5 ngày** (05, 06, 07, 08, 09/08/2026):

| Ngày       | Commit    | Nội dung                                                                 |
| ---------- | --------- | ------------------------------------------------------------------------ |
| 2026-08-05 | `7bbe646` | test(register): automate FR-01 theo hướng data-driven                    |
| 2026-08-06 | `eb67fb8` | test(register): cover all 17 FR-01 test cases (data-driven)              |
| 2026-08-07 | `e64fc50` | test(cart): automate all 13 FR-07 test cases (data-driven)               |
| 2026-08-07 | `a56a52a` | test(product): automate all 18 FR-15 admin CRUD test cases (data-driven) |
| 2026-08-08 | `48decb8` | fix: refine test case setups in cart.spec.ts and cart.json               |
| 2026-08-08 | `4089d52` | fix: improve product row locator to match exact cell content             |
| 2026-08-08 | `81df2fc` | fix: enhance API tests for email format and duplication cases            |
| 2026-08-09 | `13099f9` | fix: harden `rowFor()` locator in cart.spec.ts to exact cell match       |
