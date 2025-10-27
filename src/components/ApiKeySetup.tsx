import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import { Key, ContentCopy, Close } from '@mui/icons-material';
import { saveApiKey, hasApiKey, getApiKeyMasked, clearApiKey } from '../services/geminiService';

interface ApiKeySetupProps {
  open?: boolean;
  onClose?: () => void;
  required?: boolean;
}

const ApiKeySetup: React.FC<ApiKeySetupProps> = ({ 
  open: controlledOpen, 
  onClose,
  required = false 
}) => {
  const [apiKey, setApiKey] = useState('');
  const [localOpen, setLocalOpen] = useState(false);
  const [hasKey, setHasKey] = useState(false);

  // Key demo (chỉ hiện ở UI, KHÔNG có trong code service)
  const DEMO_KEY = 'AIzaSyB8GiRyoOAe-lCkxr_eqCjSMfYl3BgeeIM';

  useEffect(() => {
    const keyExists = hasApiKey();
    setHasKey(keyExists);
    
    // Nếu required và chưa có key → bắt buộc mở
    if (required && !keyExists) {
      setLocalOpen(true);
    }
  }, [required]);

  const open = controlledOpen !== undefined ? controlledOpen : localOpen;

  const handleClose = () => {
    if (required && !hasKey) {
      // Không cho đóng nếu required và chưa có key
      alert('⚠️ Bạn phải nhập API key để sử dụng ứng dụng!');
      return;
    }
    
    if (onClose) {
      onClose();
    } else {
      setLocalOpen(false);
    }
  };

  const handleSave = () => {
    try {
      saveApiKey(apiKey);
      setHasKey(true);
      alert('✅ API key đã được lưu!');
      window.location.reload();
    } catch (error) {
      alert('❌ ' + (error as Error).message);
    }
  };

  const handleCopyDemoKey = () => {
    navigator.clipboard.writeText(DEMO_KEY);
    setApiKey(DEMO_KEY);
    alert('✅ Đã copy key demo vào ô nhập!');
  };

  const handleClearKey = () => {
    if (window.confirm('Xóa API key? Bạn sẽ phải nhập lại để sử dụng.')) {
      clearApiKey();
      setHasKey(false);
      setApiKey('');
      alert('✅ Đã xóa API key!');
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      disableEscapeKeyDown={required && !hasKey}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Key sx={{ color: '#10b981', fontSize: 28 }} />
          <Typography variant="h6" sx={{ fontWeight: 700 }}>
            {hasKey ? 'Quản Lý API Key' : 'Cài Đặt API Key'}
          </Typography>
        </Box>
        {!required && (
          <IconButton onClick={handleClose} size="small">
            <Close />
          </IconButton>
        )}
      </DialogTitle>

      <DialogContent>
        {hasKey ? (
          <Alert severity="success" sx={{ mb: 2 }}>
            ✅ Đã có API key: <strong>{getApiKeyMasked()}</strong>
          </Alert>
        ) : (
          <Alert severity="warning" sx={{ mb: 2 }}>
            ⚠️ <strong>Bắt buộc:</strong> Nhập API key để sử dụng ứng dụng!
          </Alert>
        )}

        <Typography variant="body2" sx={{ mb: 2, color: '#374151' }}>
          {hasKey 
            ? 'Bạn có thể thay đổi hoặc xóa API key hiện tại.'
            : 'EOffice Tutor AI cần Gemini API key để hoạt động. Key được lưu trong browser (localStorage), không gửi lên server.'
          }
        </Typography>

        {!hasKey && (
          <>
            <Divider sx={{ my: 2 }} />
            
            <Box sx={{ 
              p: 2, 
              backgroundColor: '#f0fdf4', 
              borderRadius: 2,
              border: '2px solid #10b981',
              mb: 2 
            }}>
              <Typography variant="body2" sx={{ fontWeight: 700, mb: 1, color: '#059669' }}>
                🎁 Key Demo - Dùng Thử Ngay (Có sẵn)
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', mb: 1 }}>
                <TextField
                  size="small"
                  value={DEMO_KEY}
                  fullWidth
                  disabled
                  sx={{ 
                    '& .MuiInputBase-input': { 
                      fontSize: '0.813rem',
                      fontFamily: 'monospace',
                      color: '#059669',
                      fontWeight: 600,
                    },
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: 'white',
                    }
                  }}
                />
                <Button 
                  size="small"
                  variant="contained"
                  startIcon={<ContentCopy />}
                  onClick={handleCopyDemoKey}
                  sx={{ 
                    whiteSpace: 'nowrap',
                    backgroundColor: '#10b981',
                    '&:hover': { backgroundColor: '#059669' }
                  }}
                >
                  Dùng Luôn
                </Button>
              </Box>
              <Typography variant="caption" sx={{ color: '#6b7280' }}>
                ⚠️ Key demo có rate limit (dùng chung). Nên dùng key riêng cho tốc độ tốt hơn!
              </Typography>
            </Box>

            <Divider sx={{ my: 2 }}>
              <Typography variant="caption" sx={{ color: '#9ca3af' }}>
                HOẶC
              </Typography>
            </Divider>
          </>
        )}

        <Typography variant="body2" sx={{ mb: 1, fontWeight: 600 }}>
          {hasKey ? 'Nhập key mới để thay đổi:' : 'Nhập key riêng của bạn:'}
        </Typography>

        <TextField
          fullWidth
          label="Gemini API Key"
          placeholder="AIzaSy..."
          value={apiKey}
          onChange={(e) => setApiKey(e.target.value)}
          type="text"
          variant="outlined"
          autoFocus={hasKey}
          sx={{ mb: 1 }}
        />

        <Typography variant="caption" sx={{ color: '#6b7280', display: 'block', mb: 2 }}>
          🔗 Lấy key miễn phí tại:{' '}
          <Link 
            href="https://aistudio.google.com/app/apikey" 
            target="_blank"
            sx={{ color: '#10b981', fontWeight: 600, textDecoration: 'none' }}
          >
            Google AI Studio
          </Link>
          {' '}(1-2 phút)
        </Typography>

        <Alert severity="info" icon={false} sx={{ fontSize: '0.875rem' }}>
          <Typography variant="body2">
            💡 <strong>Bảo mật:</strong> Key lưu trong browser, không gửi server. 
            {!hasKey && ' Chỉ cần nhập 1 lần!'}
          </Typography>
        </Alert>
      </DialogContent>

      <DialogActions sx={{ px: 3, pb: 2, gap: 1 }}>
        {hasKey && (
          <Button 
            onClick={handleClearKey} 
            color="error" 
            variant="outlined"
            size="small"
          >
            Xóa Key
          </Button>
        )}
        <Box sx={{ flex: 1 }} />
        {!required && (
          <Button onClick={handleClose} size="medium">
            {hasKey ? 'Đóng' : 'Hủy'}
          </Button>
        )}
        <Button 
          onClick={handleSave}
          variant="contained"
          disabled={!apiKey.trim()}
          size="medium"
          sx={{
            backgroundColor: '#10b981',
            fontWeight: 600,
            px: 3,
            '&:hover': { backgroundColor: '#059669' },
          }}
        >
          {hasKey ? 'Cập Nhật' : 'Lưu & Bắt Đầu'}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ApiKeySetup;

