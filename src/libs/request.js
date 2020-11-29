import axios from 'axios'
import { message } from 'antd'

// Access to localStorage can be disabled in browser configuration
// In that case, we need a try catch to handle the event
const getToken = () => {
  try {
    return localStorage.getItem('access_token')
  } catch (err) {}
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${getToken()}`,
}

const client = axios.create({ headers })

const request = options => {
  const onSuccess = res => res
  const onError = err => {
    if (err.response && err.response.data) {
      if (typeof err.response.data.message === 'object') {
        const errMsg = err.response.data.message
        for (const [, value] of Object.entries(errMsg)) {
          message.error(value)
        }
      } else {
        message.error(err.response.data.message)
      }
    } else {
      message.error('Something went wrong')
    }
    throw err
  }

  return client(options).then(onSuccess).catch(onError)
}

export const REQUEST_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  DONE: 'done',
}
export { getToken }
export default request
