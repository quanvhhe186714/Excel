import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Rating,
} from '@mui/material';

const TestimonialsSection: React.FC = () => {
  const testimonials = [
    {
      name: 'Xian',
      role: 'Data Analyst',
      rating: 4.2,
      text: 'I use Ajelix extensively for Excel scripts – I would estimate around 95% of the time. The impact on my productivity has been remarkable. Tasks that previously consumed days of work are now completed much more efficiently. I\'ve literally saved days thanks to Ajelix!',
      date: 'Apr 8, 2025',
    },
    {
      name: 'Warren',
      role: 'Revenue & Hotel Industry',
      rating: 4.5,
      text: 'Ajelix played a crucial role in delivering a major project at work, significantly boosting efficiency by automating tasks that were previously done manually. Thanks to Ajelix, I\'ve streamlined workflows using Google Forms and Sheets, improved data tracking, and ensured team consistency—all through clean, effective code.',
      date: 'Mar 15, 2025',
    },
    {
      name: 'Federico Machabanski',
      role: 'Chief Commercial Officer & Founder',
      rating: 4.8,
      text: 'I use Ajelix mainly for creating and optimizing Excel scripts (probably 90–95% of the time), but I\'ve also found huge value in other features like formula translation between languages, task automation, and code explanation. Highly recommend—you can\'t go wrong with it!',
      date: 'Mar 22, 2025',
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: 'white' }}>
      <Container maxWidth="lg">
        <Box sx={{ textAlign: 'center', mb: 8 }}>
          <Typography
            variant="h2"
            sx={{
              fontSize: { xs: '2rem', md: '3rem' },
              fontWeight: 'bold',
              mb: 3,
              color: '#333',
            }}
          >
            See what others love about Ajelix
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2, mb: 4 }}>
            <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#ff6b35' }}>
              Great
            </Typography>
            <Rating value={4.2} precision={0.1} readOnly size="large" />
            <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
              4.2 out of 5
            </Typography>
          </Box>
        </Box>

        <Grid container spacing={4}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                    <Avatar
                      sx={{
                        width: 50,
                        height: 50,
                        backgroundColor: '#1976d2',
                        mr: 2,
                      }}
                    >
                      {testimonial.name.charAt(0)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#333' }}>
                        {testimonial.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: '#666' }}>
                        {testimonial.role}
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Rating
                    value={testimonial.rating}
                    precision={0.1}
                    readOnly
                    size="small"
                    sx={{ mb: 2 }}
                  />
                  
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 2,
                      color: '#333',
                      lineHeight: 1.6,
                      fontStyle: 'italic',
                    }}
                  >
                    "{testimonial.text}"
                  </Typography>
                  
                  <Typography
                    variant="caption"
                    sx={{
                      color: '#999',
                      display: 'block',
                      textAlign: 'right',
                    }}
                  >
                    {testimonial.date}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mt: 8 }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 4,
              color: '#333',
            }}
          >
            Social Media Is Recommending Ajelix
          </Typography>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: 4,
              flexWrap: 'wrap',
            }}
          >
            <Box
              sx={{
                backgroundColor: '#f8f9fa',
                p: 3,
                borderRadius: 2,
                minWidth: 200,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Twitter
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Trending #AjelixAI
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#f8f9fa',
                p: 3,
                borderRadius: 2,
                minWidth: 200,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                LinkedIn
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Featured Tool
              </Typography>
            </Box>
            <Box
              sx={{
                backgroundColor: '#f8f9fa',
                p: 3,
                borderRadius: 2,
                minWidth: 200,
                textAlign: 'center',
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#1976d2' }}>
                Reddit
              </Typography>
              <Typography variant="body2" sx={{ color: '#666' }}>
                Community Favorite
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default TestimonialsSection;
