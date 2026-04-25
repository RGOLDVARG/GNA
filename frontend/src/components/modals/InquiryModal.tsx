'use client';
import React, { useState } from 'react';
import { X, Send, CheckCircle, ShieldCheck } from 'lucide-react';

interface InquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'ACCREDITATION' | 'PARTNERSHIP' | 'MEMBERSHIP' | 'NEWSLETTER' | 'GENERAL';
  title?: string;
  subject?: string;
}

export default function InquiryModal({ isOpen, onClose, type = 'GENERAL', title = 'Request Information', subject }: InquiryModalProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`${API_URL}/api/leads/public/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          inquiry_type: type
        })
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFormData({ full_name: '', email: '', phone: '', message: '' });
        }, 3000);
      } else {
        setError('Failed to send request. Please try again.');
      }
    } catch (err) {
      setError('Connection error. Please check your internet.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button onClick={onClose} className="modal-close-btn"><X size={24} /></button>
        
        {success ? (
          <div style={{ textAlign: 'center', padding: '40px 0' }}>
            <CheckCircle size={80} color="#059669" style={{ marginBottom: '24px' }} />
            <h2 style={{ fontSize: '32px', fontWeight: 900, color: '#120A2B', marginBottom: '16px' }}>Request Received</h2>
            <p style={{ color: '#64748B', fontSize: '18px' }}>A GNA representative will contact you within 24 business hours.</p>
          </div>
        ) : (
          <>
            <div style={{ marginBottom: '32px' }}>
              <div style={{ fontSize: '11px', fontWeight: 900, color: '#C5A059', letterSpacing: '0.2em', marginBottom: '12px' }}>OFFICIAL INQUIRY • {type}</div>
              <h2 className="modal-title" style={{ fontSize: '36px', fontWeight: 900, color: '#120A2B', lineHeight: 1.1 }}>{title}</h2>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '20px' }}>
              <div className="input-group">
                <label className="label-style">Full Name</label>
                <input 
                  required 
                  className="input-style" 
                  placeholder="e.g. Dr. Alexander Thorne"
                  value={formData.full_name}
                  onChange={e => setFormData({...formData, full_name: e.target.value})}
                />
              </div>

              <div className="modal-grid-2">
                <div className="input-group">
                  <label className="label-style">Professional Email</label>
                  <input 
                    required type="email" 
                    className="input-style" 
                    placeholder="name@institution.org"
                    value={formData.email}
                    onChange={e => setFormData({...formData, email: e.target.value})}
                  />
                </div>
                <div className="input-group">
                  <label className="label-style">Phone Number</label>
                  <input 
                    className="input-style" 
                    placeholder="+1 (555) 000-0000"
                    value={formData.phone}
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>

              <div className="input-group">
                <label className="label-style">Message / Specific Requirements</label>
                <textarea 
                  className="input-style" 
                  style={{ minHeight: '120px' }}
                  placeholder="Tell us more about your request..."
                  value={formData.message}
                  onChange={e => setFormData({...formData, message: e.target.value})}
                />
              </div>

              {error && <div style={{ color: '#EF4444', fontSize: '14px', fontWeight: 700 }}>{error}</div>}

              <button type="submit" disabled={loading} className="modal-submit-btn">
                {loading ? 'Processing...' : (
                  <>Submit Official Request <Send size={18} /></>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '12px', opacity: 0.6 }}>
                <ShieldCheck size={16} color="#059669" />
                <span style={{ fontSize: '12px', fontWeight: 600 }}>Secure institutional encryption enabled. Your data is protected by GNA privacy standards.</span>
              </div>
            </form>
          </>
        )}
      </div>

      <style jsx>{`
        .input-group { display: flex; flexDirection: column; gap: 8px; }
        .label-style { fontSize: 13px; fontWeight: 800; color: #120A2B; textTransform: uppercase; letterSpacing: 0.05em; }
        .input-style { width: 100%; padding: 16px 20px; borderRadius: 16px; border: 1.5px solid #E2E8F0; background: #F8FAFC; fontSize: 16px; outline: none; transition: border-color 0.2s ease; }
        .input-style:focus { border-color: #120A2B; }
        .modal-submit-btn { background: #120A2B; color: white; padding: 20px; borderRadius: 18px; border: none; fontWeight: 900; fontSize: 16px; cursor: pointer; display: flex; alignItems: center; justifyContent: center; gap: 12px; marginTop: 12px; }
      `}</style>
    </div>
  );
}
