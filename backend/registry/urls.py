from django.urls import path, include
from . import views
from rest_framework.routers import DefaultRouter

router = DefaultRouter()
router.register(r'admin/partners', views.PartnerAdminViewSet, basename='admin-partners')
router.register(r'admin/programs', views.ProgramAdminViewSet, basename='admin-programs')

urlpatterns = [
    path('', include(router.urls)),
    path('search-specialists/', views.SpecialistSearchView.as_view(), name='search_specialists'),
    path('profile/<str:gna_id>/', views.SpecialistDetailView.as_view(), name='specialist-detail'),
    path('search-partners/', views.PartnerListView.as_view(), name='search_partners'),
    path('search-programs/', views.ProgramListView.as_view(), name='search_programs'),
    path('partner/<str:gna_partner_id>/', views.PartnerDetailView.as_view(), name='partner-detail'),
]
