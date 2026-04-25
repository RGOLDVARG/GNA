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
            Defining the global gold standard for ADHD, Autism (ASD), and neuro-inclusive excellence. As the leading institutional body, we establish the definitive certification pathways for practitioners and clinics worldwide. Join us in shaping the future of clinical care through rigorous accreditation and professional authority.
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
