import { Input, Form, InputNumber } from 'antd'

const { TextArea } = Input

// Used to generate an editable cell inside the <td>
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  // Map the correct Input component with the provided
  // inputType props: 'number', 'text', 'textarea'
  const renderInput = inputType => {
    const inputTypeMap = {
      number: (
        <InputNumber
          defaultValue={0}
          min={0}
          formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
          parser={value => value.replace(/\$\s?|(,*)/g, '')}
        />
      ),
      text: <Input />,
      textarea: <TextArea maxLength={200} />,
    }
    return inputTypeMap[inputType]
  }

  const rules = [
    {
      required: true,
      message: `Please Input ${title}!`,
    },
  ]

  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item name={dataIndex} rules={rules}>
          {renderInput(inputType)}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  )
}

export default EditableCell
