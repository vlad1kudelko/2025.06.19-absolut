from rest_framework import serializers
from core.models import (
    VehicleModel, PackagingType, Service, DeliveryStatus, CargoType, Delivery
)


class VehicleModelSerializer(serializers.ModelSerializer):
    """Сериализатор для моделей транспорта"""
    
    class Meta:
        model = VehicleModel
        fields = ['id', 'model', 'number', 'description', 'is_active', 'created_at', 'updated_at']
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


class DeliveryTableSerializer(serializers.ModelSerializer):
    vehicle_model = serializers.SerializerMethodField()
    service = serializers.SerializerMethodField()
    packaging_type = serializers.SerializerMethodField()
    delivery_status = serializers.SerializerMethodField()
    delivery_status_color = serializers.CharField(source='delivery_status.color')
    cargo_type = serializers.SerializerMethodField()

    def get_vehicle_model(self, obj):
        return {
            'model': obj.vehicle_model.model,
            'number': obj.vehicle_model.number
        }
    def get_service(self, obj):
        return {'id': obj.service.id, 'name': obj.service.name}
    def get_packaging_type(self, obj):
        return {'id': obj.packaging_type.id, 'name': obj.packaging_type.name}
    def get_delivery_status(self, obj):
        return {'id': obj.delivery_status.id, 'name': obj.delivery_status.name}
    def get_cargo_type(self, obj):
        return {'id': obj.cargo_type.id, 'name': obj.cargo_type.name}

    class Meta:
        model = Delivery
        fields = ['id', 'departure_datetime', 'arrival_datetime', 'transit_time', 'vehicle_model', 'service', 'distance', 'created_at', 'packaging_type', 'delivery_status', 'delivery_status_color', 'cargo_type'] 