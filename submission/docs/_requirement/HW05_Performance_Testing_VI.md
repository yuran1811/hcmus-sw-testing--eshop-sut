# HW05 – Kiểm thử Hiệu năng (Performance Testing)

## HW05 – Kiểm thử Hiệu năng

## 1. Thông tin chung

| Mục                        | Nội dung                                                                                                                       |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| **Mã bài tập**             | HW05-AI                                                                                                                        |
| **Thời lượng**             | 10 giờ                                                                                                                         |
| **Hạn nộp**                | Xem đường dẫn nộp bài trên Moodle                                                                                              |
| **Hình thức**              | Bài tập cá nhân                                                                                                                |
| **Nộp bài**                | Moodle (báo cáo)                                                                                                               |
| **Giảng viên & Trợ giảng** | TS. Lâm Quang Vũ / TS. Trần Duy Hoàng / ThS. Trần Thị Bích Hạnh / ThS. Trương Phước Lộc / ThS. Hồ Tuấn Thanh                   |
| **Liên hệ**                | lqvu@fit.hcmus.edu.vn / tdhoang@fit.hcmus.edu.vn / ttbhanh@fit.hcmus.edu.vn / tploc@fit.hcmus.edu.vn / hthanh@fit.hcmus.edu.vn |
| **Chính sách sử dụng AI**  | Mở — bắt buộc phải có bản khai báo và đính kèm Báo cáo Kiểm toán AI (AI Audit Report)                                          |
| **Mức Bloom-AI yêu cầu**   | G9.1 → G9.6, tùy theo từng bài tập (xem _Bảng ánh xạ CLO_)                                                                     |

## 2. Nguyên tắc hướng dẫn

Những nguyên tắc này quy định cách bạn được kỳ vọng làm việc xuyên suốt chuỗi bài tập của môn học này. Hãy đọc kỹ trước khi bắt đầu, vì bài nộp của bạn sẽ được đánh giá dựa trên các nguyên tắc này.

- **Chiến lược AI-First.** Bạn bắt buộc phải áp dụng AI vào các kỹ thuật kiểm thử đã học trên lớp. Tuy nhiên, điều này không có nghĩa là chỉ đưa ra một prompt chung chung duy nhất kiểu _"chạy load test và cho tôi biết hiệu năng có tốt không."_ Thay vào đó, bạn phải dẫn dắt AI thực hiện từng bước của kỹ thuật đúng như đã được dạy, sử dụng AI như một trợ lý có kỷ luật chứ không phải một hộp đen.
- **Đánh giá của con người (Human review).** Mọi kết quả do AI tạo ra đều phải được chính bạn — sinh viên — xem xét cẩn thận. Bạn hoàn toàn chịu trách nhiệm về tính đúng đắn của những kết quả này. Bạn cần thực hiện các chỉnh sửa và tinh chỉnh cần thiết — việc nộp thẳng đầu ra thô của AI mà không xem xét là không được chấp nhận.
- **Báo cáo Kiểm toán AI (AI Audit Report).** Toàn bộ quá trình sử dụng AI phải được ghi lại thành một nhật ký đầy đủ. Bạn được khuyến khích xây dựng các Agent Skill có thể tự động thực hiện các hoạt động này cho những bài tập tương tự. Nếu bạn **không** sử dụng AI, bạn vẫn phải khai báo rõ điều này.
- **Tài liệu hóa.** Toàn bộ quá trình làm việc phải được tài liệu hóa dưới dạng văn bản (text-based), chẳng hạn như Markdown.
- **Chất lượng hơn là hoàn thành.** Bài làm của bạn sẽ được chấm không chỉ dựa trên việc có hoàn thành hay không, mà còn dựa trên số lượng và chất lượng của các sản phẩm bàn giao: test plan, các file dữ liệu, log thô và các báo cáo (report views), bằng chứng về tài nguyên/phần cứng, video demo, bài phê bình phân tích của AI (AI analysis critique), và các đường link tham chiếu.

## 3. Kết quả học tập (Learning Outcomes)

Sau khi hoàn thành bài tập này, bạn sẽ có khả năng:

