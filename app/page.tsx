'use client';

import Image from 'next/image';
import Link from 'next/link';

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
  // Add more fonts as needed
];

export default function Home() {
  return (
    <main className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 pt-20 pb-16">
        <div className="text-center">
          <h1 className="text-5xl font-bold mb-6">
            The world's largest<br />AI font library
          </h1>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
            Save thousands of dollars and research with our library of<br />
            3,000+ font library from the world's best designers.
          </p>
          <div className="flex justify-center gap-4 mb-12">
            <Link 
              href="/auth"
              className="bg-black text-white px-6 py-3 rounded-full font-medium hover:bg-gray-800 transition"
            >
              Create free account
            </Link>
            <button className="text-gray-600 px-6 py-3 hover:text-gray-800">
              See all plans
            </button>
          </div>

          {/* Brand Logos */}
          <div className="flex justify-center items-center gap-8 flex-wrap">
            {brands.map((brand) => (
              <div key={brand.name} className="w-16 h-16 relative">
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
      <section className="max-w-7xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-semibold mb-6">Discover</h2>
        
        {/* Categories */}
        <div className="flex gap-4 overflow-x-auto pb-4 mb-8 scrollbar-hide">
          {categories.map((category) => (
            <button
              key={category}
              className="whitespace-nowrap px-4 py-2 rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              {category}
            </button>
          ))}
        </div>

        {/* Font Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {fonts.map((font) => (
            <div key={font.id} className="group">
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 overflow-hidden relative">
                <div className="absolute top-4 left-4 flex gap-2">
                  {font.isTopTen && (
                    <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm">
                      Top 10
                    </span>
                  )}
                  {font.isNew && (
                    <span className="bg-emerald-500 text-white px-3 py-1 rounded-full text-sm">
                      New & Fresh
                    </span>
                  )}
                  {font.isUpdated && (
                    <span className="bg-purple-500 text-white px-3 py-1 rounded-full text-sm">
                      Updated
                    </span>
                  )}
                </div>
                <div className="flex items-center justify-center h-full text-4xl font-bold">
                  Aa
                  <br />
                  123
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
                  <span className="text-sm font-medium">{font.name}</span>
                </div>
                <span className="text-sm font-medium">${font.price}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
