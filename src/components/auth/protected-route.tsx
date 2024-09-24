import { useAuth } from '@/hooks/use-auth'
import { PropsWithChildren } from 'react'
import Unauthorized from '../ui/unauthorized'

export type User = {
  id: number
  email: string
  role: string
}

type ProtectedRouteProps = PropsWithChildren & {
  allowedRoles?: User['role'][]
}

export default function ProtectedRoute({
  allowedRoles,
  children,
}: ProtectedRouteProps) {
  const { user } = useAuth()
  console.log("🚀 Kha ne ~ user:", user)

  if (user === undefined) {
    return <div>Loading...</div>
  }

  if (
    user === null ||
    (allowedRoles && !allowedRoles.includes(user.Role))
  ) {
    return <Unauthorized />
  }

  return children
}