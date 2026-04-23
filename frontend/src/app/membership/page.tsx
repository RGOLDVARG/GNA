'use client';
import React, { useState } from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import InquiryModal from '@/components/modals/InquiryModal';
import { ShieldCheck, GraduationCap, Users, Landmark, CheckCircle2, ChevronRight, Sparkles, HeartHandshake, BookOpen } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function MembershipPage() {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [selectedTier, setSelectedTier] = useState('');

  const openInquiry = (tier: string) => {
    setSelectedTier(tier);
    setIsInquiryOpen(true);
  };

  return (
    <main style={{ backgroundColor: '#FDFCFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Premium Dark Hero Section */}
      <section className="membership-hero">
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
             <h1 className="main-title">Global Professional <br/><span style={{ color: '#C5A059' }}>Membership</span></h1>
             <p className="sub-title">Join the world's most authoritative network of neurodiversity specialists, clinicians, and institutional leaders.</p>
          </motion.div>
        </div>
      </section>

      {/* Membership Tiers Grid */}
      <section className="container tiers-section">
        <div className="tier-grid">
          
          {/* Clinical Associate Tier */}
          <motion.div whileHover={{ y: -10 }} style={{ height: '100%' }}>
            <div className="tier-card" style={{ height: '100%' }}>
              <div className="tier-content">
                 <div className="label-tag">ALLIED PROFESSIONALS</div>
                 <h3 className="tier-name">Clinical Associate</h3>
                 <div className="price-container">
                    <span className="price-tag">$49</span><span className="price-period">/ year</span>
                 </div>
                 <p className="tier-desc">For educators, HR leaders, and allied social workers committed to neuro-inclusive practices.</p>
                 
                 <ul className="feature-list">
                   <FeatureItem text="Access to GNA Research Database" />
                   <FeatureItem text="Monthly Clinical Intelligence Brief" />
                   <FeatureItem text="Digital Associate Membership Badge" />
                   <FeatureItem text="20% Discount on GNA Webinars" />
                   <FeatureItem text="Access to Allied Community Forums" />
                 </ul>

                 <Link href="/register" style={{ textDecoration: 'none' }}>
                   <button className="primary-btn">Join as Associate</button>
                 </Link>
              </div>
            </div>
          </motion.div>

          {/* Professional Member Tier (Highlighted) */}
          <motion.div whileHover={{ y: -10 }} style={{ height: '100%' }}>
            <div className="tier-card-dark" style={{ height: '100%' }}>
               <div className="popular-badge">MOST ACTIVE</div>
              <div className="tier-content">
                 <div className="label-tag-gold">CERTIFIED SPECIALISTS</div>
                 <h3 className="tier-name-white">Professional Member</h3>
                 <div className="price-container">
                    <span className="price-tag-gold">$189</span><span className="price-period-gold">/ year</span>
                 </div>
                 <p className="tier-desc-light">Full professional standing for psychologists, psychiatrists, and advanced clinical practitioners.</p>
                 
                 <ul className="feature-list-light">
                   <FeatureItem text="Official Global Registry Listing" />
                   <FeatureItem text="Voting Rights in General Assembly" />
                   <FeatureItem text="Advanced Clinical Resource Toolkit" />
                   <FeatureItem text="Private Clinical Networking Groups" />
                   <FeatureItem text="Priority Access to GNA Fellowships" />
                   <FeatureItem text="Use of 'GNA-PM' Credentials" />
                 </ul>

                 <Link href="/register" style={{ textDecoration: 'none' }}>
                   <button className="gold-btn">Join as Professional</button>
                 </Link>
              </div>
            </div>
          </motion.div>

          {/* Institutional Partner Tier */}
          <motion.div whileHover={{ y: -10 }} style={{ height: '100%' }}>
            <div className="tier-card" style={{ height: '100%' }}>
              <div className="tier-content">
                 <div className="label-tag">CLINICS & SCHOOLS</div>
                 <h3 className="tier-name">Institutional Partner</h3>
                 <div className="price-container">
                    <span className="price-tag">$599</span><span className="price-period">/ year</span>
                 </div>
                 <p className="tier-desc">For organizations, hospitals, and strategic partners driving institutional neurodiversity standards.</p>
                 
                 <ul className="feature-list">
                   <FeatureItem text="Organizational Registry Listing" />
                   <FeatureItem text="Up to 10 Sub-Accounts for Staff" />
                   <FeatureItem text="Group Training & Audit Discounts" />
                   <FeatureItem text="Unlimited Job Board Posting Credits" />
                   <FeatureItem text="Dedicated GNA Account Manager" />
                   <FeatureItem text="Strategic Partner Roundtables" />
                 </ul>

                 <button onClick={() => openInquiry('Institutional Partnership')} className="primary-btn">Contact Partnerships</button>
              </div>
            </div>
          </motion.div>

        </div>

        {/* Value Proposition Section */}
        <div className="value-banner">
           <div className="value-grid">
              <div className="value-item">
                 <Landmark size={40} color="#C5A059" style={{ marginBottom: '24px' }} />
                 <h4 className="value-title">Global Authority</h4>
                 <p className="value-text">Leverage the official GNA name to validate your clinical and institutional standing in the neurodiversity ecosystem.</p>
              </div>
              <div className="value-item">
                 <Sparkles size={40} color="#C5A059" style={{ marginBottom: '24px' }} />
                 <h4 className="value-title">Elite Network</h4>
                 <p className="value-text">Connect directly with world-class clinicians, top-tier researchers, and innovative institutional leaders.</p>
              </div>
              <div className="value-item">
                 <BookOpen size={40} color="#C5A059" style={{ marginBottom: '24px' }} />
                 <h4 className="value-title">Clinical Excellence</h4>
                 <p className="value-text">Access exclusive, peer-reviewed resources, toolkits, and diagnostic guides aligned with the latest neuro-affirming standards.</p>
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
        .membership-hero {
          background: #120A2B;
          padding: 120px 0;
          position: relative;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          background-image: radial-gradient(circle at 20% 30%, #3A0F7E 0%, transparent 60%), radial-gradient(circle at 80% 70%, #120A2B 0%, transparent 50%);
        }
        .main-title {
          font-size: 4.5rem;
          font-weight: 900;
          color: #FFFFFF;
          line-height: 1.1;
          letter-spacing: -0.04em;
          margin-bottom: 24px;
        }
        .sub-title {
          font-size: 1.3rem;
          color: #FFFFFF;
          opacity: 0.8;
          max-width: 800px;
          margin: 0 auto;
        }
        .tiers-section {
          padding: 0 0 160px;
        }
        .tier-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 32px;
          margin-top: 80px;
          position: relative;
          z-index: 10;
        }
        .tier-card {
          background: #FFFFFF;
          border-radius: 32px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 40px 100px rgba(0,0,0,0.08);
          overflow: hidden;
          display: flex;
          flex-direction: column;
        }
        .tier-card-dark {
          background: #120A2B;
          border-radius: 32px;
          border: 1px solid #334155;
          box-shadow: 0 40px 100px rgba(0,0,0,0.3);
          overflow: hidden;
          position: relative;
          display: flex;
          flex-direction: column;
        }
        .tier-content {
          padding: 50px 40px;
          display: flex;
          flex-direction: column;
          flex-grow: 1;
        }
        .label-tag {
          font-size: 11px;
          font-weight: 900;
          color: #C5A059;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .label-tag-gold {
          font-size: 11px;
          font-weight: 900;
          color: #C5A059;
          letter-spacing: 0.15em;
          text-transform: uppercase;
        }
        .tier-name {
          font-size: 32px;
          font-weight: 900;
          color: #120A2B;
          margin: 12px 0 24px;
          letter-spacing: -0.02em;
        }
        .tier-name-white {
          font-size: 32px;
          font-weight: 900;
          color: #FFFFFF;
          margin: 12px 0 24px;
          letter-spacing: -0.02em;
        }
        .price-container {
          display: flex;
          align-items: baseline;
          gap: 8px;
          margin-bottom: 24px;
        }
        .price-tag {
          font-size: 48px;
          font-weight: 900;
          color: #120A2B;
          letter-spacing: -0.04em;
        }
        .price-tag-gold {
          font-size: 48px;
          font-weight: 900;
          color: #C5A059;
          letter-spacing: -0.04em;
        }
        .price-period {
          font-size: 16px;
          font-weight: 700;
          color: #94A3B8;
        }
        .price-period-gold {
          font-size: 16px;
          font-weight: 700;
          color: rgba(255,255,255,0.5);
        }
        .tier-desc {
          font-size: 15px;
          color: #64748B;
          line-height: 1.7;
          margin-bottom: 40px;
          min-height: 50px;
        }
        .tier-desc-light {
          font-size: 15px;
          color: #94A3B8;
          line-height: 1.7;
          margin-bottom: 40px;
          min-height: 50px;
        }
        .feature-list {
          list-style: none;
          padding: 0;
          margin: 0 0 40px;
          color: #120A2B;
          flex-grow: 1;
        }
        .feature-list-light {
          list-style: none;
          padding: 0;
          margin: 0 0 40px;
          color: #FFFFFF;
          flex-grow: 1;
        }
        .primary-btn {
          width: 100%;
          padding: 18px;
          border-radius: 12px;
          background: #120A2B;
          color: white;
          border: none;
          font-weight: 900;
          font-size: 15px;
          cursor: pointer;
          margin-top: auto;
          transition: all 0.2s;
        }
        .gold-btn {
          width: 100%;
          padding: 18px;
          border-radius: 12px;
          background: #C5A059;
          color: #120A2B;
          border: none;
          font-weight: 900;
          font-size: 15px;
          cursor: pointer;
          margin-top: auto;
          transition: all 0.2s;
          box-shadow: 0 10px 30px rgba(197, 160, 89, 0.2);
        }
        .popular-badge {
          position: absolute;
          top: 24px;
          right: 32px;
          background: #C5A059;
          color: #120A2B;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 10px;
          font-weight: 900;
          letter-spacing: 0.1em;
        }
        .value-banner {
          margin-top: 80px;
          background: #FFFFFF;
          padding: 80px;
          border-radius: 40px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 20px 60px rgba(0,0,0,0.02);
        }
        .value-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
        }
        .value-item {
          text-align: left;
        }
        .value-title {
          font-size: 20px;
          font-weight: 900;
          color: #120A2B;
          margin-bottom: 12px;
        }
        .value-text {
          font-size: 15px;
          color: #64748B;
          line-height: 1.7;
        }

        @media (max-width: 768px) {
          .membership-hero {
            padding: 80px 0 60px;
          }
          .main-title {
            font-size: 2.5rem;
          }
          .sub-title {
            font-size: 1.1rem;
          }
          .tiers-section {
            padding: 0 0 80px;
          }
          .tier-grid {
            grid-template-columns: 1fr;
            gap: 24px;
            margin-top: 40px;
          }
          .tier-content {
            padding: 40px 24px;
          }
          .tier-name, .tier-name-white {
            font-size: 28px;
          }
          .tier-desc, .tier-desc-light {
            min-height: auto;
            margin-bottom: 32px;
          }
          .value-banner {
            padding: 40px 24px;
            margin-top: 40px;
            border-radius: 24px;
          }
          .value-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
        }
      `}</style>
    </main>
  );
}

function FeatureItem({ text }: { text: string }) {
  return (
    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '16px', fontSize: '15px', fontWeight: 600 }}>
      <CheckCircle2 size={18} color="#C5A059" style={{ flexShrink: 0, marginTop: '2px' }} /> 
      <span style={{ lineHeight: 1.5 }}>{text}</span>
    </li>
  );
}
