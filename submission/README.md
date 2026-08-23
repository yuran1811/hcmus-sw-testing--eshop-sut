# HW06 — Kiểm thử API dựa trên AI

## Thông tin

- **Họ tên:** Mạch Quốc Tấn
- **MSSV:** 23127115
- **Repository:** [yuran1811/hcmus-sw-testing--eshop-sut](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/tree/hw6/23127115-mqtan)
- **Nhánh:** `hw6/23127115-mqtan`

## API đã chọn

- Pool A: FR-04 — `PUT /api/users/me`.
- Pool B: FR-09 — `POST /api/apply-coupon`.
- Pool C: FR-17 — `POST /api/admin/coupons`.

## Bảng tự đánh giá tạm thời

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
    ├── test-cases/api/       # 145 test case Markdown
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
- [Test Summary](./tests/test-summary/test-summary-report.md)
- [Traceability Matrix](./tests/test-summary/traceability-matrix.md)
- [Execution Summary](./tests/test-runs/api/execution-summary.md)
- [Postman Features](./tests/test-runs/api/postman-features-used.md)
- [CI/CD Report](./tests/test-runs/api/ci-cd-report.md)
- [Bug Reports](./tests/bug-reports/README.md)
- [Git Commit Log](./git_commit_log.txt)

## Liên kết thực thi

- Repository: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut
- Issues: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues
- Actions: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions
- CI Pass: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32650809959
- CI đúng một failure: https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/actions/runs/32650917696
- Video demo Agent Skill: https://youtu.be/MjByvUU5z4k

## Checklist trước khi đóng gói

- [x] Ba API thuộc ba pool.
- [x] Mỗi API có ít nhất 35 test case.
- [x] Generate → Audit → Extend → Execute → Report bugs.
- [x] 145 test case và traceability.
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
