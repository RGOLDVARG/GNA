'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import { 
  LayoutDashboard, Award, User as UserIcon, Settings, LogOut, Camera, Save, X, Edit2, Shield, Briefcase, FileText, BookOpen, Globe, Calendar, Mail, GraduationCap, Link as LinkIcon, Menu
} from 'lucide-react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { Country, City } from 'country-state-city';
import DigitalIDCard from '@/components/dashboard/DigitalIDCard';

const Select = dynamic(() => import('react-select'), { ssr: false });

export default function DashboardPage() {
  const { user, loading, logout, authenticatedFetch } = useAuth();
  const router = useRouter();
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

  const [activeTab, setActiveTab] = useState('overview');
  const [isMounted, setIsMounted] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState<any>({});
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [statusMsg, setStatusMsg] = useState({ type: '', text: '' });
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => { setIsMounted(true); }, []);

  useEffect(() => {
    if (user && !isEditing) {
      setEditData({
        country: user.country || '',
        city: user.city || '',
        profession: user.profession || '',
        bio: user.bio || '',
        education: user.education || '',
        experience: user.experience || '',
        licenses: user.licenses || '',
        publications: user.publications || '',
        languages: user.languages || '',
        expertise: user.expertise || '',
        linkedin_url: user.linkedin_url || '',
        website_url: user.website_url || ''
      });
      setPreviewUrl(user.avatar);
    }
  }, [user, isEditing]);

  const handleUpdateProfile = async () => {
    try {
      const formData = new FormData();
      Object.keys(editData).forEach(key => formData.append(key, editData[key] || ''));
      if (selectedFile) formData.append('avatar', selectedFile);

      const res = await authenticatedFetch(`${API_URL}/api/update-profile/`, {
        method: 'PATCH',
        body: formData
      });

      if (res.ok) {
        setStatusMsg({ type: 'success', text: 'Profile updated!' });
        setIsEditing(false);
        setTimeout(() => window.location.reload(), 1000);
      } else {
        setStatusMsg({ type: 'error', text: 'Update failed' });
      }
    } catch (err) { setStatusMsg({ type: 'error', text: 'Connection error' }); }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    }
  };

  useEffect(() => { if (!loading && !user) router.push('/login'); }, [user, loading, router]);

  if (loading || !user) return <div className="loader-container"><div className="loader"></div></div>;

  return (
    <div className="dashboard-layout">
      
      {/* Mobile Header */}
      <div className="mobile-header">
         <button onClick={() => setIsSidebarOpen(true)} className="menu-btn"><Menu size={24} /></button>
         <Link href="/"><img src="/images/gna_logo.svg" alt="GNA" className="mobile-logo" /></Link>
         <div style={{ width: 24 }}></div>
      </div>

      {/* Sidebar Overlay */}
      {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)}></div>}

      {/* Sidebar */}
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-logo">
           <Link href="/"><img src="/images/gna_logo.svg" alt="GNA" className="logo-img" /></Link>
           <button onClick={() => setIsSidebarOpen(false)} className="close-sidebar-btn"><X size={24} /></button>
        </div>
        <nav className="sidebar-nav">
          <SidebarLink active={activeTab === 'overview'} icon={<LayoutDashboard size={20} />} label="Member ID" onClick={() => { setActiveTab('overview'); setIsSidebarOpen(false); }} />
          <SidebarLink active={activeTab === 'profile'} icon={<UserIcon size={20} />} label="Expert Profile" onClick={() => { setActiveTab('profile'); setIsSidebarOpen(false); }} />
          <SidebarLink active={activeTab === 'settings'} icon={<Settings size={20} />} label="Account" onClick={() => { setActiveTab('settings'); setIsSidebarOpen(false); }} />
        </nav>
        <div className="sidebar-footer">
           <button onClick={logout} className="logout-btn">
              <LogOut size={18} /> Sign Out
           </button>
        </div>
      </div>

      <div className="main-content">
        <header className="page-header">
          <div className="header-text">
             <h1 className="header-title">Institutional Dashboard</h1>
             <p className="header-subtitle">Authenticated as {user.first_name} {user.last_name}</p>
          </div>
          {statusMsg.text && <div className={`status-badge ${statusMsg.type}`}>{statusMsg.text}</div>}
        </header>

        {activeTab === 'overview' && (
          <div className="overview-grid">
            <div className="id-card-column">
               <DigitalIDCard user={user} />
            </div>
            <div className="stats-column">
               <div className="status-card">
                  <h3 className="card-title">Expert Verification Status</h3>
                  <div className={`status-box ${user.certification_status === 'active' ? 'active' : ''}`}>
                     <Shield size={32} className="status-icon" />
                     <div className="status-info">
                        <p className="status-label">{user.certification_status === 'active' ? 'GNA® Platinum Verified' : 'Standard Member'}</p>
                        <p className="status-sub">{user.certification_status === 'active' ? 'Global Verification Active' : 'Basic Registry Entry'}</p>
                     </div>
                  </div>
               </div>
               <div className="shortcut-grid">
                  <ShortcutLink label="Public Profile" href={`/registry/${user.gna_id}`} icon={<Globe size={18} />} />
                  <ShortcutLink label="Compliance" href="#" icon={<Shield size={18} />} />
               </div>
            </div>
          </div>
        )}

        {activeTab === 'profile' && (
           <div className="profile-container">
              <div className="profile-header">
                <h2 className="profile-title">Expert Profile Data</h2>
                <div className="profile-actions">
                  {isEditing ? (
                    <>
                      <button onClick={handleUpdateProfile} className="save-btn"><Save size={18} /> Apply Changes</button>
                      <button onClick={() => setIsEditing(false)} className="cancel-btn"><X size={18} /> Cancel</button>
                    </>
                  ) : (
                    <button onClick={() => setIsEditing(true)} className="edit-btn"><Edit2 size={18} /> Modify Dossier</button>
                  )}
                </div>
              </div>

              <div className="profile-sections">
                 <div className="content-card">
                    <div className="avatar-section">
                       <div className="avatar-wrapper">
                          <div className="avatar-box">
                             {previewUrl ? <img src={previewUrl.startsWith('blob') || previewUrl.startsWith('http') ? previewUrl : `${API_URL}${previewUrl}`} className="avatar-img" alt="A" /> : <UserIcon size={40} color="#CBD5E1" />}
                          </div>
                          {isEditing && <label className="avatar-overlay"><Camera size={20} /><input type="file" style={{ display: 'none' }} onChange={handleFileChange} accept="image/*" /></label>}
                       </div>
                       <div className="basic-fields">
                          <EditableField label="Profession / Title" value={editData.profession} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, profession: val})} />
                          <EditableField label="Languages" value={editData.languages} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, languages: val})} />
                          <EditableField label="LinkedIn" value={editData.linkedin_url} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, linkedin_url: val})} />
                          <EditableField label="Personal Website" value={editData.website_url} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, website_url: val})} />
                       </div>
                    </div>
                 </div>

                 <div className="content-card">
                    <div className="big-fields-grid">
                       <BigEditableField label="Professional Biography" value={editData.bio} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, bio: val})} icon={<FileText size={20} />} />
                       <BigEditableField label="Expertise (ADHD, ASD, etc)" value={editData.expertise} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, expertise: val})} icon={<Award size={20} />} />
                    </div>
                 </div>

                 <div className="content-card">
                    <div className="big-fields-grid">
                       <BigEditableField label="Clinical Experience" value={editData.experience} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, experience: val})} icon={<Briefcase size={20} />} />
                       <BigEditableField label="Education" value={editData.education} isEditing={isEditing} onChange={(val: string) => setEditData({...editData, education: val})} icon={<GraduationCap size={20} />} />
                    </div>
                 </div>
              </div>
           </div>
        )}
      </div>

      <style jsx>{`
        .dashboard-layout {
          display: flex;
          min-height: 100vh;
          background-color: #F8FAFC;
          font-family: 'Inter', sans-serif;
        }
        .sidebar {
          width: 300px;
          background-color: #120A2B;
          color: white;
          display: flex;
          flex-direction: column;
          position: fixed;
          height: 100vh;
          z-index: 100;
          transition: transform 0.3s ease;
        }
        .sidebar-logo {
          padding: 40px;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .logo-img {
          height: 40px;
          filter: brightness(0) invert(1);
        }
        .close-sidebar-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .sidebar-nav {
          flex: 1;
          padding: 20px 20px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .sidebar-footer {
          padding: 30px 20px;
          border-top: 1px solid rgba(255,255,255,0.05);
        }
        .logout-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 14px 20px;
          width: 100%;
          border: none;
          background: rgba(255,255,255,0.05);
          border-radius: 12px;
          cursor: pointer;
          color: rgba(255,255,255,0.7);
          font-weight: 700;
        }
        .main-content {
          flex: 1;
          margin-left: 300px;
          padding: 60px 80px;
        }
        .mobile-header {
          display: none;
          background-color: #120A2B;
          padding: 16px 20px;
          justify-content: space-between;
          align-items: center;
          position: sticky;
          top: 0;
          z-index: 90;
        }
        .menu-btn {
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        .mobile-logo {
          height: 30px;
          filter: brightness(0) invert(1);
        }
        .page-header {
          margin-bottom: 60px;
          display: flex;
          justify-content: space-between;
          align-items: flex-end;
        }
        .header-title {
          font-size: 36px;
          font-weight: 900;
          color: #120A2B;
        }
        .header-subtitle {
          color: #64748B;
        }
        .status-badge {
          padding: 12px 24px;
          border-radius: 12px;
          font-weight: 700;
        }
        .status-badge.success { background: #ECFDF5; color: #059669; }
        .status-badge.error { background: #FEF2F2; color: #DC2626; }

        .overview-grid {
          display: grid;
          grid-template-columns: 450px 1fr;
          gap: 60px;
        }
        .status-card {
          background-color: white;
          border-radius: 32px;
          padding: 40px;
          border: 1px solid #E2E8F0;
        }
        .card-title {
          font-size: 20px;
          font-weight: 900;
          margin-bottom: 24px;
        }
        .status-box {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          border-radius: 20px;
          background: #F8FAFC;
          border: 1px solid #E2E8F0;
        }
        .status-box.active {
          background: #F0FDFA;
        }
        .status-icon {
          color: #CBD5E1;
        }
        .status-box.active .status-icon {
          color: #0D9488;
        }
        .status-label {
          margin: 0;
          font-weight: 900;
          font-size: 17px;
        }
        .status-sub {
          margin: 0;
          font-size: 13px;
          color: #64748B;
        }
        .shortcut-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
          margin-top: 32px;
        }

        .profile-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 40px;
        }
        .profile-title {
          font-size: 32px;
          font-weight: 900;
        }
        .profile-actions {
          display: flex;
          gap: 16px;
        }
        .content-card {
          background: white;
          border-radius: 32px;
          padding: 40px;
          border: 1px solid #E2E8F0;
          margin-bottom: 32px;
        }
        .avatar-section {
          display: flex;
          gap: 48px;
          align-items: center;
        }
        .avatar-wrapper {
          position: relative;
        }
        .avatar-box {
          width: 100px;
          height: 100px;
          border-radius: 24px;
          background: #F8FAFC;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border: 1px solid #E2E8F0;
        }
        .avatar-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
        .avatar-overlay {
          position: absolute;
          inset: 0;
          background: rgba(0,0,0,0.3);
          border-radius: 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          cursor: pointer;
        }
        .basic-fields {
          flex: 1;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 24px;
        }
        .big-fields-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 32px;
        }

        .save-btn { padding: 12px 24px; border-radius: 100px; border: none; background: #3A0F7E; color: white; font-weight: 800; cursor: pointer; display: flex; gap: 8px; }
        .cancel-btn { padding: 12px 24px; border-radius: 100px; border: none; background: #F1F5F9; font-weight: 800; cursor: pointer; display: flex; gap: 8px; }
        .edit-btn { padding: 12px 24px; border-radius: 100px; border: 1px solid #E2E8F0; background: white; font-weight: 800; cursor: pointer; display: flex; gap: 8px; }

        @media (max-width: 991px) {
          .sidebar {
            transform: translateX(-100%);
            width: 280px;
          }
          .sidebar.open {
            transform: translateX(0);
          }
          .close-sidebar-btn {
            display: block;
          }
          .main-content {
            margin-left: 0;
            padding: 40px 20px;
          }
          .mobile-header {
            display: flex;
          }
          .sidebar-overlay {
            position: fixed;
            inset: 0;
            background: rgba(0,0,0,0.5);
            z-index: 95;
          }
          .overview-grid {
            grid-template-columns: 1fr;
            gap: 32px;
          }
          .id-card-column {
            display: flex;
            justify-content: center;
          }
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
            margin-bottom: 40px;
          }
          .header-title {
            font-size: 28px;
          }
        }

        @media (max-width: 768px) {
          .profile-header {
            flex-direction: column;
            align-items: flex-start;
            gap: 20px;
          }
          .avatar-section {
            flex-direction: column;
            align-items: center;
          }
          .basic-fields {
            grid-template-columns: 1fr;
            width: 100%;
          }
          .big-fields-grid {
            grid-template-columns: 1fr;
          }
          .content-card {
            padding: 30px 20px;
          }
          .shortcut-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}

const SidebarLink = ({ active, icon, label, onClick }: any) => (
  <>
    <button onClick={onClick} className={`sidebar-link ${active ? 'active' : ''}`}>
      {icon} <span>{label}</span>
    </button>
    <style jsx>{`
      .sidebar-link {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 16px 24px;
        border-radius: 16px;
        background-color: transparent;
        color: rgba(255,255,255,0.6);
        border: none;
        cursor: pointer;
        font-weight: 700;
        font-size: 16px;
        text-align: left;
        width: 100%;
        transition: all 0.2s ease;
      }
      .sidebar-link.active {
        background-color: rgba(0, 209, 255, 0.1);
        color: #00D1FF;
      }
      .sidebar-link:hover {
        background-color: rgba(255, 255, 255, 0.05);
      }
    `}</style>
  </>
);

const ShortcutLink = ({ label, href, icon }: any) => (
  <>
    <Link href={href} className="shortcut-link">
      <div className="icon-box">{icon}</div> <span>{label}</span>
    </Link>
    <style jsx>{`
      .shortcut-link {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 24px;
        border-radius: 20px;
        background-color: white;
        color: #120A2B;
        text-decoration: none;
        font-weight: 800;
        border: 1px solid #E2E8F0;
        transition: all 0.2s ease;
      }
      .shortcut-link:hover {
        border-color: #3A0F7E;
        box-shadow: 0 10px 20px rgba(0,0,0,0.05);
      }
      .icon-box {
        color: #3A0F7E;
      }
    `}</style>
  </>
);

const EditableField = ({ label, value, isEditing, onChange }: any) => (
  <div className="field-group">
    <label className="field-label">{label}</label>
    {isEditing ? (
      <input type="text" className="field-input" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <p className="field-value">{value || '—'}</p>
    )}
    <style jsx>{`
      .field-group { width: 100%; }
      .field-label { display: block; font-size: 11px; font-weight: 800; color: #94A3B8; text-transform: uppercase; margin-bottom: 8px; }
      .field-value { font-size: 16px; font-weight: 700; margin: 0; color: #120A2B; }
      .field-input { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #E2E8F0; background: #F8FAFC; font-size: 15px; box-sizing: border-box; outline: none; }
      .field-input:focus { border-color: #3A0F7E; }
    `}</style>
  </div>
);

const BigEditableField = ({ label, value, isEditing, onChange, icon }: any) => (
  <div className="big-field-group">
    <div className="label-with-icon">
      {icon}
      <label className="field-label">{label}</label>
    </div>
    {isEditing ? (
      <textarea className="field-textarea" value={value || ''} onChange={(e) => onChange(e.target.value)} />
    ) : (
      <p className="field-value large">{value || 'Not provided.'}</p>
    )}
    <style jsx>{`
      .big-field-group { width: 100%; }
      .label-with-icon { display: flex; gap: 10px; margin-bottom: 12px; align-items: center; }
      .field-label { display: block; font-size: 11px; font-weight: 800; color: #94A3B8; text-transform: uppercase; margin-bottom: 0; }
      .field-value.large { font-size: 16px; font-weight: 700; margin: 0; line-height: 1.6; white-space: pre-wrap; color: #120A2B; }
      .field-textarea { width: 100%; padding: 12px; border-radius: 10px; border: 1px solid #E2E8F0; background: #F8FAFC; font-size: 15px; box-sizing: border-box; outline: none; min-height: 120px; }
      .field-textarea:focus { border-color: #3A0F7E; }
    `}</style>
  </div>
);

