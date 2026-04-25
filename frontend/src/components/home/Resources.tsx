'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building2, Globe, ArrowRight, Scale, Fingerprint, Eye } from 'lucide-react';
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
          <div className="resources-badge">GNA REGULATORY COMPASS</div>
          <h2 className="resources-title">
            Official <span style={{ color: '#C5A059' }}>Regulatory Access</span>
          </h2>
          <p className="resources-subtext">
            Instant access to global neurodiversity practice standards, ethical mandates, and institutional quality frameworks.
          </p>
        </div>

        <div className="tabs-container">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span>{tab.icon}</span>
              <span>{tab.label}</span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activeTabIndicator"
                  className="active-indicator"
                />
              )}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={activeTab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }} className="content-grid">
            
            <div className="featured-card" style={{ background: activeData.featured.bg }}>
              <div className="featured-icon-bg"><Scale size={400} color={activeData.featured.iconColor} /></div>
              <div className="featured-tags">
                <span className="featured-tag-outline">{activeData.featured.tag}</span>
                <span className="featured-tag-solid">⭐ OFFICIAL REPOSITORY</span>
              </div>
              <div className="featured-content">
                <h3 className="featured-title">{activeData.featured.title}</h3>
                <p className="featured-desc">{activeData.featured.desc}</p>
                <button onClick={() => handleAction(activeData.featured)} className="featured-btn">
                  {activeData.featured.linkText} <Eye size={20} />
                </button>
              </div>
            </div>

            <div className="secondary-stack">
              <div className="list-card-main">
                <div className="list-tags"><span className="list-tag">{activeData.list[0].tag1}</span></div>
                <h3 className="list-title">{activeData.list[0].title}</h3>
                <p className="list-desc">{activeData.list[0].desc}</p>
                <button onClick={() => handleAction(activeData.list[0])} className="list-btn">
                  {activeData.list[0].btnText} <ArrowRight size={16} />
                </button>
              </div>

              <div onClick={() => handleAction(activeData.list[1])} className="list-card-small">
                <div className="list-small-content">
                  <div className="list-tags"><span className="list-tag">{activeData.list[1].tag1}</span></div>
                  <h4 className="list-small-title">{activeData.list[1].title}</h4>
                </div>
                <ArrowRight size={32} color="#1E1139" style={{ opacity: 0.2 }} />
              </div>
            </div>

          </motion.div>
        </AnimatePresence>

        <InquiryModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} type="GENERAL" title={modalTitle} />
      </div>
    </section>
  );
}
