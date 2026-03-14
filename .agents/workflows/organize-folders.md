---
description: Hướng dẫn tổ chức folder giữa Client (Frontend) và Server (Backend) cho project AndroidKnowledge
---

# 📁 Tổ chức Folder Client / Server

Agent này hướng dẫn cách tổ chức lại cấu trúc thư mục project, tách biệt rõ ràng giữa **Client (Frontend)** và **Server (Backend)**.

---

## 📊 Hiện trạng Project (TRƯỚC)

```
AndroidKnowledge/
├── app.js              ← Client: logic chính (678 dòng, monolith)
├── data.js             ← Client: default data
├── details.js          ← Client: item details
├── index.html          ← Client: HTML
├── style.css           ← Client: CSS
├── server.py           ← Server: Python API
├── database.json       ← Server: data storage
├── questions.json      ← Server: questions storage
├── README.md           ← Docs
└── .git/
```

**Vấn đề:**
- Client và Server lẫn lộn cùng 1 folder
- Không có separation of concerns ở cấp folder
- Khó scale, khó deploy riêng biệt
- Không phân biệt được file nào thuộc phần nào

---

## 🎯 Cấu trúc đề xuất (SAU)

```
AndroidKnowledge/
│
├── 📁 client/                          # ── FRONTEND ──
│   ├── index.html                      # Entry point HTML
│   │
│   ├── 📁 src/                         # Source code JS
│   │   ├── app.js                      # Bootstrap / init
│   │   │
│   │   ├── 📁 constants/               # Hằng số, config
│   │   │   ├── config.js               # API_BASE_URL, STORAGE_KEY, ...
│   │   │   └── selectors.js            # DOM element IDs constants
│   │   │
│   │   ├── 📁 state/                   # State management
│   │   │   └── store.js                # State container + actions
│   │   │
│   │   ├── 📁 services/                # External communication
│   │   │   └── api.js                  # HTTP calls to server
│   │   │
│   │   ├── 📁 ui/                      # UI rendering modules
│   │   │   ├── sidebar.js              # Render sidebar + navigation
│   │   │   ├── checklist.js            # Render checklist items
│   │   │   ├── modals.js               # All modal dialogs
│   │   │   ├── toast.js                # Toast notification
│   │   │   └── detail.js               # Detail modal (tips, Q&A)
│   │   │
│   │   ├── 📁 events/                  # Event system
│   │   │   └── eventBus.js             # Pub/Sub event bus
│   │   │
│   │   ├── 📁 factories/               # Object creation
│   │   │   └── modelFactory.js         # Create category/item objects
│   │   │
│   │   ├── 📁 utils/                   # Utility functions
│   │   │   └── helpers.js              # escHtml, uid, ...
│   │   │
│   │   └── 📁 data/                    # Static/default data
│   │       ├── defaultData.js          # DEFAULT_DATA categories
│   │       └── itemDetails.js          # ITEM_DETAILS lookup
│   │
│   ├── 📁 styles/                      # CSS files
│   │   ├── base.css                    # Reset, variables, typography
│   │   ├── layout.css                  # Sidebar, main, topbar
│   │   ├── components.css              # Buttons, inputs, badges
│   │   ├── modals.css                  # All modal styles
│   │   └── detail.css                  # Detail view styles
│   │
│   └── 📁 assets/                      # Static assets
│       ├── 📁 images/                  # Images, icons
│       └── 📁 fonts/                   # Local fonts (if any)
│
├── 📁 server/                          # ── BACKEND ──
│   ├── main.py                         # Entry point - start server
│   ├── config.py                       # Server configuration
│   │
│   ├── 📁 handlers/                    # Request handlers
│   │   ├── __init__.py
│   │   ├── data_handler.py             # /api/data endpoints
│   │   └── questions_handler.py        # /api/questions endpoints
│   │
│   ├── 📁 middleware/                  # Middleware
│   │   ├── __init__.py
│   │   └── cors.py                     # CORS headers
│   │
│   ├── 📁 storage/                     # Data persistence
│   │   ├── __init__.py
│   │   ├── base.py                     # Abstract base storage
│   │   └── file_storage.py             # JSON file storage impl
│   │
│   ├── 📁 models/                      # Data models
│   │   ├── __init__.py
│   │   └── schemas.py                  # Data validation schemas
│   │
│   └── router.py                       # URL routing
│
├── 📁 data/                            # ── SHARED DATA ──
│   ├── database.json                   # App data storage
│   └── questions.json                  # Questions storage
│
├── 📁 docs/                            # ── DOCUMENTATION ──
│   └── architecture.md                 # Architecture documentation
│
├── 📁 scripts/                         # ── SCRIPTS ──
│   ├── start.sh                        # Start cả client + server
│   └── dev.sh                          # Development mode
│
├── .agents/                            # Agent workflows
│   └── workflows/
│
├── .gitignore                          # Git ignore rules
├── README.md                           # Project documentation
└── package.json                        # (Optional) npm scripts
```

