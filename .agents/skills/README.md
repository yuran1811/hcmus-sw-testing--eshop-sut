# Danh mục Agent Skills

Thư mục này chứa các **Agent Skill tùy chỉnh** dùng để hướng dẫn trợ lý AI thực hiện quy trình kiểm thử hiệu năng, duy trì trách nhiệm giải trình khi dùng AI và hỗ trợ tạo tài liệu.

Mỗi skill nằm trong một thư mục riêng. File `SKILL.md` mô tả metadata, điều kiện kích hoạt, input cần thiết, quy trình và sản phẩm đầu ra; thư mục `references/` là tùy chọn.

```text
.agents/skills/
├── <tên-skill>/
│   ├── SKILL.md       # Hướng dẫn chính và metadata
│   └── references/    # Tài liệu hoặc mẫu tham khảo (nếu có)
└── README.md
```

## Các skill hiện có

| Skill                                                                     | Mục đích                                                                                         | Khi nào được kích hoạt                                                                           |
| ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| [`perf-scope-planner`](./perf-scope-planner/SKILL.md)                     | Phân loại API thành auth-heavy, read-heavy và transactional; thiết kế workflow E2E.              | Khi cần xác định phạm vi, chọn endpoint hoặc xây dựng workflow hiệu năng.                        |
| [`perf-data-generator`](./perf-data-generator/SKILL.md)                   | Sinh CSV tham số hóa, tài khoản kiểm thử và script seed; giảm rủi ro account lockout.            | Khi cần tạo dữ liệu cho JMeter/k6, seed dữ liệu hoặc reset tài khoản bị khóa.                    |
| [`perf-testplan-generator`](./perf-testplan-generator/SKILL.md)           | Thiết kế JMeter JMX hoặc k6 script cho Load, Stress, Spike và các profile liên quan.             | Khi cần tạo/review test plan hoặc chọn VU, ramp-up, duration, think time, assertion và listener. |
| [`perf-jtl-analyzer`](./perf-jtl-analyzer/SKILL.md)                       | Phân tích raw JTL, tính error rate/throughput/p90/p95/p99 và phản biện kết luận AI.              | Khi cần đọc kết quả JMeter, tìm endurance threshold hoặc phân loại đề xuất khả thi/ảo giác.      |
| [`ai-audit-report`](./ai-audit-report/SKILL.md)                           | Duy trì AI Audit Report theo nguyên tắc một prompt thật tương ứng một entry; hỗ trợ AI Critique. | Trong các tương tác AI cần ghi tool, thời gian, prompt, output và phần sinh viên giữ/sửa.        |
| [`doc_generator`](../../submission/.agents/skills/doc_generator/SKILL.md) | Hỗ trợ tạo báo cáo, đề xuất, đặc tả và tài liệu có cấu trúc.                                     | Khi yêu cầu tạo hoặc cập nhật tài liệu với các đầu ra do skill quy định.                         |
| [`md-to-pdf`](../../submission/.agents/skills/md-to-pdf/SKILL.md)         | Hướng dẫn xuất Markdown thành PDF có định dạng nhất quán.                                        | Khi người dùng yêu cầu xuất Markdown sang PDF bằng cấu hình và stylesheet chuyên dụng.           |

## Chuỗi sử dụng cho kiểm thử hiệu năng

```text
perf-scope-planner
        ↓
perf-data-generator
        ↓
perf-testplan-generator
        ↓
perf-jtl-analyzer
        ↓
ai-audit-report (được duy trì xuyên suốt toàn bộ quy trình)
```

Quy trình này giúp bảo đảm endpoint và workflow được xác định trước khi tạo dữ liệu/tải; test plan được human-review trước khi chạy; raw log được kiểm chứng trước khi chấp nhận kết luận của AI; mọi tương tác được ghi lại để truy vết.

## Cách sử dụng

Agent có thể tự phát hiện skill dựa trên phần `description` trong frontmatter của `SKILL.md`. Người dùng cũng có thể gọi đích danh skill trong prompt, ví dụ:

> Hãy sử dụng skill `perf-jtl-analyzer` để tính lại p95 từ raw JTL và đối chiếu với báo cáo hiện tại.

Khi một skill được kích hoạt, agent phải đọc toàn bộ `SKILL.md` trước khi hành động, tuân thủ input/output được mô tả và không bỏ qua bước human review.

## Nguyên tắc bảo trì

- Mỗi thư mục skill phải có `SKILL.md` hợp lệ.
- README chỉ liệt kê những skill thực sự còn tồn tại trong `.agents/skills/`.
- Khi thêm, đổi tên hoặc xóa skill, phải cập nhật bảng danh mục và chuỗi quy trình.
- Không xem output AI là kết quả cuối nếu skill yêu cầu kiểm chứng bằng source code, raw log hoặc bằng chứng thực thi.
