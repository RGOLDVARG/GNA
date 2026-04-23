from django.db import models

class News(models.Model):
    CATEGORY_CHOICES = [
        ('RESEARCH', 'Research'),
        ('ADVOCACY', 'Advocacy'),
        ('INNOVATION', 'Innovation'),
        ('ASSOCIATION', 'Association News'),
    ]

    title = models.CharField(max_length=255)
    slug = models.SlugField(max_length=255, unique=True, blank=True)
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES, default='ASSOCIATION')
    content = models.TextField()
    image = models.ImageField(upload_to='news_images/', null=True, blank=True)
    image_url = models.URLField(max_length=500, null=True, blank=True, help_text="Direct link to image (e.g. Unsplash)")
    published_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    is_published = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = "News"
        ordering = ['-published_at']

class Event(models.Model):
    EVENT_TYPE_CHOICES = [
        ('WEBINAR', 'Webinar'),
        ('CONFERENCE', 'Conference'),
        ('WORKSHOP', 'Workshop'),
        ('MEETING', 'Member Meeting'),
    ]

    title = models.CharField(max_length=255)
    description = models.TextField()
    event_type = models.CharField(max_length=20, choices=EVENT_TYPE_CHOICES, default='WEBINAR')
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    location = models.CharField(max_length=255, help_text="Online link or Physical Address")
    image = models.ImageField(upload_to='event_images/', null=True, blank=True)
    image_url = models.URLField(max_length=500, null=True, blank=True, help_text="Direct link to image")
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ['start_date']
