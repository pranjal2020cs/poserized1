import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

const SESSION_COOKIE_NAME = 'admin-session'
const SESSION_EXPIRY_HOURS = 24

export async function validateAdminCredentials(username: string, password: string): Promise<boolean> {
  const adminUsername = process.env.ADMIN_USERNAME || 'admin'
  const adminPassword = process.env.ADMIN_PASSWORD

  if (!adminPassword) {
    console.error('ADMIN_PASSWORD environment variable is not set')
    return false
  }

  // Simple validation - in production, use bcrypt for password hashing
  const isValidUsername = username === adminUsername
  const isValidPassword = password === adminPassword

  return isValidUsername && isValidPassword
}

export async function createAdminSession(): Promise<string> {
  const sessionToken = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

  const cookieStore = await cookies()
  cookieStore.set(SESSION_COOKIE_NAME, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
    maxAge: SESSION_EXPIRY_HOURS * 60 * 60, // Convert hours to seconds
    path: '/',
  })

  return sessionToken
}

export async function validateAdminSession(): Promise<boolean> {
  const cookieStore = await cookies()
  const sessionToken = cookieStore.get(SESSION_COOKIE_NAME)

  return !!sessionToken && !!sessionToken.value
}

export async function clearAdminSession(): Promise<void> {
  const cookieStore = await cookies()
  cookieStore.delete(SESSION_COOKIE_NAME)
}

export function adminAuthMiddleware(request: NextRequest): NextResponse | null {
  const sessionToken = request.cookies.get(SESSION_COOKIE_NAME)

  if (!sessionToken) {
    return NextResponse.redirect(new URL('/admin/login', request.url))
  }

  return null
}
