# API Test Execution

Thư mục này chứa toàn bộ artifact để thực thi và báo cáo 145 test case API của FR04, FR09 và FR17. Test case Markdown và review nằm ở `submission/tests/test-cases/api` và `submission/docs/ai-report`; thư mục này chứa dữ liệu chạy, Postman collection, environment, fixture và runner.

## Cấu trúc

```text
api/
|-- local.postman_environment.json
|-- FR04_PUT_api_users_me/
|   |-- FR04_PUT_api_users_me.postman_collection.json
|   |-- FR04_PUT_api_users_me_data_driven.json
|   `-- FR04_PUT_api_users_me_test_run.md
|-- FR09_POST_api_apply_coupon/
|-- FR17_POST_api_admin_coupons/
|-- reports/
`-- support/
    |-- build-postman-collections.cjs
    |-- finalize-test-oracles.cjs
    |-- fixture-server.cjs
    |-- run-api-tests.cjs
    `-- validate-api-artifacts.cjs
```

Mỗi FR có ba file cùng tiền tố:

- `*_postman_collection.json`: collection Postman v2.1, gồm login, fixture setup, request chính, follow-up hoặc sequence đặc biệt, hậu kiểm state và teardown.
- `*_data_driven.json`: mảng iteration data; mỗi phần tử tương ứng đúng một `test_id` trong test case Markdown và test-run Markdown.
- `*_test_run.md`: bảng ghi kết quả thực thi chính thức, ban đầu là `Not Run` và được runner cập nhật khi chạy full.

`local.postman_environment.json` chứa `baseUrl`, `fixtureBaseUrl`, `studentId`, token và các biến dùng chung. `reports/` nhận báo cáo Newman HTML/JSON và file `_results.json`; các báo cáo smoke/special chỉ là bằng chứng kiểm tra hạ tầng, còn báo cáo full là kết quả chính thức.

## Vì sao dùng `.cjs`

Các file trong `support/` là script Node.js, không phải test case. Đuôi `.cjs` buộc Node chạy theo CommonJS, tương thích trực tiếp với `require("newman")`, `require("node:sqlite")` và cách gọi hiện tại của project mà không cần đặt toàn bộ project sang ES module (`"type": "module"`). Có thể chạy trực tiếp bằng `node path/to/file.cjs`; không cần build hoặc transpile.

Vai trò của từng script:

- `finalize-test-oracles.cjs`: đồng bộ expected status, response schema, state oracle và fixture metadata vào test case/data. Script không thay đổi nhãn review AI `VALID`/`INCOMPLETE`/`INVALID`.
- `build-postman-collections.cjs`: sinh lại ba collection và environment từ data/oracle đã chốt.
- `validate-api-artifacts.cjs`: kiểm tra 145 ID, số lượng row, file Markdown, expected result, collection, environment và cú pháp Postman script trước khi chạy.
- `fixture-server.cjs`: service nội bộ tại `127.0.0.1:3001`, reset/snapshot/verify/teardown dữ liệu users, coupons và coupon_usage. Đây không phải endpoint của SUT.
- `run-api-tests.cjs`: khởi động hoặc xác minh SUT, khởi động fixture, chạy Newman tuần tự cho ba suite, xuất báo cáo và cập nhật bảng test run ở chế độ full.

Không nên xóa `support/` nếu muốn chạy lại đầy đủ với setup fixture, state transition, sequence đặc biệt và báo cáo tự động. Nếu chỉ import collection để gửi request thủ công, các file sinh artifact và validator có thể không được gọi, nhưng `fixture-server.cjs` vẫn cần vì collection dùng các request fixture.

## Chuẩn bị artifact

```powershell
npm run prepare:api-tests
```

Lệnh này đồng bộ exact oracle vào 145 test case/data và sinh lại ba collection. Chỉ chạy khi execution contract trong `Generated_API_Test_Suites_Review_List.md` đã được chấp nhận.

Chạy preflight trước khi thực thi để kiểm tra số lượng, ID, oracle, fixture precondition, bảng test run, collection và environment:

```powershell
npm run validate:api-tests
```

Preflight phải báo `Validated 145/145 API cases, data rows, test-run rows and Postman setup.` Nếu preflight thất bại, chưa nên chạy Newman vì kết quả có thể không còn ánh xạ đúng giữa test case và iteration.

## Chạy toàn bộ

```powershell
npm run test:api
```

Runner thực hiện tuần tự FR04, FR09 và FR17 trên cổng `3100` để tránh xung đột với phiên backend thủ công ở cổng `3000`. Mỗi iteration reset fixture liên quan, đăng nhập lấy token động, gắn `X-Student-Id`, chạy request chính hoặc sequence đặc biệt, kiểm tra response/state và teardown.

Luồng thực thi là:

```text
data-driven JSON
        |
        v
fixture/setup -> login -> request hoặc sequence -> schema/security/state assertions
        |                                                   |
        +---------------- fixture/state + teardown <---------+
                                                            |
                                                            v
                                      Newman HTML/JSON + test_id results + test-run Markdown
```

Trong runner tự động, backend SUT được khởi động với `PORT=3100` và fixture dùng cổng `3001`. Environment Postman vẫn để `baseUrl=http://127.0.0.1:3000` để chạy thủ công theo cấu hình local thông thường. Có thể đổi cổng runner bằng biến môi trường `API_TEST_PORT`, ví dụ `$env:API_TEST_PORT=3200`.

