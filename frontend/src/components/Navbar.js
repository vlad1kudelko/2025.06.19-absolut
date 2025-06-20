import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { HomeIcon, CubeIcon, TagIcon, UserIcon } from '@heroicons/react/24/outline';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: 'Главная', href: '/', icon: HomeIcon },
    { name: 'Элементы', href: '/items', icon: CubeIcon },
    { name: 'Категории', href: '/categories', icon: TagIcon },
    { name: 'Войти', href: '/login', icon: UserIcon },
  ];

  return (
    <nav className="bg-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <h1 className="text-xl font-bold text-gray-900">Absolut</h1>
            </Link>
          </div>
          
          <div className="flex items-center space-x-8">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.href;
              
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                    isActive
                      ? 'bg-blue-100 text-blue-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 