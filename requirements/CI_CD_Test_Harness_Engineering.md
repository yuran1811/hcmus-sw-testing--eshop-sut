# CI/CD & Test Harness Engineering
**Nhóm 06 — 23KTPM3 Kiểm thử phần mềm — Seminar**
*03 July, 2026*

---

## Nội dung

1. Tìm hiểu về CI/CD — Các thông tin lý thuyết cơ bản về CI/CD
2. Tìm hiểu về Test Harness — Các thông tin lý thuyết cơ bản về Test Harness
3. Github Actions — Chức năng và nguyên lý hoạt động Github Actions
4. GitLab — Chức năng và nguyên lý hoạt động GitLab

---

## Phần 1: Tìm hiểu về CI/CD

### Khái niệm CI/CD

**Continuous Integration**
- Developer push code lên nhánh chung liên tục
- Tự động Biên dịch (Build) + Kiểm thử (Test) ngay lập tức
- Không tự động triển khai (Deploy)
- Phát hiện sớm xung đột code và lỗi biên dịch

**Continuous Delivery**
- Mã nguồn luôn sẵn sàng 100% để triển khai
- Tự động deploy lên môi trường thử nghiệm
- Cần phê duyệt thủ công mới được lên môi trường thật

**Continuous Deployment**
- Tự động hóa hoàn toàn mọi bước
- Code vượt qua bài test là tự động lên môi trường thật
- Không cần phê duyệt thủ công
- Bộ test tự động phải có độ tin cậy siêu cao

### So sánh nhanh giữa CI/CD

| Khía cạnh | CI | Continuous Delivery | Continuous Deployment |
|---|---|---|---|
| Deploy production | Không | Cần duyệt thủ công | Tự động |
| Tần suất release | Vài lần/ngày | Hàng ngày/tuần | Hàng giờ/ngày |
| Rủi ro | Thấp | Trung bình | Cao |
| Phù hợp | Mọi dự án | Dự án đã ổn định | Các dự án khởi nghiệp |

### Quy trình CI/CD

CI (Code → Build → Autonomous Testing → Plan) ⟷ CD (Deploy → Monitor → Operate)

### Nguyên lý hoạt động CI/CD Pipeline

**Developer → Commit/Push → Git Repository**, sau đó pipeline chạy tuần tự:

**CI — Continuous Integration:**
1. **Build**: Biên dịch mã nguồn, cài đặt dependencies, tạo artifact
2. **Lint / Static Analysis**: Kiểm tra code style, chuẩn cú pháp, best practices
3. **Unit Test**: Kiểm thử đơn vị các hàm, lớp, thành phần nhỏ
4. **Integration / API Test**: Kiểm thử tích hợp giữa các module và API
5. **Security Scan**: Quét lỗ hổng bảo mật, kiểm tra dependency vulnerabilities
6. **Quality Gate**: Đánh giá tổng hợp kết quả kiểm thử (Pass / Fail)

**CD — Continuous Delivery / Deployment:**
7. **Deploy Staging**: Triển khai lên môi trường Staging
8. **Smoke / E2E Test**: Kiểm thử nhanh hoặc kiểm thử end-to-end
9. **Manual Approval**: Phê duyệt thủ công trước khi triển khai Production
10. **Deploy Production**: Triển khai lên môi trường Production
11. **Monitoring & Alerting**: Giám sát hệ thống, thu thập log & metrics, cảnh báo khi có sự cố

**Tóm tắt:**
- **CI**: Tự động tích hợp mã nguồn nhiều lần trong ngày; tự động Build, Test và kiểm tra chất lượng; phát hiện lỗi sớm, phản hồi nhanh.
- **CD**: Continuous Delivery — luôn sẵn sàng để triển khai, cần phê duyệt thủ công; Continuous Deployment — tự động triển khai lên production khi đáp ứng đủ điều kiện.
- **Monitoring**: Giám sát hiệu năng, lỗi và hành vi hệ thống; thu thập log, metrics; cảnh báo và phản hồi kịp thời.

### Các trường hợp khác trong CI/CD Pipeline

**Case 1 — Unhappy Case: CI thất bại (do lỗi code)**
Lỗi xảy ra trong một bước của CI (bước 1–6).
Hành động xử lý: Fail Fast — dừng pipeline ngay; chặn Merge; gửi cảnh báo (Slack/Email); developer sửa code và push lại.

