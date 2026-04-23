from django.db import models
from django.conf import settings

class MembershipTier(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    benefits = models.TextField()
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.name

class MemberProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    tier = models.ForeignKey(MembershipTier, on_delete=models.SET_NULL, null=True)
    joined_date = models.DateField(auto_now_add=True)
    bio = models.TextField(blank=True)
    location = models.CharField(max_length=255, blank=True)
    
    def __str__(self):
        return f"{self.user.username} - {self.tier.name if self.tier else 'No Tier'}"
