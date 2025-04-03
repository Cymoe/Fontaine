'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/utils/supabase';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Exchange the code for a session
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          throw error;
        }

        if (session) {
          // Successfully signed in, redirect to dashboard
          router.replace('/dashboard');
        } else {
          // No session found
          router.replace('/auth?error=Unable to sign in');
        }
      } catch (error: unknown) {
        console.error('Auth error:', error);
        const message = error instanceof Error ? error.message : 'An error occurred';
        router.replace('/auth?error=' + encodeURIComponent(message));
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
