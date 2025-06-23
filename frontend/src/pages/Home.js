import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { api } from '../services/api';
import DeliveryChart from '../components/DeliveryChart';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState(null);

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

  useEffect(() => {
    api.get('/api/delivery-table/')
      .then(res => {
        setTableData(res.data);
        setTableLoading(false);
      })
      .catch(err => {
        setTableError('Ошибка загрузки таблицы');
        setTableLoading(false);
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
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Таблица доставок за последние 30 дней
        </Typography>
        {tableLoading ? (
          <CircularProgress />
        ) : tableError ? (
          <Typography color="error">{tableError}</Typography>
        ) : tableData.length === 0 ? (
          <Typography>Нет данных</Typography>
        ) : (
          <TableContainer component={Paper}>
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Дата доставки</TableCell>
                  <TableCell>Модель ТС</TableCell>
                  <TableCell>Услуга</TableCell>
                  <TableCell>Дистанция (км)</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tableData.map((row, idx) => (
                  <TableRow key={idx}>
                    <TableCell>{row.delivery_date}</TableCell>
                    <TableCell>{row.vehicle_model}</TableCell>
                    <TableCell>{row.service}</TableCell>
                    <TableCell>{row.distance}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};

export default Home;
