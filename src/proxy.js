import { NextResponse } from 'next/server';

export function proxy(request) {
  const url = request.nextUrl.clone();
  const hostname = request.headers.get('host') || '';

  // Check if the request is coming from blog.pradumnasaraf.dev subdomain
  if (hostname === 'blog.pradumnasaraf.dev' || hostname.startsWith('blog.pradumnasaraf.dev:')) {
    // Get the pathname and clean it up
    let pathname = url.pathname;

    // Remove trailing slash for consistency (except root)
    if (pathname !== '/' && pathname.endsWith('/')) {
      pathname = pathname.slice(0, -1);
    }

    // Handle Hashnode URL patterns that might include @username
    // e.g., /@pradumnasaraf/some-post -> /some-post
    if (pathname.startsWith('/@')) {
      const parts = pathname.split('/');
      if (parts.length > 2) {
        // Remove the @username part
        pathname = '/' + parts.slice(2).join('/');
      }
    }

    // If it's the root or empty, redirect to the main blog page
    if (pathname === '/' || pathname === '') {
      return NextResponse.redirect(new URL('https://pradumnasaraf.dev/blog', request.url), 301);
    }

    // For any other path, redirect to the same path on the main domain's blog
    // e.g., blog.pradumnasaraf.dev/some-post -> pradumnasaraf.dev/blog/some-post
    // Preserve query parameters if any
    const newUrl = new URL(`https://pradumnasaraf.dev/blog${pathname}`, request.url);
    if (url.search) {
      newUrl.search = url.search;
    }

    return NextResponse.redirect(newUrl, 301);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
