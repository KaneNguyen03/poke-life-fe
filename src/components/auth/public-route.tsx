import { useAuth } from '@/hooks/use-auth'
import { PropsWithChildren, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

export type User = {
    id: number
    email: string
    role: string
}

type ProtectedRouteProps = PropsWithChildren & {
    allowedRoles?: User['role'][]
}

export default function PublicRoute({
    children,
}: ProtectedRouteProps) {
    const { user } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        if (user?.Role === 'Admin') {
            navigate('/admin', { replace: true })
        }
    }, [user, navigate])

    return <>{children}</>
}
