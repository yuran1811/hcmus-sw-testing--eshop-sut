import { APIRequestContext, APIResponse } from '@playwright/test';
import { automationEnv } from '../../_common/env';

/**
 * Page Object / API Helper for Category Management (FR-14)
 * EShop SUT — Admin API: POST/GET/DELETE /api/categories
 *
 * Student: Mạch Quốc Tấn - 23127115
 */

// ─── Shared Types ─────────────────────────────────────────────────────────────

export interface Category {
  id: number;
  name: string;
}

export interface UserCredentials {
  email: string;
  password: string;
  name: string;
}

export interface LoginResult {
  token: string;
  user: { id: number; name: string; email: string; role?: string };
}

// ─── CategoryAPIHelper ────────────────────────────────────────────────────────

/**
 * Wraps all HTTP calls for the Category API so test specs stay clean.
 * All methods return the raw APIResponse so tests can assert status + body.
 */
export class CategoryAPIHelper {
  readonly request: APIRequestContext;
  readonly baseURL: string;

  constructor(request: APIRequestContext, baseURL = automationEnv.apiBaseUrl) {
    this.request = request;
    this.baseURL = baseURL;
  }

  // ── Auth ──────────────────────────────────────────────────────────────────

  /** Register a new user (ignores bad-request when the user already exists) */
  async register(creds: UserCredentials): Promise<void> {
    await this.request.post(`${this.baseURL}/api/register`, {
      data: { name: creds.name, email: creds.email, password: creds.password },
    });
  }

  /** Login and return the JWT token */
  async login(email: string, password: string): Promise<string> {
    const resp = await this.request.post(`${this.baseURL}/api/login`, {
      data: { email, password },
    });
    if (!resp.ok()) {
      throw new Error(`Login failed (${resp.status()}): ${await resp.text()}`);
    }
    const body = await resp.json() as LoginResult;
    return body.token;
  }

  /** Ensure user exists then return token */
  async ensureLogin(creds: UserCredentials): Promise<string> {
    await this.register(creds);
    return this.login(creds.email, creds.password);
  }

  // ── Category CRUD ─────────────────────────────────────────────────────────

  /**
   * POST /api/categories
   * Pass `token = null` to omit Authorization header (unauthenticated test).
   * `nameValue` is typed as `unknown` so tests can send invalid types.
   */
  async createCategory(token: string | null, nameValue: unknown): Promise<APIResponse> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return this.request.post(`${this.baseURL}/api/categories`, {
      headers,
      data: { name: nameValue },
    });
  }

  /**
   * POST /api/categories — body is the entire object (for missing-field tests)
   */
  async createCategoryRaw(token: string | null, body: unknown): Promise<APIResponse> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return this.request.post(`${this.baseURL}/api/categories`, {
      headers,
      data: body as Record<string, unknown>,
    });
  }

  /**
   * POST /api/categories using a pre-built Authorization header string
   * (lets tests send `Bearer invalid.token.signature` directly)
   */
  async createCategoryWithRawAuth(
    authHeader: string,
    body: unknown
  ): Promise<APIResponse> {
    return this.request.post(`${this.baseURL}/api/categories`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: authHeader,
      },
      data: body as Record<string, unknown>,
    });
  }

  /** GET /api/categories — returns list */
  async getCategories(token?: string): Promise<APIResponse> {
    const headers: Record<string, string> = {};
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return this.request.get(`${this.baseURL}/api/categories`, { headers });
  }

  /**
   * DELETE /api/categories/:id
   * `id` is typed as `string | number` to support invalid paths like "abc", "1.5", "0".
   */
  async deleteCategory(token: string | null, id: string | number): Promise<APIResponse> {
    const headers: Record<string, string> = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;
    return this.request.delete(`${this.baseURL}/api/categories/${id}`, { headers });
  }

  // ── Utility helpers ───────────────────────────────────────────────────────

  /** Return the current category list as a parsed array */
  async getCategoryList(token?: string): Promise<Category[]> {
    const resp = await this.getCategories(token);
    if (!resp.ok()) return [];
    return resp.json() as Promise<Category[]>;
  }

  /** Return the count of categories currently in the system */
  async getCategoryCount(token?: string): Promise<number> {
    const list = await this.getCategoryList(token);
    return list.length;
  }

  /**
   * Create a throwaway category, return its ID.
   * Throws if creation fails (used for DELETE target setup).
   */
  async createTestCategory(token: string, name: string): Promise<number> {
    const resp = await this.createCategory(token, name);
    if (!resp.ok()) {
      throw new Error(`Failed to create test category "${name}": ${resp.status()} — ${await resp.text()}`);
    }
    const body = await resp.json() as { id?: number; category?: { id: number } };
    const id = body.id ?? body.category?.id;
    if (!id) throw new Error(`Category created but no ID in response: ${JSON.stringify(body)}`);
    return id;
  }

  /**
   * Delete a category by ID; ignore not-found responses.
   * Used in afterEach cleanup blocks.
   */
  async cleanupCategory(token: string, id: number | null): Promise<void> {
    if (!id) return;
    await this.deleteCategory(token, id);
  }
}
