I want to complete the 4 core homework requirements for the EShop "Forgot Password & Password Reset" (FR-03) feature using an AI-First strategy.

Please apply the `test-writer` skill to generate a comprehensive report that addresses all of the following requirements.

Do NOT limit the suite to a fixed number of test cases (e.g., 20). Instead, dynamically determine the optimal number of test cases based on your EP and BVA analysis to achieve mathematically complete coverage.

Store test cases in `tests/demo/test-cases/` directory. Don't read other files, because we are recording video to demo skill `test-writer` of agent.

### Task 1 & 2: Domain Testing (EP) & Boundary Value Analysis (BVA)

Here is the exact System Requirements Specification (SRS) extracted from README.md:

#### 1. Đặc tả FR-03: Quên mật khẩu & Đặt lại mật khẩu (2 bước)

**Bước 1 — Lấy mã OTP:**

- Người dùng nhập địa chỉ Email đã đăng ký.
- Hệ thống sinh mã OTP **6 chữ số ngẫu nhiên** và gửi qua Email (trong môi trường demo: hiển thị trực tiếp trên màn hình).
- Giao diện phải hiển thị **chỉ báo bước (Step Indicator)** — ví dụ: "Bước 1 / 2".
- Có nút **Quay lại đăng nhập**.

**Bước 2 — Đặt lại mật khẩu:**

- Người dùng nhập OTP, Mật khẩu mới, và **Xác nhận mật khẩu mới**.
- Mật khẩu mới phải tuân thủ điều kiện như FR-01 (Yêu cầu mật khẩu mạnh: Tối thiểu 8 ký tự, có ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số và 1 ký tự đặc biệt gồm `@`, `$`, `!`, `%`, `*`, `?`, `&`).
- Hai trường mật khẩu phải khớp nhau.
- OTP chỉ hợp lệ cho email đã yêu cầu, không thể dùng cho email khác.

#### 2. Đặc tả FR-22: Form Requirements (GUI)

- Tất cả trường bắt buộc phải có ký hiệu `*` bên cạnh nhãn.
- Trường Email phải dùng `type="email"`.
- Trường Mật khẩu phải dùng `type="password"` (không hiển thị rõ).
- Thông báo lỗi phải xuất hiện **trên** nút submit, không phải bên dưới.
- Các form có từ 2 bước trở lên phải có **Step Indicator** rõ ràng.

---

### Instructions for the Agent Skill:

Please execute the following steps exactly as defined in the `test-writer` skill, incorporating our established refinements:

1. **Domain Testing (EP) Step-by-Step Analysis**:
   - Divide inputs (`email`, `otp`, `newPassword`, `confirmNewPassword`) into Valid and Invalid partitions.
   - Assign unique Partition IDs (e.g., `EP-IN-EMAIL-1`, `EP-IN-EMAIL-2-INV`) and provide representative values.
2. **Boundary Value Analysis (BVA) Step-by-Step Analysis**:
   - Justify the choice of BVA points. Use 2-Point BVA for simple transitions (e.g., email empty check) and 3-Point BVA for critical numeric ranges/capacities (e.g., OTP length 6, password length 8).
   - List the boundary values with unique BVA IDs.
3. **Test Case Naming & Module Convention**:
   - All test cases must be named following the format: `TC-FORGOT-PASSWORD-[NUMBER]` (starting from `TC-FORGOT-PASSWORD-001`).
   - Standardize the `Module` field in all test cases to exactly `forgot-password`.
4. **Test Case Derivation (Error Isolation & Detailed Navigation)**:
   - Establish a valid baseline: `email = test@eshop.com` (exists in DB), `otp = correct OTP`, `newPassword = Reset123!`, `confirmNewPassword = Reset123!`.
   - Derive the test cases using the Error Isolation Principle (changing one variable at a time while holding all others constant at baseline values).
   - **CRITICAL REFINEMENTS**:
     - All test cases must have **detailed navigation steps** starting from the EShop home page (`http://localhost:5173`) through the login page to the Forgot Password steps.
     - Include explicit verification of the "Quay lại đăng nhập" button and the Step Indicator ("Bước 1 / 2" and "Bước 2 / 2") in the happy path test cases.
     - Keep the `Requirement ID` fields clean: map only `FR-03` for functional test cases, and reserve `FR-22` for specialized GUI validation test cases.
5. **Test Case Reduction & Traceability Matrix**:
   - Merge duplicates and map the final set of test cases to their respective EP and BVA IDs in a Traceability Matrix.

---

### Task 3: AI Gap Analysis Framework

Provide a structured **AI Gap Analysis Template** for FR-03. This template must guide me (the human reviewer) to document:

- Any edge cases or logical flows that the AI might have missed (e.g., OTP expiration time, rate limiting on requests, brute force protection on OTP inputs, email case-sensitivity).
- The technical root causes of why these test cases or bugs might be missed during design vs. execution.
