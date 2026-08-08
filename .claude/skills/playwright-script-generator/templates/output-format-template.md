## Output Format (Phase 1)

Respond in **Vietnamese**:

### 1. Chiến lược Kiểm thử (Test Strategy)

- **Happy Path / Error Case:** [Mô tả luồng đi]
- **Locators (Dự kiến):** - Input A: `...`
  - Nút B: `...`
- **Điều kiện Pass/Fail (Assertions):** [Cụ thể cái gì phải hiện ra/biến mất]

_(Dừng lại và hỏi người dùng xem chiến lược này đã chuẩn xác với UI thực tế chưa trước khi gen code)._

## Output Format (Phase 2 - Upon Approval)

### 2. Playwright Script (`.spec.ts`)

```typescript
import { test, expect } from '@playwright/test';
// [Generate robust Playwright code here]
```
