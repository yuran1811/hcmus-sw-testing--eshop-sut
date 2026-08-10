# Checklist review test plan do AI sinh

Dùng file này ở hai thời điểm: (1) trước khi coi test plan là hoàn thành, (2) khi viết phần báo cáo "AI sai/thiếu chỗ nào và vì sao".

Với mỗi mục phát hiện có vấn đề, ghi lại theo mẫu:

| Hạng mục | AI sinh ra | Vấn đề | Nguyên nhân gốc | Đã sửa thành |
|---|---|---|---|---|

Ba nhóm nguyên nhân gốc để phân loại:
- **Prompt chưa đủ ngữ cảnh** — mình chưa cung cấp thông tin (VD: chưa nói backend khoá tài khoản sau 3 lần).
- **Giới hạn mô hình** — mô hình đưa ra con số "trông hợp lý" theo mẫu chung mà không có cơ sở từ hệ thống thật.
- **Đặc thù endpoint** — chỉ biết được khi đọc mã nguồn hoặc chạy thử, mô hình không thể suy ra.

---

## A. Tham số tải

| # | Kiểm tra | Vì sao quan trọng |
|---|---|---|
| A1 | Ramp-up có tỷ lệ hợp lý với số VU không? | Ramp-up quá ngắn (VD 500 VU trong 5s) biến Load test thành Spike test. Quy tắc thô: Load test nên khoảng 1 VU/giây trở xuống. |
| A2 | Steady-state có đủ dài để hệ thống đạt bão hoà không? | Dưới 2–3 phút thường chưa qua giai đoạn warm-up JIT/cache, số liệu bị lệch xấu |
| A3 | Số VU có vượt năng lực máy chạy test không? | Nếu máy generator nghẽn trước SUT thì đang đo chính mình. Kiểm tra CPU của tiến trình JMeter/k6 khi chạy |
| A4 | Loop Count vs Duration — dùng cái nào? | Đặt cả hai gây hành vi khó đoán. Với load profile theo thời gian, dùng Duration và bỏ Loop Count vô hạn |
| A5 | Stress test có thiết kế bậc thang không? | Một mức tải cố định chỉ cho biết "gãy", không cho biết "gãy ở đâu" |
| A6 | Spike test đã tắt think time chưa? | Còn think time thì không còn là spike |

## B. Think time

| # | Kiểm tra | Vì sao quan trọng |
|---|---|---|
| B1 | Có think time không? | Thiếu hẳn là lỗi rất phổ biến — AI hay sinh script gửi request liên tục, tạo throughput phi thực tế và bottleneck giả |
| B2 | Think time có ngẫu nhiên không? | Constant Timer làm mọi VU đồng bộ nhịp, tạo sóng tải răng cưa không giống thực tế |
| B3 | Timer đặt đúng scope chưa? | Trong JMeter, Timer đặt sai cấp sẽ áp cho toàn bộ sampler thay vì một bước |
| B4 | Giá trị có khớp bảng workload model không? | Nếu lệch, phải giải thích lý do |

## C. Assertion / Check

| # | Kiểm tra | Vì sao quan trọng |
|---|---|---|
| C1 | Có assertion nào không? | Không có assertion → server trả trang lỗi kèm HTTP 200 vẫn tính là thành công |
| C2 | Assertion có kiểm tra nội dung nghiệp vụ không? | Chỉ check status code là chưa đủ: checkout có thể trả 200 mà không tạo đơn |
| C3 | (k6) Có khai báo `thresholds` không? | `check()` fail không làm test fail — thiếu threshold thì test luôn "xanh" |
| C4 | Assertion có bắt được lỗi ở đúng tầng không? | Assertion đặt trên request login nhưng nội dung kiểm tra lại thuộc response checkout là lỗi copy-paste hay gặp |

## D. Xử lý xác thực và trạng thái

| # | Kiểm tra | Vì sao quan trọng |
|---|---|---|
| D1 | Token có được trích và truyền sang các request sau không? | Thiếu JSON Extractor → mọi request sau login trả 401, nhưng nếu không có assertion thì vẫn báo pass |
| D2 | Token có phạm vi theo từng VU không? | Nếu dùng biến toàn cục, mọi VU dùng chung một session — sai mô hình |
| D3 | **Đã xử lý account lockout chưa?** | Đây là lỗi bị bỏ sót nhiều nhất. Nếu backend khoá tài khoản sau N lần login sai, Stress/Spike test sẽ kích hoạt khoá hàng loạt và toàn bộ số liệu sau đó vô nghĩa |
| D4 | Có phân biệt "sai mật khẩu" với "tài khoản bị khoá" trong assertion không? | Hai lỗi này cần được đếm riêng, nếu không sẽ chẩn đoán nhầm nguyên nhân error rate cao |
| D5 | Có quy trình reset lockout giữa các lần chạy chưa, và đã ghi lại từng bước chưa? | Không reset thì lần chạy thứ hai bắt đầu từ trạng thái bẩn |
| D6 | Cookie/session có được quản lý không? | Thiếu HTTP Cookie Manager với backend dùng session cookie sẽ làm mọi request bị coi là khách vãng lai |

