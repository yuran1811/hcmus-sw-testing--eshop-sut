# CHECKOUT Test Run

- **Ngày kiểm thử (Test Date):** 2026-06-29

| Test Case ID        | Module   | Tester        | Result  | Related Bug      | Note                                                                |
| :------------------ | :------- | :------------ | :------ | :--------------- | :------------------------------------------------------------------ |
| TC-CHECKOUT-DTT-001 | checkout | Mạch Quốc Tấn | Blocked |                  | Giỏ hàng trống nên không bấm được nút thanh toán                    |
| TC-CHECKOUT-DTT-002 | checkout | Mạch Quốc Tấn | Pass    |                  |                                                                     |
| TC-CHECKOUT-DTT-003 | checkout | Mạch Quốc Tấn | Fail    | BUG-CHECKOUT-001 | Giỏ hàng của người dùng không được tự động xóa sau khi thanh toán.  |
| TC-CHECKOUT-DTT-004 | checkout | Mạch Quốc Tấn | Fail    | BUG-CHECKOUT-002 | Backend chấp nhận số tiền do client gửi lên mà không tự tính lại.   |
| TC-CHECKOUT-PWS-001 | checkout | Mạch Quốc Tấn | Pass    |                  |                                                                     |
| TC-CHECKOUT-PWS-002 | checkout | Mạch Quốc Tấn | Pass    |                  |                                                                     |
| TC-CHECKOUT-PWS-003 | checkout | Mạch Quốc Tấn | Pass    |                  |                                                                     |
| TC-CHECKOUT-PWS-004 | checkout | Mạch Quốc Tấn | Fail    | BUG-CHECKOUT-001 | Giỏ hàng của người dùng không được tự động xóa sau khi thanh toán.  |
| TC-CHECKOUT-PWS-005 | checkout | Mạch Quốc Tấn | Fail    | BUG-CHECKOUT-003 | Hệ thống cho phép thanh toán thành công qua API khi giỏ hàng trống. |
| TC-CHECKOUT-PWS-006 | checkout | Mạch Quốc Tấn | Fail    | BUG-CHECKOUT-002 | Backend chấp nhận số tiền do client gửi lên mà không tự tính lại.   |
| TC-CHECKOUT-PWS-007 | checkout | Mạch Quốc Tấn | Pass    |                  |                                                                     |
| TC-CHECKOUT-PWS-008 | checkout | Mạch Quốc Tấn | Fail    | BUG-CHECKOUT-002 | Backend chấp nhận số tiền do client gửi lên mà không tự tính lại.   |
| TC-CHECKOUT-PWS-009 | checkout | Mạch Quốc Tấn | Fail    | BUG-CHECKOUT-001 | Giỏ hàng của người dùng không được tự động xóa sau khi thanh toán.  |
