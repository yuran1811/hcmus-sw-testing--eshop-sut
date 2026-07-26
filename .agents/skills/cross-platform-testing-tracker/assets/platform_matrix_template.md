# Platform Matrix — <Flow/Screen scope>

- Platform 1: <VD: Chrome 126, Windows 11 — via BrowserStack>
- Platform 2: <VD: Firefox 128, Windows 11 — via BrowserStack>
- Platform 3: <VD: Safari — via Expo Go trên iPhone 13 (thay thế Safari desktop)>
- SUT URL dùng khi test: <localhost hoặc URL deploy>

## Kết quả

| ID | Item (từ checklist Task 1) | Platform 1 | Platform 2 | Platform 3 |
| -- | --------------------------- | ---------- | ---------- | ---------- |
| VIS-01 | Căn chỉnh nhãn và ô nhập trong khối "Địa chỉ giao hàng" | Not Run | Not Run | Not Run |
| RES-01 | Tại viewport 390×844, không xuất hiện thanh cuộn ngang | Not Run | Not Run | Not Run |
| COM-01 | So sánh khối thanh toán giữa 2 browser cùng viewport | Not Run | Not Run | Not Run |
| FUN-01 | Date picker chọn ngày suất chiếu mở đúng và chọn được | Not Run | Not Run | Not Run |

*Mỗi cell điền `Passed` / `Failed` / `Blocked` + tên file screenshot khi đã test thật, ví dụ:*
`Failed — chrome-win11_VIS-01_checkout-alignment.png`

## Phân loại defect sau khi điền xong

| ID | Fail trên | Phân loại |
| -- | --------- | --------- |
| | 1/3 platform | Cross-platform defect thật — log bug riêng |
| | 3/3 platform | Defect chung, đã/nên có trong bug list Task 1 — không tính là phát hiện mới ở đây |

## Tóm tắt

- Platform đã test: <...>
- Số item test / platform: <...>
- Pass rate mỗi platform: <...>
- Bug platform-specific tìm được: <BUG-xxx, BUG-yyy>
