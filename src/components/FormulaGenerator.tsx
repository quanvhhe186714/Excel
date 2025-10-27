import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Card,
  CardContent,
  Chip,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import {
  ContentCopy,
  AutoAwesome,
  CheckCircle,
} from '@mui/icons-material';
import { generateExcelFormula } from '../services/geminiService';

const FormulaGenerator: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [generatedFormula, setGeneratedFormula] = useState('');
  const [explanation, setExplanation] = useState('');
  const [example, setExample] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState('');

  const examplePrompts = [
    'Tính tổng các ô từ A1 đến A10',
    'Tìm giá trị lớn nhất trong cột B',
    'Đếm số ô không rỗng trong dải C1:C50',
    'Tính trung bình có điều kiện',
  ];

  const handleGenerate = async () => {
    if (!prompt.trim()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      // Call Gemini API với JSON output
      const result = await generateExcelFormula(prompt);
      
      setGeneratedFormula(result.formula);
      setExplanation(result.explanation);
      setExample(result.example || '');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Đã xảy ra lỗi!');
      setGeneratedFormula('');
      setExplanation('');
      setExample('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedFormula);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExampleClick = (example: string) => {
    setPrompt(example);
  };

  return (
    <Box sx={{ py: { xs: 6, md: 10 }, backgroundColor: '#f9fafb' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 2,
              color: '#111827',
            }}
          >
            AI Formula Generator
          </Typography>
          <Typography
            variant="h6"
            sx={{
              color: '#6b7280',
              fontWeight: 400,
              maxWidth: '700px',
              mx: 'auto',
            }}
          >
            Mô tả những gì bạn muốn làm, AI sẽ tạo công thức Excel cho bạn
          </Typography>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
                  Mô tả yêu cầu của bạn
                </Typography>
                
                <TextField
                  fullWidth
                  multiline
                  rows={6}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ví dụ: Tính tổng doanh thu từ cột D nếu ngày trong cột A là tháng này..."
                  variant="outlined"
                  sx={{
                    mb: 3,
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                      backgroundColor: '#f9fafb',
                    },
                  }}
                />

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleGenerate}
                  disabled={isLoading || !prompt.trim()}
                  startIcon={isLoading ? <CircularProgress size={20} /> : <AutoAwesome />}
                  sx={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 600,
                    fontSize: '1rem',
                    '&:hover': {
                      backgroundColor: '#059669',
                    },
                  }}
                >
                  {isLoading ? 'Đang tạo công thức...' : 'Tạo công thức'}
                </Button>

                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" sx={{ mb: 2, color: '#6b7280', fontWeight: 500 }}>
                    Ví dụ nhanh:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {examplePrompts.map((example, index) => (
                      <Chip
                        key={index}
                        label={example}
                        onClick={() => handleExampleClick(example)}
                        sx={{
                          cursor: 'pointer',
                          '&:hover': {
                            backgroundColor: '#e5e7eb',
                          },
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={6}>
            <Card
              sx={{
                borderRadius: 3,
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                height: '100%',
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: '#111827' }}>
                  Công thức được tạo
                </Typography>

                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}

                {generatedFormula ? (
                  <Box>
                    <Paper
                      sx={{
                        p: 3,
                        backgroundColor: '#f9fafb',
                        borderRadius: 2,
                        border: '2px solid #10b981',
                        mb: 2,
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
                        <CheckCircle sx={{ color: '#10b981', fontSize: 24 }} />
                        <Button
                          size="small"
                          startIcon={<ContentCopy />}
                          onClick={handleCopy}
                          sx={{
                            textTransform: 'none',
                            color: copied ? '#10b981' : '#6b7280',
                          }}
                        >
                          {copied ? 'Đã sao chép!' : 'Sao chép'}
                        </Button>
                      </Box>
                      <Typography
                        sx={{
                          fontFamily: 'monospace',
                          fontSize: '1.2rem',
                          color: '#111827',
                          wordBreak: 'break-all',
                        }}
                      >
                        {generatedFormula}
                      </Typography>
                    </Paper>

                    <Box sx={{ p: 3, backgroundColor: '#eff6ff', borderRadius: 2, mb: 2 }}>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#1e40af' }}>
                        Giải thích:
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#374151', lineHeight: 1.7 }}>
                        {explanation}
                      </Typography>
                    </Box>

                    {example && (
                      <Box sx={{ p: 3, backgroundColor: '#fef3c7', borderRadius: 2 }}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 600, mb: 1, color: '#92400e' }}>
                          Ví dụ:
                        </Typography>
                        <Typography variant="body2" sx={{ color: '#78350f', lineHeight: 1.7 }}>
                          {example}
                        </Typography>
                      </Box>
                    )}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      minHeight: '300px',
                      backgroundColor: '#f9fafb',
                      borderRadius: 2,
                      border: '2px dashed #d1d5db',
                    }}
                  >
                    <Typography variant="body1" sx={{ color: '#9ca3af', textAlign: 'center' }}>
                      Công thức của bạn sẽ xuất hiện ở đây
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Typography variant="body2" sx={{ color: '#6b7280' }}>
            Powered by AI | Hỗ trợ Excel & Google Sheets
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FormulaGenerator;

