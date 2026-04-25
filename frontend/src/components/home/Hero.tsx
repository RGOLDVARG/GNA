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
            Connect with the world’s foremost authorities in ADHD, Autism (ASD), and neuro-inclusion. At the Global Summit Series, we unite elite clinical psychologists and advocates to define the future of neurodiversity through rigorous standards and transformative professional excellence.
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
