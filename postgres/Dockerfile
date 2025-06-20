FROM postgres:15

# Установка дополнительных утилит
RUN apt-get update && apt-get install -y \
    postgresql-contrib \
    && rm -rf /var/lib/apt/lists/*

# Копирование конфигурационных файлов
COPY postgresql.conf /etc/postgresql/postgresql.conf

# Установка прав доступа
RUN chown postgres:postgres /etc/postgresql/postgresql.conf

EXPOSE 5432

CMD ["postgres", "-c", "config_file=/etc/postgresql/postgresql.conf"] 