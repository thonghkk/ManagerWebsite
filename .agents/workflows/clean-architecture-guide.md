---
description: Hướng dẫn cấu trúc project theo Clean Architecture, SOLID và các best practices lập trình
---

# 🏗️ Clean Architecture & SOLID Guide cho AndroidKnowledge

Agent này hướng dẫn cấu trúc project web (HTML/CSS/JS + Python Server) theo các nguyên tắc lập trình sạch.

---

## 📐 Nguyên tắc SOLID áp dụng cho Web Project

### S — Single Responsibility Principle (SRP)
> Mỗi file/module chỉ nên có **1 lý do để thay đổi**.

**Hiện tại vi phạm:**
- `app.js` (~678 dòng) đang chứa: State management, DOM rendering, Event handling, API calls, Utility functions → TẤT CẢ trong 1 file.
- `server.py` xử lý cả CORS, routing, file I/O, response formatting trong 1 class.

**Cách sửa — Client (JavaScript):**
1. **`state/store.js`** — Quản lý state duy nhất (Single Source of Truth)
2. **`services/api.js`** — Giao tiếp với server (fetch calls)
3. **`ui/sidebar.js`** — Render và xử lý sidebar
4. **`ui/checklist.js`** — Render và xử lý checklist items
5. **`ui/modals.js`** — Tất cả modal logic
6. **`ui/toast.js`** — Toast notifications
7. **`utils/helpers.js`** — Utility functions (escHtml, uid)
8. **`events/eventBus.js`** — Hệ thống event publish/subscribe

**Cách sửa — Server (Python):**
1. **`handlers/data_handler.py`** — Xử lý `/api/data`
2. **`handlers/questions_handler.py`** — Xử lý `/api/questions`
3. **`middleware/cors.py`** — CORS middleware
4. **`storage/file_storage.py`** — Đọc/ghi file JSON
5. **`config.py`** — Cấu hình (PORT, DATA_FILE, ...)

### O — Open/Closed Principle (OCP)
> Module nên **mở cho việc mở rộng**, **đóng cho việc sửa đổi**.

**Áp dụng:**
- Dùng **Event Bus pattern** ở client: thêm tính năng mới chỉ cần subscribe event, không sửa code cũ.
- Server dùng **Router pattern**: thêm API endpoint mới chỉ cần tạo handler mới và đăng ký route.

```javascript
// Ví dụ Event Bus:
// eventBus.js
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

```python
# Ví dụ Router pattern (server):
# router.py
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

**Áp dụng:**
- Tạo **Storage Interface** ở server — có thể swap giữa `FileStorage` và `DatabaseStorage` mà không ảnh hưởng handler:
```python
# storage/base.py
from abc import ABC, abstractmethod

class BaseStorage(ABC):
    @abstractmethod
    def read(self, key: str) -> dict: ...

    @abstractmethod
    def write(self, key: str, data: dict) -> bool: ...

# storage/file_storage.py
class FileStorage(BaseStorage):
    def read(self, key): ...
    def write(self, key, data): ...

# storage/db_storage.py (future)
class DatabaseStorage(BaseStorage):
    def read(self, key): ...
    def write(self, key, data): ...
```

### I — Interface Segregation Principle (ISP)
> Client không nên bị buộc phụ thuộc vào interface mà nó không dùng.

**Áp dụng:**
- Tách các "module" JS thành các API nhỏ gọn:
  - Module render KHÔNG cần biết về API calls
  - Module API KHÔNG cần biết về DOM
  - Module state KHÔNG phụ thuộc vào cả hai

### D — Dependency Inversion Principle (DIP)
> Module cấp cao không phụ thuộc module cấp thấp. Cả hai phụ thuộc abstraction.

**Áp dụng:**
- Client: `app.js` (high-level) không gọi `fetch()` trực tiếp → gọi qua `api.js` (abstraction)
- Server: Handler không gọi `open()` trực tiếp → gọi qua Storage interface

