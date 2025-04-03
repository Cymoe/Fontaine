'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { supabase } from '@/utils/supabase';
import { User } from '@supabase/supabase-js';
import md5 from 'md5';
import './styles.css';
import styles from '../dashboard.module.css';
import Link from 'next/link';

export default function ProfilePage() {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('creations');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    role: '',
  });
  const [saving, setSaving] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true); // Set dark mode as default
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [viewMode, setViewMode] = useState('Mobile');

  useEffect(() => {
    // Force dark mode
    localStorage.setItem('darkMode', 'true');
    
    // Check if dark mode is enabled in localStorage
    const storedDarkMode = localStorage.getItem('darkMode');
    if (storedDarkMode) {
      setIsDarkMode(storedDarkMode === 'true');
    } else {
      // If no preference is stored, default to dark mode
      setIsDarkMode(true);
      localStorage.setItem('darkMode', 'true');
    }
    
    // Listen for dark mode changes
    const handleDarkModeChange = (e: StorageEvent) => {
      if (e.key === 'darkMode') {
        setIsDarkMode(e.newValue === 'true');
      }
    };
    
    window.addEventListener('storage', handleDarkModeChange);
    
    return () => {
      window.removeEventListener('storage', handleDarkModeChange);
    };
  }, []);

  // Toggle dark mode function
  const toggleDarkMode = () => {
    const newDarkMode = !isDarkMode;
    setIsDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
  };

  async function loadUser() {
    try {
      const { data: { session }, error } = await supabase.auth.getSession();
      
      if (error) {
        throw error;
      }
      
      if (session?.user) {
        setUser(session.user);
        setFormData({
          name: session.user.user_metadata?.name || '',
          email: session.user.email || '',
          company: session.user.user_metadata?.company || '',
          role: session.user.user_metadata?.role || '',
        });
      }
    } catch (error) {
      console.error('Error loading user:', error);
    } finally {
      setLoading(false);
    }
  }
  
  loadUser();

  const getGravatarUrl = (email: string) => {
    const hash = md5(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?s=200&d=mp`;
  };

  const getUsername = (email: string) => {
    return email.split('@')[0];
  };

  const formatDate = (date: string) => {
    const d = new Date(date);
    const month = d.toLocaleString('default', { month: 'long' });
    return `${month} ${d.getFullYear()}`;
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSaving(true);
    try {
      const { data, error } = await supabase
        .from('users')
        .update({
          id: user?.id,
          user_metadata: {
            name: formData.name,
            company: formData.company,
            role: formData.role,
          },
        })
        .select();
      
      if (error) {
        throw error;
      }
      
      // Update the user state with the form data
      if (user) {
        const updatedUser: User = { 
          ...user,
          user_metadata: {
            ...user.user_metadata,
            name: formData.name,
            company: formData.company,
            role: formData.role,
          }
        };
        setUser(updatedUser);
      }
      
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        throw error;
      }
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  if (loading) {
    return (
      <div className="profile-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className={`${styles.content} ${isDarkMode ? styles.darkMode : styles.lightMode}`}>
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
              placeholder="Search on iOS..."
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
              W
            </button>
          </div>
          
          <button className={styles.bookmarkButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" />
            </svg>
          </button>
          
          <button className={styles.settingsButton}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="3" />
              <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
            </svg>
          </button>
          
          <div className={styles.profileContainer}>
            <button className={styles.avatarButton} onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
              <div className={styles.avatar}>
                <span>JD</span>
              </div>
            </button>
            
            {isDropdownOpen && (
              <div className={styles.dropdown}>
                <div className={styles.dropdownHeader}>
                  <h3>{user?.user_metadata?.name || user?.email?.split('@')[0]}</h3>
                  <p>{user?.email}</p>
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
                  <span>Settings</span>
                </button>
                <button 
                  className={styles.dropdownItem}
                  onClick={handleSignOut}
                >
                  <span>Sign Out</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Profile Content */}
      <div className="profile-container">
        {/* Profile Header */}
        <div className="profile-header">
          <div className="profile-avatar">
            <img 
              src={`https://www.gravatar.com/avatar/${md5(user?.email || '')}`} 
              alt="Profile" 
              className="profile-avatar-image"
            />
          </div>
          <div className="profile-info">
            <h1 className="profile-username">{user?.user_metadata?.name || user?.email?.split('@')[0]}</h1>
            <p className="profile-display-name">@{user?.email?.split('@')[0]}</p>
            
            <div className="profile-stats">
              <div className="profile-stat-item">
                <span className="profile-stat-value">0</span>
                <span className="profile-stat-label">Creations</span>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-value">0</span>
                <span className="profile-stat-label">Followers</span>
              </div>
              <div className="profile-stat-item">
                <span className="profile-stat-value">0</span>
                <span className="profile-stat-label">Following</span>
              </div>
            </div>
            
            <div className="profile-actions">
              <button className="profile-add-bio-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add bio
              </button>
              <button className="profile-add-location-button">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12.75C13.6569 12.75 15 11.4069 15 9.75C15 8.09315 13.6569 6.75 12 6.75C10.3431 6.75 9 8.09315 9 9.75C9 11.4069 10.3431 12.75 12 12.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M19.5 9.75C19.5 16.5 12 21.75 12 21.75C12 21.75 4.5 16.5 4.5 9.75C4.5 7.76088 5.29018 5.85322 6.6967 4.4467C8.10322 3.04018 10.0109 2.25 12 2.25C13.9891 2.25 15.8968 3.04018 17.3033 4.4467C18.7098 5.85322 19.5 7.76088 19.5 9.75Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Add location
              </button>
              <div className="profile-join-date">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M8 2V5M16 2V5M3.5 9.09H20.5M21 8.5V17C21 18.1046 20.1046 19 19 19H5C3.89543 19 3 18.1046 3 17V8.5C3 7.39543 3.89543 6.5 5 6.5H19C20.1046 6.5 21 7.39543 21 8.5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
                Joined {new Date(user?.created_at || '').toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
          
          <button className="profile-edit-profile-button" onClick={() => setIsEditing(true)}>
            Edit profile
          </button>
          <button className="profile-toggle-dark-mode-button" onClick={toggleDarkMode}>
            {isDarkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>

        {/* Profile Tabs */}
        <div className="profile-tabs">
          <button 
            className={`profile-tab-button ${activeTab === 'creations' ? 'profile-active-tab-button' : ''}`}
            onClick={() => setActiveTab('creations')}
          >
            Creations
          </button>
          <button 
            className={`profile-tab-button ${activeTab === 'collections' ? 'profile-active-tab-button' : ''}`}
            onClick={() => setActiveTab('collections')}
          >
            Collections
          </button>
          <button 
            className={`profile-tab-button ${activeTab === 'liked' ? 'profile-active-tab-button' : ''}`}
            onClick={() => setActiveTab('liked')}
          >
            Liked
          </button>
        </div>

        {/* Profile Content */}
        <div className="profile-content">
          {activeTab === 'creations' && (
            <div className="profile-no-content-message">
              <p>You haven't created any fonts yet.</p>
            </div>
          )}
          {activeTab === 'collections' && (
            <div className="profile-no-content-message">
              <p>You haven't created any collections yet.</p>
            </div>
          )}
          {activeTab === 'liked' && (
            <div className="profile-no-content-message">
              <p>You haven't liked any fonts yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isEditing && (
        <div className="profile-modal-backdrop">
          <div className="profile-modal-content">
            <div className="profile-modal-header">
              <h2>Edit Profile</h2>
              <button className="profile-close-button" onClick={() => setIsEditing(false)}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </div>
            <form onSubmit={handleSubmit}>
              <div className="profile-form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                />
              </div>
              <div className="profile-form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your email"
                  disabled
                />
              </div>
              <div className="profile-form-group">
                <label htmlFor="company">Company</label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  placeholder="Your company"
                />
              </div>
              <div className="profile-form-group">
                <label htmlFor="role">Role</label>
                <input
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  placeholder="Your role"
                />
              </div>
              <div className="profile-form-actions">
                <button type="button" className="profile-cancel-button" onClick={() => setIsEditing(false)}>
                  Cancel
                </button>
                <button type="submit" className="profile-save-button" disabled={saving}>
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
