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
        const code = searchParams.get('code');
        const next = searchParams.get('next') || '/dashboard';
        
        if (!code) {
          console.error('No code found in URL');
          return router.replace('/auth?error=No authorization code found');
        }

        // Exchange the code for a session
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          throw exchangeError;
        }

        // Get the session to confirm it worked
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          throw sessionError;
        }

        if (session) {
          // Successfully signed in
          router.replace(next);
        } else {
          router.replace('/auth?error=Unable to sign in - No session created');
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
