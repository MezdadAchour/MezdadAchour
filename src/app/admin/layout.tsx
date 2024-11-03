import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth/next'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession()

  if (!session) {
    redirect('/login')
  }

  return <>{children}</>
}
