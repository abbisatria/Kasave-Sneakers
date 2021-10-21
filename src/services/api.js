import axios from 'axios'
import Cookies from 'js-cookie'

const callAPI = async ({ url, method, data, token, serverToken }) => {
  let headers = {}
  if (serverToken) {
    headers = {
      Authorization: `Bearer ${serverToken}`
    }
  } else if (token) {
    const tokenCookies = Cookies.get('token')
    if (tokenCookies) {
      const jwtToken = atob(tokenCookies)
      headers = {
        Authorization: `Bearer ${jwtToken}`
      }
    }
  }
  const response = await axios({
    url,
    method,
    data,
    headers
  }).catch((err) => err.response)
  if (response.status > 300) {
    const res = {
      error: true,
      message: response.data.message
    }
    return res
  }
  return response.data
}

export default callAPI
