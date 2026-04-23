from django.contrib import admin
from .models import Specialty, Specialist

@admin.register(Specialty)
class SpecialtyAdmin(admin.ModelAdmin):
    list_display = ('name',)

@admin.register(Specialist)
class SpecialistAdmin(admin.ModelAdmin):
    list_display = ('full_name', 'certification_status', 'verified')
    list_filter = ('certification_status', 'verified', 'specialties')
    search_fields = ('full_name', 'certification_id')
