'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './dashboard.module.css';
import './styles.css'; // Import global styles
import { supabase } from '@/utils/supabase';
import Link from 'next/link';

// Define tab options
const navTabs = [
  { id: 'apps', label: 'Apps', active: true },
  { id: 'screens', label: 'Screens', active: false },
  { id: 'ui-elements', label: 'UI Elements', active: false },
  { id: 'flows', label: 'Flows', active: false, isPro: true }
];

const categories = [
  'Finance',
  'Business',
  'Health & Fitness',
  'Food & Drink',
  'Education',
  'Shopping',
  'AI',
  'Travel & Transportation',
  'Lifestyle',
  'Entertainment'
];

const apps = [
  // First row
  {
    id: 1,
    title: 'Bolt',
    category: 'Travel & Transportation',
    isNew: false,
    status: 'Updated',
    screenshot: '/apps/bolt-screenshot.png',
    icon: '/apps/bolt-icon.png'
  },
  {
    id: 2,
    title: 'MoonPay',
    category: 'Finance',
    isNew: true,
    status: 'New',
    screenshot: '/apps/moonpay-screenshot.png',
    icon: '/apps/moonpay-icon.png'
  },
  {
    id: 3,
    title: 'Tock',
    category: 'Food & Drink',
    isNew: true,
    status: 'New',
    screenshot: '/apps/tock-screenshot.png',
    icon: '/apps/tock-icon.png'
  },
  // Second row
  {
    id: 4,
    title: 'Netflix',
    category: 'Entertainment',
    isNew: true,
    status: 'New',
    screenshot: '/apps/netflix-screenshot.png',
    icon: '/apps/netflix-icon.png'
  },
  {
    id: 5,
    title: 'Figma',
    category: 'Business',
    isNew: false,
    status: 'Updated',
    screenshot: '/apps/figma-screenshot.png',
    icon: '/apps/figma-icon.png'
  },
  {
    id: 6,
    title: 'Spotify',
    category: 'Entertainment',
    isNew: false,
    status: 'Updated',
    screenshot: '/apps/spotify-screenshot.png',
    icon: '/apps/spotify-icon.png'
  },
  // Third row
  {
    id: 7,
    title: 'ChatGPT',
    category: 'AI',
    isNew: true,
    status: 'New',
    screenshot: '/apps/chatgpt-screenshot.png',
    icon: '/apps/chatgpt-icon.png'
  },
  {
    id: 8,
    title: 'Slack',
    category: 'Business',
    isNew: false,
    status: 'Updated',
    screenshot: '/apps/slack-screenshot.png',
    icon: '/apps/slack-icon.png'
  },
  {
    id: 9,
    title: 'Instagram',
    category: 'Social',
    isNew: false,
    status: 'Updated',
    screenshot: '/apps/instagram-screenshot.png',
    icon: '/apps/instagram-icon.png'
  }
];

