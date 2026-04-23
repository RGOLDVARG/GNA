from rest_framework import viewsets, permissions, mixins
from .models import Inquiry
from .serializers import InquirySerializer, AdminInquirySerializer

# Public View - Create Only
class PublicInquiryViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = InquirySerializer
    permission_classes = [permissions.AllowAny]

# Admin View - Full CRUD
class AdminInquiryViewSet(viewsets.ModelViewSet):
    queryset = Inquiry.objects.all()
    serializer_class = AdminInquirySerializer
    permission_classes = [permissions.IsAdminUser]
