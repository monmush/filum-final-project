import { Form, Button, Input } from 'antd'
import { LAYOUT } from '../libs/form'

const { TextArea } = Input

const CategoryForm = ({ createCategory }) => {
  return (
    <Form {...LAYOUT} name="Category" layout="vertical" onFinish={createCategory}>
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
