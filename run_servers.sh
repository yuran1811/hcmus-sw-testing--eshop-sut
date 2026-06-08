#!/bin/bash
killall node
cd ./backend && pnpm dev &
cd ./frontend-web && pnpm dev &
cd ./frontend-admin && pnpm dev &
