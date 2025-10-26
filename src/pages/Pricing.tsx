import React from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Check,
  Star,
  Business,
  School,
} from '@mui/icons-material';

const Pricing: React.FC = () => {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: '/month',
      description: 'Perfect for getting started with AI Excel tools',
      features: [
        '5 Excel formula generations per month',
        'Basic AI data analysis',
        'Community support',
        'Standard templates',
        'Basic tutorials',
      ],
      buttonText: 'Get Started Free',
      buttonVariant: 'outlined' as const,
      popular: false,
    },
    {
      name: 'Standard',
      price: '$29',
      period: '/month',
      description: 'Most popular for individuals and small teams',
      features: [
        'Unlimited Excel formula generations',
        'Advanced AI data analysis',
        'Excel Add-in included',
        'Priority support',
        'All templates and tutorials',
        'VBA script generation',
        'Google Sheets integration',
        'Data visualization tools',
      ],
      buttonText: 'Start Free Trial',
      buttonVariant: 'contained' as const,
      popular: true,
    },
    {
      name: 'Professional',
      price: '$79',
      period: '/month',
      description: 'Advanced features for growing businesses',
      features: [
        'Everything in Standard',
        'Custom AI model training',
        'API access',
        'White-label solutions',
        'Dedicated account manager',
        'Custom integrations',
        'Advanced analytics',
        'Team collaboration tools',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outlined' as const,
      popular: false,
    },
    {
      name: 'Enterprise',
      price: 'Custom',
      period: '',
      description: 'Tailored solutions for large organizations',
      features: [
        'Everything in Professional',
        'On-premise deployment',
        'Custom security requirements',
        'SLA guarantee',
        'Training and onboarding',
        'Custom development',
        '24/7 phone support',
        'Advanced compliance',
      ],
      buttonText: 'Contact Sales',
      buttonVariant: 'outlined' as const,
      popular: false,
    },
  ];

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
            Simple, Transparent Pricing
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
            Choose the plan that fits your needs. All plans include our core AI Excel tools.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {plans.map((plan, index) => (
            <Grid item xs={12} sm={6} lg={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  position: 'relative',
                  borderRadius: 3,
                  transition: 'transform 0.3s ease',
                  border: plan.popular ? '2px solid #1976d2' : '1px solid #e0e0e0',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  },
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: -12,
                      left: '50%',
                      transform: 'translateX(-50%)',
                      backgroundColor: '#1976d2',
                      color: 'white',
                      px: 3,
                      py: 1,
                      borderRadius: 2,
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                    }}
                  >
                    <Star sx={{ fontSize: 16, mr: 1, verticalAlign: 'middle' }} />
                    Most Popular
                  </Box>
                )}
                <CardContent sx={{ p: 4 }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 'bold',
                      mb: 1,
                      color: '#333',
                    }}
                  >
                    {plan.name}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 2 }}>
                    <Typography
                      variant="h2"
                      sx={{
                        fontWeight: 'bold',
                        color: '#1976d2',
                        fontSize: '3rem',
                      }}
                    >
                      {plan.price}
                    </Typography>
                    <Typography
                      variant="h6"
                      sx={{
                        color: '#666',
                        ml: 1,
                      }}
                    >
                      {plan.period}
                    </Typography>
                  </Box>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: '#666',
                    }}
                  >
                    {plan.description}
                  </Typography>
                  
                  <List sx={{ mb: 4 }}>
                    {plan.features.map((feature, featureIndex) => (
                      <ListItem key={featureIndex} sx={{ px: 0, py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <Check sx={{ color: '#4caf50', fontSize: 20 }} />
                        </ListItemIcon>
                        <ListItemText
                          primary={feature}
                          sx={{
                            '& .MuiListItemText-primary': {
                              fontSize: '0.9rem',
                              color: '#333',
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>

                  <Button
                    variant={plan.buttonVariant}
                    fullWidth
                    size="large"
                    sx={{
                      backgroundColor: plan.buttonVariant === 'contained' ? '#1976d2' : 'transparent',
                      color: plan.buttonVariant === 'contained' ? 'white' : '#1976d2',
                      borderColor: '#1976d2',
                      py: 1.5,
                      fontSize: '1.1rem',
                      fontWeight: 'bold',
                      borderRadius: 2,
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: plan.buttonVariant === 'contained' ? '#1565c0' : 'rgba(25, 118, 210, 0.04)',
                      },
                    }}
                  >
                    {plan.buttonText}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
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
            Trusted by teams at
          </Typography>
          <Grid container spacing={4} sx={{ justifyContent: 'center' }}>
            <Grid item xs={6} sm={3} md={2}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                }}
              >
                <Business sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Fortune 500
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                }}
              >
                <School sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Universities
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                }}
              >
                <Business sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Startups
                </Typography>
              </Card>
            </Grid>
            <Grid item xs={6} sm={3} md={2}>
              <Card
                sx={{
                  p: 3,
                  textAlign: 'center',
                  borderRadius: 2,
                  backgroundColor: '#f8f9fa',
                }}
              >
                <Business sx={{ fontSize: 48, color: '#1976d2', mb: 1 }} />
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                  Agencies
                </Typography>
              </Card>
            </Grid>
          </Grid>
        </Box>

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 3,
              color: '#333',
            }}
          >
            Questions about pricing?
          </Typography>
          <Typography
            variant="body1"
            sx={{
              color: '#666',
              mb: 4,
            }}
          >
            Contact our sales team to discuss custom pricing for your organization.
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
            Contact Sales
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default Pricing;
