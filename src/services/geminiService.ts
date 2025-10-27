/**
 * ⚠️ WARNING: FOR DEMO PURPOSES ONLY! ⚠️
 * 
 * API key được lưu trong .env.local (không commit lên Git)
 * 
 * For production:
 * 1. Move this to backend API
 * 2. Never expose API keys in frontend
 * 3. Implement authentication & rate limiting
 */

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY || '';
const GEMINI_BASE_URL = 'https://generativelanguage.googleapis.com/v1';

// Validate API key exists
if (!GEMINI_API_KEY) {
  console.error('❌ GEMINI_API_KEY not found! Check .env.local file');
}

// Danh sách models ưu tiên + fallback
const PREFERRED_MODELS = [
  'gemini-2.0-flash-exp',
  'gemini-1.5-flash-latest',
  'gemini-1.5-flash',
  'gemini-1.5-pro',
];

// Logging helper
function log(...args: any[]) {
  console.log('[GeminiService]', ...args);
}

// Cache model đã chọn
let cachedModel: string | null = null;

/**
 * Clean và fix JSON response từ AI
 */
function cleanJSONResponse(text: string): string {
  let cleaned = text.trim();
  
  // Remove markdown code blocks
  if (cleaned.startsWith('```')) {
    cleaned = cleaned.replace(/^```json?\n?/i, '').replace(/\n?```$/, '').trim();
  }
  
  // Remove leading/trailing whitespace
  cleaned = cleaned.trim();
  
  // Fix common issues
  // 1. Remove trailing commas before closing braces/brackets
  cleaned = cleaned.replace(/,(\s*[}\]])/g, '$1');
  
  // 2. Ensure proper closing
  const openBraces = (cleaned.match(/{/g) || []).length;
  const closeBraces = (cleaned.match(/}/g) || []).length;
  const openBrackets = (cleaned.match(/\[/g) || []).length;
  const closeBrackets = (cleaned.match(/\]/g) || []).length;
  
  // Add missing closing braces/brackets if truncated
  if (openBrackets > closeBrackets) {
    cleaned += ']'.repeat(openBrackets - closeBrackets);
  }
  if (openBraces > closeBraces) {
    cleaned += '}'.repeat(openBraces - closeBraces);
  }
  
  return cleaned;
}

// Interface cho Formula Generator Response
interface FormulaResponse {
  formula: string;
  explanation: string;
  example?: string;
}

// Interface cho Step by Step Response
interface Step {
  title: string;
  description: string;
  details: string[];
  tips?: string;
  warning?: string;
}

interface StepByStepResponse {
  steps: Step[];
  taskName: string;
}

/**
 * List available models
 */
async function listModels(apiKey: string): Promise<string[]> {
  const url = `${GEMINI_BASE_URL}/models?key=${encodeURIComponent(apiKey)}`;
  log('listModels →', url);
  
  try {
    const res = await fetch(url);
    const status = res.status;
    log('listModels status:', status);
    
    if (!res.ok) {
      log('listModels error: HTTP', status);
      return [];
    }
    
    const data = await res.json();
    const models = Array.isArray(data?.models) 
      ? data.models.map((m: any) => m.name.replace('models/', '')) 
      : [];
    log('listModels count:', models.length);
    return models;
  } catch (error) {
    log('listModels exception:', error);
    return [];
  }
}

/**
 * Pick available model from preferred list
 */
async function pickAvailableModel(apiKey: string): Promise<string> {
  const availableModels = await listModels(apiKey);
  const modelSet = new Set(availableModels);
  
  for (const model of PREFERRED_MODELS) {
    if (modelSet.has(model)) {
      log('pickAvailableModel:', model);
      return model;
    }
  }
  
  // Fallback to first available
  const fallback = availableModels[0] || PREFERRED_MODELS[0];
  log('pickAvailableModel fallback:', fallback);
  return fallback;
}

/**
 * Call API with retry logic
 */
