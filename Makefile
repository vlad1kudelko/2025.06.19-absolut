help: ## Показать справку
	@echo "Доступные команды:"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

migrate: ## Применить миграции Django
	docker-compose exec django python manage.py migrate

makemigrations: ## Создать миграции Django
	docker-compose exec django python manage.py makemigrations

createsuperuser: ## Создать суперпользователя Django
	docker-compose exec django python manage.py createsuperuser

setup: ## Первоначальная настройка проекта
	@echo "Создание проекта..."
	docker-compose up -d
	@echo "Ожидание запуска сервисов..."
	sleep 30
	@echo "Применение миграций..."
	docker-compose exec django python manage.py migrate
	@echo "Проект готов! Откройте http://localhost/" 