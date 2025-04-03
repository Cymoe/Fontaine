'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';
import md5 from 'md5';

interface HeaderProps {
  isDashboard?: boolean;
  user?: User | null;
}

const LogoIcon = () => (
  <svg width="28" height="28" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 20L16 10H24L30 20L24 30H16L10 20Z" fill="#000000"/>
    <path d="M18 20L21 15H26L29 20L26 25H21L18 20Z" fill="#000000"/>
  </svg>
);

const MenuIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6H20M4 12H20M4 18H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

const CloseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

export default function Header({ isDashboard = false, user }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setCurrentUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSignOut = async () => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Force a hard navigation to clear all client state
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getGravatarUrl = (email: string) => {
    // Convert email to lowercase and trim
    const normalizedEmail = email.trim().toLowerCase();
    
    // Use md5 library to generate hash
    const hash = md5(normalizedEmail);
    
    return `https://www.gravatar.com/avatar/${hash}?s=40&d=mp`;
  };

  const handleMouseEnter = () => {
    setIsDropdownOpen(true);
  };

  const handleMouseLeave = () => {
    setIsDropdownOpen(false);
  };

  // Simplified header for non-dashboard pages based on Mobbin design
  if (!isDashboard) {
    return (
      <div className="flex justify-center w-full">
        <header className="py-5 px-8 bg-gray-100 rounded-full w-[550px]">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <LogoIcon />
              <span className="ml-2 text-2xl font-bold">Mobbin</span>
            </Link>
            
            <div className="flex items-center gap-8">
              <Link href="/pricing" className="text-lg font-medium">
                Pricing
              </Link>
              <Link href="/auth" className="text-lg font-medium">
                Log in
              </Link>
            </div>
          </div>
        </header>
      </div>
    );
  }

  // Original dashboard header
  return (
    <div className="flex justify-center w-full">
      <header className={`${isDashboard ? 'dashboard-header' : ''} w-[550px]`}>
        <div className="container">
          <nav>
            <div className="left-section">
              <Link href={currentUser ? "/dashboard" : "/"} className="logo">
                <LogoIcon />
                <span>Fontaine</span>
              </Link>
              
              {!isDashboard && !currentUser && (
                <div className="platform-links">
                  <Link href="/" className="active">iOS</Link>
                  <Link href="/">Android</Link>
                </div>
              )}
            </div>

            <div className="center-section">
              <div className="search-bar">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                <input type="text" placeholder="Search on iOS..." />
              </div>
            </div>
            
            <div className={`right-section ${isMenuOpen ? 'open' : ''}`}>
              {!currentUser && !isDashboard && (
                <>
                  <Link href="/pricing">Pricing</Link>
                  <Link href="/auth" className="login-btn">
                    Log in
                  </Link>
                  <Link href="/auth" className="try-free-btn">
                    Create free account
                  </Link>
                </>
              )}

              {isDashboard && (
                <>
                  <div className="header-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
                    </svg>
                  </div>
                  <div className="header-icon">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="3"></circle>
                      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                  </svg>
                </div>
                <Link href="/pricing" className="get-pro-btn">
                  Get Pro
                </Link>
                <div className="user-avatar-container" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                  <div className="user-avatar">
                    <Image src={getGravatarUrl(currentUser?.email || '')} alt="User Avatar" width={40} height={40} />
                  </div>
                  <div ref={dropdownRef} className={`dropdown ${isDropdownOpen ? 'show' : ''}`}>
                    <div className="user-profile-section">
                      <div className="pro-badge">PRO</div>
                      <div className="user-info-header">
                        <h3>Viktor Sola</h3>
                        <p>vsola@darcotech.com</p>
                      </div>
                      <Link href="/dashboard/profile" className="view-profile-btn">View profile</Link>
                    </div>
                    
                    <Link href="/pricing">Pricing</Link>
                    <Link href="/changelog">Changelog</Link>
                    <Link href="/blog">Blog</Link>
                    <Link href="/careers">
                      Careers
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="external-link">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </Link>
                    <Link href="/support">
                      Support
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="external-link">
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </Link>
                    <button 
                      onClick={() => {
                        handleSignOut();
                        setIsDropdownOpen(false);
                      }}
                      className="sign-out-btn"
                      disabled={isLoading}
                    >
                      {isLoading ? 'Signing out...' : 'Sign out'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>

          <div className="mobile-controls">
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
        </nav>
      </div>
    </header>
  </div>
  );
}