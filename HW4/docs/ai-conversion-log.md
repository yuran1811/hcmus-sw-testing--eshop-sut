# NHẬT KÝ QUY TRÌNH CHUYỂN ĐỔI CHÚNG - HỖ TRỢ BỞI AI (AI AUDIT LOG)

Báo cáo quy trình cộng tác giữa sinh viên và Trợ lý lập trình AI trong việc chuyển đổi các đặc tả kiểm thử thủ công thành bộ mã nguồn kiểm thử tự động hóa hướng dữ liệu (Data-Driven Testing) sử dụng Playwright, TypeScript cho dự án HW04 (EShop SUT).

---

## 1. Các Prompt Sử Dụng và Cách Tối Ưu Hóa (Prompt Engineering)

Quy trình phát triển bộ kiểm thử tự động được thực hiện qua 5 giai đoạn chính. Để nhận được kết quả tốt nhất từ AI, các prompt được thiết kế theo nguyên tắc cấu trúc hóa, phân vai, cung cấp ngữ cảnh đầy đủ của SUT và ràng buộc kỹ thuật rõ ràng.

### Giai đoạn 1: Phân tích & Đặc tả Yêu cầu (Analysis)
* **Prompt ban đầu:** *"Hãy đọc đặc tả của phân hệ FR-03 và viết kịch bản kiểm thử."*
* **Hạn chế:** Kết quả trả về quá chung chung, không bám sát cấu trúc của hệ thống EShop thực tế và thiếu các ca kiểm thử biên.
* **Prompt tối ưu hóa:** 
  > *"Bạn là một Chuyên gia Kiểm thử Phần mềm (QA Engineer) giàu kinh nghiệm. Hãy phân tích tài liệu đặc tả của phân hệ [Tên phân hệ, ví dụ: FR-03 Quên mật khẩu]. Xác định toàn bộ các tác nhân, điều kiện tiên quyết, luồng sự kiện chính, các luồng lỗi và quy tắc nghiệp vụ quan trọng. Đầu ra yêu cầu liệt kê chi tiết dưới dạng danh sách rõ ràng."*

### Giai đoạn 2: Thiết kế các Ca Kiểm thử (Test Case Design)
* **Prompt ban đầu:** *"Hãy liệt kê 12 test case cho tính năng này."*
* **Hạn chế:** Các ca kiểm thử bị trùng lặp ý tưởng nghiệp vụ hoặc chỉ xoay quanh các giá trị hợp lệ (Positive).
* **Prompt tối ưu hóa:**
  > *"Dựa trên kết quả phân tích phân hệ, hãy thiết kế một danh sách gồm tối thiểu 12 ca kiểm thử duy nhất cho phân hệ này. Danh sách bắt buộc phải bao gồm: 4 ca kiểm thử tích cực (Positive), 4 ca kiểm thử tiêu cực (Negative), 2 ca kiểm thử giá trị biên/bảo mật (Boundary/Security) và 2 ca kiểm thử giao diện (GUI/Accessibility). Mỗi ca kiểm thử cần có ID duy nhất (ví dụ: F03-TC-001), mục đích, dữ liệu đầu vào và kết quả mong đợi cụ thể."*

### Giai đoạn 3: Mô hình hóa Dữ liệu Kiểm thử (Data Modeling)
* **Prompt ban đầu:** *"Hãy tạo file JSON chứa dữ liệu cho các test case trên."*
* **Hạn chế:** Cấu trúc JSON lồng nhau phức tạp khiến việc load dữ liệu trong Playwright gặp khó khăn, thiếu kiểu dữ liệu rõ ràng.
* **Prompt tối ưu hóa:**
  > *"Hãy thiết kế một lược đồ (schema) dữ liệu JSON phẳng cho các ca kiểm thử đã thiết kế. Mỗi bản ghi trong file JSON đại diện cho một ca kiểm thử, chứa đầy đủ các trường: `caseId`, `category`, `purpose`, các giá trị đầu vào (ví dụ: `email`, `newPassword`), và kết quả mong đợi (`expectedError`, `expectedRoute`). Đảm bảo không chứa bất kỳ hàm thực thi hay selector CSS nào trong file JSON."*