- Thiết kế và chạy các bài kiểm thử Load, Stress, và Spike nhắm vào API backend của SUT bằng JMeter (hoặc k6).
- Thu thập và trình bày các chỉ số hiệu năng cùng với việc giám sát tài nguyên và nhiều dạng report khác nhau, đồng thời xác định ngưỡng chịu tải bền vững (endurance threshold) trên phần cứng của chính bạn.
- Sử dụng AI để phân tích kết quả, sau đó phản biện phân tích đó một cách có phê phán — xác định nơi AI hiểu sai các chỉ số và những đề xuất tối ưu hóa nào của AI là khả thi.
- Đề xuất một mô hình kiểm thử hiệu năng liên tục (continuous performance-testing pipeline).
- Thể hiện năng lực Bloom-AI ở các mức **G9.2 (Apply)**, **G9.3 (Analyse)**, **G9.4 (Collaborate)**, và **G9.6 (Disrupt)**.

## 4. Hệ thống được kiểm thử (System Under Test - SUT)

**SUT:** EShop — một ứng dụng demo thương mại điện tử tiếng Việt được thiết kế để thực hành kiểm thử.

**Repository:** https://github.com/ttbhanh/eshop-sut

Các tính năng của ứng dụng được tổ chức thành các nhóm (pool) sau:

- **Pool A — Xác thực, Danh mục và Sản phẩm**
  - FR-01: Đăng ký tài khoản
  - FR-02: Đăng nhập và khóa tài khoản (account lockout)
  - FR-03: Quên mật khẩu và đặt lại mật khẩu (hai bước)
  - FR-04: Quản lý hồ sơ cá nhân
  - FR-05: Danh sách và tìm kiếm sản phẩm
  - FR-06: Xem chi tiết sản phẩm
- **Pool B — Giỏ hàng và Thanh toán**
  - FR-07: Giỏ hàng
  - FR-08: Thanh toán (checkout)
  - FR-09: Mã giảm giá (coupon)
  - FR-10: Máy trạng thái đơn hàng (order state machine)
  - FR-11: Xem lịch sử đơn hàng (người dùng)
- **Pool C — Quản trị Web (Web Admin)**
  - FR-12: Kiểm soát truy cập
  - FR-13: Bảng điều khiển (Dashboard)
  - FR-14: Quản lý danh mục (CRUD)
  - FR-15: Quản lý sản phẩm (CRUD)
  - FR-16: Nhập sản phẩm từ file CSV
  - FR-17: Quản lý mã giảm giá (CRUD)
  - FR-18: Quản lý đơn hàng (admin)
  - FR-19: Quản lý người dùng (admin)
- **Pool D — Ứng dụng di động (Mobile App)**

SUT cung cấp một REST backend API mà giao diện web (web frontend) sử dụng; hãy tham khảo repository để biết chính xác các endpoint và cổng (port).

## 5. Phạm vi — Lựa chọn Endpoint

Nhắm mục tiêu vào ba **nhóm endpoint** của API backend, ánh xạ mỗi nhóm với API của SUT:

- **Read-heavy (nặng về đọc)** — ví dụ: danh sách/tìm kiếm sản phẩm và xem chi tiết sản phẩm.
- **Auth-heavy (nặng về xác thực)** — ví dụ: đăng nhập, có tính đến hành vi khóa tài khoản (account-lockout).
- **Transactional (nặng về giao dịch)** — ví dụ: thêm vào giỏ hàng và thanh toán/tạo đơn hàng.

Như các bài tập trước, hãy đảm bảo lựa chọn của bạn **không trùng lặp** giữa các thành viên trong nhóm: không có hai thành viên nào được kiểm thử cùng một luồng công việc (workflow).

## 6. Yêu cầu

Với mỗi nhiệm vụ dưới đây, hãy tài liệu hóa quy trình thực hiện của bạn trong báo cáo chính và đính kèm các bằng chứng theo yêu cầu. Hãy xem lại các bài giảng liên quan về kiểm thử hiệu năng trước khi bắt đầu.

### Nhiệm vụ 1 — Thiết kế và thực thi kiểm thử với sự hỗ trợ của AI

Theo đúng chiến lược AI-first, hãy sử dụng một công cụ AI để thiết kế và tạo ra các test plan, sau đó xem xét, sửa chữa, và chịu hoàn toàn trách nhiệm về chúng.

