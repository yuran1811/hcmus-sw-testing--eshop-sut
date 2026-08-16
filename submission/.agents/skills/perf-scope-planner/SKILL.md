---
name: perf-scope-planner
description: >
  Use this skill when the user needs to define the scope for a performance
  testing engagement: selecting API endpoint groups, mapping them to test
  categories (auth-heavy, read-heavy, transactional), designing an end-to-end
  workflow that spans all categories, and documenting the scope in a format
  ready for test plan generation. Trigger whenever the user asks which
  endpoints to test, how to structure a performance test workflow, or wants
  to avoid overlap with other team members' test scopes. Also trigger when
  the user references a REST API application and wants to know where to begin
  with performance testing.
---

# Performance Scope Planner

## Purpose

Define a precise, non-overlapping set of API endpoints organized into the
three standard performance test categories, then compose them into a single
end-to-end workflow that a virtual user will execute.

## Step 1 — Gather context

Before proposing anything, collect the following from the user. Ask only
for information that is not already in the conversation.

- The application name and its REST API base URL (or how to find it).
- Where to find the API specification (repository link, OpenAPI/Swagger file,
  or a list of known routes).
- The team context: has anyone else already claimed a workflow? If so, which
  endpoints or flows are taken?
- Any hard constraints: endpoints that must be included or excluded, rate
  limits, authentication mechanisms, or data-sensitivity concerns.

## Step 2 — Explore the API surface

If the user provides a repository or documentation link, read it. Look for:

- Authentication routes (login, register, password reset, token refresh).
- Read routes (list/search/filter resources, view detail pages).
- Write or transactional routes (create, update, delete, checkout, payment,
  order placement).
- Administrative routes (CRUD management panels, bulk operations).

Group every discovered route into one of three categories:

**Auth-heavy** — routes whose primary cost is identity verification, session
management, or token issuance. Examples: POST /auth/login, POST /auth/register,
POST /auth/forgot-password, POST /auth/refresh.

**Read-heavy** — routes that return data without side effects and benefit from
caching. Examples: GET /products, GET /products/{id}, GET /categories,
GET /search?q={term}.

**Transactional** — routes that write state, involve business logic, or chain
multiple dependent operations. Examples: POST /cart/items, POST /orders,
POST /payments, PATCH /orders/{id}/status.

When repository source code is available, compare the specification against
the implementation before finalizing the workflow. Record any mismatch that
affects:
- response field names used for extraction
- request body shape
- status code expectations
- side effects such as DB reset on startup

## Step 3 — Design the end-to-end workflow

Construct a single sequential workflow that exercises all three categories.
Each step should depend on the output of the previous step where possible
(for example, the checkout step uses the cart ID created earlier).

Document the workflow as an ordered list with the following fields per step:

- Step number and name
- HTTP method and URL pattern
- Category it satisfies (auth-heavy / read-heavy / transactional)
- What this step depends on (prior step output, CSV variable, or none)
- What this step produces (token, resource ID, or nothing)
- Expected success response code

Example structure (adapt to the actual API):

```
Step 1 — Register or Login          [auth-heavy]
  POST /api/auth/login
  Input: ${email}, ${password} from CSV
  Produces: ${access_token}
  Expects: 200

Step 2 — List and Search Products   [read-heavy]
  GET /api/products?search=${keyword}
  Input: ${keyword} from CSV
  Produces: ${product_id} (extracted from response)
  Expects: 200

Step 3 — View Product Detail        [read-heavy]
  GET /api/products/${product_id}
  Input: ${product_id} from Step 2
  Produces: confirms product exists
  Expects: 200

Step 4 — Add to Cart                [transactional]
  POST /api/cart/items
  Header: Authorization: Bearer ${access_token}
  Body: { "product_id": ${product_id}, "quantity": ${quantity} }
  Produces: ${cart_id}
  Expects: 201

Step 5 — Place Order                [transactional]
  POST /api/orders
  Header: Authorization: Bearer ${access_token}
  Body: { "cart_id": ${cart_id} }
  Produces: ${order_id}
  Expects: 201
```

## Step 4 — Verify non-overlap with teammates

If other team members have already claimed workflows, compare the proposed
workflow against theirs. Two workflows overlap if they share the same primary
transactional endpoint (for example, both use POST /orders as the final step).

Differentiation strategies:
- Use a different product category or search keyword to exercise a different
  code path in the read layer.
- Use a different transactional outcome: one person tests checkout with a
  coupon, another without.
- Use a different user role: one tests the customer-facing flow, another tests
  the admin management flow.

## Step 5 — Document special behaviors

Before handing off to the test plan generator, flag any known edge cases in
the API that will affect test design:

- Account lockout policies: if login fails N consecutive times, the account
  is locked. State the threshold and document how to reset it between runs.
- Rate limiting: if the API throttles after a certain request rate, document
  the limit and how the test will handle 429 responses.
- Token expiry: document the token lifetime and whether the workflow needs
  a refresh step.
- Stateful side effects: if creating orders or carts persists state that
  accumulates, document the cleanup strategy.
- Derived totals: if coupon or checkout logic depends on order total, document
  whether the workflow must compute `price * quantity` or another aggregate
  before the transactional call.
- Spec versus implementation drift: if docs say one thing and source code does
  another, explicitly note which behavior the test plan should follow.

## Output format

Produce a Markdown document with this structure:

```
# Performance Test Scope — [Application Name]

## Endpoint Map

| Category     | Method | Path                        | Purpose                  |
|--------------|--------|-----------------------------|--------------------------|
| auth-heavy   | POST   | /api/auth/login             | Obtain access token      |
| read-heavy   | GET    | /api/products               | List/search products     |
| read-heavy   | GET    | /api/products/{id}          | View product detail      |
| transactional| POST   | /api/cart/items             | Add item to cart         |
| transactional| POST   | /api/orders                 | Place order              |

## End-to-End Workflow

[Ordered step list as described in Step 3]

## Variables and Dependencies

[Table of all variables: name, source, used by which step]

## Edge Case Notes

[Lockout threshold, rate limits, token expiry, cleanup requirements]

## Non-overlap Statement

[Confirm which workflows teammates are using and how this one differs]
```
