'use client';

import Link from 'next/link';

const HeroIcon = () => (
  <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="80" height="80" rx="16" fill="#FF90BC"/>
    <path d="M30 24H50V32H40V56H30V24Z" fill="#333333"/>
  </svg>
);

const ArrowIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4.16666 10H15.8333M15.8333 10L10 4.16667M15.8333 10L10 15.8333" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="icon-wrapper">
          <HeroIcon />
        </div>
        
        <h1>Generate brand-perfect<br/>custom fonts.</h1>
        
        <p className="subtitle">
          Create unique typography that perfectly matches your brand identity.
          Over 1,000+ brands use Fontaine for their custom font needs — New styles weekly.
        </p>

        <div className="cta-buttons">
          <Link href="#signup" className="primary-btn">Try for free</Link>
          <Link href="#plans" className="secondary-btn">
            See our plans
            <ArrowIcon />
          </Link>
        </div>
      </div>
    </section>
  );
} 