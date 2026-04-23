from rest_framework import serializers
from .models import AccreditedPartner, ApprovedProgram

class ApprovedProgramSerializer(serializers.ModelSerializer):
    partner_name = serializers.ReadOnlyField(source='partner.name')
    
    class Meta:
        model = ApprovedProgram
        fields = ['id', 'partner', 'partner_name', 'title', 'description', 'duration', 'format', 'website', 'verified']

class AccreditedPartnerSerializer(serializers.ModelSerializer):
    programs = ApprovedProgramSerializer(many=True, read_only=True)
    
    class Meta:
        model = AccreditedPartner
        fields = '__all__'
