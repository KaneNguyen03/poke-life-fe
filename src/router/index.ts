import OrderHistoryDetail from "@/components/order-history-detail/order-history-detail"
import NotFound from "@/components/ui/not-found"
import AdminLayout from "@/layouts/admin-layout"
import DefaultLayout from "@/layouts/default-layout"
import Admin from "@/pages/admin"
import Checkout from "@/pages/check-out"
import HomePage from "@/pages/home-page"
import Login from "@/pages/login"
import OrderSuccess from "@/pages/order-success"
import { Profile } from "@/pages/profile"
import Register from "@/pages/register"
import { ComponentType, ReactNode } from "react"
import { ROUTE_PATHS } from "@/utils/constants/routes"

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
        path: ROUTE_PATHS.SIGNUP,
        name: 'Signup',
        component: Register,
        layout: DefaultLayout
    },
    {
        path: ROUTE_PATHS.PROFILE,
        name: 'Profile',
        component: Profile,
        layout: DefaultLayout,
        protected: true,
        allowedRoles: ['Customer'],
    },
    {
        path: `${ROUTE_PATHS.ORDER_HISTORY_DETAIL}/:id`,
        name: 'HistoryDetail',
        component: OrderHistoryDetail,
        layout: DefaultLayout,
        protected: true,
        allowedRoles: ['Customer'],
    },
    {
        path: ROUTE_PATHS.ROOT,
        name: 'HomePage',
        component: HomePage,
        layout: DefaultLayout,

    },
    {
        path: ROUTE_PATHS.CHECKOUT,
        name: 'Checkout',
        component: Checkout,
        layout: DefaultLayout
    },
    {
        path: ROUTE_PATHS.ORDER_SUCCESS,
        name: 'order-success',
        component: OrderSuccess,
        layout: DefaultLayout
    },
    {
        path: ROUTE_PATHS.ADMIN,
        name: 'AdminPage',
        component: Admin,
        layout: AdminLayout,
        protected: true,
        allowedRoles: ['Admin'],
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound,
        layout: DefaultLayout // or any layout you prefer
    }
]