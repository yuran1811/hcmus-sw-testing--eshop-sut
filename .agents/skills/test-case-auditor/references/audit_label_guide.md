# Worked Examples for Audit Labeling

## Example: VALID
> Test case: POST /auth/register with a valid email and a sufficiently strong password → expects 201 + a returned user id.
> Check: matches the spec exactly, input is reasonable, expected result matches the successful-registration logic.
> **Audit_Label: VALID** — reason to write (in Vietnamese in your actual file): explain that this correctly follows the FR-01 registration flow and the input/expected result are consistent with the spec.

## Example: INVALID
> Test case: POST /auth/login with a wrong password → the AI wrote the expected result as `200 OK`.
> This is wrong because a failed login must return an error (401/400 depending on the spec).
> **Audit_Label: INVALID** — reason to write: the expected result is wrong; a wrong-password login must return 401 per the spec, not 200. Note that you fixed Expected_Result to something like "401 Unauthorized, body contains an error message, without leaking whether the email exists."

## Example: INCOMPLETE
> Test case: "Test adding a product to the cart" — doesn't mention the precondition of being logged in, has no concrete assertion, just says "check success."
> **Audit_Label: INCOMPLETE** — reason to write: missing precondition (needs a valid token), missing concrete input (productId, quantity), missing a clear assertion (status code, response schema). Note that you added all of these.

## Example: an added (Extend) test case with a "why AI missed it" explanation
> Added test case: send 2 requests applying the same one-time discount code nearly simultaneously (concurrent), expecting only 1 to succeed.
> **Why AI missed it**: model limitation — AI generates test cases from the static description of the spec and cannot reason about race conditions/concurrency, since this is runtime behavior that depends on backend implementation details (transaction/locking strategy) that a text-form API spec doesn't reveal.

Note: when you actually fill in `Audit_Reason` and `Notes` in the Excel file, write them in **Vietnamese** — this guide is in English only to explain the pattern to follow.
