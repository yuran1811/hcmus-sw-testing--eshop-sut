---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Link Giỏ hàng không hiển thị badge số lượng"
assignees: ""
labels: "type: bug, module: product, severity: major, priority: P1, status: new, found-by: test-case, type: gui-issue, screen: home"
---

## Found by Test Case

HOME-GUI-IA03-022

## Also observed by Usability Finding

[F04 — Sessions P01, P02, P03, P04, P05, P06](../../../../usability-tests/U-001/4_reports-synthesis/usability_evaluation_report.md#5-findings)

## Requirement liên quan

FR-23

## Severity / Priority

Major / P1

Re-triaged from Minor/P3 after 6/7 usability sessions showed that the missing badge/feedback caused uncertainty or repeated clicks.

## Environment

- Browser: Google Chrome (Windows 11)
- Browser: Mozilla Firefox (Windows 11)

URL: `http://localhost:5173` (hoặc local Metro Bundler với di động)

## Steps to reproduce

1. Mở trang Home.
2. Thêm một sản phẩm vào giỏ hàng.
3. Quan sát link Giỏ hàng trên header.

## Expected result

Link Giỏ hàng phải hiển thị badge số lượng sản phẩm trong giỏ.

## Actual result

Header không hiển thị badge số lượng trên link Giỏ hàng.

## Console / Repro

```javascript
[...document.querySelectorAll('button')].find((b) => b.textContent.includes('Thêm vào giỏ'))?.click();
document.querySelector('a[href="/cart"]')?.textContent;
```

## Evidence

- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA03-022_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA03-022_02.png)
- [U-001 bug index & evidence — F04](../../../../usability-tests/U-001/5_evidence/bug_index.md#finding-evidence)

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/181
