Tôi sử dụng công cụ AI cho các nhiệm vụ sau,

### Entry 1

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:30
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Sinh test case API cho FR-04 `PUT /api/users/me`
- Prompt đã dùng (nguyên văn):
  > bạn hãy sử dụng skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/api-test-case-generator' để gen cho tôi các test cases cho api PUT /api/users/me của FR04 được mô tả ở mục 2.1 trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/api_specification.md' và đặc tả của tính năng ở FR04 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/README.md', log lại trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/AI_Audit_Report.md' với skill 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/.agents/skills/ai-audit-report', viết các test cases vào trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/api', ngoài ra cho tôi một danh sách các api đã tạo để ở trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report, với một cột label để tôi tự đánh là VALID, INVALID, INCOMPLETE, và cột Ghi chú
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã sinh 44 test case tiếng Việt cho FR-04 `PUT /api/users/me` theo quy trình 4 vòng: Domain Partition, State Transition/bất biến hồ sơ và xác thực, Security SEC-01/02/04/05/06/07, và Schema Validation. Ban đầu tạo file `submission/tests/test-cases/api/FR04_PUT_api_users_me_test_cases.xlsx` theo các cột chuẩn HW06, đồng thời tạo `submission/docs/ai-report/Generated_API_Test_Suites_Review_List.md` có cột Label và Ghi chú.
- Những gì sinh viên thay đổi/giữ lại từ kết quả này: Chờ review thủ công; sinh viên sẽ đánh nhãn các test case là VALID, INVALID hoặc INCOMPLETE.

### Entry 2

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:36
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Chuyển test case FR-04 `PUT /api/users/me` thành từng file Markdown riêng
- Prompt đã dùng (nguyên văn):
  > mỗi test case là một file md giống như này 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/login/TC-LOGIN-001.md', ở trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/Generated_API_Test_Suites_Review_List.md' thì liệt kê hết các api ra dạng bảng, ghi chú rõ là tạo cho api nào vì sau này sẽ có thêm cho các api khác, danh sách các test cases để ở trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-cases/api' thì nên ở trong một folder nữa để phân biệt giữa api này với api khác, nãy tôi có nhầm một tí là đặc tả của api là mục 2.2 trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/api_specification.md'
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã chuyển bộ test FR-04 `PUT /api/users/me` từ một workbook Excel thành 44 file Markdown riêng trong `submission/tests/test-cases/api/FR04_PUT_api_users_me/`, theo cấu trúc của file mẫu. Đã cập nhật `Generated_API_Test_Suites_Review_List.md` để liệt kê test suite/API với endpoint, method, mục 2.2 trong đặc tả API, thư mục output, số lượng test case, Label và Ghi chú. Đã xóa artifact Excel cũ.
- Những gì sinh viên thay đổi/giữ lại từ kết quả này: Chờ review thủ công; sinh viên sẽ dùng bảng suite và các file Markdown để audit tiếp.

### Entry 3

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:45
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Viết lại test case FR-04 bằng tiếng Việt có dấu và mở rộng danh sách review thành từng dòng test case
- Prompt đã dùng (nguyên văn):
  > ghi tiếng việt có dấu cho mỗi test cases, ngoài ra không phải liệt kê đúng một dòng trong 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/docs/ai-report/Generated_API_Test_Suites_Review_List.md' mà là toàn bộ test cases cho api đó để tôi đánh giá xem là test cases đó có chuẩn không, có ổn không dựa trên các tiêu chí valid, invalid và incomplete
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã viết lại toàn bộ 44 file Markdown test case cho FR-04 `PUT /api/users/me` bằng tiếng Việt có dấu. Đã mở rộng `Generated_API_Test_Suites_Review_List.md` từ một dòng test suite thành bảng review theo từng test case, mỗi test case một dòng và có cột trống `Label` / `Ghi chú` để sinh viên tự đánh giá VALID, INVALID hoặc INCOMPLETE.
- Những gì sinh viên thay đổi/giữ lại từ kết quả này: Chờ review thủ công; sinh viên sẽ đánh giá từng dòng test case.

### Entry 4

- Công cụ: Codex
- Ngày/giờ: 2026-08-18 16:50
- Ngữ cảnh nhiệm vụ: HW06 API Testing - Tạo file test run cho FR-04 `PUT /api/users/me`
- Prompt đã dùng (nguyên văn):
  > 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/submission/tests/test-runs/api' viết luôn test run giúp tôi, có thể tham khảo 'g:/HCMUS/NAM3-HK3/Testing/Homework/HW6/hcmus-sw-testing--eshop-sut/CATEGORY-test-run.md'
- Kết quả AI trả về (nguyên văn hoặc tóm tắt trung thực nếu quá dài - có ghi chú nếu đã rút gọn):
  > Đã tạo `submission/tests/test-runs/api/FR04_PUT_api_users_me_test_run.md` theo cấu trúc của `CATEGORY-test-run.md`. File test run liệt kê đủ 44 test case của FR-04 `PUT /api/users/me` với các cột module, tester, result, related bug và note. Tất cả kết quả được để là `Not Run` vì chưa có kết quả chạy thực tế hoặc bug ID thật.
- Những gì sinh viên thay đổi/giữ lại từ kết quả này: Chờ thực thi; sinh viên sẽ cập nhật Result và Related Bug sau khi chạy test.
