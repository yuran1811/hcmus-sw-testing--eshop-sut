# PHÊ BÌNH CÔNG CỤ AI (GEMINI 3.5 FLASH) TRONG KIỂM THỬ TỰ ĐỘNG

Trong quá trình thực hiện bài tập lớn HW04, công cụ AI **Gemini 3.5 Flash** đóng vai trò là một trợ lý đắc lực giúp nâng cao hiệu suất làm việc của QA, nhưng đồng thời cũng bộc lộ những giới hạn công nghệ rõ nét đòi hỏi sự kiểm duyệt nghiêm ngặt từ con người.

### 1. Ưu điểm nổi bật
* **Tăng tốc độ khởi tạo dự án:** AI có khả năng sinh nhanh cấu trúc thư mục, các file cấu hình phức tạp của Playwright (`playwright.config.ts`, `run-matrix.js`) và khung xương mã nguồn test bằng TypeScript một cách chuẩn xác.
* **Tự động hóa sinh dữ liệu kiểm thử (Data Seeding):** Hỗ trợ thiết kế và sinh hàng loạt dữ liệu mock JSON ngoài (`FR03_data.json`, `FR11_data.json`, `FR19_data.json`) với đầy đủ các thuộc tính kiểm thử một cách nhanh chóng.
* **Đa dạng hóa kịch bản kiểm thử:** Đề xuất tốt các kịch bản kiểm thử biên (Boundary), kiểm thử giao diện (GUI) và các kịch bản bảo mật chuyên sâu (SQL Injection, XSS, Bypass Access Control) mà QA có thể bỏ sót.

### 2. Hạn chế và lỗ hổng
* **Thiếu tư duy về trạng thái dữ liệu (State & Database Cleanup):** AI không tự nhận thức được tác động tích lũy của các kịch bản test lên cơ sở dữ liệu SQLite. AI bỏ sót hoàn toàn logic dọn dẹp cơ sở dữ liệu (`beforeAll` cleanup) và khôi phục tài khoản Admin sau các ca test tự xóa, khiến bộ test bị lỗi nghiêm trọng khi chạy lặp lại hoặc chạy đa trình duyệt.
* **Bộ định vị phần tử dễ gãy (Fragile Locators):** AI có xu hướng sử dụng các selector tĩnh dựa trên nội dung text tiếng Việt hoặc chuỗi class CSS Tailwind dài, khiến script dễ bị lỗi (flaky) khi giao diện thay đổi nhỏ.
* **Lỗi cú pháp và logic:** Một số đoạn mã do AI sinh ra gặp lỗi cú pháp TypeScript cơ bản hoặc sử dụng sai kiểu so khớp của thư viện `expect`.

### 3. Đánh giá khả năng ứng dụng thực tế
Trong công việc QA/QC thực tế, Gemini 3.5 Flash là một công cụ **trợ lý đồng hành (Co-pilot) tuyệt vời** giúp tăng năng suất viết test lên đến 50%. Tuy nhiên, AI không thể hoạt động độc lập hoặc thay thế kỹ sư QA. Con người đóng vai trò tối quan trọng trong việc thiết lập kiến trúc kiểm thử, kiểm duyệt mã nguồn, tối ưu hóa locator và xử lý đồng bộ dữ liệu để xây dựng một hệ thống kiểm thử tự động ổn định và tin cậy.
