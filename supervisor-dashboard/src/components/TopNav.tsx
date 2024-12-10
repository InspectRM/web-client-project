// src/components/TopNav.tsx
import React from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  InputBase,
  Box,
  Avatar,
  Menu,
  MenuItem,
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsIcon from '@mui/icons-material/Notifications';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { fetchUsers } from '../services/api';

interface TopNavProps {
  onDrawerToggle: () => void;
}

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute' as const,
  pointerEvents: 'none' as const,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // Vertical padding + font size from SearchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const TopNav: React.FC<TopNavProps> = ({ onDrawerToggle }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [user, setUser] = React.useState<any>(null);

  React.useEffect(() => {
    const getUser = async () => {
      try {
        const response = await fetchUsers();
        setUser(response.data[0]); // Assuming the first user is the logged-in user
      } catch (error) {
        console.error('Error fetching user:', error);
        // Simulate user data if API call fails
        setUser({
          id: '1',
          name: 'John Doe',
          avatar: 'https://i.pravatar.cc/150?img=3',
        });
      }
    };

    getUser();
  }, []);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuId = 'primary-search-account-menu';

  return (
    <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
      <Toolbar>
        {/* Menu Button to Toggle Sidebar */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onDrawerToggle}
          sx={{ mr: 2 }}
        >
          <MenuIcon />
        </IconButton>

        {/* Search Bar */}
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
        </Search>

        <Box sx={{ flexGrow: 1 }} />

        {/* Notification and Profile Icons */}
        <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center' }}>
          <IconButton size="large" aria-label="show notifications" color="inherit">
            <NotificationsIcon />
          </IconButton>
          <Typography variant="body1" sx={{ marginLeft: 2, marginRight: 2 }}>
            {user ? user.name : 'Loading...'}
          </Typography>
          <IconButton
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <Avatar alt={user ? user.name : 'User'} src={user ? user.avatar : '/images/avatar.jpg'} />
          </IconButton>
        </Box>

        {/* Responsive Menu Icon for Mobile */}
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton size="large" aria-label="show more" aria-controls={menuId} aria-haspopup="true" color="inherit">
            <MoreVertIcon />
          </IconButton>
        </Box>
      </Toolbar>

      {/* Profile Dropdown Menu */}
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
      </Menu>
    </AppBar>
  );
};

export default TopNav;
