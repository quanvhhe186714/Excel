# 🤖 Tích hợp Gemini API - Hướng dẫn Chi tiết

## 📋 Tổng quan

Hệ thống sử dụng **Google Gemini 1.5 Flash API** để:
1. **Tạo công thức Excel** từ mô tả tiếng Việt
2. **Tạo hướng dẫn step-by-step** chi tiết cho các task trong Excel

## 🎯 Cách hoạt động

### 1. **Ép JSON Output (Structured Response)**

Đây là điểm quan trọng nhất! Thay vì để AI trả về text tự do, chúng ta **ép AI phải trả về JSON** với cấu trúc cố định.

#### Tại sao phải ép JSON?
- ✅ **Consistency**: Kết quả luôn có format giống nhau
- ✅ **Parse dễ dàng**: Không cần regex phức tạp
- ✅ **UI/UX tốt hơn**: Hiển thị từng phần riêng biệt (formula, explanation, tips...)
- ✅ **Error handling**: Dễ validate và xử lý lỗi

### 2. **Cấu trúc API Call**

```typescript
const response = await fetch(`${GEMINI_API_URL}?key=${API_KEY}`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    contents: [{
      parts: [{
        text: `${systemPrompt}\n\nYêu cầu: ${userPrompt}`
      }]
    }],
    generationConfig: {
      temperature: 0.7,           // Độ sáng tạo (0-1)
      topK: 40,                   // Số token xem xét
      topP: 0.95,                 // Xác suất tích lũy
      maxOutputTokens: 1024,      // Giới hạn độ dài
      responseMimeType: "application/json", // ⭐ KEY: Ép JSON!
    },
  }),
});
```

### 3. **System Prompt Engineering**

#### A. Formula Generator

```typescript
const systemPrompt = `Bạn là chuyên gia Excel...

QUAN TRỌNG: Trả về ĐÚNG format JSON như sau:
{
  "formula": "công thức Excel (bắt đầu bằng =)",
  "explanation": "giải thích chi tiết",
  "example": "ví dụ cụ thể (optional)"
}`;
```

**Kỹ thuật:**
- Định nghĩa **rõ ràng** format JSON expected
- Chỉ định **bắt buộc** và **optional** fields
- Đưa ví dụ cụ thể về format

#### B. Step-by-Step Generator

```typescript
const systemPrompt = `Bạn là giáo viên Excel...

QUAN TRỌNG: Trả về ĐÚNG format JSON:
{
  "taskName": "tên task",
  "steps": [
    {
      "title": "...",
      "description": "...",
      "details": ["...", "..."],
      "tips": "... (optional)",
      "warning": "... (optional)"
    }
  ]
}

Yêu cầu:
- Ít nhất 5-8 bước
- Mỗi bước có 3-5 chi tiết
- Viết bằng tiếng Việt
- Thêm tips và warnings khi cần`;
```

**Kỹ thuật:**
- Nested structure (array of objects)
- Chỉ định số lượng (5-8 bước, 3-5 chi tiết)
- Yêu cầu ngôn ngữ cụ thể

### 4. **Parse Response**

```typescript
const data = await response.json();
const textResponse = data.candidates[0]?.content?.parts[0]?.text;

// Parse JSON string thành object
const parsedResponse = JSON.parse(textResponse);

// Sử dụng typed interface
interface FormulaResponse {
  formula: string;
  explanation: string;
  example?: string;
}
```

### 5. **Error Handling**

```typescript
try {
  const result = await generateExcelFormula(prompt);
  // Success
  setFormula(result.formula);
  setExplanation(result.explanation);
} catch (err) {
  // Error - Show message to user
  setError(err.message);
  // Optional: Fallback to demo data
}
```

## 🔧 File Structure

```
src/
├── services/
│   └── geminiService.ts        # ⭐ Core API logic
├── components/
│   ├── FormulaGenerator.tsx    # Sử dụng generateExcelFormula()
│   └── StepByStepGuide.tsx     # Sử dụng generateStepByStep()
```

## 🎨 User Flow

### Formula Generator:
1. User nhập prompt: "Tính tổng các ô từ A1 đến A10"
2. Click "Tạo công thức"
3. Call `generateExcelFormula(prompt)`
4. Gemini trả về JSON:
   ```json
   {
     "formula": "=SUM(A1:A10)",
     "explanation": "Công thức SUM tính tổng...",
     "example": "Nếu A1=5, A2=10, A3=15..."
   }
   ```
