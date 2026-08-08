# Kế hoạch usability test — <Flow ID>

- Ngày: <YYYY-MM-DD>
- Website: <URL>
- Flow: <Flow ID — tên ngắn gọn>
- FR liên quan: <FR-xx, FR-yy, ...>
- Timebox: <N> phút/người
- Người điều phối: <tên>
- Thiết bị/trình duyệt test chính: <thiết bị, OS, browser>

## Mục tiêu

<1–3 câu hỏi có thể kiểm chứng được — không phải mô tả lại flow. Xem Step 1 trong SKILL.md để
biết cách viết mục tiêu "testable".>

## Task scenario

> <Kịch bản dạng mục tiêu — nêu rõ mục tiêu và ràng buộc thực tế, KHÔNG liệt kê từng bước bấm.>

## Điều kiện

- Bắt đầu: <trạng thái màn hình chính xác trước khi tính giờ>
- Thành công: <trạng thái quan sát được chính xác coi là hoàn thành>
- Thất bại: bỏ cuộc, hết timebox, bị kẹt không phục hồi hoặc không đến được trạng thái thành công.
- Deviation: <cách xử lý khi dữ liệu thật thiếu, ví dụ không có suất chiếu cuối tuần>

## Công cụ đánh giá (Instrument)

**Thang đo chuẩn:** <SUS | UEQ-S | Custom (kèm giải thích bằng văn bản vì sao SUS/UEQ-S không
phù hợp)> — thực hiện ngay sau khi kết thúc task, trước câu hỏi mở. Chi tiết item và công thức
tính điểm: xem `instruments_reference.md`.

**Câu hỏi mở (probe questions)** — hỏi sau thang đo, tối thiểu 1 câu mỗi nhóm:

| Nhóm | Câu hỏi |
| --- | --- |
| Clarity | |
| Error recovery | |
| Speed | |
| Trust | |

## Checklist trước phiên

- [ ] Có đồng thuận tham gia/ghi hình nếu áp dụng.
- [ ] Dùng mã P01–P07 (và Pilot), không ghi dữ liệu cá nhân không cần thiết.
- [ ] Kiểm tra website và đồng hồ bấm giờ.
- [ ] Chuẩn hóa start state.
- [ ] Không tập trước flow cho người tham gia.

## Liên kết

- Danh sách người tham gia: `recruitment-tracker.md`
- Kế hoạch & kết quả pilot: `sessions/P00-pilot.md`

---

## Ví dụ đã hoàn thiện (Lumiere Cinema)

- Ngày: 2026-07-20
- Website: https://lumierecinema.vercel.app/
- Flow: U-01 — Mua vé xem phim khi chưa đăng nhập
- FR liên quan: FR-14, FR-15, FR-18, FR-19, FR-20, FR-35, FR-37
- Timebox: 10 phút/người
- Người điều phối: <tên>
- Thiết bị/trình duyệt test chính: iPhone 13, Safari 17

### Mục tiêu
Người dùng mới có tự chọn đúng 2 ghế cạnh nhau và đến màn hình tóm tắt vé mà không cần trợ giúp
không? Người dùng có hiểu vì sao phải chọn rạp trước khi chọn suất chiếu, hay bị kẹt ở bước đó?

### Task scenario
> Bạn muốn xem một phim đang chiếu tại Lumiere Cinema vào cuối tuần này. Hãy tìm một phim phù
> hợp, chọn rạp, chọn suất chiếu, chọn ghế cho 2 người và hoàn tất đến khi thấy thông tin vé.

### Điều kiện
- Bắt đầu: trang chủ đã tải, chưa mở menu, chưa chọn phim.
- Thành công: đã chọn phim, rạp, suất chiếu, đúng 2 ghế và thấy màn hình tóm tắt thông tin vé.
- Thất bại: bỏ cuộc, hết timebox, bị kẹt không phục hồi hoặc không đến được trạng thái thành công.
- Deviation: nếu không có suất cuối tuần, dùng ngày gần nhất có suất và ghi lại deviation.
