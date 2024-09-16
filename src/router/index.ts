import DefaultLayout from "@/layouts/default-layout"
import HomePage from "@/pages/home-page"
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
    },
    {
        path: ROUTE_PATHS.ROOT,
        name: 'HomePage',
        component: HomePage,
        layout: DefaultLayout
    },
]