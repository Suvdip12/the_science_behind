'use server'

import { Argon2id } from 'oslo/password'
import { generateIdFromEntropySize } from 'lucia'
import prisma from '@/lib/prisma'
import { lucia, validateRequest } from '@/auth'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { isRedirectError } from 'next/dist/client/components/redirect'
import { signInSchema } from '@/validation/login.schema'
import { signUpSchema, SignUpValues } from '@/validation/signup.schema'

export async function signUp(
  credentials: SignUpValues
): Promise<{ error: string }> {
  try {
    const { name, email, password } = signUpSchema.parse(credentials)
    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    })
    if (existingUser) return { error: 'Email already taken please signin.' }
    const passwordHash = await new Argon2id().hash(password)
    const userId = generateIdFromEntropySize(10)
    const newUser = await prisma.user.create({
      data: {
        id: userId,
        name,
        email,
        passwordHash
      }
    })
    console.log(newUser)
    const session = await lucia.createSession(userId, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return redirect('/')
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.log('error on signup!', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function signIn(
  credentials: SignInValues
): Promise<{ error: string }> {
  try {
    const { email, password } = signInSchema.parse(credentials)
    const existingUser = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: 'insensitive'
        }
      }
    })
    if (!existingUser || !existingUser.passwordHash) {
      return { error: 'Incorrect credentials.' }
    }
    const validPassword = await new Argon2id().verify(
      existingUser.passwordHash,
      password
    )
    if (!validPassword) {
      return { error: 'Incorrect password.' }
    }
    const session = await lucia.createSession(existingUser.id, {})
    const sessionCookie = await lucia.createSessionCookie(session.id)
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes
    )
    return redirect('/')
  } catch (error) {
    if (isRedirectError(error)) throw error
    console.log('error on signup!', error)
    return { error: 'Something went wrong. Please try again.' }
  }
}

export async function logOut() {
  const { session } = await validateRequest()
  if (!session) {
    throw new Error('Inauthorized')
  }
  await lucia.invalidateSession(session.id)
  const sessionCookie = lucia.createBlankSessionCookie()
  cookies().set(
    sessionCookie.name,
    sessionCookie.value,
    sessionCookie.attributes
  )
  return redirect('/signin')
}
