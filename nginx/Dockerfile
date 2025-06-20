FROM nginx:alpine

# Копирование конфигурации
COPY conf/default.conf /etc/nginx/conf.d/default.conf

# Создание директорий для статических файлов
RUN mkdir -p /var/www/static /var/www/media

# Установка прав доступа
RUN chown -R nginx:nginx /var/www

EXPOSE 80 443

CMD ["nginx", "-g", "daemon off;"] 