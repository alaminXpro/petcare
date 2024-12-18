import NextAuth from 'next-auth'

import { authConfig } from '@/auth/config'
import { DEFAULT_LOGIN_REDIRECT, apiAuthPrefix, authRoutes, publicRoutes } from '@/routes'

export const { auth } = NextAuth(authConfig)

export default auth(req => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Skip middleware completely for API routes except auth routes
  if (nextUrl.pathname.startsWith('/api') && !nextUrl.pathname.startsWith(apiAuthPrefix)) {
    return null
  }

  const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix)

  if (isApiAuthRoute) {
    return null
  }

  // New function to check if the current path matches any public route pattern
  const isPublicRoute = publicRoutes.some(route => {
    // Convert Next.js route pattern to regex
    const pattern = route
      .replace(/\[.*?\]/g, '[^/]+') // Replace [param] with regex pattern
      .replace('/', '\\/') // Escape forward slashes

    const regex = new RegExp(`^${pattern}$`)

    return regex.test(nextUrl.pathname)
  })

  const isAuthRoute = authRoutes.includes(nextUrl.pathname)

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl))
    }

    return null
  }

  if (!isLoggedIn && !isPublicRoute) {
    // Changed from isPublicRoutes to isPublicRoute
    let callbackUrl = nextUrl.pathname

    if (nextUrl.search) {
      callbackUrl += nextUrl.search
    }

    const encodedCallbackUrl = encodeURIComponent(callbackUrl)

    return Response.redirect(new URL(`/login?callbackUrl=${encodedCallbackUrl}`, nextUrl))
  }

  return null
})

// Optionally, don't invoke Middleware on some paths
// Read more: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
export const config = {
  matcher: [
    // Match all paths except api routes that don't start with /api/auth
    '/((?!_next|api(?!/auth)|static|.*\\..*$).*)',
    '/api/auth/:path*'
  ]
}
