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
  Speed,
  Analytics,
  Transform,
  Build,
  Chat,
  Insights,
  FileUpload,
  BugReport,
  Science,
} from '@mui/icons-material';

const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Speed sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'Automate Your Spreadsheets With Excel AI',
      description: 'Upload your existing files into the AI chatbot and generate custom forms for your business processes, like lead tracking forms or sales calculators. Transform tedious, repetitive tasks into automated workflows with the power of AI-generated VBA and user-friendly forms.',
      buttonText: 'Try now',
    },
    {
      icon: <Analytics sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'AI-Powered Data Analysis',
      description: 'Stop sifting through data. Use AI to ask specific questions and receive immediate, actionable insights from your different files. AI Excel analysis for insightful answers and visualizations.',
      buttonText: 'Try now',
    },
    {
      icon: <Transform sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'AI-Driven Data Transformation',
      description: 'Take control of your data quality. AI data cleaning effortlessly cleans errors, extracts valuable information, and reshapes your data for better analysis. AI for Excel and other file formats intelligently identifies inconsistencies, extracts key information, and transforms data into the desired format.',
      buttonText: 'Try now',
    },
    {
      icon: <Build sx={{ fontSize: 48, color: '#1976d2' }} />,
      title: 'Build Custom Solutions with AI',
      description: 'Have a unique Excel challenge? Use AI as your co-pilot to build custom solutions, tailored to your specific needs and workflows. Design and implement custom solutions that perfectly fit your business needs with Excel AI.',
      buttonText: 'Try now',
    },
  ];

  const additionalFeatures = [
    {
      icon: <Chat sx={{ fontSize: 40, color: '#ff6b35' }} />,
      title: 'Speak Your Language With AI',
      description: 'Speak freely in English, Spanish, French, or technical jargon. This AI is your constant professional partner, ready 24/7 to help you analyze data and understand your needs.',
    },
    {
      icon: <Insights sx={{ fontSize: 40, color: '#ff6b35' }} />,
      title: 'Turn Raw Data Into Expert-Level Insights',
      description: 'Use conversational AI for data analysis through a simple chat interface to extract descriptive, diagnostic, predictive, and prescriptive analytics to make data-driven decisions.',
    },
    {
      icon: <FileUpload sx={{ fontSize: 40, color: '#ff6b35' }} />,
      title: 'Reduce Data Friction',
      description: 'Eliminate data headaches and handle all your file formats – PDF, Word, PowerPoint, Excel, and more – with a single tool, so you can easily manage your data and focus on things that matter.',
    },
    {
      icon: <BugReport sx={{ fontSize: 40, color: '#ff6b35' }} />,
      title: 'Eliminate Costly Data Mistakes',
      description: 'Debug your spreadsheets, fix formula mistakes, reduce errors, and gain clarity in your data using AI for Excel.',
    },
    {
      icon: <Science sx={{ fontSize: 40, color: '#ff6b35' }} />,
      title: 'Test Your Business Ideas & Assumptions',
      description: 'Easily validate projections, get financial forecasts, and test scenarios by simply chatting with AI. Quickly iterate through different business assumptions through a simple interface.',
    },
  ];

  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: '#f8f9fa' }}>
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
            280'000+ TEAMS & INDIVIDUALS ARE ALREADY ENJOYING AJELIX
          </Typography>
          <Typography
            variant="h5"
            sx={{
              mb: 4,
              color: '#666',
              fontWeight: 500,
            }}
          >
            Do it your own way—easy to start & master
          </Typography>
          <Typography
            variant="body1"
            sx={{
              maxWidth: '800px',
              mx: 'auto',
              color: '#666',
              fontSize: '1.1rem',
            }}
          >
            Excel AI tools for management teams in any industry who need help with data tasks. Easy enough to master, but fine-tuned to give insights you need.
          </Typography>
        </Box>

        <Grid container spacing={4} sx={{ mb: 8 }}>
          {features.map((feature, index) => (
            <Grid item xs={12} lg={6} key={index}>
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
                  <Box sx={{ textAlign: 'center', mb: 3 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h5"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      textAlign: 'center',
                      color: '#333',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 3,
                      color: '#666',
                      lineHeight: 1.6,
                    }}
                  >
                    {feature.description}
                  </Typography>
                  <Box sx={{ textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      sx={{
                        backgroundColor: '#1976d2',
                        color: 'white',
                        px: 4,
                        py: 1.5,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 'bold',
                        '&:hover': {
                          backgroundColor: '#1565c0',
                        },
                      }}
                    >
                      {feature.buttonText}
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography
            variant="h3"
            sx={{
              fontSize: { xs: '1.8rem', md: '2.5rem' },
              fontWeight: 'bold',
              mb: 4,
              color: '#333',
            }}
          >
            Management Teams That Work Smarter With Excel AI
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 8 }}>
          {additionalFeatures.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  p: 3,
                  borderRadius: 3,
                  backgroundColor: 'white',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.1)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-3px)',
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ textAlign: 'center', mb: 2 }}>
                    {feature.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: 'bold',
                      mb: 2,
                      textAlign: 'center',
                      color: '#333',
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: '#666',
                      lineHeight: 1.5,
                    }}
                  >
                    {feature.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ textAlign: 'center' }}>
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
            Get Started Now & Scale As You Grow
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default FeaturesSection;
