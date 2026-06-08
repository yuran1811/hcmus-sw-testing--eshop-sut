#!/bin/bash
killall node
cd ./backend && pnpm i && pnpm dev &
cd ./frontend-web && pnpm i && pnpm dev &
cd ./frontend-admin && pnpm i && pnpm dev
