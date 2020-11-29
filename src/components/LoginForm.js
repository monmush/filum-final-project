import { Form, Typography, Input, Button, Space } from 'antd'
import { Link } from 'react-router-dom'
import { REQUEST_STATUS } from '../libs/request'
import { LAYOUT } from '../libs/form'

const { Title } = Typography

const LoginForm = ({ onLogin, status }) => {
  return (
    <>
      <Title level={3}>Login</Title>
      <Form {...LAYOUT} name="basic" layout="vertical" onFinish={onLogin}>
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}>
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}>
          <Input.Password />
        </Form.Item>

        <Form.Item>
          <Space>
            <Button loading={status === REQUEST_STATUS.LOADING} type="primary" htmlType="submit">
              Login
            </Button>
            <Link to="/register">Register a new account?</Link>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default LoginForm
