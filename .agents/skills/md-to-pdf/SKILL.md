---
name: md-to-pdf
description: Export Markdown files to beautiful, professional PDF documents using the VS Code Markdown PDF extension (yzane.markdown-pdf) with premium custom CSS styling. Provides CSS and settings configuration for one-click export.
---

# MD to PDF — Premium Export Skill

Export Markdown (`.md`) files to professional, beautifully styled PDF documents using the **Markdown PDF** extension in VS Code.

## Prerequisites

- **VS Code Extension:** `yzane.markdown-pdf` (Markdown PDF) must be installed.
  - Install via: `Ctrl+Shift+X` → search "Markdown PDF" → Install the one by **yzane**.

## Setup

### Step 1: Add Settings to VS Code

Open your **User Settings** (`Ctrl+Shift+P` → "Preferences: Open User Settings (JSON)") or your project's `.vscode/settings.json`, and add:

```json
{
  "markdown-pdf.styles": [
    "d:\\Project\\Testing\\hcmus-sw-testing--eshop-sut\\.agents\\skills\\md-to-pdf\\resources\\markdown-pdf-premium.css"
  ],
  "markdown-pdf.highlightStyle": "github-dark.css",
  "markdown-pdf.displayHeaderFooter": true,
  "markdown-pdf.headerTemplate": "<div style=\"font-size: 8px; width: 100%; text-align: right; margin-right: 20px; color: #999;\"><span class='title'></span></div>",
  "markdown-pdf.footerTemplate": "<div style=\"font-size: 8px; width: 100%; text-align: center; color: #999;\">Page <span class='pageNumber'></span> / <span class='totalPages'></span></div>",
  "markdown-pdf.margin.top": "15mm",
  "markdown-pdf.margin.bottom": "15mm",
  "markdown-pdf.margin.right": "15mm",
  "markdown-pdf.margin.left": "15mm"
}
```

### Step 2: Export

1. Open any `.md` file in VS Code.
2. Press `Ctrl+Shift+P` → type **"Markdown PDF: Export (pdf)"** → Enter.
3. Done! The PDF will be saved alongside the `.md` file.

## What the Premium CSS Includes

| Feature | Description |
|---------|-------------|
| **Typography** | Clean font stack (Segoe UI / system fonts), comfortable line-height, justified text |
| **Headings** | Styled hierarchy with colored left-border accent, bottom dividers for H1/H2 |
| **Tables** | Dark gradient headers, alternating row colors, hover effects |
| **Code Blocks** | Dark-themed (slate) with rounded corners and subtle shadow |
| **Inline Code** | Light background with border, contrasting color |
| **Blockquotes** | Blue left-border with tinted background |
| **Links** | Blue color, URL shown in parentheses when printed |
| **Images** | Centered with subtle shadow and rounded corners |
| **Horizontal Rules** | Gradient line effect |
| **Print Layout** | Page-break avoidance for headings, tables, code blocks |

## Files

```
md-to-pdf/
├── SKILL.md                                    ← This file
└── resources/
    └── markdown-pdf-premium.css                ← Premium CSS stylesheet
```
