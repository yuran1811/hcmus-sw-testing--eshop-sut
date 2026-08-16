# Artifact các lần chạy kiểm thử

> Thư mục này lưu các bằng chứng thực thi chính thức của kiểm thử hiệu năng.

## Cấu trúc thư mục đề xuất

```text
2-test-runs/
├── checkout-with-coupon/
│   ├── load/
│   ├── stress/
│   ├── spike/
│   ├── soak/
│   └── hardware/
└── README.md
```

Các thư mục kịch bản hiện có:

- `checkout-with-coupon/load/` — bằng chứng kiểm thử tải.
- `checkout-with-coupon/stress/` — bằng chứng kiểm thử chịu tải.
- `checkout-with-coupon/spike/` — bằng chứng kiểm thử tải đột biến.
- `checkout-with-coupon/soak/` — bằng chứng kiểm thử độ bền/ngưỡng endurance.
- `checkout-with-coupon/hardware/` — ảnh chụp và thông tin phần cứng.

## Các loại artifact được lưu

Chỉ lưu các file thuộc bộ bằng chứng cuối cùng, có thể truy vết về một lần chạy cụ thể:

- File JTL thô (`.jtl`) do JMeter ghi bằng tùy chọn `-l`.
- File log JMeter (`.log`) ghi lệnh chạy, cảnh báo và thông tin thực thi.
- Báo cáo HTML được xuất từ JTL để xem biểu đồ và thống kê trực quan.
- Ảnh listener hoặc ảnh chụp màn hình JMeter cùng với mức sử dụng tài nguyên backend.
- Ghi chú ngắn về lệnh chạy, ngày giờ, kịch bản và môi trường.
- Bằng chứng phần cứng, ví dụ ảnh DxDiag hoặc bảng thông số máy.
- Bằng chứng Soak/endurance, gồm nhiều JTL ở các mức VU và ảnh tài nguyên giữa/cuối lần chạy.

## Quy ước lưu artifact

1. Mỗi kịch bản đặt artifact trong đúng thư mục `load`, `stress`, `spike` hoặc `soak`.
2. Tên JTL nên chứa ngày chạy và profile, ví dụ `20260813-load-official.jtl` hoặc `20260815-soak-180vu.jtl`.
3. Báo cáo HTML của mỗi lần chạy phải nằm trong thư mục riêng, ví dụ `html-report/` hoặc `html-report-180vu/`.
4. Không ghi đè JTL hoặc thư mục HTML của lần chạy khác.
5. Khi chạy lại để so sánh, phải seed/reset dữ liệu tương đương và lưu artifact bằng tên riêng.
6. JTL thô là nguồn số liệu chuẩn; HTML report chỉ dùng để đối chiếu và trực quan hóa.

## Artifact hiện có trong hồ sơ

- Load: `checkout-with-coupon/load/` — JTL, log, HTML report và ảnh tài nguyên.
- Stress: `checkout-with-coupon/stress/` — JTL, log, HTML report và ảnh tài nguyên.
- Spike: `checkout-with-coupon/spike/` — JTL, log, HTML report và ảnh tài nguyên.
- Soak: `checkout-with-coupon/soak/` — các lần chạy 130, 180 và 230 VU, HTML report tương ứng và ảnh giữa/cuối lần chạy.
- Hardware: `checkout-with-coupon/hardware/hardware-dxdiag.png`.

Xem bảng kết quả và liên kết trực tiếp tại [test-summary.md](../3-test-summary/checkout-with-coupon/test-summary.md) và [traceability-matrix.md](../3-test-summary/checkout-with-coupon/traceability-matrix.md).

## Không lưu trong thư mục này

Không dùng thư mục này cho output tạm của smoke test hoặc file sinh ra trong quá trình thử nghiệm nếu file đó không thuộc bộ bằng chứng cuối cùng. Các test plan, CSV và script seed nằm trong [`../1-test-plans/checkout-with-coupon/`](../1-test-plans/checkout-with-coupon/).
