from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from rest_framework_simplejwt.views import TokenObtainPairView
from .views import DeliveryStatsView, DeliveryTableView

router = DefaultRouter()
router.register(r'vehicle-models', views.VehicleModelViewSet)
router.register(r'packaging-types', views.PackagingTypeViewSet)
router.register(r'services', views.ServiceViewSet)
router.register(r'delivery-statuses', views.DeliveryStatusViewSet)
router.register(r'cargo-types', views.CargoTypeViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('auth/login2/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('delivery-stats/', DeliveryStatsView.as_view(), name='delivery-stats'),
    path('delivery-table/', DeliveryTableView.as_view(), name='delivery-table'),
    path('delivery-table/<int:id>/', DeliveryTableView.as_view(), name='delivery-detail'),
] 