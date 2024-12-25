export const publicRoutes: string[] = [
  '/',
  '/verify',
  '/not-found',
  '/products',
  '/products/[productId]',
  '/services',
  '/services/[serviceId]',
  '/blogs',
  '/blogs/[id]',
  '/about-us',
  '/contact-us'
]

export const authRoutes: string[] = [
  '/login',
  '/register',
  '/error',
  '/resend',
  '/reset',
  '/new-password',
  '/two-factor'
]

export const apiAuthPrefix: string = '/api/auth'

export const DEFAULT_LOGIN_REDIRECT: string = '/dashboard/newsfeed'
