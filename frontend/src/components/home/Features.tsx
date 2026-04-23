'use client';

import React from 'react';
import { motion } from 'framer-motion';

const segments = [
  {
    label: 'Standardization',
    title: 'Individual & Program Certification',
    description: 'We establish internationally recognized benchmarks for ADHD and neurodiversity qualifications, ensuring public trust and professional integrity.',
    cta: 'Certification Pathways'
  },
  {
    label: 'Transparency',
    title: 'The Global Specialist Registry',
    description: 'A verified database of accredited practitioners, providing individuals and organizations with a direct link to gold-standard expertise.',
    cta: 'Browse Registry'
  }
];

export default function Features() {
  return (
    <section style={{ background: 'var(--surface)' }}>
      <div className="container">
        {segments.map((seg, i) => (
          <div key={i} style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', 
            gap: '100px',
            alignItems: 'center',
            marginBottom: i === 0 ? '160px' : '0'
          }}>
            <div style={{ order: i % 2 === 0 ? 1 : 2 }}>
              <span className="label-premium">{seg.label}</span>
              <h2 style={{ fontSize: '3.5rem', marginBottom: '32px' }}>{seg.title}</h2>
              <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px' }}>{seg.description}</p>
              <button className="btn btn-outline">{seg.cta}</button>
            </div>
            
            <div style={{ 
              order: i % 2 === 0 ? 2 : 1,
              background: '#F0EFEA',
              aspectRatio: '16/10',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'rgba(0,0,0,0.05)',
              fontSize: '4rem',
              fontWeight: 900
            }}>
              SECTION IMAGE
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
