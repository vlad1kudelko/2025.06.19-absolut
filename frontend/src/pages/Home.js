import React from 'react';
import { Link } from 'react-router-dom';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import CategoryIcon from '@mui/icons-material/Category';
import BarChartIcon from '@mui/icons-material/BarChart';
import { Card, CardContent, Typography, Box, Grid, CardActionArea } from '@mui/material';

const features = [
  {
    name: 'Управление элементами',
    description: 'Создавайте, редактируйте и управляйте элементами вашего каталога',
    icon: <Inventory2Icon color="primary" sx={{ fontSize: 40 }} />,
    href: '/items',
  },
  {
    name: 'Категории',
    description: 'Организуйте контент с помощью системы категорий',
    icon: <CategoryIcon color="secondary" sx={{ fontSize: 40 }} />,
    href: '/categories',
  },
  {
    name: 'Аналитика',
    description: 'Отслеживайте статистику и аналитику вашего приложения',
    icon: <BarChartIcon color="success" sx={{ fontSize: 40 }} />,
    href: '/analytics',
  },
];

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      {/* Hero Section */}
      <Box textAlign="center">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Добро пожаловать в Absolut
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
          Современная платформа для управления контентом с использованием Django, React и PostgreSQL
        </Typography>
      </Box>

      {/* Features Grid */}
      <Grid container spacing={3} justifyContent="center">
        {features.map((feature) => (
          <Grid item xs={12} md={4} key={feature.name}>
            <Card sx={{ height: '100%' }}>
              <CardActionArea component={Link} to={feature.href} sx={{ height: '100%' }}>
                <CardContent>
                  <Box display="flex" alignItems="center" mb={2}>
                    {feature.icon}
                    <Typography variant="h6" fontWeight={600} ml={2}>
                      {feature.name}
                    </Typography>
                  </Box>
                  <Typography color="text.secondary">{feature.description}</Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Stats Section */}
      <Card sx={{ mt: 4, bgcolor: 'background.paper', borderRadius: 3, boxShadow: 3 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            Статистика
          </Typography>
          <Grid container spacing={3} justifyContent="center">
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h4" color="primary" fontWeight="bold">150+</Typography>
              <Typography color="text.secondary">Элементов</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h4" color="success.main" fontWeight="bold">25+</Typography>
              <Typography color="text.secondary">Категорий</Typography>
            </Grid>
            <Grid item xs={12} md={4} textAlign="center">
              <Typography variant="h4" color="secondary" fontWeight="bold">1000+</Typography>
              <Typography color="text.secondary">Пользователей</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Home;
