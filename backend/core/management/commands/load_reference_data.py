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
            {'model': 'Газель', 'number': 'A123BC', 'description': 'Грузовой автомобиль малой грузоподъемности'},
            {'model': 'Бычок', 'number': 'B234CD', 'description': 'Среднетоннажный грузовик'},
            {'model': 'Фура', 'number': 'C345DE', 'description': 'Тяжелый грузовой автомобиль'},
            {'model': 'Пикап', 'number': 'D456EF', 'description': 'Легкий грузовой автомобиль'},
            {'model': 'Микроавтобус', 'number': 'E567FG', 'description': 'Пассажирский транспорт для доставки'},
        ]

        for model_data in vehicle_models:
            vehicle_model, created = VehicleModel.objects.get_or_create(
                model=model_data['model'],
                number=model_data['number'],
                defaults=model_data
            )
            if created:
                self.stdout.write(f"Создана модель транспорта: {vehicle_model.model} ({vehicle_model.number})")
            else:
                self.stdout.write(f"Модель транспорта уже существует: {vehicle_model.model} ({vehicle_model.number})")

        # Типы упаковки
        packaging_types = [
            {'name': 'Пакет до 1 кг', 'description': 'Лёгкая упаковка для небольших и лёгких товаров'},
            {'name': 'Целофан', 'description': 'Прозрачная упаковка для защиты от влаги и пыли'},
            {'name': 'Коробка', 'description': 'Картонная коробка для надёжной транспортировки различных грузов'},
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
            {'name': 'До клиента', 'description': 'Доставка непосредственно до клиента', 'price': 600.00},
            {'name': 'Перемещение между складами', 'description': 'Транспортировка товаров между складами компании', 'price': 350.00},
            {'name': 'Документы', 'description': 'Доставка и передача важных документов', 'price': 250.00},
            {'name': 'Мед. товары', 'description': 'Перевозка медицинских товаров и препаратов', 'price': 500.00},
            {'name': 'Особые товары', 'description': 'Доставка товаров, требующих особых условий', 'price': 700.00},
            {'name': 'Другое', 'description': 'Прочие услуги по согласованию', 'price': 100.00},
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
            {'name': 'В ожидании', 'description': 'Заказ создан и ожидает обработки', 'color': '#fd7e14'},
            {'name': 'Доставлен', 'description': 'Груз успешно доставлен получателю', 'color': '#28a745'},
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