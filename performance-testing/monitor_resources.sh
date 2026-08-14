#!/usr/bin/env bash
# Ghi CPU/RAM cua tien trinh backend (node server.js) va CPU/RAM tong he thong moi 5s.
# Dung: ./monitor_resources.sh <output_log_file> <duration_seconds>
OUT="$1"
DURATION="${2:-9999}"
END=$((SECONDS + DURATION))
echo "timestamp,backend_pid,backend_cpu_pct,backend_mem_pct,backend_rss_kb,sys_mem_used_pct,loadavg_1min" > "$OUT"
while [ $SECONDS -lt $END ]; do
  PID=$(pgrep -x node | head -1)
  if [ -n "$PID" ]; then
    read CPU MEMPCT RSS < <(ps -o %cpu=,%mem=,rss= -p "$PID" 2>/dev/null)
  else
    CPU="NA"; MEMPCT="NA"; RSS="NA"
  fi
  SYS_MEM=$(free | awk '/Mem:/ {printf "%.1f", $3/$2*100}')
  LOAD=$(cut -d' ' -f1 /proc/loadavg)
  echo "$(date '+%Y-%m-%dT%H:%M:%S'),${PID:-NA},${CPU},${MEMPCT},${RSS},${SYS_MEM},${LOAD}" >> "$OUT"
  sleep 5
done