async function callGenerateContent(
  modelName: string,
  payload: any,
  retryCount = 0
): Promise<any> {
  const url = `${GEMINI_BASE_URL}/models/${modelName}:generateContent?key=${encodeURIComponent(GEMINI_API_KEY)}`;
  log('callGenerate →', modelName, '| attempt:', retryCount + 1);
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    const status = response.status;
    const data = await response.json();
    
    log('callGenerate status:', status, '| model:', modelName);
    
    if (!response.ok) {
      const errorMsg = data?.error?.message || `HTTP ${status}`;
      log('callGenerate error:', errorMsg);
      throw new Error(errorMsg);
    }

    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.map((p: any) => p.text || '').join('\n').trim() || '';
    const finishReason = candidate?.finishReason || 'UNKNOWN';
    
    if (!text) {
      log('EMPTY TEXT → finishReason:', finishReason);
      throw new Error(`Empty response (${finishReason})`);
    }
    
    log('callGenerate success → text length:', text.length);
    return { text, finishReason };
    
  } catch (error) {
    log('callGenerate exception:', error);
    throw error;
  }
}

/**
 * Call Gemini API để tạo công thức Excel
 * Ép JSON output để có cấu trúc rõ ràng
 */
export async function generateExcelFormula(prompt: string): Promise<FormulaResponse> {
  log('generateExcelFormula START');
  
  try {
    // 1. Chọn model (cache nếu đã có)
    if (!cachedModel) {
      const availableModels = await listModels(GEMINI_API_KEY);
      log('Available models:', availableModels.slice(0, 5)); // Show first 5
      
      if (availableModels.length === 0) {
        throw new Error('Không tìm thấy model nào. Kiểm tra API key!');
      }
      
      // Chọn model từ danh sách có sẵn
      cachedModel = await pickAvailableModel(GEMINI_API_KEY);
      
      if (!cachedModel) {
        // Fallback: dùng model đầu tiên trong list
        cachedModel = availableModels[0];
      }
      
      log('Selected model:', cachedModel);
    }

    const systemPrompt = `Bạn là chuyên gia Excel. Tạo công thức Excel chính xác dựa trên yêu cầu.

CHỈ TRẢ VỀ JSON, KHÔNG THÊM TEXT KHÁC:
{
  "formula": "công thức Excel bắt đầu bằng =",
  "explanation": "giải thích chi tiết bằng tiếng Việt",
  "example": "ví dụ cụ thể (có thể bỏ qua)"
}

KHÔNG viết markdown, KHÔNG giải thích thêm, CHỈ JSON thuần.`;

    const payload = {
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nYêu cầu của người dùng: ${prompt}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    };

    // 2. Thử với model đã chọn
    let result;
    try {
      result = await callGenerateContent(cachedModel, payload);
    } catch (error) {
      // 3. Retry với TẤT CẢ models available
      log('Retry with all available models');
      const allModels = await listModels(GEMINI_API_KEY);
      
      for (const model of allModels) {
        if (model === cachedModel) continue;
        // Chỉ thử models có "gemini" và support "generateContent"
        if (!model.includes('gemini')) continue;
        
        try {
          log('Trying model:', model);
          result = await callGenerateContent(model, payload);
          cachedModel = model; // Update cache
          log('✅ Success with model:', model);
          break;
        } catch (e) {
          log('❌ Failed:', model);
          continue;
        }
      }
    }

    if (!result?.text) {
      throw new Error('Tất cả models đều thất bại');
    }

    // 4. Clean và Parse JSON response
    let cleanText = cleanJSONResponse(result.text);
    
    const parsedResponse: FormulaResponse = JSON.parse(cleanText);
    log('generateExcelFormula SUCCESS');
    
    return parsedResponse;
    
  } catch (error) {
    log('generateExcelFormula ERROR:', error);
    throw new Error('Không thể tạo công thức. Vui lòng thử lại!');
  }
}

/**
 * Call Gemini API để tạo hướng dẫn Step by Step
 * Ép JSON output để có cấu trúc từng bước rõ ràng
 */
