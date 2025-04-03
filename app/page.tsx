'use client';

import Header from '@/components/layout/Header';
import Hero from '@/components/layout/Hero';
import Demo from '@/components/layout/Demo';
import TrustedBy from '@/components/layout/TrustedBy';
import Features from '@/components/layout/Features';
import CTA from '@/components/layout/CTA';
import Footer from '@/components/layout/Footer';
import SupabaseTest from '@/components/SupabaseTest';

export default function Home() {
  return (
    <main>
      <Header />
      <SupabaseTest />
      <Hero />
      <Demo />
      <TrustedBy />
      <Features />
      <CTA />
      <Footer />
    </main>
  );
}
