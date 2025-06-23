.PHONY: help build up down logs clean migrate createsuperuser collectstatic shell-django shell-react

help: ## Показать справку
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: ## Собрать все Docker образы
	docker-compose build

up: ## Запустить все сервисы
	docker-compose up -d

down: ## Остановить все сервисы
	docker-compose down

logs: ## Показать логи всех сервисов
	docker-compose logs -f

logs-django: ## Показать логи Django
	docker-compose logs -f django

logs-react: ## Показать логи React
	docker-compose logs -f react

logs-postgres: ## Показать логи PostgreSQL
	docker-compose logs -f postgres

clean: ## Остановить и удалить все контейнеры и volumes
	docker-compose down -v
	docker system prune -f

migrate: ## Применить миграции Django
	docker-compose exec django python manage.py migrate

makemigrations: ## Создать миграции Django
	docker-compose exec django python manage.py makemigrations

createsuperuser: ## Создать суперпользователя Django
	docker-compose exec django python manage.py createsuperuser

collectstatic: ## Собрать статические файлы Django
	docker-compose exec django python manage.py collectstatic --noinput

shell-django: ## Открыть Django shell
	docker-compose exec django python manage.py shell

shell-react: ## Открыть shell в React контейнере
	docker-compose exec react sh

install-deps: ## Установить зависимости React
	docker-compose exec react npm install

build-react: ## Собрать React приложение для продакшена
	docker-compose exec react npm run build

test-django: ## Запустить тесты Django
	docker-compose exec django python manage.py test

test-react: ## Запустить тесты React
	docker-compose exec react npm test

restart: ## Перезапустить все сервисы
	docker-compose restart

restart-django: ## Перезапустить Django
	docker-compose restart django

restart-react: ## Перезапустить React
	docker-compose restart react

status: ## Показать статус контейнеров
	docker-compose ps

setup: ## Первоначальная настройка проекта
	@echo "Создание проекта..."
	docker-compose up -d
	@echo "Ожидание запуска сервисов..."
	sleep 30
	@echo "Применение миграций..."
	docker-compose exec django python manage.py migrate
	@echo "Сбор статических файлов..."
	docker-compose exec django python manage.py collectstatic --noinput
	@echo "Проект готов! Откройте http://localhost/" 