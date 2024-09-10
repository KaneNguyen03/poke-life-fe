import { Layout } from "antd"
import { Content, Footer, Header } from "antd/es/layout/layout"

export default function DefaultLayout({ children }: { children: React.ReactNode }) {
    return (
        <Layout className="min-h-screen">
            <Header />
            <Layout>
                {/* <div className="bg-foreground">
              <Navigator />
            </div> */}
                <Content className="flex flex-col">{children}</Content>
            </Layout>
            <Footer />
        </Layout>
    )
}