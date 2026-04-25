import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from news.models import News
from django.utils.text import slugify

def seed_news():
    news_data = [
        {
            'title': 'GNA Presents Neuro-Inclusion Roadmap at the United Nations',
            'category': 'ADVOCACY',
            'content': 'In a significant milestone for global neurodiversity, representatives from the GNA were invited to present the "2026 Neuro-Inclusion Roadmap" at a special session of the United Nations. The presentation highlighted the economic and social benefits of integrating neurodivergent individuals into the global workforce.\n\n"This is not just about human rights; it is about human potential," stated the GNA delegation leader. The roadmap proposes a unified framework for disability rights that specifically addresses the needs of neurodivergent populations in developing nations.',
            'image_url': 'https://images.unsplash.com/photo-1541872703-74c5e443d1f9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            'is_published': True
        },
        {
            'title': 'New Global Accreditation Pathway for ADHD Coaches Launched',
            'category': 'INNOVATION',
            'content': 'GNA is proud to announce the first-ever global accreditation pathway specifically designed for ADHD coaches. This program sets a rigorous standard for professional practice, ensuring that coaches possess the clinical understanding and ethical grounding required to support neurodivergent clients effectively.\n\nGraduates of this program will receive the GNA-Certified ADHD Coach (GCAC) designation, recognized by our institutional partners across six continents. Applications open next month for the inaugural cohort.',
            'image_url': 'https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            'is_published': True
        },
        {
            'title': 'Release of GNA Global Neuro-Inclusion Standards 2026',
            'category': 'ASSOCIATION',
            'content': 'After two years of consultation with experts, advocates, and neurodivergent professionals, the GNA has officially released the Global Neuro-Inclusion Standards for 2026. This comprehensive document provides organizations with clear, actionable criteria for achieving neuro-inclusive certification.\n\nThe updated standards include new sections on remote work accessibility, sensory-friendly office design, and neuro-inclusive leadership training. Organizations that meet these standards will be eligible for the GNA Excellence Award, the highest honor in the field.',
            'image_url': 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            'is_published': True
        }
    ]

    for item in news_data:
        slug = slugify(item['title'])
        news, created = News.objects.get_or_create(
            slug=slug,
            defaults={
                'title': item['title'],
                'category': item['category'],
                'content': item['content'],
                'image_url': item['image_url'],
                'is_published': item['is_published']
            }
        )
        if created:
            print(f'Created news item: {news.title}')
        else:
            print(f'News item already exists: {news.title}')

if __name__ == '__main__':
    seed_news()
