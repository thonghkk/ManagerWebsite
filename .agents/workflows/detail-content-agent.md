---
description: Agent soạn nội dung chi tiết cho từng mục trong trang detail của AndroidKnowledge
---

# 📝 Agent Soạn Nội Dung Detail Page

Agent này hướng dẫn quy trình cộng tác giữa bạn và AI để soạn thảo nội dung cho từng mục kiến thức trong `ITEM_DETAILS` (`client/src/data/itemDetails.js`).

---

## 🗺️ Cấu trúc ITEM_DETAILS

Mỗi mục trong `ITEM_DETAILS` có key dạng `k1`, `f1`, `dp1`... và format:

```js
"<id>": {
  title: "Tên mục",
  summary: "Tóm tắt 1-2 câu ngắn gọn.",
  points: [
    "Điểm quan trọng 1",
    "Điểm quan trọng 2",
    ...
  ],
  code: `// Code mẫu Kotlin (nếu có)`,
  interviewTips: [
    "Câu hỏi interview 1?",
    "Câu hỏi interview 2?",
  ]
}
```

### Bảng ID theo nhóm

| Prefix | Nhóm |
|--------|------|
| `k1`–`k13` | Kotlin |
| `f1`–`f10` | Android Fundamentals |
| `ux1`–`ux8` | UI XML |
| `uc1`–`uc7` | UI Compose |
| `a1`–`a9` | Architecture |
| `j1`–`j9` | Jetpack |
| `c1`–`c7` | Concurrency |
| `n1`–`n7` | Networking |
| `s1`–`s6` | Storage |
| `p1`–`p7` | Performance |
| `t1`–`t6` | Testing |
| `b1`–`b6` | Build & Release |
| `ad1`–`ad7` | Advanced |
| `dp1`–`dp19` | Design Patterns |

---

## 🔄 Quy trình làm việc

### Bước 1 — Chọn mục cần soạn

Bạn nói (ví dụ):
> "Soạn mục k1 – Kotlin Syntax cơ bản"

AI sẽ:
- Xác nhận key và title của mục đó trong `ITEM_DETAILS`
- Hiển thị nội dung hiện tại (nếu có) để làm baseline
- Đặt các câu hỏi để hiểu độ sâu bạn muốn

### Bước 2 — Thảo luận và phân tích nội dung

AI sẽ chủ động phân tích mục được chọn theo framework:

1. **Summary** – Bản tóm tắt 1-2 câu rõ ràng, ngắn gọn
2. **Points** – 3-6 bullet points quan trọng nhất cần nhớ
3. **Code** – Ví dụ code Kotlin minh họa (nếu phù hợp)
4. **Interview Tips** – 2-4 câu hỏi có thể bị hỏi ở phỏng vấn

Bạn bổ sung, sửa, hoặc phản hồi. AI tiếp tục cải thiện.

### Bước 3 — Xuất ra page

Khi bạn hài lòng với nội dung, ra lệnh:
> **"xuất ra page"**

AI sẽ ghi nội dung vào key tương ứng trong `client/src/data/itemDetails.js`.

---

## 🎯 Tiêu chí nội dung tốt

| Tiêu chí | Mô tả |
|----------|-------|
| **Ngắn gọn** | Summary ≤ 2 câu, mỗi point ≤ 15 từ |
| **Thực tiễn** | Code mẫu là code thật, có thể copy-run |
| **Phân tầng** | Points từ cơ bản → nâng cao |
| **Interview-ready** | Tips là câu hỏi hay gặp thực tế |
| **Tiếng Việt** | Summary + Points bằng tiếng Việt; code = Kotlin |

---

## ⚡ Lệnh nhanh

| Bạn nói | AI làm |
|---------|--------|
| `"Soạn mục <id>"` | Phân tích và soạn nội dung mục đó |
| `"Xem nội dung hiện tại của <id>"` | Hiển thị bản đang có trong `itemDetails.js` |
| `"Soạn thêm code cho mục <id>"` | Tập trung vào phần code sample |
| `"Thêm tips cho mục <id>"` | Bổ sung câu hỏi interview |
| `"xuất ra page"` | Ghi nội dung đã soạn vào `itemDetails.js` |
| `"Xem trang detail?id=<id>"` | Mở browser verify trang đó |

---

## 📌 Ví dụ phiên làm việc

```
Bạn:   Soạn mục k12 – Coroutines

AI:    Phân tích mục k12 – Coroutines...
       [Hiển thị nội dung hiện tại]
       [Đề xuất cải thiện summary, thêm code launch/async]

Bạn:   Hay đó, thêm phần structured concurrency vào points

AI:    [Cập nhật points]
       [Lúc này CHƯA ghi vào file]

Bạn:   xuất ra page

AI:    [Cập nhật itemDetails.js tại key k12]
       ✅ Đã xuất! Mở detail.html?id=k12 để xem.
```

---

## 🛠️ Cách AI xuất ra page

Khi nhận lệnh **"xuất ra page"**, AI sẽ chỉnh sửa đúng entry trong file `itemDetails.js`:

```
File: client/src/data/itemDetails.js
Key: <id tương ứng>
Xử lý: Thay thế hoặc tạo mới entry trong ITEM_DETAILS
```

> [!NOTE]
> Mỗi lần "xuất ra page" chỉ ghi MỘT mục duy nhất (mục đang được soạn). Các mục khác không bị ảnh hưởng.

---

## 🗂️ Thứ tự ưu tiên soạn

Gợi ý soạn theo thứ tự:

1. Các mục **chưa có nội dung** (chỉ có title ngắn, thiếu points/tips)
2. Các mục **hay được hỏi phỏng vấn** (Coroutines, MVVM, Clean Architecture)
3. Các mục **Design Patterns** (dp1–dp19) – cần code mẫu rõ ràng
4. Các mục **advanced** (ad1–ad7) – cần phân tích sâu

---

## 🔗 Files liên quan

- [`itemDetails.js`](file:///Users/thongnv/KMM/SickProject/AndroidKnowledge/client/src/data/itemDetails.js) — Data source chính
- [`detail.html`](file:///Users/thongnv/KMM/SickProject/AndroidKnowledge/client/detail.html) — Trang hiển thị
- [`detail.js`](file:///Users/thongnv/KMM/SickProject/AndroidKnowledge/client/src/detail.js) — Logic render
- [`detail.css`](file:///Users/thongnv/KMM/SickProject/AndroidKnowledge/client/styles/detail.css) — Style