**Case 2 — Unhappy Case: Lỗi sau khi đã merge vào main (do lỗi code)**
Lỗi được phát hiện sau khi code đã được merge (qua báo cáo, người dùng, monitoring...).
Hành động xử lý: Dùng `git revert` tạo commit đảo ngược; không dùng `git reset` (không xóa lịch sử); chạy lại pipeline.

**Case 3 — Unhappy Case: Sự cố Production sau khi đã triển khai lên Production (do lỗi code)**
Sự cố xảy ra sau khi đã triển khai lên Production.
Hành động xử lý: Rollback khẩn cấp; re-deploy artifact/image cũ hoặc chuyển lưu lượng truy cập theo mô hình Blue/Green; giám sát đến khi ổn định.

**Case 4 — Trường hợp bất ngờ (do hạ tầng/vận hành, không do mã nguồn)**
Pipeline bị gián đoạn do sự cố hạ tầng hoặc dịch vụ bên ngoài (runner down, network lỗi, timeout, credential hết hạn...).
Hành động xử lý: Auto-Retry có giới hạn số lần; báo cho đội vận hành hệ thống; khắc phục sự cố hạ tầng; chạy lại pipeline từ bước bị lỗi (không cần sửa mã nguồn).

**Case 5 — Trường hợp thành công mở rộng: chủ động khôi phục bản cũ (không do lỗi)**
Hệ thống ổn định nhưng cần khôi phục bản cũ vì lý do kinh doanh/UX, báo trì...
Hành động xử lý: Triển khai lại bản cũ theo kế hoạch; cần phê duyệt thủ công trước; không phải xử lý khẩn cấp.

### Ưu điểm & Nhược điểm

| Ưu điểm | Nhược điểm |
|---|---|
| Phát hiện lỗi siêu sớm | Nghẽn cổ chai khi chạy nhiều Pull Request cùng lúc |
| Phản hồi siêu nhanh | Phụ thuộc bên thứ ba |
| Nâng cấp chất lượng mã nguồn | Cần đầu tư ban đầu về hạ tầng và năng lực vận hành |
| Cho phép phát hành phần mềm nhanh chóng | |
| Developer tập trung vào phát triển code thay vì phải build và deploy thủ công | |

### Yếu tố chọn công cụ CI/CD

**Hạ tầng & Tính tương thích**
1. Mô hình vận hành: Cloud-based hay Self-hosted
2. Khả năng tích hợp
3. Khả năng mở rộng & Hiệu năng

**Tính khả thi & Chi phí**
1. Tính dễ dùng & Cấu hình
2. Chi phí phù hợp ngân sách dự án
3. Mức độ quen thuộc

---

## Phần 2: Tìm hiểu về Test Harness

### Định nghĩa

Tập hợp các công cụ, thư viện, dữ liệu kiểm thử và cấu hình được xây dựng để tự động hóa việc thực thi kiểm thử, thu thập kết quả và báo cáo một cách nhất quán.

### Lợi ích và ứng dụng

1. Cung cấp tài nguyên giả định
2. Phục vụ tối ưu cho cả Automation Testing lẫn Integration Testing

### Hai thành phần lõi kỹ thuật

1. **Test Execution Engine**: Bộ máy thực thi test
2. **Test Script Repository**: Kho lưu trữ test cases và test scripts

### Phân biệt các thuật ngữ

| Thuật ngữ | Định nghĩa |
|---|---|
| Bộ kiểm thử (Test Suite) | Tập hợp các ca kiểm thử dùng để xác minh một chức năng hoặc một phần hệ thống |
| Khung kiểm thử (Test Framework) | Thư viện hoặc nền tảng hỗ trợ xây dựng và thực hiện các ca kiểm thử, cung cấp các chức năng kiểm tra kết quả (assert), mô phỏng (mock) và chạy kiểm thử (test runner) |
| Hạ tầng kiểm thử (Test Harness) | Toàn bộ môi trường phục vụ việc thực hiện kiểm thử, bao gồm khung kiểm thử, dữ liệu kiểm thử, thành phần mô phỏng, môi trường thực thi và công cụ ghi nhận kết quả |
| Đường ống CI/CD (CI/CD Pipeline) | Quy trình tự động thực hiện các bước như build, kiểm thử và triển khai, được kích hoạt bởi các sự kiện từ hệ thống quản lý mã nguồn |

