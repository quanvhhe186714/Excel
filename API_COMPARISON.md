# 🔍 So sánh Code: React Native vs React Web

## ✅ **ĐÃ CẬP NHẬT** - Code giờ tương tự React Native!

### 📊 Bảng so sánh

| Tính năng | Code cũ (React Web) | Code mới (Đã fix) | Code React Native |
|-----------|---------------------|-------------------|-------------------|
| **Logging** | ❌ Không có | ✅ console.log với prefix | ✅ console.log với prefix |
| **Model Selection** | ❌ Hard-code | ✅ Auto pick từ danh sách | ✅ Auto pick từ danh sách |
| **List Models** | ❌ Không có | ✅ Có | ✅ Có |
| **Retry Logic** | ❌ Không có | ✅ Fallback qua models | ✅ Fallback qua models |
| **Caching** | ❌ Không có | ✅ Cache model đã chọn | ✅ Cache model đã chọn |
| **URL Format** | ❌ Sai (v1beta) | ✅ Đúng (v1) | ✅ Đúng (v1) |
| **Model Prefix** | ❌ Thiếu models/ | ✅ Có models/ | ✅ Có models/ |
| **Error Messages** | ❌ Generic | ✅ Chi tiết (finishReason) | ✅ Chi tiết (finishReason) |
| **Preferred Models** | ❌ 1 model | ✅ 4 models fallback | ✅ 3 models fallback |

---

## 🔧 **Những thay đổi chính**

### 1. **URL Format - FIX QUAN TRỌNG!**

#### ❌ Code cũ (SAI):
```typescript
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';
```

**Vấn đề:**
- Dùng `v1beta` (deprecated)
- Hard-code model name
- Không có prefix `models/`

#### ✅ Code mới (ĐÚNG):
```typescript
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1';

// Trong function:
const url = `${GEMINI_BASE_URL}/models/${modelName}:generateContent?key=${apiKey}`;
// → https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=...
```

**Giống React Native:**
```javascript
const url = `https://generativelanguage.googleapis.com/v1/${modelNameWithPrefix}:generateContent?key=${apiKey}`;
// modelNameWithPrefix đã có "models/" prefix
```

---

### 2. **Logging - Debug dễ hơn**

#### ❌ Code cũ:
```typescript
console.error('Error calling Gemini API:', error);
```

#### ✅ Code mới:
```typescript
function log(...args: any[]) {
  console.log('[GeminiService]', ...args);
}

log('callGenerate →', modelName, '| attempt:', retryCount + 1);
log('callGenerate status:', status, '| model:', modelName);
log('EMPTY TEXT → finishReason:', finishReason);
```

**Output trong console:**
```
[GeminiService] listModels → https://...
[GeminiService] listModels status: 200
[GeminiService] listModels count: 15
[GeminiService] pickAvailableModel: gemini-1.5-flash-latest
[GeminiService] callGenerate → gemini-1.5-flash-latest | attempt: 1
[GeminiService] callGenerate status: 200 | model: gemini-1.5-flash-latest
[GeminiService] callGenerate success → text length: 234
```

---

### 3. **Model Selection với Fallback**

#### ❌ Code cũ:
```typescript
// Luôn dùng 1 model cố định
fetch('https://.../gemini-1.5-flash:generateContent')
```

#### ✅ Code mới:
```typescript
const PREFERRED_MODELS = [
  'gemini-2.0-flash-exp',      // Thử model mới nhất trước
  'gemini-1.5-flash-latest',   // Fallback
  'gemini-1.5-flash',          // Fallback
  'gemini-1.5-pro',            // Fallback cuối
];

// Auto pick model có sẵn
async function pickAvailableModel(apiKey: string): Promise<string> {
  const availableModels = await listModels(apiKey);
  const modelSet = new Set(availableModels);
  
  for (const model of PREFERRED_MODELS) {
    if (modelSet.has(model)) {
      return model; // Chọn model đầu tiên có sẵn
    }
  }
  
  return availableModels[0] || PREFERRED_MODELS[0]; // Fallback
}
```

---

### 4. **Retry Logic - Quan trọng cho Production!**

#### ❌ Code cũ:
```typescript
const response = await fetch(...);
if (!response.ok) {
  throw new Error('API Error'); // Fail ngay
}
```

#### ✅ Code mới:
```typescript
// 1. Thử model đã cache
try {
  result = await callGenerateContent(cachedModel, payload);
} catch (error) {
  // 2. Retry với các models khác
  log('Retry with fallback models');
  for (const model of PREFERRED_MODELS) {
    if (model === cachedModel) continue;
    try {
      result = await callGenerateContent(model, payload);
      cachedModel = model; // Update cache
      break;
    } catch (e) {
      log('Fallback failed for:', model);
      continue; // Thử model tiếp theo
    }
  }
}

if (!result?.text) {
  throw new Error('Tất cả models đều thất bại');
}
```

**Flow:**
```
Request → gemini-2.0-flash-exp (cached)
  ↓ (fail)
Retry → gemini-1.5-flash-latest
  ↓ (fail)
Retry → gemini-1.5-flash
  ↓ (success!)
