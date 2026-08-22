Tôi sử dụng công cụ AI cho các nhiệm vụ sau,

### Entry 1

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:30
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Sinh test case API cho FR-04 `PUT /api/users/me`
- Prompt đã dùng (nguyên văn):
  > bạn hãy sử dụng skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/api-test-case-generator' để gen cho tôi các test cases cho api PUT /api/users/me của FR04 được mô tả ở mục 2.1 trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/api_specification.md' và đặc tả của tính năng ở FR04 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/README.md', log lại trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/AI_Audit_Report.md' với skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/ai-audit-report', viết các test cases vào trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/api', ngoài ra cho tôi một danh sách các api đã tạo để ở trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report, với một cột label để tôi tự đánh là VALID, INVALID, INCOMPLETE, và cột Ghi chú
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã sinh 44 test case tiếng Việt cho FR-04 `PUT /api/users/me` theo quy trình 4 vòng: Domain Partition, State Transition/bất biến hồ sơ và xác thực, Security SEC-01/02/04/05/06/07, và Schema Validation. Ban đầu tạo file `submission/tests/test-cases/api/FR04_PUT_api_users_me_test_cases.xlsx` theo các cột chuẩn HW06, đồng thời tạo `submission/docs/ai-report/Generated_API_Test_Suites_Review_List.md` có cột Label và Ghi chú.
- Những gì em thay đổi/giữ lại từ kết quả này: Giữ lại ý tưởng và kịch bản của 44 test case để chuẩn bị chuyển sang định dạng Markdown từng file và phân rã thành bảng review chi tiết.

### Entry 2

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:36
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Chuyển test case FR-04 `PUT /api/users/me` thành từng file Markdown riêng
- Prompt đã dùng (nguyên văn):
  > mỗi test case là một file md giống như này 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/login/TC-LOGIN-001.md', ở trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/Generated_API_Test_Suites_Review_List.md' thì liệt kê hết các api ra dạng bảng, ghi chú rõ là tạo cho api nào vì sau này sẽ có thêm cho các api khác, danh sách các test cases để ở trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/api' thì nên ở trong một folder nữa để phân biệt giữa api này với api khác, nãy tôi có nhầm một tí là đặc tả của api là mục 2.2 trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/api_specification.md'
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã chuyển bộ test FR-04 `PUT /api/users/me` từ một workbook Excel thành 44 file Markdown riêng trong `submission/tests/test-cases/api/FR04_PUT_api_users_me/`, theo cấu trúc của file mẫu. Đã cập nhật `Generated_API_Test_Suites_Review_List.md` để liệt kê test suite/API với endpoint, method, mục 2.2 trong đặc tả API, thư mục output, số lượng test case, Label và Ghi chú. Đã xóa artifact Excel cũ.
- Những gì em thay đổi/giữ lại từ kết quả này: Giữ lại toàn bộ cấu trúc 44 file Markdown phân chia theo thư mục `FR04_PUT_api_users_me/` và xóa bỏ artifact Excel không cần thiết.

### Entry 3

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:45
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Viết lại test case FR-04 bằng tiếng Việt có dấu và mở rộng danh sách review thành từng dòng test case
- Prompt đã dùng (nguyên văn):
  > ghi tiếng việt có dấu cho mỗi test cases, ngoài ra không phải liệt kê đúng một dòng trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/Generated_API_Test_Suites_Review_List.md' mà là toàn bộ test cases cho api đó để tôi đánh giá xem là test cases đó có chuẩn không, có ổn không dựa trên các tiêu chí valid, invalid và incomplete
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã viết lại toàn bộ 44 file Markdown test case cho FR-04 `PUT /api/users/me` bằng tiếng Việt có dấu. Đã mở rộng `Generated_API_Test_Suites_Review_List.md` từ một dòng test suite thành bảng review theo từng test case, mỗi test case một dòng và có cột trống `Label` / `Ghi chú` để em tự đánh giá VALID, INVALID hoặc INCOMPLETE.
- Những gì em thay đổi/giữ lại từ kết quả này: Em đã hoàn thành đánh giá và gán nhãn cho toàn bộ 44 test case AI của FR-04 (`VALID: 20`, `INCOMPLETE: 24`, `INVALID: 0`). Giữ lại các ý tưởng kiểm thử phù hợp, đồng thời hiệu chỉnh các case INCOMPLETE theo hướng quan sát status, response và state thực tế; loại bỏ việc ép mã lỗi, độ dài, trim hoặc schema chưa có căn cứ trong spec và bổ sung bước GET/snapshot để tạo oracle rõ ràng. Em tự thiết kế thêm 7 test case human (SEC-013 đến SEC-016, ST-006 đến ST-008) để mở rộng độ bao phủ về scheme Authorization, prototype pollution, IDOR alias và rollback trạng thái (tổng cộng 51 test cases).

