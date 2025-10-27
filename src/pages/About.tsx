import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Business,
  Group,
  TrendingUp,
  Security,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const About: React.FC = () => {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, mt: 8 }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '2.5rem', md: '4rem' },
              fontWeight: 'bold',
              mb: 3,
              color: '#111827',
            }}
          >
            Về EOffice Tutor AI
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: '#6b7280',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Trợ lý AI thông minh giúp mọi người làm việc với Excel hiệu quả hơn
          </Typography>
        </Box>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: '#111827',
              }}
            >
              Sứ mệnh
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: '#6b7280',
                lineHeight: 1.8,
                fontSize: '1.1rem',
              }}
            >
              Chúng tôi tin rằng mọi người đều xứng đáng có một công cụ AI mạnh mẽ giúp đơn giản hóa công việc với Excel. 
              EOffice Tutor AI được tạo ra để giúp sinh viên, nhân viên văn phòng, và các chuyên gia làm việc hiệu quả hơn.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#6b7280',
                lineHeight: 1.8,
                fontSize: '1.1rem',
              }}
            >
              Với công nghệ AI tiên tiến, chúng tôi giúp bạn tạo công thức Excel phức tạp chỉ trong vài giây, 
              tiết kiệm thời gian và giảm thiểu sai sót trong công việc hàng ngày.
            </Typography>
          </Grid>
          <Grid item xs={12} lg={6}>
            <Box
              sx={{
                backgroundColor: '#f8f9fa',
                p: 4,
                borderRadius: 3,
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Typography
                variant="h2"
                sx={{
                  fontWeight: 'bold',
                  color: '#10b981',
                  textAlign: 'center',
                }}
              >
                AI Powered<br />
                <Typography variant="h4" sx={{ color: '#6b7280', fontWeight: 'normal' }}>
                  Formula Generator
                </Typography>
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              color: '#111827',
            }}
          >
            Tại sao chọn EOffice Tutor AI?
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Business sx={{ fontSize: 48, mb: 2, color: '#10b981' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Dễ sử dụng
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Giao diện đơn giản, thân thiện. Chỉ cần mô tả bằng tiếng Việt, AI sẽ tạo công thức cho bạn.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Group sx={{ fontSize: 48, mb: 2, color: '#10b981' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Chính xác
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  AI được training kỹ lưỡng, đảm bảo tạo ra công thức Excel chính xác và tối ưu.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <TrendingUp sx={{ fontSize: 48, mb: 2, color: '#10b981' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Học & phát triển
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Không chỉ tạo công thức, còn giải thích cách hoạt động để bạn học hỏi thêm.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                height: '100%',
                p: 3,
                borderRadius: 3,
                textAlign: 'center',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <CardContent>
                <Security sx={{ fontSize: 48, mb: 2, color: '#10b981' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Miễn phí
                </Typography>
                <Typography variant="body2" sx={{ color: '#6b7280' }}>
                  Sử dụng miễn phí các tính năng cơ bản. Không cần đăng ký hay cung cấp thẻ tín dụng.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            component={RouterLink}
            to="/"
            sx={{
              backgroundColor: '#10b981',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#059669',
              },
            }}
          >
            Dùng thử ngay
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;