- **Thiết kế và tạo bằng AI.** Dẫn dắt một công cụ AI — theo từng bước, không phải bằng một prompt chung chung duy nhất — để thiết kế và tạo ra ba test plan: **Load**, **Stress**, và **Spike**. Cả ba test plan đều phải thực thi cùng một luồng công việc đầu-cuối (end-to-end workflow), bao phủ cả ba nhóm endpoint: **auth-heavy**, **read-heavy**, và **transactional**. Ví dụ, một virtual user có thể đăng nhập, duyệt hoặc tìm kiếm sản phẩm, sau đó thêm một mặt hàng vào giỏ và hoàn tất thanh toán. Hãy để AI giúp lựa chọn các tham số thực tế (think-time, ramp-up, số lượng thread/virtual-user) cho từng kịch bản, và giải thích ngắn gọn cách luồng công việc bao phủ từng nhóm endpoint như thế nào.
- **Làm cho luồng công việc theo hướng dữ liệu (data-driven).** Sử dụng dữ liệu đầu vào CSV trong luồng công việc đầu-cuối để tham số hóa các request (ví dụ: thông tin đăng nhập, ID sản phẩm, hoặc payload đơn hàng). Bạn có thể dùng một hoặc nhiều file CSV, tùy theo luồng công việc của mình.
- **Sử dụng ba dạng report khác nhau.** Trên cả ba test plan, hãy sử dụng ba loại listener/report khác biệt (ví dụ: View Results Tree, Summary Report, Aggregate Report); không lặp lại loại nào. _(Đây là thuật ngữ của JMeter; người dùng k6 hãy cung cấp các đầu ra tương đương, khác biệt nhau.)_
- **Đặt tên mỗi test plan** theo định dạng `{StudentID}_{ScenarioType}_{YYYYMMDD}`.
- **Xem xét và sửa chữa (đánh giá của con người).** Xem xét một cách phê phán các test plan do AI tạo ra và sửa chữa chúng. Báo cáo những gì AI đã làm sai hoặc bỏ sót — ví dụ: ramp-up hoặc think-time không thực tế, số lượng thread sai, assertion yếu, hoặc thiếu xử lý khóa tài khoản (account-lockout) — và giải thích _tại sao_ AI bỏ sót những điều đó (do chất lượng prompt, giới hạn của model, hay đặc điểm của endpoint). Bạn hoàn toàn chịu trách nhiệm về các test plan cuối cùng.
- **Chạy càng đầy đủ càng tốt, kèm bằng chứng.** Thực thi cả ba kịch bản và, với mỗi lần chạy, chụp lại: một ảnh chụp màn hình công cụ kiểm thử cùng với mức sử dụng tài nguyên của tiến trình backend (htop / Task Manager / Activity Monitor), cộng với một báo cáo phần cứng (ảnh chụp màn hình dxdiag / screenfetch và một bảng thông số kỹ thuật). Khi các lần chạy Stress/Spike kích hoạt việc khóa tài khoản sau 3 lần đăng nhập thất bại, hãy đặt lại (reset) trạng thái đó giữa các lần chạy và ghi lại các bước thực hiện. Tạo ra các log `.jtl` thô và các thư mục báo cáo HTML.
- **Xác định ngưỡng chịu tải bền vững (endurance threshold).** Chạy một bài kiểm thử endurance/soak ngắn (khoảng 10–15 phút ở mức tải ổn định) để tìm ra bằng thực nghiệm ngưỡng chịu tải của phần cứng bạn, báo cáo bằng các con số cụ thể (ví dụ: RPS ổn định tối đa, mức trần bộ nhớ).
- **Ghi lại video demo.** Một video YouTube ở chế độ không công khai (unlisted) dài **tối thiểu 6 phút** tổng cộng (bạn có thể chia thành từng clip riêng cho mỗi kịch bản), thể hiện công cụ kiểm thử và trình giám sát tài nguyên **trong cùng một khung hình**, kèm theo lời thuyết minh bằng tiếng Việt của chính bạn.
- **Báo cáo vấn đề (issue).** Ghi lại bất kỳ lỗi (bug) hoặc vấn đề hiệu năng thực sự nào (phản hồi lỗi, sự cố sập, hồi quy chức năng) trên trang GitHub Issues của bạn kèm ảnh chụp màn hình. Việc ghi nhận các vấn đề hiệu năng như độ trễ cao hoặc tỷ lệ lỗi tăng cao được khuyến khích nhưng không bị trừ điểm nếu không có.

### Nhiệm vụ 2 — Phân tích AI và săn lỗi hiểu sai (misinterpretation hunt)

Theo đúng chiến lược AI-first, hãy sử dụng AI để phân tích kết quả của bạn, sau đó xem xét một cách phê phán những gì AI tạo ra — phần phân tích là đầu ra của AI, còn phần xem xét là của bạn.

