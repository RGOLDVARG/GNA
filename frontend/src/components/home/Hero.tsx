'use client';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Hero() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 992);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <section style={{
      backgroundColor: '#1E1139',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: isMobile ? 'stretch' : 'center',
      minHeight: isMobile ? 'auto' : '600px',
      flexDirection: isMobile ? 'column' : 'row',
    }}>

      {/* Gradient glow top right */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        background: 'radial-gradient(circle at top right, rgba(135, 45, 255, 0.4) 0%, rgba(30, 17, 57, 0) 60%)',
        pointerEvents: 'none',
        zIndex: 0,
      }} />

      {/* D-shaped image container */}
      <div style={{
        flexShrink: 0,
        flex: isMobile ? 'none' : '0 0 45%',
        width: isMobile ? '100%' : undefined,
        height: isMobile ? '360px' : '600px',
        borderTopRightRadius: isMobile ? '0' : '999px',
        borderBottomRightRadius: isMobile ? '160px' : '999px',
        background: 'linear-gradient(45deg, #120A2B, #3A0F7E)',
        position: 'relative',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: isMobile ? '0' : '-50px',
        marginBottom: isMobile ? '32px' : '0',
        boxShadow: isMobile ? '0 10px 40px rgba(0,0,0,0.5)' : '20px 0 50px rgba(0,0,0,0.5)',
        zIndex: 1,
      }}>
        <div style={{
          width: '100%',
          height: '100%',
          background: 'url("https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80") center/cover no-repeat',
          mixBlendMode: 'luminosity',
          opacity: 0.8,
        }} />
      </div>

      {/* Text content */}
      <div style={{
        flex: 1,
        paddingLeft: isMobile ? '24px' : '80px',
        paddingRight: isMobile ? '24px' : '40px',
        paddingBottom: isMobile ? '56px' : '0',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'flex-start',
        color: 'white',
        position: 'relative',
        zIndex: 2,
      }}>
        <h1 style={{
          fontSize: isMobile ? '36px' : '56px',
          fontWeight: 700,
          marginBottom: '20px',
          color: 'white',
          lineHeight: 1.1,
          margin: '0 0 20px 0',
        }}>
          Be Inspired by Leading Experts in Neurodiversity
        </h1>
        <p style={{
          fontSize: isMobile ? '16px' : '18px',
          maxWidth: '600px',
          marginBottom: '32px',
          lineHeight: 1.5,
          letterSpacing: '0.2px',
          color: 'rgba(255,255,255,0.85)',
        }}>
          Hear from globally recognized psychologists and advocates at the Global Summit Series. Join a powerful community shaping the future through standards that drive real impact.
        </p>
        <Link
          href="/registry"
          style={{
            display: isMobile ? 'block' : 'inline-block',
            textAlign: 'center',
            textDecoration: 'none',
            backgroundColor: 'white',
            color: '#1E1139',
            fontWeight: 600,
            fontSize: '16px',
            padding: '14px 32px',
            borderRadius: '999px',
            width: isMobile ? '100%' : 'auto',
            boxSizing: 'border-box',
          }}
        >
          Explore Specialist Registry →
        </Link>
      </div>
    </section>
  );
}
