import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from accounts.models import User

def make_staff():
    user = User.objects.filter(email='test@gna.org').first()
    if user:
        user.is_staff = True
        user.is_superuser = True # for full access
        user.save()
        print(f"Successfully promoted {user.email} to Staff/Superuser.")
    else:
        print("User test@gna.org not found.")

if __name__ == "__main__":
    make_staff()