Return result + cache model
```

---

### 5. **List Models - Check Availability**

#### ❌ Code cũ:
```typescript
// Không check, giả định model tồn tại
```

#### ✅ Code mới:
```typescript
async function listModels(apiKey: string): Promise<string[]> {
  const url = `${GEMINI_BASE_URL}/models?key=${apiKey}`;
  const res = await fetch(url);
  
  if (!res.ok) return [];
  
  const data = await res.json();
  const models = data?.models?.map((m: any) => 
    m.name.replace('models/', '') // Remove prefix
  ) || [];
  
  log('listModels count:', models.length);
  return models;
}
```

**Ví dụ output:**
```javascript
[
  "gemini-2.0-flash-exp",
  "gemini-1.5-flash-latest",
  "gemini-1.5-flash",
  "gemini-1.5-pro-latest",
  "gemini-1.5-pro",
  ...
]
```

---

### 6. **Error Handling Chi Tiết**

#### ❌ Code cũ:
```typescript
if (!textResponse) {
  throw new Error('No response from API');
}
```

#### ✅ Code mới:
```typescript
const candidate = data.candidates?.[0];
const text = candidate?.content?.parts
  ?.map((p: any) => p.text || '')
  .join('\n')
  .trim() || '';

const finishReason = candidate?.finishReason || 'UNKNOWN';

if (!text) {
  log('EMPTY TEXT → finishReason:', finishReason);
  throw new Error(`Empty response (${finishReason})`);
}
```

**Possible finishReason:**
- `STOP` - Hoàn thành bình thường
- `MAX_TOKENS` - Vượt giới hạn tokens
- `SAFETY` - Bị block bởi safety filter
- `RECITATION` - Phát hiện nội dung sao chép
- `OTHER` - Lỗi khác

---

### 7. **Caching - Tiết kiệm API calls**

#### ❌ Code cũ:
```typescript
// List models mỗi lần call
```

#### ✅ Code mới:
```typescript
let cachedModel: string | null = null;

export async function generateExcelFormula(prompt: string) {
  // Chỉ list models lần đầu
  if (!cachedModel) {
    cachedModel = await pickAvailableModel(GEMINI_API_KEY);
    log('Selected model:', cachedModel);
  }
  
  // Dùng cache cho các lần sau
  result = await callGenerateContent(cachedModel, payload);
}
```

**Lợi ích:**
- ✅ Giảm số API calls
- ✅ Nhanh hơn (không cần list models mỗi lần)
- ✅ Update cache khi fallback thành công

---

## 🎯 **Test Debug Console**

Khi chạy app, mở DevTools Console để xem logs:

```
[GeminiService] generateExcelFormula START
[GeminiService] listModels → https://generativelanguage.googleapis.com/v1/models?key=...
[GeminiService] listModels status: 200
[GeminiService] listModels count: 18
[GeminiService] pickAvailableModel: gemini-1.5-flash-latest
[GeminiService] Selected model: gemini-1.5-flash-latest
[GeminiService] callGenerate → gemini-1.5-flash-latest | attempt: 1
[GeminiService] callGenerate status: 200 | model: gemini-1.5-flash-latest
[GeminiService] callGenerate success → text length: 156
[GeminiService] generateExcelFormula SUCCESS
```

**Nếu có lỗi:**
```
[GeminiService] callGenerate status: 400 | model: gemini-2.0-flash-exp
[GeminiService] callGenerate error: Model not found
[GeminiService] Retry with fallback models
[GeminiService] callGenerate → gemini-1.5-flash-latest | attempt: 1
[GeminiService] callGenerate status: 200 | model: gemini-1.5-flash-latest
[GeminiService] callGenerate success → text length: 189
```

---

## 📝 **So sánh với React Native Code**

### Giống nhau (✅):
1. Logging với prefix
2. List models để check availability
3. Pick model từ danh sách ưu tiên
4. Retry với fallback models
5. Cache model đã chọn
6. Chi tiết error messages (finishReason)
7. URL format đúng với v1

### Khác nhau (⚠️):

| Tính năng | React Native | React Web |
|-----------|--------------|-----------|
| **Storage** | AsyncStorage cho API key | Hard-code (demo) |
| **Variants** | Thử [img, text] và [text, img] | Không cần (text-only) |
| **Use case** | Image → Text | Text → Text (Formula/Steps) |
| **Structured Output** | Không dùng | Dùng `responseMimeType: "application/json"` |

---

## 🚀 **Chạy và Test**

```bash
npm start
```

Mở Console (F12) và test:

1. **Formula Generator**: Nhập "Tính tổng cột A"
2. **Xem logs**: Check model nào được chọn
3. **Test fallback**: Nếu model đầu fail → tự động thử model khác
4. **Check response**: Xem finishReason và text length

---

## ✨ **Kết luận**

Code giờ **robust** hơn nhiều:
- ✅ Tự động chọn model tốt nhất
- ✅ Retry khi fail
- ✅ Logging để debug
- ✅ Error messages rõ ràng
- ✅ Production-ready (khi move sang backend)

**Giống React Native code** nhưng tối ưu cho web + structured JSON output! 🎉

