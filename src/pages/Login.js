import { useState } from 'react'
import { Row, Col } from 'antd'
import { useHistory } from 'react-router-dom'
import LoginForm from '../components/LoginForm'
import request, { REQUEST_STATUS } from '../libs/request'

const Login = () => {
  const history = useHistory()
  const [status, setStatus] = useState(REQUEST_STATUS.IDLE)

  // API call - Login
  const onLogin = async values => {
    try {
      setStatus(REQUEST_STATUS.LOADING)
      const res = await request({
        url: `${process.env.REACT_APP_BASE_URL}login`,
        method: 'post',
        data: values,
      })
      setStatus(REQUEST_STATUS.DONE)
      localStorage.setItem('access_token', res.data.access_token)
      history.push('/')
    } catch (err) {
      setStatus(REQUEST_STATUS.DONE)
    }
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <LoginForm onLogin={onLogin} status={status} />
      </Col>
    </Row>
  )
}

export default Login
