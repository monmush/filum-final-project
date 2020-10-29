import { Space, Button, Popconfirm } from 'antd'

// Generate pre-defined table columns structure
// If the row is editable => return col with onCell prop
// If the row is not editable => return col
// Antd table will then render the Form Input base on onCell prop
const ItemsTableColumns = (isEditing, save, cancel, edit, deleteItem) => {
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      editable: true,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'age',
      editable: true,
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: text => `$${text}`,
      editable: true,
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
      dataIndex: 'id',
      render: (_, record) => {
        const editable = isEditing(record)
        return editable ? (
          <Space direction="horizontal" >
            <Button type="link" onClick={() => save(record.id)}>
              Save
            </Button>
            <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
              <Button type="link">Cancel</Button>
            </Popconfirm>
          </Space>
        ) : (
          <Space direction="horizontal" >
            <Button type="link" onClick={() => edit(record)}>
              Edit
            </Button>
            <Button type="link" onClick={() => deleteItem(record.id)}>
              Delete
            </Button>
          </Space>
        )
      },
    },
  ]

  return columns.map(col => {
    if (!col.editable) {
      return col
    }

    const inputType = dataIndex => {
      const inputTypeMap = {
        price: 'number',
        name: 'text',
        description: 'textarea',
      }
      return inputTypeMap[dataIndex]
    }

    return {
      ...col,
      onCell: record => ({
        record,
        inputType: inputType(col.dataIndex),
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    }
  })
}

export default ItemsTableColumns
