import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { api } from '../services/api';
import DeliveryChart from '../components/DeliveryChart';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    api.get('/api/delivery-stats/')
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки статистики');
        setLoading(false);
      });
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Отчёт по доставкам за последние 30 дней
        </Typography>
        {loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <DeliveryChart data={stats} />
        )}
      </Box>
    </Box>
  );
};

export default Home;
