import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from news.models import News
from django.utils.text import slugify

def reset_and_seed():
    # Delete all existing news
    News.objects.all().delete()
    print("Deleted all news items.")

    news_data = [
        {
            'title': 'New Study: The Impact of Neuro-Inclusive Workplace Policies',
            'category': 'RESEARCH',
            'content': 'A comprehensive research project funded by the GNA has revealed a 40% increase in long-term retention for specialists working in neuro-inclusive environments. The study analyzed over 500 institutions worldwide and found that small adjustments in communication and workplace structure lead to significant gains in productivity and employee well-being.\n\n"The findings confirm what we have long suspected," says Dr. Alexander Thorne, lead researcher. "Inclusion is not just a moral imperative; it is a strategic advantage for any modern organization."',
            'image_url': 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            'is_published': True
        },
        {
            'title': 'GNA Joins Global Neurodiversity Alliance',
            'category': 'ADVOCACY',
            'content': 'In a historic move, the Global Neurodiversity Association has officially joined the Global Neurodiversity Alliance (GNA-Global). This partnership aims to create universally recognized accreditation standards for ADHD practitioners, autism educators, and neuro-inclusion consultants.\n\nBy uniting under a single regulatory framework, we ensure that neurodivergent individuals receive the same high standard of care and support regardless of their geographic location. This move is expected to double the reach of our advocacy efforts in the coming year.',
            'image_url': 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            'is_published': True
        },
        {
            'title': 'Introducing GNA-Pulse™: AI-Driven Career Mapping',
            'category': 'INNOVATION',
            'content': 'The future of professional development is here. GNA is proud to announce the launch of GNA-Pulse™, a proprietary AI-driven platform designed specifically for neuro-inclusion specialists. The tool analyzes a member\'s current skills, certifications, and experience to provide a personalized roadmap for career advancement.\n\n"GNA-Pulse™ bridges the gap between certification and practice," says our Head of Innovation. "It helps specialists identify their unique strengths and matches them with global opportunities in research and advocacy."',
            'image_url': 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=800&q=80',
            'is_published': True
        }
    ]

    for item in news_data:
        slug = slugify(item['title'])
        news = News.objects.create(
            title=item['title'],
            slug=slug,
            category=item['category'],
            content=item['content'],
            image_url=item['image_url'],
            is_published=item['is_published']
        )
        print(f'Created news item: {news.title} (ID: {news.id})')

if __name__ == '__main__':
    reset_and_seed()
