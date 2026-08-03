# Usability Evaluation Summary

## 1. Completion Rates
- **SUCCESS_UNASSISTED**: 0 / 7 (0%)
- **SUCCESS_ASSISTED**: 0 / 7 (0%)
- **FAIL**: 7 / 7 (100%) (Tất cả người dùng đều không thể đặt lại mật khẩu mới thành công)
- **ABANDONED**: 0 / 7 (0%)

**Nhận xét**: Tỷ lệ thất bại là 100% do lỗi logic của hệ thống chặn quá trình kiểm thử ở bước cuối cùng.

## 2. SUS Scores & Qualitative Interpretation
- **Mean SUS Score**: **46.79 / 100**
- **Adjective Rating**: **Poor (Yếu - Hạng D)**
- **Acceptability**: **Not Acceptable (Không thể chấp nhận)**

**Nhận xét**: Điểm số cho thấy mức độ hài lòng và trải nghiệm sử dụng hệ thống ở mức rất thấp, chủ yếu do cảm giác bất lực khi gặp lỗi validate mật khẩu mới và sự nghi ngại về bảo mật khi OTP hiển thị trực tiếp.

## 3. Top Findings by Severity (S1-S4)
1. **Finding F-01 (Severity S1 - Blocker)**: Lỗi Regex kiểm tra mật khẩu mới bắt buộc phải chứa khoảng trắng. Người dùng không thể tự vượt qua và hoàn thành nhiệm vụ.
2. **Finding F-02 (Severity S2 - Major)**: Thiếu ô nhập xác nhận mật khẩu mới và nút hiển thị mật khẩu. Người dùng dễ gõ nhầm và khó tự phát hiện lỗi gõ.
3. **Finding F-03 (Severity S2 - Major)**: Mã OTP hiển thị công khai trên giao diện thay vì gửi qua kênh riêng tư (Email). Ảnh hưởng lớn đến lòng tin (Trust) của người dùng.
4. **Finding F-04 (Severity S2 - Major)**: Hệ thống không tự động chuyển hướng về trang Đăng nhập sau khi gửi form thành công.

## 4. Bug List & GitHub Issue Links
- **BUG-FORGOT-006**: Regex kiểm tra mật khẩu mới bắt buộc khoảng trắng. [Issue #6](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/6)
- **BUG-FORGOT-005**: Thiếu trường Xác nhận mật khẩu và nhãn OTP ghi sai. [Issue #5](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/5)
- **BUG-FORGOT-008**: Không chuyển hướng về trang Login sau khi đổi mật khẩu. [Issue #8](https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/8)

## 5. Pilot Changes Applied
- Sau phiên pilot với P01, nhóm phát hiện lỗi Regex mật khẩu và lỗ hổng hiển thị OTP trên UI. Tuy nhiên, do nguyên tắc giữ nguyên hệ thống SUT để kiểm thử, nhóm không sửa code mà bổ sung hướng dẫn ghi nhận hành vi của 7 người dùng chính thức khi đối mặt với friction point này.

## 6. Cross-reference with Task 1 GUI Checklist
- Lỗi Regex mật khẩu (`BUG-FORGOT-006`) trùng khớp với lỗi kiểm thử giao diện `GUI-FORGOT-IA02-10` trong Checklist.
- Lỗi thiếu ô nhập xác nhận mật khẩu (`BUG-FORGOT-005`) trùng khớp với `GUI-FORGOT-IA02-05`.
- Lỗi không chuyển hướng (`BUG-FORGOT-008`) trùng khớp với `GUI-FORGOT-IA04-03`.
