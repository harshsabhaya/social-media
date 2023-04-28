import React, { useRef, useState } from 'react';

import AdbIcon from '@mui/icons-material/Adb';
import MenuIcon from '@mui/icons-material/Menu';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Toolbar from '@mui/material/Toolbar';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { useSelector } from 'react-redux';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';
import { THEME_COLOR, TOKEN } from '../utils/config';
import { removeCookie } from '../utils/cookiesManagement';
import Dialog from './mui-components/Dialog';

const pages = ['Posts', 'Chat'];
const loginSettings = [
  {
    path: 'profile',
    name: 'Profile',
  },
  {
    path: 'logout',
    name: 'Logout',
  },
];

const logoutSettings = [
  {
    path: 'login',
    name: 'Login',
  },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const userProfile = useSelector((state) => state?.profile?.userProfile);
  const [isDialog, setDialog] = useState(false);
  const auth = useAuth();
  const headerRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const menuList = auth.isAuth ? loginSettings : logoutSettings;

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleNavigation = (route) => {
    navigate(`/${route}`);
    handleCloseNavMenu();
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleRedirect = (setting) => {
    if (setting.path === 'logout') {
      auth.setAuth('');
      removeCookie(TOKEN);
    } else if (setting?.path) {
      navigate(`/${setting.path}`);
    }
    setAnchorElUser(null);
  };

  const handleLogout = () => {};
  return (
    <>
      <AppBar position="sticky" id="navbar" ref={headerRef}>
        <Container maxWidth="xxl">
          <Toolbar disableGutters>
            {/* for mobile-view icon */}
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem key={page} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">{page}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
            <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography
              variant="h5"
              noWrap
              component="a"
              href=""
              sx={{
                mr: 2,
                display: { xs: 'flex', md: 'none' },
                flexGrow: 1,
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              LOGO
            </Typography>

            {/* for web */}
            <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
            <Typography
              variant="h6"
              noWrap
              component="a"
              onClick={() => handleNavigation()}
              sx={{
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                fontFamily: 'monospace',
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
            >
              LOGO
            </Typography>
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
              {pages.map((page) => {
                const isActive = location.pathname
                  .toLowerCase()
                  .includes(page.toLowerCase());
                return (
                  <Button
                    key={page}
                    style={{
                      backgroundColor: `${isActive ? '#e0e0e0' : ''}`,
                      color: `${isActive ? THEME_COLOR : ''}`,
                    }}
                    onClick={() => handleNavigation(page.toLowerCase())}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    {page}
                  </Button>
                );
              })}
            </Box>

            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title="Open settings">
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar
                    alt={userProfile?.firstname}
                    src="/static/images/avatar/2.jpg"
                  />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: '45px', padding: '10px' }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                {auth.isAuth && (
                  <MenuItem sx={{ justifyContent: 'center' }}>
                    <Typography textAlign="center">
                      {userProfile?.firstname} {userProfile?.lastname}
                    </Typography>
                  </MenuItem>
                )}
                {menuList.map((setting) => (
                  <MenuItem
                    sx={{ justifyContent: 'center' }}
                    key={setting.path}
                    onClick={() => handleRedirect(setting)}
                  >
                    <Typography textAlign="center">{setting.name}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          </Toolbar>
        </Container>
        <Dialog
          open={isDialog}
          title={'Hello'}
          subTitle={'how are u?'}
          handleClose={() => setDialog(!isDialog)}
          handleSubmit={handleLogout}
        />
      </AppBar>
      <Outlet context={headerRef.current} />
    </>
  );
}
export default Header;
