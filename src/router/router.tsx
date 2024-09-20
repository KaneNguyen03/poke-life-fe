import { Route, Routes } from "react-router-dom"
import { routes } from "."
import ProtectedRoute from "@/components/auth/protected-route"

export default function Router() {
    return (
        <Routes>
            {routes.map((route) => {
                const Page = route.component
                const Layout = route.layout

                const element = route.protected ? (
                    <ProtectedRoute allowedRoles={route.allowedRoles}>
                        <Page />
                    </ProtectedRoute>
                ) : (
                    <Page />
                )

                return (
                    <Route
                        key={route.path}
                        path={route.path}
                        element={<Layout>{element}</Layout>}
                    />
                )
            })}
        </Routes>
    )
}