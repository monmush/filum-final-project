import { useEffect, useState } from 'react'
import { Row, Col, Space, Button } from 'antd'
import { useHistory, Link } from 'react-router-dom'
import request from '../libs/request'

const NavBar = () => {
  const history = useHistory()
  const [userInfo, setUserInfo] = useState()

  const logoutHandler = () => {
    localStorage.removeItem('access_token')
    history.push('/login')
  }

  // API call - Get user information
  useEffect(() => {
    async function fetchUserInfo() {
      const res = await request({
        url: `${process.env.REACT_APP_BASE_URL}me`,
      })
      setUserInfo(res.data)
    }
    fetchUserInfo()
  }, [])

  return (
    <Row style={{ width: '100%', padding: '1.5rem' }} justify="space-between" align="middle">
      <Link to="/">Home</Link>
      <Col>
        <Space>
          <span>{!!userInfo ? userInfo.name : null}</span>
          <Button type="link" onClick={logoutHandler}>
            Logout
          </Button>
        </Space>
      </Col>
    </Row>
  )
}

export default NavBar
