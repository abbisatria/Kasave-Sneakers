import callAPI from './api'

const ROOT_API = process.env.REACT_APP_API_URL

export const setLogin = async (data) => {
  const url = `${ROOT_API}auth/signin`

  return callAPI({
    url,
    method: 'POST',
    data
  })
}

export const setUpdateUser = async (data) => {
  const url = `${ROOT_API}user`

  return callAPI({
    url,
    method: 'PUT',
    data,
    token: true
  })
}
