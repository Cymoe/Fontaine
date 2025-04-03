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
        console.log('Auth callback initiated');
        const code = searchParams.get('code');
        const next = searchParams.get('next') || '/dashboard';
        
        if (!code) {
          console.error('No code found in URL');
          return router.replace('/auth?error=No authorization code found');
        }

        console.log('Exchanging code for session...');
        // Exchange the code for a session
        const { error: exchangeError } = await supabase.auth.exchangeCodeForSession(code);
        if (exchangeError) {
          console.error('Exchange error:', exchangeError);
          throw exchangeError;
        }

        console.log('Code exchanged successfully, getting session...');
        // Get the session to confirm it worked
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) {
          console.error('Session error:', sessionError);
          throw sessionError;
        }

        if (session) {
          // Successfully signed in
          console.log('Session obtained, redirecting to:', next);
          router.replace(next);
        } else {
          console.error('No session created after code exchange');
          router.replace('/auth?error=Unable to sign in - No session created');
        }
      } catch (error: unknown) {
        console.error('Auth callback error:', error);
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
    <div className="flex items-center justify-center min-h-screen p-4">
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
