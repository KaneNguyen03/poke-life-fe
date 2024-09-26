import { useAuth } from '@/hooks/use-auth'
import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import Unauthorized from '../ui/unauthorized'
import Loading from '../ui/loading'

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
  const navigate = useNavigate()

  useEffect(() => {
    if (user?.Role === 'Admin') {
      navigate('/admin', { replace: true })
    }
  }, [user, navigate])

  if (user === null) {
    return <Loading />
  }

  if (allowedRoles && !allowedRoles.includes(user.Role)) {
    return <Unauthorized />
  }

  return <>{children}</>
}
