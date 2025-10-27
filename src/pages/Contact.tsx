import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
} from '@mui/material';
import {
  Email,
  Phone,
  LocationOn,
  Send,
} from '@mui/icons-material';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

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
            Liên hệ với chúng tôi
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
            Có câu hỏi hoặc cần hỗ trợ? Chúng tôi luôn sẵn sàng giúp đỡ bạn!
          </Typography>
        </Box>

        <Grid container spacing={6}>
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                color: '#111827',
              }}
            >
              Gửi tin nhắn
            </Typography>
            <Box component="form" onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Họ và tên"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Công ty/Trường (không bắt buộc)"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Nội dung tin nhắn"
                    name="message"
                    multiline
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    required
                    variant="outlined"
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: 2,
                      },
                    }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    size="large"
                    startIcon={<Send />}
                    sx={{
                      backgroundColor: '#10b981',
                      color: 'white',
                      px: 6,
                      py: 2,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: 3,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: '#059669',
                      },
                    }}
                  >
                    Gửi tin nhắn
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </Grid>

          <Grid item xs={12} lg={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 4,
                color: '#333',
              }}
            >
              Get in touch
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Email sx={{ fontSize: 32, color: '#1976d2', mr: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Email Us
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      support@eoffice-tutor.ai
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                      We typically respond within 24 hours
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Phone sx={{ fontSize: 32, color: '#1976d2', mr: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Call Us
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      +84 123 456 789
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                      Thứ 2 - Thứ 6, 8:00 - 17:00
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12}>
                <Card
                  sx={{
                    p: 3,
                    borderRadius: 3,
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                    },
                  }}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <LocationOn sx={{ fontSize: 32, color: '#1976d2', mr: 2 }} />
                      <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                        Visit Us
                      </Typography>
                    </Box>
                    <Typography variant="body1" sx={{ color: '#666' }}>
                      EOffice Tutor AI<br />
                      Việt Nam<br />
                      
                    </Typography>
                    <Typography variant="body2" sx={{ color: '#999', mt: 1 }}>
                      Liên hệ qua email hoặc form
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#333',
            }}
          >
            Frequently Asked Questions
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              maxWidth: '600px',
              mx: 'auto',
              mb: 4,
            }}
          >
            Can't find what you're looking for? Check out our FAQ section or contact us directly.
    </Typography>
          <Button
            variant="outlined"
            size="large"
            sx={{
              borderColor: '#1976d2',
              color: '#1976d2',
              px: 4,
              py: 1.5,
              fontSize: '1.1rem',
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                borderColor: '#1565c0',
                backgroundColor: 'rgba(25, 118, 210, 0.04)',
              },
            }}
          >
            View FAQ
          </Button>
        </Box>
  </Container>
    </Box>
);
};

export default Contact;