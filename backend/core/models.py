from django.db import models
from django.utils import timezone


class TimeStampedModel(models.Model):
    """Абстрактная модель с временными метками"""
    created_at = models.DateTimeField(auto_now_add=True, verbose_name='Дата создания')
    updated_at = models.DateTimeField(auto_now=True, verbose_name='Дата обновления')

    class Meta:
        abstract = True


class VehicleModel(TimeStampedModel):
    """Модель транспорта"""
    name = models.CharField(max_length=100, verbose_name='Название модели')
    description = models.TextField(blank=True, verbose_name='Описание')
    is_active = models.BooleanField(default=True, verbose_name='Активна')
    
    class Meta:
        verbose_name = 'Модель транспорта'
        verbose_name_plural = 'Модели транспорта'
        ordering = ['name']

    def __str__(self):
        return self.name


class PackagingType(TimeStampedModel):
    """Тип упаковки"""
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    
    class Meta:
        verbose_name = 'Тип упаковки'
        verbose_name_plural = 'Типы упаковки'
        ordering = ['name']

    def __str__(self):
        return self.name


class Service(TimeStampedModel):
    """Услуга"""
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0, verbose_name='Стоимость')
    is_active = models.BooleanField(default=True, verbose_name='Активна')
    
    class Meta:
        verbose_name = 'Услуга'
        verbose_name_plural = 'Услуги'
        ordering = ['name']

    def __str__(self):
        return self.name


class DeliveryStatus(TimeStampedModel):
    """Статус доставки"""
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    color = models.CharField(max_length=7, default='#007bff', verbose_name='Цвет (HEX)')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    
    class Meta:
        verbose_name = 'Статус доставки'
        verbose_name_plural = 'Статусы доставки'
        ordering = ['name']

    def __str__(self):
        return self.name


class CargoType(TimeStampedModel):
    """Тип груза"""
    name = models.CharField(max_length=100, verbose_name='Название')
    description = models.TextField(blank=True, verbose_name='Описание')
    is_active = models.BooleanField(default=True, verbose_name='Активен')
    
    class Meta:
        verbose_name = 'Тип груза'
        verbose_name_plural = 'Типы груза'
        ordering = ['name']

    def __str__(self):
        return self.name


class Delivery(TimeStampedModel):
    """Объединяющая таблица для доставки"""
    delivery_date = models.DateField(verbose_name='Дата доставки')
    distance = models.DecimalField(max_digits=8, decimal_places=2, verbose_name='Дистанция (км)')
    vehicle_model = models.ForeignKey(
        VehicleModel, on_delete=models.PROTECT, verbose_name='Модель транспорта', related_name='deliveries'
    )
    packaging_type = models.ForeignKey(
        PackagingType, on_delete=models.PROTECT, verbose_name='Тип упаковки', related_name='deliveries'
    )
    service = models.ForeignKey(
        Service, on_delete=models.PROTECT, verbose_name='Услуга', related_name='deliveries'
    )
    delivery_status = models.ForeignKey(
        DeliveryStatus, on_delete=models.PROTECT, verbose_name='Статус доставки', related_name='deliveries'
    )
    cargo_type = models.ForeignKey(
        CargoType, on_delete=models.PROTECT, verbose_name='Тип груза', related_name='deliveries'
    )
    is_active = models.BooleanField(default=True, verbose_name='Активна')

    class Meta:
        verbose_name = 'Доставка'
        verbose_name_plural = 'Доставки'
        ordering = ['-delivery_date', 'id']

    def __str__(self):
        return f"Доставка {self.pk} от {self.delivery_date}" 