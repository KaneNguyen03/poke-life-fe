// import { ERROR_MESSAGES } from '@/constants'
// import useAuth from '@/hooks/use-auth'
// import { DefaultButtonStyle } from '@/lib/antd/antd-styles'
// import ConfigAntdTheme from '@/lib/antd/config-theme'
import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { Card, ConfigProvider, Form, Input, Typography } from 'antd'
import Meta from 'antd/es/card/Meta'

export default function Login() {
  // const { signIn } = useAuth()

  // const onSubmitForm = (values: { username: string; password: string }) => {
  //   signIn(values.username, values.password)
  // }
  return (
    <div className="container mx-auto">
      <div className="absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2">
        <ConfigProvider>
          <Card
            bordered={false}
            className=" w-[600px] shadow-[0 1px 2px 0 rgba(0, 0, 0, 0.1), 0 1px 6px -1px rgba(0, 0, 0, 0.07), 0 2px 90px 0 rgba(0, 0, 0, 0.1)] px-8 py-12"
          >
            <Meta className="text-center mb-8 text-md" />
            <Typography.Title className="text-center p-2">FPT Fresh Academy Training Management</Typography.Title>
            <Typography.Paragraph className="text-center">
              If you don’t have the account, please contact{' '}
              <a href="" style={{ textDecoration: 'underline' }}>
                FA.HCM@fsoft.com.vn
              </a>
            </Typography.Paragraph>
            <Form
            // onFinish={(values) => onSubmitForm(values)} className="px-20 py-4"
            >
              <div className="relative my-4 mt-7 mb-7">
                <Form.Item
                  name="username"
                // rules={[
                //   { required: true, message: ERROR_MESSAGES.EM30 },
                //   { min: 6, message: ERROR_MESSAGES.EM31 }
                // ]}
                >
                  <Input size="large" prefix={<UserOutlined />} placeholder="Username" />
                </Form.Item>
              </div>
              <div className="relative my-4 mt-7 mb-7">
                <Form.Item name="password"
                // rules={[{ required: true, message: ERROR_MESSAGES.EM32 }]}
                >
                  <Input.Password size="large" prefix={<LockOutlined />} type="password" placeholder="Password" />
                </Form.Item>
              </div>
              {/* <ConfigAntdTheme theme={DefaultButtonStyle}>
                <Button type="primary" size="large" htmlType="submit" className="w-full ">
                  Sign In
                </Button>
              </ConfigAntdTheme> */}
            </Form>
          </Card>
        </ConfigProvider>
      </div>
    </div>
  )
}
