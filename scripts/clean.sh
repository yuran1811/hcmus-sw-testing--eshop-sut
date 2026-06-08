#!/bin/sh

pnpx rimraf --glob \
  "**/.content-collections" \
  "**/.fallow" \
  "**/.gradle" \
  "**/.idea" \
  "**/.next" \
  "**/.ruff_cache" \
  "**/.source" \
  "**/.tanstack" \
  "**/.turbo" \
  "**/__generated__" \
  "**/build" \
  "**/bundle" \
  "**/coverage" \
  "**/dist" \
  "**/generated" \
  "**/node_modules" \
  "**/playwright-mcp" \
  "**/playwright-report" \
  "**/storybook-static" \
  "**/test-report" \
  "**/test-results" \
  "**/tsconfig.tsbuildinfo"
pnpx delete-empty