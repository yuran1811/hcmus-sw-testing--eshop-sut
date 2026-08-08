#!/usr/bin/env bash
# Capture front window of an app by bounds (includes browser chrome).
# Usage: capture-window.sh "Google Chrome" /path/out.png
set -euo pipefail
APP="${1:?app name}"
OUT="${2:?output png}"

BOUNDS="$(osascript -e "tell application \"$APP\"
  activate
  set b to bounds of front window
  set x to item 1 of b
  set y to item 2 of b
  set w to (item 3 of b) - x
  set h to (item 4 of b) - y
  return (x as text) & \",\" & (y as text) & \",\" & (w as text) & \",\" & (h as text)
end tell")"

echo "capture $APP bounds=$BOUNDS -> $OUT"
/usr/sbin/screencapture -x -R"$BOUNDS" "$OUT"
ls -la "$OUT"
