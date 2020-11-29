import React from 'react'
import { render, cleanup, fireEvent, waitFor } from '@testing-library/react'
import { BrowserRouter as Router } from 'react-router-dom'
import RegisterForm from '../RegisterForm'
import faker from 'faker'

// Clean up the test after run
afterEach(() => cleanup())

test('call onRegister with name, email, username, password', async () => {
  const onRegister = jest.fn()

  const { getByLabelText, getByTestId } = render(
    <Router>
      <RegisterForm status="idle" onRegister={onRegister} />
    </Router>,
  )

  const nameInput = getByLabelText('Name')
  const emailInput = getByLabelText('Email')
  const usernameInput = getByLabelText('Username')
  const passwordInput = getByLabelText('Password')

  const fakeName = faker.name.findName()
  const fakeEmail = faker.internet.email()
  const fakeUsername = faker.internet.userName()
  const fakePassword = faker.internet.password()

  fireEvent.input(nameInput, {
    target: { value: fakeName },
  })
  fireEvent.input(emailInput, {
    target: { value: fakeEmail },
  })
  fireEvent.input(usernameInput, {
    target: { value: fakeUsername },
  })
  fireEvent.input(passwordInput, {
    target: { value: fakePassword },
  })

  fireEvent.submit(getByTestId('register-form'))

  // Since Ant Design used the promise to handle the form submit,
  // we have to wait for it and then do the assertion
  await waitFor(() => {
    expect(onRegister).toBeCalledTimes(1)
    expect(onRegister).toBeCalledWith({
      name: fakeName,
      email: fakeEmail,
      username: fakeUsername,
      password: fakePassword,
    })
  })
})
