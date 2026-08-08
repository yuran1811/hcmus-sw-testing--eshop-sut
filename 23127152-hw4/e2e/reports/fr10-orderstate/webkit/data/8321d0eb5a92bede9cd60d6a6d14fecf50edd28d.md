# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: fr10-orderstate/fr10-orderstate.spec.ts >> FR-10 — Order State Machine >> FR10-TC14 — User (non-admin) không được cập nhật trạng thái đơn qua API admin
- Location: fr10-orderstate/fr10-orderstate.spec.ts:36:9

# Error details

```
Error: expect(received).toBe(expected) // Object.is equality

Expected: 403
Received: 200
```

# Test source

```ts
  1  | import { test, expect, APIRequestContext } from '@playwright/test';
  2  | import cases from '../data/fr10-orderstate.json';
  3  | 
  4  | const API_URL = process.env.API_URL || 'http://localhost:3000';
  5  | 
  6  | async function getToken(request: APIRequestContext, email: string, password: string): Promise<string> {
  7  |   const res = await request.post(`${API_URL}/api/login`, { data: { email, password } });
  8  |   const body = await res.json();
  9  |   return body.token;
  10 | }
  11 | 
  12 | async function createOrder(request: APIRequestContext, userToken: string): Promise<number> {
  13 |   const res = await request.post(`${API_URL}/api/checkout`, {
  14 |     headers: { Authorization: `Bearer ${userToken}` },
  15 |     data: { total_amount: 100000, shipping_address: '123 Test St, District 1' },
  16 |   });
  17 |   const body = await res.json();
  18 |   return body.orderId;
  19 | }
  20 | 
  21 | async function setStatus(request: APIRequestContext, token: string, orderId: number, status: string) {
  22 |   return request.put(`${API_URL}/api/admin/orders/${orderId}/status`, {
  23 |     headers: { Authorization: `Bearer ${token}` },
  24 |     data: { status },
  25 |   });
  26 | }
  27 | 
  28 | async function cancelOrder(request: APIRequestContext, token: string, orderId: number) {
  29 |   return request.put(`${API_URL}/api/orders/${orderId}/cancel`, {
  30 |     headers: { Authorization: `Bearer ${token}` },
  31 |   });
  32 | }
  33 | 
  34 | test.describe('FR-10 — Order State Machine', () => {
  35 |   for (const tc of cases) {
  36 |     test(`${tc.id} — ${tc.description}`, async ({ request }) => {
  37 |       const adminToken = await getToken(request, 'admin@eshop.com', 'Admin123!');
  38 |       const userToken = await getToken(request, 'test@eshop.com', 'Test1234!');
  39 |       const orderId = await createOrder(request, userToken);
  40 | 
  41 |       // Arrange: walk the order through a sequence of legitimate admin
  42 |       // transitions to reach the precondition state this case needs.
  43 |       for (const status of tc.preTransitions) {
  44 |         const setupRes = await setStatus(request, adminToken, orderId, status);
  45 |         // Assertion pattern 1 — API/network: fixture setup itself must succeed,
  46 |         // otherwise the case's real precondition was never reached.
  47 |         expect(setupRes.status(), `precondition step → ${status} failed to set up`).toBe(200);
  48 |       }
  49 | 
  50 |       // Act: the actual transition/action under test.
  51 |       let response;
  52 |       const { actor, kind, newStatus } = tc.action;
  53 |       const token = actor === 'admin' ? adminToken : actor === 'user' ? userToken : undefined;
  54 | 
  55 |       if (kind === 'cancel') {
  56 |         response = await cancelOrder(request, token!, orderId);
  57 |       } else if (token) {
  58 |         response = await setStatus(request, token, orderId, newStatus!);
  59 |       } else {
  60 |         // actor === 'none': no Authorization header at all.
  61 |         response = await request.put(`${API_URL}/api/admin/orders/${orderId}/status`, {
  62 |           data: { status: newStatus },
  63 |         });
  64 |       }
  65 | 
  66 |       // Assertion pattern 2 — API/network: HTTP status of the action under test.
> 67 |       expect(response.status()).toBe(tc.expected.status);
     |                                 ^ Error: expect(received).toBe(expected) // Object.is equality
  68 | 
  69 |       // Assertion pattern 3 — value: on a valid transition, the order's stored
  70 |       // status must actually reflect the change (not just a 200 response).
  71 |       if (tc.expected.status === 200) {
  72 |         const getRes = await request.get(`${API_URL}/api/orders/${orderId}`);
  73 |         const order = await getRes.json();
  74 |         const expectedFinalStatus = kind === 'cancel' ? 'canceled' : newStatus;
  75 |         expect(order.status).toBe(expectedFinalStatus);
  76 |       }
  77 |     });
  78 |   }
  79 | });
  80 | 
```