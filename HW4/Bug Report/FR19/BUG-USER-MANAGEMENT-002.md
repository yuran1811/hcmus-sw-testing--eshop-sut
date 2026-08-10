# [BUG][User Management] Cho phép tài khoản Admin tự xóa chính mình trên giao diện và API

## Found by Test Case

- F19-TC-011 & F19-TC-012

## Requirement liên quan

- FR-19

## Severity / Priority

- **Severity**: Critical
- **Priority**: P0

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: http://localhost:5174/ (Ứng dụng frontend Admin)
- Build/Commit: 3aa95b1

## Steps to reproduce

1. Đăng nhập vào trang quản trị Admin tại `http://localhost:5174/` bằng tài khoản `admin@eshop.com`.
2. Bấm chọn tab "Người dùng" để mở giao diện danh sách người dùng.
3. Tìm đến dòng của chính tài khoản `admin@eshop.com` đang đăng nhập.
4. Bấm vào nút "Xóa" tương ứng hoặc gửi trực tiếp request API HTTP DELETE đến `/api/admin/users/<admin_id>` bằng Token Admin hiện tại.

## Expected result

- Nút "Xóa" của admin đang đăng nhập trên giao diện phải bị ẩn hoặc vô hiệu hóa.
- API backend phải chặn yêu cầu tự xóa chính mình của Admin hiện tại và trả về lỗi `400 Bad Request` hoặc `403 Forbidden`.

## Actual result

- Nút "Xóa" vẫn hiển thị hoạt động bình thường trên giao diện cho tài khoản admin đang đăng nhập.
- Khi bấm nút hoặc gọi API, hệ thống tiến hành xóa thành công tài khoản admin khỏi CSDL và trả về mã `200 OK`, làm sập phiên đăng nhập hiện tại và khóa hoàn toàn quyền quản trị của hệ thống.

## Evidence

- Screenshot: ![Screenshot](../Evidences/FR19/F19-TC-011.png)
- Screenshot: ![Screenshot](../Evidences/FR19/F19-TC-012.png)
