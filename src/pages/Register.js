import { useState } from 'react'
import { useHistory } from 'react-router-dom'
import { Row, Col, message } from 'antd'
import request, { REQUEST_STATUS } from '../libs/request'
import RegisterForm from '../components/RegisterForm'

const Register = () => {
  const history = useHistory()
  const [status, setStatus] = useState(REQUEST_STATUS.IDLE)

  // API call - Register a new user
  const onRegister = async values => {
    try {
      setStatus(REQUEST_STATUS.LOADING)
      await request({
        url: `${process.env.REACT_APP_BASE_URL}registrations`,
        method: 'post',
        data: values,
      })
      setStatus(REQUEST_STATUS.DONE)
      message.success('Your account was created!')
      history.push('/login')
    } catch (err) {
      setStatus(REQUEST_STATUS.DONE)
    }
  }

  return (
    <Row justify="center" align="middle" style={{ height: '100vh' }}>
      <Col span={8}>
        <RegisterForm onRegister={onRegister} status={status} />
      </Col>
    </Row>
  )
}

export default Register
