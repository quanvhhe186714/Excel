import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Menu,
  MenuItem,
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
  ExpandMore,
} from '@mui/icons-material';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [dataVizAnchor, setDataVizAnchor] = useState<null | HTMLElement>(null);
  const [toolsAnchor, setToolsAnchor] = useState<null | HTMLElement>(null);
  const [resourcesAnchor, setResourcesAnchor] = useState<null | HTMLElement>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuClose = () => {
    setDataVizAnchor(null);
    setToolsAnchor(null);
    setResourcesAnchor(null);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h6" sx={{ my: 2 }}>
        Ajelix AI
      </Typography>
      <List>
        <ListItemButton component={Link} to="/">
          <ListItemText primary="Home" />
        </ListItemButton>
        <ListItemButton component={Link} to="/pricing">
          <ListItemText primary="Pricing" />
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
      <AppBar position="fixed" sx={{ backgroundColor: 'white', color: 'black', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}>
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              flexGrow: 1,
              fontWeight: 'bold',
              color: '#1976d2',
              textDecoration: 'none',
              fontSize: '1.5rem',
            }}
          >
            Ajelix AI
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
                onClick={(e) => setDataVizAnchor(e.currentTarget)}
                endIcon={<ExpandMore />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Data Visualization
              </Button>
              <Menu
                anchorEl={dataVizAnchor}
                open={Boolean(dataVizAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1, minWidth: 200 }
                }}
              >
                <MenuItem onClick={handleMenuClose}>Connect Your Data</MenuItem>
                <MenuItem onClick={handleMenuClose}>Visualization</MenuItem>
                <MenuItem onClick={handleMenuClose}>Data Preparation</MenuItem>
                <MenuItem onClick={handleMenuClose}>AI Data Analytics</MenuItem>
              </Menu>

              <Button
                color="inherit"
                onClick={(e) => setToolsAnchor(e.currentTarget)}
                endIcon={<ExpandMore />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Tools
              </Button>
              <Menu
                anchorEl={toolsAnchor}
                open={Boolean(toolsAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1, minWidth: 250 }
                }}
              >
                <MenuItem onClick={handleMenuClose}>AI Data Analyst</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel Formula Generator</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel Formula Explainer</MenuItem>
                <MenuItem onClick={handleMenuClose}>Google Apps Script Generator</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel VBA Script Explainer</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel VBA Script Generator</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel VBA Code Optimizer</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel VBA Code Debugger</MenuItem>
                <MenuItem onClick={handleMenuClose}>Google Sheets Formula Generator</MenuItem>
                <MenuItem onClick={handleMenuClose}>Google Apps Script Explainer</MenuItem>
                <MenuItem onClick={handleMenuClose}>Google Sheets Formula Explainer</MenuItem>
                <MenuItem onClick={handleMenuClose}>Google Apps Script Optimizer</MenuItem>
                <MenuItem onClick={handleMenuClose}>Google Apps Script Debugger</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel File Translator</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel Template Generator</MenuItem>
                <MenuItem onClick={handleMenuClose}>Excel Add-in</MenuItem>
                <MenuItem onClick={handleMenuClose}>Your Virtual AI Assistant For Excel Spreadsheets</MenuItem>
                <MenuItem onClick={handleMenuClose}>AI Answer Generator</MenuItem>
                <MenuItem onClick={handleMenuClose}>AI Math Solver</MenuItem>
                <MenuItem onClick={handleMenuClose}>AI Graph Generator</MenuItem>
                <MenuItem onClick={handleMenuClose}>AI SQL Generator</MenuItem>
              </Menu>

              <Button
                color="inherit"
                component={Link}
                to="/pricing"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Pricing
              </Button>

              <Button
                color="inherit"
                onClick={(e) => setResourcesAnchor(e.currentTarget)}
                endIcon={<ExpandMore />}
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Resources
              </Button>
              <Menu
                anchorEl={resourcesAnchor}
                open={Boolean(resourcesAnchor)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: { mt: 1, minWidth: 200 }
                }}
              >
                <MenuItem onClick={handleMenuClose}>Guides and Tutorials</MenuItem>
                <MenuItem onClick={handleMenuClose}>Formulas and Functions</MenuItem>
                <MenuItem onClick={handleMenuClose}>Release Notes</MenuItem>
              </Menu>

              <Button
                color="inherit"
                sx={{ textTransform: 'none', fontWeight: 500 }}
              >
                Log in
              </Button>
              <Button
                variant="contained"
                sx={{
                  backgroundColor: '#1976d2',
                  color: 'white',
                  textTransform: 'none',
                  fontWeight: 500,
                  px: 3,
                  py: 1,
                  borderRadius: 2,
                  '&:hover': {
                    backgroundColor: '#1565c0',
                  },
                }}
              >
                Start Free
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
