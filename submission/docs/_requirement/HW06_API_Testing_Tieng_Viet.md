# HW06 – Kiểm thử API (API Testing)

## HW06 – Kiểm thử API

### 1. Thông tin chung

| Mục                        | Nội dung                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Mã bài tập**             | HW06-AI                                                                                                                        |
| **Thời lượng**             | 10 giờ                                                                                                                         |
| **Hạn nộp**                | Xem link nộp bài trên Moodle                                                                                                   |
| **Hình thức**              | Bài tập cá nhân                                                                                                                |
| **Nộp bài**                | Moodle (báo cáo)                                                                                                               |
| **Giảng viên & Trợ giảng** | TS. Lâm Quang Vũ / TS. Trần Duy Hoàng / ThS. Trần Thị Bích Hạnh / ThS. Trương Phước Lộc / ThS. Hồ Tuấn Thanh                   |
| **Liên hệ**                | lqvu@fit.hcmus.edu.vn / tdhoang@fit.hcmus.edu.vn / ttbhanh@fit.hcmus.edu.vn / tploc@fit.hcmus.edu.vn / hthanh@fit.hcmus.edu.vn |
| **Chính sách AI**          | Mở — **bắt buộc** phải có bản khai báo và đính kèm Báo cáo kiểm toán AI (AI Audit Report)                                      |
| **Mức Bloom-AI yêu cầu**   | G9.1 → G9.6, tùy theo từng bài tập (xem _Bảng ánh xạ CLO_)                                                                     |

---

### 2. Nguyên tắc hướng dẫn

Những nguyên tắc này quy định cách bạn cần làm việc xuyên suốt chuỗi bài tập của môn học. Hãy đọc kỹ trước khi bắt đầu, vì bài nộp của bạn sẽ được đánh giá dựa trên các nguyên tắc này.

- **Chiến lược AI-First.** Bạn bắt buộc phải áp dụng AI vào các kỹ thuật kiểm thử đã học trên lớp. Tuy nhiên, điều này **không** có nghĩa là chỉ đưa ra một prompt chung chung duy nhất kiểu _"tạo tất cả các test case API từ spec và chạy chúng."_ Thay vào đó, bạn phải dẫn dắt AI qua từng bước của kỹ thuật đúng như đã được dạy, sử dụng AI như một trợ lý có kỷ luật chứ không phải một "hộp đen".

- **Đánh giá của con người (Human review).** Mọi kết quả do AI tạo ra phải được chính bạn — sinh viên — xem xét cẩn thận. Bạn chịu hoàn toàn trách nhiệm về tính đúng đắn của các kết quả này. Bạn cần thực hiện các sửa đổi, hiệu chỉnh cần thiết — việc nộp nguyên trạng đầu ra thô của AI mà không qua xem xét là **không được chấp nhận**.

- **Báo cáo kiểm toán AI (AI Audit Report).** Toàn bộ quá trình sử dụng AI phải được ghi lại đầy đủ thành một nhật ký (log) hoàn chỉnh. Bạn được khuyến khích xây dựng các Agent Skills có thể tự động thực hiện các hoạt động này cho các bài tập tương tự. Nếu bạn **không** sử dụng AI, bạn vẫn phải khai báo rõ điều này.

- **Tài liệu hóa (Documentation).** Toàn bộ quá trình làm việc phải được tài liệu hóa dưới dạng văn bản (text-based), ví dụ như Markdown.

- **Chất lượng quan trọng hơn sự hoàn thành (Quality over completion).** Bài làm của bạn sẽ không chỉ được chấm dựa trên việc có hoàn thành hay không, mà còn dựa trên số lượng và chất lượng của các sản phẩm bàn giao (deliverables): các test case, bản kiểm toán AI (AI audit), bộ sưu tập Postman (Postman collection) và báo cáo Newman, các báo cáo lỗi (bug reports), thiết kế bộ sinh test (test-generator design), và các liên kết tham chiếu.

---

