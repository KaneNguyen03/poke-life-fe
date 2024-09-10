import DefaultLayout from "@/layouts/default-layout"
import Login from "@/pages/login"

export const ROUTE_PATHS = {
    ROOT: '/',
    LOGIN: '/login',
    CLASS: '/class',
}

export const routes = [
    {
        path: ROUTE_PATHS.LOGIN,
        name: 'Login',
        component: Login,
        layout: DefaultLayout
    }
]