---

## 📋 Hướng dẫn Migrate từng bước

### Bước 1: Tạo cấu trúc folder

```bash
# Tạo folder structure cho Client
mkdir -p client/src/{constants,state,services,ui,events,factories,utils,data}
mkdir -p client/styles
mkdir -p client/assets/{images,fonts}

# Tạo folder structure cho Server
mkdir -p server/{handlers,middleware,storage,models}
touch server/handlers/__init__.py
touch server/middleware/__init__.py
touch server/storage/__init__.py
touch server/models/__init__.py

# Tạo folder cho shared data và docs
mkdir -p data
mkdir -p docs
mkdir -p scripts
```

### Bước 2: Di chuyển và tách Client files

```bash
# 1. Move HTML
cp index.html client/index.html

# 2. Move và tách CSS
# Tách style.css thành nhiều file nhỏ:
#   - base.css (lines 1-48: Reset, variables, scrollbar)
#   - layout.css (lines 49-328: Sidebar, Main, Welcome)
#   - components.css (lines 329-588: Category header, Checklist, Buttons)
#   - modals.css (lines 589-735: Modal, Form)
#   - detail.css (lines 736+: Detail modal, Toast)
# Hoặc giữ 1 file nếu chưa muốn tách:
cp style.css client/styles/main.css

# 3. Move data files
cp data.js client/src/data/defaultData.js
cp details.js client/src/data/itemDetails.js

# 4. Move và tách app.js (xem chi tiết bên dưới)
```

### Bước 3: Tách `app.js` thành modules

#### `client/src/constants/config.js`
```javascript
export const API_BASE_URL = 'http://localhost:8080';
export const STORAGE_KEY = 'android_knowledge_v1';
export const MODAL_IDS = [
  'modal-item', 'modal-note', 'modal-category',
  'modal-confirm', 'modal-detail', 'modal-input'
];
```

#### `client/src/utils/helpers.js`
```javascript
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}

export function escHtml(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

export const $ = (id) => document.getElementById(id);
```

#### `client/src/services/api.js`
```javascript
import { API_BASE_URL } from '../constants/config.js';

export async function fetchData() {
  const res = await fetch(`${API_BASE_URL}/api/data`);
  if (!res.ok) throw new Error('Failed to fetch data');
  return res.json();
}

export async function saveData(categories) {
  return fetch(`${API_BASE_URL}/api/data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categories),
  });
}

export async function fetchQuestions() {
  const res = await fetch(`${API_BASE_URL}/api/questions`);
  if (!res.ok) throw new Error('Failed to fetch questions');
  return res.json();
}

export async function saveQuestions(questionsData) {
  return fetch(`${API_BASE_URL}/api/questions`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(questionsData),
  });
}
```

#### `client/src/state/store.js`
```javascript
import { STORAGE_KEY } from '../constants/config.js';
import * as api from '../services/api.js';
import { eventBus } from '../events/eventBus.js';

