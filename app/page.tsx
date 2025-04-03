'use client';

import Image from 'next/image';
import Link from 'next/link';
import HeaderWrapper from "@/components/layout/HeaderWrapper";

const brands = [
  { name: 'Twitch', logo: '/brands/twitch.svg' },
  { name: 'Airbnb', logo: '/brands/airbnb.svg' },
  { name: 'Spotify', logo: '/brands/spotify.svg' },
  { name: 'Figma', logo: '/brands/figma.svg' },
  { name: 'Uber', logo: '/brands/uber.svg' },
  { name: 'Shopify', logo: '/brands/shopify.svg' },
];

const categories = [
  'All',
  'Hot',
  'Popular',
  'Business',
  'Health & Fitness',
  'Food & Drink',
  'Education',
  'Shopping',
  'Artificial Intelligence',
  'Travel & Transportation',
  'Lifestyle',
  'Entertainment',
  'Gaming',
];

const fonts = [
  { id: 1, name: 'Artist name', price: 2.99, isTopTen: true },
  { id: 2, name: 'Artist name', price: 2.99, isNew: true },
  { id: 3, name: 'Artist name', price: 2.99, isUpdated: true },
  { id: 4, name: 'Artist name', price: 2.99, isUpdated: true },
  { id: 5, name: 'Artist name', price: 2.99, isTopTen: true },
  { id: 6, name: 'Artist name', price: 2.99, isNew: true },
  { id: 7, name: 'Artist name', price: 2.99, isUpdated: true },
  { id: 8, name: 'Artist name', price: 2.99, isTopTen: true },
  { id: 9, name: 'Artist name', price: 2.99, isNew: true },
  { id: 10, name: 'Artist name', price: 2.99, isUpdated: true },
  { id: 11, name: 'Artist name', price: 2.99, isTopTen: true },
  { id: 12, name: 'Artist name', price: 2.99, isNew: true },
];

export default function Home() {
  return (
    <>
      <HeaderWrapper />
      <main>
        {/* Hero Section */}
        <section className="hero-section">
          <div className="container">
            <h1 className="hero-title">
              The world&apos;s largest<br />mobile UI library
            </h1>
            <p className="hero-subtitle">
              Save thousands of hours of research with our library of<br />
              10,000+ mobile screens from the world&apos;s best designers.
            </p>
            <div className="button-container">
              <Link href="/auth" className="primary-button">
                Create free account
              </Link>
              <button className="secondary-button">
                See all plans
              </button>
            </div>

            {/* Brand Logos */}
            <div className="brand-logos">
              {brands.map((brand) => (
                <div key={brand.name} className="brand-logo">
                  <Image
                    src={brand.logo}
                    alt={brand.name}
                    fill
                    className="object-contain"
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Discovery Section */}
        <section className="discover-section">
          <div className="container">
            <h2 className="section-title">Discover</h2>
            
            {/* Categories */}
            <div className="categories">
              {categories.map((category, index) => (
                <button
                  key={category}
                  className={`category-button ${index === 0 ? 'active' : ''}`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Font Grid */}
            <div className="font-grid">
              {fonts.map((font) => (
                <div key={font.id} className="font-card">
                  <div className="font-preview">
                    {font.isTopTen && (
                      <span className="badge badge-pink">
                        Top 10
                      </span>
                    )}
                    {font.isNew && (
                      <span className="badge badge-green">
                        New & Fresh
                      </span>
                    )}
                    {font.isUpdated && (
                      <span className="badge badge-purple">
                        Updated
                      </span>
                    )}
                    <div className="font-sample">
                      Aa
                      <br />
                      123
                    </div>
                  </div>
                  <div className="font-info">
                    <div className="artist">
                      <div className="artist-avatar"></div>
                      <span className="artist-name">{font.name}</span>
                    </div>
                    <span className="font-price">${font.price}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
