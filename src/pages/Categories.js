import { useState, useEffect } from 'react'
import { Row, Col, Typography, Table, Button, Space, Modal } from 'antd'
import { Link } from 'react-router-dom'
import NavBar from '../components/NavBar'
import request, { REQUEST_STATUS } from '../libs/request'
import CategoryForm from '../components/CategoryForm'

const { Title } = Typography

const Categories = () => {
  const [categories, setCategories] = useState({})
  const [status, setStatus] = useState(REQUEST_STATUS.IDLE)
  const [showModal, setShowModal] = useState(false)
  const [isCatUpdate, setIsCatUpdate] = useState(false)
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  // API call - Fetch all the categories
  useEffect(() => {
    async function fetchAllCategory() {
      try {
        setStatus(REQUEST_STATUS.LOADING)
        const res = await request({
          url: `${process.env.REACT_APP_BASE_URL}categories?offset=${offset}&limit=${limit}`,
        })
        setCategories(res.data)
        setStatus(REQUEST_STATUS.DONE)
      } catch (err) {
        setStatus(REQUEST_STATUS.DONE)
      }
    }
    fetchAllCategory()
  }, [offset, limit, isCatUpdate])

  const updateCategory = () => {
    setIsCatUpdate(prev => !prev)
  }

  const changeShowSize = (_, pageSize) => {
    setLimit(pageSize)
  }

  const changePage = pageNumber => {
    setOffset((pageNumber - 1) * limit)
  }

  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'age',
    },
    {
      title: 'Created',
      dataIndex: 'created',
      key: 'created',
      render: text => text.slice(0, 10),
    },
    {
      title: 'Updated',
      dataIndex: 'updated',
      key: 'updated',
      render: text => text.slice(0, 10),
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_, record) => <Link to={`/categories/${record.id}`}>Show</Link>,
    },
  ]

  const title = `Categories (${categories.total_categories ? categories.total_categories : 0})`

  return (
    <>
      <NavBar />
      <Row style={{ margin: '1.5rem' }}>
        <Col span={18}>
          <Title level={3}>{title}</Title>
          <Space direction="vertical" size="middle">
            <Button type="primary" onClick={() => setShowModal(true)}>
              Create
            </Button>
            <Table
              bordered
              loading={status === REQUEST_STATUS.LOADING}
              dataSource={categories.categories}
              columns={columns}
              pagination={{
                showSizeChanger: true,
                onShowSizeChange: changeShowSize,
                defaultCurrent: 1,
                total: categories.total_categories,
                onChange: changePage,
              }}
            />
          </Space>
        </Col>
      </Row>
      <Modal
        title="Create a new category"
        visible={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}>
        <CategoryForm updateCategory={updateCategory} closeModal={() => setShowModal(false)} />
      </Modal>
    </>
  )
}

export default Categories
