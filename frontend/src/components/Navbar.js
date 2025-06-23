import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import LogoutIcon from '@mui/icons-material/Logout';
import Box from '@mui/material/Box';

const Navbar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isAuth = Boolean(localStorage.getItem('token'));

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <AppBar position="static" color="default" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
          Absolut
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <IconButton
            component={Link}
            to="/"
            color={location.pathname === '/' ? 'primary' : 'inherit'}
            sx={{
              borderRadius: 2,
              bgcolor: location.pathname === '/' ? 'action.selected' : 'transparent',
              '&:hover': { bgcolor: 'action.hover' },
              px: 2,
              py: 1,
              transition: 'background 0.2s',
            }}
          >
            <HomeIcon />
            <Typography variant="body2" sx={{ ml: 1, color: 'inherit', fontWeight: 500 }}>
              Главная
            </Typography>
          </IconButton>
          {!isAuth ? (
            <IconButton
              component={Link}
              to="/login"
              color={location.pathname === '/login' ? 'primary' : 'inherit'}
              sx={{
                borderRadius: 2,
                bgcolor: location.pathname === '/login' ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover' },
                px: 2,
                py: 1,
                transition: 'background 0.2s',
              }}
            >
              <PersonIcon />
              <Typography variant="body2" sx={{ ml: 1, color: 'inherit', fontWeight: 500 }}>
                Войти
              </Typography>
            </IconButton>
          ) : (
            <IconButton
              onClick={handleLogout}
              color={'inherit'}
              sx={{
                borderRadius: 2,
                bgcolor: 'transparent',
                '&:hover': { bgcolor: 'action.hover' },
                px: 2,
                py: 1,
                transition: 'background 0.2s',
              }}
            >
              <LogoutIcon />
              <Typography variant="body2" sx={{ ml: 1, color: 'inherit', fontWeight: 500 }}>
                Выйти
              </Typography>
            </IconButton>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
