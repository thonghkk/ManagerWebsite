#!/bin/bash
echo "🚀 Starting AndroidKnowledge..."
echo "📡 Starting Python server on port 8080..."
cd "$(dirname "$0")/.."
python3 -m server.main

## Xem tiến trình nào đang dùng cổng 8080
#lsof -i :8080
#
## Sau đó kill toàn bộ Python đang chạy (nếu có dấu hiệu treo server)
#killall -9 python3

## Khởi động server với PORT 8081
#PORT=8081 python3 -m server.main
