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
              color: '#333',
            }}
          >
            About Ajelix AI
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: '#666',
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Empowering businesses worldwide with AI-powered Excel solutions since 2018
          </Typography>
        </Box>

        <Grid container spacing={6} sx={{ mb: 8 }}>
          <Grid item xs={12} lg={6}>
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                mb: 3,
                color: '#333',
              }}
            >
              Our Mission
            </Typography>
            <Typography
              variant="body1"
              sx={{
                mb: 3,
                color: '#666',
                lineHeight: 1.8,
                fontSize: '1.1rem',
              }}
            >
              We believe that every business should have access to powerful AI tools that can transform their data workflows. Our mission is to democratize AI-powered Excel automation, making it accessible to teams of all sizes and technical backgrounds.
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: '#666',
                lineHeight: 1.8,
                fontSize: '1.1rem',
              }}
            >
              Since 2018, we've helped over 280,000 users worldwide streamline their Excel processes, reduce manual work, and gain deeper insights from their data.
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
                  color: '#1976d2',
                  textAlign: 'center',
                }}
              >
                280,000+<br />
                <Typography variant="h4" sx={{ color: '#666', fontWeight: 'normal' }}>
                  Happy Users
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
              color: '#333',
            }}
          >
            Why Choose Ajelix?
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
                <Business sx={{ fontSize: 48, mb: 2, color: '#1976d2' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Business Focused
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Designed specifically for business managers and owners who need practical Excel solutions.
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
                <Group sx={{ fontSize: 48, mb: 2, color: '#1976d2' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Community Driven
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Built with feedback from our global community of Excel users and data professionals.
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
                <TrendingUp sx={{ fontSize: 48, mb: 2, color: '#1976d2' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Continuously Improving
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Regular updates and new features based on user needs and technological advancements.
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
                <Security sx={{ fontSize: 48, mb: 2, color: '#1976d2' }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                  Secure & Reliable
                </Typography>
                <Typography variant="body2" sx={{ color: '#666' }}>
                  Enterprise-grade security and reliability with 99.9% uptime guarantee.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#1976d2',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#1565c0',
              },
            }}
          >
            Get Started Today
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default About;