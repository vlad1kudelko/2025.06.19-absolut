from rest_framework import viewsets, permissions, filters
from django_filters.rest_framework import DjangoFilterBackend
from core.models import (
    VehicleModel, PackagingType, Service, DeliveryStatus, CargoType
)
from .serializers import (
    VehicleModelSerializer, PackagingTypeSerializer, ServiceSerializer,
    DeliveryStatusSerializer, CargoTypeSerializer
)


class VehicleModelViewSet(viewsets.ModelViewSet):
    """ViewSet для моделей транспорта"""
    queryset = VehicleModel.objects.filter(is_active=True)
    serializer_class = VehicleModelSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']


class PackagingTypeViewSet(viewsets.ModelViewSet):
    """ViewSet для типов упаковки"""
    queryset = PackagingType.objects.filter(is_active=True)
    serializer_class = PackagingTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']


class ServiceViewSet(viewsets.ModelViewSet):
    """ViewSet для услуг"""
    queryset = Service.objects.filter(is_active=True)
    serializer_class = ServiceSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active', 'price']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'price', 'created_at']
    ordering = ['name']


class DeliveryStatusViewSet(viewsets.ModelViewSet):
    """ViewSet для статусов доставки"""
    queryset = DeliveryStatus.objects.filter(is_active=True)
    serializer_class = DeliveryStatusSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name']


class CargoTypeViewSet(viewsets.ModelViewSet):
    """ViewSet для типов груза"""
    queryset = CargoType.objects.filter(is_active=True)
    serializer_class = CargoTypeSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    filter_backends = [DjangoFilterBackend, filters.SearchFilter, filters.OrderingFilter]
    filterset_fields = ['is_active']
    search_fields = ['name', 'description']
    ordering_fields = ['name', 'created_at']
    ordering = ['name'] 