### Thành phần cốt lõi

**Nhóm Điều phối & Viết Test**
- Test Runner: Thực thi và báo cáo
- Test Script: Mã nguồn chứa test case
- Assertion: Câu lệnh so sánh

**Nhóm Dữ liệu & Môi trường cô lập**
- Test Data/Fixture
- Mock/Stub
- Test Environment

**Nhóm Điều khiển & Xuất bản**
- Driver: Điều khiển hệ thống
- Reporter/Log & Artifact: Xuất báo cáo/Lưu ảnh chụp, video khi lỗi

### Nguyên lý hoạt động CI/CD Pipeline (kèm Test Harness)

Luồng: **Developer → Commit/Push → Git Repository** → chạy song song hai nhánh CI và CD:

**CI — Continuous Integration:**
- **Build**: Compile, Install, Package
- **Lint / Static Analysis**: Code Style, Static Check, Best Practices
- **Unit Test**: Run Unit Test, Test Harness, Mock/Stub
- **Integration Test**: Service Test, DB Test, Test Harness
- **API Test**: API Test, Test Harness, Contract Test
- **Security Scan**: Vulnerability Scan, Dependency Check
- **Quality Gate**: Pass / Fail

**CD — Continuous Delivery / Deployment:**
- **Deploy Staging**
- **Smoke / E2E Test**: Smoke Test, E2E Test, Test Harness
- **Manual Approval**: Review, Approval
- **Deploy Production**

**Monitoring & Alerting**: Monitor hệ thống, Log & Metrics, Cảnh báo khi có sự cố

**Test Harness — nền tảng hỗ trợ kiểm thử:**
- Cung cấp dữ liệu kiểm thử (Test Data)
- Mô phỏng / Stub / Mock các thành phần phụ thuộc
- Thực thi kiểm thử tự động (Unit / Integration / API / E2E)
- Thu thập và báo cáo kết quả (Pass / Fail, Logs, Reports)
- Tích hợp vào CI/CD để đưa ra quyết định (Quality Gate)

### Đánh giá và vai trò trong pipeline CI/CD

| Ưu điểm | Nhược điểm | Vai trò |
|---|---|---|
| Tăng năng suất | Tốn chi phí đầu tư đầu | Chạy trong môi trường độc lập, tránh Flaky test |
| Phát hiện lỗi sớm | Không có tính năng ghi-phát lại | Tốc độ: Chạy tự động hàng ngàn ca test |
| Đo được độ bao phủ mã nguồn | | Đảm bảo code chạy đúng từ máy Developer lên đến máy chạy CI |

### Kim tự tháp kiểm thử (Test Pyramid)

- **Unit test**: Nhiều ca kiểm thử nhất, tốc độ nhanh nhất và rẻ nhất (đáy tháp)
- **API/Integration test**: Số lượng, tốc độ trung bình (tầng giữa)
- **E2E test**: Ít ca kiểm thử nhất, tốc độ chậm nhất, chi phí cao nhất (đỉnh tháp)

### Chiến lược tích hợp Pipeline — Tối ưu hiệu năng

**Loại pipeline**
1. **PR Pipeline** (< 10 phút): Chỉ chạy Lint + Unit Test + Integration Test cơ bản để feedback nhanh
2. **Nightly Pipeline** (30–60 phút): Chạy toàn bộ test + E2E test + performance test + quét bảo mật chuyên sâu
3. **Release Pipeline**: Chạy nghiêm ngặt toàn bộ bài test + yêu cầu duyệt thủ công trước khi lên Production

**Chạy song song**
Chia nhỏ tệp test để chạy song song trên nhiều worker (`--maxWorkers` của Jest) hoặc chia sang nhiều máy ảo (sharding) để tăng tốc pipeline.

### Xử lý Flaky Test & Xu hướng Shift-Left / Shift-Right

**Mở rộng quy trình**
- **Shift-Left**: Test thật sớm, chặn lỗi bằng Git Hooks (husky) ngay trên máy dev trước khi push.
- **Shift-Right**: Test ngay trên môi trường thật bằng cách triển khai cho 1 nhóm nhỏ user trước (Canary Deployment) hoặc chạy kịch bản tự động giám sát (Synthetic Monitoring).

