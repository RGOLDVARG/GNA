from django.db import models

class Inquiry(models.Model):
    TYPE_CHOICES = [
        ('ACCREDITATION', 'Accreditation Request'),
        ('PARTNERSHIP', 'Partnership Inquiry'),
        ('MEMBERSHIP', 'Membership Question'),
        ('NEWSLETTER', 'Newsletter Subscription'),
        ('GENERAL', 'General Inquiry'),
    ]

    STATUS_CHOICES = [
        ('NEW', 'New'),
        ('PROCESSING', 'Processing'),
        ('COMPLETED', 'Completed'),
        ('REJECTED', 'Rejected'),
    ]

    full_name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    inquiry_type = models.CharField(max_length=20, choices=TYPE_CHOICES, default='GENERAL')
    message = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='NEW')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.full_name} - {self.get_inquiry_type_display()}"

    class Meta:
        verbose_name_plural = "Inquiries"
        ordering = ['-created_at']
