# Google Form Generator for Usability Tests

Thư mục này chứa mã nguồn để tạo tự động Google Form cho bảng câu hỏi đánh giá trải nghiệm người dùng (gồm 10 câu SUS và 4 câu hỏi mở rộng).

## Hướng dẫn triển khai bằng `clasp`

Để đẩy mã nguồn này lên Google Apps Script bằng clasp, hãy thực hiện các bước sau trong terminal của bạn:

### Bước 1: Cài đặt clasp và Đăng nhập
Nếu máy của bạn chưa cài đặt `clasp` hoặc chưa đăng nhập:

```bash
# Cài đặt clasp toàn cục
npm install -g @google/clasp

# Đăng nhập tài khoản Google
clasp login
```
*(Trình duyệt sẽ tự động mở để bạn chọn tài khoản Google và cấp quyền đăng nhập cho clasp)*

### Bước 2: Tạo dự án Apps Script mới
Di chuyển vào thư mục này và tạo dự án:

```bash
# Di chuyển đến thư mục chứa code
cd tests/usability-tests/google-form

# Khởi tạo dự án độc lập (standalone script)
clasp create --title "EShop Usability Form" --type standalone
```
*(Lệnh này sẽ tự động tạo file `.clasp.json` liên kết cục bộ với dự án Google Apps Script trực tuyến mới)*

### Bước 3: Đẩy code lên và Mở trên trình duyệt
```bash
# Đẩy code từ máy lên Google Drive
clasp push

# Mở giao diện lập trình web của Apps Script vừa tạo
clasp open-script
```

### Bước 4: Chạy script để tạo Form
Trên trình duyệt (giao diện Apps Script trực tuyến vừa được mở):
1. Chọn hàm `createUsabilityForm` ở thanh công cụ phía trên.
2. Nhấn nút **Chạy (Run)**.
3. Đồng ý cấp quyền truy cập để script có thể tạo file Form mới trong Google Drive của bạn.
4. Xem đường dẫn Form được hiển thị trong cửa sổ **Nhật ký thực thi (Execution Log)**.
