import { Form, Button, Input, message, InputNumber } from 'antd'
import request from '../libs/request'
import { LAYOUT } from '../libs/form'

const { TextArea } = Input

const ItemForm = ({ createItem, closeModal, category_id }) => {
  const [form] = Form.useForm()

  // API call - Create a new item
  const submitItem = async values => {
    await request({
      url: `${process.env.REACT_APP_BASE_URL}categories/${category_id}/items    `,
      method: 'post',
      data: values,
    })
    message.success('New item was successfully created!')
    createItem()
    form.resetFields()
    closeModal()
  }

  return (
    <Form {...LAYOUT} form={form} name="Item" layout="vertical" onFinish={submitItem}>
      <Form.Item
        label="Item name"
        name="name"
        rules={[{ required: true, message: 'Please input the category name!' }]}>
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ required: true, message: 'Please input the category description!' }]}>
        <TextArea maxLength={200} />
      </Form.Item>

      <Form.Item
        label="Price"
        name="price"
        rules={[{ required: true, message: 'Please input the category description!' }]}>
        <InputNumber
          defaultValue={0}
          min={0}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit">
          Create item
        </Button>
      </Form.Item>
    </Form>
  )
}

export default ItemForm
