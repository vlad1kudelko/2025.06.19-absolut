from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'vehicle-models', views.VehicleModelViewSet)
router.register(r'packaging-types', views.PackagingTypeViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'delivery-statuses', views.DeliveryStatusViewSet)
router.register(r'cargo-types', views.CargoTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/', include('rest_framework.urls')),
] 