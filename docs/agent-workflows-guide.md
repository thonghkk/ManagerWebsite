# 🤖 Agent Workflows Guide — AndroidKnowledge Project

## Tổng quan Project

**AndroidKnowledge** là ứng dụng web (HTML/CSS/JavaScript) kết hợp Python server, giúp quản lý danh sách kiến thức Android với các tính năng:
- Chọn và quản lý các danh mục kiến thức (13 categories)
- Thêm/sửa/xóa items, ghi chú, câu hỏi interview
- Lưu trữ dữ liệu qua Python server vào JSON files
- Giao diện dark mode hiện đại

### Tech Stack hiện tại
| Layer | Công nghệ |
|-------|-----------|
| Frontend | HTML5, Vanilla JavaScript, CSS3 |
| Backend | Python (http.server) |
| Storage | JSON files (database.json, questions.json) |
| Font | Inter (Google Fonts) |

---

# Agent 1: Clean Architecture & SOLID Guide

## Mục đích
Hướng dẫn cấu trúc project theo các nguyên tắc lập trình sạch: **Clean Architecture**, **SOLID**, và **Design Patterns**.

---

## 📐 SOLID Principles — Phân tích & Áp dụng

### S — Single Responsibility Principle (SRP)
> Mỗi file/module chỉ nên có **1 lý do để thay đổi**.

**Vấn đề hiện tại:**
- `app.js` (~678 dòng) chứa TẤT CẢ: State management, DOM rendering, Event handling, API calls, Utility functions trong 1 file.
- `server.py` xử lý cả CORS, routing, file I/O, response formatting trong 1 class duy nhất.

**Giải pháp — Client (JavaScript):**

| Module | File | Trách nhiệm |
|--------|------|-------------|
| State | `state/store.js` | Quản lý state duy nhất (Single Source of Truth) |
| API | `services/api.js` | Giao tiếp với server (fetch calls) |
| Sidebar | `ui/sidebar.js` | Render và xử lý sidebar |
| Checklist | `ui/checklist.js` | Render và xử lý checklist items |
| Modals | `ui/modals.js` | Tất cả modal logic |
| Toast | `ui/toast.js` | Toast notifications |
| Helpers | `utils/helpers.js` | Utility functions (escHtml, uid) |
| Events | `events/eventBus.js` | Event publish/subscribe system |

**Giải pháp — Server (Python):**

| Module | File | Trách nhiệm |
|--------|------|-------------|
| Data API | `handlers/data_handler.py` | Xử lý `/api/data` |
| Questions API | `handlers/questions_handler.py` | Xử lý `/api/questions` |
| CORS | `middleware/cors.py` | CORS middleware |
| Storage | `storage/file_storage.py` | Đọc/ghi file JSON |
| Config | `config.py` | Cấu hình (PORT, DATA_FILE, ...) |

### O — Open/Closed Principle (OCP)
> Module nên **mở cho việc mở rộng**, **đóng cho việc sửa đổi**.

**Áp dụng:**
- **Client:** Dùng **Event Bus pattern** — Thêm tính năng mới chỉ cần subscribe event, không sửa code cũ.
- **Server:** Dùng **Router pattern** — Thêm API endpoint mới chỉ cần tạo handler mới và đăng ký route.

**Ví dụ Event Bus:**
```javascript
class EventBus {
  constructor() { this.listeners = {}; }
  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }
  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data));
  }
}
export const eventBus = new EventBus();
```

**Ví dụ Router:**
```python
class Router:
    def __init__(self):
        self.routes = {'GET': {}, 'POST': {}}

    def get(self, path, handler):
        self.routes['GET'][path] = handler

    def post(self, path, handler):
        self.routes['POST'][path] = handler

    def resolve(self, method, path):
        return self.routes.get(method, {}).get(path)
```

### L — Liskov Substitution Principle (LSP)
> Các object con phải thay thế được object cha mà không phá vỡ logic.

**Áp dụng:** Tạo **Storage Interface** — có thể swap giữa `FileStorage` và `DatabaseStorage`:

