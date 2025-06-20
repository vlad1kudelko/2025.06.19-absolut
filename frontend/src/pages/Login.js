import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

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
    <div className="max-w-md mx-auto">
      <div className="card">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
          Вход в систему
        </h2>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-1">
              Имя пользователя
            </label>
            <input
              id="username"
              type="text"
              {...register('username', { required: 'Имя пользователя обязательно' })}
              className="input-field"
              placeholder="Введите имя пользователя"
            />
            {errors.username && (
              <p className="text-red-600 text-sm mt-1">{errors.username.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Пароль
            </label>
            <input
              id="password"
              type="password"
              {...register('password', { required: 'Пароль обязателен' })}
              className="input-field"
              placeholder="Введите пароль"
            />
            {errors.password && (
              <p className="text-red-600 text-sm mt-1">{errors.password.message}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full btn-primary"
          >
            Войти
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Нет аккаунта?{' '}
            <a href="#" className="text-blue-600 hover:text-blue-700 font-medium">
              Зарегистрироваться
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login; 