### 3. Chuẩn đầu ra (Learning Outcomes)

Sau khi hoàn thành bài tập này, bạn sẽ có khả năng:

- Sử dụng AI để tạo các test case API từ đặc tả API (API specification) của SUT, sau đó kiểm toán và mở rộng chúng.
- Thiết kế các test API bao phủ phân hoạch miền dữ liệu (domain partitions), chuyển trạng thái (state transitions), bảo mật (security), và kiểm tra lược đồ (schema validation).
- Phát hiện các lỗi mà AI đã bỏ sót, đặc biệt là các lỗi liên quan đến bảo mật và chuyển trạng thái.
- Thiết kế một bộ sinh test API (test generator) dựa trên AI.
- Thể hiện năng lực Bloom-AI ở các mức **G9.2 (Áp dụng - Apply)**, **G9.3 (Phân tích - Analyse)**, **G9.4 (Cộng tác - Collaborate)**, và **G9.5 (Sáng tạo - Create)**.

---

### 4. Hệ thống cần kiểm thử (System Under Test - SUT)

**SUT:** EShop — một ứng dụng demo thương mại điện tử của Việt Nam được thiết kế để thực hành kiểm thử.

**Repository:** https://github.com/ttbhanh/eshop-sut

Các tính năng của ứng dụng được tổ chức thành các nhóm (pool) sau:

**Pool A — Xác thực, Danh mục, và Sản phẩm**

- FR-01: Đăng ký tài khoản
- FR-02: Đăng nhập và khóa tài khoản
- FR-03: Quên mật khẩu và đặt lại mật khẩu (hai bước)
- FR-04: Quản lý hồ sơ cá nhân
- FR-05: Danh sách và tìm kiếm sản phẩm
- FR-06: Xem chi tiết sản phẩm

**Pool B — Giỏ hàng và Thanh toán**

- FR-07: Giỏ hàng
- FR-08: Thanh toán (Checkout)
- FR-09: Mã giảm giá
- FR-10: Máy trạng thái đơn hàng (Order state machine)
- FR-11: Xem lịch sử đơn hàng (người dùng)

**Pool C — Quản trị web (Web Admin)**

- FR-12: Kiểm soát truy cập
- FR-13: Bảng điều khiển (Dashboard)
- FR-14: Quản lý danh mục (CRUD)
- FR-15: Quản lý sản phẩm (CRUD)
- FR-16: Nhập sản phẩm từ file CSV
- FR-17: Quản lý mã giảm giá (CRUD)
- FR-18: Quản lý đơn hàng (admin)
- FR-19: Quản lý người dùng (admin)

**Pool D — Ứng dụng di động (Mobile App)**

SUT đi kèm một đặc tả API trong repository (`api_specification.md`); hãy tham khảo tài liệu này để biết các endpoint hiện có. Đặc tả này cũng định nghĩa các yêu cầu bảo mật **SEC-01–SEC-07**.

---

### 5. Chọn API

- Chọn **ba (3) API**, mỗi API triển khai một tính năng thuộc **mỗi nhóm Pool A, Pool B, và Pool C** (Pool D — ứng dụng di động — không được sử dụng ở đây, vì bài tập này nhắm vào API backend). Tham khảo đặc tả API để tìm các endpoint đứng sau mỗi tính năng đã chọn.
  - **Pool A** — ví dụ: đăng nhập (FR-02) hoặc danh sách / tìm kiếm sản phẩm (FR-05).
  - **Pool B** — ví dụ: giỏ hàng (FR-07) hoặc thanh toán / tạo đơn hàng (FR-08, FR-10).
  - **Pool C** — ví dụ: một thao tác quản trị sản phẩm hoặc đơn hàng có thay đổi trạng thái (FR-15, FR-18).
- Giống như các bài tập trước, đảm bảo lựa chọn của bạn **không trùng lặp** với các thành viên khác trong nhóm: không có hai thành viên nào được chọn cùng ba API.

---

### 6. Yêu cầu

