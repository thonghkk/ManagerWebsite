#!/bin/bash
echo "🔧 Development mode..."
cd "$(dirname "$0")/.."

# Start server
python3 -m server.main &
SERVER_PID=$!

echo "📡 Server PID: $SERVER_PID"
echo "🌐 Open http://localhost:8080 in your browser"
echo "Press Ctrl+C to stop"

trap "kill $SERVER_PID 2>/dev/null; exit" SIGINT SIGTERM
wait $SERVER_PID
