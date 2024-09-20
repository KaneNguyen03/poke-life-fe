import AdminLayout from "@/layouts/admin-layout"
import DefaultLayout from "@/layouts/default-layout"
import Admin from "@/pages/admin"
import Checkout from "@/pages/check-out"
import HomePage from "@/pages/home-page"
import Login from "@/pages/login"
import { ComponentType, ReactNode } from "react"

export const ROUTE_PATHS = {
    ROOT: '/',
    LOGIN: '/login',
    ADMIN: '/admin',
    CHECKOUT: '/check-out'
}

interface RouteType {
    path: string
    name: string
    component: ComponentType
    layout: ComponentType<{ children: ReactNode }>
    protected?: boolean
    allowedRoles?: string[]
}

export const routes: RouteType[] = [
    {
        path: ROUTE_PATHS.LOGIN,
        name: 'Login',
        component: Login,
        layout: DefaultLayout
    },
    {
        path: ROUTE_PATHS.ROOT,
        name: 'HomePage',
        component: HomePage,
        layout: DefaultLayout
    },
    {
        path: ROUTE_PATHS.CHECKOUT,
        name: 'Checkout',
        component: Checkout,
        layout: DefaultLayout
    },
    {
        path: ROUTE_PATHS.ADMIN,
        name: 'AdminPage',
        component: Admin,
        layout: AdminLayout,
        protected: true,
        allowedRoles: ['admin'],
    }
]