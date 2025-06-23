import React, { useEffect, useState } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, TextField, Button } from '@mui/material';
import { api } from '../services/api';
import DeliveryChart from '../components/DeliveryChart';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [startDate, setStartDate] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 30);
    return d.toISOString().slice(0, 10);
  });
  const [endDate, setEndDate] = useState(() => {
    const d = new Date();
    return d.toISOString().slice(0, 10);
  });
  const [dateError, setDateError] = useState('');

  const fetchStats = (start, end) => {
    setLoading(true);
    setError(null);
    api.get(`/api/delivery-stats/?start=${start}&end=${end}`)
      .then(res => {
        setStats(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Ошибка загрузки статистики');
        setLoading(false);
      });
  };

  const fetchTable = (start, end) => {
    setTableLoading(true);
    setTableError(null);
    api.get(`/api/delivery-table/?start=${start}&end=${end}`)
      .then(res => {
        setTableData(res.data);
        setTableLoading(false);
      })
      .catch(err => {
        setTableError('Ошибка загрузки таблицы');
        setTableLoading(false);
      });
  };

  const handleShow = () => {
    fetchStats(startDate, endDate);
    fetchTable(startDate, endDate);
    setPage(0);
  };

  const validateDates = (start, end) => {
    if (!start || !end) return 'Обе даты должны быть выбраны';
    const startD = new Date(start);
    const endD = new Date(end);
    if (isNaN(startD) || isNaN(endD)) return 'Некорректный формат даты';
    if (startD > endD) return 'Начальная дата не может быть позже конечной';
    return '';
  };

  useEffect(() => {
    setDateError(validateDates(startDate, endDate));
  }, [startDate, endDate]);

  useEffect(() => {
    fetchStats(startDate, endDate);
    fetchTable(startDate, endDate);
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Отчёт по доставкам за последние 30 дней
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <TextField
            label="Начальная дата"
            type="date"
            size="small"
            value={startDate}
            onChange={e => setStartDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            label="Конечная дата"
            type="date"
            size="small"
            value={endDate}
            onChange={e => setEndDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
          />
          <Button variant="contained" onClick={handleShow} disabled={!!dateError}>Показать</Button>
        </Box>
        {dateError ? (
          <Typography color="error" sx={{ mb: 2 }}>{dateError}</Typography>
        ) : loading ? (
          <CircularProgress />
        ) : error ? (
          <Typography color="error">{error}</Typography>
        ) : (
          <DeliveryChart data={stats} />
        )}
      </Box>
      <Box>
        <Typography variant="h6" fontWeight="bold" gutterBottom>
          Таблица доставок за выбранный период
        </Typography>
        {dateError ? null : tableLoading ? (
          <CircularProgress />
        ) : tableError ? (
          <Typography color="error">{tableError}</Typography>
        ) : tableData.length === 0 ? (
          <Typography>Нет данных</Typography>
        ) : (
          <>
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
                  {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                    <TableRow key={idx + page * rowsPerPage}>
                      <TableCell>{row.delivery_date}</TableCell>
                      <TableCell>{row.vehicle_model}</TableCell>
                      <TableCell>{row.service}</TableCell>
                      <TableCell>{row.distance}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              component="div"
              count={tableData.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={e => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              rowsPerPageOptions={[10, 20, 100]}
              labelRowsPerPage="Строк на странице:"
            />
          </>
        )}
      </Box>
    </Box>
  );
};

export default Home;
