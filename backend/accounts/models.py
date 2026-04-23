from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # Extending the default user for GNA features
    email = models.EmailField(unique=True)
    
    GNA_TIERS = (
        ('guest', 'Guest'),
        ('professional', 'Professional'),
        ('fellow', 'Fellow'),
    )
    
    tier = models.CharField(max_length=20, choices=GNA_TIERS, default='guest')
    profession = models.CharField(max_length=255, blank=True)
    
    # Certification status
    CERT_STATUS_CHOICES = [
        ('active', 'Active'),
        ('expired', 'Expired'),
        ('pending', 'Pending'),
    ]
    certification_status = models.CharField(max_length=20, choices=CERT_STATUS_CHOICES, default='pending')
    verified_since = models.DateField(null=True, blank=True)
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True)
    
    # Public Profile Info
    bio = models.TextField(blank=True, null=True)
    linkedin_url = models.URLField(max_length=255, blank=True, null=True)
    website_url = models.URLField(max_length=255, blank=True, null=True)
    education = models.TextField(blank=True, null=True)
    experience = models.TextField(blank=True, null=True)
    licenses = models.TextField(blank=True, null=True)
    publications = models.TextField(blank=True, null=True)
    languages = models.TextField(blank=True, null=True)
    expertise = models.TextField(blank=True, null=True)

    # Membership fields
    country = models.CharField(max_length=100, blank=True)
    city = models.CharField(max_length=100, blank=True)
    gna_id = models.CharField(max_length=20, unique=True, null=True, blank=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    
    def save(self, *args, **kwargs):
        if not self.gna_id and self.pk:
            # Generate a simple GNA ID after first save
            self.gna_id = f"GNA-{self.pk:06d}"
        super().save(*args, **kwargs)
from django.utils import timezone
from datetime import timedelta

class EmailOTP(models.Model):
    email = models.EmailField()
    code = models.CharField(max_length=6)
    created_at = models.DateTimeField(auto_now_add=True)
    is_used = models.BooleanField(default=False)

    def is_valid(self):
        # Code is valid for 10 minutes
        return not self.is_used and self.created_at >= timezone.now() - timedelta(minutes=10)

    def __str__(self):
        return f"{self.email} - {self.code}"
