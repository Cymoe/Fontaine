'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Get the session - this will be set by Supabase Auth
        const { data: { session }, error } = await supabase.auth.getSession();
        
        if (error) throw error;
        
        if (session) {
          // We have a session, redirect to dashboard
          router.push('/dashboard');
        } else {
          // No session found, redirect back to auth
          router.push('/auth?error=Unable to sign in');
        }
      } catch (error: any) {
        console.error('Auth error:', error);
        router.push('/auth?error=' + encodeURIComponent(error.message));
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="loading-spinner mb-4"></div>
        <p>Completing sign in, please wait...</p>
      </div>
    </div>
  );
}
