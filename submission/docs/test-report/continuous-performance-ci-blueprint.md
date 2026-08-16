# Blueprint GitHub Actions và JMeter CLI cho Task 3

Tài liệu này cụ thể hóa cách triển khai mô hình trong [continuous-performance-testing.md](./continuous-performance-testing.md). Đây là **mã minh họa ở mức đề xuất**, chưa phải bằng chứng workflow đã chạy trong repository.

## 1. Cấu trúc file đề xuất

```text
.github/workflows/performance.yml
scripts/perf/classify-change.ps1
scripts/perf/prepare-sut.ps1
scripts/perf/restore-baseline.ps1
scripts/perf/invoke-performance-gate.ps1
scripts/perf/run-jmeter.ps1
scripts/perf/analyze-jtl.ps1
scripts/perf/compare-baseline.ps1
scripts/perf/publish-summary.ps1
scripts/perf/stop-sut.ps1
perf-baselines/<baseline-key>/golden.json
artifacts/current/baseline/rolling.json  # generated from main PASS history
```

Script là ranh giới tái lập: GitHub Actions chỉ chọn trigger/profile và gọi script; logic tính p95 hoặc gate không viết trực tiếp rải rác trong YAML. Cùng script phải chạy được từ repo root trên máy local để điều tra một job CI.

## 2. Workflow GitHub Actions minh họa

```yaml
name: continuous-performance

on:
  pull_request:
    paths:
      - 'backend/**'
      - 'submission/tests/1-test-plans/**'
      - 'test-data/**'
      - 'scripts/perf/**'
  push:
    branches: [main]
  schedule:
    - cron: '0 19 * * *' # 02:00 Asia/Saigon, nightly Load
    - cron: '0 20 * * 6' # 03:00 Sunday Asia/Saigon, weekly Soak
  workflow_dispatch:
    inputs:
      profile:
        type: choice
        options: [auto, smoke, load, soak, release]
        default: auto

concurrency:
  group: perf-${{ github.event.pull_request.number || github.ref }}
  cancel-in-progress: true

permissions:
  contents: read
  actions: read
  pull-requests: write

jobs:
  classify:
    runs-on: ubuntu-latest
    outputs:
      profile: ${{ steps.classify.outputs.profile }}
      trusted: ${{ steps.classify.outputs.trusted }}
    steps:
      - uses: actions/checkout@v4
        with:
          fetch-depth: 0
      - id: classify
        shell: pwsh
        env:
          EVENT_NAME: ${{ github.event_name }}
          EVENT_SCHEDULE: ${{ github.event.schedule }}
          MANUAL_PROFILE: ${{ inputs.profile || 'auto' }}
          PR_HEAD_REPOSITORY: ${{ github.event.pull_request.head.repo.full_name }}
          CURRENT_REPOSITORY: ${{ github.repository }}
        run: ./scripts/perf/classify-change.ps1

  performance:
    needs: classify
    if: needs.classify.outputs.profile != 'skip' && needs.classify.outputs.trusted == 'true'
    runs-on: [self-hosted, Windows, X64, perf-eshop-standard]
    timeout-minutes: 90
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: npm
          cache-dependency-path: backend/package-lock.json
      - uses: actions/setup-java@v4
        with:
          distribution: temurin
          java-version: '17'
      - name: Prepare SUT and test data
        shell: pwsh
        run: ./scripts/perf/prepare-sut.ps1
      - name: Restore approved baselines
        shell: pwsh
        env:
          GH_TOKEN: ${{ github.token }}
        run: ./scripts/perf/restore-baseline.ps1 -Profile '${{ needs.classify.outputs.profile }}'
      - name: Run p95 gate with conditional 2-of-3 confirmation
        id: gate
        shell: pwsh
        run: ./scripts/perf/invoke-performance-gate.ps1 -Profile '${{ needs.classify.outputs.profile }}' -MaximumAttempts 3
      - name: Publish summary
        if: always()
        shell: pwsh
        run: ./scripts/perf/publish-summary.ps1 -RunDirectory artifacts/current
      - uses: actions/upload-artifact@v4
        if: always()
        with:
          name: perf-${{ github.sha }}-${{ needs.classify.outputs.profile }}
          path: artifacts/current/
          retention-days: 30
      - name: Publish rolling baseline from main PASS
        uses: actions/upload-artifact@v4
        if: github.ref == 'refs/heads/main' && steps.gate.outputs.verdict == 'PASS'
        with:
          name: rolling-baseline-${{ steps.gate.outputs.baseline_id }}
          path: artifacts/current/baseline/rolling.json
          retention-days: 90
      - name: Stop backend
        if: always()
        shell: pwsh
        run: ./scripts/perf/stop-sut.ps1
```

