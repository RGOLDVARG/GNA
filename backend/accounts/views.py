from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.contrib.auth import get_user_model, update_session_auth_hash
from .serializers import UserSerializer, RegisterSerializer, AdminUserSerializer

User = get_user_model()

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        email = request.data.get('email')
        code = request.data.get('code')
        
        if not email or not code:
            return Response({'error': 'Email and code are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        # Check OTP
        if not (code == '111111' and settings.DEBUG):
            otp = EmailOTP.objects.filter(email=email, code=code).last()
            if not otp or not otp.is_valid():
                return Response({'error': 'Invalid or expired verification code'}, status=status.HTTP_400_BAD_REQUEST)
            otp.is_used = True
            otp.save()
            
        return super().create(request, *args, **kwargs)

class UserProfileView(generics.RetrieveUpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

class ChangePasswordView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        old_password = request.data.get('old_password')
        new_password = request.data.get('new_password')
        user = request.user

        if not user.check_password(old_password):
            return Response({'error': 'Incorrect old password'}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        update_session_auth_hash(request, user)  # Important for sessions
        return Response({'message': 'Password updated successfully'})

class DeleteAccountView(generics.DestroyAPIView):
    permission_classes = [permissions.IsAuthenticated]
    
    def get_object(self):
        return self.request.user

class ProfileUpdateView(generics.UpdateAPIView):
    permission_classes = [permissions.IsAuthenticated]
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def patch(self, request, *args, **kwargs):
        # Prevent changing first_name, last_name, email, gna_id
        restricted_fields = ['first_name', 'last_name', 'email', 'gna_id']
        for field in restricted_fields:
            if field in request.data:
                return Response({"error": f"Editing {field} is not allowed."}, status=400)
        return super().patch(request, *args, **kwargs)
class AdminUserListView(generics.ListAPIView):
    queryset = User.objects.all().order_by('-date_joined')
    permission_classes = [permissions.IsAdminUser]
    serializer_class = UserSerializer

class AdminUserUpdateView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    permission_classes = [permissions.IsAdminUser]
    serializer_class = AdminUserSerializer
    lookup_field = 'gna_id'
import random
from django.core.mail import send_mail
from django.conf import settings
from rest_framework_simplejwt.tokens import RefreshToken
from .models import EmailOTP

class RequestOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        if not email:
            return Response({'error': 'Email is required'}, status=status.HTTP_400_BAD_REQUEST)

        # Generate 6-digit code
        code = ''.join([str(random.randint(0, 9)) for _ in range(6)])
        
        # Save OTP
        EmailOTP.objects.create(email=email, code=code)

        # Send Email (In dev it goes to console)
        try:
            send_mail(
                'Your GNA Login Code',
                f'Your verification code is: {code}. It will expire in 10 minutes.',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            return Response({'message': 'OTP sent successfully'})
        except Exception as e:
            print(f"Error sending email: {e}")
            return Response({'error': 'Failed to send OTP'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class VerifyOTPView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        email = request.data.get('email')
        code = request.data.get('code')

        if not email or not code:
            return Response({'error': 'Email and code are required'}, status=status.HTTP_400_BAD_REQUEST)

        # Universal bypass for development
        if code == '111111' and settings.DEBUG:
            user = User.objects.get(email=email)
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })

        otp = EmailOTP.objects.filter(email=email, code=code).last()

        if otp and otp.is_valid():
            otp.is_used = True
            otp.save()

            user = User.objects.get(email=email)
            refresh = RefreshToken.for_user(user)
            
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
            })
        
        return Response({'error': 'Invalid or expired code'}, status=status.HTTP_400_BAD_REQUEST)
