import React from 'react'
import { render, cleanup, fireEvent, act, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import CategoryForm from '../CategoryForm'
import faker from 'faker'

// Clean up the test after run
afterEach(() => cleanup())

test('call onLogin with username and password', async () => {
  const createCategory = jest.fn()
  const { getByLabelText, getByText } = render(
    <Router>
      <CategoryForm createCategory={createCategory} />
    </Router>,
  )

  const categoryInput = getByLabelText('Category name')
  const descriptionInput = getByLabelText('Description')
  const fakeCategory = faker.commerce.product()
  const fakeDescription = faker.commerce.productDescription()

  expect(categoryInput.value).toBe('')
  expect(descriptionInput.value).toBe('')

  act(() => {
    fireEvent.input(categoryInput, {
      target: { value: fakeCategory },
    })
    fireEvent.input(descriptionInput, {
      target: { value: fakeDescription },
    })
  })

  fireEvent.click(getByText(/create category/i))

  // Since Ant Design used the promise to handle the form submit,
  // we have to wait for it and then do the assertion
  await waitFor(() => {
    expect(createCategory).toBeCalledTimes(1)
    expect(createCategory).toBeCalledWith({
      name: fakeCategory,
      description: fakeDescription,
    })
  })
})
