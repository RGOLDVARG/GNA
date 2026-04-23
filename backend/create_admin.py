import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from accounts.models import User

def create_admin():
    email = 'admin@gna.org'
    password = 'GNA-Admin-Secure-2026'
    
    user, created = User.objects.get_or_create(
        email=email,
        defaults={
            'username': email,
            'is_staff': True,
            'is_superuser': True,
            'first_name': 'GNA',
            'last_name': 'Admin'
        }
    )
    
    user.set_password(password)
    user.is_staff = True
    user.is_superuser = True
    user.save()
    
    if created:
        print(f"Created fresh admin user: {email}")
    else:
        print(f"Updated existing admin user: {email}")

if __name__ == "__main__":
    create_admin()