Với mỗi trong ba API đã chọn, hãy hoàn thành quy trình (pipeline) sau. Tài liệu hóa quá trình của bạn trong báo cáo chính và đính kèm các bằng chứng cần thiết. Hãy xem lại các bài giảng liên quan về kiểm thử API trước khi bắt đầu.

1. **Sinh test case bằng AI (Generate with AI).** Cung cấp đặc tả API của SUT cho một công cụ AI và dẫn dắt nó — từng bước một, không dùng một prompt chung chung duy nhất — để sinh ra các test case cho API (mục tiêu **≥ 35 test case mỗi API**). Các test case phải bao phủ: **phân hoạch miền dữ liệu (domain partitions)** trên mọi tham số (ví dụ: định dạng email, độ phức tạp mật khẩu, giá > 0), **chuyển trạng thái (state transitions)** (FR-10: pending → confirmed → shipping → delivered, cùng các quy tắc hủy đơn), **bảo mật (security)** (SEC-01–SEC-07, ví dụ: SQL injection, IDOR, leo thang quyền — role escalation), và **kiểm tra lược đồ (schema validation)** (hình dạng response khớp chính xác với đặc tả).

2. **Kiểm toán (đánh giá của con người - human review).** Gán nhãn cho mỗi test case do AI sinh ra là **VALID / INVALID / INCOMPLETE** kèm theo lý giải, và sửa lại các test case không hợp lệ hoặc chưa đầy đủ. Bạn chịu hoàn toàn trách nhiệm về các test case cuối cùng.

3. **Mở rộng (Extend).** Bổ sung **ít nhất năm** test case do chính bạn nghĩ ra mà AI đã bỏ sót — đặc biệt liên quan đến bảo mật và chuyển trạng thái — và giải thích _tại sao_ AI lại bỏ sót chúng (do chất lượng prompt, giới hạn của mô hình, hay đặc điểm của API).

4. **Thực thi (Execute).** Chạy các test case bằng Postman + Newman (hoặc Karate / RestAssured). Mọi request đều phải mang theo header `X-Student-Id: {StudentID}` (ví dụ, thông qua một pre-request script). Tạo ra báo cáo Newman / HTML.

5. **Báo cáo lỗi (Report bugs).** Báo cáo bất kỳ lỗi thực sự nào bạn tìm thấy — bao gồm cả những lỗi mà AI bỏ sót — cả trong báo cáo Markdown và trên trang GitHub Issues của bạn, kèm theo ảnh chụp màn hình (screenshot) cho mỗi issue.

Ngoài ra, các yêu cầu kỹ thuật sau áp dụng cho toàn bộ bộ test của bạn:

- **Khai thác càng nhiều tính năng của Postman càng tốt (trong khả năng hợp lý)** — ví dụ: workspaces, collections, variables, environments, chạy theo dữ liệu (data-driven runs — Collection Runner với một file dữ liệu), monitors, và mock servers. **Liệt kê các tính năng Postman mà bạn đã sử dụng trong báo cáo.** _(Người dùng Karate / RestAssured cung cấp các tính năng tương đương của công cụ đó.)_
- **Tích hợp vào CI/CD.** Thêm các test case API của bạn vào một pipeline CI/CD cho SUT (ví dụ: chạy Newman trong GitHub Actions trong repository của bạn), và viết một **báo cáo CI/CD** ngắn mô tả cấu hình pipeline và hai lần chạy bên dưới, kèm ảnh chụp màn hình và liên kết. Cung cấp **hai commit mẫu**: một commit mà kết quả chạy pipeline cho thấy **tất cả** các test case API đều pass, và một commit khác mà kết quả chạy pipeline cho thấy **một** test case bị fail.

---

### 7. Agent Skill

