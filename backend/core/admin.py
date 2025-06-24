from django.contrib import admin
from django.utils.html import format_html
from .models import (
    VehicleModel, PackagingType, Service, DeliveryStatus, CargoType, Delivery
)


@admin.register(VehicleModel)
class VehicleModelAdmin(admin.ModelAdmin):
    list_display = ['model', 'number', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['model', 'number', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('model', 'number', 'description', 'is_active')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(PackagingType)
class PackagingTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'description', 'is_active')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Service)
class ServiceAdmin(admin.ModelAdmin):
    list_display = ['name', 'price', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at', 'price']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'description', 'price', 'is_active')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(DeliveryStatus)
class DeliveryStatusAdmin(admin.ModelAdmin):
    list_display = ['name', 'color_preview', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at', 'color_preview']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'description', 'color', 'is_active')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )
    
    def color_preview(self, obj):
        if obj.color:
            return format_html(
                '<div style="background-color: {}; width: 20px; height: 20px; border-radius: 3px; border: 1px solid #ccc;"></div>',
                obj.color
            )
        return "Нет цвета"
    color_preview.short_description = 'Цвет'


@admin.register(CargoType)
class CargoTypeAdmin(admin.ModelAdmin):
    list_display = ['name', 'is_active', 'created_at']
    list_filter = ['is_active', 'created_at']
    search_fields = ['name', 'description']
    readonly_fields = ['created_at', 'updated_at']
    
    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'description', 'is_active')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Delivery)
class DeliveryAdmin(admin.ModelAdmin):
    list_display = [
        'id', 'departure_datetime', 'arrival_datetime', 'transit_time', 'distance', 'vehicle_model', 'packaging_type', 'service', 'delivery_status', 'cargo_type', 'is_active', 'created_at'
    ]
    list_filter = ['departure_datetime', 'vehicle_model', 'packaging_type', 'service', 'delivery_status', 'cargo_type', 'is_active']
    search_fields = ['id']
    readonly_fields = ['created_at', 'updated_at']
    fieldsets = (
        ('Основная информация', {
            'fields': ('departure_datetime', 'arrival_datetime', 'transit_time', 'distance', 'vehicle_model', 'packaging_type', 'service', 'delivery_status', 'cargo_type', 'is_active')
        }),
        ('Временные метки', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    ) 