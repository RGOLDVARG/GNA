from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    PublicNewsViewSet, PublicEventViewSet,
    AdminNewsViewSet, AdminEventViewSet
)

router = DefaultRouter()

# Public endpoints
router.register(r'public/news', PublicNewsViewSet, basename='public-news')
router.register(r'public/events', PublicEventViewSet, basename='public-events')

# Admin endpoints
router.register(r'admin/news', AdminNewsViewSet, basename='admin-news')
router.register(r'admin/events', AdminEventViewSet, basename='admin-events')

urlpatterns = [
    path('', include(router.urls)),
]
