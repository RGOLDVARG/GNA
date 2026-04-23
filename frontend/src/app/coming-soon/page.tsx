'use client';
import React from 'react';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import Link from 'next/link';

export default function ComingSoonPage() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Navbar />
      <main style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#FAF8F5', padding: '100px 20px' }}>
        <div style={{ maxWidth: '600px', textAlign: 'center' }}>
          <div style={{ display: 'inline-block', padding: '12px 24px', backgroundColor: '#F0EAFF', borderRadius: '100px', color: '#3A0F7E', fontWeight: 800, fontSize: '14px', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '32px' }}>
            Coming Soon
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: '#120A2B', marginBottom: '24px', lineHeight: 1.1 }}>
            This section is currently under development
          </h1>
          <p style={{ fontSize: '18px', color: '#666', lineHeight: 1.6, marginBottom: '40px' }}>
            We're building a world-class institutional resource for ADHD and neurodiversity specialists. Stay tuned for expert-led courses, certification pathways, and global research.
          </p>
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center' }}>
             <Link href="/" style={{ backgroundColor: '#120A2B', color: 'white', padding: '16px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}>
               Back to Home
             </Link>
             <Link href="/registry" style={{ backgroundColor: 'white', border: '1px solid #E5E5E5', color: '#120A2B', padding: '16px 32px', borderRadius: '8px', fontWeight: 700, fontSize: '16px', textDecoration: 'none' }}>
               Specialist Registry
             </Link>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
