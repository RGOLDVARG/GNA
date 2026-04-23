'use client';
import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section style={{
      /* Very dark purple solid background */
      backgroundColor: '#1E1139',
      width: '100%',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      minHeight: '600px'
    }}>
      {/* Top right purple gradient glow (matches screenshot) */}
      <div style={{
        position: 'absolute',
        top: 0,
        right: 0,
        width: '50%',
        height: '100%',
        background: 'radial-gradient(circle at top right, rgba(135, 45, 255, 0.4) 0%, rgba(30, 17, 57, 0) 60%)',
        pointerEvents: 'none'
      }}></div>

      <div className="container hero-container">
        
        {/* The defining D-shaped image on the left. It touches the left edge of the screen visually. */}
        <div className="hero-image-container">
          {/* Placeholder image representation matching the style of the man in the screenshot */}
           <div style={{ width: '100%', height: '100%', background: 'url("https://images.unsplash.com/photo-1590650153855-d9e808231d41?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80") center/cover no-repeat', mixBlendMode: 'luminosity', opacity: 0.8 }}></div>
        </div>

        {/* Text content on the right */}
        <div className="hero-text-container">
          <h1 className="hero-title">
            Be Inspired by Leading Experts in Neurodiversity
          </h1>
          <p className="hero-desc">
            Hear from globally recognized psychologists and advocates at the Global Summit Series. Join a powerful community shaping the future through standards that drive real impact.
          </p>
          <div>
            <Link href="/registry" className="btn-pill btn-white mobile-full-width" style={{ display: 'inline-block', textDecoration: 'none' }}>
              Explore Specialist Registry →
            </Link>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-container {
          display: flex;
          align-items: center;
          width: 100%;
          padding: 0;
          position: relative;
          height: 100%;
        }
        .hero-image-container {
          flex: 0 0 45%;
          height: 600px;
          border-top-right-radius: 999px;
          border-bottom-right-radius: 999px;
          background: linear-gradient(45deg, #120A2B, #3A0F7E);
          position: relative;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-left: -50px;
          box-shadow: 20px 0 50px rgba(0,0,0,0.5);
        }
        .hero-text-container {
          flex: 1;
          padding-left: 80px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          color: white;
        }
        .hero-title {
          font-size: 56px;
          font-weight: 700;
          margin-bottom: 24px;
          color: white;
          line-height: 1.1;
        }
        .hero-desc {
          font-size: 18px;
          max-width: 600px;
          margin-bottom: 32px;
          line-height: 1.5;
          letter-spacing: 0.2px;
        }

        @media (max-width: 991px) {
          .hero-container {
            flex-direction: column;
            padding: 80px 20px !important;
            text-align: center;
          }
          .hero-image-container {
            display: none;
          }
          .hero-text-container {
            padding-left: 0;
            align-items: center;
          }
          .hero-title {
            font-size: 40px;
          }
        }
      `}</style>
    </section>
  );
}
