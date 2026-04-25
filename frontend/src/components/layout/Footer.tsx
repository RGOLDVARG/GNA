'use client';
import React from 'react';
import Link from 'next/link';
import { ExternalLink, Mail, MapPin, ShieldCheck, Globe } from 'lucide-react';

const footerData = [
  {
    title: 'Registry & Standards',
    links: [
      { label: 'Specialist Registry', href: '/registry' },
      { label: 'Accredited Partners', href: '/partners' },
      { label: 'Approved Education', href: '/partners' },
      { label: 'Code of Ethics', href: '/ethics' },
      { label: 'Verification Policy', href: '/coming-soon' }
    ]
  },
  {
    title: 'Certifications',
    links: [
      { label: 'Certified ADHD Professional', href: '/certification' },
      { label: 'Neuro-Inclusive Specialist', href: '/certification' },
      { label: 'Educational Consultant', href: '/certification' },
      { label: 'Compare Credentials', href: '/certification' }
    ]
  },
  {
    title: 'Membership',
    links: [
      { label: 'Become a Member', href: '/membership' },
      { label: 'Member Benefits', href: '/membership' },
      { label: 'Institutional Membership', href: '/membership' },
      { label: 'Membership FAQs', href: '/coming-soon' }
    ]
  },
  {
    title: 'GNA Organization',
    links: [
      { label: 'Mission & Vision', href: '/about' },
      { label: 'Global Standards', href: '/about' },
      { label: 'Leadership', href: '/about' },
      { label: 'Contact Support', href: '/contact' }
    ]
  }
];

export default function Footer() {
  return (
    <footer style={{ 
      background: '#F8FAFC', 
      borderTop: '1px solid #E2E8F0', 
      padding: '100px 0 60px 0',
      color: '#120A2B'
    }}>
      <div className="container">
        
        {/* Main Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px', marginBottom: '80px' }}>
          
          {footerData.map((col, idx) => (
            <div key={idx}>
              <h5 style={{ fontSize: '14px', fontWeight: 900, marginBottom: '28px', color: '#120A2B', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{col.title}</h5>
              <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link href={link.href} style={{ fontSize: '14px', color: '#64748B', textDecoration: 'none', fontWeight: 500, transition: 'color 0.2s' }}>
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Branding Column */}
          <div style={{ gridColumn: 'span 1' }}>
             <div style={{ marginBottom: '32px' }}>
                <img src="/images/gna_logo.svg" alt="GNA" style={{ width: '180px', height: '50px', objectFit: 'contain', objectPosition: 'left' }} />
             </div>
             <p style={{ fontSize: '14px', color: '#64748B', lineHeight: 1.6, marginBottom: '24px' }}>
               The Global Neurodiversity Association is an independent non-profit institution and the leading international body for professional accreditation and standards.
             </p>
             <div style={{ display: 'flex', gap: '16px' }}>
                <div style={socialIconStyle}><Globe size={18} /></div>
                <div style={socialIconStyle}><Mail size={18} /></div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom">
          <div className="footer-bottom-left">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#059669', fontSize: '12px', fontWeight: 800 }}>
              <ShieldCheck size={16} /> INSTITUTIONAL STANDARDS SECURED
            </div>
            <div style={{ display: 'flex', gap: '20px', fontSize: '12px', fontWeight: 600, color: '#94A3B8' }}>
               <Link href="/coming-soon" style={{ color: 'inherit', textDecoration: 'none' }}>Privacy Policy</Link>
               <Link href="/coming-soon" style={{ color: 'inherit', textDecoration: 'none' }}>Terms of Service</Link>
            </div>
          </div>
          <div style={{ fontSize: '12px', color: '#94A3B8', fontWeight: 500 }}>
             © 2026 GNA®. Global Neurodiversity Association. All Rights Reserved.
          </div>
        </div>
      </div>

      <style jsx>{`
        .footer-bottom {
          border-top: 1px solid #E2E8F0;
          padding-top: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          gap: 20px;
        }
        .footer-bottom-left {
          display: flex;
          align-items: center;
          gap: 32px;
        }

        @media (max-width: 768px) {
          .footer-bottom {
            flex-direction: column;
            text-align: center;
          }
          .footer-bottom-left {
            flex-direction: column;
            gap: 16px;
          }
        }
      `}</style>
    </footer>
  );
}

const socialIconStyle: React.CSSProperties = {
  width: '40px', 
  height: '40px', 
  borderRadius: '10px', 
  background: 'white', 
  border: '1px solid #E2E8F0', 
  display: 'flex', 
  alignItems: 'center', 
  justifyContent: 'center',
  color: '#3A0F7E',
  cursor: 'pointer'
};
