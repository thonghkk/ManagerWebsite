# 📱 Android Knowledge Hub

Một ứng dụng web giúp bạn theo dõi và quản lý checklist kiến thức Android phát triển từ cơ bản đến nâng cao.

## ✨ Tính năng

- ✅ **Checklist theo danh mục** – Đánh dấu hoàn thành từng mục kiến thức
- 📝 **Ghi chú** – Thêm ghi chú chi tiết, ví dụ, link tham khảo cho mỗi mục
- ➕ **Thêm / Sửa / Xoá** item và danh mục tuỳ ý
- 📊 **Tiến độ tổng quan** – Thanh progress bar và thống kê Done / Total
- 💾 **Lưu trữ local** – Dữ liệu được lưu vào `localStorage`, không mất khi reload
- 📱 **Responsive** – Sidebar collapsible, hỗ trợ mobile

## 🗂️ Danh mục kiến thức

| # | Danh mục | Số mục |
|---|----------|--------|
| 1 | 🎯 Kotlin | 13 |
| 2 | 🏛️ Android Fundamentals | 10 |
| 3 | 🎨 UI (XML) | 8 |
| 4 | 💠 UI (Compose) | 7 |
| 5 | 🏗️ Architecture | 9 |
| 6 | 🚀 Jetpack | 9 |
| 7 | ⚙️ Concurrency | 7 |
| 8 | 🌐 Networking | 7 |
| 9 | 💾 Storage | 6 |
| 10 | ⚡ Performance | 7 |
| 11 | 🧪 Testing | 6 |
| 12 | 📦 Build & Release | 6 |
| 13 | 🏆 Advanced / Senior | 7 |

**Tổng cộng: 102 mục kiến thức**

## 🛠️ Công nghệ sử dụng

- **HTML5** – Cấu trúc trang
- **CSS3** – Styling với dark mode, glassmorphism, animations
- **JavaScript (Vanilla)** – Logic xử lý, không dùng framework
- **Google Fonts** – Inter, Fira Code
- **localStorage** – Lưu trữ dữ liệu phía client

## 📁 Cấu trúc project

```
AndroidKnowledge/
├── index.html   # Giao diện chính
├── style.css    # Toàn bộ styling
├── app.js       # Logic ứng dụng (render, CRUD, modal, storage)
├── data.js      # Dữ liệu mặc định (DEFAULT_DATA)
└── README.md    # File này
```

## 🚀 Cách chạy

Mở trực tiếp file `index.html` trong trình duyệt — không cần server, không cần cài đặt.

```bash
open index.html
```

## 📖 Hướng dẫn sử dụng

1. **Chọn danh mục** từ sidebar bên trái
2. **Tick ✓** vào checkbox để đánh dấu hoàn thành một mục
3. **Click vào tên mục** để xem / thêm ghi chú
4. **Click ✏️** để sửa, **🗑️** để xoá một mục
5. **"+ Add Item"** để thêm mục mới vào danh mục hiện tại
6. **"+ Add Category"** để tạo danh mục tuỳ chỉnh mới
