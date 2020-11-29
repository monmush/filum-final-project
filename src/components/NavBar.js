import { useEffect, useState } from 'react'
import { Row, Col, Space, Button, Typography } from 'antd'
import { useHistory, Link } from 'react-router-dom'
import request, { getToken } from '../libs/request'

const { Text } = Typography

const NavBar = () => {
  const history = useHistory()
  const [userInfo, setUserInfo] = useState()

  const logout = () => {
    localStorage.removeItem('access_token')
    history.push('/login')
  }

  // API call - Get user information
  useEffect(() => {
    async function fetchUserInfo() {
      const res = await request({
        url: `${process.env.REACT_APP_BASE_URL}me`,
        headers: {
          Authorization: `Bearer ${getToken()}`,
        },
      })
      setUserInfo(res.data)
    }
    if (getToken()) {
      fetchUserInfo()
    }
  }, [])

  return (
    <Row style={{ width: '100%', padding: '1.5rem' }} justify="space-between" align="middle">
      <Link to="/">Home</Link>
      <Col>
        <Space>
          <Text>{!!userInfo ? userInfo.name : null}</Text>
          <Button type="link" onClick={logout}>
            Logout
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default NavBar
