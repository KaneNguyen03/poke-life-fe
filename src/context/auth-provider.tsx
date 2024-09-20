import { REFRESH_TOKEN_KEY, TOKEN_KEY } from "@/libs/axios"
import authApi from "@/services/auth"
import { AuthContextType, AuthUser, Token } from "@/types"
import { PropsWithChildren, createContext, useEffect, useMemo, useState } from "react"
import { useLocation } from "react-router-dom"
import { toast } from 'react-toastify'

export const Authcontext = createContext<AuthContextType | undefined>(undefined)

type AuthProviderProps = PropsWithChildren

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setCurrentUser] = useState<AuthUser | null>()
  const [submitting, setSubmitting] = useState(false)
  const [signInSuccess, setSignInSuccess] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)
  const [error, setError] = useState<Error | undefined>(undefined)
  const location = useLocation()

  useEffect(() => {
    if (error) setError(undefined)
  }, [location.pathname])

  const getUser = async () => {
    const data = await authApi.getCurrentUser()
    setCurrentUser(data as AuthUser | null | undefined)
    setSubmitting(false)
    setLoadingInitial(false)
  }

  async function signIn({ email, password }: { email: string, password: string }): Promise<Token | undefined> {
    try {
      setSubmitting(true)
      const response = await authApi.signIn(email, password)
      localStorage.setItem(TOKEN_KEY, response.access_token)
      localStorage.setItem(REFRESH_TOKEN_KEY, response.refresh_token)
      setSignInSuccess(true)
      return response
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      setError(error)
      setSubmitting(false)
      toast.error(error.message, {
        theme: 'dark'
      })
    }
  }

  const logout = async () => {
    const resp = await authApi.logOut()
    if (resp.msg === 'logout') {
      localStorage.clear()
      window.location.reload()
    } else {
      setSubmitting(false)
    }
  }

  useEffect(() => {
    const token_key = localStorage.getItem(TOKEN_KEY)
    const refresh_token = localStorage.getItem(REFRESH_TOKEN_KEY)

    if (!refresh_token || !token_key) {
      localStorage.clear()
      setLoadingInitial(false)
    } else {
      setSignInSuccess(true)
    }
  }, [])
  useEffect(() => {
    if (signInSuccess) {
      getUser()
    }
  }, [signInSuccess])

  const memoedValue = useMemo(
    () => {
      return {
        user: user || null,
        submitting,
        loadingInitial,
        error,
        login: ({ email, password }: { email: string, password: string }): Promise<Token> => {
          return signIn({ email, password }) as Promise<Token>
        },
        logout
      }
    },
    [user, submitting, error]
  )
  return <Authcontext.Provider value={memoedValue}>{children}</Authcontext.Provider>
}

