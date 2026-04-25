'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Navbar from '@/components/layout/Navbar';
import { 
  Shield, MapPin, Calendar, Globe, ArrowLeft, Award, User as UserIcon, CheckCircle2, Mail, GraduationCap, Briefcase, FileText, Languages, BookOpen 
} from 'lucide-react';
import InquiryModal from '@/components/modals/InquiryModal';

export default function SpecialistProfilePage() {
  const { gnaId } = useParams();
  const router = useRouter();
  const [specialist, setSpecialist] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${API_URL}/api/registry/profile/${gnaId}/`);
        if (res.ok) {
          const data = await res.json();
          setSpecialist(data);
        }
      } catch (err) { console.error('Fetch error:', err); } finally { setLoading(false); }
    }
    if (gnaId) fetchProfile();
  }, [gnaId]);

  if (loading) return <div style={{ background: '#F8FAFC', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><div className="loader"></div></div>;

  if (!specialist) return <div style={{ textAlign: 'center', padding: '120px 20px', background: '#F8FAFC', minHeight: '100vh' }}><h2 style={{ fontSize: '32px', fontWeight: 900 }}>Expert Profile Not Found</h2><button onClick={() => router.push('/registry')} style={{ background: '#3A0F7E', color: 'white', border: 'none', padding: '14px 28px', borderRadius: '12px', fontWeight: 700, cursor: 'pointer', marginTop: '32px' }}>Back to Registry</button></div>;

  return (
    <main style={{ background: '#F8FAFC', minHeight: '100vh', fontFamily: 'Inter, sans-serif' }}>
      <Navbar />

      <div style={{ height: '400px', background: 'linear-gradient(135deg, #120A2B 0%, #3A0F7E 100%)', width: '100%', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'absolute', top: '20%', left: '10%', width: '300px', height: '300px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(0, 209, 255, 0.15) 0%, transparent 70%)', filter: 'blur(40px)' }}></div>
      </div>

      <div className="container" style={{ marginTop: '-200px', paddingBottom: '120px', position: 'relative', zIndex: 2 }}>
        <button onClick={() => router.push('/registry')} style={backBtnStyle}><ArrowLeft size={18} /> Return to Expert Registry</button>

        <div style={profileGridStyle}>
          {/* Sidebar */}
          <div style={sidebarColumnStyle}>
            <div style={profileCardStyle}>
              <div style={avatarWrapperStyle}>
                <div style={avatarMainStyle}>
                  {specialist.avatar ? <img src={specialist.avatar.startsWith('http') ? specialist.avatar : `${process.env.NEXT_PUBLIC_API_URL || ''}${specialist.avatar}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="S" /> : <UserIcon size={56} color="#CBD5E1" />}
                </div>
                {specialist.certification_status === 'active' && <div style={verifiedBadgeStyle}><CheckCircle2 size={32} color="white" fill="#00D1FF" /></div>}
              </div>
              <h1 style={profileNameStyle}>{specialist.first_name} {specialist.last_name}</h1>
              <p style={profileProfessionStyle}>{specialist.profession || 'GNA® Certified Professional'}</p>
              
              <div style={dividerStyle}></div>

              <div style={contactInfoStyle}>
                <div style={infoRowStyle}><div style={iconBoxStyle}><Shield size={18} color="#3A0F7E" /></div><div><span style={infoLabelStyle}>Official GNA ID</span><div style={infoValueStyle}>{specialist.gna_id}</div></div></div>
                <div style={infoRowStyle}><div style={iconBoxStyle}><MapPin size={18} color="#64748B" /></div><div><span style={infoLabelStyle}>Location</span><div style={infoValueStyle}>{specialist.city}, {specialist.country}</div></div></div>
              </div>
            </div>

            <div style={{ ...profileCardStyle, marginTop: '24px', padding: '32px', background: '#120A2B', color: 'white', textAlign: 'left' }}>
              <h4 style={{ margin: 0, fontSize: '18px', fontWeight: 800 }}>Contact Expert</h4>
              <p style={{ margin: '8px 0 24px', color: 'rgba(255,255,255,0.6)', fontSize: '14px' }}>Submit an official inquiry for consultations or research collaboration.</p>
              <button onClick={() => setIsModalOpen(true)} style={{ width: '100%', padding: '14px', borderRadius: '12px', border: 'none', background: '#00D1FF', color: '#120A2B', fontWeight: 900, cursor: 'pointer' }}>
                Request Consultation
              </button>
            </div>
          </div>

          {/* Content */}
          <div style={mainContentColumnStyle}>
             <div style={contentCardStyle}>
                <div style={cardHeaderStyle}><div style={headerIconStyle}><FileText size={22} color="#3A0F7E" /></div><h3 style={sectionTitleStyle}>Professional Biography</h3></div>
                <p style={bioTextStyle}>{specialist.bio || 'Professional details verified by GNA Registry.'}</p>
             </div>
             
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                <div style={contentCardStyle}>
                  <div style={cardHeaderStyle}><div style={headerIconStyle}><GraduationCap size={22} color="#3A0F7E" /></div><h3 style={sectionTitleStyle}>Academic Credentials</h3></div>
                  <div style={dossierTextStyle}>{specialist.education || 'Credentials audited by GNA Board.'}</div>
                </div>
                <div style={contentCardStyle}>
                  <div style={cardHeaderStyle}><div style={headerIconStyle}><Award size={22} color="#3A0F7E" /></div><h3 style={sectionTitleStyle}>Expertise Tags</h3></div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                    {(specialist.expertise || 'ADHD, Neurodiversity').split(',').map((tag: string) => <span key={tag} style={tagStyle}>{tag.trim()}</span>)}
                  </div>
                </div>
             </div>

             {/* Platinum Status */}
             <div style={{ ...contentCardStyle, background: 'linear-gradient(135deg, #F0FDFA 0%, #FFFFFF 100%)', border: '2px solid #0D9488', display: 'flex', gap: '32px', alignItems: 'center' }}>
                <div style={{ width: '80px', height: '80px', borderRadius: '24px', background: '#0D9488', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Shield size={40} /></div>
                <div>
                   <h4 style={{ margin: 0, fontSize: '22px', fontWeight: 900 }}>GNA® Platinum Verification</h4>
                   <p style={{ margin: '8px 0 0', color: '#475569', fontSize: '16px' }}>This specialist has completed the world's most rigorous neurodiversity accreditation framework.</p>
                </div>
             </div>
          </div>
        </div>
      </div>

      <InquiryModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        type="GENERAL" 
        title={`Inquiry: ${specialist.first_name} ${specialist.last_name}`} 
      />

      <style jsx>{`.loader { width: 50px; height: 50px; border: 4px solid #F1F5F9; border-bottom-color: #3A0F7E; border-radius: 50%; animation: rotation 1s linear infinite; } @keyframes rotation { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
    </main>
  );
}

const backBtnStyle: React.CSSProperties = { background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '12px 24px', borderRadius: '100px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '10px', fontWeight: 700, marginBottom: '40px', backdropFilter: 'blur(10px)' };
const profileGridStyle: React.CSSProperties = { display: 'grid', gridTemplateColumns: '380px 1fr', gap: '40px' };
const sidebarColumnStyle: React.CSSProperties = {};
const mainContentColumnStyle: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '32px' };
const profileCardStyle: React.CSSProperties = { background: 'white', borderRadius: '32px', padding: '48px 40px', textAlign: 'center', boxShadow: '0 25px 50px rgba(18, 10, 43, 0.08)', border: '1px solid #F1F5F9' };
const avatarWrapperStyle: React.CSSProperties = { width: '140px', height: '140px', margin: '0 auto 32px', position: 'relative' };
const avatarMainStyle: React.CSSProperties = { width: '100%', height: '100%', borderRadius: '40px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', border: '4px solid white' };
const verifiedBadgeStyle: React.CSSProperties = { position: 'absolute', bottom: '-10px', right: '-10px', background: 'white', borderRadius: '50%', padding: '2px', boxShadow: '0 4px 10px rgba(0,0,0,0.1)' };
const profileNameStyle: React.CSSProperties = { fontSize: '32px', fontWeight: 900, color: '#120A2B', margin: '0 0 10px 0', letterSpacing: '-0.03em' };
const profileProfessionStyle: React.CSSProperties = { fontSize: '17px', color: '#3A0F7E', fontWeight: 700, margin: 0 };
const dividerStyle: React.CSSProperties = { height: '1px', background: '#F1F5F9', margin: '32px 0' };
const contactInfoStyle: React.CSSProperties = { textAlign: 'left', display: 'flex', flexDirection: 'column', gap: '24px' };
const infoRowStyle: React.CSSProperties = { display: 'flex', gap: '16px', alignItems: 'center' };
const iconBoxStyle: React.CSSProperties = { width: '40px', height: '40px', borderRadius: '12px', background: '#F8FAFC', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 };
const infoLabelStyle: React.CSSProperties = { display: 'block', fontSize: '11px', fontWeight: 800, color: '#94A3B8', textTransform: 'uppercase', letterSpacing: '0.08em' };
const infoValueStyle: React.CSSProperties = { fontSize: '15px', fontWeight: 700, color: '#120A2B' };
const contentCardStyle: React.CSSProperties = { background: 'white', borderRadius: '32px', padding: '48px', border: '1px solid #F1F5F9' };
const cardHeaderStyle: React.CSSProperties = { display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '32px' };
const headerIconStyle: React.CSSProperties = { width: '44px', height: '44px', borderRadius: '12px', background: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' };
const sectionTitleStyle: React.CSSProperties = { fontSize: '22px', fontWeight: 900, color: '#120A2B', margin: 0 };
const bioTextStyle: React.CSSProperties = { fontSize: '18px', lineHeight: 1.8, color: '#475569', whiteSpace: 'pre-wrap' };
const dossierTextStyle: React.CSSProperties = { fontSize: '16px', lineHeight: 1.7, color: '#475569', whiteSpace: 'pre-wrap' };
const tagStyle: React.CSSProperties = { background: '#F1F5F9', color: '#120A2B', padding: '8px 18px', borderRadius: '100px', fontSize: '14px', fontWeight: 700 };
