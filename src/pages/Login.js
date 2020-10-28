import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form, Typography, Input, Button, Space } from 'antd'
import request from '../libs/request'

const Login = () => {
  const { Title } = Typography
  const history = useHistory()

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  }

  const onFinish = async values => {
    try {
      const res = await request({
        url: `${process.env.REACT_APP_BASE_URL}login`,
        method: 'post',
        data: values,
      })
      history.push('/')
      localStorage.setItem('access_token', res.data.access_token)
    } catch (err) {}
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={12}>
        <Title level={3}>Login</Title>
        <Form {...layout} name="basic" layout="vertical" onFinish={onFinish}>
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
              <Button type="primary" htmlType="submit">
                Login
              </Button>
              <Link to="/register">Register a new account?</Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Login
