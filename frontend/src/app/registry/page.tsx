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
                {loading ? 'Consulting Registry...' : `Discoveries (${results.length})`}
              </h2>
            </div>

            <div style={{ minHeight: '400px', position: 'relative' }}>
              {!loading && results.length === 0 && (
                <div className="empty-state">
                  <Shield size={48} color="#CBD5E1" style={{ marginBottom: '20px' }} />
                  <h3 style={{ fontSize: '22px', fontWeight: 800 }}>No Matching Records</h3>
                </div>
              )}

              {!loading && results.length > 0 && (
                <div className="results-grid">
                  {results.map((spec: any) => (
                    <div
                      key={spec.id}
                      className="spec-card"
                      onClick={() => router.push(`/registry/${spec.gna_id}`)}
                    >
                      <div className="spec-card-top">
                        <div className="spec-avatar-frame">
                          {spec.avatar ? (
                            <img src={spec.avatar} alt={spec.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          ) : (
                            <UserIcon size={24} color="#3A0F7E" />
                          )}
                        </div>
                        <div style={{ flex: 1 }}>
                          <h4 className="spec-name">{spec.first_name} {spec.last_name}</h4>
                          <div className="spec-profession">{spec.profession || 'GNA Member'}</div>
                        </div>
                      </div>

                      <div className="spec-card-info">
                        <div className="spec-info-row"><MapPin size={14} color="#94A3B8" /> {spec.city}, {spec.country}</div>
                        <div className="spec-info-row"><Shield size={14} color="#3A0F7E" /> GNA ID: <strong>{spec.gna_id}</strong></div>
                      </div>

                      <div className="spec-card-footer">
                        <div className="spec-status-tag" style={{
                          backgroundColor: spec.certification_status === 'active' ? '#ECFDF5' : '#FFF7ED',
                          color: spec.certification_status === 'active' ? '#059669' : '#D97706',
                        }}>
                          {spec.certification_status === 'active' ? 'Active Certification' : (spec.certification_status || 'Member')}
                        </div>
                        <div style={{ fontSize: '13px', color: '#94A3B8', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <Calendar size={14} /> {spec.date_joined ? new Date(spec.date_joined).getFullYear() : '—'}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
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

