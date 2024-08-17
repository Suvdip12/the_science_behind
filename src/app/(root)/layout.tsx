import { validateRequest } from '@/auth'
import { redirect } from 'next/navigation'
import SessionProvider from '@/components/SessionProvider'
import Navbar from '@/components/Navbar'

export default async function Layout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await validateRequest()

  if (!session.user) redirect('/signin')

  return (
    <SessionProvider value={session}>
      <div>{children}</div>
    </SessionProvider>
  )
}