```python
from abc import ABC, abstractmethod

class BaseStorage(ABC):
    @abstractmethod
    def read(self, key: str) -> dict: ...

    @abstractmethod
    def write(self, key: str, data: dict) -> bool: ...

class FileStorage(BaseStorage):
    def read(self, key): ...  # Đọc từ JSON file
    def write(self, key, data): ...  # Ghi vào JSON file

class DatabaseStorage(BaseStorage):  # Future
    def read(self, key): ...  # Đọc từ database
    def write(self, key, data): ...  # Ghi vào database
```

### I — Interface Segregation Principle (ISP)
> Client không nên bị buộc phụ thuộc vào interface mà nó không dùng.

**Áp dụng:**
- Module render KHÔNG cần biết về API calls
- Module API KHÔNG cần biết về DOM
- Module state KHÔNG phụ thuộc vào cả hai

### D — Dependency Inversion Principle (DIP)
> Module cấp cao không phụ thuộc module cấp thấp. Cả hai phụ thuộc abstraction.

**Áp dụng:**
- Client: `app.js` (high-level) KHÔNG gọi `fetch()` trực tiếp → gọi qua `api.js` (abstraction)
- Server: Handler KHÔNG gọi `open()` trực tiếp → gọi qua Storage interface

---

## 🏛️ Clean Architecture — 3 Layers

```
┌─────────────────────────────────────────────┐
│              PRESENTATION LAYER             │
│  (index.html, style.css, ui/*.js)           │
│  - DOM rendering                            │
│  - User event handling                      │
│  - Visual feedback (toast, modals)          │
├─────────────────────────────────────────────┤
│              APPLICATION LAYER              │
│  (state/store.js, events/eventBus.js)       │
│  - Business logic orchestration             │
│  - State management                         │
│  - CRUD operations trên categories/items    │
├─────────────────────────────────────────────┤
│              DATA ACCESS LAYER              │
│  (services/api.js, data.js, details.js)     │
│  - API communication                        │
│  - Default data definitions                 │
│  - Local storage fallback                   │
└─────────────────────────────────────────────┘
```

---

## 🔧 Design Patterns nên áp dụng

### 1. Observer Pattern (Event Bus)
- State thay đổi → Emit event → UI tự re-render
- Giảm coupling giữa state và UI modules

### 2. Module Pattern (ES Modules)
- Mỗi file export 1 API rõ ràng
- Import chỉ những gì cần thiết
- Tránh global variables

### 3. Repository Pattern (Server)
- Handler gọi Repository → Repository gọi Storage
- Dễ test, dễ swap implementation

### 4. Factory Pattern
- Tạo categories/items qua factory function
- Đảm bảo data object luôn có đủ fields

```javascript
export function createItem(name, note = '') {
  return {
    id: uid(),
    name,
    done: false,
    note,
    customQuestions: [],
    answers: {}
  };
}

export function createCategory(name, icon = '📦') {
  return {
    id: uid(),
    name,
    icon,
    items: []
  };
}
```

---

## 🚫 Anti-patterns cần tránh

| Anti-pattern | Hiện trạng | Giải pháp |
|-------------|-----------|-----------|
| God Object | `app.js` 678 dòng, chứa mọi thứ | Tách theo SRP thành 8+ modules |
| Global State | `state`, `pendingDelete`, `editingItem` là biến global | Encapsulate trong Store module |
| Magic Strings | `'modal-item'`, `'/api/data'` - hardcode khắp nơi | Dùng constants file |
| Hardcoded URLs | `http://localhost:8080` - hardcode trong code | Config file / env variable |
| No Error Boundaries | Chỉ console.error, không thông báo user | Toast + fallback + retry mechanism |
| Tight Coupling | DOM manipulation, State, API calls mixed cùng file | Tách layers + Event Bus |
| No Type Safety | Raw JS objects không có validation | JSDoc hoặc chuyển TypeScript |

---

## 📝 Naming Conventions

| Loại | Convention | Ví dụ |
|------|-----------|-------|
| JS Files | camelCase.js | `eventBus.js`, `modelFactory.js` |
| CSS Classes | kebab-case | `.nav-item-name`, `.check-item` |
| JS Functions | camelCase | `renderSidebar()`, `saveState()` |
| JS Classes | PascalCase | `EventBus`, `Store` |
| Constants | UPPER_SNAKE_CASE | `STORAGE_KEY`, `API_BASE_URL` |
| Python files | snake_case.py | `file_storage.py`, `data_handler.py` |
| Python classes | PascalCase | `FileStorage`, `CORSMixin` |
| Python functions | snake_case | `read_data()`, `handle_post()` |
| API endpoints | kebab-case | `/api/data`, `/api/questions` |

