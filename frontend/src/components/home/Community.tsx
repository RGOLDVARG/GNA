'use client';
import React, { useState } from 'react';
import InquiryModal from '@/components/modals/InquiryModal';

export default function Community() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('Membership Inquiry');
  const [modalType, setModalType] = useState<'MEMBERSHIP' | 'PARTNERSHIP'>('MEMBERSHIP');

  const openModal = (title: string, type: any) => {
    setModalTitle(title);
    setModalType(type);
    setIsModalOpen(true);
  };

  return (
    <>
    {/* Community block */}
    <section style={{ background:'var(--bg-page)', padding:'0 0 100px' }}>
      <div className="container">
        <div style={{
          background:'#0D2A2E',
          borderRadius: 24,
          padding:'64px 72px',
          display:'grid',
          gridTemplateColumns:'1fr 1fr',
          gap:60,
          alignItems:'center'
        }}>
          <div>
            <h2 style={{ color:'white', marginBottom:20, fontSize:'clamp(1.8rem,3vw,2.6rem)' }}>
              The GNA community is active where you are
            </h2>
            <button 
              onClick={() => openModal('Global Chapters Inquiry', 'PARTNERSHIP')}
              className="btn btn-white" 
              style={{ marginTop:8, border: 'none', cursor: 'pointer' }}
            >
              Check out the chapters near you →
            </button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:24 }}>
            {[
              { head:'Connect and network', body:'Join GNA chapters and online communities across 50+ countries.' },
              { head:'Give back', body:'Volunteer, mentor, and contribute to the global neurodiversity movement.' },
              { head:'Find local events', body:'Regional summits, workshops, and webinars available regularly.' },
            ].map(item => (
              <div key={item.head} style={{ display:'flex', gap:18, alignItems:'flex-start' }}>
                <div style={{ width:48, height:48, background:'rgba(13,175,181,0.15)', borderRadius:12, flexShrink:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
                  <div style={{ width:10, height:10, background:'var(--teal)', borderRadius:'50%' }}/>
                </div>
                <div>
                  <h4 style={{ color:'white', marginBottom:4, fontSize:'0.95rem' }}>{item.head}</h4>
                  <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.85rem', lineHeight:1.55 }}>{item.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>

    {/* Bottom CTA band */}
    <section style={{ background:'linear-gradient(90deg,#20103C 0%,#5c16c5 100%)', padding:'80px 0' }}>
      <div className="container" style={{ textAlign:'center' }}>
        <h2 style={{ color:'white', marginBottom:16, fontSize:'clamp(1.7rem,3.5vw,2.8rem)' }}>
          Start learning for free.<br/>Sign up for an GNA account today.
        </h2>
        <p style={{ color:'rgba(255,255,255,0.7)', maxWidth:640, margin:'0 auto 36px', fontSize:'1rem', lineHeight:1.7 }}>
          Unlock dozens of free online courses, digital tools, virtual events, and expert publications to accelerate your career in neurodiversity.
        </p>
        <button 
          onClick={() => openModal('Membership Registration', 'MEMBERSHIP')}
          className="btn btn-dark" 
          style={{ background:'white', color:'var(--text-dark)', padding:'16px 40px', fontSize:'0.95rem', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 700 }}
        >
          Register Now
        </button>
      </div>
    </section>

    <InquiryModal 
      isOpen={isModalOpen} 
      onClose={() => setIsModalOpen(false)} 
      type={modalType}
      title={modalTitle}
    />
    </>
  );
}
