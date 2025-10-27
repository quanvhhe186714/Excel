import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Functions,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    setMobileOpen(false);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2, fontWeight: 'bold', color: '#10b981' }}>
        EOffice Tutor AI
      </Typography>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton onClick={() => scrollToSection('formula-generator')}>
          <ListItemText primary="Formula Generator" />
        </ListItemButton>
        <ListItemButton onClick={() => scrollToSection('step-by-step')}>
          <ListItemText primary="Step by Step" />
        </ListItemButton>
        <ListItemButton component={Link} to="/about">
          <ListItemText primary="About" />
        </ListItemButton>
        <ListItemButton component={Link} to="/contact">
          <ListItemText primary="Contact" />
        </ListItemButton>
      </List>
    </Box>
  );

  return (
    <>
      <AppBar 
        position="fixed" 
        sx={{ 
          backgroundColor: 'rgba(255, 255, 255, 0.95)', 
          backdropFilter: 'blur(10px)',
          color: 'black', 
          boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <Toolbar>
          <Functions sx={{ fontSize: 32, color: '#10b981', mr: 1 }} />
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: '#10b981',
              textDecoration: 'none',
              fontSize: '1.5rem',
            }}
          >
            EOffice Tutor AI
          </Typography>

          {isMobile ? (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Button
                color="inherit"
                onClick={() => scrollToSection('formula-generator')}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Formula Generator
              </Button>
              <Button
                color="inherit"
                onClick={() => scrollToSection('step-by-step')}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Step by Step
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/about"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                About
              </Button>
              <Button
                color="inherit"
                component={Link}
                to="/contact"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Contact
              </Button>
              <Button
                variant="contained"
                onClick={() => scrollToSection('formula-generator')}
                sx={{
                  backgroundColor: '#10b981',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 600,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#059669',
                  },
                }}
              >
                Try Now
              </Button>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
