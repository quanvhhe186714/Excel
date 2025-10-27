import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  CheckCircle,
  School,
  Translate,
  AutoAwesome,
} from '@mui/icons-material';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <CheckCircle sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'Chính xác & Đáng tin cậy',
      description: 'AI được training trên hàng ngàn công thức Excel, đảm bảo độ chính xác cao và phù hợp với mọi tình huống.',
    },
    {
      icon: <School sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'Học & Phát triển',
      description: 'Không chỉ tạo công thức, còn giải thích chi tiết cách hoạt động để bạn học hỏi và áp dụng.',
    },
    {
      icon: <Translate sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'Hỗ trợ Tiếng Việt',
      description: 'Giao tiếp hoàn toàn bằng tiếng Việt, dễ dàng mô tả yêu cầu của bạn một cách tự nhiên.',
    },
    {
      icon: <AutoAwesome sx={{ fontSize: 48, color: '#10b981' }} />,
      title: 'AI thông minh',
      description: 'Công nghệ AI tiên tiến hiểu ngữ cảnh và tạo ra công thức tối ưu nhất cho nhu cầu của bạn.',
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 3,
              color: '#111827',
            }}
          >
            Tại sao chọn EOffice Tutor AI?
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
            Giải pháp AI mạnh mẽ giúp bạn làm việc với Excel hiệu quả hơn
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: '#f9fafb',
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  border: '1px solid #e5e7eb',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 25px rgba(16,185,129,0.15)',
                    borderColor: '#10b981',
                  },
                }}
              >
                <CardContent sx={{ textAlign: 'center' }}>
                  <Box sx={{ mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      color: '#111827',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#6b7280',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 10, textAlign: 'center', p: 6, backgroundColor: '#f0fdf4', borderRadius: 4 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#111827',
            }}
          >
            Dành cho mọi người
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#6b7280',
              maxWidth: '800px',
              mx: 'auto',
              lineHeight: 1.8,
            }}
          >
            Dù bạn là sinh viên, nhân viên văn phòng, hay chuyên gia dữ liệu - EOffice Tutor AI giúp bạn 
            tạo công thức Excel nhanh chóng và chính xác. Không cần kinh nghiệm sâu về Excel, 
            chỉ cần mô tả những gì bạn muốn và để AI làm phần còn lại.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
