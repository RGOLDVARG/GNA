'use client';
import React, { useState } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import InquiryModal from '@/components/modals/InquiryModal';

const certs = [
  {
    code: 'GNA-CPMAI™',
    name: 'GNA Certified Professional in Neuro-AI (GNA-CPMAI)™ Bundle',
    exp: 'No experience required',
    desc: 'Invigorate your career with the gold standard certification for leading neuro-inclusive AI projects and driving real business impact.',
    bg: 'linear-gradient(180deg, #FFF1E6 0%, #FFFFFF 100%)', 
    color: '#120A2B',
    shape: 'pentagon',
    shapeCol: '#E6C9A8',
    btn: 'dark',
    codeCol: '#120A2B'
  },
  {
    code: 'GANP®',
    name: 'Certified Associate in Neurodiversity Practice (GANP)®',
    exp: 'No experience required',
    desc: 'This certification demonstrates an understanding of the foundational neurodiversity practice skills that professional teams demand.',
    bg: '#00363C',
    color: '#ffffff',
    shape: 'sphere',
    shapeCol: '#00D1FF',
    btn: 'white',
    codeCol: '#64FFDA'
  },
  {
    code: 'GNPP®',
    name: 'Global Neurodiversity Professional (GNPP)®',
    exp: '3-5 years of experience',
    desc: 'The GNPP validates skills and knowledge in managing & directing people, processes, and priorities for a project team from start to finish.',
    bg: '#231141',
    color: '#ffffff',
    shape: 'poly',
    shapeCol: '#A05CFF',
    btn: 'white',
    codeCol: '#D8B4FE'
  },
  {
    code: 'GNA-ACP®',
    name: 'GNA Agile Practitioner (GNA-ACP)®',
    exp: '2+ years of experience',
    desc: 'This certification validates your ability to engage stakeholders, apply neuro-agile approaches, and lead high-performing teams.',
    bg: '#FAF8F5',
    color: '#120A2B',
    shape: 'pentagon',
    shapeCol: '#E6C9A8',
    btn: 'dark',
    codeCol: '#120A2B'
  }
];

const Shape = ({ type, color }: { type: string, color: string }) => {
  if (type === 'pentagon') {
    return (
      <svg width="180" height="180" viewBox="0 0 120 120" style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.9 }}>
        <path d="M60 10 L110 46 L91 105 L29 105 L10 46 Z" fill={color} />
      </svg>
    );
  }
  if (type === 'sphere') {
    return (
      <div style={{ position: 'absolute', top: '20px', right: '20px', width: '150px', height: '150px', borderRadius: '50%', background: `radial-gradient(circle at 30% 30%, ${color}, #000)`, opacity: 0.95, boxShadow: 'inset -20px -20px 40px rgba(0,0,0,0.7)' }}></div>
    );
  }
  return (
    <svg width="180" height="180" viewBox="0 0 120 120" style={{ position: 'absolute', top: '10px', right: '10px', opacity: 0.9 }}>
      <path d="M60 10 L110 110 L10 110 Z" fill={color} />
    </svg>
  );
};

export default function CertCards() {
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const next = () => setIndex((prev) => (prev + 1) % certs.length);
  const prev = () => setIndex((prev) => (prev - 1 + certs.length) % certs.length);

  const onDragEnd = (e: any, { offset }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold && index < certs.length - 1) {
      setIndex(index + 1);
    } else if (offset.x > swipeThreshold && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section className="cert-section">
      <div className="container">
        
        <div className="cert-header">
          <h2 className="cert-title">
            Become a <br/> certified specialist
          </h2>
          <div className="cert-intro">
            <p className="cert-intro-text">
              Unlock your earning power, drive neuro-inclusive success, and stand out from the crowd.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="btn-pill btn-outline-dark" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              View All Certifications <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div className="slider-wrapper">
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            className="slider-track"
            whileTap={{ cursor: 'grabbing' }}
            animate={{ x: `calc(${index} * -1 * (var(--card-width) + var(--gap)))` }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            {certs.map((c, i) => (
              <div 
                key={i} 
                className="cert-card"
                style={{
                  background: c.bg,
                  color: c.color,
                }}
              >
                <Shape type={c.shape} color={c.shapeCol} />
                <div className="card-content">
                  <span className="card-badge" style={{ border: `1.5px solid ${c.color === '#ffffff' ? 'rgba(255,255,255,0.4)' : '#120A2B'}` }}>Certification</span>
                  <div className="card-code" style={{ color: c.codeCol }}>{c.code}</div>
                  <h3 className="card-name" style={{ color: c.color }}>{c.name}</h3>
                  <div className="card-bottom">
                    <div className="card-exp" style={{ color: c.color }}>{c.exp}</div>
                    <p className="card-desc" style={{ color: c.color }}>{c.desc}</p>
                  </div>
                </div>
                <button 
                  onClick={() => setIsModalOpen(true)}
                  style={{ 
                    alignSelf: 'flex-start',
                    background: c.btn === 'dark' ? '#120A2B' : '#ffffff',
                    color: c.btn === 'dark' ? '#ffffff' : '#120A2B',
                    border: 'none',
                    padding: '16px 40px',
                    borderRadius: '99px',
                    fontWeight: 800,
                    fontSize: '15px',
                    cursor: 'pointer'
                  }}>
                  Learn More
                </button>
              </div>
            ))}
          </motion.div>
        </div>

        <InquiryModal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          type="ACCREDITATION"
          title="Certification Inquiry"
        />

        {/* Controls */}
        <div className="slider-controls">
           <div className="progress-bar-wrapper">
              <div className="progress-bar">
                <motion.div className="progress-fill" animate={{ width: `${((index + 1) / certs.length) * 100}%` }} />
              </div>
           </div>
           <div className="nav-arrows">
              <button onClick={prev} className="nav-btn"><ChevronLeft size={48} strokeWidth={1.5} /></button>
              <button onClick={next} className="nav-btn"><ChevronRight size={48} strokeWidth={1.5} /></button>
           </div>
        </div>
      </div>
    </section>
  );
}
