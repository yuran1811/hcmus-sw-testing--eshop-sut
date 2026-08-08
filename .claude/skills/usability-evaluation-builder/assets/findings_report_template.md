# Báo cáo usability testing — <Flow ID>

> Chỉ tổng hợp từ các session log đã có dữ liệu thật (Phase 2). Mỗi finding phải trỏ được về ít
> nhất một session cụ thể làm bằng chứng — không suy diễn vấn đề chưa được quan sát.

## Phạm vi và phương pháp

- Website: <URL>
- Flow: <Flow ID>
- FR: <FR-xx, FR-yy, ...>
- Ngày test: <...>
- Mẫu: 7 người tham gia thật (P01–P07) + 1 pilot (không tính vào số liệu tổng hợp)
- Phương pháp: moderated think-aloud
- Thang đo: <SUS | UEQ-S>
- Deviation/giới hạn: <...>

## Kết quả tổng quan

| Participant | Outcome | Thời gian (s) | Error | Wrong turn | Hesitation | Intervention | Điểm thang đo |
| --- | --- | ---: | ---: | ---: | ---: | ---: | ---: |
| P01 | | | | | | | |
| P02 | | | | | | | |
| P03 | | | | | | | |
| P04 | | | | | | | |
| P05 | | | | | | | |
| P06 | | | | | | | |
| P07 | | | | | | | |

- Tỷ lệ hoàn thành không trợ giúp (`SUCCESS_UNASSISTED` / 7): <...>
- Tỷ lệ hoàn thành có trợ giúp ((`SUCCESS_UNASSISTED` + `SUCCESS_ASSISTED`) / 7): <...>
- Median thời gian của các lượt thành công: <...>
- Điểm thang đo trung bình/median (theo công thức trong `instruments_reference.md`): <...>

## Findings

Mỗi vấn đề lặp lại giữa nhiều session ghép thành một finding riêng. Sao chép cấu trúc F-01 cho
từng vấn đề. Xóa finding mẫu nếu không có bằng chứng thật.

### F-01 — <mô tả vấn đề bằng một câu, không phải khu vực chung chung>

- Flow: <Flow ID>
- FR liên quan: <...>
- Frequency: <x>/7
- Bằng chứng: <session ID + timestamp, hoặc quote nguyên văn>
- Tác động đến task: <...>
- Severity: <0–4, xem bảng bên dưới>
- Lý do severity: <...>
- Nguyên nhân khả dĩ (diễn giải): <...>
- Đề xuất: <cụ thể, actionable — không viết "làm rõ hơn">
- Tiêu chí xác minh: <điều gì sẽ xác nhận là đã sửa xong>

## Thang đánh giá mức độ nghiêm trọng (usability finding — khác severity của bug report GUI)

| Mức | Phân loại | Ý nghĩa & Hành động |
| --- | --- | --- |
| 0 | Không phải lỗi | Không đủ bằng chứng để coi là usability issue |
| 1 | Cosmetic | Bất tiện rất nhỏ, sửa khi còn thời gian |
| 2 | Minor | Gây bất tiện nhưng user tự vượt qua được, ưu tiên thấp |
| 3 | Major | Làm chậm đáng kể, mắc lỗi nhiều, task có nguy cơ thất bại |
| 4 | Catastrophe | Chặn hoàn toàn việc hoàn thành task |

## Kết quả BrowserStack (nếu có)

Xem `browserstack.md` và thư mục `evidence/browserstack/`.

## Kết luận và giới hạn

<Tóm tắt 3–5 câu: vấn đề nghiêm trọng nhất là gì, có nên release/tiếp tục không, cần re-test gì.
Nêu rõ giới hạn mẫu (7 người, 1 flow, thời điểm test cụ thể) — không khái quát hoá quá mức từ
mẫu nhỏ.>

---

## Ví dụ finding đã hoàn thiện (tham khảo cách viết, không phải dữ liệu thật của bạn)

### F-01 — Người dùng không hiểu nút SEATINGS dẫn đến đâu

- Flow: U-01
- FR liên quan: FR-18
- Frequency: 3/7
- Bằng chứng: P02 (00:41), P04 (01:12), P06 (00:55) — cả ba đều dừng lại nhìn màn hình 5–8 giây
  trước khi bấm
- Tác động đến task: Gây hesitation kéo dài, 1/3 trường hợp cần intervention để tiếp tục
- Severity: 2 — Minor (người dùng tự vượt qua được sau khi phân vân)
- Lý do severity: Không chặn hoàn toàn task, nhưng lặp lại ở gần một nửa số phiên
- Nguyên nhân khả dĩ: Label "SEATINGS" không phải ngôn ngữ hành động (không rõ là "đi tiếp" hay
  "quay lại chọn ghế")
- Đề xuất: Đổi label thành "TIẾP TỤC" hoặc tên bước kế tiếp cụ thể (VD: "Xem lại vé")
- Tiêu chí xác minh: Re-test với label mới, hesitation tại bước này giảm xuống dưới 1/7
