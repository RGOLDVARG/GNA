from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User

class CustomUserAdmin(UserAdmin):
    model = User
    list_display = ['email', 'username', 'gna_id', 'tier', 'certification_status', 'is_staff']
    fieldsets = UserAdmin.fieldsets + (
        ('GNA Profile', {'fields': ('gna_id', 'tier', 'profession', 'certification_status', 'verified_since', 'avatar')}),
        ('Professional Dossier', {'fields': ('bio', 'education', 'experience', 'licenses', 'publications', 'languages', 'expertise')}),
        ('Location', {'fields': ('country', 'city')}),
        ('Social', {'fields': ('linkedin_url', 'website_url')}),
    )

admin.site.register(User, CustomUserAdmin)
