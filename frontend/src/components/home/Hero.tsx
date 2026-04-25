'use client';
import React from 'react';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="hero-section">
      {/* Top right purple gradient glow */}
      <div className="hero-glow" />

      <div className="container hero-container">
        
        {/* D-shaped image container */}
        <div className="hero-image-container">
           <div className="hero-image-src" />
        </div>

        {/* Text content */}
        <div className="hero-text-container">
          <h1 className="hero-title">
            Be Inspired by Leading Experts in Neurodiversity
          </h1>
          <p className="hero-desc">
            Hear from globally recognized psychologists and advocates at the Global Summit Series. Join a powerful community shaping the future through standards that drive real impact.
          </p>
          <div className="hero-action">
            <Link href="/registry" className="hero-btn">
              Explore Specialist Registry →
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
