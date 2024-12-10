// src/components/SideNav.tsx
import React from 'react';
import {
  Drawer,
  List,
  ListItemButton,
  ListItemText,
  ListItemIcon,
  Typography,
  Box,
  Divider,
} from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ReportIcon from '@mui/icons-material/Report';
import SettingsIcon from '@mui/icons-material/Settings';
import PeopleIcon from '@mui/icons-material/People';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import BarChartIcon from '@mui/icons-material/BarChart';
import PieChartIcon from '@mui/icons-material/PieChart';

interface SideNavProps {
  variant: 'temporary' | 'persistent';
  open: boolean;
  onClose: () => void;
  drawerWidth: number;
}

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon /> },
  { text: 'Reports', icon: <ReportIcon /> },
  { text: 'Users', icon: <PeopleIcon /> },
  { text: 'Products', icon: <ShoppingCartIcon /> },
  { text: 'Analytics', icon: <BarChartIcon /> },
  { text: 'Settings', icon: <SettingsIcon /> },
];

const SideNav: React.FC<SideNavProps> = ({ variant, open, onClose, drawerWidth }) => {
  const drawerContent = (
    <Box
      sx={{
        width: drawerWidth,
        backgroundColor: 'background.paper',
        height: '100%',
        overflowX: 'hidden',
      }}
      role="presentation"
      onClick={variant === 'temporary' ? onClose : undefined}
      onKeyDown={variant === 'temporary' ? onClose : undefined}
    >
      <Box sx={{ padding: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          My Dashboard
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItemButton
            key={item.text}
            sx={{ paddingY: 1.5 }}
            onClick={variant === 'temporary' ? onClose : undefined} // Close drawer on mobile after selection
          >
            <ListItemIcon sx={{ color: 'inherit' }}>{item.icon}</ListItemIcon>
            <ListItemText primary={item.text} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={variant}
      open={open}
      onClose={onClose}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          color: 'text.primary',
          transition: variant === 'persistent' ? 'width 0.3s ease-in-out' : undefined,
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default SideNav;
