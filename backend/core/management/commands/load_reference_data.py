from django.core.management.base import BaseCommand
from core.models import VehicleModel, PackagingType, Service, DeliveryStatus, CargoType, Delivery
from random import choice, randint
from datetime import date, timedelta


class Command(BaseCommand):
    help = 'Загружает начальные данные для справочников системы доставки'

    def handle(self, *args, **options):
        self.stdout.write('Начинаем загрузку справочников...')

        # Модели транспорта
        vehicle_models = [
            {'name': 'Газель', 'description': 'Грузовой автомобиль малой грузоподъемности'},
            {'name': 'Бычок', 'description': 'Среднетоннажный грузовик'},
            {'name': 'Фура', 'description': 'Тяжелый грузовой автомобиль'},
            {'name': 'Пикап', 'description': 'Легкий грузовой автомобиль'},
            {'name': 'Микроавтобус', 'description': 'Пассажирский транспорт для доставки'},
        ]

        for model_data in vehicle_models:
            vehicle_model, created = VehicleModel.objects.get_or_create(
                name=model_data['name'],
                defaults=model_data
            )
            if created:
                self.stdout.write(f'Создана модель транспорта: {vehicle_model.name}')
            else:
                self.stdout.write(f'Модель транспорта уже существует: {vehicle_model.name}')

        # Типы упаковки
        packaging_types = [
            {'name': 'Пакет до 1 кг', 'description': 'Легкая упаковка для мелких грузов'},
            {'name': 'Целлофан', 'description': 'Прозрачная упаковка для защиты от влаги'},
            {'name': 'Коробка', 'description': 'Картонная упаковка для различных грузов'},
            {'name': 'Деревянный ящик', 'description': 'Прочная упаковка для тяжелых грузов'},
            {'name': 'Пластиковый контейнер', 'description': 'Многоразовая упаковка'},
            {'name': 'Мягкая упаковка', 'description': 'Тканевая или бумажная упаковка'},
        ]

        for packaging_data in packaging_types:
            packaging_type, created = PackagingType.objects.get_or_create(
                name=packaging_data['name'],
                defaults=packaging_data
            )
            if created:
                self.stdout.write(f'Создан тип упаковки: {packaging_type.name}')
            else:
                self.stdout.write(f'Тип упаковки уже существует: {packaging_type.name}')

        # Услуги
        services = [
            {'name': 'До клиента', 'description': 'Доставка до двери клиента', 'price': 500.00},
            {'name': 'Хрупкий груз', 'description': 'Особая осторожность при транспортировке', 'price': 300.00},
            {'name': 'Мед.товары', 'description': 'Транспортировка медицинских товаров', 'price': 400.00},
            {'name': 'Срочная доставка', 'description': 'Доставка в течение 2-4 часов', 'price': 1000.00},
            {'name': 'Ночная доставка', 'description': 'Доставка в ночное время', 'price': 800.00},
            {'name': 'Подъем на этаж', 'description': 'Подъем груза на этаж без лифта', 'price': 200.00},
            {'name': 'Упаковка', 'description': 'Упаковка груза', 'price': 150.00},
            {'name': 'Страхование груза', 'description': 'Страхование груза на время транспортировки', 'price': 250.00},
        ]

        for service_data in services:
            service, created = Service.objects.get_or_create(
                name=service_data['name'],
                defaults=service_data
            )
            if created:
                self.stdout.write(f'Создана услуга: {service.name} - {service.price} руб.')
            else:
                self.stdout.write(f'Услуга уже существует: {service.name}')

        # Статусы доставки
        delivery_statuses = [
            {'name': 'В ожидании', 'description': 'Заказ создан, ожидает обработки', 'color': '#ffc107'},
            {'name': 'Подтвержден', 'description': 'Заказ подтвержден и принят в работу', 'color': '#17a2b8'},
            {'name': 'В пути', 'description': 'Груз в процессе доставки', 'color': '#007bff'},
            {'name': 'Доставлен', 'description': 'Груз успешно доставлен', 'color': '#28a745'},
            {'name': 'Отменен', 'description': 'Заказ отменен', 'color': '#dc3545'},
            {'name': 'Возврат', 'description': 'Груз возвращается отправителю', 'color': '#fd7e14'},
            {'name': 'Проблема', 'description': 'Возникла проблема с доставкой', 'color': '#e83e8c'},
        ]

        for status_data in delivery_statuses:
            status, created = DeliveryStatus.objects.get_or_create(
                name=status_data['name'],
                defaults=status_data
            )
            if created:
                self.stdout.write(f'Создан статус доставки: {status.name}')
            else:
                self.stdout.write(f'Статус доставки уже существует: {status.name}')

        # Типы груза
        cargo_types = [
            {'name': 'Обычный груз', 'description': 'Стандартный груз без особых требований'},
            {'name': 'Хрупкий груз', 'description': 'Требует особой осторожности'},
            {'name': 'Скоропортящийся', 'description': 'Продукты питания и медикаменты'},
            {'name': 'Опасный груз', 'description': 'Требует специальных условий транспортировки'},
            {'name': 'Крупногабаритный', 'description': 'Большие размеры или вес'},
            {'name': 'Документы', 'description': 'Важные документы и бумаги'},
            {'name': 'Электроника', 'description': 'Компьютеры, телефоны и другая техника'},
            {'name': 'Мебель', 'description': 'Мебель и предметы интерьера'},
        ]

        for cargo_data in cargo_types:
            cargo_type, created = CargoType.objects.get_or_create(
                name=cargo_data['name'],
                defaults=cargo_data
            )
            if created:
                self.stdout.write(f'Создан тип груза: {cargo_type.name}')
            else:
                self.stdout.write(f'Тип груза уже существует: {cargo_type.name}')

        # Тестовые данные для Delivery
        vehicle_models = list(VehicleModel.objects.filter(is_active=True))
        packaging_types = list(PackagingType.objects.filter(is_active=True))
        services = list(Service.objects.filter(is_active=True))
        delivery_statuses = list(DeliveryStatus.objects.filter(is_active=True))
        cargo_types = list(CargoType.objects.filter(is_active=True))

        today = date.today()
        for i in range(10):
            delivery, created = Delivery.objects.get_or_create(
                delivery_date=today - timedelta(days=randint(0, 30)),
                distance=randint(10, 1000) / 10.0,
                vehicle_model=choice(vehicle_models),
                packaging_type=choice(packaging_types),
                service=choice(services),
                delivery_status=choice(delivery_statuses),
                cargo_type=choice(cargo_types),
                defaults={"is_active": True}
            )
            if created:
                self.stdout.write(f'Создана тестовая доставка: {delivery}')
            else:
                self.stdout.write(f'Тестовая доставка уже существует: {delivery}')

        self.stdout.write(
            self.style.SUCCESS('Справочники успешно загружены!')
        ) 