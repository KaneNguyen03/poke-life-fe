import { Layout } from "antd"
import { Content, Footer } from "antd/es/layout/layout"
import Navbar from "./layout-ui/navbar"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout className="min-h-screen">
            <Navbar />
            <Layout>
                <Content className="flex flex-col">{children}</Content>
            </Layout>
            <Footer />
        </Layout>
    )
}