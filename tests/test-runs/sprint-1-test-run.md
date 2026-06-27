# Sprint 1 Test Run — June 27, 2026

## Summary

| Total | Pass | Fail | Blocked | Skip |
| ----- | ---- | ---- | ------- | ---- |
| 15    | 10   | 5    | 0       | 0    |

## Results

| TC ID                 | Feature        | Description                                                                 | Result | Notes / Bug                                                                                                                                            |
| --------------------- | -------------- | --------------------------------------------------------------------------- | ------ | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| TC-PRODUCT-DETAIL-001 | Product Detail | Product ID hợp lệ -> hiển thị đầy đủ                                        | Fail   | Bug: 1. Thiếu hiển thị tên danh mục của sản phẩm. 2. Định dạng giá sử dụng dấu phẩy (30,000,000 ₫) thay vì dấu chấm (30.000.000 ₫) như tài liệu mô tả. |
| TC-PRODUCT-DETAIL-002 | Product Detail | Product ID không tồn tại (9999) -> hiển thị thông báo lỗi phù hợp           | Pass   | Hiển thị chính xác: "Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"                                                                            |
| TC-PRODUCT-DETAIL-003 | Product Detail | Product ID không phải số ("abc") -> hiển thị lỗi phù hợp                    | Pass   | Hiển thị chính xác: "Sản phẩm không tồn tại (Lỗi trắng trang do data rỗng)"                                                                            |
| TC-PRODUCT-DETAIL-004 | Product Detail | Quantity hợp lệ (2) -> thêm vào giỏ thành công; hiển thị toast/badge        | Fail   | Bug: 1. Lỗi double-click (nút "Thêm vào giỏ hàng" yêu cầu bấm 2 lần mới hoạt động). 2. Không có badge hiển thị số lượng giỏ hàng trên navbar.          |
| TC-PRODUCT-DETAIL-005 | Product Detail | Quantity = 0 -> bị từ chối                                                  | Pass   | Hệ thống không thêm sản phẩm vào giỏ hàng với số lượng bằng 0.                                                                                         |
| TC-PRODUCT-DETAIL-006 | Product Detail | Quantity = số âm (-1) -> bị từ chối                                         | Pass   | Hệ thống không thêm sản phẩm vào giỏ hàng với số lượng âm.                                                                                             |
| TC-PRODUCT-DETAIL-007 | Product Detail | Quantity = số thập phân (1.5) -> bị từ chối                                 | Fail   | Bug: Hệ thống tự động làm tròn/chuyển đổi số lượng thập phân (1.5) thành số nguyên (1) và thêm vào giỏ thay vì từ chối/báo lỗi.                        |
| TC-PRODUCT-DETAIL-008 | Product Detail | Quantity = rỗng -> bị từ chối khi bấm "Thêm vào giỏ hàng"                   | Pass   | Hệ thống không thêm sản phẩm vào giỏ hàng khi để trống số lượng.                                                                                       |
| TC-PRODUCT-DETAIL-009 | Product Detail | Quantity = "abc" -> bị từ chối                                              | Pass   | Hệ thống không thêm sản phẩm vào giỏ hàng khi số lượng không phải là số.                                                                               |
| TC-PRODUCT-DETAIL-010 | Product Detail | Quantity = 1 (BVA ON) -> chấp nhận                                          | Pass   | Thêm vào giỏ hàng thành công với số lượng 1 (sử dụng click đúp).                                                                                       |
| TC-PRODUCT-DETAIL-011 | Product Detail | Quantity = 2 (BVA IN) -> chấp nhận                                          | Pass   | Thêm vào giỏ hàng thành công với số lượng 2 (sử dụng click đúp).                                                                                       |
| TC-PRODUCT-DETAIL-012 | Product Detail | Chưa đăng nhập, bấm "Thêm vào giỏ hàng" -> bị từ chối                       | Fail   | Bug: Khách vãng lai (chưa đăng nhập) vẫn có thể thêm sản phẩm vào giỏ hàng thành công mà không bị yêu cầu đăng nhập hay chuyển hướng.                  |
| TC-PRODUCT-DETAIL-013 | Product Detail | Trang /product/:id hiển thị breadcrumb                                      | Fail   | Bug: Không có thanh điều hướng breadcrumb nào được hiển thị trên trang chi tiết sản phẩm.                                                              |
| TC-PRODUCT-DETAIL-014 | Product Detail | Ảnh sản phẩm trên trang chi tiết có thuộc tính alt không rỗng               | Pass   | Thẻ `img` có alt attribute chứa tên sản phẩm chính xác.                                                                                                |
| TC-PRODUCT-DETAIL-015 | Product Detail | Tên/mô tả sản phẩm chứa ký tự HTML đặc biệt được hiển thị an toàn (escaped) | Pass   | XSS payload hiển thị dưới dạng văn bản thô, không thực thi mã độc hại.                                                                                 |