### Giai đoạn 4: Viết Mã nguồn Kiểm thử Tự động (Code Generation)
* **Prompt ban đầu:** *"Viết script Playwright chạy danh sách test case trên từ file JSON."*
* **Hạn chế:** AI sinh code sử dụng kiểu dữ liệu `any` vô tội vạ, viết gộp các luồng chạy phức tạp và sử dụng các selector CSS không ổn định (ví dụ: `div > div > button`).
* **Prompt tối ưu hóa:**
  > *"Hãy viết mã nguồn kiểm thử bằng Playwright và TypeScript. Đọc dữ liệu kiểm thử từ file JSON tương ứng bằng thư viện `fs` và chạy lặp qua các ca kiểm thử. Yêu cầu:
  > 1. Định nghĩa Interface chi tiết cho dữ liệu đầu vào để đảm bảo Type Safety, cấm sử dụng `any`.
  > 2. Sử dụng các locator hướng người dùng (User-facing locators) của Playwright như `getByRole`, `getByPlaceholder`, `getByText` để đảm bảo độ bền vững của mã.
  > 3. Cài đặt cơ chế kiểm soát hộp thoại (dialog listener) để bắt các thông báo alert/confirm từ SUT.
  > 4. Cài đặt các hook `beforeAll` để thực hiện seeding dữ liệu kiểm thử thông qua API của SUT nhằm tăng tính cô lập."*

### Giai đoạn 5: Khắc phục & Sửa lỗi (Verification & Repair)
* **Prompt tối ưu hóa:**
  > *"Đoạn mã chạy kiểm thử gặp lỗi [Nội dung thông báo lỗi chi tiết]. Đây là cấu trúc DOM hiện tại của trang: [Đoạn mã HTML/DOM]. Hãy phân tích nguyên nhân và đề xuất phương án sửa lỗi tối thiểu, bám sát các locator ngữ nghĩa của Playwright."*

---

## 2. Các Lỗi Cú Pháp và Logic Đã Khắc Phục (Human Corrections)

Trong quá trình xem xét kết quả do AI sinh ra, lập trình viên đã phát hiện và trực tiếp sửa đổi các lỗi nghiêm trọng sau để đảm bảo mã nguồn chạy thành công và đúng chuẩn:

### 2.1. Lỗi Kiểu Dữ Liệu TypeScript (TypeScript Type Safety)
* **Lỗi của AI:** AI thường import trực tiếp file JSON bằng câu lệnh `import testData from '../test-data/FR03_data.json'` nhưng cấu hình TypeScript chưa bật `resolveJsonModule`, dẫn đến lỗi biên dịch. Ngoài ra, AI sử dụng kiểu dữ liệu `any` cho các tham số callback hoặc evaluate của trình duyệt.
* **Cách khắc phục:** 
  - Chuyển sang đọc file động bằng `fs.readFileSync` kết hợp `JSON.parse`.
  - Định nghĩa tường minh `interface TestCase` và khai báo kiểu dữ liệu cho mảng kiểm thử: `const testCases: TestCase[] = ...`.
  - Định nghĩa rõ kiểu cho các hàm callback trong trình duyệt:
    ```typescript
    // Sửa lỗi evaluate (el) => el.validationMessage bị thiếu kiểu dữ liệu trong TypeScript
    const validationMessage = await emailInput.evaluate((el: HTMLInputElement) => el.validationMessage);
    ```

### 2.2. Lỗi Khẳng Định của Playwright (Playwright Assertions & Locators)
* **Lỗi của AI:** AI sử dụng các locator CSS tĩnh như `.bg-green-100` để kiểm tra thông điệp xanh lá nhưng SUT thực tế thay đổi class hoặc hiển thị thông điệp qua hàm `alert()` của trình duyệt. AI cũng sử dụng `expect(page.url()).toBe(...)` ngay sau hành động bấm nút mà không đợi quá trình điều hướng (navigation) hoàn tất, gây lỗi bất đồng bộ.
* **Cách khắc phục:**
  - Bổ sung trình lắng nghe sự kiện `dialog` toàn cục: `page.on('dialog', async (dialog) => { ... })` để chụp lại toàn bộ thông điệp lỗi dạng alert/popup của SUT.
  - Sử dụng khẳng định tự động đợi của Playwright: `await page.waitForURL('**/login', { timeout: 5000 })` thay vì so sánh chuỗi URL tĩnh ngay lập tức.
  - Chuyển đổi các selector mong manh của AI thành các locator ngữ nghĩa:
    ```typescript
    // Thay vì dùng: await page.click('form button')
    // Đã sửa thành:
    await page.getByRole('button', { name: 'Lấy mã OTP' }).click();
    ```

