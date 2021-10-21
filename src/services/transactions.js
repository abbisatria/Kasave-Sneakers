import callAPI from './api'

const ROOT_API = process.env.REACT_APP_API_URL

export const getHistoryTransaction = async (page = 1) => {
  const url = `${ROOT_API}transaction?page=${page}`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}
