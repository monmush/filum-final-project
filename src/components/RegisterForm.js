import React from 'react'
import { Link } from 'react-router-dom'
import { Form, Typography, Input, Button, Space } from 'antd'
import { LAYOUT } from '../libs/form'
import { REQUEST_STATUS } from '../libs/request'

const { Title } = Typography

const RegisterForm = ({ status, onRegister }) => {
  return (
    <>
      <Title level={3}>Register</Title>
      <Form
        {...LAYOUT}
        name="basic"
        layout="vertical"
        onFinish={onRegister}
        data-testid="register-form">
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
            <Button loading={status === REQUEST_STATUS.LOADING} type="primary" htmlType="submit">
              Register
            </Button>
            <Link to="/login">Already has an account?</Link>
          </Space>
        </Form.Item>
      </Form>
    </>
  )
}

export default RegisterForm
