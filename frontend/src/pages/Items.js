import React from 'react';
import { useQuery } from 'react-query';
import { api } from '../services/api';

const Items = () => {
  const { data: items, isLoading, error } = useQuery('items', () =>
    api.get('/api/items/').then(res => res.data)
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
        <h1 className="text-3xl font-bold text-gray-900">Элементы</h1>
        <button className="btn-primary">Добавить элемент</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {items?.results?.map((item) => (
          <div key={item.id} className="card">
            {item.image && (
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-48 object-cover rounded-lg mb-4"
              />
            )}
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {item.title}
            </h3>
            <p className="text-gray-600 mb-4 line-clamp-3">
              {item.description}
            </p>
            <div className="flex justify-between items-center">
              <span className="text-lg font-bold text-blue-600">
                {item.price} ₽
              </span>
              <span className="text-sm text-gray-500">
                {item.category_name}
              </span>
            </div>
          </div>
        ))}
      </div>

      {items?.results?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-gray-500 text-lg">Элементы не найдены</div>
        </div>
      )}
    </div>
  );
};

export default Items; 