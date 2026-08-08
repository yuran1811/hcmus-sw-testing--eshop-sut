# Danh sách người tham gia — U-01

> Nguồn: `Survey-23127152.xlsx` (điền 2026-08-02). Chỉ commit bản đã che SĐT.  
> Pilot P00: **không có dữ liệu** trong `Survey-23127152.xlsx` (file không có sheet P00 đã điền).

- Flow: U-01 — Login → Profile → cập nhật hồ sơ
- Người điều phối: SV 23127152
- Đã chạy: **7 chính (P01–P07)** — phiếu khảo sát đủ SUS + probes
- Session logs: `../02-conduct/participants/P01.md`…`P07.md`

---

## Hồ sơ mục tiêu (target profile)

- **Độ tuổi:** 18–35
- **Thói quen:** đã từng mua hàng online ≥ 1 lần trong 6 tháng
- **EShop:** chưa dùng trước đó
- **Thiết bị phiên:** laptop (Chrome / Edge), cửa sổ ~1440×900
- **Loại trừ:** sinh viên đang làm HW03 cùng lớp

---

## Câu hỏi sàng lọc (screener)

1. Bạn bao nhiêu tuổi? _(Đạt: 18–35)_
2. Trong 6 tháng qua, bạn đã tự đặt hàng online chưa? _(Đạt: ≥ 1 lần)_
3. Bạn đã từng dùng EShop chưa? _(Đạt: Chưa)_
4. Bạn có đang làm bài HW03 GUI Usability không? _("Có" → loại)_
5. Bạn có đồng ý ghi màn hình không? _("Không" → loại)_

---

## Quy ước che thông tin liên hệ

Giữ phần đầu + **2 số cuối**, che **4 số giữa**. SĐT từ survey (Excel số) được chuẩn hoá chuỗi chữ số rồi mask.

---

## Người tham gia

| # | Vai trò | Họ tên | Kênh liên hệ | Thông tin liên hệ (đã che) | Hồ sơ (tuổi/nghề/mức quen) | Ngày hẹn | Đồng ý ghi hình (Y/N) |
|---|---------|--------|--------------|----------------------------|----------------------------|----------|------------------------|
| 0 | P00 (Pilot) | — | — | — | **Không có dữ liệu trong Survey-23127152.xlsx** | — | — |
| 1 | P01 | Ngô Hồng Thanh | Survey / trực tiếp | `358****95` | Người dùng mới EShop; Laptop Chrome 1440×900 | 2026-08-02 13:17 | Y |
| 2 | P02 | Thái Khang | Survey / trực tiếp | (không ghi SĐT trên phiếu) | Người dùng mới; MacBook Chrome 1440×900 | 2026-08-02 19:50 | Y |
| 3 | P03 | Nguyễn Văn Viết | Survey / trực tiếp | `941****04` | Người dùng mới; MacBook Pro | 2026-08-02 19:50 | Y |
| 4 | P04 | Ân Tiến Nguyên An | Survey / trực tiếp | `868****17` | Người dùng mới; Laptop Lenovo Edge | 2026-08-02 14:30\* | Y |
| 5 | P05 | Tống Hữu Đạt | Survey / trực tiếp | (không ghi SĐT trên phiếu) | Người dùng mới; Chrome | 2026-08-02 22:00 | Y |
| 6 | P06 | Nguyễn Lê Hồ Anh Khoa | Survey / trực tiếp | `946****15` | Người dùng mới; Laptop Edge | 2026-08-02 22:06 | Y |
| 7 | P07 | Ngo Nguyen The Khoa | Survey / trực tiếp | (không ghi SĐT trên phiếu) | Người dùng mới; M1 Pro Chrome 1440×900 | 2026-08-02 21:45\* | Y\* |

\*Ngày trên phiếu P04/P07 ghi `2026-02-08` (có thể nhầm DD/MM); giữ nguyên theo survey, phiên thực tế cùng đợt 2026-08-02.  
\*P07 ghi đồng ý `"Co"` → chuẩn hoá **Y**.

## Người đã liên hệ nhưng bị loại

| # | Kênh liên hệ (đã che) | Lý do bị loại (screener #) |
|---|----------------------|----------------------------|
| — | (không ghi trên survey) | — |

## Ghi chú

- Pilot không tính vào aggregate Phase 3; lần này **không có phiếu P00** → ghi rõ giới hạn trong findings.
- Mỗi người chỉ tham gia đúng 1 phiên.
- Bản contact đầy đủ giữ ngoài repo; chỉ commit bản đã che.
- Nguồn gốc dữ liệu sau phiên: `01-plan/Survey-23127152.xlsx` sheets P01–P07.
