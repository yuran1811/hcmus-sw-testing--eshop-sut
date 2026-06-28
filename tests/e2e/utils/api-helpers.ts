import { APIRequestContext, expect } from '@playwright/test';

export const API_BASE = 'http://localhost:3000/api';

// Tài khoản có sẵn trong dữ liệu mẫu của hệ thống — KHÔNG phải do test tạo ra.
export const ADMIN_CREDS = { email: 'admin@eshop.com', password: 'Admin123!' };
export const SEEDED_USER_CREDS = { email: 'test@eshop.com', password: 'Test1234!' };

export interface LoginResult {
  token: string;
  user: { id: number; role: string; name: string; email: string };
}

export async function apiLogin(request: APIRequestContext, email: string, password: string): Promise<LoginResult> {
  const res = await request.post(`${API_BASE}/login`, { data: { email, password } });
  expect(res.ok(), `Login API phải thành công cho ${email} (status ${res.status()})`).toBeTruthy();
  return res.json();
}

export async function apiRegister(
  request: APIRequestContext,
  data: { name: string; email: string; password: string },
) {
  // Đăng ký qua API để tránh dính bug mật khẩu phía client của trang Đăng ký — dùng để
  // chuẩn bị precondition "đã có tài khoản hợp lệ" cho các test không trực tiếp kiểm thử màn Đăng ký.
  return request.post(`${API_BASE}/register`, { data });
}

/**
 * Đảm bảo category tồn tại trong hệ thống (tạo mới nếu chưa có), trả về category id.
 * Nhiều test case (FR-15) lấy "Thời trang" làm danh mục mẫu nhưng seed data gốc chỉ có
 * Điện thoại / Laptop / Phụ kiện — nên phải tự tạo trước khi chạy test.
 */
export async function ensureCategory(request: APIRequestContext, adminToken: string, name: string): Promise<number> {
  const listRes = await request.get(`${API_BASE}/categories`);
  const categories = await listRes.json();
  const existing = categories.find((c: { id: number; name: string }) => c.name === name);
  if (existing) return existing.id;

  const createRes = await request.post(`${API_BASE}/categories`, {
    headers: { Authorization: `Bearer ${adminToken}` },
    data: { name },
  });
  expect(createRes.ok(), `Tạo category "${name}" phải thành công`).toBeTruthy();
  const created = await createRes.json();
  return created.id;
}

export async function createProduct(
  request: APIRequestContext,
  data: { name: string; price: number; description?: string; imageUrl?: string; category_id: number },
): Promise<number> {
  const res = await request.post(`${API_BASE}/products`, { data });
  expect(res.ok(), `Tạo product "${data.name}" phải thành công`).toBeTruthy();
  const created = await res.json();
  return created.id;
}
