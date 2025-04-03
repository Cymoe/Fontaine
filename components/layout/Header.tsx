'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import ThemeSwitcher from '../ui/ThemeSwitcher';
import { supabase } from '@/utils/supabase';

const LogoIcon = () => (
  <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="32" height="32" rx="8" fill="#FF90BC"/>
    <path d="M12 8H20V12H16V24H12V8Z" fill="#333333"/>
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

export default function Header() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  useEffect(() => {
    // Get saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);

    // Check for user session
    const checkUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user ?? null);
    };
    
    checkUser();

    // Listen for auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuthClick = async () => {
    if (user) {
      setIsLoading(true);
      try {
        await supabase.auth.signOut();
        router.push('/');
      } catch (error) {
        console.error('Error signing out:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      router.push('/auth');
    }
    setIsMenuOpen(false);
  };

  const handleTryFreeClick = () => {
    router.push('/auth');
    setIsMenuOpen(false);
  };

  return (
    <header>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <LogoIcon />
            <span>Fontaine</span>
          </Link>
          
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <Link href="#features" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <button 
              onClick={handleAuthClick} 
              className="login-btn" 
              disabled={isLoading}
            >
              {isLoading ? 'Loading...' : user ? 'Sign out' : 'Log in'}
            </button>
            {!user && (
              <button 
                onClick={handleTryFreeClick} 
                className="try-free-btn"
              >
                Try for free
              </button>
            )}
            <div className="desktop-theme-switcher">
              <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            </div>
          </div>

          <div className="mobile-controls">
            <div className="mobile-theme-switcher">
              <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
            </div>
            <div className="mobile-menu-toggle" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
}