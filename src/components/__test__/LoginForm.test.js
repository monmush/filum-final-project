import React from 'react'
import { render, cleanup, fireEvent, act, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import LoginForm from '../LoginForm'
import faker from 'faker'

// Clean up the test after run
afterEach(() => cleanup())

test('call onLogin with username and password', async () => {
  const onLogin = jest.fn()
  const { getByLabelText, getByTestId } = render(
    <Router>
      <LoginForm status="idle" onLogin={onLogin} />
    </Router>,
  )
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')
  const fakeUsername = faker.internet.userName()
  const fakePassword = faker.internet.password()

  expect(usernameInput.value).toBe('')
  expect(passwordInput.value).toBe('')

  act(() => {
    fireEvent.input(usernameInput, {
      target: { value: fakeUsername },
    })
    fireEvent.input(passwordInput, {
      target: { value: fakePassword },
    })
  })

  fireEvent.submit(getByTestId('login-form'))

  // Since Ant Design used the promise to handle the form submit,
  // we have to wait for it and then do the assertion
  await waitFor(() => {
    expect(onLogin).toBeCalledTimes(1)
    expect(onLogin).toBeCalledWith({
      username: fakeUsername,
      password: fakePassword,
    })
  })
})
