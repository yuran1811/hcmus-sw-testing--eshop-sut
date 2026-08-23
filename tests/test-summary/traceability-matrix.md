# Traceability Matrix — HW06 API Testing

| Requirement                                      | Test Case             | Endpoint             | Result | Bug Issue                          | Status                       |
| ------------------------------------------------ | --------------------- | -------------------- | ------ | ---------------------------------- | ---------------------------- |
| FR-01; api_spec 1.1                              | TC-A-REGISTER-FN-001  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-FN-002  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-FN-003  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-001  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-002  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-003  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-004  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-005  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-006  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-007  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-008  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-009  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-010  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-011  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-012  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-013  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-014  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-015  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-016  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-017  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-018  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-019  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-020  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-DP-021  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01; SEC-01                                    | TC-A-REGISTER-DP-022  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-023  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-024  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-025  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-DP-026  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-ST-001  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-ST-002  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-ST-003  | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| FR-01                                            | TC-A-REGISTER-ST-004  | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-ST-005  | POST /api/register   | PASS   | -                                  | Closed                       |
| SEC-05                                           | TC-A-REGISTER-SEC-001 | POST /api/register   | FAIL   | BUG-REGISTER-001                   | Open (bug thật)              |
| SEC-04                                           | TC-A-REGISTER-SEC-002 | POST /api/register   | PASS   | -                                  | Closed                       |
| SEC-06                                           | TC-A-REGISTER-SEC-003 | POST /api/register   | PASS   | -                                  | Closed                       |
| SEC-01                                           | TC-A-REGISTER-SEC-004 | POST /api/register   | PASS   | -                                  | Closed                       |
| SEC-06                                           | TC-A-REGISTER-SEC-005 | POST /api/register   | PASS   | -                                  | Closed                       |
| Data validation chung (KHÔNG PHẢI SEC-05)        | TC-A-REGISTER-SEC-006 | POST /api/register   | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| SEC-05                                           | TC-A-REGISTER-SEC-007 | POST /api/register   | PASS   | -                                  | Closed                       |
| api_spec 1.1                                     | TC-A-REGISTER-SEC-008 | POST /api/register   | FAIL   | BUG-REGISTER-003, BUG-REGISTER-004 | Open (bug thật)              |
| api_spec 1.1                                     | TC-A-REGISTER-SCH-001 | POST /api/register   | PASS   | -                                  | Closed                       |
| api_spec 1.1                                     | TC-A-REGISTER-SCH-002 | POST /api/register   | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| FR-01                                            | TC-A-REGISTER-SCH-003 | POST /api/register   | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| api_spec 1.1                                     | TC-A-REGISTER-SCH-004 | POST /api/register   | PASS   | -                                  | Closed                       |
| api_spec 1.1                                     | TC-A-REGISTER-SCH-005 | POST /api/register   | PASS   | -                                  | Closed                       |
| FR-01                                            | TC-A-REGISTER-ST-006  | POST /api/register   | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| FR-01; FR-19                                     | TC-A-REGISTER-ST-007  | POST /api/register   | PASS   | -                                  | Closed                       |
| SEC checklist nhóm H (Transport & header)        | TC-A-REGISTER-SEC-009 | POST /api/register   | FAIL   | BUG-REGISTER-005                   | Open (bug thật)              |
| FR-07; api_spec 4.2                              | TC-B-CART-FN-001      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-FN-002      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-06 (suy luận); FR-07                          | TC-B-CART-FN-003      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-DP-001      | POST /api/cart       | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| FR-07                                            | TC-B-CART-DP-002      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-003      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-004      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-005      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-006      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-DP-007      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-DP-008      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-DP-009      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-15 (suy luận)                                 | TC-B-CART-DP-010      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-15 (suy luận)                                 | TC-B-CART-DP-011      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07; FR-08 (tinh thần)                         | TC-B-CART-DP-012      | POST /api/cart       | FAIL   | BUG-CART-003                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-013      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-DP-014      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-015      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-06                                            | TC-B-CART-DP-016      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-06                                            | TC-B-CART-DP-017      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-06                                            | TC-B-CART-DP-018      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-06                                            | TC-B-CART-DP-019      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-06                                            | TC-B-CART-DP-020      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-021      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-DP-022      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-ST-001      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-ST-002      | POST /api/cart       | FAIL   | BUG-CART-002                       | Open (bug thật)              |
| FR-07                                            | TC-B-CART-ST-003      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-ST-004      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-ST-005      | POST /api/cart       | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| SEC-02                                           | TC-B-CART-SEC-001     | POST /api/cart       | PASS   | -                                  | Closed                       |
| SEC-02                                           | TC-B-CART-SEC-002     | POST /api/cart       | FAIL   | BUG-ADMUSER-005                    | Open (bug thật)              |
| SEC-02                                           | TC-B-CART-SEC-003     | POST /api/cart       | FAIL   | BUG-ADMUSER-005                    | Open (bug thật)              |
| SEC-02                                           | TC-B-CART-SEC-004     | POST /api/cart       | FAIL   | BUG-ADMUSER-005                    | Open (bug thật)              |
| SEC-05                                           | TC-B-CART-SEC-005     | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| SEC-04                                           | TC-B-CART-SEC-006     | POST /api/cart       | PASS   | -                                  | Closed                       |
| SEC-06 (tương tự); SEC-02                        | TC-B-CART-SEC-007     | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-08 (tinh thần)                                | TC-B-CART-SEC-008     | POST /api/cart       | PASS   | -                                  | Closed                       |
| api_spec 4.2                                     | TC-B-CART-SCH-001     | POST /api/cart       | PASS   | -                                  | Closed                       |
| SEC-02                                           | TC-B-CART-SCH-002     | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-SCH-003     | POST /api/cart       | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| SEC-02; api_spec 4.1                             | TC-B-CART-SCH-004     | POST /api/cart       | PASS   | -                                  | Closed                       |
| api_spec 4.2                                     | TC-B-CART-SCH-005     | POST /api/cart       | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| FR-07                                            | TC-B-CART-ST-006      | POST /api/cart       | PASS   | -                                  | Closed                       |
| FR-07                                            | TC-B-CART-DP-023      | POST /api/cart       | FAIL   | BUG-CART-001                       | Open (bug thật)              |
| SEC checklist nhóm H (Transport & header)        | TC-B-CART-SEC-009     | POST /api/cart       | FAIL   | BUG-REGISTER-005                   | Open (bug thật)              |
| FR-07 (nút Xóa sản phẩm)                         | TC-B-CART-FN-004      | POST /api/cart       | FAIL   | BUG-CART-005                       | Open (bug thật)              |
| FR-19; api_spec 6.1                              | TC-C-ADMUSER-FN-001   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19                                            | TC-C-ADMUSER-FN-002   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19                                            | TC-C-ADMUSER-FN-003   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-DP-001   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-DP-002   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-DP-003   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-DP-004   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19                                            | TC-C-ADMUSER-DP-005   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-DP-006   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| SEC-05                                           | TC-C-ADMUSER-DP-007   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-DP-008   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 2 (header note)                         | TC-C-ADMUSER-DP-009   | GET /api/admin/users | FAIL   | -                                  | Open (cần audit lại kỳ vọng) |
| api_spec 2 (header note)                         | TC-C-ADMUSER-DP-010   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-DP-011   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-01; FR-19                                     | TC-C-ADMUSER-ST-001   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19; api_spec 6.1                              | TC-C-ADMUSER-ST-002   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-ST-003   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-04; FR-19                                     | TC-C-ADMUSER-ST-004   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19; SEC-01                                    | TC-C-ADMUSER-ST-005   | GET /api/admin/users | PASS   | -                                  | Closed                       |
| SEC-02                                           | TC-C-ADMUSER-SEC-001  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| SEC-02                                           | TC-C-ADMUSER-SEC-002  | GET /api/admin/users | FAIL   | BUG-ADMUSER-005                    | Open (bug thật)              |
| SEC-02                                           | TC-C-ADMUSER-SEC-003  | GET /api/admin/users | FAIL   | BUG-ADMUSER-005                    | Open (bug thật)              |
| SEC-03; FR-12                                    | TC-C-ADMUSER-SEC-004  | GET /api/admin/users | FAIL   | BUG-ADMUSER-001                    | Open (bug thật)              |
| SEC-02; SEC-03                                   | TC-C-ADMUSER-SEC-005  | GET /api/admin/users | FAIL   | BUG-ADMUSER-005                    | Open (bug thật)              |
| SEC-02                                           | TC-C-ADMUSER-SEC-006  | GET /api/admin/users | FAIL   | BUG-ADMUSER-005                    | Open (bug thật)              |
| SEC-01; FR-19                                    | TC-C-ADMUSER-SEC-007  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| SEC-05                                           | TC-C-ADMUSER-SEC-008  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-SEC-009  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| SEC-02; FR-19                                    | TC-C-ADMUSER-SEC-010  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19; api_spec 6.1                              | TC-C-ADMUSER-SCH-001  | GET /api/admin/users | FAIL   | BUG-ADMUSER-003                    | Open (bug thật)              |
| SEC-02                                           | TC-C-ADMUSER-SCH-002  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| SEC-03                                           | TC-C-ADMUSER-SCH-003  | GET /api/admin/users | FAIL   | BUG-ADMUSER-001                    | Open (bug thật)              |
| api_spec 6.1                                     | TC-C-ADMUSER-SCH-004  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-SCH-005  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| api_spec 6.1                                     | TC-C-ADMUSER-SCH-006  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19                                            | TC-C-ADMUSER-ST-006   | GET /api/admin/users | FAIL   | BUG-ADMUSER-002                    | Open (bug thật)              |
| SEC-03; FR-12                                    | TC-C-ADMUSER-SEC-011  | GET /api/admin/users | PASS   | -                                  | Closed                       |
| FR-19                                            | TC-C-ADMUSER-ST-007   | GET /api/admin/users | FAIL   | BUG-ADMUSER-004                    | Open (bug thật)              |
| SEC checklist nhóm H (Transport & header); FR-12 | TC-C-ADMUSER-SEC-012  | GET /api/admin/users | FAIL   | BUG-REGISTER-005                   | Open (bug thật)              |
