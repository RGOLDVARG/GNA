from django.contrib import admin
from .models import MembershipTier, MemberProfile

@admin.register(MembershipTier)
class MembershipTierAdmin(admin.ModelAdmin):
    list_display = ('name', 'price', 'is_active')

@admin.register(MemberProfile)
class MemberProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'tier', 'joined_date')
    list_filter = ('tier',)