---

## 🏛️ Clean Architecture Layers cho Web Project

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

## 🔧 Các Design Patterns nên áp dụng

### 1. Observer Pattern (Event Bus)
- State thay đổi → Emit event → UI tự re-render
- Giảm coupling giữa state và UI

### 2. Module Pattern (ES Modules)
- Mỗi file export 1 API rõ ràng
- Import chỉ những gì cần thiết
- Tránh global variables

### 3. Repository Pattern (Server)
- Handler gọi Repository
- Repository gọi Storage
- Dễ test và swap implementation

### 4. Factory Pattern
- Tạo categories/items qua factory function
- Đảm bảo data object luôn có đủ fields

```javascript
// factories/itemFactory.js
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

## ✅ Checklist áp dụng (từng bước)

Khi refactor project, hãy tuần tự thực hiện:

1. [ ] **Tạo cấu trúc folder** (xem agent `/organize-folders`)
2. [ ] **Tách utility functions** → `client/src/utils/helpers.js`
3. [ ] **Tách API layer** → `client/src/services/api.js`
4. [ ] **Tách State management** → `client/src/state/store.js`
5. [ ] **Tách UI modules** → `client/src/ui/*.js`
6. [ ] **Tạo Event Bus** → `client/src/events/eventBus.js`
7. [ ] **Tạo Factory functions** → `client/src/factories/`
8. [ ] **Cập nhật `index.html`** để dùng ES Modules (`type="module"`)
9. [ ] **Tách server handlers** → `server/handlers/`
10. [ ] **Tạo Storage abstraction** → `server/storage/`
11. [ ] **Tạo Router** → `server/router.py`
12. [ ] **Thêm error handling** thống nhất (try/catch + error boundary)
13. [ ] **Thêm JSDoc comments** cho tất cả public functions
14. [ ] **Viết unit tests** cho state management và utility functions

---

## 🚫 Anti-patterns cần tránh

| Anti-pattern            | Hiện trạng                     | Giải pháp                          |
|------------------------|--------------------------------|-------------------------------------|
| God Object             | `app.js` 678 dòng             | Tách theo SRP                      |
| Global State           | `state`, `pendingDelete`, ... | Encapsulate trong Store module     |
| Magic Strings          | `'modal-item'`, `'/api/data'` | Dùng constants file                |
| Hardcoded URLs         | `http://localhost:8080`       | Config file / env variable         |
| No Error Boundaries    | Chỉ console.error             | Toast + fallback + retry           |
| Tight Coupling         | DOM ↔ State ↔ API mixed      | Tách layers + Event Bus            |
| No Type Safety         | Raw JS objects                | JSDoc hoặc chuyển sang TypeScript  |

---

## 📝 Naming Conventions

| Loại                | Convention           | Ví dụ                        |
|---------------------|---------------------|-------------------------------|
| Files               | camelCase.js         | `eventBus.js`                |
| CSS Classes         | kebab-case           | `.nav-item-name`             |
| JS Functions        | camelCase            | `renderSidebar()`            |
| JS Classes          | PascalCase           | `EventBus`                   |
| Constants           | UPPER_SNAKE_CASE     | `STORAGE_KEY`                |
| Python files        | snake_case.py        | `file_storage.py`            |
| Python classes      | PascalCase           | `FileStorage`                |
| Python functions    | snake_case           | `read_data()`                |
| API endpoints       | kebab-case           | `/api/data`, `/api/questions`|
| Folder names        | kebab-case or snake  | `src/`, `handlers/`          |

---

## 🔄 Workflow khi thêm tính năng mới

```
1. Xác định feature thuộc layer nào (Presentation / Application / Data)
2. Tạo file mới trong folder tương ứng
3. Define interface/contract (nếu cần)
4. Implement logic
5. Wire vào Event Bus hoặc Router
6. Update UI nếu cần
7. Viết test
8. Review: feature mới có vi phạm SOLID không?
```
