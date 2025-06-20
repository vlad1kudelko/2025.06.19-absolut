from rest_framework import serializers
from core.models import (
    VehicleModel, PackagingType, Service, DeliveryStatus, CargoType
)


class VehicleModelSerializer(serializers.ModelSerializer):
    """Сериализатор для моделей транспорта"""
    
    class Meta:
        model = VehicleModel
        fields = ['id', 'name', 'description', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class PackagingTypeSerializer(serializers.ModelSerializer):
    """Сериализатор для типов упаковки"""
    
    class Meta:
        model = PackagingType
        fields = ['id', 'name', 'description', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class ServiceSerializer(serializers.ModelSerializer):
    """Сериализатор для услуг"""
    
    class Meta:
        model = Service
        fields = ['id', 'name', 'description', 'price', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class DeliveryStatusSerializer(serializers.ModelSerializer):
    """Сериализатор для статусов доставки"""
    
    class Meta:
        model = DeliveryStatus
        fields = ['id', 'name', 'description', 'color', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


class CargoTypeSerializer(serializers.ModelSerializer):
    """Сериализатор для типов груза"""
    
    class Meta:
        model = CargoType
        fields = ['id', 'name', 'description', 'is_active', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at'] 