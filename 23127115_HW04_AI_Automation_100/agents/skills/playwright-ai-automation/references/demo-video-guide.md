# Hướng dẫn quay Video Demo (Task 2) & Video minh họa Agent Skill (Mục 7)

Đề bài yêu cầu **2 video** về mặt nội dung (có thể dùng chung 1 video nếu video đó vừa
demo 1 script chạy end-to-end vừa cho thấy bạn dùng Agent Skill để tạo ra nó — xem lưu ý
ở cuối file):

1. **Task 2:** video ≥5 phút, thuyết minh **tiếng Việt**, demo 1 script tự động hóa chạy
   end-to-end (bao gồm chạy đa trình duyệt + report HTML sinh ra), thuyết minh ít nhất 1
   lỗi bạn đã sửa từ script AI tạo, có bằng chứng tác giả (face-cam HOẶC terminal chạy
   `whoami` + `hostname`).
2. **Mục 7 (Agent Skill):** video minh họa việc dùng skill này (đầu-cuối) trên 1 tính năng
   hoàn chỉnh.

## 1. Kịch bản gợi ý (5–7 phút) — có thể dùng cho cả 2 mục đích trên

| Thời lượng | Nội dung | Ghi chú |
|---|---|---|
| 0:00–0:30 | Giới thiệu: tên, MSSV, tính năng sẽ demo (VD FR-02 Đăng nhập) | Bắt đầu bằng terminal chạy `whoami && hostname` HOẶC bật face-cam ngay từ đầu |
| 0:30–1:30 | Cho xem nhanh bảng test case (≥12 case) và cấu trúc thư mục project (`pages/`, `tests/`, `data/`) | Lướt qua file `data/*.json` để chứng minh data-driven |
| 1:30–3:00 | Thuyết minh **1 lỗi cụ thể** đã sửa từ script AI tạo ra — mở diff/git blame hoặc so sánh trước/sau | Đây là điểm bắt buộc: "AI ban đầu viết X, tôi phát hiện sai vì Y, tôi sửa thành Z" |
| 3:00–3:30 | Chạy lệnh `npx playwright test` (hoặc lệnh Selenium tương ứng) trên terminal | Cho thấy rõ 3 trình duyệt (chromium/firefox/webkit) chạy trong log |
| 3:30–5:00 | Mở báo cáo HTML vừa sinh ra (`npx playwright show-report`), lướt qua để lộ rõ dòng **"Run by: {MSSV}"** + timestamp, chỉ vào từng test pass/fail | Đây là bằng chứng anti-cheat bắt buộc |
| 5:00–5:30 (nếu còn) | Nếu có bug thật phát hiện được, mở nhanh GitHub Issue tương ứng | Không bắt buộc nếu không có bug thật |
| 5:30–6:00 | Kết luận ngắn gọn | — |

## 2. Công cụ quay màn hình + webcam

**Khuyến nghị — OBS Studio (miễn phí, đa nền tảng, dễ nhất):**
1. Cài OBS Studio (obsproject.com).
2. Thêm 2 Source: "Display Capture" (toàn màn hình) + "Video Capture Device" (webcam),
   kéo webcam về góc dưới-phải màn hình, thu nhỏ lại.
3. Thêm "Audio Input Capture" cho micro.
4. Settings → Output → chọn định dạng MP4, bấm "Start Recording".

**Thay thế — dòng lệnh ffmpeg (Linux, nếu không muốn cài GUI):**
```bash
# Quay webcam riêng để xem trước (terminal 1)
ffplay -f v4l2 -i /dev/video0 -video_size 320x240 -fflags nobuffer

# Quay màn hình + audio (terminal 2) — dùng khi bạn KHÔNG bật webcam,
# thay vào đó dùng bằng chứng whoami/hostname
ffmpeg -video_size 1920x1080 -framerate 30 -f x11grab -i :0.0 \
  -f pulse -ac 2 -i default -vcodec libx264 -preset fast -crf 18 demo.mp4
```
Nhấn `q` trong terminal ffmpeg để dừng quay. File lưu tại đường dẫn chỉ định (`demo.mp4`).

> Nếu không dùng webcam, **bắt buộc** phải quay được cửa sổ terminal đang chạy lệnh
> `whoami` và `hostname` rõ ràng, đủ lớn để đọc được trong video — làm việc này ngay ở
> đầu hoặc cuối video, giữ cửa sổ đó hiện ít nhất 3–5 giây.

## 3. Đăng video lên YouTube ở chế độ Unlisted

1. Vào YouTube Studio → **Create → Upload videos** → chọn file video.
2. Điền tiêu đề/mô tả (VD: "HW04 Automation Testing — Demo FR-02 — MSSV 25127001").
3. Ở bước **Visibility** (hoặc mục **Audience** trong giao diện mới), chọn **Unlisted**
   (không chọn Public — sẽ bị index tìm kiếm; không chọn Private — người ngoài link sẽ
   không xem được).
4. Bấm Save/Publish, đợi xử lý xong, copy link — đây là link nộp bài.
5. Kiểm tra lại bằng cách mở link ở trình duyệt ẩn danh (không đăng nhập) để chắc chắn
   xem được.

## 4. Checklist trước khi nộp video

- [ ] Video ≥ 5 phút.
- [ ] Thuyết minh bằng **giọng nói thật của bạn**, tiếng Việt.
- [ ] Có ít nhất 1 đoạn thuyết minh rõ ràng về **1 lỗi cụ thể đã sửa** từ script AI (không
      chỉ nói chung chung "tôi có sửa vài chỗ").
- [ ] Thấy được: chạy suite → chạy trên nhiều trình duyệt → mở report HTML.
- [ ] Report HTML trong video có hiển thị **"Run by: {MSSV}"** + timestamp (khớp với file
      report bạn nộp kèm, không phải ảnh chụp giả).
- [ ] Có face-cam xuyên suốt HOẶC đoạn terminal `whoami`/`hostname` hiện rõ, đủ lâu để đọc.
- [ ] Chế độ hiển thị video là **Unlisted** (không phải Public/Private).

## 5. Gộp 2 yêu cầu video (Task 2 và Mục 7) làm 1 nếu muốn tiết kiệm công sức

Nếu video Task 2 của bạn *đã* thể hiện toàn bộ quy trình: bảng test case → prompt AI theo
từng giai đoạn → data-driven → đa trình duyệt → report → sửa lỗi AI, thì về bản chất nó
cũng chính là "minh họa cách bạn dùng Agent Skill trên 1 tính năng hoàn chỉnh" theo Mục 7.
Trong báo cáo, chỉ cần ghi rõ 1 dòng: *"Video demo Task 2 (link) đồng thời là video minh
họa việc áp dụng Agent Skill `playwright-ai-automation` cho tính năng FR-XX."* — tránh
phải quay 2 video riêng nếu không cần thiết. Nếu TA yêu cầu tách riêng, quay thêm 1 video
ngắn hơn (2–3 phút) tập trung vào việc bạn gọi/dùng skill như thế nào.
