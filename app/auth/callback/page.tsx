'use client';

import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { supabase } from '@/utils/supabase';

function CallbackHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Handle the OAuth callback
        const code = searchParams.get('code');
        if (code) {
          await supabase.auth.exchangeCodeForSession(code);
        }

        // Get the session after code exchange
        const { data: { session }, error } = await supabase.auth.getSession();

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
  }, [router, searchParams]);

  return (
    <div className="text-center">
      <div className="loading-spinner mb-4"></div>
      <p>Completing sign in, please wait...</p>
    </div>
  );
}

export default function AuthCallbackPage() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Suspense fallback={
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p>Loading...</p>
        </div>
      }>
        <CallbackHandler />
      </Suspense>
    </div>
  );
}