### Entry 4

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:50
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Tạo file test run cho FR-04 `PUT /api/users/me`
- Prompt đã dùng (nguyên văn):
  > 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-runs/api' viết luôn test run giúp tôi, có thể tham khảo 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/CATEGORY-test-run.md'
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã tạo `submission/tests/test-runs/api/FR04_PUT_api_users_me_test_run.md` theo cấu trúc của `CATEGORY-test-run.md`. File test run liệt kê đủ 44 test case của FR-04 `PUT /api/users/me` với các cột module, tester, result, related bug và note. Tất cả kết quả được để là `Not Run` vì chưa có kết quả chạy thực tế hoặc bug ID thật.
- Những gì em thay đổi/giữ lại từ kết quả này: Giữ lại file test run template để quản lý quá trình thực thi kiểm thử thực tế và sẵn sàng điền kết quả (Result/Bug ID) sau khi chạy Newman/Postman.

### Entry 5

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 21:01
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Sinh test case API cho FR-09 `POST /api/apply-coupon` và FR-17 `POST /api/admin/coupons`
- Prompt đã dùng (nguyên văn):
  > dựa vào cấu trúc hiện tại của 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests' và sử dụng skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/api-test-case-generator', đọc 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/README.md' về FR09 và FR17, 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/api_specification.md' mục 5.1 và 6.4 viết cho tôi các test cases cho POST /api/apply-coupon và POST /api/admin/coupons
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã đọc skill `api-test-case-generator`, các checklist domain/security/schema, FR-09 và FR-17 trong `README.md`, cùng mục 5.1 và 6.4 trong `api_specification.md`. Đã sinh 40 test case Markdown cho `POST /api/apply-coupon` trong `submission/tests/test-cases/api/FR09_POST_api_apply_coupon/` và 42 test case Markdown cho `POST /api/admin/coupons` trong `submission/tests/test-cases/api/FR17_POST_api_admin_coupons/`. Đã append thêm Phần 2 và Phần 3 vào `Generated_API_Test_Suites_Review_List.md` để em tự đánh giá từng test case theo Label/Ghi chú.
- Những gì em thay đổi/giữ lại từ kết quả này: Em đã hoàn thành audit, đánh nhãn và mở rộng cho cả hai API Coupon:
  - **FR-09 (`POST /api/apply-coupon`)**: Đánh nhãn 40 case AI (`VALID: 18`, `INCOMPLETE: 22`, `INVALID: 0`), hiệu chỉnh expected result theo hướng quan sát status, response và `use_count` trước/sau thay vì áp đặt mã HTTP hoặc tác dụng phụ chưa có căn cứ. Em tự thiết kế thêm 6 test case human (SEC-009 đến SEC-011, ST-006 đến ST-008) bao phủ race condition, giả mạo dữ liệu kết hợp, encoded payload và biên thời gian `expired_at` (tổng cộng 46 test cases).
  - **FR-17 (`POST /api/admin/coupons`)**: Đánh nhãn 42 case AI (`VALID: 18`, `INCOMPLETE: 24`, `INVALID: 0`), hiệu chỉnh các case áp đặt schema/format/status chưa có trong đặc tả bằng cách ghi nhận response, trạng thái coupon và kết quả tạo/xóa/tái tạo để đối chiếu với contract hiện có. Em tự thiết kế thêm 6 test case human (SEC-007 đến SEC-009, ST-006 đến ST-008) bao phủ giả mạo quyền role trong body, race condition tạo trùng, SQL/XSS mã hóa và vòng đời coupon sau xóa (tổng cộng 48 test cases).

### Entry 6

- Công cụ: Codex
- Ngày/giờ: 2026-08-19 23:59
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Tạo dữ liệu data-driven cho FR-04 `PUT /api/users/me`
- Prompt đã dùng (nguyên văn):
  > sử dụng skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/postman-newman-runner', hãy đọc 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/api/FR04_PUT_api_users_me' và xây dựng file dữ liệu để hỗ trợ việc test theo hướng data driven, file đặt tại 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-runs/api/FR04_PUT_api_users_me', đọc kĩ 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/api_specification.md' và 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/README.md' để xem các dữ liệu có sẵn trong cơ sở dữ liệu cho việc kiểm thử, tạo file dữ liệu chi tiết và toàn diện hỗ trợ tốt, là file json
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã tạo `submission/tests/test-runs/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me_data_driven.json` là mảng JSON tương thích Postman/Newman, bao phủ 51/51 test case FR04. Mỗi iteration có body, header Authorization, Content-Type, expected status hoặc status class, kiểm tra profile sau request và setup/teardown. File dùng dữ liệu seed user test `id=2` và admin `id=1`; token được tham chiếu bằng biến môi trường. Đã kiểm tra JSON parse được, body JSON hợp lệ, đủ mã test case và format Prettier.
- Những gì em thay đổi/giữ lại từ kết quả này: Em giữ lại toàn bộ 51 iteration data và các dữ liệu seed đã xác nhận. Em dùng `expected_status: null` cùng `expected_status_class: "observe"` cho các case chưa có oracle status trong specification để ghi nhận kết quả thực thi rồi đánh giá, không tự coi là pass.

