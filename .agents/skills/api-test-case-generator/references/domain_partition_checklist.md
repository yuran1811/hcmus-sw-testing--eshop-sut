# Domain Partition Checklist by Field Type

Use this during Round 1 of the `api-test-case-generator` skill. For each request field, identify its type and apply the matching checklist. You don't need every row for every field — pick the partitions that are meaningful for that field.

## Email
- Valid: standard format, with subdomain, with a `+` tag, mixed-case characters
- Invalid: missing `@`, missing domain, two `@` signs, whitespace, empty, too long (>254 chars), unusual unicode

## Password
- Valid: exactly at min/max length per spec, meets required complexity (upper/lower/digit/special char)
- Invalid: 1 char shorter than min, 1 char longer than max, missing one required character class, all whitespace, empty, only emoji/unicode

## Price / quantity
- Valid: > 0, correctly formatted integer/decimal, smallest valid boundary (e.g. 1 or 0.01), typical large value
- Invalid: = 0, negative, non-numeric, overflow-sized number, NaN/Infinity, numeric string with stray characters (`"100abc"`), wrong decimal precision (if spec requires exactly 2 decimals)

## IDs (path/body: productId, orderId, userId, couponCode...)
- Valid: ID exists and is owned by the caller
- Invalid: ID doesn't exist, wrongly formatted ID (not UUID/number), ID belongs to another user (→ this is also an IDOR test, mark Category=Security in parallel), negative/zero ID

## Free-form strings (product name, notes, address, search keyword)
- Valid: typical length, contains spaces, contains Vietnamese diacritics
- Invalid: empty, whitespace-only, exceeds max length, contains HTML/script tags, contains SQL special characters (`' OR 1=1--`), null byte

## Pagination / sorting (page, limit, sort)
- Valid: page=1, limit within allowed range, valid sort field
- Invalid: page=0, negative page, limit exceeds max, limit=0, non-existent sort field, invalid sort direction (not asc/desc)

## Enum / fixed status (role, status, category)
- Valid: each enum value individually (test each one separately if they trigger different code paths)
- Invalid: value outside the enum, wrong case (`ADMIN` instead of `admin` if case-sensitive), empty

## Date/time
- Valid: correct ISO format per spec, past/future date that makes semantic sense for the field
- Invalid: wrong format, non-existent date (Feb 31), missing timezone, negative/far-out value (year 1000, year 9999)

## File upload (FR-16 CSV import)
- Valid: correct file format, correct column headers, size within limit
- Invalid: wrong file extension, missing required columns, empty file, file exceeds max size, unexpected encoding (UTF-16 when spec requires UTF-8), bad data row in the middle of the file (partial failure)