**Chiến lược trị Flaky Test**
1. Tự động chạy lại tối đa 2–3 lần
2. Cách ly bài test lỗi ra khu vực riêng để sửa sau, tránh nghẽn pipeline
3. Thay thời gian chờ cố định bằng đợi chủ động

---

## Phần 3: Github Actions

### Chức năng

- Tự động hóa việc build, test và deploy mỗi khi có sự kiện xảy ra trên repository.
- Tự động chạy bộ test Jest mỗi khi có push hoặc Pull Request, báo cáo kết quả pass/fail ngay trên giao diện PR.
- Quality Gate: kết hợp với Branch Protection Rule của GitHub, biến kết quả test thành điều kiện bắt buộc.
- CD trigger: sau khi merge thành công vào main, tự động gọi Render Deploy Hook để kích hoạt deploy bản mới lên production.

### Nguyên lý hoạt động

GitHub Actions vận hành dựa trên file cấu hình YAML đặt trong `.github/workflows/`. Mỗi file định nghĩa 1 workflow, gồm 3 tầng: **Trigger (on) → Job → Step**.

Luồng thực thi:
```
Developer push code
→ GitHub Actions trigger (on.push / on.pull_request)
→ Runner cài Node 20, npm ci
→ npm test (Jest nạp server.js làm app, Supertest gọi API giả lập, expect() so sánh kết quả)
→ Exit code quyết định job "test" pass/fail
→ Branch Protection dùng kết quả đó để khóa/mở nút Merge
→ Sau khi merge vào main, job "deploy" (needs: test) gọi Render Deploy Hook
→ Render build & deploy bản mới
```

### Cấu trúc thư mục Repository

```
group-6-seminar/                <-- Thư mục gốc của Repository (Root)
|
├── .github/                    <-- Thư mục chứa cấu hình GitHub Actions (BẮT BUỘC đặt tên này)
│   └── workflows/               <-- Thư mục chứa các file quy trình tự động (Workflow)
│       └── main.yml             <-- [File GitHub Actions YAML] Nằm trong .github/workflows/
|
├── backend/                    <-- Mã nguồn ứng dụng Backend
│   ├── server.js
│   ├── database.js
│   ├── package.json            <-- Nơi khai báo script "npm test"
│   └── tests/                  <-- Thư mục chứa các tệp kiểm thử
│       ├── unit/                <-- [Vị trí UNIT TEST] Nằm trong backend/tests/unit/
│       │   └── login_and_profile.test.js
│       └── mocks/               <-- Dữ liệu/hàm giả lập cho Unit Test
|
├── frontend-web/                <-- Mã nguồn Frontend Web
├── frontend-admin/              <-- Mã nguồn Frontend Admin
└── frontend-mobile/             <-- Mã nguồn Frontend Mobile
```

### Cấu trúc trực diện file Workflow YAML (`.github/workflows/main.yml`)

```yaml
# ============================================================
# PHẦN 1: TÊN WORKFLOW & SỰ KIỆN KÍCH HOẠT (TRIGGER EVENTS)
# Liệt kê tên quy trình và các sự kiện (push, pull request) để GitHub chạy tự động
# ============================================================
name: CI/CD Pipeline              # Tên hiển thị của Workflow trên giao diện GitHub Actions

on:                                # Sự kiện kích hoạt Workflow
  push:
    branches:
      - main                       # Chạy Workflow khi có code mới đẩy (push) lên nhánh 'main'

# ============================================================
# PHẦN 2: KHAI BÁO CÁC CÔNG VIỆC CỤ THỂ (JOBS)
# Mặc định các Job trong GitHub Actions sẽ chạy SONG SONG (Parallel)
# ngoại trừ khi dùng từ khóa 'needs' để thiết lập thứ tự chạy
# ============================================================
jobs:

  # --- JOB 1: CHẠY UNIT TEST ---
  unit_tests:                      # Tên ID đại diện cho Job 1
    name: Run Backend Unit Tests   # Tên hiển thị chi tiết trên giao diện GitHub
    runs-on: ubuntu-latest         # Hệ điều hành máy ảo (Runner) cung cấp bởi GitHub

    steps:                         # Danh sách các bước thực hiện tuần tự trong Job này
      - name: Checkout Code        # Bước 1: Kéo (fetch) mã nguồn từ repo về máy ảo GitHub
        uses: actions/checkout@v4

      - name: Setup Node.js        # Bước 2: Cài đặt môi trường Node.js phiên bản 18
        uses: actions/setup-node@v4
        with:
          node-version: '18'

      - name: Install Dependencies # Bước 3: Di chuyển vào thư mục backend & cài đặt thư viện
        run: |
          cd backend
          npm install

      - name: Run Unit Tests       # Bước 4: Thực thi lệnh chạy Unit Test
        run: |
          cd backend
          npm test

  # --- JOB 2: TRIỂN KHAI (DEPLOY) ---
  deploy_to_render:                # Tên ID đại diện cho Job 2
    name: Deploy App to Render     # Tên hiển thị chi tiết
    runs-on: ubuntu-latest         # Chạy trên máy ảo Ubuntu
    needs: unit_tests              # BẮT BUỘC Job 'unit_tests' chạy xong thành công mới chạy Job này

    steps:                         # Các bước thực thi deploy
      - name: Trigger Render Deploy Hook  # Lệnh gọi Webhook API đến Render để kích hoạt tự động deploy
        run: |
          curl -X POST "https://api.render.com/deploy/srv-d9j3ron7aucc73cq4rc0?key=..."
```

