#!/bin/bash
echo "🚀 Starting AndroidKnowledge..."
echo "📡 Starting Python server on port 8080..."
cd "$(dirname "$0")/.."
python3 -m server.main
