import { createClient } from './lib/supabase/server'
import { updateSession } from './lib/supabase/middleware'

// This function can be marked `async` if using `await` inside
export async function middleware(request) {
  const { data: { user }} = await createClient().auth.getUser()

  // Redirect to login if no user is logged in and trying to access /dashboard
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return Response.redirect(new URL('/login', request.url))
  }

  // Redirect to dashboard if user is logged in and trying to access /login
  if (user && request.nextUrl.pathname === '/login') {
    return Response.redirect(new URL('/dashboard', request.url))
  }
  
  // Continue to update the session for other requests
  return await updateSession(request)
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
}
