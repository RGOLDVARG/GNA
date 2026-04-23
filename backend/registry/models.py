from django.db import models
from members.models import MemberProfile

class Specialty(models.Model):
    name = models.CharField(max_length=100)
    description = models.TextField(blank=True)

    class Meta:
        verbose_name_plural = "Specialties"

    def __str__(self):
        return self.name

class Specialist(models.Model):
    CERTIFICATION_STATUS = [
        ('PENDING', 'Pending'),
        ('CERTIFIED', 'Certified'),
        ('EXPIRED', 'Expired'),
    ]

    profile = models.OneToOneField(MemberProfile, on_delete=models.CASCADE)
    full_name = models.CharField(max_length=255)
    specialties = models.ManyToManyField(Specialty)
    certification_status = models.CharField(max_length=20, choices=CERTIFICATION_STATUS, default='PENDING')
    certification_id = models.CharField(max_length=50, blank=True, unique=True)
    verified = models.BooleanField(default=False)
    website = models.URLField(blank=True)

    def __str__(self):
        return self.full_name

class AccreditedPartner(models.Model):
    PARTNER_TYPES = [
        ('CLINIC', 'Medical Center / Clinic'),
        ('UNIVERSITY', 'Educational Institution'),
        ('NGO', 'Non-Profit Organization'),
        ('SCHOOL', 'School / Training Center'),
        ('CORPORATE', 'Corporate Partner'),
    ]

    name = models.CharField(max_length=255)
    logo = models.ImageField(upload_to='partners/', null=True, blank=True)
    description = models.TextField()
    website = models.URLField(blank=True)
    country = models.CharField(max_length=100)
    city = models.CharField(max_length=100)
    partner_type = models.CharField(max_length=20, choices=PARTNER_TYPES, default='CLINIC')
    verified = models.BooleanField(default=False)
    verified_since = models.DateField(null=True, blank=True)
    gna_partner_id = models.CharField(max_length=20, unique=True, null=True, blank=True)

    def __str__(self):
        return self.name

class ApprovedProgram(models.Model):
    FORMAT_CHOICES = [
        ('ONLINE', 'Online'),
        ('OFFLINE', 'Offline'),
        ('HYBRID', 'Hybrid'),
    ]

    partner = models.ForeignKey(AccreditedPartner, on_delete=models.CASCADE, related_name='programs')
    title = models.CharField(max_length=255)
    description = models.TextField()
    duration = models.CharField(max_length=100, help_text="e.g. 40 hours, 3 months", blank=True)
    format = models.CharField(max_length=20, choices=FORMAT_CHOICES, default='ONLINE')
    website = models.URLField(blank=True)
    verified = models.BooleanField(default=True)

    def __str__(self):
        return self.title