Tên label `perf-eshop-standard` chỉ là ví dụ; khi triển khai phải thay bằng label runner thật. Nên pin action bằng full commit SHA trong pipeline chính thức để giảm rủi ro supply-chain. Hai lịch cron chạy theo UTC; comment trong YAML ghi rõ giờ quy đổi sang Asia/Saigon. Trong workflow thật, bước upload artifact và cleanup nên đặt trong một job/finally pattern bảo đảm cleanup vẫn chạy nếu upload gặp lỗi.

## 3. Trình tự của các script

### 3.1. `classify-change.ps1`

Script xác định base/head SHA theo event GitHub, chạy `git diff --name-only`, rồi áp dụng ma trận ở Mục 3 của tài liệu chính. Kết quả phải ghi `profile` và `trusted` vào `$GITHUB_OUTPUT` khi ở CI, đồng thời in ra stdout khi chạy local. Mapping sự kiện được xác định rõ:

| Sự kiện                                 | Profile           |
| --------------------------------------- | ----------------- |
| Pull request nội bộ có thay đổi backend | `smoke`           |
| Push vào `main`                         | `load`            |
| Cron `0 19 * * *`                       | `load`            |
| Cron `0 20 * * 6`                       | `soak`            |
| `workflow_dispatch` khác `auto`         | Profile được chọn |
| Docs/out-of-scope                       | `skip`            |

`workflow_dispatch` với profile khác `auto` được ưu tiên, nhưng `release` vẫn là advisory cho Stress/Spike theo chính sách hiện tại. Pull request từ fork trả `trusted=false`; không được checkout và thực thi code không tin cậy trên self-hosted runner. Nếu cần tín hiệu cho fork PR, chỉ chạy validation tĩnh hoặc smoke observe trên GitHub-hosted runner. Không dùng `pull_request_target` để thực thi code của PR.

### 3.2. `prepare-sut.ps1`

Trình tự tối thiểu:

1. `npm ci --prefix backend`.
2. Chạy `node submission/tests/1-test-plans/checkout-with-coupon/seed_perf_users.js` để tạo dữ liệu và `test-data/users.csv`.
3. Khởi động `node backend/server.js` ở background, chuyển stdout/stderr vào artifact.
4. Poll `http://127.0.0.1:3000/api/categories` với timeout hữu hạn; timeout trả về `INVALID`.
5. Ghi Node/JMeter/Java version, CPU/RAM/OS, commit SHA, JMX hash và dataset hash vào `metadata.json`.

Mỗi attempt phải reset database/lockout/cart/order state về cùng điều kiện. Process backend phải được dừng trong cleanup `finally` hoặc bước `if: always()`.

### 3.3. `restore-baseline.ps1` và baseline bền vững

Golden baseline được review như code và lưu tại `perf-baselines/<baseline-key>/golden.json` trên nhánh chính. Chỉ pull request có lý do và người phê duyệt mới được đổi file này.

Rolling baseline không commit tự động vào source branch. Mỗi run `main` PASS upload `rolling.json` cùng artifact có commit SHA và baseline key. `restore-baseline.ps1` dùng GitHub Actions API với quyền `actions: read` để tìm artifact của lần `main` PASS gần nhất, tải về và chỉ nhận nếu baseline key khớp tuyệt đối. Nếu artifact hết retention, hỏng hoặc không khớp key, run chuyển sang `BOOTSTRAP/OBSERVE`; không được lấy baseline của profile/runner khác. Golden baseline vẫn là mốc chống drift khi rolling artifact không tồn tại.

Artifact rolling nên giữ tối thiểu 90 ngày hoặc mirror sang object storage nếu lịch chạy thưa hơn retention. Việc publish rolling mới chỉ xảy ra sau trạng thái cuối `PASS` trên `main`; PR, `WARNING`, `FAIL`, `INVALID` và exploratory run không được cập nhật baseline.

### 3.4. `run-jmeter.ps1`

Lệnh lõi cho Load hiện tại:

```powershell
jmeter -n `
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Load_20260813.jmx `
  -l artifacts/current/results.jtl `
  -j artifacts/current/jmeter.log `
  -e -o artifacts/current/html-report
```

Lệnh Soak 180 VU có thể parameterize đúng với JMX hiện có:

```powershell
jmeter -n `
  -Jusers=180 -Jrampup=180 -Jduration=720 `
  -Jthink_mean=1500 -Jthink_range=200.0 `
  -t submission/tests/1-test-plans/checkout-with-coupon/23127115_Soak_20260815.jmx `
  -l artifacts/current/results.jtl `
  -j artifacts/current/jmeter.log `
  -e -o artifacts/current/html-report
```

Không chạy performance test bằng GUI. Script phải fail nếu output directory đã tồn tại, JTL rỗng, JMeter exit khác `0`, hoặc backend chết giữa run. `-l` là nguồn raw JTL canonical; HTML chỉ là artifact hỗ trợ đọc.

