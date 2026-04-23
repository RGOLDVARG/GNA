'use client';
import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
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
  const [cardWidth, setCardWidth] = useState(420);
  const gap = 24;

  useEffect(() => {
    const updateWidth = () => {
      if (window.innerWidth < 480) setCardWidth(window.innerWidth - 40);
      else if (window.innerWidth < 768) setCardWidth(340);
      else setCardWidth(420);
    };
    updateWidth();
    window.addEventListener('resize', updateWidth);
    return () => window.removeEventListener('resize', updateWidth);
  }, []);

  const next = () => setIndex((prev) => (prev + 1) % certs.length);
  const prev = () => setIndex((prev) => (prev - 1 + certs.length) % certs.length);

  const onDragEnd = (e: any, { offset, velocity }: any) => {
    const swipeThreshold = 50;
    if (offset.x < -swipeThreshold && index < certs.length - 1) {
      setIndex(index + 1);
    } else if (offset.x > swipeThreshold && index > 0) {
      setIndex(index - 1);
    }
  };

  return (
    <section style={{ background: '#FAF8F5', padding: '80px 0', overflow: 'hidden' }}>
      <div className="container">
        
        <div className="cert-header">
          <h2 className="cert-title">
            Become a <br/> certified specialist
          </h2>
          <div className="cert-intro">
            <p style={{ fontSize: '20px', color: '#120A2B', marginBottom: '32px', fontWeight: 500, lineHeight: 1.4 }}>
              Unlock your earning power, drive neuro-inclusive success, and stand out from the crowd.
            </p>
            <button onClick={() => setIsModalOpen(true)} className="btn-pill btn-outline-dark" style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              View All Certifications <ArrowRight size={20} />
            </button>
          </div>
        </div>

        <div style={{ position: 'relative', width: '100%' }}>
          <motion.div 
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={onDragEnd}
            style={{ display: 'flex', gap: `${gap}px`, width: 'max-content', cursor: 'grab' }}
            whileTap={{ cursor: 'grabbing' }}
            animate={{ x: -index * (cardWidth + gap) }}
            transition={{ type: 'spring', damping: 25, stiffness: 120 }}
          >
            {certs.map((c, i) => (
              <div 
                key={i} 
                className="cert-card"
                style={{
                  background: c.bg,
                  color: c.color,
                  padding: '60px 48px',
                  borderRadius: '32px',
                  position: 'relative',
                  width: `${cardWidth}px`,
                  minHeight: '600px',
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
                  border: '1px solid rgba(0,0,0,0.05)',
                  flexShrink: 0
                }}
              >
                <Shape type={c.shape} color={c.shapeCol} />
                <div style={{ position: 'relative', zIndex: 1, flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <span style={{ fontSize: '11px', fontWeight: 900, border: `1.5px solid ${c.color === '#ffffff' ? 'rgba(255,255,255,0.4)' : '#120A2B'}`, padding: '6px 14px', borderRadius: '99px', display: 'inline-block', marginBottom: '40px', textTransform: 'uppercase', width: 'fit-content' }}>Certification</span>
                  <div style={{ fontSize: '18px', fontWeight: 900, marginBottom: '8px', color: c.codeCol }}>{c.code}</div>
                  <h3 className="card-name" style={{ color: c.color }}>{c.name}</h3>
                  <div style={{ marginTop: 'auto' }}>
                    <div style={{ fontSize: '14px', fontWeight: 800, marginBottom: '16px', color: c.color }}>{c.exp}</div>
                    <p style={{ fontSize: '16px', lineHeight: 1.5, opacity: 0.9, color: c.color, minHeight: '80px', marginBottom: '40px' }}>{c.desc}</p>
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
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '60px' }}>
           <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <div style={{ width: '60px', height: '4px', background: '#120A2B', borderRadius: '2px', position: 'relative' }}>
                <motion.div style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: '#3A0F7E', borderRadius: '2px' }} animate={{ width: `${((index + 1) / certs.length) * 100}%` }} />
              </div>
           </div>
           <div style={{ display: 'flex', gap: '24px' }}>
              <button onClick={prev} style={{ background: 'none', border: 'none', color: '#120A2B', cursor: 'pointer' }}><ChevronLeft size={48} strokeWidth={1.5} /></button>
              <button onClick={next} style={{ background: 'none', border: 'none', color: '#120A2B', cursor: 'pointer' }}><ChevronRight size={48} strokeWidth={1.5} /></button>
           </div>
        </div>
      </div>

      <style jsx>{`
        .cert-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 80px;
        }
        .cert-title {
          font-size: 72px;
          font-weight: 800;
          color: #120A2B;
          line-height: 0.9;
          letter-spacing: -3px;
        }
        .cert-intro {
          max-width: 500px;
        }
        .card-name {
          font-size: 30px;
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 24px;
          min-height: 100px;
        }

        @media (max-width: 991px) {
          .cert-header {
            flex-direction: column;
            gap: 40px;
          }
          .cert-title {
            font-size: 48px;
          }
          .cert-card {
            padding: 40px 30px !important;
            min-height: 500px !important;
          }
          .card-name {
            font-size: 24px;
            min-height: auto;
          }
        }
      `}</style>
    </section>
  );
}
