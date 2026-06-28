import { test, expect } from '@playwright/test';
import { apiLogin, ensureCategory, API_BASE, ADMIN_CREDS, SEEDED_USER_CREDS } from '../utils/api-helpers';

/**
 * FR-15 — Quản lý Sản phẩm: các test case mà bản thân test case yêu cầu gọi API trực tiếp
 * (TC-PRODUCT-012/013/014 ghi rõ "Gửi request trực tiếp"), cộng TC-PRODUCT-011 (chọn Danh mục
 * rỗng) — UI <select> luôn có 1 lựa chọn mặc định nên không tái hiện được "không chọn Danh mục"
 * qua UI, test này chỉ kiểm thử được ở tầng API (gửi category_id rỗng).
 */

test.describe('FR-15 Quản lý Sản phẩm — API trực tiếp', () => {
  let adminToken: string;
  let userToken: string;
  let categoryId: number;

  test.beforeAll(async ({ request }) => {
    const admin = await apiLogin(request, ADMIN_CREDS.email, ADMIN_CREDS.password);
    adminToken = admin.token;
    const user = await apiLogin(request, SEEDED_USER_CREDS.email, SEEDED_USER_CREDS.password);
    userToken = user.token;
    categoryId = await ensureCategory(request, adminToken, 'Thời trang');
  });

  test('TC-PRODUCT-011: Không chọn Danh mục (category_id rỗng) -> bị từ chối', async ({ request }) => {
    const res = await request.post(`${API_BASE}/products`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { name: 'Áo thun nam', price: 150000, category_id: '' },
    });
    expect(res.status(), 'Spec yêu cầu reject khi không chọn Danh mục').toBe(400);
  });

  test('TC-PRODUCT-012: Danh mục không tồn tại (category_id=999999) -> bị từ chối', async ({ request }) => {
    const res = await request.post(`${API_BASE}/products`, {
      headers: { Authorization: `Bearer ${adminToken}` },
      data: { name: 'Áo thun nam', price: 150000, category_id: 999999 },
    });
    expect(res.status(), 'Spec yêu cầu reject khi category_id không tồn tại').toBe(400);
  });

  test('TC-PRODUCT-013: Thêm sản phẩm khi không có token -> 401 Unauthorized', async ({ request }) => {
    const res = await request.post(`${API_BASE}/products`, {
      data: { name: 'Áo thun nam', price: 150000, category_id: categoryId },
      // Không gửi header Authorization.
    });
    expect(res.status(), 'FR-12/SEC-02: phải trả 401 khi không có token').toBe(401);
  });

  test('TC-PRODUCT-014: Thêm sản phẩm bằng tài khoản không phải Admin -> 403 Forbidden', async ({ request }) => {
    const res = await request.post(`${API_BASE}/products`, {
      headers: { Authorization: `Bearer ${userToken}` }, // token hợp lệ nhưng role = 'user'
      data: { name: 'Áo thun nam', price: 150000, category_id: categoryId },
    });
    expect(res.status(), 'FR-12/SEC-03: phải trả 403 khi token hợp lệ nhưng role != admin').toBe(403);
  });
});
