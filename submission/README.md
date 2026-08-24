# HW06 — Kiểm thử API dựa trên AI

## Thông tin

- **Họ tên:** Mạch Quốc Tấn
- **MSSV:** 23127115
- **Repository:** [yuran1811/hcmus-sw-testing--eshop-sut](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw6/23127115-mqtan)
- **Nhánh:** `hw6/23127115-mqtan`

## Mục lục

- [API đã chọn](#api-đã-chọn)
- [Bảng tự đánh giá](#bảng-tự-đánh-giá)
- [Tóm tắt kiểm thử](#tóm-tắt-kiểm-thử)
- [Kết quả chính](#kết-quả-chính)
- [Cấu trúc submission](#cấu-trúc-submission)
- [Tài liệu chính](#tài-liệu-chính)
- [Kiểm kê sản phẩm nộp](#kiểm-kê-sản-phẩm-nộp)
- [Liên kết thực thi](#liên-kết-thực-thi)
- [Cách tái lập và kiểm tra](#cách-tái-lập-và-kiểm-tra)
- [Checklist trước khi đóng gói](#checklist-trước-khi-đóng-gói)

## API đã chọn

- Pool A: FR-04 — `PUT /api/users/me`.
- Pool B: FR-09 — `POST /api/apply-coupon`.
- Pool C: FR-17 — `POST /api/admin/coupons`.

## Bảng tự đánh giá

| STT | Tiêu chí                                                   | Điểm tối đa | Tự đánh giá |
| --- | ---------------------------------------------------------- | ----------: | ----------: |
| 1   | API FR-04 — đủ Generate, Audit, Extend, Execute, Report    |          30 |          30 |
| 2   | API FR-09 — đủ Generate, Audit, Extend, Execute, Report    |          30 |          30 |
| 3   | API FR-17 — đủ Generate, Audit, Extend, Execute, Report    |          30 |          30 |
| 4   | Agent Skill/test generator — đã có pseudocode, sơ đồ tự vẽ |          10 |          10 |
|     | **Tổng**                                                   |     **100** |     **100** |

## Tóm tắt kiểm thử

| Chỉ số                             | FR-04 | FR-09 | FR-17 | Tổng |
| ---------------------------------- | ----: | ----: | ----: | ---: |
| Test case AI sinh                  |    44 |    40 |    42 |  126 |
| Audit VALID                        |    20 |    18 |    18 |   56 |
| Audit INVALID                      |     0 |     0 |     0 |    0 |
| Audit INCOMPLETE đã bổ sung oracle |    24 |    22 |    24 |   70 |
| Test case Human bổ sung            |     7 |     6 |     6 |   19 |
| Test case cuối/đã thực thi         |    51 |    46 |    48 |  145 |
| Pass                               |     0 |    20 |     2 |   22 |
| Fail                               |    51 |    26 |    46 |  123 |
| Assertion failure                  |   168 |    70 |   147 |  385 |
| Bug hợp lệ                         |     5 |     7 |     5 |   17 |

## Kết quả chính

- Full run: **22 Pass / 123 Fail / 145 test case**.
- Assertion failure: **385**.
- Bug hợp lệ: **17** — 5 Critical, 8 Major, 4 Minor.
- GitHub Issues hợp lệ: #330–#346; Issue #347 đã đóng do false positive.
- Header bắt buộc: `X-Student-Id: 23127115`.
- Đã sử dụng Postman data-driven, variables, environment, pre-request/test scripts, examples, Mock Server và Monitor.
- GitHub Actions có run tất cả smoke assertions Pass và run chính xác một assertion Fail.

## Cấu trúc submission

```text
submission/
├── README.md
├── git_commit_log.txt
├── docs/
│   ├── main_report.md
│   ├── main_report.pdf
│   ├── _requirement/
│   └── ai-report/
│       ├── AI_Audit_Report.md
│       ├── AI_Audit_Report.pdf
│       ├── AI_Critique.md
│       ├── AI_Critique.pdf
│       └── Generated_API_Test_Suites_Review_List.md
├── .agents/
│   └── skills/
│       ├── HW6_AI_Test_Generator.drawio
│       └── HW6_AI_Test_Generator.png
└── tests/
    ├── test-cases/api/       # 145 test case Markdown + 3 workbook Excel
    ├── test-runs/api/        # Postman, Newman, CI/CD, images
    ├── bug-reports/api/      # 17 bug report hợp lệ
    └── test-summary/         # Summary và traceability
```

## Tài liệu chính

- [Báo cáo chính](./docs/main_report.md)
- [Báo cáo chính PDF](./docs/main_report.pdf)
- [AI Audit Report](./docs/ai-report/AI_Audit_Report.md)
- [AI Audit Report PDF](./docs/ai-report/AI_Audit_Report.pdf)
- [AI Critique](./docs/ai-report/AI_Critique.md)
- [AI Critique PDF](./docs/ai-report/AI_Critique.pdf)
- [Sơ đồ AI Test Generator](./.agents/skills/HW6_AI_Test_Generator.png)
- [Source Draw.io](./.agents/skills/HW6_AI_Test_Generator.drawio)
- [Human Review List](./docs/ai-report/Generated_API_Test_Suites_Review_List.md)
- [Excel FR-04](./tests/test-cases/api/FR04_PUT_api_users_me/FR04_PUT_api_users_me_test_cases.xlsx)
- [Excel FR-09](./tests/test-cases/api/FR09_POST_api_apply_coupon/FR09_POST_api_apply_coupon_test_cases.xlsx)
- [Excel FR-17](./tests/test-cases/api/FR17_POST_api_admin_coupons/FR17_POST_api_admin_coupons_test_cases.xlsx)
- [Test Summary](./tests/test-summary/test-summary-report.md)
- [Traceability Matrix](./tests/test-summary/traceability-matrix.md)
- [Execution Summary](./tests/test-runs/api/execution-summary.md)
- [Postman Features](./tests/test-runs/api/postman-features-used.md)
- [CI/CD Report](./tests/test-runs/api/ci-cd-report.md)
- [Bug Reports](./tests/bug-reports/README.md)
- [Git Commit Log](./git_commit_log.txt)

## Kiểm kê sản phẩm nộp

| Nhóm sản phẩm              | Số lượng/trạng thái                              | Nguồn chính                                                                          |
| -------------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------ |
| API được kiểm thử          | 3 API, lần lượt thuộc Pool A/B/C                 | [Báo cáo chính](./docs/main_report.md)                                               |
| Test case Markdown         | 145 file                                         | [`tests/test-cases/api`](./tests/test-cases/api)                                     |
| Test case Excel            | 3 workbook, tổng 145 dòng                        | Các liên kết Excel FR-04/FR-09/FR-17 ở trên                                          |
| Human review               | 126 case AI được gán nhãn, 19 case human bổ sung | [Human Review List](./docs/ai-report/Generated_API_Test_Suites_Review_List.md)       |
| Postman                    | 3 collection, 1 environment, 3 data-driven JSON  | [Hướng dẫn thực thi](./tests/test-runs/api/README.md)                                |
| Newman full run chính thức | 3 HTML + 3 JSON + 3 file kết quả rút gọn         | [`tests/test-runs/api/reports`](./tests/test-runs/api/reports)                       |
| Ảnh bằng chứng             | 19 ảnh Postman, Newman, Issues và GitHub Actions | [`tests/test-runs/api/images`](./tests/test-runs/api/images)                         |
| Bug report hợp lệ          | 17 Markdown, tương ứng Issues #330–#346          | [Bug Report Index](./tests/bug-reports/README.md)                                    |
| AI Audit và AI Critique    | Đủ Markdown + PDF; Critique 261 từ               | [`docs/ai-report`](./docs/ai-report)                                                 |
| API test generator         | Draw.io, PNG tự vẽ, pseudocode và video demo     | [Mục 9 báo cáo chính](./docs/main_report.md#9-thiết-kế-ai-driven-api-test-generator) |
| CI/CD                      | Một run Pass và một run đúng một assertion Fail  | [CI/CD Report](./tests/test-runs/api/ci-cd-report.md)                                |
| Nhật ký Git                | File văn bản                                     | [Git Commit Log](./git_commit_log.txt)                                               |

Các report `smoke` và `special_verify` là bằng chứng hỗ trợ hạ tầng/sequence. Ba report không có hậu tố này, mang ngày chạy `2026-08-22`, là full run chính thức dùng để thống kê 22 Pass và 123 Fail.

## Liên kết thực thi

- Repository: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut
- Issues: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues
- Actions: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions
- CI Pass: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32650809959
- CI đúng một failure: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32650917696
- Video demo Agent Skill: https://youtu.be/mCW0X0skeoo

## Cách tái lập và kiểm tra

Từ thư mục gốc của repository, dùng Node.js 22 trở lên và dependencies từ `package-lock.json`:

```powershell
npm install
npm run validate:api-tests
npm run test:api
```

- `validate:api-tests` phải báo `Validated 145/145 API cases, data rows, test-run rows and Postman setup.`
- `test:api` chạy lần lượt FR-04, FR-09 và FR-17, tạo Newman HTML/JSON và cập nhật bảng test run.
- Không cần chạy lại trước khi nộp nếu muốn giữ nguyên bằng chứng chính thức ngày 22/08/2026.
- Cổng chạy, fixture và cách chạy Postman thủ công nằm trong [API Test Execution README](./tests/test-runs/api/README.md).
- Không commit credential/token thật; environment nộp bài chỉ chứa cấu hình local và biến phục vụ chạy test.

## Checklist trước khi đóng gói

- [x] Repository GitHub công khai, chứa collections, scripts và reports.
- [x] Ba API thuộc ba pool.
- [x] Mỗi API có ít nhất 35 test case.
- [x] Generate → Audit → Extend → Execute → Report bugs.
- [x] 145 test case và traceability.
- [x] Ba workbook Excel chứa đủ 51 + 46 + 48 = 145 test case.
- [x] Ba Postman collections, environment và data-driven JSON.
- [x] Ba Newman HTML/JSON report.
- [x] Postman features, Mock Server và Monitor.
- [x] Bug reports và GitHub Issues.
- [x] CI/CD report, hai commits/runs và screenshots.
- [x] AI Audit Report Markdown.
- [x] Main report Markdown.
- [x] Sinh viên tự viết AI Critique 200–300 từ.
- [x] Sinh viên tự vẽ/chèn sơ đồ AI test generator và source Draw.io.
- [x] Video demo Agent Skill.
- [x] Xuất main report PDF.
- [x] Xuất AI Audit/AI Critique PDF.
- [x] Tạo `git_commit_log.txt`.
- [x] README có bảng tự đánh giá và thống kê bắt buộc.
- [x] Link video demo Agent Skill: https://youtu.be/mCW0X0skeoo.
- [ ] Sau khi review, commit và push toàn bộ thay đổi lên nhánh `hw6/23127115-mqtan`.
- [ ] Tạo file `23127115_HW06_AI_API_100.zip`, bảo đảm thư mục gốc trong ZIP là nội dung của `submission`.
- [ ] Mở thử file ZIP, kiểm tra các PDF/Excel/HTML và nộp lên Moodle trước hạn.