### 3.5. Điều kiện tiên quyết cho PR smoke

PR smoke 10–20 VU, 2–5 phút chưa thể tạo bằng `-Jusers/-Jduration` trên Load JMX hiện tại vì các giá trị `50/120/600` đang hard-code. Trước khi bật trigger PR cần:

- tạo một Smoke JMX riêng dùng lại workflow E2E; hoặc
- đổi Load JMX sang `${__P(users,50)}`, `${__P(rampup,120)}`, `${__P(duration,600)}` và version hóa baseline key.

Sau đó script mới được phép gọi `-Jusers=10 -Jrampup=30 -Jduration=300`. Thay đổi JMX làm baseline cũ không còn tương đương và phải bootstrap baseline mới.

### 3.6. `invoke-performance-gate.ps1`, analyzer và comparator

Wrapper thực hiện vòng lặp tuần tự, không chạy ba attempt song song. Khi chạy trong GitHub Actions, wrapper ghi `verdict` và `baseline_id` dạng hash ngắn, an toàn cho tên artifact, vào `$GITHUB_OUTPUT`:

```text
for attempt = 1..3:
  reset database/lockout/cart/order state
  run-jmeter -> artifacts/current/attempt-<n>/
  analyze-jtl -> metrics.json
  compare-baseline -> PASS | WARNING | FAIL | INVALID
  PASS hoặc INVALID: dừng
  error/failure hard gate: FAIL ngay
  WARNING lần đầu: tiếp tục attempt 2 và 3
final: FAIL nếu severe condition lặp >= 2/3; ngược lại WARNING
```

Analyzer đọc cột `elapsed`, `success`, `timeStamp`, `label`, tính percentile bằng cùng một thuật toán đã dùng cho Task 2 và xuất JSON máy đọc được. Comparator kiểm minimum sample, baseline key, absolute/rolling/golden threshold và late-run trend. Wrapper giữ exit code trung gian để `WARNING` attempt đầu không làm GitHub Actions dừng trước khi xác nhận 2/3. Mỗi attempt có thư mục riêng; summary cuối phải hiển thị metric và verdict của cả ba attempt.

## 4. Artifact và status check

Mỗi artifact cần có:

- `results.jtl`, `jmeter.log`, `html-report/`;
- `metrics.json`, `comparison.json`, `metadata.json`;
- backend stdout/stderr và preflight resource snapshot;
- commit SHA, profile, attempt, baseline key và trạng thái cuối.
- golden/rolling baseline đã dùng, nguồn artifact/run ID và lý do nếu rơi vào `BOOTSTRAP/OBSERVE`.

Job exit code tạo status check `perf/smoke`, `perf/load`, `perf/soak` hoặc `perf/release-suite`. Chỉ status của hard-gate profile được thêm vào branch protection. `INVALID` không được gắn nhãn regression; `WARNING/INVESTIGATE` ở Stress/Spike tạo artifact/issue nhưng không chặn release trong giai đoạn hiện tại.

## 5. Trade-off riêng của lựa chọn GitHub Actions

| Lựa chọn                   | Lợi ích                         | Rủi ro/chi phí                                   | Quyết định đề xuất                                                   |
| -------------------------- | ------------------------------- | ------------------------------------------------ | -------------------------------------------------------------------- |
| GitHub-hosted runner       | Không cần vận hành máy          | CPU/I/O biến động, khó so p95 và tốn phút CI     | Chỉ classify/validate hoặc smoke observe                             |
| Self-hosted runner cố định | Baseline lặp lại tốt hơn        | Chi phí máy, bảo trì và bảo mật runner           | Dùng cho các profile tạo quyết định gate                             |
| Fork pull request          | Phát hiện sớm cho contributor   | Có thể chạy mã không tin cậy trên máy nội bộ     | Không chạy trên self-hosted; validate hosted hoặc maintainer-trigger |
| Cài JMeter mỗi job         | Môi trường sạch                 | Tải chậm, phụ thuộc mạng/mirror                  | Cache + checksum hoặc image pin sẵn 5.6.3                            |
| Script riêng ngoài YAML    | Chạy lại local, dễ test/version | Thêm file cần bảo trì                            | Dùng script làm nguồn logic canonical                                |
| Upload full HTML/JTL       | Điều tra đầy đủ                 | Artifact lớn và có thể chứa dữ liệu nhạy cảm     | Retention 30 ngày, không dùng credential thật                        |
| Rolling baseline artifact  | Không tự commit từ CI           | Phụ thuộc retention/API và cần kiểm baseline key | Golden trong repo; rolling từ main PASS, fallback observe            |

Blueprint này làm rõ công nghệ và câu lệnh triển khai mà không thay đổi bản chất Task 3: mô hình vẫn cần giai đoạn quan sát và dữ liệu baseline trước khi được dùng làm hard gate.
