import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  TextField,
  Alert,
} from '@mui/material';
import {
  Download,
  CheckCircle,
  Apple,
  Android,
  Laptop,
  Email,
  Speed,
  Psychology,
  Security,
  TrendingUp,
} from '@mui/icons-material';

const DownloadPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleDownload = (platform: string) => {
    console.log(`Downloading for ${platform}...`);
    alert(`Tải xuống cho ${platform} sẽ bắt đầu ngay! 🎉`);
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 5000);
    }
  };

  const features = [
    {
      icon: <Psychology sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'AI Hướng Dẫn Theo Ngữ Cảnh',
      description: 'Không chỉ cho công thức mà còn giải thích từng bước, giúp bạn hiểu bản chất Excel',
    },
    {
      icon: <Speed sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Tối Ưu Cho Người Việt',
      description: 'Hỗ trợ tiếng Việt, ví dụ thực tế theo ngành: kế toán, marketing, logistics',
    },
    {
      icon: <Security sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Giá Rẻ & Dễ Tiếp Cận',
      description: '39.000 VNĐ/tháng - Phù hợp sinh viên & nhân viên văn phòng',
    },
    {
      icon: <TrendingUp sx={{ fontSize: 40, color: '#10b981' }} />,
      title: 'Dễ Sử Dụng',
      description: 'Cài trực tiếp trong Excel, không cần kỹ thuật. Làm việc ngay trong 5 phút',
    },
  ];

  return (
    <Box sx={{ backgroundColor: '#f9fafb', minHeight: '100vh', py: { xs: 6, md: 10 } }}>
      <Container maxWidth="lg">
        {/* Hero Section */}
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Chip
            label="✨ CHỈ 39.000 VNĐ/THÁNG - Dành Riêng Cho Người Việt"
            sx={{
              backgroundColor: '#d1fae5',
              color: '#065f46',
              fontWeight: 600,
              px: 3,
              py: 3,
              mb: 3,
            }}
          />
          
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3.5rem' },
              fontWeight: 800,
              mb: 2,
              color: '#111827',
              lineHeight: 1.2,
            }}
          >
            Tải Ngay - Làm Chủ Excel
            <br />
            <span style={{ color: '#10b981' }}>Trong 5 Phút</span>
          </Typography>

          <Typography
            variant="h6"
            sx={{
              color: '#6b7280',
              fontWeight: 400,
              maxWidth: '700px',
              mx: 'auto',
              mb: 4,
              lineHeight: 1.6,
            }}
          >
            AI hướng dẫn theo ngữ cảnh - Không chỉ cho công thức mà còn giải thích từng bước. Tối ưu cho người Việt với ví dụ thực tế theo ngành nghề.
          </Typography>

          {/* Download Button - Windows Only */}
          <Button
            variant="contained"
            size="large"
            startIcon={<Laptop />}
            onClick={() => handleDownload('Windows')}
            sx={{
              backgroundColor: '#10b981',
              color: 'white',
              px: 6,
              py: 2.5,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1.2rem',
              mb: 2,
              '&:hover': {
                backgroundColor: '#059669',
                transform: 'scale(1.05)',
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Tải Ngay Cho Windows
          </Button>

          <Typography variant="body2" sx={{ color: '#f59e0b', fontWeight: 600, mt: 2 }}>
            💰 Chỉ 39.000 VNĐ/tháng - Phù hợp sinh viên & nhân viên văn phòng
          </Typography>
        </Box>

        {/* Use Cases / Examples */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 4, textAlign: 'center' }}>
            📊 Ví Dụ Thực Tế Theo Ngành Nghề
          </Typography>
          
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#10b981' }}>
                    💰 Kế Toán
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    <strong>Bạn:</strong> "Tính tổng doanh thu theo từng tháng và so sánh với tháng trước"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#374151', mb: 2 }}>
                    <strong>AI:</strong> Tạo công thức SUMIFS + DATE + so sánh %, kèm giải thích chi tiết cách hoạt động
                  </Typography>
                  <Chip label="Tiết kiệm 2 giờ/ngày" size="small" sx={{ backgroundColor: '#d1fae5', color: '#065f46' }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#10b981' }}>
                    📈 Marketing
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    <strong>Bạn:</strong> "Tính ROI của từng chiến dịch quảng cáo và xếp hạng hiệu quả"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#374151', mb: 2 }}>
                    <strong>AI:</strong> Công thức (Revenue - Cost)/Cost * 100 + RANK, giải thích cách phân tích
                  </Typography>
                  <Chip label="Báo cáo nhanh gấp 5x" size="small" sx={{ backgroundColor: '#d1fae5', color: '#065f46' }} />
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={4}>
              <Card sx={{ height: '100%', borderRadius: 3, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
                <CardContent sx={{ p: 3 }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, mb: 2, color: '#10b981' }}>
                    🚚 Logistics
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#6b7280', mb: 2 }}>
                    <strong>Bạn:</strong> "Tính chi phí vận chuyển theo khoảng cách và trọng lượng"
                  </Typography>
                  <Typography variant="body2" sx={{ color: '#374151', mb: 2 }}>
                    <strong>AI:</strong> Công thức IF lồng + VLOOKUP bảng giá, hướng dẫn cách tối ưu
                  </Typography>
                  <Chip label="Giảm 70% sai sót" size="small" sx={{ backgroundColor: '#d1fae5', color: '#065f46' }} />
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>

        {/* Features Grid */}
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} key={index}>
              <Card
                sx={{
                  height: '100%',
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 10px 40px rgba(16, 185, 129, 0.2)',
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  {feature.icon}
                  <Typography variant="h5" sx={{ fontWeight: 700, my: 2, color: '#111827' }}>
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: '#6b7280', lineHeight: 1.7 }}>
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* What You Get */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            mb: 8,
            background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 } }}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 700, color: 'white', mb: 4, textAlign: 'center' }}
            >
              ✨ Điều Gì Làm Chúng Tôi Khác Biệt?
            </Typography>

            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <List>
                  {[
                    'AI hướng dẫn theo ngữ cảnh - Hiểu bản chất Excel',
                    'Tối ưu cho người Việt - Ví dụ theo ngành nghề',
                    'Giá rẻ 39k/tháng - Phù hợp sinh viên & văn phòng',
                    'Dễ sử dụng - Cài trong Excel, không cần kỹ thuật',
                    'Tiềm năng mở rộng - Sắp có Word, PowerPoint, Google Sheets',
                  ].map((item, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '1.1rem',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>

              <Grid item xs={12} md={6}>
                <List>
                  {[
                    'Hỗ trợ tiếng Việt tự nhiên',
                    'Giải thích từng bước chi tiết',
                    'Ví dụ thực tế: kế toán, marketing, logistics',
                    'Cài trực tiếp trong Excel - Dễ dùng',
                    'Hỗ trợ 24/7 - Cập nhật thường xuyên',
                  ].map((item, idx) => (
                    <ListItem key={idx} sx={{ py: 0.5 }}>
                      <ListItemIcon>
                        <CheckCircle sx={{ color: 'white' }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={item}
                        primaryTypographyProps={{
                          color: 'white',
                          fontWeight: 500,
                          fontSize: '1.1rem',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              </Grid>
            </Grid>
          </CardContent>
        </Card>


        {/* Email Signup */}
        <Card
          sx={{
            borderRadius: 3,
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
            mb: 8,
          }}
        >
          <CardContent sx={{ p: { xs: 3, md: 5 }, textAlign: 'center' }}>
            <Email sx={{ fontSize: 50, color: '#10b981', mb: 2 }} />
            <Typography variant="h5" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
              Nhận Bản Cập Nhật Mới Nhất
            </Typography>
            <Typography variant="body1" sx={{ color: '#6b7280', mb: 4 }}>
              Đăng ký để nhận thông báo về tính năng mới, tips & tricks, và ưu đãi đặc biệt
            </Typography>

            <Box
              component="form"
              onSubmit={handleEmailSubmit}
              sx={{ maxWidth: '500px', mx: 'auto' }}
            >
              <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                <TextField
                  fullWidth
                  type="email"
                  placeholder="email@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: 2,
                    },
                  }}
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  sx={{
                    backgroundColor: '#10b981',
                    color: 'white',
                    px: 4,
                    borderRadius: 2,
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                    '&:hover': {
                      backgroundColor: '#059669',
                    },
                  }}
                >
                  Đăng Ký
                </Button>
              </Box>

              {submitted && (
                <Alert severity="success" sx={{ mt: 2 }}>
                  ✅ Đăng ký thành công! Check email để xác nhận.
                </Alert>
              )}
            </Box>
          </CardContent>
        </Card>

        {/* Final CTA */}
        <Box
          sx={{
            textAlign: 'center',
            backgroundColor: 'white',
            borderRadius: 3,
            p: { xs: 4, md: 6 },
            boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          }}
        >
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#111827', mb: 2 }}>
            Sẵn Sàng Nâng Cấp Kỹ Năng Excel?
          </Typography>
          <Typography variant="body1" sx={{ color: '#6b7280', mb: 4 }}>
            Join 10,000+ professionals đang sử dụng AI để làm việc thông minh hơn
          </Typography>
          
          <Button
            variant="contained"
            size="large"
            startIcon={<Download />}
            onClick={() => handleDownload('Windows')}
            sx={{
              backgroundColor: '#10b981',
              color: 'white',
              px: 5,
              py: 2,
              borderRadius: 2,
              fontWeight: 700,
              fontSize: '1.2rem',
              '&:hover': {
                backgroundColor: '#059669',
                boxShadow: '0 10px 40px rgba(16, 185, 129, 0.3)',
              },
            }}
          >
            Tải Ngay Cho Windows
          </Button>

          <Typography variant="body2" sx={{ color: '#6b7280', mt: 3 }}>
            💰 Chỉ 39.000 VNĐ/tháng | ✅ Dùng thử 7 ngày | ⚡ Cài đặt trong 2 phút
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DownloadPage;

