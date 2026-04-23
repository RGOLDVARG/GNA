import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from accounts.models import User

def populate_specialist():
    # Try to find user by GNA ID or just the first user
    user = User.objects.filter(gna_id='GNA-000001').first()
    if not user:
        user = User.objects.first()
        if not user:
            print("No users found in database.")
            return

    user.bio = "Dr. Jane Smith is a leading Clinical Neuropsychologist with over 15 years of experience specializing in Adult ADHD and Neurodiversity. She is a pioneer in implementing the GNA-CPMAI™ framework and has authored several seminal papers on cognitive behavioral strategies for neurodivergent professionals."
    
    user.education = """- Ph.D. in Clinical Psychology, Stanford University (2008)
- M.Sc. in Cognitive Neuroscience, University of Oxford (2004)
- B.A. in Psychology, Harvard University (2002)"""

    user.experience = """- Senior Neuropsychologist, GNA Research Institute (2018 - Present)
- Clinical Director, Neurodiverse Pathways Clinic (2012 - 2018)
- Research Fellow, Global ADHD Initiative (2008 - 2012)"""

    user.licenses = """- Board Certified Clinical Neuropsychologist (ABPP)
- Licensed Psychologist, State of New York (#123456)
- GNA-CPMAI™ Master Trainer Certification"""

    user.publications = """- "Cognitive Landscapes: Navigating Executive Function in High-Performance Environments" (Journal of Neurodiversity, 2022)
- "The ADHD Advantage: Harnessing Divergent Thinking in Global Leadership" (GNA Pulse™, 2020)
- "Neurodiversity in the Workplace: A Guide for Institutional Inclusion" (Academic Press, 2019)"""

    user.languages = "English (Native), French (Professional), Russian (Conversational)"
    user.expertise = "Adult ADHD, Executive Function Coaching, Cognitive Behavioral Therapy, Neurodiversity Advocacy, Clinical Research"
    user.linkedin_url = "https://linkedin.com/in/janesmith-gna"
    user.website_url = "https://janesmith-neuro.com"
    user.profession = "Clinical Neuropsychologist"
    
    user.save()
    print(f"Successfully populated dossier for {user.email} (GNA ID: {user.gna_id})")

if __name__ == "__main__":
    populate_specialist()
