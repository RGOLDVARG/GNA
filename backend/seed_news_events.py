import os
import django
from django.utils import timezone
from datetime import timedelta
from django.utils.text import slugify

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from news.models import News, Event

def seed_data():
    # Clear existing data
    News.objects.all().delete()
    Event.objects.all().delete()
    print("Cleared existing News and Event data.")

    # Seed News
    news_items = [
        {
            'title': 'New Study: The Impact of Neuro-Inclusive Workplace Policies',
            'category': 'RESEARCH',
            'content': 'A groundbreaking study funded by GNA reveals that companies with formal neuro-diversity support policies see a 40% higher retention rate among neurodivergent specialists. The research highlights the critical role of sensory-friendly environments and flexible scheduling.',
            'image_url': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            'title': 'GNA Joins Global Neurodiversity Alliance',
            'category': 'ADVOCACY',
            'content': 'In a major move for international standards, GNA has formally joined the Global Neurodiversity Alliance (GNA). This partnership will help unify accreditation standards for ADHD practitioners across Europe and North America.',
            'image_url': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            'title': 'Introducing GNA-Pulse™: AI-Driven Career Mapping',
            'category': 'INNOVATION',
            'content': 'We are excited to launch GNA-Pulse™, a new tool that uses neuro-aligned AI to help neurodivergent professionals identify career paths that align with their unique cognitive profiles and strengths.',
            'image_url': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            'title': 'Association Update: New Ethical Codex Released',
            'category': 'ASSOCIATION',
            'content': 'The 2026 update to the IANA Ethical Codex for Practitioners is now live. All certified members are required to review the updated guidelines on patient advocacy and data privacy.',
            'image_url': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        },
        {
            'title': 'Neuro-Innovation Summit Highlights',
            'category': 'INNOVATION',
            'content': 'The latest Neuro-Innovation summit showcased three new startups focusing on wearable tech for ADHD focus. IANA researchers served as lead validators for the primary efficacy trials.',
            'image_url': 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80'
        }
    ]

    for item in news_items:
        News.objects.create(
            title=item['title'],
            slug=slugify(item['title']),
            category=item['category'],
            content=item['content'],
            image_url=item['image_url'],
            is_published=True
        )
    print(f"Seeded {len(news_items)} news items.")

    # Seed Events
    now = timezone.now()
    events = [
        {
            'title': 'GNA Global Neurodiversity Summit 2026',
            'type': 'CONFERENCE',
            'start': now - timedelta(days=45),
            'location': 'Geneva, Switzerland / Hybrid',
            'desc': 'Our flagship annual conference brought together over 5,000 professionals to discuss the future of neuro-inclusive policy.'
        },
        {
            'title': 'ADHD-Informed Coaching in Corporate Environments',
            'type': 'WEBINAR',
            'start': now - timedelta(days=20),
            'location': 'Online (Recording Available)',
            'desc': 'A deep dive into strategies for managers to support ADHD talent in high-pressure corporate settings.'
        },
        {
            'title': 'Executive Function Support Strategies',
            'type': 'WORKSHOP',
            'start': now - timedelta(days=10),
            'location': 'London, UK',
            'desc': 'A hands-on workshop for clinical practitioners on the latest GNA-accredited support frameworks.'
        },
        {
            'title': 'Member Networking Night: Q1 2026',
            'type': 'MEETING',
            'start': now - timedelta(days=2),
            'location': 'Online / Member Portal',
            'desc': 'A casual gathering for members to share insights and build professional connections.'
        },
        {
            'title': 'Upcoming: International Research Symposium',
            'type': 'CONFERENCE',
            'start': now + timedelta(days=30),
            'location': 'Boston, MA / Hybrid',
            'desc': 'Presenting new longitudinal data on neuro-diversity and long-term career success. Registration opening soon.'
        }
    ]

    for e in events:
        Event.objects.create(
            title=e['title'],
            event_type=e['type'],
            start_date=e['start'],
            end_date=e['start'] + timedelta(hours=3),
            location=e['location'],
            description=e['desc'],
            is_active=True
        )
    print(f"Seeded {len(events)} events.")

if __name__ == "__main__":
    seed_data()
