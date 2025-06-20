-- Создание расширений
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pg_trgm";

-- Создание схемы для приложения
CREATE SCHEMA IF NOT EXISTS absolut_schema;

-- Установка прав доступа
GRANT ALL PRIVILEGES ON SCHEMA absolut_schema TO absolut_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA absolut_schema TO absolut_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA absolut_schema TO absolut_user;

-- Создание таблицы для логирования
CREATE TABLE IF NOT EXISTS absolut_schema.audit_log (
    id SERIAL PRIMARY KEY,
    table_name VARCHAR(100),
    operation VARCHAR(10),
    old_data JSONB,
    new_data JSONB,
    user_id INTEGER,
    timestamp TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Создание индекса для аудита
CREATE INDEX IF NOT EXISTS idx_audit_log_timestamp ON absolut_schema.audit_log(timestamp);
CREATE INDEX IF NOT EXISTS idx_audit_log_table_name ON absolut_schema.audit_log(table_name); 