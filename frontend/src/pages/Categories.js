import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';

const Categories = () => {
  const { data: categories, isLoading, error } = useQuery('categories', () =>
    api.get('/api/categories/').then(res => res.data)
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg text-gray-600">Загрузка...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center">
        <div className="text-red-600 text-lg mb-4">Ошибка загрузки данных</div>
        <div className="text-gray-600">{error.message}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-900">Категории</h1>
        <button className="btn-primary">Добавить категорию</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories?.results?.map((category) => (
          <div key={category.id} className="card">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {category.name}
            </h3>
            <p className="text-gray-600 mb-4">
              {category.description || 'Описание отсутствует'}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500">
                {category.parent_name ? `Родитель: ${category.parent_name}` : 'Корневая категория'}
              </span>
              <span className="text-xs text-gray-400">
                {new Date(category.created_at).toLocaleDateString('ru-RU')}
              </span>
            </div>
          </div>
        ))}
      </div>

      {categories?.results?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Категории не найдены</div>
        </div>
      )}
    </div>
  );
};

export default Categories; 