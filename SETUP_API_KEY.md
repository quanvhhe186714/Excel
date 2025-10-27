# 🔐 Setup API Key - BẮT BUỘC ĐỌC!

## ⚠️ VẤN ĐỀ

API key đang hardcode trong code → **NGUY HIỂM** khi push lên Git!

**ĐÃ FIX:** API key giờ đọc từ file `.env.local` (không commit lên Git)

---

## 🛠️ SETUP (BẮT BUỘC)

### Bước 1: Tạo file `.env.local`

Tạo file mới tên `.env.local` ở thư mục gốc project (cùng cấp với `package.json`):

```bash
# Tạo file .env.local
touch .env.local
```

Hoặc tạo thủ công trong VS Code: **File > New File** → Lưu thành `.env.local`

### Bước 2: Thêm API key vào `.env.local`

Copy nội dung sau vào file `.env.local`:

```env
# API Keys - KHÔNG COMMIT FILE NÀY LÊN GIT!
REACT_APP_GEMINI_API_KEY=AIzaSyB8GiRyoOAe-lCkxr_eqCjSMfYl3BgeeIM

# ⚠️ WARNING: For DEMO only!
# Production: Move to backend API
```

**Thay thế** `AIzaSyB8GiRyoOAe-lCkxr_eqCjSMfYl3BgeeIM` bằng API key của bạn!

### Bước 3: Verify `.gitignore`

Đảm bảo `.gitignore` đã có:

```gitignore
# Environment variables - KHÔNG COMMIT!
.env
.env.local
.env.development.local
.env.test.local
.env.production.local

# API Keys
*.key
.api-keys
```

✅ **ĐÃ CÓ TRONG .gitignore RỒI!**

### Bước 4: Restart development server

```bash
# Stop server (Ctrl+C)
# Start lại
npm start
```

**Lý do:** React chỉ đọc environment variables khi start, không tự động reload!

---

## ✅ KIỂM TRA

### Test 1: Check console

Mở DevTools Console, **KHÔNG** thấy message:
```
❌ GEMINI_API_KEY not found! Check .env.local file
```

### Test 2: Thử tạo công thức

Vào trang, nhập "Tính tổng A1 đến A10" → Phải work!

### Test 3: Check Git status

```bash
git status
```

**KHÔNG ĐƯỢC** thấy `.env.local` trong danh sách files to commit!

Nếu thấy → Chạy ngay:
```bash
git rm --cached .env.local
```

---

## 🚨 BẢO MẬT

### ✅ AN TOÀN (Sau khi setup):

```
✅ .env.local          → Có API key, KHÔNG commit
✅ .gitignore          → Đã ignore .env.local
✅ geminiService.ts    → Đọc từ process.env
✅ Git                 → Không track .env.local
```

### ❌ NGUY HIỂM (Trước khi setup):

```
❌ geminiService.ts    → API key hardcode
❌ Git commit          → Lộ API key public
❌ Anyone              → Có thể lấy key và abuse
```

---

## 📁 FILE STRUCTURE

```
Excel/
├── .env.local              ← ⚠️ KHÔNG COMMIT! (API key ở đây)
├── .env.example            ← ✅ Commit (template không có key thật)
├── .gitignore              ← ✅ Commit (ignore .env.local)
├── src/
│   └── services/
│       └── geminiService.ts ← ✅ Commit (đọc từ process.env)
└── package.json
```

---

## 🔄 CÁCH THAY ĐỔI API KEY

### Nếu cần đổi API key:

1. Mở file `.env.local`
2. Sửa dòng:
   ```env
   REACT_APP_GEMINI_API_KEY=api_key_mới_của_bạn
   ```
3. Save file
4. Restart dev server (Ctrl+C → `npm start`)

**KHÔNG** sửa trong `geminiService.ts` nữa!

---

## 🎯 KHI DEPLOY PRODUCTION

### Vercel / Netlify:

1. Vào **Settings → Environment Variables**
2. Thêm:
   ```
   Key: REACT_APP_GEMINI_API_KEY
   Value: your_actual_api_key
   ```
3. Redeploy

### Backend API (Recommended):

1. Tạo backend route `/api/generate`
2. API key ở backend (Node.js env vars)
3. Frontend gọi backend thay vì Gemini trực tiếp
4. Secure hơn nhiều!

---

## 🐛 TROUBLESHOOTING

### Lỗi: "GEMINI_API_KEY not found"

**Fix:**
```bash
1. Check file .env.local có tồn tại không
2. Check tên biến: REACT_APP_GEMINI_API_KEY (phải có prefix REACT_APP_)
3. Restart dev server
```

### Lỗi: API key vẫn undefined

**Fix:**
```bash
1. Stop server (Ctrl+C)
2. Clear cache: npm start -- --reset-cache
3. Hoặc: rm -rf node_modules/.cache
4. npm start lại
```

### Lỗi: .env.local vẫn xuất hiện trong Git

**Fix:**
```bash
git rm --cached .env.local
git commit -m "Remove .env.local from tracking"
```

---

## 📋 CHECKLIST TRƯỚC KHI COMMIT

- [ ] File `.env.local` đã tạo với API key
- [ ] API key KHÔNG có trong `geminiService.ts`
- [ ] `.gitignore` đã ignore `.env.local`
- [ ] `git status` KHÔNG show `.env.local`
- [ ] Test app hoạt động với env variable
- [ ] Console KHÔNG có error "API key not found"

---

## ✅ HOÀN TẤT

Sau khi làm theo hướng dẫn:

```bash
# Verify
git status
# → KHÔNG thấy .env.local

# Safe to commit
git add .
git commit -m "Secure: Move API key to environment variables"
git push
```

**API key giờ an toàn! 🔒**

---

## 🎓 TÀI LIỆU THÊM

- [React Environment Variables](https://create-react-app.dev/docs/adding-custom-environment-variables/)
- [.gitignore Best Practices](https://www.toptal.com/developers/gitignore)
- [API Key Security](https://www.freecodecamp.org/news/how-to-securely-store-api-keys-4ff3ea19ebda/)