### Quy tắc cú pháp YAML cần nhớ

1. **key: value**: Phải có 1 khoảng trắng sau dấu `:`. Ví dụ: `runs-on: ubuntu-latest`.
2. **Thụt lề (Indentation)**: Dùng 2 khoảng trắng (Space) để thể hiện cấp con. Tuyệt đối KHÔNG dùng phím Tab.
3. **Danh sách (List)**: Mỗi mục trong danh sách bắt đầu bằng dấu gạch ngang `-` và 1 khoảng trắng (Ví dụ: `- name: Checkout Code`).
4. **Ghi chú (Comment)**: Dùng dấu `#` để viết giải thích trên dòng.
5. **Chạy đa dòng (`run: |`)**: Ký tự `|` cho phép viết nhiều dòng lệnh bash nối tiếp nhau dưới từ khóa `run`.

---

## Phần 4: GitLab

### Chức năng

GitLab CI/CD là giải pháp CI/CD built-in trong nền tảng GitLab, quản lý tự động hóa qua các khái niệm:

- **Pipeline**: Đơn vị thực thi cấp cao nhất của CI/CD. Một pipeline bao gồm tập hợp các stages và jobs định nghĩa cho dự án.
- **Stage**: Phân chia pipeline thành các giai đoạn logic chạy tuần tự.
- **Job**: Đơn vị thực thi nhỏ nhất trong pipeline, xác định tác vụ cụ thể cần chạy.

### Nguyên lý hoạt động

```
GitLab Server
     ↑  HTTPS Long-Polling / API
GitLab Runner
     ↓  Khởi tạo
Executor
     ↓  Thực thi Job
Môi trường runtime: Docker, Shell, VMs
```

### Cache vs Artifacts — So sánh 2 cơ chế lưu trữ

| Tiêu chí | Cache | Artifacts |
|---|---|---|
| Mục đích | Tối ưu thời gian build bằng cách tái sử dụng dependencies đã tải trước đó | Lưu kết quả đầu ra của 1 stage để chuyển sang stage kế tiếp hoặc tải thủ công |
| Tính chất | Không đảm bảo 100% tồn tại (có thể bị xoá/hết hạn) mà không ảnh hưởng kết quả test | Bắt buộc tồn tại nếu stage sau khai báo phụ thuộc (dependencies/needs) |
| Ví dụ | node_modules/, .npm/, .m2/ | dist/, build/, test reports (HTML, XML) |
| Cơ chế lưu | Lưu & chia sẻ qua nhiều lần chạy pipeline khác nhau trên cùng nhánh/dự án | Nén zip, đẩy lên GitLab Server, chỉ đi kèm pipeline định danh cụ thể đó |

### Cấu trúc thư mục Repository

```
group-6-seminar/                <-- Thư mục gốc của Repository (Root)
|
├── .gitlab-ci.yml               <-- [File CI YAML] Đặt ở ROOT để hệ thống tự động đọc cấu hình
|
├── backend/                    <-- Mã nguồn ứng dụng Backend
│   ├── server.js
│   ├── database.js
│   ├── package.json            <-- Nơi khai báo script "npm test"
│   └── tests/                  <-- Thư mục chứa các tệp kiểm thử
│       ├── unit/                <-- [Vị trí UNIT TEST] Nằm trong backend/tests/unit/
│       │   └── login_and_profile.test.js
│       └── mocks/               <-- Dữ liệu/hàm giả lập cho Unit Test
|
├── frontend-web/                <-- Mã nguồn Frontend Web
├── frontend-admin/              <-- Mã nguồn Frontend Admin
└── frontend-mobile/              <-- Mã nguồn Frontend Mobile
```

