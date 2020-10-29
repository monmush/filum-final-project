import { Form, Button, Input, message } from 'antd'
import request from '../libs/request'
import { layout } from '../libs/form'

const { TextArea } = Input

const CategoryForm = ({ createCategory, closeModal }) => {
  const onFinish = async values => {
    await request({
      url: `${process.env.REACT_APP_BASE_URL}categories`,
      method: 'post',
      data: values,
    })
    message.success('New category was successfully created!')
    createCategory()
    closeModal()
  }

  return (
    <Form {...layout} name="Category" layout="vertical" onFinish={onFinish}>
      <Form.Item
        label="Category name"
        name="name"
        rules={[{ required: true, message: 'Please input the category name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the category description!' }]}>
        <TextArea maxLength="200" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create category
        </Button>
      </Form.Item>
    </Form>
  )
}

export default CategoryForm
