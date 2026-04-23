'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { Globe, Users, Shield, Target, Award, HeartHandshake, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main style={{ backgroundColor: '#FDFCFB', minHeight: '100vh', fontFamily: "'Inter', sans-serif", color: '#120A2B' }}>
      <Navbar />

      {/* Premium Hero Section */}
      <section className="about-hero">
        <div className="hero-overlay"></div>
        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
            <div className="gold-badge">
              ESTABLISHED 2026 • GLOBAL AUTHORITY
            </div>
            <h1 className="about-title">
              The Global Standard for <br/>
              <span style={{ color: '#C5A059', backgroundImage: 'linear-gradient(45deg, #C5A059, #EAD6A8)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
                Neurodiversity Excellence
              </span>
            </h1>
            <p className="about-subtext">
              GNA is the institutional bridge between scientific integrity and global professional practice, 
              defining the future of neuro-inclusive care and accreditation.
            </p>
          </div>
        </div>
      </section>

      {/* Institutional Mission */}
      <section className="mission-section">
        <div className="decorative-line"></div>
        <div className="container mission-grid">
          <div>
            <h2 className="section-title">Why We Established GNA®</h2>
            <div style={{ width: '60px', height: '4px', background: '#3A0F7E', marginBottom: '40px' }}></div>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#4A4A4A', marginBottom: '32px' }}>
              GNA (Global Neurodiversity Authority) was founded as an independent non-profit institution in direct response to the global fragmentation of neurodiversity support. 
              While scientific understanding of cognitive profiles has accelerated, professional standards and accessibility have struggled to keep pace.
            </p>
            <p style={{ fontSize: '18px', lineHeight: 1.8, color: '#4A4A4A', marginBottom: '40px' }}>
              We opened our doors to serve as the institutional bridge between academic research and real-world practice. 
              Our mission is to architect a worldwide ecosystem where every neurodivergent person is met with 
              <span style={{ color: '#3A0F7E', fontWeight: 800 }}> verified expertise</span>, 
              <span style={{ color: '#3A0F7E', fontWeight: 800 }}> institutional advocacy</span>, and 
              <span style={{ color: '#3A0F7E', fontWeight: 800 }}> ethical excellence</span>.
            </p>
            <div className="stat-grid">
               <div className="premium-stat-box">
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#3A0F7E' }}>50+</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Member States</div>
               </div>
               <div className="premium-stat-box">
                  <div style={{ fontSize: '32px', fontWeight: 900, color: '#3A0F7E' }}>1.2k+</div>
                  <div style={{ fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.1em' }}>Accredited Specialists</div>
               </div>
            </div>
          </div>
          <div className="mandate-card">
             <h3 style={{ fontSize: '24px', fontWeight: 900, marginBottom: '24px', color: '#120A2B' }}>Global Mandate</h3>
             <p style={{ color: '#64748B', lineHeight: 1.8, fontSize: '15px' }}>
               Operating at the intersection of neuroscience and professional standards, GNA (Global Neurodiversity Authority) provides the framework for global accreditation.
             </p>
             <div style={{ marginTop: '32px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="check-row"><CheckGold /> Clinical Integrity Protocols</div>
                <div className="check-row"><CheckGold /> Ethical Compliance Monitoring</div>
                <div className="check-row"><CheckGold /> International Policy Alignment</div>
             </div>
          </div>
        </div>
      </section>

      {/* Core Values - Grid Layout */}
      <section className="values-section">
         <div className="container">
            <div className="values-grid">
               <CoreValue icon={<Shield size={32} />} title="Scientific Integrity" desc="Our standards are derived from the most rigorous peer-reviewed neuroscience." />
               <CoreValue icon={<Globe size={32} />} title="Global Accessibility" desc="Breaking geographical barriers to ensure high-quality care is accessible everywhere." />
               <CoreValue icon={<HeartHandshake size={32} />} title="Ethics First" desc="We maintain zero-tolerance policies for unethical or non-scientific practices." />
            </div>
         </div>
      </section>

      <style jsx>{`
        .about-hero {
          background: linear-gradient(135deg, #120A2B 0%, #3A0F7E 100%);
          padding: 160px 0 100px;
          position: relative;
          overflow: hidden;
        }
        .hero-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.4;
          background-image: radial-gradient(circle at 20% 30%, rgba(197, 160, 89, 0.15) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(0, 209, 255, 0.05) 0%, transparent 50%);
        }
        .gold-badge {
          display: inline-block;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 0.2em;
          color: #C5A059;
          border: 1px solid rgba(197, 160, 89, 0.3);
          padding: 8px 24px;
          border-radius: 100px;
          margin-bottom: 32px;
        }
        .about-title {
          font-size: 5rem;
          font-weight: 900;
          color: white;
          line-height: 1.05;
          letter-spacing: -0.04em;
          margin-bottom: 32px;
        }
        .about-subtext {
          font-size: 1.4rem;
          color: #FFFFFF;
          line-height: 1.6;
          font-weight: 400;
        }
        .mission-section {
          padding: 80px 0;
          position: relative;
          overflow: hidden;
        }
        .decorative-line {
          position: absolute;
          top: 10%;
          right: -5%;
          width: 30%;
          height: 80%;
          border: 2px solid rgba(58, 15, 126, 0.03);
          border-radius: 50%;
          z-index: 0;
        }
        .section-title {
          font-size: 42px;
          font-weight: 900;
          color: #120A2B;
          letter-spacing: -0.02em;
          margin-bottom: 24px;
        }
        .mission-grid {
          display: grid;
          grid-template-columns: 1.2fr 0.8fr;
          gap: 100px;
          align-items: center;
          position: relative;
          z-index: 1;
        }
        .stat-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }
        .premium-stat-box {
          padding: 32px;
          background: #F8FAFC;
          border-radius: 24px;
          border: 1px solid #E2E8F0;
        }
        .mandate-card {
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid #E2E8F0;
          padding: 60px;
          border-radius: 48px;
          box-shadow: 0 40px 100px rgba(0,0,0,0.05);
        }
        .check-row {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 15px;
          font-weight: 700;
          color: #120A2B;
        }
        .values-section {
          padding: 80px 0;
          background: #120A2B;
          color: white;
        }
        .values-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 60px;
        }

        @media (max-width: 991px) {
          .about-title {
            font-size: 3rem;
          }
          .mission-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }
          .values-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }
          .mandate-card {
            padding: 40px 30px;
          }
        }

        @media (max-width: 768px) {
          .about-hero {
            padding: 120px 0 80px;
          }
          .about-title {
            font-size: 2.5rem;
          }
          .about-subtext {
            font-size: 1.1rem;
          }
          .mission-section, .values-section {
            padding: 60px 0;
          }
          .section-title {
            font-size: 32px;
          }
          .stat-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }
          .premium-stat-box {
            padding: 24px;
          }
          .mandate-card {
            padding: 32px 24px;
            border-radius: 32px;
          }
          .values-grid {
            gap: 48px;
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}

// Sub-components
function CoreValue({ icon, title, desc }: any) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px auto', color: '#C5A059' }}>{icon}</div>
      <h3 style={{ fontSize: '22px', fontWeight: 900, marginBottom: '16px', color: '#FFFFFF' }}>{title}</h3>
      <p style={{ fontSize: '15px', color: '#FFFFFF', lineHeight: 1.7 }}>{desc}</p>
    </div>
  );
}

// Styles
const CheckGold = () => <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#C5A059', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '10px' }}>✓</div>;
