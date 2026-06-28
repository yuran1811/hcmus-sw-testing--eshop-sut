# Product List And Search Test Run

- **Ngày kiểm thử (Test Date):** 2026-06-28

| Test Case ID    | Module                  | Tester        | Result | Related Bug                              | Note                                                                    |
| :-------------- | :---------------------- | :------------ | :----- | :--------------------------------------- | :---------------------------------------------------------------------- |
| TC-PLAS-001     | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003 | Có 2 thẻ <h1>, không có alt text, đơn vị tiền tệ hiện thị VND thay vì ₫ |
| TC-PLAS-002     | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003 | Có 2 thẻ <h1>, không có alt text, đơn vị tiền tệ hiển thị VND thay vì ₫ |
| TC-PLAS-003     | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-004                             | Không có thông báo empty state phù hợp                                                                        |
| TC-PLAS-004     | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003 | Có 2 thẻ <h1>, không có alt text, đơn vị tiền tệ hiển thị VND thay vì ₫ |
| TC-PLAS-005     | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001, BUG-PLAS-005               | Có 3 thẻ <h1>, hiển thị lỗi hệ thống thay vì empty state                                |
| TC-PLAS-006     | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001, BUG-PLAS-006               | Có 2 thẻ <h1>, màn hình trắng tinh không có loading indicator                            |
| TC-PLAS-007     | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001                             | Có 2 thẻ <h1> (trùng lặp nghiệp vụ kiểm thử với TC-PLAS-001)                            |
| TC-PLAS-BVA-001 | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003 | Có 2 thẻ <h1>, không có alt text, đơn vị tiền tệ hiển thị VND thay vì ₫ |
| TC-PLAS-BVA-002 | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-007                             | Vỡ giao diện (tràn dòng hiển thị từ khóa tìm kiếm)                                      |
| TC-PLAS-BVA-003 | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-007                             | Không giới hạn ký tự nhập, vỡ giao diện (tràn dòng từ khóa 256 ký tự)                     |
| TC-PLAS-BVA-004 | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-004                             | Hệ thống trống sản phẩm hiển thị màn hình trắng tinh, không có empty state phù hợp      |
| TC-PLAS-BVA-005 | product-list-and-search | Mạch Quốc Tấn | Fail   | BUG-PLAS-001, BUG-PLAS-002, BUG-PLAS-003 | Có 2 thẻ <h1>, không có alt text, đơn vị tiền tệ hiển thị VND thay vì ₫ |
