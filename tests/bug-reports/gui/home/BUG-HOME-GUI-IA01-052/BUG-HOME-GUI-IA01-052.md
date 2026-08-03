---
name: Bug report
about: Create a report to help us improve
title: "[BUG][Home] Tiêu đề tab trình duyệt chưa mô tả đúng trang"
assignees: ""
labels: "type: bug, module: product, severity: minor, priority: P3, status: new, found-by: test-case, type: gui-issue, screen: home"
---

## Found by Test Case

HOME-GUI-IA01-052

## Requirement liên quan

N/A

## Severity / Priority

Minor / P3

## Environment

- Browser: Google Chrome (Windows 11)
- Browser: Mozilla Firefox (Windows 11)

URL: `http://localhost:5173` (hoặc local Metro Bundler với di động)

## Steps to reproduce

1. Mở trang Home.
2. Nhìn vào tab của trình duyệt.
3. Kiểm tra title đang hiển thị.

## Expected result

Title phải mô tả đúng Home và không giữ tên scaffold mặc định.

## Actual result

Title vẫn là `frontend-web`, chưa đủ rõ cho người dùng nhận diện trang.

## Console / Repro

```javascript
document.title
```

## Evidence

- **Ảnh chụp lỗi trên Google Chrome:** ![Evidence 1](BUG-HOME-GUI-IA01-052_01.png)
- **Ảnh chụp lỗi trên Firefox:** ![Evidence 2](BUG-HOME-GUI-IA01-052_02.png)

## GitHub Issue

https://github.com/yuran1811/hcmus-sw-testing--eshop-sut/issues/174
