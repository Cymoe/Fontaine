import { createServerClient, type CookieOptions } from '@supabase/ssr';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('Middleware executing for path:', request.nextUrl.pathname);
  const response = NextResponse.next();
  
  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return request.cookies.get(name)?.value;
        },
        set(name: string, value: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value,
            ...options,
          });
        },
        remove(name: string, options: CookieOptions) {
          response.cookies.set({
            name,
            value: '',
            ...options,
          });
        },
      },
    }
  );

  try {
    const { data: { session } } = await supabase.auth.getSession();
    console.log('Session check result:', session ? 'Authenticated' : 'Not authenticated');

    // Always allow access to the root path and static assets
    if (
      request.nextUrl.pathname === '/' || 
      request.nextUrl.pathname.startsWith('/_next') ||
      request.nextUrl.pathname.startsWith('/brands/')
    ) {
      return response;
    }

    // Allow access to auth callback regardless of session state
    if (request.nextUrl.pathname.startsWith('/auth/callback')) {
      console.log('Allowing access to auth callback');
      return response;
    }

    // If user is signed in and trying to access auth page, redirect to dashboard
    if (session && request.nextUrl.pathname.startsWith('/auth')) {
      console.log('User is authenticated, redirecting from auth to dashboard');
      const redirectUrl = new URL('/dashboard', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // If user is not signed in and trying to access dashboard, redirect to auth
    if (!session && request.nextUrl.pathname.startsWith('/dashboard')) {
      console.log('User is not authenticated, redirecting from dashboard to auth');
      const redirectUrl = new URL('/auth', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    // Redirect old profile path to new dashboard/profile path
    if (request.nextUrl.pathname === '/profile') {
      console.log('Redirecting from /profile to /dashboard/profile');
      const redirectUrl = new URL('/dashboard/profile', request.url);
      return NextResponse.redirect(redirectUrl);
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return response;
  }
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