export async function generateStepByStep(task: string): Promise<StepByStepResponse> {
  log('generateStepByStep START');
  
  try {
    // 1. Chọn model (cache nếu đã có)
    if (!cachedModel) {
      const availableModels = await listModels(GEMINI_API_KEY);
      log('Available models:', availableModels.slice(0, 5)); // Show first 5
      
      if (availableModels.length === 0) {
        throw new Error('Không tìm thấy model nào. Kiểm tra API key!');
      }
      
      // Chọn model từ danh sách có sẵn
      cachedModel = await pickAvailableModel(GEMINI_API_KEY);
      
      if (!cachedModel) {
        // Fallback: dùng model đầu tiên trong list
        cachedModel = availableModels[0];
      }
      
      log('Selected model:', cachedModel);
    }

    const systemPrompt = `Bạn là giáo viên Excel. Tạo hướng dẫn chi tiết từng bước.

CHỈ TRẢ VỀ JSON HỢP LỆ (VALID JSON), KHÔNG THÊM TEXT KHÁC:
{
  "taskName": "tên task",
  "steps": [
    {
      "title": "tiêu đề bước",
      "description": "mô tả ngắn gọn",
      "details": ["chi tiết 1", "chi tiết 2", "chi tiết 3"],
      "tips": "mẹo hữu ích (optional)",
      "warning": "lưu ý (optional)"
    }
  ]
}

YÊU CẦU QUAN TRỌNG:
- 5-7 bước (KHÔNG QUÁ 7 bước)
- Mỗi bước 3-4 chi tiết (KHÔNG QUÁ 4 chi tiết)
- Mỗi chi tiết NGẮN GỌN (1-2 câu)
- Tiếng Việt, súc tích
- Tips/warnings chỉ 1 câu ngắn
- ĐẢM BẢO JSON HỢP LỆ: escape quotes (\"), no newlines trong strings

KHÔNG viết markdown, KHÔNG giải thích thêm, CHỈ JSON thuần hợp lệ.`;

    const payload = {
      contents: [{
        parts: [{
          text: `${systemPrompt}\n\nTask: ${task}`
        }]
      }],
      generationConfig: {
        temperature: 0.7, // Giảm xuống để output ổn định hơn
        maxOutputTokens: 8192, // TĂNG LÊN để đủ chỗ cho task phức tạp
      },
    };

    // 2. Thử với model đã chọn
    let result;
    try {
      result = await callGenerateContent(cachedModel, payload);
    } catch (error) {
      // 3. Retry với TẤT CẢ models available
      log('Retry with all available models');
      const allModels = await listModels(GEMINI_API_KEY);
      
      for (const model of allModels) {
        if (model === cachedModel) continue;
        // Chỉ thử models có "gemini" và support "generateContent"
        if (!model.includes('gemini')) continue;
        
        try {
          log('Trying model:', model);
          result = await callGenerateContent(model, payload);
          cachedModel = model; // Update cache
          log('✅ Success with model:', model);
          break;
        } catch (e) {
          log('❌ Failed:', model);
          continue;
        }
      }
    }

    if (!result?.text) {
      throw new Error('Tất cả models đều thất bại');
    }

    // 4. Clean và Parse JSON response
    let cleanText = cleanJSONResponse(result.text);
    
    // Try parse JSON với error handling tốt hơn
    let parsedResponse: StepByStepResponse;
    try {
      parsedResponse = JSON.parse(cleanText);
      
      // Validate structure
      if (!parsedResponse.taskName || !parsedResponse.steps || !Array.isArray(parsedResponse.steps)) {
        throw new Error('Invalid response structure');
      }
      
    } catch (parseError: any) {
      log('❌ JSON Parse Error:', parseError.message);
      log('Response length:', cleanText.length);
      log('First 300 chars:', cleanText.substring(0, 300));
      log('Last 300 chars:', cleanText.substring(Math.max(0, cleanText.length - 300)));
      
      // Last attempt: Try to salvage what we can
      try {
        // Extract JSON object using regex
        const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          let extracted = jsonMatch[0];
          extracted = cleanJSONResponse(extracted);
          log('Attempting parse extracted JSON...');
          parsedResponse = JSON.parse(extracted);
        } else {
          throw parseError;
        }
      } catch (retryError) {
        log('❌ Cannot fix JSON, using fallback');
        throw new Error('Response quá phức tạp hoặc không hợp lệ. Thử mô tả task ngắn gọn hơn!');
      }
    }
    
    log('generateStepByStep SUCCESS');
    
    return parsedResponse;
    
  } catch (error) {
    log('generateStepByStep ERROR:', error);
    throw new Error('Không thể tạo hướng dẫn. Vui lòng thử lại!');
  }
}

/**
 * Test connection với Gemini API
 */
export async function testGeminiConnection(): Promise<boolean> {
  log('testGeminiConnection START');
  
  try {
    const models = await listModels(GEMINI_API_KEY);
    const success = models.length > 0;
    log('testGeminiConnection:', success ? 'SUCCESS' : 'FAILED', '| models:', models.length);
    return success;
  } catch (error) {
    log('testGeminiConnection ERROR:', error);
    return false;
  }
}