---

## ✅ Checklist Refactor (14 bước tuần tự)

1. Tạo cấu trúc folder (xem Agent 2)
2. Tách utility functions → `client/src/utils/helpers.js`
3. Tách API layer → `client/src/services/api.js`
4. Tách State management → `client/src/state/store.js`
5. Tách UI modules → `client/src/ui/*.js`
6. Tạo Event Bus → `client/src/events/eventBus.js`
7. Tạo Factory functions → `client/src/factories/`
8. Cập nhật `index.html` để dùng ES Modules (`type="module"`)
9. Tách server handlers → `server/handlers/`
10. Tạo Storage abstraction → `server/storage/`
11. Tạo Router → `server/router.py`
12. Thêm error handling thống nhất
13. Thêm JSDoc comments cho tất cả public functions
14. Viết unit tests cho state management và utility functions

---

# Agent 2: Tổ chức Folder Client/Server

## Mục đích
Hướng dẫn tách biệt frontend (Client) và backend (Server) trong project.

---

## 📊 Hiện trạng (TRƯỚC)

```
AndroidKnowledge/
├── app.js              ← Client: logic chính (678 dòng, monolith)  
├── data.js             ← Client: default data  
├── details.js          ← Client: item details (469 dòng)
├── index.html          ← Client: HTML (201 dòng)
├── style.css           ← Client: CSS (978 dòng)
├── server.py           ← Server: Python API (96 dòng)
├── database.json       ← Data: app storage
├── questions.json      ← Data: questions storage
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
│   │   │   ├── config.js               # API_BASE_URL, STORAGE_KEY
│   │   │   └── selectors.js            # DOM element IDs
│   │   │
│   │   ├── 📁 state/                   # State management
│   │   │   └── store.js                # State container + actions
│   │   │
│   │   ├── 📁 services/                # External communication
│   │   │   └── api.js                  # HTTP calls to server
│   │   │
│   │   ├── 📁 ui/                      # UI rendering modules
│   │   │   ├── sidebar.js              # Sidebar + navigation
│   │   │   ├── checklist.js            # Checklist items
│   │   │   ├── modals.js               # Modal dialogs
│   │   │   ├── toast.js                # Toast notification
│   │   │   └── detail.js               # Detail modal
│   │   │
│   │   ├── 📁 events/                  # Event system
│   │   │   └── eventBus.js             # Pub/Sub event bus
│   │   │
│   │   ├── 📁 factories/               # Object creation
│   │   │   └── modelFactory.js         # Create category/item
│   │   │
│   │   ├── 📁 utils/                   # Utility functions
│   │   │   └── helpers.js              # escHtml, uid
│   │   │
│   │   └── 📁 data/                    # Static/default data
│   │       ├── defaultData.js          # DEFAULT_DATA
│   │       └── itemDetails.js          # ITEM_DETAILS
│   │
│   ├── 📁 styles/                      # CSS files
│   │   ├── base.css                    # Reset, variables
│   │   ├── layout.css                  # Sidebar, main, topbar
│   │   ├── components.css              # Buttons, inputs
│   │   ├── modals.css                  # Modal styles
│   │   └── detail.css                  # Detail view
│   │
│   └── 📁 assets/                      # Static assets
│       └── 📁 images/
│
├── 📁 server/                          # ── BACKEND ──
│   ├── main.py                         # Entry point
│   ├── config.py                       # Configuration
│   │
│   ├── 📁 handlers/                    # Request handlers
│   │   ├── __init__.py
│   │   ├── data_handler.py             # /api/data
│   │   └── questions_handler.py        # /api/questions
│   │
│   ├── 📁 middleware/                  # Middleware
│   │   ├── __init__.py
│   │   └── cors.py                     # CORS headers
│   │
│   ├── 📁 storage/                     # Data persistence
│   │   ├── __init__.py
│   │   ├── base.py                     # Abstract base
│   │   └── file_storage.py             # JSON file impl
│   │
│   └── router.py                       # URL routing
│
├── 📁 data/                            # ── SHARED DATA ──
│   ├── database.json                   # App data
│   └── questions.json                  # Questions
│
├── 📁 docs/                            # ── DOCUMENTATION ──
│   └── agent-workflows-guide.md        # This file
│
├── 📁 scripts/                         # ── SCRIPTS ──
│   ├── start.sh                        # Start server
│   └── dev.sh                          # Dev mode
│
├── .gitignore
└── README.md
```

