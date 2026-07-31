# Kế hoạch chạy thử Pilot

## Mục đích

Chạy thử kịch bản (task scenario) với 1 người trước khi test 7 participant chính thức, nhằm phát hiện:

1. **Kịch bản mơ hồ**: Participant không hiểu mình cần làm gì
2. **Flow bị đứt**: SUT gặp lỗi kỹ thuật, tài khoản test không hoạt động, dữ liệu thiếu
3. **Thời gian không phù hợp**: Quá ngắn (bỏ lỡ quan sát) hoặc quá dài (participant mệt)
4. **Công cụ ghi chú / ghi hình chưa sẵn sàng**

## Thông tin Pilot

- Pilot participant: [Tên — có thể là bạn bè, người thân, không cần nằm trong P01-P07]
- Ngày dự kiến: [YYYY-MM-DD]
- Pilot có tính vào 7 participant không: [Có / Không — ghi rõ lý do]

## Checklist trước pilot

- [ ] Task scenario đã viết xong
- [ ] SUT đã tải được, tài khoản test hoạt động
- [ ] Test data đã chuẩn bị (mã giảm giá, sản phẩm, tài khoản)
- [ ] SUS/UEQ-S form đã in hoặc mở sẵn
- [ ] Probe questions đã chuẩn bị
- [ ] Công cụ ghi hình/ghi chú sẵn sàng (OBS, Loom, hoặc ghi tay)

## Kết quả cần ghi sau pilot

Điền vào `pilot-notes.md` sau khi chạy:

1. Participant có hiểu scenario không?
2. Có bước nào bị kẹt vì lỗi SUT (không phải lỗi người dùng)?
3. Thời gian hoàn thành thực tế so với timebox?
4. Cần chỉnh sửa gì cho scenario/instruments/flow?
