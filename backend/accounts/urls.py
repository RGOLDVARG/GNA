from django.urls import path
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import RegisterView, UserProfileView, ChangePasswordView, DeleteAccountView, ProfileUpdateView
from .views import AdminUserListView, AdminUserUpdateView, RequestOTPView, VerifyOTPView

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', UserProfileView.as_view(), name='profile'),
    path('change-password/', ChangePasswordView.as_view(), name='change_password'),
    path('delete-account/', DeleteAccountView.as_view(), name='delete_account'),
    path('update-profile/', ProfileUpdateView.as_view(), name='update_profile'),
    
    path('admin/users/', AdminUserListView.as_view(), name='admin_user_list'),
    path('admin/users/<str:gna_id>/', AdminUserUpdateView.as_view(), name='admin_user_detail'),
    
    # Passwordless Auth
    path('otp/request/', RequestOTPView.as_view(), name='request_otp'),
    path('otp/verify/', VerifyOTPView.as_view(), name='verify_otp'),
]
