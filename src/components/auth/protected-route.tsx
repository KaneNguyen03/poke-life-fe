import { useAuth } from '@/hooks/use-auth'
import { PropsWithChildren } from 'react'

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

  if (user === undefined) {
    return <div>Loading...</div>
  }

  if (
    user === null ||
    (allowedRoles && !allowedRoles.includes(user.role))
  ) {
    return <div>Permission denied</div>
  }

  return children
}