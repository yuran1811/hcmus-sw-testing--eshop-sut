const fs = require('fs');
const path = require('path');

const bugReportDir = path.join(__dirname, '..', 'HW3', 'Bug Report');
if (!fs.existsSync(bugReportDir)) {
  fs.mkdirSync(bugReportDir, { recursive: true });
}

const commitHash = '9b1ecea';

const bugs = [
  {
    filename: 'BUG-FORGOT-001.md',
    title: '[BUG][Forgot Password] Thẻ tiêu đề trang dùng h2 thay vì h1',
    checklistId: 'GUI-FORGOT-IA01-01',
    req: 'FR-21',
    severity: 'Minor',
    priority: 'P2',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Truy cập trang Quên Mật Khẩu tại http://localhost:5173/forgot-password',
      'Mở Developer Tools (F12) và kiểm tra thẻ tiêu đề chính của trang'
    ],
    expected: 'Trang chỉ chứa duy nhất một thẻ <h1> tiêu đề chính với nội dung "Quên Mật Khẩu"',
    actual: 'Tiêu đề trang "Quên Mật Khẩu" được khai báo bằng thẻ <h2>, DOM không có thẻ <h1> nào',
    evidenceId: 'GUI-FORGOT-IA01-01'
  },
  {
    filename: 'BUG-FORGOT-002.md',
    title: '[BUG][Forgot Password] Trường email dùng type="text" và thiếu dấu hoa thị * chỉ định bắt buộc',
    checklistId: 'GUI-FORGOT-IA02-01, GUI-FORGOT-IA02-02',
    req: 'FR-02, FR-22',
    severity: 'Major',
    priority: 'P1',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Truy cập trang Quên Mật Khẩu tại http://localhost:5173/forgot-password',
      'Quan sát nhãn trường nhập Email và kiểm tra attribute type của ô input'
    ],
    expected: 'Nhãn hiển thị dấu hoa thị bắt buộc "*" (ví dụ: "Nhập Email của bạn *") và thẻ input khai báo type="email" để trình duyệt xác thực định dạng HTML5',
    actual: 'Nhãn ghi "Nhập Email của bạn" thiếu dấu "*" và thẻ input sử dụng type="text"',
    evidenceId: 'GUI-FORGOT-IA02-01'
  },
  {
    filename: 'BUG-FORGOT-003.md',
    title: '[BUG][Forgot Password] Giao diện không có chỉ báo bước (Bước 1/2)',
    checklistId: 'GUI-FORGOT-IA02-04',
    req: 'FR-03, FR-22',
    severity: 'Minor',
    priority: 'P2',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Truy cập trang Quên Mật Khẩu tại http://localhost:5173/forgot-password',
      'Quan sát toàn bộ giao diện form Quên Mật Khẩu'
    ],
    expected: 'Hiển thị chỉ báo tiến trình trực quan ("Bước 1/2" ở bước 1 và "Bước 2/2" ở bước 2)',
    actual: 'Không có chỉ báo bước nào hiển thị trên giao diện làm người dùng không biết vị trí trong quy trình khôi phục mật khẩu',
    evidenceId: 'GUI-FORGOT-IA02-04'
  },
  {
    filename: 'BUG-FORGOT-004.md',
    title: '[BUG][Forgot Password] Nhấp nhãn văn bản label không focus ô nhập email',
    checklistId: 'GUI-FORGOT-IA02-09',
    req: 'FR-22',
    severity: 'Minor',
    priority: 'P3',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Truy cập trang Quên Mật Khẩu tại http://localhost:5173/forgot-password',
      'Dùng con trỏ chuột nhấp trực tiếp vào dòng chữ nhãn "Nhập Email của bạn"'
    ],
    expected: 'Con trỏ bàn phím (focus) tự động di chuyển vào ô nhập email',
    actual: 'Nhấp vào nhãn không có phản hồi, ô nhập email không được focus do thẻ <label> thiếu thuộc tính htmlFor',
    evidenceId: 'GUI-FORGOT-IA02-09'
  },
  {
    filename: 'BUG-FORGOT-005.md',
    title: '[BUG][Forgot Password] Bước 2 thiếu ô nhập "Xác nhận mật khẩu mới" và nhãn OTP ghi sai 4 số',
    checklistId: 'GUI-FORGOT-IA02-05, GUI-FORGOT-IA02-06, GUI-FORGOT-IA02-08',
    req: 'FR-03',
    severity: 'Major',
    priority: 'P1',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Truy cập http://localhost:5173/forgot-password',
      'Nhập email "admin@eshop.com" và nhấn "Lấy mã OTP"',
      'Quan sát form ở Bước 2'
    ],
    expected: 'Nhãn OTP ghi "Mã OTP (6 số)" và Bước 2 có thêm trường "Xác nhận mật khẩu mới" riêng biệt',
    actual: 'Nhãn ghi "Mã OTP (4 số)" và Bước 2 chỉ có 2 trường (Mã OTP và Mật khẩu mới), hoàn toàn thiếu trường Xác nhận mật khẩu mới',
    evidenceId: 'GUI-FORGOT-IA02-05'
  },
  {
    filename: 'BUG-FORGOT-006.md',
    title: '[BUG][Forgot Password] Regex kiểm tra mật khẩu bắt buộc khoảng trắng thay vì ký tự đặc biệt',
    checklistId: 'GUI-FORGOT-IA02-10',
    req: 'FR-01, FR-03',
    severity: 'Critical',
    priority: 'P0',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Nhập email hợp lệ để sang Bước 2',
      'Nhập mã OTP đúng và nhập Mật khẩu mới chuẩn bảo mật chứa ký tự đặc biệt "Test1234!"',
      'Nhấn "Đặt lại mật khẩu"'
    ],
    expected: 'Hệ thống chấp nhận mật khẩu chứa ký tự đặc biệt và thực hiện đổi mật khẩu',
    actual: 'Hệ thống báo lỗi "Mật khẩu quá yếu! Phải dài tối thiểu 8 ký tự, gồm chữ hoa, chữ thường, số và KÝ TỰ ĐẶC BIỆT" do Regex trong source code bắt buộc chứa ký tự khoảng trắng (\\s) thay vì ký tự đặc biệt',
    evidenceId: 'GUI-FORGOT-IA02-10'
  },
  {
    filename: 'BUG-FORGOT-007.md',
    title: '[BUG][Forgot Password] Hệ thống báo lỗi qua window.alert thay vì thông báo UI',
    checklistId: 'GUI-FORGOT-IA02-07, GUI-FORGOT-IA04-04',
    req: 'FR-22, FR-24',
    severity: 'Major',
    priority: 'P1',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Truy cập trang Quên Mật Khẩu',
      'Nhập email chưa đăng ký "unknown@domain.com" và nhấn nút submit'
    ],
    expected: 'Thông báo lỗi hiển thị rõ ràng bằng banner/text màu đỏ trên giao diện form phía trên nút submit',
    actual: 'Trình duyệt bật hộp thoại popup window.alert("Lỗi: User not found") làm gián đoạn trải nghiệm người dùng',
    evidenceId: 'GUI-FORGOT-IA04-04'
  },
  {
    filename: 'BUG-FORGOT-008.md',
    title: '[BUG][Forgot Password] Không chuyển hướng về trang Login sau khi đổi mật khẩu thành công',
    checklistId: 'GUI-FORGOT-IA04-03, GUI-FORGOT-IA04-05',
    req: 'FR-03, FR-24',
    severity: 'Major',
    priority: 'P1',
    url: 'http://localhost:5173/forgot-password',
    steps: [
      'Tại Bước 2, nhập OTP đúng và mật khẩu mới hợp lệ (chứa khoảng trắng theo regex)',
      'Nhấn nút "Đặt lại mật khẩu"'
    ],
    expected: 'Bật alert báo thành công và lập tức chuyển hướng người dùng về trang Đăng nhập (/login)',
    actual: 'Người dùng vẫn ở nguyên tại trang /forgot-password, các ô nhập mật khẩu và mã OTP vẫn giữ nguyên không bị xóa',
    evidenceId: 'GUI-FORGOT-IA04-03'
  },
  {
    filename: 'BUG-ORDERS-001.md',
    title: '[BUG][Admin Orders] Lỗ hổng XSS do chèn địa chỉ giao hàng bằng dangerouslySetInnerHTML',
    checklistId: 'GUI-ORDERS-IA01-05',
    req: 'FR-18, SEC-04',
    severity: 'Critical',
    priority: 'P0',
    url: 'http://localhost:5174 (tab Orders)',
    steps: [
      'Đăng nhập Admin tại http://localhost:5174',
      'Chuyển sang tab "Đơn hàng"',
      'Tạo đơn hàng có chứa thẻ HTML/Script trong địa chỉ (ví dụ: "<b>Address</b><script>alert(1)</script>")',
      'Quan sát cột Địa chỉ trong bảng quản lý đơn hàng'
    ],
    expected: 'Địa chỉ được escape và hiển thị dưới dạng chuỗi văn bản thuần (plain text)',
    actual: 'Cột địa chỉ thực thi/render thô các thẻ HTML (dữ liệu in đậm, chạy mã script) do React component sử dụng dangerouslySetInnerHTML={{ __html: o.shipping_address }}',
    evidenceId: 'GUI-ORDERS-IA01-05'
  },
  {
    filename: 'BUG-ORDERS-002.md',
    title: '[BUG][Admin Orders] Thiếu chỉ báo loading và container trạng thái rỗng khi danh sách đơn rỗng',
    checklistId: 'GUI-ORDERS-IA04-01, GUI-ORDERS-IA04-02',
    req: 'FR-24',
    severity: 'Minor',
    priority: 'P2',
    url: 'http://localhost:5174 (tab Orders)',
    steps: [
      'Đăng nhập Admin và chuyển sang tab "Đơn hàng"',
      'Quan sát màn hình trong quá trình tải dữ liệu từ API và trường hợp cơ sở dữ liệu chưa có đơn hàng nào'
    ],
    expected: 'Hiển thị spinner loading khi đang tải API; hiển thị banner "Chưa có đơn hàng nào" khi danh sách trống',
    actual: 'Bảng gián đoạn hiển thị ngay tbody rỗng mà không có spinner hoặc thông báo trạng thái rỗng',
    evidenceId: 'GUI-ORDERS-IA04-01'
  },
  {
    filename: 'BUG-ORDERS-003.md',
    title: '[BUG][Admin Orders] Thiếu hộp thoại xác nhận khi chuyển trạng thái đơn hàng và báo lỗi bằng window.alert',
    checklistId: 'GUI-ORDERS-IA04-05, GUI-ORDERS-IA04-07',
    req: 'FR-10, FR-24',
    severity: 'Major',
    priority: 'P1',
    url: 'http://localhost:5174 (tab Orders)',
    steps: [
      'Tại danh sách đơn hàng Admin, nhấn bất kỳ nút chuyển trạng thái nào (ví dụ: "Xác nhận", "Giao hàng", "Hủy")',
      'Thử thực hiện khi ngắt kết nối API'
    ],
    expected: 'Hiển thị hộp thoại xác nhận (Confirm dialog/modal) trước khi cập nhật; hiển thị thông báo lỗi trên UI khi API thất bại',
    actual: 'Hành động cập nhật trạng thái thực thi ngay lập tức mà không hỏi xác nhận; khi API lỗi hệ thống bật popup alert gốc',
    evidenceId: 'GUI-ORDERS-IA04-05'
  }
];

bugs.forEach(bug => {
  const content = `# ${bug.title}

## Found by Test Case

- ${bug.checklistId}

## Requirement liên quan

- ${bug.req}

## Severity / Priority

- **Severity**: ${bug.severity}
- **Priority**: ${bug.priority}

## Environment

- Browser: Google Chrome
- OS: Windows 11
- URL: ${bug.url}
- Build/Commit: ${commitHash}

## Steps to reproduce

${bug.steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

## Expected result

- ${bug.expected}

## Actual result

- ${bug.actual}

## Evidence

- Screenshot: ![Screenshot](../../Evidences/${bug.evidenceId}.png)

---

## GitHub Issue Draft

\`\`\`markdown
**Title**: ${bug.title}

**Description**:
### Preconditions
- SUT application running on local environment.
- Google Chrome browser.

### Steps to Reproduce
${bug.steps.map((s, idx) => `${idx + 1}. ${s}`).join('\n')}

### Expected Behavior
${bug.expected}

### Actual Behavior
${bug.actual}

### Evidence
![Screenshot](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/blob/main/HW3/Evidences/${bug.evidenceId}.png?raw=true)
\`\`\`
`;

  const filePath = path.join(bugReportDir, bug.filename);
  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Generated ${bug.filename}`);
});
