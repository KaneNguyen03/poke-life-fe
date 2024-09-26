import { useAuth } from '@/hooks/use-auth'
import { PropsWithChildren } from 'react'
import Loading from '../ui/loading'
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

  if (user === null) {
    return <Loading />
  }

  if (allowedRoles && !allowedRoles.includes(user.Role)) {
    return <Unauthorized />
  }

  return <>{children}</>
}