- **Phân tích bằng AI.** Sau khi thu thập kết quả thô, hãy yêu cầu một công cụ AI phân tích các log `.jtl` và đề xuất các ngưỡng hiệu năng.
- **Xem xét và sửa chữa (đánh giá của con người).** Xem xét một cách phê phán phân tích của AI và xác định những chỗ AI hiểu sai hoặc đọc sai các chỉ số. Với mỗi lỗi hiểu sai, hãy trích dẫn **giá trị đúng từ log `.jtl` thô** của bạn và giải thích lỗi đó.
- **Đánh giá các đề xuất của AI.** Yêu cầu AI đề xuất các phương án tối ưu hóa (ví dụ: thêm chỉ mục cơ sở dữ liệu, connection pool, hoặc bật SQLite WAL) và phân loại từng đề xuất là **khả thi** hoặc **ảo giác (hallucinated)**, kèm lý giải.

### Nhiệm vụ 3 — Đề xuất Kiểm thử Hiệu năng Liên tục (Disrupt)

- Trong phần kết luận, hãy đề xuất một **mô hình kiểm thử hiệu năng liên tục** theo dõi các commit của SUT, quyết định khi nào nên chạy kiểm thử hiệu năng, và gắn cờ các trường hợp hồi quy (regression) p95. Bao gồm một **sơ đồ luồng (flow chart)** và phần thảo luận về các **đánh đổi (trade-offs)** (chi phí, cảnh báo giả).

## 7. Agent Skill

- Bạn được khuyến khích xây dựng một Agent Skill áp dụng quy trình kiểm thử hiệu năng và phân tích log này, để có thể tái sử dụng cho các endpoint khác trong các nhiệm vụ kiểm thử tương lai.
- Nộp skill kèm theo một video minh họa (đường link YouTube) thể hiện, từ đầu đến cuối, cách bạn sử dụng skill đó trên một nhóm endpoint hoàn chỉnh.

## 8. Công cụ được phép sử dụng và Mức Bloom-AI

Bạn có thể sử dụng các công cụ sau, và phải khai báo chúng trong Báo cáo Kiểm toán AI:

- JMeter (mặc định) hoặc k6 (điểm cộng).
- Bất kỳ công cụ AI nào bạn chọn (ví dụ: ChatGPT, Claude, Gemini) — để phân tích log.
- Một trình giám sát tài nguyên (htop / Task Manager / Activity Monitor).

Mức Bloom-AI yêu cầu cho bài tập này là **G9.2 (Apply)**, **G9.3 (Analyse)**, **G9.4 (Collaborate)**, và **G9.6 (Disrupt)**.

## 9. Báo cáo Kiểm toán AI (Phụ lục bắt buộc)

Đính kèm Báo cáo Kiểm toán AI dưới dạng phụ lục. Sử dụng nội dung của các Mẫu AI (AI Templates) được cung cấp nếu cần.

- Nếu bạn không sử dụng AI, hãy khai báo: _"Tôi không sử dụng bất kỳ sự hỗ trợ nào của AI trong bài tập này."_
- Nếu bạn có sử dụng AI, hãy khai báo: _"Tôi sử dụng công cụ AI cho các nhiệm vụ sau,"_ và bao gồm thông tin sau cho mỗi lần tương tác:
  - Tên công cụ AI
  - Ngày và giờ
  - Prompt của bạn
  - Đầu ra của AI

Để đơn giản hóa quá trình này, bạn được khuyến khích tạo một skill hoặc rule tự động trích xuất các thông tin trên sau mỗi phiên làm việc với AI.

## 10. Phê bình AI (AI Critique) (200–300 từ, bắt buộc)

Viết một đoạn văn từ 200–300 từ phê bình AI. Trả lời các câu hỏi sau: AI đã sai, thiên vị, hoặc thiếu sót ở đâu? Tại sao AI lại không phát hiện ra vấn đề đó? Bạn đã học được nguyên tắc gì về việc cộng tác với AI trong bài tập này?

Sử dụng nội dung của các Mẫu AI được cung cấp nếu cần.

## 11. Ràng buộc chống gian lận bằng AI (Anti-AI-Cheat Constraints)

Bài tập này dựa trên bằng chứng thực thi thực tế, có thể quy trách nhiệm rõ ràng. Những mục sau **không được** tạo bằng AI hoặc bịa đặt, và trợ giảng sẽ xác minh trong quá trình chấm điểm:

