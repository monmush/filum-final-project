import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { Row, Col, Space, Button, Table, Modal, Typography, message, Form } from 'antd'
import request from '../libs/request'
import NavBar from '../components/NavBar'
import ItemForm from '../components/ItemForm'
import EditableCell from '../components/EditableCell'
import ItemsTableColumns from '../components/ItemsTableColumns'

const { Title } = Typography

const Items = () => {
  const { category_id } = useParams()
  const [form] = Form.useForm()
  const [status, setStatus] = useState('loading')
  const [items, setItems] = useState({})
  const [showModal, setShowModal] = useState(false)
  const [isItemUpdate, setIsItemUpdate] = useState(false)
  const [editingId, setEditingId] = useState('')
  const isEditing = record => record.id === editingId
  const [offset, setOffset] = useState(0)
  const [limit, setLimit] = useState(10)

  // API call - Fetch all the items in a category
  useEffect(() => {
    async function fetchItemsInCategory() {
      try {
        const res = await request({
          url: `${process.env.REACT_APP_BASE_URL}categories/${category_id}/items?offset=${offset}&limit=${limit}`,
        })
        setItems(res.data)
        setStatus('done')
      } catch (err) {
        setStatus('done')
      }
    }
    fetchItemsInCategory()
  }, [category_id, isItemUpdate, offset, limit])

  const deleteItem = async item_id => {
    await request({
      url: `${process.env.REACT_APP_BASE_URL}categories/${category_id}/items/${item_id}`,
      method: 'delete',
    })
    setItems(prev => ({ ...prev, items: prev.items.filter(item => item.id !== item_id) }))
    message.success('Item was deleted!')
  }

  const createItem = () => {
    setIsItemUpdate(prev => !prev)
  }

  const edit = ({ name, price, description, id }) => {
    form.setFieldsValue({ name, price, description })
    setEditingId(id)
  }

  const cancel = () => {
    setEditingId('')
  }

  const save = async id => {
    try {
      const row = await form.validateFields()
      const newData = [...items.items]
      const index = newData.findIndex(item => id === item.id)

      await request({
        url: `${process.env.REACT_APP_BASE_URL}categories/${category_id}/items/${editingId}`,
        method: 'put',
        data: row,
      })

      if (index > -1) {
        const item = newData[index]
        newData.splice(index, 1, { ...item, ...row })
        setItems(prev => ({ ...prev, items: newData }))
        setEditingId('')
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const onShowSizeChange = (_, pageSize) => {
    setLimit(pageSize)
  }

  const onPageChange = pageNumber => {
    setOffset((pageNumber - 1) * limit)
  }

  const title = `Items (${items.total_items ? items.total_items : 0})`
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
            <Form form={form} component={false}>
              <Table
                bordered
                components={{
                  body: {
                    cell: EditableCell,
                  },
                }}
                loading={status === 'loading'}
                dataSource={items.items}
                columns={ItemsTableColumns(isEditing, save, cancel, edit, deleteItem)}
                rowClassName="editable-row"
                pagination={{
                  showSizeChanger: true,
                  onShowSizeChange: onShowSizeChange,
                  defaultCurrent: 1,
                  total: items.total_categories,
                  onChange: onPageChange,
                }}
              />
            </Form>
          </Space>
        </Col>
      </Row>
      <Modal
        title="Create a new item"
        visible={showModal}
        footer={false}
        onCancel={() => setShowModal(false)}>
        <ItemForm
          createItem={createItem}
          category_id={category_id}
          closeModal={() => setShowModal(false)}
        />
      </Modal>
    </>
  )
}

export default Items
