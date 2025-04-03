'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import ThemeSwitcher from '../ui/ThemeSwitcher';

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

  useEffect(() => {
    // Get saved theme from localStorage or use default
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' || 'light';
    setTheme(savedTheme);
    document.documentElement.setAttribute('data-theme', savedTheme);
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

  return (
    <header>
      <div className="container">
        <nav>
          <Link href="/" className="logo">
            <LogoIcon />
            <span>Fontaine</span>
          </Link>
          
          <div className="mobile-menu-toggle" onClick={toggleMenu}>
            {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
          </div>
          
          <div className={`nav-links ${isMenuOpen ? 'open' : ''}`}>
            <Link href="#features" onClick={() => setIsMenuOpen(false)}>Features</Link>
            <Link href="#pricing" onClick={() => setIsMenuOpen(false)}>Pricing</Link>
            <Link href="#login" className="login-btn" onClick={() => setIsMenuOpen(false)}>Log in</Link>
            <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
          </div>
        </nav>
      </div>
    </header>
  );
} 