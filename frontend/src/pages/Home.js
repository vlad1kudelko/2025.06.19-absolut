import React from 'react';
import { Link } from 'react-router-dom';
import { CubeIcon, TagIcon, ChartBarIcon } from '@heroicons/react/24/outline';

const Home = () => {
  const features = [
    {
      name: 'Управление элементами',
      description: 'Создавайте, редактируйте и управляйте элементами вашего каталога',
      icon: CubeIcon,
      href: '/items',
    },
    {
      name: 'Категории',
      description: 'Организуйте контент с помощью системы категорий',
      icon: TagIcon,
      href: '/categories',
    },
    {
      name: 'Аналитика',
      description: 'Отслеживайте статистику и аналитику вашего приложения',
      icon: ChartBarIcon,
      href: '/analytics',
    },
  ];

  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Добро пожаловать в Absolut
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Современная платформа для управления контентом с использованием Django, React и PostgreSQL
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <Link
              key={feature.name}
              to={feature.href}
              className="card hover:shadow-lg transition-shadow duration-200"
            >
              <div className="flex items-center mb-4">
                <Icon className="h-8 w-8 text-blue-600" />
                <h3 className="text-lg font-semibold text-gray-900 ml-3">
                  {feature.name}
                </h3>
              </div>
              <p className="text-gray-600">{feature.description}</p>
            </Link>
          );
        })}
      </div>

      {/* Stats Section */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Статистика</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">150+</div>
            <div className="text-gray-600">Элементов</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">25+</div>
            <div className="text-gray-600">Категорий</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">1000+</div>
            <div className="text-gray-600">Пользователей</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 