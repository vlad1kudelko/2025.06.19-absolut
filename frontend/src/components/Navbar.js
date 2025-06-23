import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import Box from '@mui/material/Box';

const navItems = [
  { name: 'Главная', href: '/', icon: <HomeIcon /> },
  { name: 'Войти', href: '/login', icon: <PersonIcon /> },
];

const Navbar = () => {
  const location = useLocation();

  return (
    <AppBar position="static" color="default" enableColorOnDark>
      <Toolbar>
        <Typography variant="h6" component={Link} to="/" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit', fontWeight: 'bold' }}>
          Absolut
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          {navItems.map((item) => (
            <IconButton
              key={item.name}
              component={Link}
              to={item.href}
              color={location.pathname === item.href ? 'primary' : 'inherit'}
              sx={{
                borderRadius: 2,
                bgcolor: location.pathname === item.href ? 'action.selected' : 'transparent',
                '&:hover': { bgcolor: 'action.hover' },
                px: 2,
                py: 1,
                transition: 'background 0.2s',
              }}
            >
              {item.icon}
              <Typography variant="body2" sx={{ ml: 1, color: 'inherit', fontWeight: 500 }}>
                {item.name}
              </Typography>
            </IconButton>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
