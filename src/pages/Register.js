import { useState } from 'react'
import { Link, useHistory } from 'react-router-dom'
import { Row, Col, Form, Typography, message, Input, Button, Space } from 'antd'
import request from '../libs/request'
import { LAYOUT } from '../libs/form'

const Register = () => {
  const history = useHistory()
  const { Title } = Typography
  const [status, setStatus] = useState('idle')

  // API call - Register a new user
  const onFinish = async values => {
    setStatus('loading')
    try {
      await request({
        url: `${process.env.REACT_APP_BASE_URL}registrations`,
        method: 'post',
        data: values,
      })
      setStatus('done')
      message.success('Your account was created!')
      history.push('/login')
    } catch (err) {
      setStatus('done')
    }
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <Title level={3}>Register</Title>
        <Form {...LAYOUT} name="basic" layout="vertical" onFinish={onFinish}>
          <>
            <Form.Item
              label="Name"
              name="name"
              rules={[
                {
                  required: true,
                  message: 'Please input your name!',
                },
              ]}>
              <Input />
            </Form.Item>
            <Form.Item
              label="Email"
              name="email"
              rules={[
                {
                  required: true,
                  message: 'Please input your email!',
                },
              ]}>
              <Input type="email" />
            </Form.Item>
          </>

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
                Register
              </Button>
              <Link to="/login">Already has an account?</Link>
            </Space>
          </Form.Item>
        </Form>
      </Col>
    </Row>
  )
}

export default Register
