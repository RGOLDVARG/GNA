'use client';

import Navbar from '@/components/layout/Navbar';
import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import dynamic from 'next/dynamic';
import { Search, User as UserIcon, MapPin, Shield, Calendar } from 'lucide-react';

const Select = dynamic(() => import('react-select'), { ssr: false });

const SPECIALTIES = [
  { value: 'ADHD Coach', label: 'ADHD Coach' },
  { value: 'Clinical Neuropsychologist', label: 'Clinical Neuropsychologist' },
  { value: 'Educational Consultant', label: 'Educational Consultant' },
  { value: 'Psychiatrist', label: 'Psychiatrist' },
];

const STATUSES = [
  { value: 'active', label: 'Active Certification' },
  { value: 'expired', label: 'Expired' },
  { value: 'pending', label: 'Verification Pending' },
];

export default function RegistryPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [selectedCity, setSelectedCity] = useState<any>(null);
  const [selectedSpecialty, setSelectedSpecialty] = useState<any>(null);
  const [selectedStatus, setSelectedStatus] = useState<any>(null);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);

  useEffect(() => {
    import('country-state-city').then(({ Country }) => {
      setCountries(
        Country.getAllCountries().map((c) => ({
          value: c.isoCode,
          label: `${c.flag} ${c.name}`,
          safeName: c.name,
        }))
      );
    });
  }, []);

  useEffect(() => {
    if (!selectedCountry) {
      setCities([]);
      return;
    }
    import('country-state-city').then(({ City }) => {
      setCities(
        City.getCitiesOfCountry(selectedCountry.value)?.map((c) => ({
          value: c.name,
          label: c.name,
        })) || []
      );
    });
  }, [selectedCountry]);

  const fetchSpecialists = useCallback(async () => {
    setLoading(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      let url = `${API_URL}/api/registry/search-specialists/?q=${encodeURIComponent(query)}`;
      if (selectedCountry) url += `&country=${encodeURIComponent(selectedCountry.safeName)}`;
      if (selectedCity) url += `&city=${encodeURIComponent(selectedCity.value)}`;
      if (selectedSpecialty) url += `&profession=${encodeURIComponent(selectedSpecialty.value)}`;
      if (selectedStatus) url += `&status=${encodeURIComponent(selectedStatus.value)}`;

      const res = await fetch(url);
      if (res.ok) {
        const data = await res.json();
        setResults(Array.isArray(data) ? data : data.results || []);
      }
    } catch (err) {
      console.error('Search error:', err);
    } finally {
      setLoading(false);
    }
  }, [query, selectedCountry, selectedCity, selectedSpecialty, selectedStatus]);

  useEffect(() => {
    fetchSpecialists();
  }, []);

  return (
    <main style={{ background: '#F5F7FA', minHeight: '100vh' }}>
      <Navbar />

        <section className="registry-header-section">
          <div className="container">
            <div className="registry-header-content">
              <h1 className="registry-title">Professional Verification Portal</h1>
              <p className="registry-subtitle">
                The official registry for certified ADHD &amp; Neurodiversity specialists worldwide.
                Verify membership status and credential validity in real-time.
              </p>
            </div>
          </div>
        </section>

        <div className="container registry-container">
          <div className="filter-card">
            <div className="filter-grid">
              <div className="filter-item">
                <label className="filter-label">Search Specialist</label>
                <div className="search-field">
                  <Search size={18} color="#94A3B8" />
                  <input
                    type="text"
                    placeholder="Name or GNA-ID..."
                    className="minimal-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onKeyUp={(e) => e.key === 'Enter' && fetchSpecialists()}
                  />
                </div>
              </div>

              <div className="filter-item">
                <label className="filter-label">Country</label>
                <div style={{ minHeight: '50px' }}>
                  <Select
                    options={countries}
                    placeholder="Select Country"
                    value={selectedCountry}
                    onChange={(val: any) => { setSelectedCountry(val); setSelectedCity(null); }}
                    isClearable
                    styles={customSelectStyles}
                  />
                </div>
              </div>

              <div className="filter-item">
                <label className="filter-label">City</label>
                <div style={{ minHeight: '50px' }}>
                  <Select
                    options={cities}
                    placeholder="Select City"
                    value={selectedCity}
                    onChange={(val: any) => setSelectedCity(val)}
                    isDisabled={!selectedCountry}
                    isClearable
                    styles={customSelectStyles}
                  />
                </div>
              </div>

              <div className="filter-item">
                <label className="filter-label">Specialization Area</label>
                <div style={{ minHeight: '50px' }}>
                  <Select
                    options={SPECIALTIES}
                    placeholder="All Fields"
                    value={selectedSpecialty}
                    onChange={(val: any) => setSelectedSpecialty(val)}
                    isClearable
                    styles={customSelectStyles}
                  />
                </div>
              </div>

              <div className="filter-item">
                <label className="filter-label">Certification Status</label>
                <div style={{ minHeight: '50px' }}>
                  <Select
                    options={STATUSES}
                    placeholder="All Statuses"
                    value={selectedStatus}
                    onChange={(val: any) => setSelectedStatus(val)}
                    isClearable
                    styles={customSelectStyles}
                  />
                </div>
              </div>

              <div className="filter-item">
                <label className="filter-label" style={{ visibility: 'hidden' }}>Action</label>
                <button onClick={fetchSpecialists} className="primary-action-btn">
                  Verify Credentials
                </button>
              </div>
            </div>
          </div>

          <section style={{ padding: '60px 0 120px' }}>
            <div className="results-header">
              <h2 style={{ fontSize: '24px', fontWeight: 800, color: '#120A2B', margin: 0 }}>
                {loading ? 'Consulting Registry...' : 'Verification Status'}
              </h2>
            </div>

            <div style={{ minHeight: '400px', position: 'relative' }}>
              <div style={{
                background: 'white',
                borderRadius: '32px',
                padding: '80px 40px',
                textAlign: 'center',
                border: '1px solid #E2E8F0',
                boxShadow: '0 20px 50px rgba(0,0,0,0.03)',
                position: 'relative',
                overflow: 'hidden'
              }}>
                {/* Background Pattern */}
                <div style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  opacity: 0.03,
                  backgroundImage: 'radial-gradient(#3A0F7E 2px, transparent 2px)',
                  backgroundSize: '32px 32px'
                }} />

                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '24px',
                    background: '#F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 32px',
                    color: '#3A0F7E'
                  }}>
                    <Shield size={40} />
                  </div>

                  <h3 style={{
                    fontSize: '32px',
                    fontWeight: 900,
                    color: '#120A2B',
                    marginBottom: '20px',
                    letterSpacing: '-0.02em'
                  }}>
                    Registry Update in Progress
                  </h3>

                  <p style={{
                    fontSize: '18px',
                    color: '#64748B',
                    maxWidth: '600px',
                    margin: '0 auto 40px',
                    lineHeight: 1.6,
                    fontWeight: 500
                  }}>
                    We are currently conducting an extensive global certification and audit process for specialists, clinics, and educational centers.
                    The official GNA registry is being synchronized with the 2026 International Standards.
                  </p>

                  <div style={{
                    marginTop: '40px',
                    paddingTop: '24px',
                    borderTop: '1px solid #F1F5F9',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        background: '#C5A059',
                        borderRadius: '50%',
                        boxShadow: '0 0 10px rgba(197,160,89,0.5)'
                      }} className="pulse-dot" />
                      <span style={{
                        fontSize: '10px',
                        fontWeight: 900,
                        color: '#C5A059',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase'
                      }}>Live</span>
                    </div>
                    <span style={{
                      fontSize: '10px',
                      fontWeight: 700,
                      color: '#94A3B8',
                      letterSpacing: '0.2em',
                      textTransform: 'uppercase'
                    }}>
                      Registry Verification Engine Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>

        <style jsx>{`
          .registry-header-section {
            background: #120A2B;
            padding: 160px 0;
          }
          .registry-header-content {
            max-width: 800px;
            margin: 0 auto;
            text-align: center;
          }
          .registry-title {
            font-size: 3.5rem;
            font-weight: 900;
            color: white;
            margin-bottom: 20px;
            letter-spacing: -0.025em;
          }
          .registry-subtitle {
            color: rgba(255,255,255,0.7);
            font-size: 1.25rem;
            line-height: 1.6;
            max-width: 700px;
            margin: 0 auto;
          }
          .registry-container {
            margin-top: -80px;
            position: relative;
            z-index: 10;
          }
          .filter-card {
            background: white;
            padding: 40px;
            border-radius: 24px;
            box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1);
            border: 1px solid #E2E8F0;
          }
          .filter-grid {
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 32px 24px;
          }
          .filter-item {
            display: flex;
            flex-direction: column;
          }
          .filter-label {
            font-size: 11px;
            font-weight: 800;
            color: #64748B;
            text-transform: uppercase;
            margin-bottom: 10px;
            letter-spacing: 0.05em;
          }
          .search-field {
            display: flex;
            align-items: center;
            background: #F8FAFC;
            border-radius: 12px;
            padding: 0 16px;
            border: 1px solid #E2E8F0;
            height: 50px;
          }
          .minimal-input {
            width: 100%;
            padding: 12px;
            background: transparent;
            border: none;
            outline: none;
            font-size: 15px;
            color: #120A2B;
            font-weight: 500;
          }
          .primary-action-btn {
            width: 100%;
            background: #3A0F7E;
            color: white;
            height: 50px;
            border-radius: 12px;
            border: none;
            font-weight: 800;
            font-size: 15px;
            cursor: pointer;
            transition: opacity 0.2s;
          }
          .primary-action-btn:hover {
            opacity: 0.9;
          }
          .results-header {
            display: flex;
            justify-content: space-between;
            align-items: baseline;
            margin-bottom: 40px;
            padding-bottom: 20px;
            border-bottom: 2px solid #E2E8F0;
          }
          .results-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
            gap: 32px;
          }
          .spec-card {
            background: white;
            border-radius: 24px;
            padding: 32px;
            border: 1px solid #E2E8F0;
            cursor: pointer;
            transition: transform 0.2s, box-shadow 0.2s;
          }
          .spec-card:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 30px rgba(0,0,0,0.05);
          }
          .spec-card-top {
            display: flex;
            align-items: center;
            gap: 20px;
            margin-bottom: 24px;
          }
          .spec-avatar-frame {
            width: 72px;
            height: 72px;
            border-radius: 20px;
            background: #F1F5F9;
            display: flex;
            align-items: center;
            justify-content: center;
            overflow: hidden;
            border: 1px solid #E2E8F0;
            flex-shrink: 0;
          }
          .spec-name {
            font-size: 20px;
            font-weight: 900;
            color: #120A2B;
            margin: 0 0 4px 0;
            line-height: 1.2;
          }
          .spec-profession {
            font-size: 14px;
            color: #3A0F7E;
            font-weight: 700;
          }
          .spec-card-info {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-bottom: 28px;
          }
          .spec-info-row {
            display: flex;
            align-items: center;
            gap: 8px;
            font-size: 15px;
            color: #475569;
            font-weight: 500;
          }
          .spec-card-footer {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-top: 24px;
            border-top: 1px solid #F1F5F9;
          }
          .spec-status-tag {
            font-size: 11px;
            font-weight: 800;
            padding: 6px 14px;
            border-radius: 100px;
            text-transform: uppercase;
          }
          .empty-state {
            background: white;
            border-radius: 32px;
            padding: 100px 40px;
            text-align: center;
            border: 2px dashed #E2E8F0;
          }

          @keyframes pulse {
            0% { transform: scale(0.95); opacity: 0.5; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(0.95); opacity: 0.5; }
          }
          .pulse-dot {
            animation: pulse 2s infinite ease-in-out;
          }

          @media (max-width: 768px) {
            .registry-header-section {
              padding: 100px 0 120px;
            }
            .registry-title {
              font-size: 2.5rem;
            }
            .registry-subtitle {
              font-size: 1.1rem;
            }
            .filter-card {
              padding: 24px;
            }
            .filter-grid {
              grid-template-columns: 1fr;
              gap: 20px;
            }
            .filter-item label[style*="visibility: hidden"] {
              display: none;
            }
            .results-grid {
              grid-template-columns: 1fr;
            }
            .spec-card {
              padding: 24px;
            }
          }
        `}</style>
      </main>
    );
  }

  const customSelectStyles = {
    control: (base: any) => ({ ...base, borderRadius: '12px', border: '1px solid #E2E8F0', background: '#F8FAFC', minHeight: '50px', boxShadow: 'none' }),
    singleValue: (base: any) => ({ ...base, fontSize: '15px', fontWeight: 500, color: '#120A2B' }),
  };