## E. Dữ liệu

| # | Kiểm tra | Vì sao quan trọng |
|---|---|---|
| E1 | Dữ liệu có được tham số hoá không, hay hard-code? | Hard-code product ID làm mọi VU đánh vào một bản ghi → cache hit 100%, kết quả đẹp giả tạo |
| E2 | `Recycle on EOF` / `Stop thread on EOF` đặt đúng ý đồ chưa? | Sai cấu hình làm số VU tụt dần giữa chừng mà không có cảnh báo |
| E3 | Product ID trong CSV có tồn tại thật trong DB không? | ID không tồn tại → 404 hàng loạt, error rate cao vì lý do dữ liệu chứ không phải hiệu năng |
| E4 | Dữ liệu checkout có hợp lệ theo validation của backend không? | Payload thiếu trường bắt buộc → 400, lại là lỗi dữ liệu |
| E5 | Test có làm bẩn DB không, và có kế hoạch dọn không? | Chạy Stress test tạo hàng chục nghìn đơn hàng rác sẽ ảnh hưởng lần chạy sau (và làm chính DB chậm dần) |

## F. Cấu hình đầu ra

| # | Kiểm tra | Vì sao quan trọng |
|---|---|---|
| F1 | Tên file có đúng `{StudentID}_{ScenarioType}_{YYYYMMDD}` không? | Sai tên là mất điểm dù nội dung đúng |
| F2 | Ba test plan có dùng 3 loại listener/report khác nhau không? | Yêu cầu bắt buộc không được lặp loại |
| F3 | Có chạy bằng CLI thay vì GUI không? | Chạy load bằng GUI làm chính JMeter thành bottleneck |
| F4 | View Results Tree có bị bật ghi full response khi tải cao không? | Ngốn RAM, làm sai lệch số đo |
| F5 | Thư mục `-o` cho HTML report đã rỗng chưa? | JMeter sẽ abort nếu thư mục không rỗng |

## G. Tính đúng đắn của kịch bản

| # | Kiểm tra | Vì sao quan trọng |
|---|---|---|
| G1 | Cả 3 test plan có chạy **cùng một workflow** không? | Khác workflow thì không so sánh được kết quả giữa các kịch bản |
| G2 | Workflow có phủ đủ cả 3 nhóm endpoint không? | Thiếu một nhóm là thiếu yêu cầu đề bài |
| G3 | Thứ tự các bước có đúng logic nghiệp vụ không? | Checkout trước khi add-to-cart sẽ luôn lỗi |
| G4 | Endpoint URL/method/payload có khớp mã nguồn thật không? | AI thường đoán đường dẫn theo quy ước REST phổ biến (`/api/products`) trong khi hệ thống thật có thể dùng tên khác |
| G5 | Có chạy thử 1 VU / 1 loop để verify trước khi chạy tải thật không? | Bước smoke test này tiết kiệm rất nhiều thời gian debug về sau |

## H. Môi trường và evidence

| # | Kiểm tra |
|---|---|
| H1 | Đã ghi lại spec phần cứng (CPU, RAM, disk, OS) chưa? |
| H2 | Hostname có khớp với các lần triển khai trước chưa? |
| H3 | Screenshot có chứa **cả tool lẫn resource monitor trong cùng một khung hình** chưa? |
| H4 | Đã ghi giá trị JVM heap / cấu hình runtime của công cụ test chưa? |
| H5 | SUT có chạy ở chế độ production-like không (không phải dev mode với hot-reload)? |
| H6 | Có process nào khác đang chiếm tài nguyên máy trong lúc chạy test không? |

---

## Mẫu đoạn báo cáo hoàn chỉnh

> **D3 — Thiếu xử lý account lockout.**
> AI sinh test plan Spike với 500 VU cùng dùng một tài khoản, không có bước xử lý khi backend trả về trạng thái khoá.
> **Vấn đề:** EShop khoá tài khoản sau 3 lần đăng nhập thất bại. Ở tải 500 VU, một phần request login timeout và bị backend tính là thất bại, kích hoạt khoá tài khoản từ giây thứ ~40. Toàn bộ số liệu sau mốc đó phản ánh hành vi của endpoint trả lỗi khoá chứ không phải hiệu năng thật.
> **Nguyên nhân gốc:** Đặc thù endpoint — cơ chế khoá nằm trong mã nguồn backend, prompt ban đầu không mô tả nên mô hình không có cơ sở để suy ra.
> **Đã sửa:** Mở rộng `users.csv` lên 50 tài khoản hợp lệ, thêm Response Assertion phân biệt HTTP 401 (sai mật khẩu) với trạng thái khoá, và bổ sung script reset bảng `login_attempts` chạy giữa các lần đo — quy trình reset ghi lại ở mục [X] của báo cáo.
