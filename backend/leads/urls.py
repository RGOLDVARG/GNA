from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import PublicInquiryViewSet, AdminInquiryViewSet

router = DefaultRouter()
router.register(r'public', PublicInquiryViewSet, basename='public-inquiry')
router.register(r'admin', AdminInquiryViewSet, basename='admin-inquiry')

urlpatterns = [
    path('', include(router.urls)),
]
