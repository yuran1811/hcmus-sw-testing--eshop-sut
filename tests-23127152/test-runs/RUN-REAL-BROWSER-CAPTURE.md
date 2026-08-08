# Chụp cửa sổ Chrome / Firefox thật (Task 3)

macOS cần quyền **Screen Recording** cho app chạy script (Cursor hoặc Terminal).
Không có quyền → ảnh đen hoặc `could not create image from rect`.

## Bật quyền

1. **System Settings → Privacy & Security → Screen Recording**
2. Bật **Cursor** (nếu chạy từ Agent) và/hoặc **Terminal**
3. Quit & reopen Cursor/Terminal

## Chạy (SUT phải đang mở: `./scripts/run.sh`)

```bash
cd /Users/tuananhnguyen/Documents/Uni/Testing/hcmus-sw-testing--eshop-sut
PLAYWRIGHT_BROWSERS_PATH="$HOME/Library/Caches/ms-playwright" \
  node tests-23127152/test-runs/execute-task3-real.mjs
```

Chỉ một browser:

```bash
node tests-23127152/test-runs/execute-task3-real.mjs --only=chrome
node tests-23127152/test-runs/execute-task3-real.mjs --only=firefox
```

## Kiểm tra ảnh không đen

```bash
python3 - <<'PY'
from PIL import Image
import os
base='tests-23127152/cross-platform/screenshots'
for f in sorted(os.listdir(base)):
    if not (f.startswith('chrome_') or f.startswith('firefox_')): continue
    im=Image.open(f'{base}/{f}').convert('RGB').resize((48,48))
    mean=sum(sum(p)/3 for p in im.getdata())/len(im.getdata())
    print(f'{f}: meanL={mean:.0f}', 'OK' if mean>30 else 'BLACK')
PY
```

## Ghi chú

- Chrome: `Google Chrome` thật (`channel: 'chrome'`).
- Firefox: Playwright dùng build **Nightly.app** (UI Firefox + thanh URL `localhost`) vì Firefox.app hệ thống không gắn được Playwright.
- Ảnh mẫu thành công (đã chụp được 1 lần): `cross-platform/screenshots/_smoke_real_chrome.png`