- Đối với mức Sáng tạo (Create — G9.5), hãy thiết kế một **bộ sinh test API dựa trên AI (AI-driven API test generator)** cho SUT: cho trước đặc tả API, nó sẽ tự động tạo ra các test case. Cung cấp một **sơ đồ tự vẽ (self-drawn diagram)** và **mã giả (pseudocode)** của thiết kế. ("Tự vẽ" nghĩa là bạn đưa ra các quyết định thiết kế; bất kỳ công cụ vẽ sơ đồ nào cũng được, nhưng bản thân sơ đồ không được do AI tạo ra trực tiếp.)
- Bạn được khuyến khích triển khai nó thành một Agent Skill có thể tái sử dụng và nộp kèm một video demo (liên kết YouTube) cho thấy nó sinh test cho một API.

---

### 8. Công cụ được phép và Mức Bloom-AI

Bạn có thể sử dụng các công cụ sau, và bạn phải khai báo chúng trong Báo cáo kiểm toán AI:

- Bất kỳ công cụ AI nào bạn chọn (ví dụ: ChatGPT, Claude, Gemini, Copilot, Cursor).
- Postman + Newman (mặc định) hoặc Karate / RestAssured (thay thế).
- Tùy chọn: các công cụ kiểm thử LLM (Promptfoo, DeepEval, Ragas).

Mức Bloom-AI yêu cầu cho bài tập này là **G9.2 (Áp dụng)**, **G9.3 (Phân tích)**, **G9.4 (Cộng tác)**, và **G9.5 (Sáng tạo)**.

---

### 9. Báo cáo kiểm toán AI (Phụ lục bắt buộc)

Đính kèm Báo cáo kiểm toán AI dưới dạng phụ lục. Sử dụng nội dung của các Mẫu AI (AI Templates) được cung cấp nếu cần.

- Nếu bạn không sử dụng AI, hãy khai báo: _"I do not use any AI help in this exercise."_ (Tôi không sử dụng bất kỳ sự trợ giúp nào từ AI trong bài tập này.)
- Nếu bạn có sử dụng AI, hãy khai báo: _"I use AI tools for the following tasks,"_ (Tôi sử dụng công cụ AI cho các tác vụ sau,) và cung cấp các thông tin sau cho mỗi lượt tương tác:
  - Tên công cụ AI
  - Ngày và giờ
  - Prompt của bạn
  - Kết quả đầu ra của AI

Để đơn giản hóa quá trình này, bạn được khuyến khích tạo một skill hoặc rule để tự động trích xuất các thông tin trên sau mỗi phiên làm việc với AI.

---

### 10. Nhận xét, phê bình AI (AI Critique) (200–300 từ, Bắt buộc)

Viết một đoạn văn từ 200–300 từ phê bình, nhận xét về AI. Trả lời các câu hỏi sau: AI đã sai ở đâu, có thiên vị (biased) hay chưa đầy đủ (incomplete) ở điểm nào? Tại sao nó không phát hiện ra vấn đề đó? Bạn đã học được nguyên tắc gì về việc cộng tác với AI qua bài tập này?

Sử dụng nội dung của các Mẫu AI được cung cấp nếu cần.

---

### 11. Các ràng buộc chống gian lận bằng AI (Anti-AI-Cheat Constraints)

Bài tập này dựa trên bằng chứng thực thi thực tế, có thể quy trách nhiệm được (attributable execution evidence). Những mục sau **không được** tạo bởi AI hoặc ngụy tạo, và trợ giảng (TA) sẽ xác minh chúng khi chấm điểm:

- Header `X-Student-Id: {StudentID}`, được chứng minh bằng ảnh chụp màn hình console từ pre-request script của bạn.
- Kết quả chạy Newman, với hostname phải khớp với môi trường triển khai của bạn (`localhost` / `127.0.0.1` được chấp nhận).
- Sơ đồ bộ sinh test AI (AI test-generator diagram), phải là **tự vẽ** — do bạn thiết kế, không phải do AI tạo ra trực tiếp.

---

### 12. Nhật ký Git Commit (Git Commit Log)

- Tạo một commit Git mới cho mỗi bước trong quy trình (ví dụ: sinh test, kiểm toán, mở rộng, và thực thi cho mỗi API).
- Cung cấp nhật ký commit Git dưới dạng file văn bản (text-based).

