# Sơ đồ luồng kiểm thử hiệu năng liên tục

Sơ đồ này là phần trực quan của đề xuất phiên bản 1.3 trong [continuous-performance-testing.md](./continuous-performance-testing.md). Blueprint GitHub Actions/JMeter CLI nằm tại [continuous-performance-ci-blueprint.md](./continuous-performance-ci-blueprint.md). `Hard gate?` phụ thuộc profile: Load/Soak sau hiệu chỉnh là hard gate; PR smoke ban đầu và Stress/Spike hiện tại là advisory.

```mermaid
flowchart TD
    A[GitHub event<br/>Commit / PR / Schedule / Manual] --> A1[GitHub Actions concurrency<br/>Giữ SHA mới nhất, hủy job SHA cũ]
    A1 --> AS{Commit từ nguồn tin cậy?}
    AS -->|Không, fork PR| AS1[SKIPPED_SECURITY hoặc hosted validation<br/>Không chạy code trên self-hosted runner]
    AS -->|Có| B[Thu thập commit SHA, git diff,<br/>baseline key và khôi phục baseline]
    B --> C{Sự kiện hoặc thay đổi nào?}

    C -->|Docs hoặc ngoài backend API| D[SKIPPED<br/>Ghi lý do và commit SHA]
    C -->|JMX / CSV / parser / threshold config| E0[Validate test harness<br/>Mở baseline version mới]
    C -->|Backend pull request| E{Mức rủi ro thay đổi}
    C -->|Merge main hoặc nightly| F[Load 50 VU trên runner chuẩn]
    C -->|Weekly schedule| G[Soak 180 VU<br/>12 phút]
    C -->|Release candidate / manual full| H[Load + Stress + Spike + Soak 180<br/>Soak 230 exploratory]

    E -->|Thông thường| I[PR smoke 10 VU<br/>2-5 phút]
    E -->|DB/query/transaction/auth/dependency/config| I2[PR smoke tăng cường 20 VU<br/>3-5 phút]
    E0 --> I2

    I --> J[Seed/reset dữ liệu và lockout<br/>Preflight runner + warm-up]
    I2 --> J
    F --> J
    G --> J
    H --> J

    J --> K{Setup và metadata hợp lệ?}
    K -->|Không| L[INVALID<br/>Sửa môi trường rồi chạy lại]
    K -->|Có| M[Script chạy JMeter CLI non-GUI<br/>-n -t -l -j -e -o]

    M --> M1[Upload raw JTL, JMeter/backend log,<br/>HTML report và metadata]
    M1 --> N[Script tính p95/p99/error/throughput/sample count<br/>toàn run + sampler + late-run]
    N --> N1{Đủ sample và đúng baseline key?}
    N1 -->|Không| L
    N1 -->|Có| P{Vi phạm error/failure gate?}

    P -->|Có| GM{Profile là hard gate?}
    P -->|Không| O{Có rolling/golden baseline<br/>cùng profile và cùng key?}

    O -->|Chưa đủ| O1[BOOTSTRAP / OBSERVE<br/>Tắt relative gate]
    O -->|Có| R{Vượt p95 absolute gate,<br/>rolling >20% và >=10 ms,<br/>golden >25% và >=15 ms,<br/>hoặc late-run trend xấu?}
    O1 --> R0{Vượt p95 absolute gate?}

    R -->|Không| S[PASS]
    R -->|Có| T[WARNING<br/>Chạy lại thêm 2 lần]
    R0 -->|Không| S0[PASS bootstrap<br/>Thêm baseline sample hợp lệ]
    R0 -->|Có| T

    T --> U{Absolute breach hoặc severe regression<br/>lặp lại ít nhất 2/3?}
    U -->|Có| GM
    U -->|Không| V[WARNING do nhiễu/chưa chắc chắn<br/>Không chặn, lưu để theo dõi]

    GM -->|Có| Q[FAIL<br/>Chặn merge/release và điều tra]
    GM -->|Không| V1[WARNING / INVESTIGATE<br/>Tạo artifact hoặc issue, không chặn]

    S --> W{Main + runner chuẩn<br/>+ baseline key khớp?}
    S0 --> W
    W -->|Có| X[Cập nhật rolling window<br/>Golden chỉ đổi khi được duyệt]
    W -->|Không| Y[Không cập nhật baseline]

    D --> Z[Đăng status check và liên kết artifact]
    AS1 --> Z
    L --> Z
    Q --> Z
    V --> Z
    V1 --> Z
    X --> Z
    Y --> Z
```

## Chú giải trạng thái

- `PASS`: metric đạt gate và không có tín hiệu hồi quy p95.
- `WARNING`: tín hiệu có thể là regression hoặc nhiễu; pipeline xác nhận bằng rerun và yêu cầu theo dõi.
- `WARNING / INVESTIGATE`: vi phạm đã xác nhận trong profile advisory; tạo bằng chứng/issue nhưng chưa chặn.
- `FAIL`: regression p95 lặp lại hoặc error/failure hợp lệ trong profile hard-gate; chặn merge hay release.
- `INVALID`: phép đo không đáng tin do setup, runner, dữ liệu hoặc artifact; không quy kết cho commit.
- `SKIPPED`: commit không ảnh hưởng phạm vi backend API; quyết định bỏ qua vẫn được ghi lại để kiểm toán.
- `SKIPPED_SECURITY`: commit đến từ nguồn không tin cậy nên không được thực thi trên self-hosted runner; chỉ chạy hosted validation hoặc chờ maintainer kích hoạt từ nhánh tin cậy.
- `BOOTSTRAP / OBSERVE`: profile chưa đủ baseline; chỉ dùng absolute/error gate và thu dữ liệu, chưa dùng relative p95 để chặn.
