import AdminLayout from "@/layouts/admin-layout"
import DefaultLayout from "@/layouts/default-layout"
import Admin from "@/pages/admin"
import HomePage from "@/pages/home-page"
import Login from "@/pages/login"

export const ROUTE_PATHS = {
    ROOT: '/',
    LOGIN: '/login',
    ADMIN: '/admin',
}

export const routes = [
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
        path: ROUTE_PATHS.ADMIN,
        name: 'AdminPage',
        component: Admin,
        layout: AdminLayout
    }
]