- Tên file test plan, phải khớp với định dạng `{StudentID}_{ScenarioType}_{YYYYMMDD}`.
- Các file log `.jtl` thô, đính kèm đầy đủ — không chỉ phần tóm tắt.
- Video demo, phải thể hiện công cụ kiểm thử và trình giám sát tài nguyên trong cùng một khung hình, kèm giọng thuyết minh của chính bạn.
- Báo cáo phần cứng, có tên máy (hostname) khớp với các lần triển khai ở những bài tập trước.

## 12. Nhật ký Git Commit

- Tạo một commit Git mới cho mỗi bước của quy trình (ví dụ: mỗi test plan của từng kịch bản, phần phân tích AI, và đề xuất kiểm thử liên tục).
- Cung cấp nhật ký commit Git dưới dạng file văn bản.

## 13. Bảo vệ vấn đáp (Oral Defense)

Một tỷ lệ ngẫu nhiên **30% sinh viên** có thể được mời tham gia buổi bảo vệ vấn đáp kéo dài **5–7 phút** trong tuần sau hạn nộp bài, để giải thích cách bạn đã hoàn thành bài tập này.

## 14. Quy định nộp bài

- **Định dạng tên file:** `<StudentID>_HW05_AI_Performance_<SelfAssessedGrade>.zip`
  - _SelfAssessedGrade:_ một số có 3 chữ số trong khoảng \`[000, 100]\`.
  - _Ví dụ:_ `25127001_HW05_AI_Performance_090.zip`
- **Nội dung bắt buộc của file `.zip`:**
  - Báo cáo chính (Markdown + PDF), bao gồm báo cáo kiểm thử hiệu năng và bài phê bình phân tích AI của bạn.
  - Đường link repository GitHub công khai (test plan và file dữ liệu).
  - Ba test plan (Load / Stress / Spike) tuân theo quy ước đặt tên file.
  - Ba log `.jtl` thô và ba thư mục báo cáo HTML.
  - Ảnh chụp màn hình giám sát tài nguyên và thông số phần cứng.
  - Đường link video demo YouTube (unlisted).
  - AI Critique và Báo cáo Kiểm toán AI (Markdown + PDF).
  - Nhật ký commit Git (file văn bản).
  - Báo cáo lỗi (bug report), kèm ảnh chụp màn hình các vấn đề trên trang GitHub Issues (nếu có).
  - Một file `README.md` chứa bảng tự đánh giá (bên dưới) và một báo cáo tóm tắt kiểm thử: các kịch bản đã chạy; các nhóm endpoint đã bao phủ; ngưỡng chịu tải bền vững (kèm số liệu cụ thể); số lượng lỗi/vấn đề hiệu năng; và đường link video demo.
  - Bất kỳ tài liệu hỗ trợ nào khác.
- Nộp lên Moodle. Về hạn nộp, xem đường dẫn nộp bài.

## 15. Mẫu đánh giá (Assessment Template)

| STT | Tiêu chí                                                                   | Điểm    | Điểm tự đánh giá |
| --- | -------------------------------------------------------------------------- | ------- | ---------------- |
| 1   | Nhiệm vụ 1 — Load testing                                                  | 20      |                  |
| 2   | Nhiệm vụ 1 — Stress testing                                                | 20      |                  |
| 3   | Nhiệm vụ 1 — Spike testing                                                 | 20      |                  |
| 4   | Nhiệm vụ 2 — Phân tích AI + săn lỗi hiểu sai (kèm giá trị đúng từ log thô) | 10      |                  |
| 5   | Nhiệm vụ 3 — Đề xuất Kiểm thử Hiệu năng Liên tục (G9.6)                    | 10      |                  |
| 6   | Agent Skills                                                               | 10      |                  |
|     | **Tổng**                                                                   | **100** |                  |

## 16. Tài liệu tham khảo

- ISTQB Foundation Level Syllabus (phiên bản mới nhất).
- Hardman, P. (2025). _A Post-AI Learning Taxonomy._
- Fuster Rabella, M. (2025). _OECD Education Working Paper No. 338._
- Anthropic (2025). _Building Reliable AI Test Agents_ — blog kỹ thuật.
- Tài liệu DeepEval & Promptfoo — các framework kiểm thử LLM.

## 17. Quy định khác

- Nộp bài trễ **không được chấp nhận**.
- Thiếu bất kỳ tài liệu bắt buộc nào sẽ dẫn đến **0 điểm**.
- Sao chép bài giữa các sinh viên — **kể cả prompt** — sẽ dẫn đến **điểm 0 cho cả hai bên**.
