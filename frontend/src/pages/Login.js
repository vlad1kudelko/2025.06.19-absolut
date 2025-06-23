import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Card, CardContent, Typography, Box, TextField, Button } from '@mui/material';
import { api } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      // Отправляем данные на Django endpoint авторизации
      const response = await api.post('/api/auth/login2/', data);
      const token = response.data.access;
      localStorage.setItem('token', token);
      toast.success('Вход выполнен успешно!');
      navigate('/');
    } catch (error) {
      toast.error('Ошибка входа: ' + (error.response?.data?.detail || 'Проверьте логин и пароль'));
    }
  };

  return (
    <Box maxWidth={400} mx="auto">
      <Card sx={{ mt: 6, p: 2 }}>
        <CardContent>
          <Typography variant="h5" fontWeight="bold" gutterBottom align="center">
            Вход в систему
          </Typography>
          <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ mt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <TextField
              label="Имя пользователя"
              variant="outlined"
              fullWidth
              {...register('username', { required: 'Имя пользователя обязательно' })}
              error={!!errors.username}
              helperText={errors.username?.message}
            />
            <TextField
              label="Пароль"
              type="password"
              variant="outlined"
              fullWidth
              {...register('password', { required: 'Пароль обязателен' })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button type="submit" variant="contained" color="primary" size="large" fullWidth>
              Войти
            </Button>
          </Box>
          <Box mt={4} textAlign="center">
            <Typography variant="body2" color="text.secondary">
              Нет аккаунта?{' '}
              <Button variant="text" color="primary" size="small">
                Зарегистрироваться
              </Button>
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
