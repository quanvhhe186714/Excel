import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const footerSections = [
    {
      title: 'Free Resources',
      links: [
        { text: 'Excel Formulas and Functions', href: '#' },
        { text: 'Guides and Tutorials', href: '#' },
        { text: 'Free AI Tools', href: '#' },
        { text: 'Blog', href: '#' },
      ],
    },
    {
      title: 'Top Articles',
      links: [
        { text: 'Top 10 Best BI Tools Comparison', href: '#' },
        { text: '20+ KPIs For Small Business Owners', href: '#' },
        { text: '7 Power BI Alternatives For Data Visualization', href: '#' },
        { text: '7 Self-Service BI Tools 2024', href: '#' },
        { text: 'Digital Dashboard 101 With Examples', href: '#' },
      ],
    },
    {
      title: 'Services',
      links: [
        { text: 'Excel Automation & Consulting', href: '#' },
        { text: 'Google Sheets Automation & Consulting', href: '#' },
        { text: 'Web Development', href: '#' },
        { text: 'Dynamic Report Development', href: '#' },
        { text: 'Business Data Analytics & Forecasting', href: '#' },
        { text: 'Business Process Analytics & Optimization', href: '#' },
      ],
    },
    {
      title: 'Products',
      links: [
        { text: 'Login to Ajelix', href: '#' },
        { text: 'Pricing', href: '/pricing' },
        { text: 'AI Data Analyst', href: '#' },
        { text: 'BI & Data Visualization', href: '#' },
        { text: 'Excel Formula Generator', href: '#' },
        { text: 'Excel VBA Code Debugger', href: '#' },
        { text: 'Excel Template Generator', href: '#' },
        { text: 'Excel VBA Script Generator', href: '#' },
        { text: 'Google Sheets Formula Explainer', href: '#' },
        { text: 'Google Apps Script Optimizer', href: '#' },
      ],
    },
    {
      title: 'Company',
      links: [
        { text: 'Contacts', href: '/contact' },
        { text: 'About Us', href: '/about' },
        { text: 'Release Notes', href: '#' },
        { text: 'Service Status', href: '#' },
        { text: 'Special Offers', href: '#' },
        { text: 'Support', href: '#' },
        { text: 'Privacy', href: '#' },
        { text: 'Terms', href: '#' },
        { text: 'News', href: '#' },
      ],
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: '#1a1a1a',
        color: 'white',
        py: { xs: 6, md: 8 },
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {footerSections.map((section, index) => (
            <Grid item xs={12} sm={6} lg={2.4} key={index}>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  mb: 3,
                  color: '#ff6b35',
                  fontSize: '1.1rem',
                }}
              >
                {section.title}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                {section.links.map((link, linkIndex) => (
                  <Link
                    key={linkIndex}
                    component={RouterLink}
                    to={link.href}
                    sx={{
                      color: '#ccc',
                      textDecoration: 'none',
                      fontSize: '0.9rem',
                      transition: 'color 0.3s ease',
                      '&:hover': {
                        color: '#ff6b35',
                      },
                    }}
                  >
                    {link.text}
                  </Link>
                ))}
              </Box>
            </Grid>
          ))}
        </Grid>

        <Divider sx={{ my: 4, backgroundColor: '#333' }} />

        <Box sx={{ textAlign: 'center' }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#ff6b35',
            }}
          >
            Our Brands
          </Typography>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 4, mb: 4 }}>
            <Link
              href="#"
              sx={{
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#ff6b35',
                },
              }}
            >
              ExcelPro.lv
            </Link>
            <Link
              href="#"
              sx={{
                color: '#ccc',
                textDecoration: 'none',
                fontSize: '1.1rem',
                transition: 'color 0.3s ease',
                '&:hover': {
                  color: '#ff6b35',
                },
              }}
            >
              Mailerio.com
            </Link>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#ff6b35',
              fontSize: { xs: '1.5rem', md: '2rem' },
            }}
          >
            AJelix.com - World Of Optimization
          </Typography>
          
          <Typography
            variant="h6"
            sx={{
              fontWeight: 'bold',
              mb: 2,
              color: '#ccc',
            }}
          >
            The easiest way to get expert-level analysis with AI
          </Typography>
          
          <Typography
            variant="body1"
            sx={{
              mb: 3,
              color: '#999',
            }}
          >
            Trusted by 280'000 users around the globe since 2018.
          </Typography>

          <Typography
            variant="body2"
            sx={{
              color: '#666',
            }}
          >
            © 2018 - 2025 AJELIX ® SIA
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;