### Cấu trúc trực diện file CI YAML (`.gitlab-ci.yml`)

```yaml
# ============================================================
# PHẦN 1: KHAI BÁO CÁC GIAI ĐOẠN (STAGES)
# Nơi liệt kê tất cả các bước trong quy trình CI/CD theo thứ tự chạy từ trên xuống
# ============================================================
stages:
  - test                          # Giai đoạn 1: Chạy kiểm thử tự động (Unit Test...)
  - deploy                        # Giai đoạn 2: Triển khai ứng dụng lên Server (chạy sau khi test xong)

# ============================================================
# PHẦN 2: KHAI BÁO CÁC CÔNG VIỆC CỤ THỂ (JOBS)
# Mỗi Job đại diện cho 1 công việc tự động riêng biệt
# ============================================================

# --- JOB 1: CHẠY UNIT TEST ---
unit_tests:                       # Tên Job (tên tự đặt đại diện cho công việc)
  stage: test                     # Khai báo Job này thuộc giai đoạn nào ở phần 'stages' trên
  image: node:18                  # Môi trường Docker container cung cấp sẵn Node.js v18

  before_script:                  # Các lệnh chuẩn bị (chạy TRƯỚC KHI vào lệnh chính)
    - cd backend                  # Chuyển vào thư mục backend chứa mã nguồn
    - npm install                 # Cài đặt các thư viện (dependencies) cần thiết

  script:                         # Các lệnh thực thi chính (BẮT BUỘC CÓ)
    - npm test                    # Kích hoạt chạy tất cả các file Unit Test trong backend/tests/unit/

  rules:                          # Điều kiện kích hoạt tự động chạy Job này
    - if: '$CI_COMMIT_BRANCH == "main"'   # Chỉ chạy khi có code đẩy lên nhánh 'main'

# --- JOB 2: TRIỂN KHAI (DEPLOY) ---
deploy_to_render:                 # Tên Job thứ hai (tự đặt)
  stage: deploy                   # Job này thuộc giai đoạn 'deploy'
  image: curlimages/curl:latest   # Sử dụng môi trường Docker có sẵn công cụ curl

  script:                         # Lệnh chính để deploy
    - curl -X POST "https://api.render.com/deploy/srv-d9j3ron7aucc73cq4rc0?key=..."  # Gọi API để Render tự động deploy

  rules:                          # Điều kiện kích hoạt
    - if: '$CI_COMMIT_BRANCH == "main"'   # Chỉ deploy khi code đã vào nhánh 'main' thành công
```

### Quy tắc cú pháp YAML cần nhớ

1. **key: value**: Phải có 1 khoảng trắng sau dấu `":"`. Ví dụ: `stage: test`.
2. **Thụt lề (Indentation)**: Dùng 2 khoảng trắng (Space) để thể hiện cấp con. Tuyệt đối KHÔNG dùng phím Tab.
3. **Danh sách (List)**: Mỗi mục trong danh sách bắt đầu bằng dấu gạch ngang `-` và 1 khoảng trắng (Ví dụ: `- cd backend`).
4. **Ghi chú (Comment)**: Dùng dấu `#` để viết giải thích trên dòng.

### Tổng kết – GitHub Actions vs GitLab CI/CD

| Tiêu chí | GitHub Actions (Demo 1) | GitLab CI/CD (Demo 2) |
|---|---|---|
| Trình kích hoạt | Workflow YAML trong `.github/workflows/` | Pipeline YAML trong `.gitlab-ci.yml` |
| Nơi thực thi | GitHub-hosted Runner (máy ảo có sẵn) | GitLab Runner — Shared hoặc Specific |
| Bảo vệ nhánh | Branch protection rules | Protected Branches |
| Kiểm soát merge | Required status checks | Merge Checks — Pipeline must succeed |
| Kích hoạt Deploy | Step gọi curl tới Render Deploy Hook | Job `deploy_backend` gọi curl tới Render Deploy Hook |

---

**Thank you very much!**
**Nhóm 06**