### Entry 7

- Công cụ: Codex
- Ngày/giờ: 2026-08-20 00:21
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Tạo dữ liệu data-driven cho FR-09 và FR-17
- Prompt đã dùng (nguyên văn):
  > thực hiện tạo các file dữ liệu data drive cho 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/api/FR09_POST_api_apply_coupon' và 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/api/FR17_POST_api_admin_coupons' vào các thư mục 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-runs/api/FR09_POST_api_apply_coupon' và 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-runs/api/FR17_POST_api_admin_coupons' tương ứng, đọc kĩ 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/api_specification.md' và 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/README.md' để biết các dữ liệu có trong hệ thống, lấy 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-runs/api/FR04_PUT_api_users_me' làm mẫu
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã tạo hai mảng JSON tương thích Postman/Newman: `FR09_POST_api_apply_coupon_data_driven.json` gồm 46/46 iteration và `FR17_POST_api_admin_coupons_data_driven.json` gồm 48/48 iteration. Mỗi iteration có header Authorization, Content-Type, body JSON, expected status/status class, kiểm tra state và setup/teardown. Dữ liệu dùng các fixture seed admin `id=1`, user test `id=2`, và coupon `SAVE10`, `BIGBUY`, `VIP100`, `EXPIRED`. Đã kiểm tra hai chiều với test case source, parse toàn bộ body JSON và format bằng Prettier.
- Những gì em thay đổi/giữ lại từ kết quả này: Em giữ lại toàn bộ 94 iteration data và cấu trúc nhất quán với FR04. Em dùng oracle theo FR/API specification thay vì source code để các sai lệch như FR09 thiếu JWT/kiểm tra ngưỡng sai và FR17 không kiểm tra role admin được ghi nhận là Fail khi thực thi; các case chưa có oracle status cố định vẫn dùng `observe` để đánh giá sau khi quan sát response/state.

### Entry 8

- Công cụ: Codex
- Ngày/giờ: 2026-08-20 16:20
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Tạo Postman collection và environment data-driven cho FR-04, FR-09 và FR-17
- Prompt đã dùng (nguyên văn):
  > sử dụng skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/postman-newman-runner', hãy tạo postman collection và Environment `local.postman_environment.json` cho cả 3 API (FR04, FR09, FR17) ứng với từng folder trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-runs/api', tương thích với các file data json ứng với mỗi folder của FR, collection có Pre-request script gắn `X-Student-Id: 23127115`, request setup login lấy token, request chính đọc động body/header từ data file, và assertions kiểm tra status code và response time, log lại trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/AI_Audit_Report.md' với skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/ai-audit-report'
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã tạo một Postman environment dùng chung tại `submission/tests/test-runs/api/local.postman_environment.json` và ba collection Postman v2.1 tương ứng trong các thư mục FR04, FR09 và FR17. Mỗi collection có collection-level pre-request script bắt buộc gắn và log `X-Student-Id: 23127115`; request setup đăng nhập bằng tài khoản seed để lưu token user/admin; request chính đọc động Authorization, Content-Type và body từ từng iteration data. Assertions kiểm tra status chính xác hoặc status class theo oracle của data file, thời gian phản hồi dưới ngưỡng môi trường và đánh dấu `observe` là cần xem xét thay vì tự động pass. Đã xác thực bốn file JSON, đối chiếu đủ 51/46/48 iteration và kiểm tra cú pháp toàn bộ script Postman.
- Những gì em thay đổi/giữ lại từ kết quả này: Em giữ lại một environment dùng chung để tránh lặp cấu hình và ba collection tách theo API để chạy độc lập với từng data file. Em giữ cơ chế login lấy token động, header mã sinh viên ở cấp collection và các assertion theo `expected_status`/`expected_status_class`; các iteration `observe` được hiển thị là cần đánh giá thủ công sau khi xem response và state thực tế, không được tính là tự động đạt.
