'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/utils/supabase';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getUser() {
      await supabase.auth.getUser();
      setLoading(false);
    }
    getUser();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="loading-spinner mb-4"></div>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-layout">
      <main className="dashboard-content">
        {children}
      </main>
    </div>
  );
}
