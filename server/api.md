# API Documentation

Tài liệu này liệt kê các REST API hiện đang được cung cấp bởi Python Backend Server để Client có thể gọi tới. 
Tất cả các API đều trả về cũng như yêu cầu dữ liệu ở định dạng `application/json`.

---

## 1. Data General (Danh mục & Checklist)

Được sử dụng cho các dữ liệu tổng quan, các danh mục và trạng thái check của từng bài. Dữ liệu được lưu tại `data/database.json`.

### `GET /api/data`
- **Mô tả:** Lấy toàn bộ danh sách các categories và checklist items của người dùng.
- **Response:** Mảng (Array) chứa các đối tượng Category. Nếu empty sẽ trả về mảng rỗng `[]`.
- **Ví dụ trả về:**
  ```json
  [
    {
      "id": "kotlin",
      "name": "Kotlin",
      "icon": "🎯",
      "items": [
        {
          "id": "k1",
          "name": "Syntax cơ bản",
          "done": false,
          "note": ""
        }
      ]
    }
  ]
  ```

### `POST /api/data`
- **Mô tả:** Lưu lại toàn bộ trạng thái dữ liệu categories và items.
- **Body Request:**
  Gửi lên nguyên block JSON của Mảng (Array) chứa các đối tượng Category. 
- **Response:**
  Trạng thái xử lý thành công.
  ```json
  { "status": "success" }
  ```

---

## 2. Questions (Câu hỏi Interview tự định nghĩa & Câu trả lời)

Được sử dụng riêng biệt để quản lý các custom tips/questions và answers do người dùng thêm vào trong từng check-item thay vì bện chặt vào file Data gốc. 
Dữ liệu được lưu tại `data/questions.json`.

### `GET /api/questions`
- **Mô tả:** Lấy từ điển (Dictionary/Object) chứa tất cả custom questions và answers theo dạng Map `itemId -> itemData`.
- **Response:** Đối tượng JSON, nếu trống trả về `{}`.
- **Ví dụ trả về:**
  ```json
  {
    "k1": {
      "catId": "kotlin",
      "itemName": "Syntax cơ bản",
      "customQuestions": ["In what situations should i use 'Lazy' ?"],
      "answers": {
        "Khác biệt giữa val và const val?": "Dùng Val ở ..."
      }
    }
  }
  ```

### `POST /api/questions`
- **Mô tả:** Lưu hoặc cập nhật lại toàn bộ bộ custom questions và answers.
- **Body Request:** Gửi lên một Object chứa mapping từ `itemId` sang các mảng questions và object answers tương ứng.
- **Response:**
  Trạng thái xử lý thành công.
  ```json
  { "status": "success" }
  ```