const state = {
  categories: [],
  activeCatId: null,
};

export function getState() { return state; }
export function getCategories() { return state.categories; }
export function getActiveCatId() { return state.activeCatId; }

export function setActiveCatId(catId) {
  state.activeCatId = catId;
  eventBus.emit('categoryChanged', catId);
}

export async function loadState() { /* ... */ }
export function saveState() { /* ... */ }
export function toggleItem(catId, itemId) { /* ... */ }
// ... other state mutations
```

### Bước 4: Di chuyển và tách Server files

#### `server/config.py`
```python
import os

PORT = int(os.environ.get('PORT', 8080))
DATA_DIR = os.path.join(os.path.dirname(__file__), '..', 'data')
DATA_FILE = os.path.join(DATA_DIR, 'database.json')
QUESTIONS_FILE = os.path.join(DATA_DIR, 'questions.json')
CLIENT_DIR = os.path.join(os.path.dirname(__file__), '..', 'client')
```

#### `server/storage/base.py`
```python
from abc import ABC, abstractmethod
from typing import Any

class BaseStorage(ABC):
    @abstractmethod
    def read(self, filepath: str) -> Any:
        """Read data from storage"""
        ...

    @abstractmethod
    def write(self, filepath: str, data: Any) -> bool:
        """Write data to storage"""
        ...
```

#### `server/storage/file_storage.py`
```python
import json
import os
from .base import BaseStorage

class FileStorage(BaseStorage):
    def read(self, filepath: str):
        if not os.path.exists(filepath):
            return None
        with open(filepath, 'r', encoding='utf-8') as f:
            return json.load(f)

    def write(self, filepath: str, data) -> bool:
        with open(filepath, 'w', encoding='utf-8') as f:
            json.dump(data, f, ensure_ascii=False, indent=2)
        return True
```

#### `server/middleware/cors.py`
```python
class CORSMixin:
    """Mixin to add CORS headers to responses"""

    def add_cors_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
```

#### `server/handlers/data_handler.py`
```python
import json
from server.config import DATA_FILE

def handle_get_data(handler, storage):
    """Handle GET /api/data"""
    data = storage.read(DATA_FILE)
    if data is None:
        data = []
    handler.send_response(200)
    handler.send_header('Content-type', 'application/json; charset=utf-8')
    handler.end_headers()
    handler.wfile.write(json.dumps(data, ensure_ascii=False).encode('utf-8'))

def handle_post_data(handler, storage):
    """Handle POST /api/data"""
    content_length = int(handler.headers['Content-Length'])
    post_data = handler.rfile.read(content_length)
    try:
        json_data = json.loads(post_data.decode('utf-8'))
        storage.write(DATA_FILE, json_data)
        handler.send_response(200)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "success"}).encode('utf-8'))
    except Exception as e:
        handler.send_response(400)
        handler.send_header('Content-type', 'application/json; charset=utf-8')
        handler.end_headers()
        handler.wfile.write(json.dumps({"status": "error", "message": str(e)}).encode('utf-8'))
```

#### `server/main.py`
```python
import http.server
import socketserver
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(__file__)))

from server.config import PORT, CLIENT_DIR
from server.middleware.cors import CORSMixin
from server.storage.file_storage import FileStorage
from server.handlers.data_handler import handle_get_data, handle_post_data
from server.handlers.questions_handler import handle_get_questions, handle_post_questions

storage = FileStorage()

