import React from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
} from '@mui/material';
import {
  RocketLaunch,
  Analytics,
  AutoFixHigh,
  Build,
} from '@mui/icons-material';

const HeroSection: React.FC = () => {
  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        py: { xs: 8, md: 12 },
        mt: 8,
      }}
    >
      <Container maxWidth="lg">
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
            Get Work Done Faster With an AI Data Analyst! 🚀
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: '800px',
              mx: 'auto',
            }}
          >
            Create & Improve Processes With Excel AI
          </Typography>
          <Typography
            variant="h6"
            sx={{
              mb: 6,
              opacity: 0.8,
              maxWidth: '600px',
              mx: 'auto',
            }}
          >
            Get work done using Excel AI tools designed for business managers and owners.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              backgroundColor: '#ff6b35',
              color: 'white',
              px: 6,
              py: 2,
              fontSize: '1.2rem',
              fontWeight: 'bold',
              borderRadius: 3,
              textTransform: 'none',
              '&:hover': {
                backgroundColor: '#e55a2b',
              },
            }}
          >
            Get Started
          </Button>
          <Typography
            variant="body1"
            sx={{
              mt: 3,
              opacity: 0.8,
            }}
          >
            Join 280,000+ users worldwide
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mt: 8 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="fade-in-up card-hover"
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <RocketLaunch sx={{ fontSize: 48, mb: 2, color: '#ff6b35' }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Reduce manual tasks
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Create VBA & Excel forms
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="fade-in-up card-hover"
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Analytics sx={{ fontSize: 48, mb: 2, color: '#ff6b35' }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Get insights
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Ask questions & get answers
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="fade-in-up card-hover"
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <AutoFixHigh sx={{ fontSize: 48, mb: 2, color: '#ff6b35' }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Clean data
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Extract & transform data
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card
              className="fade-in-up card-hover"
              sx={{
                height: '100%',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: 3,
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-8px) scale(1.02)',
                  boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
                },
              }}
            >
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Build sx={{ fontSize: 48, mb: 2, color: '#ff6b35' }} />
                <Typography variant="h6" sx={{ mb: 2, fontWeight: 'bold' }}>
                  Build your ideas
                </Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>
                  Create custom solutions
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;