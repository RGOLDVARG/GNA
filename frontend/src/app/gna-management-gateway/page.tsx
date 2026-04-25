'use client';
import React, { useState, useEffect } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { 
  Users, Award, Settings, Search, Filter, CheckCircle, Clock, 
  AlertCircle, ChevronRight, Save, X, Eye, ShieldCheck, Mail,
  Building2, GraduationCap, Plus, Trash2, ExternalLink, Globe, Edit3, Upload, Image as ImageIcon,
  Newspaper, Calendar, MapPin, Inbox, MessageSquare, Shield
} from 'lucide-react';

interface AdminUser {
  id: number;
  gna_id: string;
  email: string;
  first_name: string;
  last_name: string;
  is_staff: boolean;
  expertise?: string;
}

export default function AdminDashboard() {
  const { user, loading: authLoading, authenticatedFetch } = useAuth();
  const router = useRouter();
  
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [inquiries, setInquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [viewingInquiry, setViewingInquiry] = useState<any>(null);
  
  const API_URL = process.env.NEXT_PUBLIC_API_URL || '';

  useEffect(() => {
    if (!authLoading && (!user || !user.is_staff)) router.push('/gna-management-gateway/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (user?.is_staff) {
      if (activeTab === 'users') fetchUsers();
      if (activeTab === 'inquiries') fetchInquiries();
    }
  }, [user, activeTab]);

  const fetchUsers = async () => {
    try {
      const res = await authenticatedFetch(`${API_URL}/api/admin/users/`);
      if (res.ok) {
        const data = await res.json();
        setUsers(Array.isArray(data) ? data : (data.results || []));
      }
    } catch (error) { console.error(error); }
  };

  const fetchInquiries = async () => {
    try {
      const res = await authenticatedFetch(`${API_URL}/api/leads/admin/`);
      if (res.ok) {
        const data = await res.json();
        setInquiries(Array.isArray(data) ? data : (data.results || []));
      }
    } catch (error) { console.error(error); }
  };

  if (authLoading || !user?.is_staff) return <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>Verifying Access...</div>;

  return (
    <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#F8F9FA' }}>
      <aside style={{ width: '280px', backgroundColor: '#120A2B', color: 'white', position: 'sticky', top: 0, height: '100vh' }}>
        <div style={{ padding: '32px', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
          <div style={{ fontSize: '24px', fontWeight: 900 }}>GNA® <span style={{ color: '#00D1FF' }}>Gateway</span></div>
        </div>
        <nav style={{ padding: '24px 16px' }}>
          <AdminNavLink active={activeTab === 'users'} icon={<Users size={20} />} label="Registry Members" onClick={() => setActiveTab('users')} />
          <AdminNavLink active={activeTab === 'inquiries'} icon={<Inbox size={20} />} label="Inquiries" onClick={() => setActiveTab('inquiries')} />
        </nav>
      </aside>

      <main style={{ flex: 1, padding: '60px' }}>
        <header style={{ marginBottom: '48px' }}>
             <h1 style={{ fontSize: '32px', fontWeight: 900 }}>{activeTab === 'users' ? 'Registry Management' : 'Leads & Inquiries'}</h1>
             <p style={{ color: '#64748B' }}>Institutional oversight for the global neurodiversity ecosystem.</p>
        </header>

        {activeTab === 'users' && (
          <div style={{ display: 'grid', gap: '16px' }}>
            {users.map(u => (
              <div key={u.id} style={cardStyle}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                       <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F1F5F9', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900 }}>{u.first_name[0]}</div>
                       <div>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                             <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900 }}>{u.first_name} {u.last_name}</h4>
                             {u.expertise?.includes('Ethics Verified') && (
                               <div title="Ethics Mandate Signed" style={{ display: 'flex', alignItems: 'center', gap: '4px', background: '#ECFDF5', color: '#059669', padding: '2px 8px', borderRadius: '4px', fontSize: '10px', fontWeight: 800 }}>
                                 <ShieldCheck size={12} /> ETHICS VERIFIED
                               </div>
                             )}
                          </div>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{u.gna_id} • {u.email}</div>
                       </div>
                    </div>
                    <button style={editBtnStyle}><Eye size={16} /></button>
                 </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'inquiries' && (
          <div style={{ display: 'grid', gap: '16px' }}>
            {inquiries.map(inq => (
              <div key={inq.id} style={cardStyle}>
                 <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                       <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#F8F8FF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><MessageSquare size={20} color="#3A0F7E" /></div>
                       <div>
                          <h4 style={{ margin: 0, fontSize: '16px', fontWeight: 900 }}>{inq.full_name}</h4>
                          <div style={{ fontSize: '12px', color: '#64748B' }}>{inq.inquiry_type} • {new Date(inq.created_at).toLocaleDateString()}</div>
                       </div>
                    </div>
                    <button onClick={() => setViewingInquiry(inq)} style={editBtnStyle}><Eye size={16}/></button>
                 </div>
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}

function AdminNavLink({ active, icon, label, onClick }: any) {
  return (<div onClick={onClick} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '14px 16px', borderRadius: '12px', marginBottom: '4px', cursor: 'pointer', background: active ? 'rgba(255,255,255,0.1)' : 'transparent', color: active ? '#00D1FF' : 'rgba(255,255,255,0.7)', fontWeight: 800, fontSize: '14px' }}>{icon} {label}</div>);
}

const cardStyle: React.CSSProperties = { background: 'white', borderRadius: '20px', padding: '24px', border: '1px solid #E2E8F0', boxShadow: '0 4px 6px rgba(0,0,0,0.02)' };
const editBtnStyle: React.CSSProperties = { background: '#F1F5F9', color: '#120A2B', width: '40px', height: '40px', borderRadius: '10px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' };
