import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { Card, CardContent, Typography, Box, TextField, Button, Alert } from '@mui/material';

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      // Здесь будет логика авторизации
      console.log('Login data:', data);
      toast.success('Вход выполнен успешно!');
    } catch (error) {
      toast.error('Ошибка входа');
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
