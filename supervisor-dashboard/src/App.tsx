import React, { useState } from 'react';
import { Box, CssBaseline, Toolbar, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import SideNav from './components/SideNav';
import TopNav from './components/TopNav';
import Dashboard from './components/Dashboard';
import { styled } from '@mui/material/styles';

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })<{
  open: boolean;
  drawerWidth: number;
}>(({ theme, open, drawerWidth }) => ({
  flexGrow: 1,
  backgroundColor: theme.palette.background.default,
  padding: theme.spacing(3),
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 0,
  width: '100%',
  ...(open && {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: `0px`,
    width: `calc(100% - ${drawerWidth}px)`,
  }),
}));

function App() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState<boolean>(false);
  const [desktopOpen, setDesktopOpen] = useState<boolean>(true);
  const [drawerWidth, setDrawerWidth] = useState<number>(240); // Dynamically set drawerWidth

  const handleDrawerToggle = () => {
    if (isMobile) {
      setMobileOpen(!mobileOpen);
      setDrawerWidth(mobileOpen ? 0 : 240); // Update drawerWidth for mobile
    } else {
      setDesktopOpen(!desktopOpen);
      setDrawerWidth(desktopOpen ? 0 : 240); // Update drawerWidth for desktop
    }
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      {/* Top Navigation Bar */}
      <TopNav onDrawerToggle={handleDrawerToggle} />

      {/* Sidebar Navigation */}
      <SideNav
        variant={isMobile ? 'temporary' : 'persistent'}
        open={isMobile ? mobileOpen : desktopOpen}
        onClose={handleDrawerToggle}
        drawerWidth={drawerWidth}
      />

      {/* Main Content Area */}
      <Main open={!isMobile && desktopOpen} drawerWidth={drawerWidth}>
        <Toolbar />
        <Dashboard />
      </Main>
    </Box>
  );
}

export default App;
