import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getSiteFromHost } from '@/lib/siteConfig';
import { defaultLocale, isValidLocale } from '@/lib/i18nConfig';

// Paths that should never be rewritten / redirected
const BYPASS_PREFIXES = ['/_next', '/api', '/favicon.ico', '/assets', '/logos', '/images'];
const BYPASS_EXTENSIONS = ['.png', '.jpg', '.jpeg', '.svg', '.ico', '.webp', '.woff', '.woff2', '.css', '.js'];

function shouldBypass(pathname: string): boolean {
  if (BYPASS_PREFIXES.some((p) => pathname.startsWith(p))) return true;
  if (BYPASS_EXTENSIONS.some((e) => pathname.endsWith(e))) return true;
  if (pathname === '/sitemap.xml' || pathname === '/robots.txt') return true;
  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (shouldBypass(pathname)) return NextResponse.next();

  // ── 1. Determine which site this request is for ──────────────────────────
  const host = request.headers.get('host') ?? '';
  const site = getSiteFromHost(host);

  // ── 2. Determine locale from the URL ─────────────────────────────────────
  // Segment after the leading slash, e.g. /en/contact → 'en'
  const segments = pathname.split('/').filter(Boolean);
  const firstSegment = segments[0] ?? '';
  const hasLocalePrefix = isValidLocale(firstSegment);

  // ── 3. If no locale prefix → redirect to default locale ──────────────────
  if (!hasLocalePrefix) {
    const url = request.nextUrl.clone();
    const rest = pathname === '/' ? '' : pathname;
    url.pathname = `/${defaultLocale}${rest}`;
    const response = NextResponse.redirect(url);
    // Still inject site header so the destination page knows the site
    response.headers.set('x-site', site);
    return response;
  }

  // ── 4. Locale is present — pass through, injecting site context ──────────
  const response = NextResponse.next();
  // x-site is read by server components / generateMetadata via headers()
  response.headers.set('x-site', site);
  // Also forward as a request header so server components can read it
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-site', site);

  return NextResponse.next({
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
