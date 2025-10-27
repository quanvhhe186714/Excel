import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Alert,
  CircularProgress,
  Divider,
} from '@mui/material';
import { testGeminiConnection } from '../services/geminiService';

const DebugAPI: React.FC = () => {
  const [testing, setTesting] = useState(false);
  const [results, setResults] = useState<any[]>([]);

  const addLog = (type: 'info' | 'success' | 'error', message: string, data?: any) => {
    setResults(prev => [...prev, { 
      type, 
      message, 
      data,
      timestamp: new Date().toLocaleTimeString() 
    }]);
  };

  const testAPI = async () => {
    setTesting(true);
    setResults([]);

    try {
      // Test 1: Check console logs
      addLog('info', '🔍 Kiểm tra Console Logs...', 'Mở F12 > Console để xem logs chi tiết');

      // Test 2: Test connection
      addLog('info', '📡 Test kết nối với Gemini API...');
      const connected = await testGeminiConnection();
      
      if (connected) {
        addLog('success', '✅ Kết nối thành công!', 'API key hoạt động');
      } else {
        addLog('error', '❌ Kết nối thất bại!', 'Kiểm tra API key hoặc network');
      }

      // Test 3: Test simple generation
      addLog('info', '🧪 Test tạo công thức đơn giản...');
      const { generateExcelFormula } = await import('../services/geminiService');
      
      try {
        const result = await generateExcelFormula('Tính tổng A1 đến A10');
        addLog('success', '✅ Tạo công thức thành công!', result);
      } catch (error: any) {
        addLog('error', '❌ Tạo công thức thất bại!', error.message);
      }

    } catch (error: any) {
      addLog('error', '❌ Lỗi nghiêm trọng!', error.message);
    } finally {
      setTesting(false);
    }
  };

  const testDirectAPI = async () => {
    setTesting(true);
    setResults([]);

    const apiKey = 'AIzaSyB8GiRyoOAe-lCkxr_eqCjSMfYl3BgeeIM';

    try {
      // Test 1: List models
      addLog('info', '📋 Lấy danh sách models...');
      const listUrl = `https://generativelanguage.googleapis.com/v1/models?key=${apiKey}`;
      
      const listRes = await fetch(listUrl);
      const listData = await listRes.json();
      
      if (!listRes.ok) {
        addLog('error', '❌ Không thể lấy danh sách models', {
          status: listRes.status,
          error: listData
        });
      } else {
        const models = listData.models?.map((m: any) => m.name) || [];
        addLog('success', `✅ Tìm thấy ${models.length} models`, models.slice(0, 5));
      }

      // Test 2: Generate with a specific model
      addLog('info', '🧪 Test generate với gemini-1.5-flash...');
      const genUrl = `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${apiKey}`;
      
      const genRes = await fetch(genUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: 'Hello, respond with "OK"' }]
          }]
        })
      });

      const genData = await genRes.json();
      
      if (!genRes.ok) {
        addLog('error', '❌ Generate thất bại', {
          status: genRes.status,
          error: genData
        });
      } else {
        const text = genData.candidates?.[0]?.content?.parts?.[0]?.text || 'No text';
        addLog('success', '✅ Generate thành công!', { response: text });
      }

    } catch (error: any) {
      addLog('error', '❌ Network error', {
        message: error.message,
        hint: 'Có thể bị CORS hoặc network issue'
      });
    } finally {
      setTesting(false);
    }
  };

  return (
    <Box sx={{ py: 8, backgroundColor: '#f9fafb', minHeight: '100vh' }}>
      <Container maxWidth="md">
        <Typography variant="h3" sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
          🔧 Debug API Tool
        </Typography>
        <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: '#6b7280' }}>
          Công cụ kiểm tra và debug Gemini API
        </Typography>

        <Paper sx={{ p: 4, mb: 3 }}>
          <Typography variant="h6" sx={{ mb: 2 }}>
            Bước 1: Mở Console
          </Typography>
          <Alert severity="info" sx={{ mb: 2 }}>
            Nhấn <strong>F12</strong> hoặc <strong>Ctrl+Shift+I</strong> → chọn tab <strong>Console</strong>
          </Alert>
          <Typography variant="body2" sx={{ mb: 3, color: '#6b7280' }}>
            Tất cả logs chi tiết sẽ xuất hiện trong Console với prefix [GeminiService]
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" sx={{ mb: 2 }}>
            Bước 2: Chạy Test
          </Typography>
          
          <Box sx={{ display: 'flex', gap: 2, mb: 3 }}>
            <Button
              variant="contained"
              onClick={testAPI}
              disabled={testing}
              startIcon={testing ? <CircularProgress size={20} /> : null}
              sx={{
                backgroundColor: '#10b981',
                '&:hover': { backgroundColor: '#059669' },
              }}
            >
              {testing ? 'Đang test...' : 'Test với Service'}
            </Button>

            <Button
              variant="outlined"
              onClick={testDirectAPI}
              disabled={testing}
              sx={{
                borderColor: '#10b981',
                color: '#10b981',
                '&:hover': { borderColor: '#059669', backgroundColor: 'rgba(16, 185, 129, 0.1)' },
              }}
            >
              Test Direct API
            </Button>
          </Box>

          {results.length > 0 && (
            <Paper sx={{ p: 3, backgroundColor: '#f9fafb', maxHeight: '400px', overflow: 'auto' }}>
              {results.map((result, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  <Alert 
                    severity={result.type === 'success' ? 'success' : result.type === 'error' ? 'error' : 'info'}
                    sx={{ mb: 1 }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      [{result.timestamp}] {result.message}
                    </Typography>
                    {result.data && (
                      <Box
                        component="pre"
                        sx={{
                          mt: 1,
                          p: 1,
                          backgroundColor: 'rgba(0,0,0,0.05)',
                          borderRadius: 1,
                          fontSize: '0.75rem',
                          overflow: 'auto',
                          maxHeight: '150px',
                        }}
                      >
                        {typeof result.data === 'string' 
                          ? result.data 
                          : JSON.stringify(result.data, null, 2)}
                      </Box>
                    )}
                  </Alert>
                </Box>
              ))}
            </Paper>
          )}
        </Paper>

        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" sx={{ mb: 2, color: '#dc2626' }}>
            ⚠️ Lỗi thường gặp
          </Typography>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              1. CORS Error
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
              • Chỉ xảy ra khi test trên localhost<br/>
              • Giải pháp: Dùng Chrome, tắt extensions (ad-blocker)<br/>
              • Hoặc: Deploy lên Vercel/Netlify
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              2. API Key Invalid
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
              • Check API key trong src/services/geminiService.ts<br/>
              • Kiểm tra quota trên Google AI Studio<br/>
              • Key có thể bị disable hoặc hết quota
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              3. Model Not Found
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
              • Model name có thể không available cho API key<br/>
              • Xem logs console để biết model nào đang dùng<br/>
              • Code sẽ tự động fallback sang models khác
            </Typography>
          </Box>

          <Box>
            <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1 }}>
              4. Empty Response
            </Typography>
            <Typography variant="body2" sx={{ color: '#6b7280' }}>
              • Check finishReason trong console logs<br/>
              • SAFETY: Nội dung bị filter<br/>
              • MAX_TOKENS: Vượt giới hạn tokens<br/>
              • OTHER: Lỗi khác
            </Typography>
          </Box>
        </Paper>

        <Alert severity="warning" sx={{ mt: 3 }}>
          <Typography variant="body2">
            <strong>Gửi cho tôi:</strong>
            <br/>
            1. Screenshot Console (F12 → Console tab)
            <br/>
            2. Screenshot kết quả test phía trên
            <br/>
            3. Message lỗi chính xác bạn thấy trên UI
          </Typography>
        </Alert>
      </Container>
    </Box>
  );
};

export default DebugAPI;

