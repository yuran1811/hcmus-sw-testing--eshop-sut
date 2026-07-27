# FR-06 Automation Bug Reports

All bugs reproduced consistently on Chromium, Firefox, and WebKit on
2026-07-27. Status for every item is **Open**. Evidence is available in the
three interactive reports under `../reports/html/product-detail/` and in the
failure artifacts under `../reports/artifacts/product-detail/`.

## BUG-FR06-001 — Product category is missing from Product Detail

| Field | Value |
| --- | --- |
| Requirement | FR-06 |
| Cases | TC-PRODUCT-DETAIL-001 |
| Severity | Major |
| Reproducibility | 3/3 browsers |

**Steps:** Sign in, open `/product/1`, and inspect the displayed product fields.

**Expected:** The page distinctly displays the product image, name, formatted
price, description, and category (`Điện thoại`).

**Observed:** Image, name, price, and description render, but there is no
distinct category field. A broad category assertion initially matched the word
inside the description; verification repaired the automation to require an
exact category element, after which the defect reproduced consistently.

## BUG-FR06-002 — Invalid product identifiers return HTTP 200 with an empty object

| Field | Value |
| --- | --- |
| Requirements | FR-06 / API error handling |
| Cases | TC-PRODUCT-DETAIL-002, TC-PRODUCT-DETAIL-003 |
| Severity | Major |
| Reproducibility | 6/6 case-browser executions |

**Steps:** Request `/api/products/9999`, then `/api/products/abc`; open the
corresponding Product Detail routes.

**Expected:** Unknown numeric IDs return 404. Malformed IDs return 400 or a
documented validation/not-found status. The UI presents an appropriate error.

**Observed:** Both API requests return HTTP 200 with `{}`. The UI can display a
not-found message only after treating this successful empty response as data.

## BUG-FR06-003 — First valid Add to Cart click is ignored

| Field | Value |
| --- | --- |
| Requirement | FR-06 |
| Cases | TC-PRODUCT-DETAIL-004, TC-PRODUCT-DETAIL-010, TC-PRODUCT-DETAIL-011 |
| Severity | Critical |
| Reproducibility | 9/9 case-browser executions |

**Steps:** Sign in, open `/product/1`, enter quantity 1 or 2, and click **Thêm
vào giỏ hàng** exactly once.

**Expected:** One click adds the selected quantity and gives visual feedback;
the cart contains the product with the requested quantity.

**Observed:** The button remains `Thêm vào giỏ hàng`, no success feedback is
shown, and the cart stays empty. Automation intentionally clicks once and does
not compensate with a second click.

## BUG-FR06-004 — Invalid quantities have no validation feedback

| Field | Value |
| --- | --- |
| Requirement | FR-06 |
| Cases | TC-PRODUCT-DETAIL-005..009 |
| Severity | Major |
| Reproducibility | 15/15 case-browser executions |

**Steps:** Open `/product/1`, enter `0`, `-1`, `1.5`, an empty value, or
alphabetic input, then click **Thêm vào giỏ hàng** once.

**Expected:** The UI rejects the value, explains that quantity is required and
must be a positive integer of at least 1, and leaves the cart unchanged.

**Observed:** The cart remains unchanged on the ignored first click, but the UI
shows no validation error. Silent non-action does not satisfy the required
validation feedback.

## BUG-FR06-005 — Unauthenticated Product Detail UI provides no login rejection

| Field | Value |
| --- | --- |
| Requirements | FR-08 / API specification |
| Cases | TC-PRODUCT-DETAIL-012 |
| Severity | Major |
| Reproducibility | 3/3 browsers |

**Steps:** Use a clean context without a JWT, open `/product/1`, enter quantity
1, and click **Thêm vào giỏ hàng** once.

**Expected:** The UI rejects the action with a login message or redirects to
`/login`; the backend cart endpoint returns HTTP 401.

**Observed:** The real unauthenticated `POST /api/cart` correctly returns 401,
but the Product Detail UI shows no authentication error and remains on
`/product/1` without redirecting.

## BUG-FR06-006 — Product Detail breadcrumb and home link are absent

| Field | Value |
| --- | --- |
| Requirement | FR-23 |
| Cases | TC-PRODUCT-DETAIL-013 |
| Severity | Minor |
| Reproducibility | 3/3 browsers |

**Steps:** Sign in, open `/product/1`, and inspect the area below the navbar.

**Expected:** A breadcrumb such as `Trang chủ > Chi tiết sản phẩm` is visible,
and its `Trang chủ` link navigates to `/`.

**Observed:** No breadcrumb or `Trang chủ` breadcrumb link exists.

## Passed security/accessibility controls

These are not bugs but are retained for balance and traceability:

- TC-014 passed on all browsers: the primary product image has non-empty alt text.
- TC-015 passed on all browsers: malicious name/description strings remain text,
  no injected script/image is rendered, and no alert dialog executes.
