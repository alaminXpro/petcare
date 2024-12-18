import type { NextAuthConfig } from 'next-auth'

import { CredentialsProvider, GithubProvider, GoogleProvider } from '@/auth/providers'

export const authConfig = {
  providers: [CredentialsProvider, GithubProvider, GoogleProvider]
} satisfies NextAuthConfig
