'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Award, Building2, Globe, ArrowRight, Scale, BookOpen, Fingerprint, FileDown, Eye } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import InquiryModal from '@/components/modals/InquiryModal';

const tabs = [
  { id: 'ethics', label: 'Ethics & Standards', icon: <Scale size={18} /> },
  { id: 'accreditation', label: 'Specialist Accreditation', icon: <Fingerprint size={18} /> },
  { id: 'audit', label: 'Institutional Audit', icon: <Building2 size={18} /> },
  { id: 'impact', label: 'Global Impact', icon: <Globe size={18} /> }
];

const content = {
  ethics: {
    featured: {
      tag: 'REGULATORY FRAMEWORK',
      title: 'The GNA Global Ethical Code 2026',
      desc: 'The definitive ethical regulatory standard for practitioners working with ADHD, ASD, and Neurodivergent individuals. A mandatory compliance charter for all certified members.',
      linkText: 'Read Full Ethical Code',
      href: '/ethics',
      bg: 'linear-gradient(135deg, #120A2B 0%, #1E1139 100%)',
      iconColor: '#C5A059'
    },
    list: [
      {
        tag1: 'Regulation',
        tag2: 'Mandatory',
        title: 'Professional Boundaries in Neuro-Coaching',
        desc: 'Detailed guidelines on specialist-client relationships within the neuro-inclusive ecosystem.',
        btnText: 'View Standards',
        href: '/ethics#standards'
      },
      {
        tag1: 'Charter',
        tag2: 'NEW',
        title: 'Rights of the Neurodivergent Individual',
        href: '/ethics#rights'
      }
    ]
  },
  accreditation: {
    featured: {
      tag: 'PROFESSIONAL STANDARDS',
      title: 'The Gold Standard of Credibility',
      desc: 'Individual accreditation for specialists, ensuring every certified practitioner meets the worlds most rigorous clinical and educational benchmarks.',
      linkText: 'Start Verification',
      href: '/certification',
      bg: 'linear-gradient(135deg, #022E3A 0%, #054D5E 100%)',
      iconColor: '#00D1FF'
    },
    list: [
      {
        tag1: 'Fellowship',
        tag2: 'Certification',
        title: 'Global Neuro-Specialist Fellowship (GNSF)®',
        desc: 'Elite recognition for senior practitioners with 5+ years of verified field experience.',
        btnText: 'Apply for Fellowship',
        isModal: true
      },
      {
        tag1: 'Pathway',
        tag2: '⭐ Most Popular',
        title: 'ADHD Associate Accreditation Track',
        href: '/certification'
      }
    ]
  },
  audit: {
    featured: {
      tag: 'INSTITUTIONAL QUALITY',
      title: 'Institutional Audit & Quality Mark',
      desc: 'We audit clinics, schools, and training centers globally to ensure their services align with neuro-inclusive best practices and GNA safety standards.',
      linkText: 'Request Audit Documents',
      isModal: true,
      bg: 'linear-gradient(135deg, #1E1139 0%, #3A0F7E 100%)',
      iconColor: '#B65CFF'
    },
    list: [
      {
        tag1: 'Registry',
        tag2: 'Quality Mark',
        title: 'The Registry of Accredited Healthcare Centers',
        desc: 'Access the list of institutions that have passed the GNA global safety and inclusion audit.',
        btnText: 'Browse Partners',
        href: '/partners'
      },
      {
        tag1: 'Standard',
        tag2: 'Schools',
        title: 'Educational Inclusive Design Standards 2026',
        href: '/ethics'
      }
    ]
  },
  impact: {
    featured: {
      tag: 'ADVOCACY & RESEARCH',
      title: 'Driving Global Policy Change',
      desc: 'Using data to influence international governments and organizations to adopt neuro-inclusive policies and civil rights protections.',
      linkText: 'View Impact Report',
      href: '/news',
      bg: 'linear-gradient(135deg, #00363C 0%, #00505A 100%)',
      iconColor: '#00D1FF'
    },
    list: [
      {
        tag1: 'Research',
        tag2: 'Open Access',
        title: 'The Economic Value of Neuro-Inclusion 2026',
        desc: 'Global data on how standardized neuro-inclusive practices boost GDP and organizational ROI.',
        btnText: 'Read Full Study',
        href: '/news'
      },
      {
        tag1: 'Advocacy',
        tag2: 'UN Liaison',
        title: 'Global Neurodiversity Manifesto Submission',
        href: '/about'
      }
    ]
  }
};