class AppHandler(CORSMixin, http.server.SimpleHTTPRequestHandler):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, directory=CLIENT_DIR, **kwargs)

    def end_headers(self):
        self.add_cors_headers()
        super().end_headers()

    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()

    def do_GET(self):
        if self.path == '/api/data':
            handle_get_data(self, storage)
        elif self.path == '/api/questions':
            handle_get_questions(self, storage)
        else:
            super().do_GET()

    def do_POST(self):
        if self.path == '/api/data':
            handle_post_data(self, storage)
        elif self.path == '/api/questions':
            handle_post_questions(self, storage)
        else:
            self.send_response(404)
            self.end_headers()

if __name__ == '__main__':
    with socketserver.TCPServer(("", PORT), AppHandler) as httpd:
        print(f"🚀 Server running on http://localhost:{PORT}")
        print(f"📁 Serving client from: {CLIENT_DIR}")
        httpd.serve_forever()
```

### Bước 5: Cập nhật `client/index.html`

```html
<!-- Thay đổi script tags để dùng ES Modules -->
<link rel="stylesheet" href="styles/main.css" />

<!-- ... -->

<script type="module" src="src/data/defaultData.js"></script>
<script type="module" src="src/data/itemDetails.js"></script>
<script type="module" src="src/app.js"></script>
```

### Bước 6: Tạo scripts khởi động

#### `scripts/start.sh`
```bash
#!/bin/bash
echo "🚀 Starting AndroidKnowledge..."
echo "📡 Starting Python server on port 8080..."
cd "$(dirname "$0")/.."
python -m server.main
```

#### `scripts/dev.sh`
```bash
#!/bin/bash
echo "🔧 Development mode..."
cd "$(dirname "$0")/.."

# Start server with auto-reload (if using watchdog)
python -m server.main &
SERVER_PID=$!

echo "📡 Server PID: $SERVER_PID"
echo "🌐 Open http://localhost:8080 in your browser"
echo "Press Ctrl+C to stop"

trap "kill $SERVER_PID 2>/dev/null; exit" SIGINT SIGTERM
wait $SERVER_PID
```

### Bước 7: Tạo `.gitignore`

```gitignore
# Python
__pycache__/
*.pyc
*.pyo
.venv/
venv/

# IDE
.idea/
.vscode/
*.swp

# OS
.DS_Store
Thumbs.db

# Data (optional - nếu muốn giữ data riêng)
# data/database.json
# data/questions.json
```

---

## 🗺️ Dependency Flow (sau migrate)

```
┌──────────────┐     HTTP      ┌──────────────┐
│    CLIENT     │ ◀──────────▶ │    SERVER     │
│              │               │              │
│  index.html  │               │  main.py     │
│  ├── src/    │               │  ├── handlers│
│  │   ├── app│───────────────▶│  │   ├── data│
│  │   ├── api│  fetch()       │  │   └── ques│
│  │   ├── ui │               │  ├── storage  │
│  │   └──store               │  │   └── file │
│  └── styles/ │               │  └── config   │
└──────────────┘               └──────┬───────┘
                                      │
                                      ▼
                               ┌──────────────┐
                               │    DATA/     │
                               │  database.json│
                               │  questions.json│
                               └──────────────┘
```

---

## ⚠️ Lưu ý quan trọng

1. **Migrate từng bước** — Không refactor tất cả cùng lúc. Di chuyển file → test → tiếp.
2. **Git commit sau mỗi bước** — Dễ rollback nếu có lỗi.
3. **Update paths** — Sau khi di chuyển file, cần cập nhật tất cả import/reference paths.
4. **Server serve client** — Server cần config `directory=CLIENT_DIR` để serve static files.
5. **ES Modules** — Khi chuyển sang ES Modules, cần `type="module"` trong script tag và phải chạy qua HTTP server (không mở trực tiếp file HTML).
6. **Data folder** — `data/` nằm ngoài cả client và server, cả 2 đều access được.

---

## 🏃 Quick Start (sau khi migrate)

```bash
# Từ thư mục gốc AndroidKnowledge/
python -m server.main

# Hoặc dùng script
bash scripts/start.sh

# Mở trình duyệt
open http://localhost:8080
```
