import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import { MainNavbar } from "./common/navbar"
import { Footer } from "./common/footer"
import CartModal from "@/components/card-modal"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout className="min-h-screen">
            <MainNavbar />
            <Layout>
                <Content className="flex flex-col bg-green-50">{children}</Content>
            </Layout>
            <Footer />
            <CartModal />
        </Layout>
    )
}