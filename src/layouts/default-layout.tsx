import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"
import Navbar from "./layout-ui/navbar"
import Footer from "./layout-ui/footer"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout className="min-h-screen ">
            <Navbar />
            <Layout>
                <Content className="flex flex-col bg-green-50">{children}</Content>
            </Layout>
            <Footer />
        </Layout>
    )
}