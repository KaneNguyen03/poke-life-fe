import { Layout } from "antd"
import { Content } from "antd/es/layout/layout"

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout className="min-h-screen">
            <Layout>
                <Content className="flex flex-col">{children}</Content>
            </Layout>
        </Layout>
    )
}