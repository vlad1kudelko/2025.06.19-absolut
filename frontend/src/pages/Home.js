import React from 'react';
import { Box, Typography } from '@mui/material';

const Home = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Box textAlign="center">
        <Typography variant="h3" fontWeight="bold" gutterBottom>
          Добро пожаловать в Absolut
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth={600} mx="auto">
          Здесь в будущем будет отображаться статистика по базе с фильтром.
        </Typography>
      </Box>
    </Box>
  );
};

export default Home;