5. UI hiển thị:
   - Formula trong box có viền xanh
   - Explanation trong box màu xanh nhạt
   - Example trong box màu vàng (nếu có)

### Step-by-Step Guide:
1. User nhập task: "Tạo biểu đồ cột"
2. Click "Tạo hướng dẫn"
3. Call `generateStepByStep(task)`
4. Gemini trả về JSON với array of steps
5. UI hiển thị Material Stepper với từng bước

## ⚠️ Bảo mật (QUAN TRỌNG!)

### ❌ Hiện tại (DEMO):
```typescript
// API Key nằm trong frontend code
const GEMINI_API_KEY = 'AIzaSyB8GiRyoOAe-lCkxr_eqCjSMfYl3BgeeIM';
```

**Rủi ro:**
- Ai cũng có thể xem source và lấy key
- Có thể bị abuse, tốn tiền
- Không kiểm soát được usage

### ✅ Production (PHẢI LÀM):

#### Option 1: Backend API (Recommended)

```
Frontend → Backend API → Gemini API
```

**Backend (Node.js/Express):**
```javascript
// backend/routes/api.js
const express = require('express');
const router = express.Router();

router.post('/generate-formula', async (req, res) => {
  const { prompt } = req.body;
  
  // API key nằm trong environment variable (bảo mật)
  const apiKey = process.env.GEMINI_API_KEY;
  
  // Call Gemini API
  const result = await callGemini(prompt, apiKey);
  
  res.json(result);
});
```

**Frontend:**
```typescript
// src/services/geminiService.ts
async function generateExcelFormula(prompt: string) {
  // Gọi backend thay vì Gemini trực tiếp
  const response = await fetch('/api/generate-formula', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  });
  
  return response.json();
}
```

**Benefits:**
- ✅ API key an toàn trên server
- ✅ Rate limiting
- ✅ Authentication/Authorization
- ✅ Caching để tiết kiệm chi phí
- ✅ Analytics và monitoring

#### Option 2: Serverless Function (Vercel/Netlify)

```typescript
// api/generate-formula.ts
export default async function handler(req, res) {
  const { prompt } = req.body;
  
  // API key từ environment variable
  const apiKey = process.env.GEMINI_API_KEY;
  
  const result = await callGemini(prompt, apiKey);
  res.json(result);
}
```

## 🚀 Deploy Checklist

### Cho Demo (Hiện tại):
- ✅ Đã implement
- ✅ API key có limit hợp lý trên Google Cloud Console
- ✅ Không commit lên Git public
- ✅ Hủy key sau khi demo xong

### Cho Production:
- [ ] Move API key sang backend
- [ ] Setup environment variables
- [ ] Implement rate limiting
- [ ] Add authentication
- [ ] Setup monitoring (Sentry, LogRocket...)
- [ ] Add caching (Redis)
- [ ] Setup analytics
- [ ] Error logging
- [ ] Cost monitoring

## 💰 Chi phí

**Gemini 1.5 Flash pricing:**
- Free tier: 15 requests/minute
- Input: $0.075 / 1M tokens
- Output: $0.30 / 1M tokens

**Ước tính:**
- 1 formula request ≈ 200 tokens input + 300 tokens output ≈ $0.0001
- 1 step-by-step ≈ 500 tokens input + 1500 tokens output ≈ $0.0005
- 1000 users/day ≈ $0.50-1.00/day

## 🧪 Testing

### Test API Connection:
```typescript
import { testGeminiConnection } from './services/geminiService';

const isConnected = await testGeminiConnection();
console.log('Gemini API:', isConnected ? '✅ Connected' : '❌ Failed');
```

### Test Formula Generation:
```typescript
const result = await generateExcelFormula('Tính tổng cột A');
console.log(result);
// Expected: { formula: "=SUM(A:A)", explanation: "...", example: "..." }
```

## 📚 Tài liệu tham khảo

- [Gemini API Docs](https://ai.google.dev/docs)
- [JSON Mode Guide](https://ai.google.dev/docs/json_mode)
- [Best Practices](https://ai.google.dev/docs/best_practices)

## 🎯 Next Steps

1. **Test thật với khách hàng**
2. **Collect feedback về prompt quality**
3. **Optimize system prompts**
4. **Implement backend API** (trước khi deploy chính thức)
5. **Add analytics** để track usage
6. **A/B testing** các version prompts khác nhau

---

**Note:** File này là documentation chi tiết về implementation. Đừng commit API key lên Git!

