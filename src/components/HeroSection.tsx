import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
} from '@mui/material';
import {
  Functions,
  Speed,
  SmartToy,
  TrendingUp,
} from '@mui/icons-material';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        color: 'white',
        py: { xs: 10, md: 14 },
        mt: 8,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px',
          opacity: 0.3,
        }}
      />
      
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 3,
              lineHeight: 1.2,
            }}
          >
            Tạo Công Thức Excel Bằng AI
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.95,
              maxWidth: '800px',
              mx: 'auto',
              fontWeight: 400,
            }}
          >
            EOffice Tutor AI - Trợ lý AI thông minh giúp bạn tạo công thức Excel phức tạp chỉ trong vài giây
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 6,
              opacity: 0.9,
              maxWidth: '700px',
              mx: 'auto',
              fontWeight: 300,
            }}
          >
            Chỉ cần mô tả những gì bạn muốn làm, AI sẽ tự động tạo công thức Excel chính xác cho bạn
          </Typography>
          <Button
            variant="contained"
            size="large"
            href="#formula-generator"
            sx={{
              backgroundColor: 'white',
              color: '#10b981',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              '&:hover': {
                backgroundColor: '#f0fdf4',
                transform: 'translateY(-2px)',
                boxShadow: '0 6px 25px rgba(0,0,0,0.25)',
              },
              transition: 'all 0.3s ease',
            }}
          >
            Dùng thử ngay - Miễn phí
          </Button>
        </Box>

        <Grid container spacing={3} sx={{ mt: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Functions sx={{ fontSize: 56, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Công thức phức tạp
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Tạo mọi công thức từ đơn giản đến nâng cao
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <Speed sx={{ fontSize: 56, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Nhanh chóng
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Tiết kiệm hàng giờ làm việc thủ công
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <SmartToy sx={{ fontSize: 56, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                AI thông minh
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Hiểu ngôn ngữ tự nhiên của bạn
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Box sx={{ textAlign: 'center' }}>
              <TrendingUp sx={{ fontSize: 56, mb: 2 }} />
              <Typography variant="h6" sx={{ mb: 1, fontWeight: 600 }}>
                Giải thích chi tiết
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Hiểu rõ cách công thức hoạt động
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;