---

### 13. Vấn đáp (Oral Defense)

**30% sinh viên** được chọn ngẫu nhiên có thể được mời tham gia buổi vấn đáp kéo dài 5–7 phút trong tuần sau hạn nộp bài, để giải thích cách họ đã hoàn thành bài tập này.

---

### 14. Quy định nộp bài

**Định dạng tên file:** `<StudentID>_HW06_AI_API_<SelfAssessedGrade>.zip`

- _SelfAssessedGrade:_ một số có 3 chữ số trong khoảng [000, 100].
- _Ví dụ:_ `25127001_HW06_AI_API_090.zip`

**Nội dung bắt buộc của file `.zip`:**

- Báo cáo chính (Markdown + PDF), bao gồm báo cáo kiểm thử API và bản kiểm toán AI của bạn.
- Liên kết repository GitHub công khai (collections, scripts, và reports).
- Bộ sưu tập Postman (`.json`) và báo cáo Newman (HTML), cùng với danh sách các tính năng Postman bạn đã sử dụng.
- Một báo cáo CI/CD ngắn gọn: cấu hình pipeline và hai lần chạy mẫu (một lần tất cả đều pass, một lần có test case fail), kèm ảnh chụp màn hình và liên kết.
- Các test case dạng Excel và bản tóm tắt kết quả kiểm thử (test summary).
- Sơ đồ và mã giả của bộ sinh test AI (PNG / Mermaid + `.md` / `.py`).
- Tùy chọn: đặc tả API được chuyển đổi sang định dạng OpenAPI (`.yaml` / `.json`); nếu do AI tạo ra thì cũng cần kiểm toán nó.
- Báo cáo lỗi (bug report), kèm ảnh chụp màn hình các lỗi trên trang GitHub Issues.
- Nhận xét phê bình AI (AI Critique) và Báo cáo kiểm toán AI (Markdown + PDF).
- Nhật ký Git commit (file văn bản).
- File `README.md` chứa bảng tự đánh giá (bên dưới) và một báo cáo tóm tắt kiểm thử: số lượng API; số test case đã sinh, đã thêm, đã thực thi, đã pass, và đã fail; và số lượng lỗi (bug).
- Bất kỳ tài liệu hỗ trợ nào khác.

Nộp bài lên Moodle. Về hạn nộp, xem link nộp bài.

---

### 15. Bảng mẫu đánh giá

| STT | Tiêu chí                                                                   | Điểm    | Tự đánh giá |
| --- | -------------------------------------------------------------------------- | ------- | ----------- |
| 1   | API 1 — quy trình đầy đủ (sinh + kiểm toán + mở rộng + thực thi + báo lỗi) | 30      |             |
| 2   | API 2 — quy trình đầy đủ (tiêu chí tương tự)                               | 30      |             |
| 3   | API 3 — quy trình đầy đủ (tiêu chí tương tự)                               | 30      |             |
| 4   | Agent Skills (bộ sinh test dựa trên AI)                                    | 10      |             |
|     | **Tổng**                                                                   | **100** |             |

---

### 16. Tài liệu tham khảo

- Đề cương ISTQB Foundation Level (phiên bản mới nhất).
- Hardman, P. (2025). _A Post-AI Learning Taxonomy._
- Fuster Rabella, M. (2025). _OECD Education Working Paper No. 338._
- Anthropic (2025). _Building Reliable AI Test Agents_ — bài viết trên blog kỹ thuật.
- Tài liệu DeepEval & Promptfoo — các framework kiểm thử LLM.

---

### 17. Các quy định khác

- **Không được phép** nộp bài trễ hạn.
- Thiếu bất kỳ tài liệu bắt buộc nào sẽ bị **0 điểm**.
- Sao chép bài giữa các sinh viên — **kể cả sao chép prompt** — sẽ dẫn đến **0 điểm cho cả hai bên**.
