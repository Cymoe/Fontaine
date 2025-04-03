'use client';

import Link from 'next/link';

export default function CTA() {
  return (
    <section className="cta">
      <div className="container">
        <h2>Ready to create your brand font?</h2>
        <Link href="#signup" className="primary-btn">Get started for free</Link>
      </div>
    </section>
  );
} 