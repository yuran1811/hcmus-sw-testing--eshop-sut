#!/bin/bash
killall node
cd ./backend && pnpm dev &
cd ./frontend-web && pnpm dev --host 0.0.0.0 &
cd ./frontend-admin && pnpm dev --host 0.0.0.0