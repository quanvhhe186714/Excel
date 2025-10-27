import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { 
  Functions, 
  Email, 
  Info, 
  AutoAwesome,
  ListAlt,
  Home,
  School,
  Key,
} from '@mui/icons-material';
import ApiKeySetup from './ApiKeySetup';
import { hasApiKey } from '../services/geminiService';

const Footer: React.FC = () => {
  const [showApiSetup, setShowApiSetup] = useState(false);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleScrollLink = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    // Navigate to home first if not already there
    if (window.location.pathname !== '/') {
      window.location.href = '/';
      // Wait for navigation then scroll
      setTimeout(() => scrollToSection(sectionId), 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: '#111827',
        color: 'white',
        py: { xs: 6, md: 8 },
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={6}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <Functions sx={{ fontSize: 32, color: '#10b981', mr: 1 }} />
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 'bold',
                  color: '#10b981',
                }}
              >
                EOffice Tutor AI
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: '#9ca3af',
                lineHeight: 1.7,
                mb: 3,
              }}
            >
              Trợ lý AI thông minh giúp bạn tạo công thức Excel chỉ trong vài giây. 
              Nhanh chóng, chính xác và dễ sử dụng.
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: '#6b7280',
                fontSize: '0.875rem',
              }}
            >
              © 2025 EOffice Tutor AI
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: 'white',
              }}
            >
              Liên kết nhanh
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Link
                component={RouterLink}
                to="/"
                sx={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#10b981',
                  },
                }}
              >
                <Home fontSize="small" />
                Trang chủ
              </Link>
              <Link
                href="#formula-generator"
                onClick={(e) => handleScrollLink(e, 'formula-generator')}
                sx={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#10b981',
                  },
                }}
              >
                <AutoAwesome fontSize="small" />
                Formula Generator
              </Link>
              <Link
                href="#step-by-step"
                onClick={(e) => handleScrollLink(e, 'step-by-step')}
                sx={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#10b981',
                  },
                }}
              >
                <ListAlt fontSize="small" />
                Hướng dẫn Step by Step
              </Link>
              <Link
                component={RouterLink}
                to="/about"
                sx={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#10b981',
                  },
                }}
              >
                <Info fontSize="small" />
                Giới thiệu
              </Link>
              <Link
                component={RouterLink}
                to="/contact"
                sx={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'color 0.3s ease',
                  '&:hover': {
                    color: '#10b981',
                  },
                }}
              >
                <Email fontSize="small" />
                Liên hệ
              </Link>
              <Link
                onClick={() => setShowApiSetup(true)}
                sx={{
                  color: '#9ca3af',
                  textDecoration: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  transition: 'color 0.3s ease',
                  cursor: 'pointer',
                  '&:hover': {
                    color: '#10b981',
                  },
                }}
              >
                <Key fontSize="small" />
                {hasApiKey() ? 'API Key ✓' : 'Cài Đặt API'}
              </Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="h6"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: 'white',
              }}
            >
              Tính năng
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  lineHeight: 1.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <School fontSize="small" sx={{ color: '#10b981' }} />
                Hướng dẫn chi tiết từng bước
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  lineHeight: 1.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <AutoAwesome fontSize="small" sx={{ color: '#10b981' }} />
                AI tạo công thức Excel
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  lineHeight: 1.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                <Functions fontSize="small" sx={{ color: '#10b981' }} />
                Hỗ trợ Excel & Google Sheets
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  lineHeight: 1.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                ✓ Miễn phí sử dụng
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  color: '#9ca3af',
                  lineHeight: 1.8,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                }}
              >
                ✓ Kết quả nhanh chóng & chính xác
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: '#374151' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="body2"
            sx={{
              color: '#6b7280',
            }}
          >
            Made with ❤️ for Excel users | Powered by AI
          </Typography>
        </Box>
      </Container>

      {/* API Key Setup Dialog */}
      <ApiKeySetup 
        open={showApiSetup} 
        onClose={() => setShowApiSetup(false)}
      />
    </Box>
  );
};

export default Footer;