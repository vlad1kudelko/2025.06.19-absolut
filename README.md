# Система доставки Absolut

## Описание

Многоуровневый проект для управления доставкой, включающий backend (Django), frontend (React), базу данных PostgreSQL и прокси-сервер Nginx. Все сервисы запускаются через Docker Compose.

---

## Требования
- Docker
- Docker Compose
- make (опционально, для удобства)

---

## Быстрый старт

1. Клонируйте репозиторий:
   ```bash
   git clone <URL>
   cd 2025.06.19-absolut
   ```
2. Запустите проект:
   ```bash
   make setup
   ```
   Это автоматически поднимет все сервисы, применит миграции и соберёт статику.

3. Откройте в браузере:
   - Frontend: [http://localhost](http://localhost)
   - Django Admin: [http://localhost:8000/admin/](http://localhost:8000/admin/)

---

## Основные команды Makefile

- `make up` — Запустить все сервисы в фоне
- `make down` — Остановить все сервисы
- `make logs` — Просмотреть логи всех сервисов
- `make clean` — Остановить и удалить все контейнеры и volumes
- `make migrate` — Применить миграции Django
- `make createsuperuser` — Создать суперпользователя Django
- `make collectstatic` — Собрать статику Django
- `make shell-django` — Открыть Django shell
- `make shell-react` — Открыть shell в контейнере React
- `make install-deps` — Установить зависимости React
- `make build-react` — Собрать React для продакшена
- `make test-django` — Запустить тесты Django
- `make test-react` — Запустить тесты React
- `make status` — Показать статус контейнеров
- `make restart` — Перезапустить все сервисы

Полный список команд:
```bash
make help
```

---

## Остановка и очистка

- Остановить проект:
  ```bash
  make down
  ```
- Полная очистка (контейнеры + volumes):
  ```bash
  make clean
  ```

---

## Структура проекта

- `backend/` — Django backend
- `frontend/` — React frontend
- `nginx/` — Конфигурация Nginx
- `postgres/` — Конфигурация и инициализация PostgreSQL
- `docker-compose.yml` — Основной файл для запуска всех сервисов
- `Makefile` — Удобные команды для управления проектом

---

## Полезные ссылки

- **Django Admin:** [http://localhost:8000/admin/](http://localhost:8000/admin/)
  - Логин: `admin`
  - Пароль: `admin123`
- **API:**
  - `/api/vehicle-models/` — Модели транспорта
  - `/api/packaging-types/` — Типы упаковки
  - `/api/services/` — Услуги
  - `/api/delivery-statuses/` — Статусы доставки
  - `/api/cargo-types/` — Типы груза

---

## Загрузка справочников вручную

Для повторной загрузки справочных данных:
```bash
docker-compose run --rm django python manage.py load_reference_data
```

---

## Примечания
- Все переменные окружения для сервисов можно изменить в файлах docker-compose.yml и Dockerfile соответствующих сервисов.
- Для разработки можно запускать backend и frontend отдельно, используя стандартные команды Django и npm.