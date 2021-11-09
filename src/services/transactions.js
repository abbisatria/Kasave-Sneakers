import callAPI from './api'

const ROOT_API = process.env.REACT_APP_API_URL

export const getDashboard = async () => {
  const url = `${ROOT_API}transaction/dashboard`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}

export const getHistoryTransaction = async (page, keyword) => {
  const url = `${ROOT_API}transaction?page=${page || '1'}&keyword=${keyword || ''}`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}

export const getListCategory = async () => {
  const url = `${ROOT_API}category/listCategory`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}

export const getListTreatment = async () => {
  const url = `${ROOT_API}treatment/listTreatment`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}

export const setCheckout = async (data) => {
  const url = `${ROOT_API}transaction/checkout`

  return callAPI({
    url,
    method: 'POST',
    data,
    token: true
  })
}

export const getDetailTransaction = async (id) => {
  const url = `${ROOT_API}transaction/detailTransaction/${id}`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}

export const getListExpense = async (page, keyword) => {
  const url = `${ROOT_API}expense/listExpense?page=${page}&keyword=${keyword || ''}`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}

export const setExpense = async (data) => {
  const url = `${ROOT_API}expense`

  return callAPI({
    url,
    data,
    method: 'POST',
    token: true
  })
}

export const editExpense = async (data, id) => {
  const url = `${ROOT_API}expense/${id}`

  return callAPI({
    url,
    data,
    method: 'PUT',
    token: true
  })
}

export const getDetailExpense = async (id) => {
  const url = `${ROOT_API}expense/detail/${id}`

  return callAPI({
    url,
    method: 'GET',
    token: true
  })
}

export const deleteExpense = async (id) => {
  const url = `${ROOT_API}expense/${id}`

  return callAPI({
    url,
    method: 'DELETE',
    token: true
  })
}
