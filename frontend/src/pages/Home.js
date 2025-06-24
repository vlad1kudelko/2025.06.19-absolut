import React, { useEffect, useState, useRef } from 'react';
import { Box, Typography, CircularProgress, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, TablePagination, Button, Popper } from '@mui/material';
import { api } from '../services/api';
import DeliveryChart from '../components/DeliveryChart';
import { DateRange } from 'react-date-range';
import ru from 'date-fns/locale/ru';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';

const Home = () => {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableData, setTableData] = useState([]);
  const [tableLoading, setTableLoading] = useState(true);
  const [tableError, setTableError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [dateRange, setDateRange] = useState([
    {
      startDate: (() => { const d = new Date(); d.setDate(d.getDate() - 30); return d; })(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showPicker, setShowPicker] = useState(false);
  const [dateError, setDateError] = useState('');

  const startDate = dateRange[0].startDate;
  const endDate = dateRange[0].endDate;

  const anchorRef = useRef(null);

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
    fetchStats(startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10));
    fetchTable(startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10));
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
  }, [dateRange, startDate, endDate]);

  useEffect(() => {
    fetchStats(startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10));
    fetchTable(startDate.toISOString().slice(0, 10), endDate.toISOString().slice(0, 10));
    // eslint-disable-next-line
  }, []);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
      <Box>
        <Typography variant="h5" fontWeight="bold" gutterBottom>
          Отчёт по доставкам за последние 30 дней
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
          <Button variant="outlined" ref={anchorRef} onClick={() => setShowPicker(!showPicker)}>
            {startDate && endDate ? `${startDate.toLocaleDateString()} — ${endDate.toLocaleDateString()}` : 'Выбрать диапазон дат'}
          </Button>
          <Popper open={showPicker} anchorEl={anchorRef.current} placement="bottom-start" style={{ zIndex: 1300 }}>
            <Box sx={{ bgcolor: 'background.paper', boxShadow: 3, borderRadius: 2, pt: 2 }}>
              <DateRange
                editableDateInputs={true}
                onChange={item => setDateRange([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                locale={ru}
                maxDate={new Date()}
              />
              <Button variant="contained" sx={{ ml: 2 }} onClick={() => setShowPicker(false)}>ОК</Button>
            </Box>
          </Popper>
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
                    <TableCell>Дата и время отправки</TableCell>
                    <TableCell>Дата и время доставки</TableCell>
                    <TableCell>Время в пути</TableCell>
                    <TableCell>Модель ТС</TableCell>
                    <TableCell>Услуга</TableCell>
                    <TableCell>Дистанция (км)</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tableData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row, idx) => (
                    <TableRow key={idx + page * rowsPerPage}>
                      <TableCell>{row.departure_datetime ? new Date(row.departure_datetime).toLocaleString() : ''}</TableCell>
                      <TableCell>{row.arrival_datetime ? new Date(row.arrival_datetime).toLocaleString() : ''}</TableCell>
                      <TableCell>{row.transit_time ? row.transit_time : ''}</TableCell>
                      <TableCell>{row.vehicle_model ? `${row.vehicle_model.model} (${row.vehicle_model.number})` : ''}</TableCell>
                      <TableCell>{row.service && row.service.name ? row.service.name : row.service}</TableCell>
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