---

## 📋 Hướng dẫn Migrate (7 bước)

### Bước 1: Tạo cấu trúc folder
```bash
mkdir -p client/src/{constants,state,services,ui,events,factories,utils,data}
mkdir -p client/styles
mkdir -p client/assets/images
mkdir -p server/{handlers,middleware,storage,models}
mkdir -p data docs scripts
```

### Bước 2: Di chuyển Client files
```bash
cp index.html client/index.html
cp style.css client/styles/main.css
cp data.js client/src/data/defaultData.js
cp details.js client/src/data/itemDetails.js
```

### Bước 3: Tách `app.js` thành modules

**`client/src/constants/config.js`:**
```javascript
export const API_BASE_URL = 'http://localhost:8080';
export const STORAGE_KEY = 'android_knowledge_v1';
```

**`client/src/utils/helpers.js`:**
```javascript
export function uid() {
  return Date.now().toString(36) + Math.random().toString(36).slice(2, 7);
}
export function escHtml(s) {
  return String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;')
    .replace(/>/g,'&gt;').replace(/"/g,'&quot;');
}
export const $ = (id) => document.getElementById(id);
```

**`client/src/services/api.js`:**
```javascript
import { API_BASE_URL } from '../constants/config.js';

export async function fetchData() {
  const res = await fetch(`${API_BASE_URL}/api/data`);
  return res.json();
}
export async function saveData(categories) {
  return fetch(`${API_BASE_URL}/api/data`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(categories),
  });
}
```

### Bước 4: Di chuyển Server files
- Tách `server.py` → `server/main.py`, `server/config.py`, `server/handlers/`, `server/storage/`, `server/middleware/`

### Bước 5: Di chuyển Data files
```bash
cp database.json data/database.json
cp questions.json data/questions.json
```

### Bước 6: Cập nhật `client/index.html`
```html
<link rel="stylesheet" href="styles/main.css" />
<script type="module" src="src/app.js"></script>
```

### Bước 7: Tạo scripts khởi động
```bash
# scripts/start.sh
python -m server.main
```

---

## 🗺️ Dependency Flow

```
┌──────────────┐     HTTP      ┌──────────────┐
│    CLIENT     │ ◀──────────▶ │    SERVER     │
│              │               │              │
│  index.html  │               │  main.py     │
│  ├── src/    │  fetch()      │  ├── handlers│
│  │   ├── api│───────────────▶│  ├── storage │
│  │   ├── ui │               │  └── config   │
│  │   └──store│               │              │
│  └── styles/ │               └──────┬───────┘
└──────────────┘                      │
                                      ▼
                               ┌──────────────┐
                               │    DATA/     │
                               │ database.json│
                               │ questions.json│
                               └──────────────┘
```

---

## 🔄 Workflow thêm tính năng mới

1. Xác định feature thuộc layer nào (Presentation / Application / Data)
2. Tạo file mới trong folder tương ứng
3. Define interface/contract (nếu cần)
4. Implement logic
5. Wire vào Event Bus hoặc Router
6. Update UI nếu cần
7. Viết test
8. Review: feature mới có vi phạm SOLID không?

---

## ⚠️ Lưu ý quan trọng

1. **Migrate từng bước** — Không refactor tất cả cùng lúc
2. **Git commit sau mỗi bước** — Dễ rollback nếu lỗi
3. **Update paths** — Sau khi di chuyển, cập nhật import/reference paths
4. **ES Modules** — Cần `type="module"` trong script tag, phải chạy qua HTTP server
5. **Data folder** — Nằm ngoài cả client và server, cả 2 đều access được

---

## 🏃 Quick Start (sau migrate)

```bash
cd AndroidKnowledge
python -m server.main
# Mở http://localhost:8080
```
