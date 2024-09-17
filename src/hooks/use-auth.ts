
import { Authcontext } from "@/context/auth-provider"
import { useContext } from "react"

export function useAuth() {
    const context = useContext(Authcontext)
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider')
    }
    return context
}