'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InquiryModal from '@/components/modals/InquiryModal';
import { ShieldCheck, Award, Zap, Users, CheckCircle2, ChevronRight, Scale, Landmark, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CertificationPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const openInquiry = (tier: string) => {
    setSelectedTier(tier);
    setIsInquiryOpen(true);
  };

  return (
    <main style={{ backgroundColor: '#FDFCFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Hero Section */}
      <section className="cert-hero">
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <h1 className="main-title">The Global Standard in <br/><span style={{ color: '#C5A059' }}>Neuro-Clinical Excellence</span></h1>
             <p className="sub-title">Validate your proficiency. Join the elite registry of GNA-certified specialists and institutions.</p>
          </motion.div>
        </div>
      </section>

      {/* Pricing/Tiers Section */}
      <section className="container tiers-section">
        <div className="tier-grid">
          
          {/* Associate Tier */}
          <motion.div whileHover={{ y: -10 }} style={{ height: '100%' }}>
            <div className="tier-card" style={{ height: '100%' }}>
              <div className="tier-content">
                 <div className="label-tag">THE ASSOCIATE CHARTER</div>
                 <h3 className="tier-name">GNA-CA® Associate</h3>
                 <div className="price-tag">Upon Request</div>
                 <p className="tier-desc">A foundation for professionals in education, HR, and social services seeking to validate their neuro-inclusive proficiency.</p>
                 
                 <ul className="feature-list">
                   <FeatureItem text="Neurodiversity Fundamentals" />
                   <FeatureItem text="Ethics Charter Compliance" />
                   <FeatureItem text="Digital Seal of Excellence" />
                   <FeatureItem text="Global Directory Access" />
                 </ul>

                 <button onClick={() => openInquiry('Associate Charter')} className="primary-btn">Request Information</button>
              </div>
            </div>
          </motion.div>

          {/* Specialist Tier */}
          <motion.div whileHover={{ y: -10 }} style={{ height: '100%' }}>
            <div className="tier-card-dark" style={{ height: '100%' }}>
              <div className="tier-content">
                 <div className="label-tag-gold">THE SPECIALIST FELLOWSHIP</div>
                 <h3 className="tier-name-white">GNA-CS® Specialist</h3>
                 <div className="price-tag-gold">By Inquiry</div>
                 <p className="tier-desc-light">The highest clinical designation for psychologists and practitioners leading the advancement of neuro-inclusive therapy.</p>
                 
                 <ul className="feature-list-light">
                   <FeatureItem text="Clinical Diagnostic Mastery" />
                   <FeatureItem text="Peer-Review Committee Audit" />
                   <FeatureItem text="Priority Ranking in Registry" />
                   <FeatureItem text="Executive Fellowship Access" />
                 </ul>

                 <button onClick={() => openInquiry('Specialist Fellowship')} className="gold-btn">Apply for Fellowship</button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Institutional Section */}
        <div className="institutional-banner">
           <div className="institutional-flex">
              <div className="institutional-content">
                 <div className="label-tag">INSTITUTIONAL ACCREDITATION</div>
                 <h2 className="inst-title">Transform Your Organization</h2>
                 <p className="inst-desc">
                    For hospitals, schools, and corporate centers. Obtain the GNA-IAS® Institutional Seal and demonstrate your commitment to sensory safety and clinical excellence.
                 </p>
                 <button onClick={() => openInquiry('Institutional Accreditation')} className="outline-btn">Request Institutional Audit <ChevronRight size={18} /></button>
              </div>
              <div style={{ flex: 1, position: 'relative' }}>
                 <div className="stats-box">
                    <div className="stat-item"><div className="stat-num">15</div><div className="stat-label">Audit Pillars</div></div>
                    <div className="stat-item"><div className="stat-num">100%</div><div className="stat-label">Compliance</div></div>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <InquiryModal 
        isOpen={isInquiryOpen} 
        onClose={() => setIsInquiryOpen(false)} 
        subject={`Inquiry regarding ${selectedTier}`} 
      />
      <Footer />

      <style jsx>{`
        .cert-hero {
          background: #120A2B;
          padding: 160px 0;
          position: relative;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-image: radial-gradient(circle at 20% 30%, #3A0F7E 0%, transparent 50%), radial-gradient(circle at 80% 70%, #120A2B 0%, transparent 50%);
        }
        .main-title {
          font-size: 5rem;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
        }
        .sub-title {
          font-size: 1.4rem;
          color: #FFFFFF;
          opacity: 0.8;
          max-width: 800px;
          margin: 0 auto;
        }
        .tiers-section {
          padding: 100px 0 160px;
        }
        .tier-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px;
          margin-top: -80px;
          position: relative;
          z-index: 10;
        }
        .tier-card {
          background: #FFFFFF;
          border-radius: 48px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 40px 100px rgba(0,0,0,0.05);
          overflow: hidden;
        }
        .tier-card-dark {
          background: #120A2B;
          border-radius: 48px;
          border: 1px solid #334155;
          box-shadow: 0 40px 100px rgba(0,0,0,0.2);
          overflow: hidden;
        }
        .tier-content {
          padding: 60px;
        }
        .label-tag {
          font-size: 11px;
          font-weight: 900;
          color: #C5A059;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .label-tag-gold {
          font-size: 11px;
          font-weight: 900;
          color: #C5A059;
          letter-spacing: 0.2em;
          text-transform: uppercase;
        }
        .tier-name {
          font-size: 42px;
          font-weight: 900;
          color: #120A2B;
          margin: 16px 0;
        }
        .tier-name-white {
          font-size: 42px;
          font-weight: 900;
          color: #FFFFFF;
          margin: 16px 0;
        }
        .price-tag {
          font-size: 32px;
          font-weight: 900;
          color: #120A2B;
          margin-bottom: 32px;
        }
        .price-tag-gold {
          font-size: 32px;
          font-weight: 900;
          color: #C5A059;
          margin-bottom: 32px;
        }
        .tier-desc {
          font-size: 17px;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 48px;
        }
        .tier-desc-light {
          font-size: 17px;
          color: #94A3B8;
          line-height: 1.7;
          margin-bottom: 48px;
        }
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 48px;
          color: #120A2B;
        }
        .feature-list-light {
          list-style: none;
          padding: 0;
          margin: 0 0 48px;
          color: #FFFFFF;
        }
        .primary-btn {
          width: 100%;
          padding: 20px;
          border-radius: 16px;
          background: #120A2B;
          color: white;
          border: none;
          font-weight: 900;
          font-size: 16px;
          cursor: pointer;
        }
        .gold-btn {
          width: 100%;
          padding: 20px;
          border-radius: 16px;
          background: #C5A059;
          color: #120A2B;
          border: none;
          font-weight: 900;
          font-size: 16px;
          cursor: pointer;
        }
        .institutional-banner {
          margin-top: 120px;
          background: #FFFFFF;
          padding: 100px;
          border-radius: 60px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 50px 150px rgba(0,0,0,0.03);
        }
        .institutional-flex {
          display: flex;
          gap: 60px;
          align-items: center;
        }
        .institutional-content {
          flex: 1;
        }
        .inst-title {
          font-size: 42px;
          font-weight: 900;
          color: #120A2B;
          margin: 24px 0;
        }
        .inst-desc {
          font-size: 18px;
          color: #64748B;
          line-height: 1.8;
        }
        .outline-btn {
          margin-top: 32px;
          padding: 16px 32px;
          border-radius: 100px;
          border: 2px solid #120A2B;
          background: transparent;
          color: #120A2B;
          font-weight: 900;
          font-size: 15px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .stats-box {
          background: #120A2B;
          padding: 60px;
          border-radius: 40px;
          display: flex;
          gap: 60px;
          color: white;
        }
        .stat-item {
          text-align: center;
        }
        .stat-num {
          font-size: 48px;
          font-weight: 900;
          color: #C5A059;
        }
        .stat-label {
          font-size: 12px;
          font-weight: 700;
          opacity: 0.6;
          text-transform: uppercase;
          margin-top: 8px;
        }

        @media (max-width: 991px) {
          .institutional-flex {
            flex-direction: column;
          }
          .stats-box {
            justify-content: center;
          }
        }

        @media (max-width: 768px) {
          .cert-hero {
            padding: 100px 0 120px;
          }
          .main-title {
            font-size: 2.8rem;
          }
          .sub-title {
            font-size: 1.1rem;
          }
          .tiers-section {
            padding: 80px 0 80px;
          }
          .tier-grid {
            grid-template-columns: 1fr;
            margin-top: -60px;
          }
          .tier-content {
            padding: 40px 24px;
          }
          .tier-name, .tier-name-white {
            font-size: 32px;
          }
          .price-tag, .price-tag-gold {
            font-size: 28px;
          }
          .institutional-banner {
            padding: 40px 24px;
            border-radius: 32px;
            margin-top: 60px;
          }
          .inst-title {
            font-size: 32px;
          }
          .stats-box {
            padding: 40px 24px;
            flex-direction: column;
            gap: 32px;
          }
        }
      `}</style>
    </main>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', fontSize: '15px', fontWeight: 600 }}>
      <CheckCircle2 size={18} color="#C5A059" /> {text}
    </li>
  );
}
