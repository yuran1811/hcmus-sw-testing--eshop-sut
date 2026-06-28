| Requirement | Test Case             | Result | Bug Issue                                                                                                     | Status |
| ----------- | --------------------- | ------ | ------------------------------------------------------------------------------------------------------------- | ------ |
| FR-06       | TC-PRODUCT-DETAIL-001 | Fail   | [BUG][Product Detail] - Missing Category Name                                                                 | Run    |
| FR-06       | TC-PRODUCT-DETAIL-002 | Pass   |                                                                                                               | Run    |
| FR-06       | TC-PRODUCT-DETAIL-003 | Pass   |                                                                                                               | Run    |
| FR-06       | TC-PRODUCT-DETAIL-004 | Fail   | [BUG][Product Detail] - Must double-click to 'add to cart'; No badge/toast indicates the 'add to cart' action | Run    |
| FR-06       | TC-PRODUCT-DETAIL-005 | Fail   | [BUG][Product Detail] - Product with invalid quantity still be added to cart                                  | Run    |
| FR-06       | TC-PRODUCT-DETAIL-006 | Fail   | [BUG][Product Detail] - Product with invalid quantity still be added to cart                                  | Run    |
| FR-06       | TC-PRODUCT-DETAIL-007 | Fail   | [BUG][Product Detail] - Product with invalid quantity still be added to cart                                  | Run    |
| FR-06       | TC-PRODUCT-DETAIL-008 | Fail   | [BUG][Product Detail] - Product with invalid quantity still be added to cart                                  | Run    |
| FR-06       | TC-PRODUCT-DETAIL-009 | Fail   | [BUG][Product Detail] - Product with invalid quantity still be added to cart                                  | Run    |
| FR-06       | TC-PRODUCT-DETAIL-010 | Pass   |                                                                                                               | Run    |
| FR-06       | TC-PRODUCT-DETAIL-011 | Pass   |                                                                                                               | Run    |
| FR-08       | TC-PRODUCT-DETAIL-012 | Fail   | [BUG][Product Detail] - Un-auth user can add to cart                                                          | Run    |
| FR-23       | TC-PRODUCT-DETAIL-013 | Fail   | [BUG][Product Detail] - Missing breadcrumb                                                                    | Run    |
| FR-24       | TC-PRODUCT-DETAIL-014 | Pass   |                                                                                                               | Run    |
| FR-21       | TC-PRODUCT-DETAIL-015 | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-001         | Fail   | [BUG][Coupon] - SAVE10 make the final price too high (wrong calculation)                                      | Run    |
| FR-09       | TC-COUPON-002         | Fail   | [BUG][Coupon] - BIGBUY be rejected at its threshold                                                           | Run    |
| FR-09       | TC-COUPON-003         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-004         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-005         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-006         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-007         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-008         | Fail   | [BUG][Coupon] - Un-auth user can apply the coupon                                                             | Run    |
| FR-09       | TC-COUPON-009         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-010         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-011         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-012         | Fail   | [BUG][Coupon] - BIGBUY be rejected at its threshold                                                           | Run    |
| FR-09       | TC-COUPON-013         | Fail   | [BUG][Coupon] - SAVE10 make the final price too high (wrong calculation)                                      | Run    |
| FR-09       | TC-COUPON-014         | Pass   |                                                                                                               | Run    |
| FR-09       | TC-COUPON-015         | Pass   |                                                                                                               | Run    |
| FR-21       | TC-COUPON-016         | Pass   |                                                                                                               | Run    |
| FR-21       | TC-COUPON-017         | Pass   |                                                                                                               | Run    |
| FR-21       | TC-COUPON-018         | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-001   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-002   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-003   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-004   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-005   | Fail   | [BUG][Coupon Admin] - Allow to create coupon with type="invalid"                                              | Run    |
| FR-17       | TC-COUPON-ADMIN-006   | Fail   | [BUG][Coupon Admin] - Allow to create coupon with discount_value=0                                            | Run    |
| FR-17       | TC-COUPON-ADMIN-007   | Fail   | [BUG][Coupon Admin] - Allow to create coupon with discount_value<0                                            | Run    |
| FR-17       | TC-COUPON-ADMIN-008   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-009   | Fail   | [BUG][Coupon Admin] - Allow to create coupon with invalid expired_at                                          | Run    |
| FR-17       | TC-COUPON-ADMIN-010   | Fail   | [BUG][Coupon Admin] - Allow to create coupon with min_order_amount<0                                          | Run    |
| FR-17       | TC-COUPON-ADMIN-011   | Fail   | [BUG][Coupon Admin] - Allow to create coupon with max_uses_per_user=0                                         | Run    |
| FR-17       | TC-COUPON-ADMIN-012   | Fail   | [BUG][Coupon Admin] - Allow to create coupon with max_uses_per_user<0                                         | Run    |
| FR-17       | TC-COUPON-ADMIN-013   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-014   | Fail   | [BUG][Coupon Admin] - Delete non-exist coupon still get status 200                                            | Run    |
| FR-17       | TC-COUPON-ADMIN-015   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-016   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-017   | Fail   | [BUG][Coupon Admin] - Non-admin user can create coupon                                                        | Run    |
| FR-17       | TC-COUPON-ADMIN-018   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-019   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-020   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-021   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-022   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-023   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-024   | Pass   |                                                                                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-025   | Fail   | [BUG][Coupon Admin] - Allow to create coupon without code field                                               | Run    |
| FR-17       | TC-COUPON-ADMIN-026   | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-001    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-002    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-003    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-004    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-005    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-006    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-007    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-008    | Pass   | [BUG][Cart Mobile] - Edit quantity directly in cart cause bad quantity counting                               | Run    |
| FR-20       | TC-CART-MOBILE-009    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-010    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-011    | Pass   | [BUG][Cart Mobile] - Edit quantity directly in cart cause bad quantity counting                               | Run    |
| FR-20       | TC-CART-MOBILE-012    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-013    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-014    | Pass   | [BUG][Cart Mobile] - No confirm dialog on removing item from cart                                             | Run    |
| FR-20       | TC-CART-MOBILE-015    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-016    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-017    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-018    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-019    | Pass   |                                                                                                               | Run    |
| FR-20       | TC-CART-MOBILE-020    | Pass   | [BUG][Cart Mobile] - Edit quantity directly in cart cause bad quantity counting                               | Run    |
| FR-20       | TC-CART-MOBILE-021    | Pass   | [BUG][Cart Mobile] - Edit quantity directly in cart cause bad quantity counting                               | Run    |
| FR-20       | TC-CART-MOBILE-022    | Fail   | [BUG][Cart Mobile] - Total label not display correctly                                                        | Run    |
| FR-20       | TC-CART-MOBILE-023    | Fail   | [BUG][Cart Mobile] - Cart Badge count the number of different items, not the total quantity                   | Run    |
| FR-20       | TC-CART-MOBILE-024    | Fail   | [BUG][Cart Mobile] - No illustration on empty state                                                           | Run    |