export default function DashboardPage() {
  const [viewMode, setViewMode] = useState('Mobile');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('apps');
  const [isSigningOut, setIsSigningOut] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Apply dark mode to document body when component mounts
    document.body.classList.toggle('light-mode', !isDarkMode);
    document.body.classList.toggle('dark-mode', isDarkMode);
    
    // Add class to force header hiding
    document.body.classList.add('dashboard-page');
    
    return () => {
      // Cleanup on unmount
      document.body.classList.remove('light-mode', 'dark-mode', 'dashboard-page');
    };
  }, [isDarkMode]);

  useEffect(() => {
    // Close dropdown when clicking outside
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleSignOut = async () => {
    setIsSigningOut(true);
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      // Force a hard navigation to clear all client state
      window.location.href = '/';
    } catch (error) {
      console.error('Error signing out:', error);
      setIsSigningOut(false);
    }
  };

  return (
    <div className={`${styles.container} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
      <div className={styles.content}>
        {/* Main Header */}
        <div className={styles.mainHeader}>
          <div className={styles.headerLeft}>
            <div className={styles.brand}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="12" fill="white" />
                <path d="M8 6L11 18M14 6L17 18M9 12H15" 
                  stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span className={styles.brandName}>Fontaine</span>
            </div>
          </div>
          
          <div className={styles.headerCenter}>
            <div className={styles.searchContainer}>
              <svg
                className={styles.searchIcon}
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
              <input
                type="text"
                placeholder="Search fonts..."
                className={styles.searchInput}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
          
          <div className={styles.headerRight}>
            <div className={styles.viewToggleContainer}>
              <button 
                className={`${styles.viewToggleButton} ${viewMode === 'Mobile' ? styles.activeToggle : ''}`}
                onClick={() => setViewMode('Mobile')}
              >
                Mobile
              </button>
              <button 
                className={`${styles.viewToggleButton} ${viewMode === 'Web' ? styles.activeToggle : ''}`}
                onClick={() => setViewMode('Web')}
              >
                Web
              </button>
            </div>
            
            <button className={styles.iconButton} aria-label="Bookmarks">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z"></path>
              </svg>
            </button>
            
            <button className={styles.iconButton} aria-label="Settings">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="3"></circle>
                <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
              </svg>
            </button>
            
            <button className={styles.getProButton}>
              Get Pro
            </button>
            
            <div className={styles.profileContainer} ref={dropdownRef}>
              <button 
                className={styles.avatarButton}
                onClick={toggleDropdown}
                aria-label="Open user menu"
              >
                <div className={styles.avatar}>
                  <span>JD</span>
                </div>
              </button>
              
              {isDropdownOpen && (
                <div className={styles.dropdown}>
                  <div className={styles.dropdownHeader}>
                    <h3>John Doe</h3>
                    <p>john.doe@example.com</p>
                  </div>
                  
                  <div className={styles.dropdownDivider}></div>
                  
                  <div className={styles.themeSection}>
                    <span>Theme</span>
                    <div className={styles.themeOptions}>
                      <button 
                        className={`${styles.themeOption} ${isDarkMode ? styles.active : ''}`}
                        onClick={() => setIsDarkMode(true)}
                        aria-label="Dark mode"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                        </svg>
                      </button>
                      <button 
                        className={`${styles.themeOption} ${!isDarkMode ? styles.active : ''}`}
                        onClick={() => setIsDarkMode(false)}
                        aria-label="Light mode"
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <circle cx="12" cy="12" r="5" />
                          <line x1="12" y1="1" x2="12" y2="3" />
                          <line x1="12" y1="21" x2="12" y2="23" />
                          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                          <line x1="1" y1="12" x2="3" y2="12" />
                          <line x1="21" y1="12" x2="23" y2="12" />
                          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                        </svg>
                      </button>
                    </div>
                  </div>
                  
                  <div className={styles.dropdownDivider}></div>
                  
                  <Link href="/dashboard/profile" className={styles.dropdownItem}>
                    <span>View Profile</span>
                  </Link>
                  <button className={styles.dropdownItem}>
                    <span>Account Settings</span>
                  </button>
                  <button className={styles.dropdownItem}>
                    <span>Billing</span>
                  </button>
                  
                  <div className={styles.dropdownDivider}></div>
                  
                  <button 
                    className={`${styles.dropdownItem} ${styles.signOut}`}
                    onClick={handleSignOut}
                    disabled={isSigningOut}
                  >
                    {isSigningOut ? 'Signing out...' : 'Sign out'}
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        
        <h1 className={styles.title}>Discover Fonts</h1>
        
        {/* Navigation Tabs */}
        <div className={styles.navTabs}>
          {navTabs.map(tab => (
            <button
              key={tab.id}
              className={`${styles.navTab} ${activeTab === tab.id ? styles.active : ''} ${tab.isPro ? styles.pro : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        
        {/* Categories */}
        <div className={styles.categoriesContainer}>
          <button className={`${styles.filterButton} ${styles.active}`}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            Filters
          </button>
          
          {categories.map(category => (
            <button key={category} className={styles.categoryButton}>
              {category}
            </button>
          ))}
        </div>
        
        {/* Apps Grid */}
        <div className={styles.appGrid}>
          {apps.map(app => (
            <div key={app.id} className={styles.appCard}>
              <div className={styles.appScreenshot}>
                <img src={app.screenshot} alt={app.title} className={styles.screenshotImage} />
                {app.isNew && <span className={`${styles.badge} ${styles.newBadge}`}>New</span>}
                {!app.isNew && <span className={`${styles.badge} ${styles.updatedBadge}`}>{app.status}</span>}
              </div>
              <div className={styles.appInfo}>
                <div className={styles.appIcon}>
                  <img src={app.icon} alt={`${app.title} icon`} />
                </div>
                <div className={styles.appDetails}>
                  <h3 className={styles.appTitle}>{app.title}</h3>
                  <p className={styles.appCategory}>{app.category}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}