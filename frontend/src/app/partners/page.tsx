'use client';
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/layout/Navbar';
import { Search, MapPin, ExternalLink, Building2, GraduationCap, Globe, ChevronRight, ShieldCheck } from 'lucide-react';
import dynamic from 'next/dynamic';

const Select = dynamic(() => import('react-select'), { ssr: false });

interface Program {
  id: number;
  title: string;
  description: string;
  duration: string;
  format: string;
  partner_name?: string;
}

interface Partner {
  gna_partner_id: string;
  name: string;
  description: string;
  logo: string | null;
  website: string;
  country: string;
  city: string;
  partner_type: string;
  verified: boolean;
  programs: Program[];
}

export default function PartnerRegistryPage() {
  const [activeTab, setActiveTab] = useState<'PARTNERS' | 'EDUCATION'>('PARTNERS');
  const [partners, setPartners] = useState<Partner[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const endpoint = activeTab === 'PARTNERS' ? 'search-partners' : 'search-programs';
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/registry/${endpoint}/`);
      const data = await res.json();
      const results = Array.isArray(data) ? data : data.results || [];
      
      if (activeTab === 'PARTNERS') setPartners(results);
      else setPrograms(results);
    } catch (err) {
      console.error("Failed to fetch data:", err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPartners = partners.filter(p => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.country.toLowerCase().includes(searchQuery.toLowerCase()));
  const filteredPrograms = programs.filter(p => p.title.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <main style={{ background: '#F5F7FA', minHeight: '100vh', fontFamily: "'Inter', sans-serif" }}>
      <Navbar />

      {/* Standard GNA Header */}
      <section className="partners-hero">
        <div className="container">
          <h1 className="hero-title">
            Accredited Partners
          </h1>
          <p className="hero-subtitle">
            Official global registry for verified institutions and certified educational programs.
          </p>
        </div>
      </section>

      <div className="container main-content-container">
        
        {/* Registry Switcher */}
        <div className="switcher-container">
          <div className="switcher-box">
            <button 
              onClick={() => setActiveTab('PARTNERS')}
              className={`switcher-btn ${activeTab === 'PARTNERS' ? 'active' : ''}`}
            >
              Accredited Partners
            </button>
            <button 
              onClick={() => setActiveTab('EDUCATION')}
              className={`switcher-btn ${activeTab === 'EDUCATION' ? 'active' : ''}`}
            >
              Approved Education
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="search-container">
          <div className="search-grid">
            <div className="search-input-wrapper">
               <Search className="search-icon" size={20} />
               <input 
                  type="text" 
                  placeholder="Search registry..."
                  className="search-input"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
               />
            </div>
            <button onClick={fetchData} className="search-btn">Search</button>
          </div>
        </div>

        {/* Results Grid */}
        <section className="results-section">
          {loading ? (
            <div className="loading-state">Consulting Official Registry...</div>
          ) : activeTab === 'PARTNERS' ? (
            <div className="results-grid partners-grid">
              {filteredPartners.map(partner => (
                <div key={partner.gna_partner_id} className="gna-card">
                  <div className="card-header">
                    <div className="gna-avatar"><Building2 color="#3A0F7E" size={24} /></div>
                    <div className="gna-status-tag"><ShieldCheck size={14} /> Accredited</div>
                  </div>
                  
                  <h3 className="gna-name">{partner.name}</h3>
                  <div className="gna-meta-row"><MapPin size={14} color="#94A3B8" /> {partner.city}, {partner.country}</div>
                  
                  <p className="gna-desc">{partner.description}</p>
                  
                  <div className="gna-footer">
                    <div className="gna-id">GNA ID: {partner.gna_partner_id}</div>
                    <a href={partner.website} target="_blank" rel="noreferrer" className="gna-link">Website <ExternalLink size={14} /></a>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="results-grid programs-grid">
              {filteredPrograms.map(prog => (
                <div key={prog.id} className="gna-card">
                  <div className="gna-status-tag program-tag">
                    <GraduationCap size={14} /> Approved Program
                  </div>
                  
                  <h3 className="gna-name">{prog.title}</h3>
                  <div className="gna-meta-row program-provider">Provider: {prog.partner_name}</div>
                  
                  <p className="gna-desc">{prog.description}</p>
                  
                  <div className="program-footer">
                    <span>{prog.duration}</span>
                    <span>•</span>
                    <span>{prog.format}</span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>

      <style jsx>{`
        .partners-hero {
          background: #120A2B;
          padding: 160px 0;
          text-align: center;
          color: white;
        }
        .hero-title {
          font-size: 3.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          color: white;
        }
        .hero-subtitle {
          color: rgba(255,255,255,0.7);
          font-size: 1.25rem;
          max-width: 700px;
          margin: 0 auto;
        }
        .main-content-container {
          margin-top: -80px;
          position: relative;
          z-index: 10;
        }
        .switcher-container {
          display: flex;
          justify-content: center;
          margin-bottom: 32px;
        }
        .switcher-box {
          background: white;
          padding: 6px;
          border-radius: 24px;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
          border: 1px solid #E2E8F0;
          display: flex;
        }
        .switcher-btn {
          padding: 14px 28px;
          border-radius: 20px;
          border: none;
          cursor: pointer;
          background: transparent;
          color: #64748B;
          font-weight: 800;
          font-size: 14px;
          transition: all 0.2s;
        }
        .switcher-btn.active {
          background: #3A0F7E;
          color: white;
        }
        .search-container {
          background: white;
          padding: 40px;
          border-radius: 24px;
          box-shadow: 0 4px 20px rgba(0,0,0,0.05);
          border: 1px solid #E2E8F0;
          margin-bottom: 48px;
        }
        .search-grid {
          display: grid;
          grid-template-columns: 1fr 180px;
          gap: 20px;
        }
        .search-input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
          background: #F8FAFC;
          border-radius: 12px;
          border: 1px solid #E2E8F0;
        }
        .search-icon {
          position: absolute;
          left: 16px;
          color: #94A3B8;
        }
        .search-input {
          width: 100%;
          padding: 16px 16px 16px 52px;
          background: transparent;
          border: none;
          font-size: 16px;
          outline: none;
          color: #120A2B;
          font-weight: 500;
        }
        .search-btn {
          background: #3A0F7E;
          color: white;
          border-radius: 12px;
          border: none;
          font-weight: 800;
          font-size: 15px;
          cursor: pointer;
        }
        .results-section {
          padding-bottom: 120px;
        }
        .loading-state {
          text-align: center;
          padding: 100px 0;
          color: #94A3B8;
        }
        .results-grid {
          display: grid;
          gap: 32px;
        }
        .partners-grid {
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
        }
        .programs-grid {
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
        }
        .gna-card {
          background: white;
          border-radius: 24px;
          padding: 32px;
          border: 1px solid #E2E8F0;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 24px;
        }
        .gna-avatar {
          width: 60px;
          height: 60px;
          background: #F1F5F9;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #E2E8F0;
        }
        .gna-status-tag {
          background: #ECFDF5;
          color: #059669;
          padding: 6px 14px;
          border-radius: 100px;
          font-size: 11px;
          font-weight: 800;
          display: flex;
          align-items: center;
          gap: 6px;
          text-transform: uppercase;
        }
        .program-tag {
          width: fit-content;
          margin-bottom: 24px;
        }
        .gna-name {
          font-size: 20px;
          font-weight: 900;
          color: #120A2B;
          margin: 0 0 4px 0;
          letter-spacing: -0.02em;
        }
        .gna-meta-row {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #475569;
          font-size: 14px;
          font-weight: 500;
          margin-bottom: 20px;
        }
        .program-provider {
          color: #3A0F7E;
          font-weight: 800;
        }
        .gna-desc {
          color: #64748B;
          font-size: 15px;
          line-height: 1.6;
          margin: 0 0 24px 0;
          flex: 1;
        }
        .gna-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding-top: 24px;
          border-top: 1px solid #F1F5F9;
        }
        .gna-id {
          font-size: 11px;
          font-weight: 800;
          color: #94A3B8;
          text-transform: uppercase;
        }
        .gna-link {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #3A0F7E;
          text-decoration: none;
          font-weight: 800;
          font-size: 13px;
        }
        .program-footer {
          display: flex;
          gap: 16px;
          font-size: 13px;
          color: #94A3B8;
          font-weight: 600;
          padding-top: 20px;
          border-top: 1px solid #F1F5F9;
        }

        @media (max-width: 768px) {
          .partners-hero {
            padding: 100px 0 120px;
          }
          .hero-title {
            font-size: 2.5rem;
          }
          .hero-subtitle {
            font-size: 1.1rem;
          }
          .switcher-box {
            flex-direction: column;
            width: 100%;
          }
          .switcher-btn {
            width: 100%;
            text-align: center;
          }
          .search-container {
            padding: 24px;
            border-radius: 20px;
          }
          .search-grid {
            grid-template-columns: 1fr;
          }
          .search-btn {
            padding: 16px;
            width: 100%;
          }
          .partners-grid, .programs-grid {
            grid-template-columns: 1fr;
          }
          .gna-card {
            padding: 24px;
          }
        }
      `}</style>
    </main>
  );
}
