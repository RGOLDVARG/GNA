import os
import django
import random

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from accounts.models import User

def seed_data():
    specialists = [
        {
            'email': 'petrov@gna.org',
            'first_name': 'Alexei',
            'last_name': 'Petrov',
            'profession': 'Neuropsychiatrist',
            'tier': 'fellow',
            'status': 'active',
            'bio': 'Dr. Alexei Petrov is a world-renowned neuropsychiatrist with over 20 years of research in cognitive neuroplasticity. He leads the GNA Research Division in Eastern Europe.',
            'expertise': 'Neuropsychiatry, ADHD, Cognitive Rehabilitation',
            'languages': 'Russian (Native), English (Fluent)'
        },
        {
            'email': 'jenkins@gna.org',
            'first_name': 'Sarah',
            'last_name': 'Jenkins',
            'profession': 'Executive ADHD Coach',
            'tier': 'professional',
            'status': 'active',
            'bio': 'Sarah Jenkins specializes in high-performance coaching for neurodivergent executives, helping them leverage their unique cognitive styles for leadership excellence.',
            'expertise': 'Executive Coaching, Time Management, Leadership',
            'languages': 'English (Native)'
        },
        {
            'email': 'rossi@gna.org',
            'first_name': 'Marco',
            'last_name': 'Rossi',
            'profession': 'Occupational Therapist',
            'tier': 'fellow',
            'status': 'active',
            'bio': 'Marco Rossi is a pioneer in sensory integration therapy and has developed GNA-standard protocols for workplace sensory audits.',
            'expertise': 'Occupational Therapy, Sensory Integration, Workplace Design',
            'languages': 'Italian (Native), English (Professional)'
        },
        {
            'email': 'wei@gna.org',
            'first_name': 'Lin',
            'last_name': 'Wei',
            'profession': 'Educational Psychologist',
            'tier': 'professional',
            'status': 'pending',
            'bio': 'Lin Wei focuses on neuro-inclusive education systems in primary schools, advocating for early identification and support for twice-exceptional students.',
            'expertise': 'Educational Psychology, 2E Support, Child Development',
            'languages': 'Mandarin (Native), English (Fluent)'
        },
        {
            'email': 'rodriguez@gna.org',
            'first_name': 'Elena',
            'last_name': 'Rodriguez',
            'profession': 'Neuro-Inclusion Consultant',
            'tier': 'fellow',
            'status': 'active',
            'bio': 'Elena Rodriguez advises Fortune 500 companies on building neuro-inclusive HR frameworks and diverse talent acquisition strategies.',
            'expertise': 'HR Strategy, Corporate Inclusion, Advocacy',
            'languages': 'Spanish (Native), English (Professional), Portuguese (Fluent)'
        },
        {
            'email': 'tanaka@gna.org',
            'first_name': 'Yuki',
            'last_name': 'Tanaka',
            'profession': 'Clinical Psychologist',
            'tier': 'professional',
            'status': 'active',
            'bio': 'Dr. Yuki Tanaka specializes in mindfulness-based cognitive therapy for adults with high-masking autism and ADHD.',
            'expertise': 'CBT, Mindfulness, Clinical Psychology',
            'languages': 'Japanese (Native), English (Conversational)'
        },
        {
            'email': 'oconnor@gna.org',
            'first_name': 'David',
            'last_name': "O'Connor",
            'profession': 'Speech & Language Therapist',
            'tier': 'fellow',
            'status': 'active',
            'bio': 'David O\'Connor is an expert in neuro-affirming communication strategies and the impact of verbal processing delays in professional settings.',
            'expertise': 'SLT, Communication, Social Pragmatics',
            'languages': 'English (Native), Irish (Fluent)'
        },
        {
            'email': 'okafor@gna.org',
            'first_name': 'Amara',
            'last_name': 'Okafor',
            'profession': 'Pediatric Neuropsychologist',
            'tier': 'professional',
            'status': 'pending',
            'bio': 'Dr. Amara Okafor leads diagnostic assessments for neurodevelopmental conditions in children and adolescents across Western Africa.',
            'expertise': 'Pediatrics, Neurodevelopment, Diagnostics',
            'languages': 'Yoruba (Native), English (Native), French (Fluent)'
        }
    ]

    for spec in specialists:
        user, created = User.objects.get_or_create(
            email=spec['email'],
            defaults={
                'username': spec['email'],
                'first_name': spec['first_name'],
                'last_name': spec['last_name'],
                'profession': spec['profession'],
                'tier': spec['tier'],
                'certification_status': spec['status'],
                'bio': spec['bio'],
                'expertise': spec['expertise'],
                'languages': spec['languages']
            }
        )
        if created:
            user.set_password('gna-specialist-2026')
            user.save()
            print(f"Seeded: {spec['first_name']} {spec['last_name']} ({spec['tier']})")
        else:
            print(f"Skipped (exists): {spec['email']}")

if __name__ == "__main__":
    seed_data()
