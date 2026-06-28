---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Product List & Search] Vỡ giao diện, tràn dòng và kéo dài trang chủ khi hiển thị chuỗi kết quả tìm kiếm quá dài (255 ký tự)"
labels: "type: bug, module: product-list-and-search, severity: cosmetic, priority: P3, status: new, found-by: test-case"
assignees: ""
---

## Found by Test Case

TC-PLAS-BVA-002

## Requirement liên quan

FR-05 (Xem danh sách & Tìm kiếm sản phẩm)

## Severity / Priority

Cosmetic / P3

## Environment

Browser: Google Chrome / Microsoft Edge, OS: Windows, URL: http://localhost:5173

## Steps to reproduce

1. Truy cập trang chủ EShop (`http://localhost:5173`).

2. Nhập từ khóa tìm kiếm dài 255 ký tự (ví dụ: chuỗi gồm 255 chữ cái `"A"` liên tục không có dấu cách).

3. Bấm nút Tìm kiếm (hoặc nhấn Enter).

4. Quan sát dòng text kết quả hiển thị: *"Kết quả tìm kiếm cho: AAAAA..."*.

## Expected result

Chuỗi từ khóa hiển thị được ngắt dòng tự động hoặc rút gọn có dấu ba chấm (CSS `word-break: break-word` hoặc `text-overflow: ellipsis`) để không làm tràn khung giao diện và kéo dài trang chủ theo chiều ngang.

## Actual result

Dòng chữ kết quả tìm kiếm không được ngắt dòng, bị tràn ra ngoài biên giao diện chính của trang chủ, tạo ra thanh cuộn ngang gây vỡ bố cục giao diện.

## Evidence

- **TC-PLAS-BVA-002 (Vỡ giao diện khi từ khóa quá dài):**
  ![Evidence](../screenshots/TC-PLAS-BVA-002.png)
