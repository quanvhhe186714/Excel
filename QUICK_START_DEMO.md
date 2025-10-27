# 🚀 Quick Start - Demo với Gemini API

## ⚡ Chạy ngay để demo cho khách hàng

### 1. Install dependencies (nếu chưa có)
```bash
npm install
```

### 2. Chạy app
```bash
npm start
```

App sẽ mở tại: http://localhost:3000

### 3. Test các tính năng

#### ✨ Formula Generator
1. Scroll đến phần "AI Formula Generator"
2. Nhập prompt như: "Tính trung bình cột A nếu cột B lớn hơn 100"
3. Click "Tạo công thức"
4. Chờ vài giây → Nhận công thức + giải thích

#### 📋 Step by Step Guide
1. Scroll đến phần "Hướng Dẫn Step by Step"
2. Nhập task như: "Tạo biểu đồ tròn từ dữ liệu doanh thu"
3. Click "Tạo hướng dẫn"
4. Nhận hướng dẫn chi tiết từng bước

## ✅ Đã tích hợp

- ✅ Gemini 1.5 Flash API
- ✅ JSON structured output
- ✅ Error handling với fallback
- ✅ Loading states
- ✅ Copy to clipboard
- ✅ Responsive design

## ⚠️ Lưu ý cho Demo

1. **API Key đang để trong code** (file: `src/services/geminiService.ts`)
   - Chỉ dùng cho demo
   - Hủy key sau khi demo xong
   
2. **Rate limit**: 15 requests/phút (free tier)
   - Đủ cho demo
   - Nếu quá nhiều người test cùng lúc → có thể bị limit

3. **Response time**: 2-5 giây mỗi request
   - Gemini API cần thời gian xử lý
   - Có loading indicator

## 🎯 Demo Script gợi ý

### Với Khách hàng:

**1. Giới thiệu:**
"Đây là tool AI giúp tạo công thức Excel và hướng dẫn chi tiết. Chúng ta có 2 tính năng chính..."

**2. Demo Formula Generator:**
- "Giả sử bạn muốn tính tổng doanh thu nhưng không nhớ công thức..."
- Nhập: "Tính tổng cột D từ dòng 2 đến 100 nếu cột C là Hoàn thành"
- Show kết quả: `=SUMIF(C2:C100,"Hoàn thành",D2:D100)`
- Click "Sao chép" → paste vào Excel

**3. Demo Step by Step:**
- "Nếu bạn muốn học cách tạo Pivot Table..."
- Nhập: "Tạo pivot table để phân tích doanh thu theo sản phẩm"
- Show từng bước chi tiết
- Highlight: Tips và Warnings

**4. Kết:**
"Tool này giúp tiết kiệm thời gian, đặc biệt với người mới học Excel..."

## 🔧 Nếu có lỗi

### Error: "Không thể tạo công thức"
- **Nguyên nhân**: API rate limit hoặc network issue
- **Giải pháp**: Chờ 1 phút rồi thử lại

### Error: CORS
- **Nguyên nhân**: Browser block API call
- **Giải pháp**: Dùng Chrome, tắt ad-blockers

### Fallback data
- Nếu API fail, app tự động hiển thị data demo
- User vẫn thấy được UI/UX

## 📊 Show Points cho Demo

### Điểm mạnh để nhấn mạnh:

1. **AI thông minh**
   - Hiểu tiếng Việt
   - Generate công thức chính xác
   - Giải thích chi tiết

2. **UI/UX đẹp**
   - Modern design
   - Smooth animations
   - Responsive mobile

3. **Practical**
   - Copy công thức 1 click
   - Step-by-step dễ follow
   - Tips và warnings hữu ích

4. **Fast**
   - Response trong 2-5s
   - No login required (cho demo)

## 💼 Chuyển sang Production

Sau khi demo OK, cần:

1. **Setup backend API** (xem file `GEMINI_API_IMPLEMENTATION.md`)
2. **Move API key ra khỏi frontend**
3. **Add authentication**
4. **Setup monitoring**
5. **Deploy lên server**

Chi tiết xem: `GEMINI_API_IMPLEMENTATION.md`

---

**Happy Demoing! 🎉**

