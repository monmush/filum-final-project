import { useState } from 'react'
import { Row, Col, Form, Typography, Input, Button, Space } from 'antd'
import { Link, useHistory } from 'react-router-dom'
import request from '../libs/request'
import { LAYOUT } from '../libs/form'

const Login = () => {
  const { Title } = Typography
  const history = useHistory()
  const [status, setStatus] = useState('idle')

  // API call - Login
  const onFinish = async values => {
    setStatus('loading')
    try {
      const res = await request({
        url: `${process.env.REACT_APP_BASE_URL}login`,
        method: 'post',
        data: values,
      })
      setStatus('done')
      localStorage.setItem('access_token', res.data.access_token)
      history.push('/')
    } catch (err) {
      setStatus('done')
    }
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={3}>Login</Title>
        <Form {...LAYOUT} name="basic" layout="vertical" onFinish={onFinish}>
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
              <Button loading={status === 'loading'} type="primary" htmlType="submit">
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
