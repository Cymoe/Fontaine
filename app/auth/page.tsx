'use client';

import { useState, useEffect, Suspense } from 'react';
import { supabase } from '@/utils/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import { AuthError } from '@/types/supabase';

function AuthContent() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    // Check if there's an error in the URL
    const errorMsg = searchParams.get('error');
    if (errorMsg) {
      setError(decodeURIComponent(errorMsg));
    }

    // Check if user is already logged in
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        router.push('/dashboard');
      }
    };
    
    checkSession();
  }, [searchParams, router]);

  // Get site URL based on environment
  const siteUrl = process.env.NODE_ENV === 'production'
    ? 'https://fontaine-lemon.vercel.app'
    : 'http://localhost:3000';

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    
    try {
      const { error } = await supabase.auth.signInWithOtp({
        email,
        options: {
          emailRedirectTo: `${siteUrl}/auth/callback?mode=login`,
        },
      });
      
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(authError.message || 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError(null);
      setLoading(true);
      
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${siteUrl}/auth/callback`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          },
        },
      });
      
      if (error) throw error;
    } catch (error: unknown) {
      const authError = error as AuthError;
      setError(authError.message || 'An error occurred');
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-content">
        <div className="auth-logo">
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="32" height="32" rx="8" fill="#FF90BC"/>
            <path d="M12 8H20V12H16V24H12V8Z" fill="#333333"/>
          </svg>
        </div>

        <h1>Create your free account</h1>
        <p className="auth-subtitle">
          Create your free account to search or filter through 300,000+ screens. No credit card required.
        </p>

        {error && (
          <div className="error-message">
            {error}
          </div>
        )}

        <button 
          className="google-auth-btn" 
          onClick={handleGoogleSignIn}
          disabled={loading}
        >
          <Image src="/google.svg" alt="Google" width={20} height={20} />
          Continue with Google
        </button>

        <div className="divider">
          <span>or</span>
        </div>

        <form onSubmit={handleEmailSignIn}>
          <input
            type="email"
            placeholder="Enter email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
            required
          />
          <button type="submit" className="continue-btn" disabled={loading}>
            {loading ? 'Loading...' : 'Continue'}
          </button>
        </form>

        <p className="terms">
          By continuing, you agree to Fontaine&apos;s{' '}
          <Link href="/terms">Terms of Service</Link> and{' '}
          <Link href="/privacy">Privacy Policy</Link>
        </p>

        <p className="login-link">
          Already have an account? <Link href="/auth?mode=login">Log in</Link>
        </p>

        <div className="trusted-by">
          <p>Trusted by teams at</p>
          <div className="company-logos">
            <Image src="/company1.svg" alt="Company 1" width={100} height={30} />
            <Image src="/company2.svg" alt="Company 2" width={100} height={30} />
            <Image src="/company3.svg" alt="Company 3" width={100} height={30} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function AuthPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="loading-spinner mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    }>
      <AuthContent />
    </Suspense>
  );
}
