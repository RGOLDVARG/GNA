import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'iana_backend.settings')
django.setup()

from registry.models import AccreditedPartner, ApprovedProgram

def seed_partners():
    partners_data = [
        {
            "name": "Neuro-Diversity Global Institute",
            "description": "Leading research and clinical center specializing in ADHD and neuro-divergent support systems.",
            "website": "https://example.com/ndgi",
            "country": "Germany",
            "city": "Berlin",
            "partner_type": "UNIVERSITY",
            "verified": True,
            "gna_partner_id": "PART-000101"
        },
        {
            "name": "MindFlow Clinical Center",
            "description": "A premium private clinic providing comprehensive diagnostics and therapy for adults and children.",
            "website": "https://example.com/mindflow",
            "country": "USA",
            "city": "New York",
            "partner_type": "CLINIC",
            "verified": True,
            "gna_partner_id": "PART-000102"
        },
        {
            "name": "The ADHD Academy",
            "description": "Global educational platform providing certified courses for specialists and families.",
            "website": "https://example.com/academy",
            "country": "UK",
            "city": "London",
            "partner_type": "SCHOOL",
            "verified": True,
            "gna_partner_id": "PART-000103"
        }
    ]

    for p_data in partners_data:
        partner, created = AccreditedPartner.objects.get_or_create(
            gna_partner_id=p_data['gna_partner_id'],
            defaults=p_data
        )
        if created:
            print(f"Created Partner: {partner.name}")
            
            # Add programs for each partner
            if partner.partner_type == "UNIVERSITY":
                ApprovedProgram.objects.create(
                    partner=partner,
                    title="Mastering ADHD Diagnostics",
                    description="Advanced 40-hour program for clinical psychologists.",
                    duration="40 hours",
                    format="ONLINE"
                )
            elif partner.partner_type == "SCHOOL":
                ApprovedProgram.objects.create(
                    partner=partner,
                    title="Neuro-Coaching Certification",
                    description="Professional certification for ADHD coaches.",
                    duration="6 months",
                    format="HYBRID"
                )

if __name__ == "__main__":
    seed_partners()
    print("Seeding complete.")
