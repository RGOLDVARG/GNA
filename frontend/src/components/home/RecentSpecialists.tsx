'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { User, Award, CheckCircle } from 'lucide-react';

interface Specialist {
  id: number;
  first_name: string;
  last_name: string;
  profession: string;
  gna_id: string;
  avatar: string | null;
  tier: string;
  certification_status: string;
}

export default function RecentSpecialists() {
  const [specialists, setSpecialists] = useState<Specialist[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialists = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || '';
        const res = await fetch(`${API_URL}/api/registry/`);
        if (res.ok) {
          const data = await res.json();
          // Filter for verified/high-tier specialists or just take first 3 for now
          setSpecialists(data.slice(0, 3));
        }
      } catch (error) {
        console.error('Failed to fetch specialists:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchSpecialists();
  }, []);

  if (loading || specialists.length === 0) return null;

  return (
    <section style={{ padding: '80px 0', backgroundColor: 'white' }}>
      <div className="container">
        <div className="spec-header">
          <div>
            <div style={{ color: '#3A0F7E', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '16px' }}>
              Verified Expertise
            </div>
            <h2 className="spec-title">
              Browse Recently Certified<br/>GNA® Specialists
            </h2>
          </div>
          <Link href="/registry" className="spec-link">
            View All Specialists →
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '32px' }}>
          {specialists.map((s) => (
            <Link key={s.id} href={`/registry/${s.gna_id}`} style={{ textDecoration: 'none' }}>
              <div className="specialist-card" style={{ 
                backgroundColor: 'white', 
                border: '1px solid #E5E5E5', 
                borderRadius: '16px', 
                padding: '32px',
                transition: 'all 0.3s ease',
                height: '100%',
                display: 'flex',
                flexDirection: 'column'
              }}>
                <div style={{ display: 'flex', gap: '20px', marginBottom: '24px' }}>
                  <div style={{ width: '80px', height: '80px', borderRadius: '12px', overflow: 'hidden', backgroundColor: '#F0F0F0', flexShrink: 0 }}>
                    {s.avatar ? (
                      <img src={s.avatar} alt={s.first_name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                      <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
                        <User size={32} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h3 style={{ fontSize: '20px', fontWeight: 800, color: '#120A2B', marginBottom: '4px' }}>
                      {s.first_name} {s.last_name}
                    </h3>
                    <div style={{ fontSize: '14px', color: '#666', fontWeight: 600, marginBottom: '8px' }}>
                      {s.profession}
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 800, color: '#2563EB', textTransform: 'uppercase' }}>
                      <CheckCircle size={14} /> GNA® Verified
                    </div>
                  </div>
                </div>

                <div style={{ marginTop: 'auto', paddingTop: '24px', borderTop: '1px solid #F0F0F0', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ fontSize: '13px', fontWeight: 700, color: '#120A2B' }}>
                    {s.gna_id}
                  </div>
                  <div style={{ backgroundColor: '#F0F9FF', color: '#0369A1', padding: '4px 12px', borderRadius: '4px', fontSize: '11px', fontWeight: 800, textTransform: 'uppercase' }}>
                    {s.tier}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <style jsx>{`
        .specialist-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.08);
          border-color: #3A0F7E;
        }
      `}</style>
    </section>
  );
}
