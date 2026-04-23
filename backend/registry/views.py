from rest_framework import generics, permissions, status, viewsets
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from accounts.serializers import UserSerializer
from .models import AccreditedPartner, ApprovedProgram
from .serializers import AccreditedPartnerSerializer, ApprovedProgramSerializer
from django.db.models import Q

User = get_user_model()

class SpecialistSearchView(generics.ListAPIView):
    # Publicly accessible search for specialists
    permission_classes = [permissions.AllowAny]
    serializer_class = UserSerializer

    def get_queryset(self):
        query = self.request.query_params.get('q', '')
        country = self.request.query_params.get('country', '')
        city = self.request.query_params.get('city', '')
        profession = self.request.query_params.get('profession', '')
        status = self.request.query_params.get('status', '')
        
        queryset = User.objects.filter(tier__in=['professional', 'fellow'])

        if query:
            queryset = queryset.filter(
                Q(gna_id__icontains=query) |
                Q(first_name__icontains=query) |
                Q(last_name__icontains=query) |
                Q(profession__icontains=query)
            )
        
        if country:
            queryset = queryset.filter(country__icontains=country)
        
        if city:
            queryset = queryset.filter(city__icontains=city)

        if profession:
            queryset = queryset.filter(profession__icontains=profession)
        
        if status:
            queryset = queryset.filter(certification_status=status)

        return queryset.distinct()

class SpecialistDetailView(generics.RetrieveAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    lookup_field = 'gna_id'
    permission_classes = [] # Publicly accessible

class PartnerListView(generics.ListAPIView):
    queryset = AccreditedPartner.objects.filter(verified=True)
    serializer_class = AccreditedPartnerSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        queryset = super().get_queryset()
        query = self.request.query_params.get('q', '')
        partner_type = self.request.query_params.get('type', '')
        country = self.request.query_params.get('country', '')

        if query:
            queryset = queryset.filter(Q(name__icontains=query) | Q(description__icontains=query))
        if partner_type:
            queryset = queryset.filter(partner_type=partner_type)
        if country:
            queryset = queryset.filter(country__icontains=country)
        
        return queryset

class PartnerDetailView(generics.RetrieveAPIView):
    queryset = AccreditedPartner.objects.all()
    serializer_class = AccreditedPartnerSerializer
    lookup_field = 'gna_partner_id'
    permission_classes = [permissions.AllowAny]

class ProgramListView(generics.ListAPIView):
    queryset = ApprovedProgram.objects.filter(verified=True)
    serializer_class = ApprovedProgramSerializer
    permission_classes = [permissions.AllowAny]

from rest_framework.parsers import MultiPartParser, FormParser

# Admin views for Management Gateway
class PartnerAdminViewSet(viewsets.ModelViewSet):
    queryset = AccreditedPartner.objects.all()
    serializer_class = AccreditedPartnerSerializer
    permission_classes = [permissions.IsAdminUser]
    lookup_field = 'gna_partner_id'
    parser_classes = [MultiPartParser, FormParser]

class ProgramAdminViewSet(viewsets.ModelViewSet):
    queryset = ApprovedProgram.objects.all()
    serializer_class = ApprovedProgramSerializer
    permission_classes = [permissions.IsAdminUser]
