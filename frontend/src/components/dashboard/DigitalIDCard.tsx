'use client';
import React from 'react';
import { Shield, CheckCircle2, Globe } from 'lucide-react';

interface DigitalIDCardProps {
  user: any;
}

export default function DigitalIDCard({ user }: DigitalIDCardProps) {
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
  
  return (
    <div style={cardContainerStyle}>
      {/* Front of the Card */}
      <div style={cardStyle}>
        {/* Holographic effect overlay */}
        <div style={hologramStyle}></div>
        
        {/* Chip and Logo */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
          <div style={chipStyle}></div>
          <div style={{ textAlign: 'right' }}>
             <img src="/images/gna_logo.svg" alt="GNA" style={{ height: '24px', filter: 'brightness(0) invert(1)' }} />
             <div style={{ fontSize: '8px', fontWeight: 900, color: '#00D1FF', letterSpacing: '0.1em', marginTop: '4px' }}>INSTITUTIONAL ID</div>
          </div>
        </div>

        {/* Profile Section */}
        <div style={{ display: 'flex', gap: '24px', alignItems: 'flex-end' }}>
          <div style={photoFrameStyle}>
            {user.avatar ? (
              <img src={user.avatar.startsWith('http') ? user.avatar : `${API_URL}${user.avatar}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="User" />
            ) : (
              <div style={{ background: '#1E1139', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={32} color="rgba(255,255,255,0.2)" />
              </div>
            )}
          </div>
          
          <div style={{ flex: 1 }}>
            <h3 style={nameStyle}>{user.first_name} {user.last_name}</h3>
            <p style={professionStyle}>{user.profession || 'Verified Specialist'}</p>
          </div>
        </div>

        {/* Bottom Data */}
        <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
          <div>
            <div style={labelStyle}>MEMBER ID</div>
            <div style={valueStyle}>{user.gna_id || 'GNA-PENDING'}</div>
          </div>
          <div>
            <div style={labelStyle}>ISSUED</div>
            <div style={valueStyle}>JAN 2026</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={labelStyle}>STATUS</div>
            <div style={{ ...valueStyle, color: user.certification_status === 'active' ? '#00D1FF' : '#FFA500' }}>
              {user.certification_status === 'active' ? 'CERTIFIED' : 'PENDING'}
            </div>
          </div>
        </div>

        {/* Security Bar */}
        <div style={securityBarStyle}>
           <Shield size={12} color="rgba(255,255,255,0.4)" />
           <span style={{ fontSize: '9px', fontWeight: 800, color: 'rgba(255,255,255,0.4)' }}>OFFICIAL GNA® SECURITY ENCRYPTED CARD</span>
        </div>
      </div>
      
      <p style={{ textAlign: 'center', fontSize: '12px', color: '#64748B', marginTop: '20px', fontWeight: 600 }}>
        This is your official GNA® Institutional Digital ID. <br/> Use this to verify your credentials at authorized events.
      </p>
    </div>
  );
}

const cardContainerStyle: React.CSSProperties = { perspective: '1000px', width: '100%', maxWidth: '450px', margin: '0 auto' };
const cardStyle: React.CSSProperties = {
  background: 'linear-gradient(135deg, #120A2B 0%, #1E1139 50%, #3A0F7E 100%)',
  borderRadius: '24px',
  padding: '30px',
  color: 'white',
  position: 'relative',
  overflow: 'hidden',
  boxShadow: '0 30px 60px rgba(18, 10, 43, 0.4)',
  border: '1px solid rgba(255,255,255,0.1)',
  height: '280px',
  display: 'flex',
  flexDirection: 'column'
};
const hologramStyle: React.CSSProperties = {
  position: 'absolute',
  top: '-50%',
  left: '-50%',
  width: '200%',
  height: '200%',
  background: 'linear-gradient(45deg, transparent 40%, rgba(255,255,255,0.05) 45%, rgba(0, 209, 255, 0.1) 50%, rgba(255,255,255,0.05) 55%, transparent 60%)',
  pointerEvents: 'none',
  animation: 'hologramMove 8s infinite linear'
};
const chipStyle: React.CSSProperties = {
  width: '44px',
  height: '34px',
  background: 'linear-gradient(135deg, #FFD700 0%, #C5A059 100%)',
  borderRadius: '6px',
  position: 'relative',
  boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.3)'
};
const photoFrameStyle: React.CSSProperties = {
  width: '100px',
  height: '110px',
  borderRadius: '16px',
  overflow: 'hidden',
  border: '2px solid rgba(255,255,255,0.2)',
  boxShadow: '0 10px 20px rgba(0,0,0,0.3)',
  backgroundColor: '#120A2B'
};
const nameStyle: React.CSSProperties = { fontSize: '24px', fontWeight: 900, margin: 0, letterSpacing: '-0.02em', lineHeight: 1 };
const professionStyle: React.CSSProperties = { fontSize: '13px', fontWeight: 700, color: '#00D1FF', margin: '8px 0 0', textTransform: 'uppercase' };
const labelStyle: React.CSSProperties = { fontSize: '8px', fontWeight: 800, color: 'rgba(255,255,255,0.4)', letterSpacing: '0.1em', marginBottom: '4px' };
const valueStyle: React.CSSProperties = { fontSize: '14px', fontWeight: 900, letterSpacing: '0.05em' };
const securityBarStyle: React.CSSProperties = { marginTop: 'auto', display: 'flex', alignItems: 'center', gap: '8px', opacity: 0.8 };
