'use client';
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { ShieldCheck, Lock, Mail, ArrowRight, AlertCircle } from 'lucide-react';

export default function AdminLoginPage() {
  const { login, user } = useAuth();
  const router = useRouter();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // If already logged in as staff, skip login
  useEffect(() => {
    if (user?.is_staff) {
      router.push('/gna-management-gateway');
    }
  }, [user, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const res = await fetch(`${API_URL}/api/token/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (res.ok) {
        const data = await res.json();
        const profileRes = await fetch(`${API_URL}/api/profile/`, {
            headers: { 'Authorization': `Bearer ${data.access}` }
        });
        const profileData = await profileRes.json();
        
        if (profileData.is_staff) {
            login(data.access, data.refresh);
            setTimeout(() => {
                router.push('/gna-management-gateway');
            }, 100);
        } else {
            setError('Access Denied: This portal is for institutional staff only.');
        }
      } else {
        const errorData = await res.json().catch(() => ({}));
        setError(errorData.detail || 'Invalid administrative credentials');
      }
    } catch (err) {
      setError('Institutional gateway connection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      backgroundColor: '#FAF8F5',
      padding: '24px'
    }}>
      <div style={{ 
        width: '100%', 
        maxWidth: '440px', 
        backgroundColor: 'white', 
        borderRadius: '24px', 
        padding: '56px',
        boxShadow: '0 20px 60px rgba(0,0,0,0.05)',
        border: '1px solid #EEE'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <div style={{ display: 'inline-flex', marginBottom: '32px' }}>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#120A2B', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#00D1FF', fontSize: '24px', fontWeight: 900, borderRadius: '8px' }}>G</div>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#00D1FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 900, borderRadius: '8px' }}>N</div>
            <div style={{ width: '48px', height: '48px', backgroundColor: '#3A0F7E', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontSize: '24px', fontWeight: 900, borderRadius: '8px' }}>A</div>
          </div>
          <h1 style={{ fontSize: '20px', fontWeight: 800, color: '#120A2B', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '8px' }}>
             Management Gateway
          </h1>
          <p style={{ color: '#666', fontSize: '14px', fontWeight: 600 }}>PRIVATE INSTITUTIONAL ENTRY POINT</p>
        </div>

        {error && (
          <div style={{ 
            display: 'flex', 
            gap: '12px', 
            padding: '16px', 
            backgroundColor: '#FEF2F2', 
            color: '#DC2626', 
            borderRadius: '12px', 
            marginBottom: '32px', 
            fontSize: '13px', 
            fontWeight: 700,
            border: '1px solid #FEE2E2'
          }}>
            <AlertCircle size={18} style={{ flexShrink: 0 }} />
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
              Staff Email Identifier
            </label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} color="#999" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Institutional email"
                style={inputStyle}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 800, color: '#999', textTransform: 'uppercase', marginBottom: '10px', letterSpacing: '0.05em' }}>
              Secure Key / Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} color="#999" style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)' }} />
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={inputStyle}
              />
            </div>
          </div>

          <button 
            type="submit" 
            disabled={loading}
            style={{ 
              backgroundColor: '#120A2B', 
              color: 'white', 
              padding: '18px', 
              borderRadius: '12px', 
              border: 'none', 
              fontSize: '15px', 
              fontWeight: 800, 
              cursor: loading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              marginTop: '16px',
              boxShadow: '0 10px 20px rgba(18, 10, 43, 0.2)'
            }}
          >
            {loading ? 'Authenticating...' : (
              <>
                Initialize Gateway <ArrowRight size={20} />
              </>
            )}
          </button>
        </form>

        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <p style={{ fontSize: '12px', color: '#999' }}>
            Authorized Personnel Only. Access to this system is monitored and recorded for institutional security compliance.
          </p>
        </div>
      </div>
      
      <Link href="/" style={{ marginTop: '32px', color: '#120A2B', fontSize: '13px', fontWeight: 700, textDecoration: 'none', opacity: 0.6 }}>
        Return to Public Association Portal
      </Link>
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '16px 16px 16px 48px',
  borderRadius: '12px',
  border: '1px solid #E5E5E5',
  fontSize: '15px',
  fontWeight: 500,
  outline: 'none',
  transition: 'all 0.2s ease',
  backgroundColor: '#F9FAFB'
};
