# GitHub Issues — Bug Links

**Repository:** TBD  
**Student ID:** 23127152

| Bug ID | Title | Severity | GitHub Issue | Screenshot |
|--------|-------|----------|--------------|------------|
| BUG-01 | TBD | TBD | #TBD | ☐ |
| BUG-02 | TBD | TBD | #TBD | ☐ |

---

## Known bugs / candidates relevant to locked APIs

| Candidate | API | Why |
|-----------|-----|-----|
| SQLi in `search` | FR-05 | `LIKE '%${searchQuery}%'` string concat |
| IDOR on order detail | FR-11 | `GET /api/orders/:id` has no auth |
| Missing auth on product CRUD | FR-15 | `POST/PUT/DELETE /api/products` no JWT/role check |
| Plaintext password in login response | Setup | Admin login returns `user.password` |
| BUG-14 (HW02) | Admin APIs | Missing role check pattern — same class as FR-15 |

> Tạo GitHub Issue mới cho mỗi bug xác nhận qua API testing (kèm screenshot).