export default function Resources() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('ethics');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Institutional Inquiry');
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);
  
  const activeData = content[activeTab as keyof typeof content];

  const handleAction = (item: any) => {
    if (item.isModal) {
      setModalTitle(item.title || item.linkText);
      setIsModalOpen(true);
    } else if (item.href) {
      router.push(item.href);
    }
  };

  return (
    <section className="resources-section">
      <div className="container">
        
        <div className="resources-header">
          <div style={{ fontSize: '11px', fontWeight: 900, color: '#C5A059', letterSpacing: '0.4em', marginBottom: '24px', textTransform: 'uppercase' }}>GNA REGULATORY COMPASS</div>
          <h2 className="resources-title">
            Official <span style={{ color: '#C5A059' }}>Regulatory Access</span>
          </h2>
          <p className="resources-subtext">
            Instant access to global neurodiversity practice standards, ethical mandates, and institutional quality frameworks.
          </p>
        </div>

        <div style={isMobile ? {
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '10px',
          marginBottom: '32px',
        } : {
          display: 'flex',
          borderBottom: '1px solid #E2E8F0',
          marginBottom: '80px',
          width: '100%',
          overflowX: 'auto',
          scrollbarWidth: 'none',
          padding: '0 20px',
        }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={isMobile ? {
                padding: '14px 10px',
                borderRadius: '14px',
                fontSize: '11px',
                fontWeight: 800,
                background: activeTab === tab.id ? 'white' : '#F1F5F9',
                color: activeTab === tab.id ? '#120A2B' : '#64748B',
                border: activeTab === tab.id ? '1px solid #E2E8F0' : '1px solid transparent',
                boxShadow: activeTab === tab.id ? '0 4px 12px rgba(0,0,0,0.06)' : 'none',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column' as const,
                alignItems: 'center',
                justifyContent: 'center',
                gap: '6px',
                textTransform: 'uppercase' as const,
                letterSpacing: '0.04em',
                lineHeight: 1.3,
                textAlign: 'center' as const,
              } : {
                flex: 1,
                minWidth: '200px',
                padding: '32px 0',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                fontSize: '15px',
                fontWeight: 800,
                color: activeTab === tab.id ? '#120A2B' : '#94A3B8',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                textTransform: 'uppercase' as const,
                position: 'relative' as const,
                whiteSpace: 'nowrap' as const,
              }}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {!isMobile && activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  style={{ position: 'absolute', bottom: '-1px', left: '10%', right: '10%', height: '3px', background: '#C5A059', borderRadius: '2px' }}
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} style={{ display: 'grid', gridTemplateColumns: isMobile ? '1fr' : 'minmax(0, 1.4fr) minmax(0, 1fr)', gap: isMobile ? '16px' : '32px', alignItems: 'stretch' }}>
            
            <div style={{ background: activeData.featured.bg, borderRadius: isMobile ? '24px' : '40px', padding: isMobile ? '32px 20px' : '64px', color: 'white', display: 'flex', flexDirection: 'column', position: 'relative', overflow: 'hidden', boxShadow: '0 40px 80px rgba(18,10,43,0.15)', justifyContent: 'center' }}>
              <div className="featured-icon-bg"><Scale size={400} color={activeData.featured.iconColor} /></div>
              <div style={{ display: 'flex', gap: '12px', marginBottom: '48px', position: 'relative', zIndex: 1 }}>
                <span style={{ fontSize: '10px', fontWeight: 900, border: '1px solid rgba(255,255,255,0.2)', padding: '6px 16px', borderRadius: '100px' }}>{activeData.featured.tag}</span>
                <span style={{ fontSize: '10px', fontWeight: 900, background: '#C5A059', color: '#120A2B', padding: '6px 16px', borderRadius: '100px' }}>⭐ OFFICIAL REPOSITORY</span>
              </div>
              <div style={{ flex: 1, position: 'relative', zIndex: 1 }}>
                <h3 className="featured-title">{activeData.featured.title}</h3>
                <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.7)', marginBottom: '56px', lineHeight: 1.6, maxWidth: '500px' }}>{activeData.featured.desc}</p>
                <button onClick={() => handleAction(activeData.featured)} className="featured-btn">
                  {activeData.featured.linkText} <Eye size={20} />
                </button>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div style={{ background: 'white', borderRadius: '32px', padding: '40px', border: '1px solid #E2E8F0', boxShadow: '0 10px 30px rgba(0,0,0,0.02)', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
                <div style={{ display: 'flex', gap: '12px', marginBottom: '32px' }}><span style={{ fontSize: '10px', fontWeight: 900, color: '#C5A059', textTransform: 'uppercase' }}>{activeData.list[0].tag1}</span></div>
                <h3 style={{ fontSize: '24px', color: '#1E1139', marginBottom: '16px', fontWeight: 900 }}>{activeData.list[0].title}</h3>
                <p style={{ fontSize: '16px', color: '#64748B', marginBottom: '40px', lineHeight: 1.6 }}>{activeData.list[0].desc}</p>
                <button onClick={() => handleAction(activeData.list[0])} style={{ background: '#120A2B', color: 'white', border: 'none', padding: '14px 24px', borderRadius: '12px', fontWeight: 800, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px', width: 'fit-content', marginTop: '16px' }}>
                  {activeData.list[0].btnText} <ArrowRight size={16} />
                </button>
              </div>

              <div onClick={() => handleAction(activeData.list[1])} style={{ background: 'white', borderRadius: '24px', padding: '24px 32px', border: '1px solid #E2E8F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }}>
                <div style={{ flex: 1, paddingRight: '20px' }}>
                  <div style={{ display: 'flex', gap: '12px', marginBottom: '12px' }}><span style={{ fontSize: '10px', fontWeight: 900, color: '#C5A059' }}>{activeData.list[1].tag1}</span></div>
                  <h4 style={{ fontSize: '20px', color: '#1E1139', fontWeight: 900 }}>{activeData.list[1].title}</h4>
                </div>
                <ArrowRight size={32} color="#1E1139" style={{ opacity: 0.2 }} />
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type="GENERAL" title={modalTitle} />
      </div>

      <style jsx>{`
        .resources-section {
          background: #FAF8F5;
          padding: 160px 0;
        }
        .resources-header {
          text-align: center;
          margin-bottom: 100px;
        }
        .resources-title {
          font-size: 64px;
          font-weight: 900;
          color: #1E1139;
          margin-bottom: 32px;
          line-height: 1;
          letter-spacing: -0.04em;
        }
        .resources-subtext {
          font-size: 22px;
          color: #64748B;
          max-width: 850px;
          margin: 0 auto;
          line-height: 1.6;
          font-weight: 500;
        }
        .tabs-container {
          display: flex;
          border-bottom: 1px solid #E2E8F0;
          margin-bottom: 80px;
          width: 100%;
          overflow-x: auto;
          scrollbar-width: none;
          padding: 0 20px;
        }
        .tabs-container::-webkit-scrollbar {
          display: none;
        }
        .tab-button {
          flex: 1;
          min-width: 200px;
          padding: 32px 0;
          background: none;
          border: none;
          cursor: pointer;
          font-size: 15px;
          font-weight: 800;
          color: #94A3B8;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          text-transform: uppercase;
          position: relative;
          white-space: nowrap;
        }
        .tab-button.active {
          color: #120A2B;
        }
        .active-indicator {
          position: absolute;
          bottom: -1px;
          left: 10%;
          right: 10%;
          height: 3px;
          background-color: #C5A059;
        }
        .content-grid {
          display: grid;
          grid-template-columns: 1.4fr 1fr;
          gap: 32px;
          align-items: stretch;
        }
        .featured-card {
          background: ${activeData.featured.bg};
          border-radius: 40px;
          padding: 64px;
          color: white;
          display: flex;
          flex-direction: column;
          position: relative;
          overflow: hidden;
          box-shadow: 0 40px 80px rgba(18, 10, 43, 0.12);
          justify-content: center;
        }
        .featured-icon-bg {
          position: absolute;
          top: -10%;
          right: -10%;
          opacity: 0.1;
          transform: rotate(-15deg);
        }
        .featured-title {
          font-size: 44px;
          color: white;
          margin-bottom: 24px;
          font-weight: 900;
          line-height: 1.1;
          letter-spacing: -0.03em;
        }
        .featured-btn {
          background: white;
          color: #120A2B;
          border: none;
          padding: 20px 48px;
          border-radius: 16px;
          font-weight: 900;
          font-size: 16px;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          width: fit-content;
        }
        .secondary-stack {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }
        .list-card-main {
          background: white;
          border-radius: 32px;
          padding: 40px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 10px 30px rgba(0,0,0,0.02);
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }
        .list-btn {
          background: #120A2B;
          color: white;
          border: none;
          padding: 14px 24px;
          border-radius: 12px;
          font-weight: 800;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          width: fit-content;
          margin-top: 16px;
        }
        .list-card-small {
          background: white;
          border-radius: 24px;
          padding: 24px 32px;
          border: 1px solid #E2E8F0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
        }

        @media (max-width: 991px) {
          .resources-section {
            padding: 80px 0;
          }
          .resources-title {
            font-size: 36px;
          }
          .tabs-container {
            margin-bottom: 40px;
            padding: 0;
            overflow-x: auto;
          }
          .tab-button {
            min-width: 200px;
          }
          .content-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }
          .featured-card {
            padding: 40px 24px;
          }
          .featured-title {
            font-size: 32px;
          }
          .list-card-main {
            padding: 32px 24px;
          }
          .list-card-small {
            padding: 24px;
          }
        }
      `}</style>
    </section>
  );
}