Mỗi suite xuất ba artifact vào `reports/`: báo cáo HTML, Newman JSON đầy đủ và `_results.json` ánh xạ trực tiếp `test_id` sang Pass/Fail cùng assertion lỗi. Chỉ chế độ chạy toàn bộ tự cập nhật ngày chạy, tổng Pass/Fail và từng dòng trong file `_test_run.md`; hai chế độ xác minh bên dưới không sửa kết quả chính thức.

`_results.json` là bản tóm tắt máy đọc được:

```json
{
  "test_id": "FR04-USRME-DP-001",
  "result": "Pass",
  "failures": []
}
```

Một test case chỉ được `Pass` khi status, response time, JSON/schema, security assertion và hậu điều kiện state đều đạt. Test âm với expected `400`, `401`, `403`, `404`, `409` hoặc `415` vẫn là `Pass` nếu SUT trả đúng mã đó và các assertion còn lại đạt. `Fail` là sai khác so với oracle, không đồng nghĩa test case bị thiết kế sai.

Kiểm tra nhanh hạ tầng với case đầu tiên của mỗi FR:

```powershell
npm run test:api:smoke
```

Kiểm tra riêng các nhánh follow-up, retry, concurrency, time boundary và lifecycle:

```powershell
npm run test:api:verify-special
```

Hai lệnh trên không cập nhật kết quả chính thức trong các file `*_test_run.md`. Chúng chỉ kiểm tra nhanh infrastructure và các sequence rủi ro. Muốn cập nhật toàn bộ 145 dòng, phải chạy `npm run test:api`.

## Chạy thủ công trong Postman

1. Cài dependency bằng `npm install`; fixture dùng `node:sqlite`, nên dùng Node.js 22 trở lên.
2. Chạy backend tại `http://127.0.0.1:3000`.
3. Chạy `node submission/tests/test-runs/api/support/fixture-server.cjs` trong terminal riêng.
4. Import `local.postman_environment.json` và collection cần chạy.
5. Chọn environment local, kiểm tra `studentId=23127115` và `baseUrl=http://127.0.0.1:3000`.
6. Trong Collection Runner, chọn đúng file `_data_driven.json` của FR và chạy toàn bộ iteration.
7. Mở Postman Console và chụp dòng log `X-Student-Id: 23127115` làm bằng chứng theo yêu cầu bài tập. Screenshot phải do sinh viên tự chụp trong lúc chạy; script chỉ tạo log, không thay thế bằng chứng này.

Khi chạy thủ công, request fixture chỉ dùng để chuẩn bị và kiểm tra dữ liệu test. Không đưa các request `/fixture/*` vào báo cáo như API chức năng của SUT. Kết quả chính cần đối chiếu với `test_id`, expected result trong test case Markdown và response thực tế.

## Cách đọc kết quả

- `Pass`: toàn bộ assertion của iteration đạt, bao gồm expected status và state oracle.
- `Fail`: ít nhất một assertion không đạt; xem `failures` trong `_results.json` hoặc chi tiết trong HTML report.
- `Not Run`: test case chưa được chạy ở chế độ full.
- `Related Bug`: chỉ điền mã bug sau khi xác nhận failure là lỗi sản phẩm, không điền cho negative test cố ý trả lỗi.

Các lỗi như SUT trả `200` thay vì expected `201`, lộ `password`, hoặc tính `discount_amount` âm phải được ghi nhận là sai khác sản phẩm và giữ nguyên evidence trong report. Không đổi expected status chỉ để làm test pass.

## Chuẩn bị nộp bài

Nộp các thành phần sau:

- Ba thư mục FR có collection, data-driven JSON và test-run Markdown.
- `local.postman_environment.json`, `README.md` và `support/`.
- Báo cáo Newman HTML/JSON của lần chạy full nếu đã thực thi.
- `package.json` và `package-lock.json` để tái tạo lệnh chạy.

Không nộp `node_modules/`. Trước khi đóng gói, chạy `npm run format:json`, `npm run validate:api-tests` và kiểm tra các file report chính thức.

Fixture service chỉ lắng nghe `127.0.0.1:3001` và chỉ thao tác ba nhóm dữ liệu liên quan trực tiếp: users, coupons và coupon_usage. Không thêm test endpoint vào SUT.

## Xử lý lỗi thường gặp

- `Port 3000` bị chiếm: runner tự dùng cổng `3100`; khi chạy Postman thủ công, dừng backend cũ hoặc đổi `baseUrl`.
- `Port 3001` bị chiếm: dừng fixture service cũ trước khi chạy lại; runner chỉ tái sử dụng service có định danh `hw06-api-fixture`.
- `npm` bị chặn bởi PowerShell Execution Policy: dùng `npm.cmd run <script>`.
- Preflight báo lệch ID hoặc thiếu expected result: chạy `npm run prepare:api-tests`, sau đó chạy lại `npm run validate:api-tests`.
- Newman có failure nhưng fixture setup/state/teardown đều pass: kiểm tra assertion trong `_results.json`; đây thường là sai khác behavior của SUT, không phải lỗi tổ chức test run.
