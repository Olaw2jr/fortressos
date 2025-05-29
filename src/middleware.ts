import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

// Paths that are always accessible
const publicPaths = [
  '/',
  '/login',
  '/register',
  '/reset-password',
  '/new-password',
  '/verify-email',
  '/api/auth/(.*)' // Allow all auth API routes
];

// Paths that require authentication
const authRoutes = [
  // '/dashboard(.*)',
  // '/settings(.*)',
  '/profile(.*)'
];

// Middleware function that runs on every request
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Check if the path is public
  const isPublicPath = publicPaths.some(path =>
    path.includes('(.*)')
      ? new RegExp(`^${path.replace('(.*)', '.*')}$`).test(pathname)
      : path === pathname
  );

  // Check if the path requires authentication
  const isAuthRoute = authRoutes.some(route =>
    route.includes('(.*)')
      ? new RegExp(`^${route.replace('(.*)', '.*')}$`).test(pathname)
      : route === pathname
  );

  // Get the authentication token
  const token = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET
  });

  // Redirect logic
  if (isAuthRoute && !token) {
    // Redirect to login if trying to access protected route without auth
    const url = new URL('/login', request.url);
    url.searchParams.set('callbackUrl', encodeURI(pathname));
    return NextResponse.redirect(url);
  }

  // If this is an API route or public path, allow access
  if (pathname.startsWith('/api/') || isPublicPath) {
    return NextResponse.next();
  }

  if (token && (pathname === '/login' || pathname === '/register')) {
    // Redirect to dashboard if already authenticated and trying to access login/register
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  return NextResponse.next();
}

// Configure which routes use this middleware
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.png$).*)',
  ],
};