### 2.3. Logic Dọn Dẹp Cơ Sở Dữ Liệu và Ghi Dữ Liệu Kiểm Thử (Database Isolation & Seeding)
* **Lỗi của AI:** Khi thực hiện kiểm thử tự động, AI chỉ gọi các API đăng ký người dùng mới trong `beforeAll`. Khi chạy nhiều trình duyệt song song hoặc chạy lại bộ kiểm thử, database sẽ báo lỗi trùng lặp khóa chính hoặc tài khoản đã tồn tại. Ngoài ra, các ca kiểm thử ghi dữ liệu đồng thời vào tệp SQLite (`database.sqlite`) của SUT gây ra lỗi khóa cơ sở dữ liệu (`SQLITE_BUSY: database is locked`).
* **Cách khắc phục:**
  - **Dọn dẹp DB trước khi chạy:** Viết logic dọn dẹp (clean) dữ liệu cũ liên quan đến bộ test trong `beforeAll` bằng cách chạy một đoạn script Node.js gọi trực tiếp thư viện `sqlite3` của backend trước khi seeding:
    ```typescript
    const cleanupScript = `
      const sqlite3 = require(require('path').join('${nodeModulesPath}', 'sqlite3'));
      const db = new sqlite3.Database('${dbFile}');
      db.serialize(() => {
        db.run("DELETE FROM users WHERE email LIKE 'user_f11_%'");
      });
    `;
    execSync(`node -e "${cleanupScript}"`);
    ```
  - **Khắc phục lỗi ghi đè đồng thời:** Cấu hình Playwright chạy tuần tự bằng cách giới hạn số lượng luồng thực thi thông qua thuộc tính `workers: 1` trong file `playwright.config.ts`.
  - **Khôi phục trạng thái Admin (Self-Deletion Recovery):** Do phân hệ FR-19 kiểm thử chức năng admin tự xóa tài khoản của chính mình (khiến tài khoản admin biến mất khỏi DB và làm hỏng các test case chạy sau), lập trình viên đã bổ sung hook `afterEach` để tự động kiểm tra và ghi lại (re-seed) tài khoản Admin vào database sau mỗi test case:
    ```typescript
    test.afterEach(async () => {
      reseedAdminSync(); // Gọi script SQLite đồng bộ kiểm tra và thêm lại Admin nếu bị xóa
    });
    ```

---

## 3. Tuyên Bố Tuân Thủ (Compliance Statement)

Sinh viên cam kết và xác nhận các điều khoản tuân thủ học thuật sau đây đối với bài nộp HW04:

1. **Quyền Tác Giả Bộ Mã Nguồn:** Toàn bộ bộ mã nguồn kiểm thử tự động (gồm các file `.spec.ts` trong thư mục `HW4/tests/`), mã nguồn script chạy ma trận kiểm thử (`HW4/scripts/run-matrix.js`), cấu hình dự án (`HW4/playwright.config.ts`), và các dữ liệu kiểm thử hướng đối tượng (`HW4/test-data/*.json`) hoàn toàn do bản thân sinh viên thiết kế, hiệu chỉnh, trực tiếp viết và chịu trách nhiệm dưới sự định hướng, hỗ trợ từng bước của Trợ lý AI.
2. **Không Sao Chép Trực Tiếp:** Bộ kiểm thử này được thiết kế dựa trên mã nguồn SUT cụ thể của repository này, không sao chép nguyên mẫu hay sử dụng mã nguồn kiểm thử của bất kỳ sinh viên nào khác trong lớp.
3. **Tính Trung Thực Của Kết Quả:** Toàn bộ kết quả chạy ma trận kiểm thử trên 3 trình duyệt (Chromium, Firefox, WebKit) và các báo cáo HTML đi kèm là kết quả thực thi kiểm thử thực tế trên hệ thống SUT chạy tại local của sinh viên, không chứa các số liệu hay văn bản kết quả do AI giả lập hoặc tự biên soạn.

*Ký tên xác nhận,*

Sinh viên: **Nguyễn An**  
Mã số sinh viên: **23127148**  
Lớp: **Hệ thống Thông tin - Khoa Công nghệ Thông tin, Trường Đại học Khoa học Tự nhiên - ĐHQG-HCM**
