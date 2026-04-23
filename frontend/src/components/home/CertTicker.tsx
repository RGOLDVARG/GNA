'use client';
import React, { useState } from 'react';
import { motion, useAnimationFrame } from 'framer-motion';
import Link from 'next/link';

// Base array of certifications with individual institutional colors
const baseCerts = [
  { text: 'GNA-CA™', color: '#3A0F7E' },   // Deep Purple
  { text: 'GNA-CS®', color: '#C5A059' },   // Institutional Gold
  { text: 'GNA-IAS®', color: '#059669' },  // Emerald
  { text: 'GNA-EQCC™', color: '#2563EB' }, // Royal Blue
  { text: 'GNA-NIL™', color: '#D97706' },  // Amber
  { text: 'GNA-FND™', color: '#0891B2' },  // Cyan
  { text: 'GNA-ASD™', color: '#BE185D' },  // Rose
  { text: 'GNA-ADHD™', color: '#4338CA' }, // Indigo
  { text: 'GNA-PDA™', color: '#EA580C' },  // Orange
  { text: 'GNA-SEN®', color: '#0F766E' }   // Teal
];

const itemWidth = 260;
const setSize = baseCerts.length;
const setWidth = itemWidth * setSize; // 2600px

// Duplicate to create a perfect infinite loop (3 sets ensure the screen is always filled)
const duplicatedCerts = [...baseCerts, ...baseCerts, ...baseCerts];

export default function CertTicker() {
  const [absoluteActiveIndex, setAbsoluteActiveIndex] = useState(10);

  // Synchronize the active state with the CSS continuous scroll.
  // The scroll takes exactly 40 seconds to shift one full set (-2600px).
  useAnimationFrame((time) => {
    // Offset by 2 seconds so the switch happens exactly when the gap is in the center
    const progress = ((time + 2000) % 40000) / 40000;
    const index = Math.floor(progress * 10) % 10;
    
    // We target the middle set (indices 10 to 19) because that's the one
    // passing through the center of the screen during the 0 to -2600px scroll.
    const absIndex = 10 + index;
    
    if (absIndex !== absoluteActiveIndex) {
      setAbsoluteActiveIndex(absIndex);
    }
  });

  return (
    <section style={{ backgroundColor: '#F3F1ED', padding: '100px 0', overflow: 'hidden', position: 'relative' }}>
      <div className="container" style={{ padding: '0 20px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* The Ticker Area */}
        <div style={{ 
          position: 'relative', 
          marginBottom: '100px', 
          height: '100px', 
          display: 'flex', 
          alignItems: 'center',
          overflow: 'hidden'
        }}>

          {/* Continuous marquee */}
          <div style={{ position: 'absolute', left: '50%', marginLeft: `-${setWidth}px`, display: 'flex', alignItems: 'center' }}>
            <motion.div 
              style={{ display: 'flex', width: 'max-content' }}
              animate={{ x: [0, -setWidth] }}
              transition={{ repeat: Infinity, duration: 40, ease: "linear" }}
            >
              {duplicatedCerts.map((cert, index) => {
                const isActive = index === absoluteActiveIndex;
                
                return (
                  <div key={`cert-${index}`} style={{ width: `${itemWidth}px`, display: 'flex', justifyContent: 'center', position: 'relative' }}>
                     <div style={{ 
                       position: 'relative',
                       padding: '10px 28px', 
                       display: 'flex', 
                       alignItems: 'center', 
                       justifyContent: 'center',
                       fontSize: '26px', 
                       fontWeight: 900, 
                       letterSpacing: '-0.02em',
                       color: isActive ? cert.color : '#A8A29E',
                       transition: 'color 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                     }}>
                       
                       <span style={{ position: 'relative', zIndex: 2 }}>{cert.text}</span>

                       {/* 
                         The Gliding Capsule: 
                         Framer Motion automatically detaches this from the old item and visually 
                         swoops it to the new item, morphing its width automatically!
                       */}
                       {isActive && (
                         <motion.div
                           layoutId="activePillIndicator"
                           initial={false}
                           animate={{ borderColor: cert.color }}
                           transition={{ type: "spring", stiffness: 60, damping: 15, mass: 1.2 }}
                           style={{
                             position: 'absolute',
                             top: 0, left: 0, right: 0, bottom: 0,
                             border: '3px solid',
                             borderRadius: '100px',
                             zIndex: 1
                           }}
                         />
                       )}
                     </div>
                  </div>
                );
              })}
            </motion.div>
          </div>
          
          {/* Edge Fades for a seamless entering/exiting effect */}
          <div className="fade-left"></div>
          <div className="fade-right"></div>
        </div>

        {/* High-Impact Registration Center */}
        <div className="reg-center">
          <h2 className="reg-title">
            Start your impact <span style={{ color: '#2E1A47' }}>for free.</span>
          </h2>
          <p className="reg-desc">
            Join the global GNA network to unlock a premium hub of neuro-inclusive tools, accredited research, 
            and clinical thought leadership designed to accelerate your institutional purpose.
          </p>
          
          <Link href="/register" style={{ textDecoration: 'none' }}>
            <button className="reg-btn">
              Become a Member
            </button>
          </Link>

          <div style={{ marginTop: '40px', fontSize: '13px', color: '#94A3B8', fontWeight: 700, letterSpacing: '0.05em', textTransform: 'uppercase' }}>
             All certifications comply with Global Institutional Neurodiversity Standards (GNA-IAS-2026).
          </div>
        </div>

      </div>

      <style jsx>{`
        .ticker-section {
          background-color: #F3F1ED;
          padding: 80px 0;
          overflow: hidden;
          position: relative;
        }
        .ticker-container {
          position: relative;
          margin-bottom: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          overflow: hidden;
        }
        .fade-left {
          position: absolute;
          left: 0;
          top: 0;
          bottom: 0;
          width: 200px;
          background: linear-gradient(to right, #F3F1ED, transparent);
          z-index: 25;
          pointer-events: none;
        }
        .fade-right {
          position: absolute;
          right: 0;
          top: 0;
          bottom: 0;
          width: 200px;
          background: linear-gradient(to left, #F3F1ED, transparent);
          z-index: 25;
          pointer-events: none;
        }
        .reg-center {
          text-align: center;
          max-width: 900px;
          margin: 0 auto;
        }
        .reg-title {
          font-size: 64px;
          color: #120A2B;
          font-weight: 900;
          line-height: 1.05;
          margin-bottom: 32px;
          letter-spacing: -0.03em;
        }
        .reg-desc {
          font-size: 24px;
          color: #475569;
          font-weight: 600;
          line-height: 1.5;
          margin-bottom: 48px;
        }
        .reg-btn {
          background-color: #120A2B;
          color: white;
          border: none;
          padding: 24px 72px;
          border-radius: 100px;
          font-size: 18px;
          font-weight: 900;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          box-shadow: 0 20px 40px rgba(18, 10, 43, 0.15);
        }
        .reg-btn:hover {
          transform: translateY(-4px);
          box-shadow: 0 30px 50px rgba(18, 10, 43, 0.25);
          background-color: #2E1A47;
        }

        @media (max-width: 768px) {
          .reg-title {
            font-size: 36px;
          }
          .reg-desc {
            font-size: 18px;
          }
          .reg-btn {
            width: 100%;
            padding: 20px 40px;
          }
          .fade-left, .fade-right {
            width: 80px;
          }
        }
      `}</style>
    </section>
  );
}
