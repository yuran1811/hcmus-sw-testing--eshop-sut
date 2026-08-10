#!/usr/bin/env bash
# check_git_commits.sh
#
# Kiểm tra tự động điều kiện "Git Commit Log" (mục 12 đề bài HW04):
#   - >= 8 commit thay đổi file .spec.js / .spec.ts (hoặc tương đương)
#
# Cách dùng: chạy trong thư mục gốc của repo Git
#   ./check_git_commits.sh [pattern-file-test]
#
# Ví dụ:
#   ./check_git_commits.sh
#   ./check_git_commits.sh '\.spec\.(js|ts)$'

set -euo pipefail

PATTERN="${1:-\.spec\.(js|ts)$}"

if [ ! -d .git ]; then
  echo "Lỗi: thư mục hiện tại không phải là 1 Git repo (không thấy .git/)." >&2
  exit 1
fi

echo "== Đang quét các commit thay đổi file khớp mẫu: $PATTERN =="

# Lấy danh sách "hash|ngày" cho các commit có ít nhất 1 file khớp pattern
mapfile -t QUALIFYING_COMMITS < <(
  git log --pretty=format:'%H|%ad' --date=short --name-only |
  awk -v RS='' -v pat="$PATTERN" '
    {
      split($0, lines, "\n");
      hash_date = lines[1];
      matched = 0;
      for (i = 2; i <= length(lines); i++) {
        if (lines[i] ~ pat) { matched = 1; break }
      }
      if (matched) print hash_date;
    }'
)

COUNT=${#QUALIFYING_COMMITS[@]}
echo "Số commit hợp lệ (chạm vào file test): $COUNT"

if [ "$COUNT" -eq 0 ]; then
  echo "⚠️  Không tìm thấy commit nào chạm vào file khớp mẫu '$PATTERN'."
  exit 1
fi

echo ""
echo "Danh sách commit hợp lệ:"
UNIQUE_DATES=()
for entry in "${QUALIFYING_COMMITS[@]}"; do
  hash="${entry%%|*}"
  date="${entry##*|}"
  echo "  - ${hash:0:8}  $date"
  UNIQUE_DATES+=("$date")
done

# Đếm số ngày khác nhau
NUM_UNIQUE_DAYS=$(printf '%s\n' "${UNIQUE_DATES[@]}" | sort -u | wc -l)

echo ""
echo "== Kết quả đối chiếu điều kiện đề bài =="
if [ "$COUNT" -ge 8 ]; then
  echo "  [OK]    Số commit hợp lệ = $COUNT (>= 8 yêu cầu)"
else
  echo "  [THIẾU] Số commit hợp lệ = $COUNT (< 8 yêu cầu) — cần thêm $((8 - COUNT)) commit nữa"
fi

echo "  [INFO]  Số ngày khác nhau có commit hợp lệ = $NUM_UNIQUE_DAYS"

echo ""
echo "Lưu ý: script chỉ đếm dựa trên tên file khớp mẫu regex, không thay thế việc bạn"
echo "tự kiểm tra nội dung commit có thực sự là thay đổi có ý nghĩa hay không."
