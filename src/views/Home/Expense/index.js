import React, { useCallback, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { Button, Col, Input, InputGroup, Row, Spinner, Table } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { getListExpense } from '../../../services/transactions'
import { toast } from 'react-toastify'
import Pagination from 'react-js-pagination'

const Expense = () => {
  const [data, setData] = useState([])
  const [balance, setBalance] = useState('')
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    currentPage: 0,
    totalPage: 0
  })
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [loading, setLoading] = useState(false)

  const { push } = useHistory()

  const getListExpenseAPI = useCallback(async () => {
    setLoading(true)
    const response = await getListExpense(page, keyword)
    if (response.error) {
      toast.error(response.message)
    } else {
      setData(response.results.data)
      setBalance(response.results.count)
      const pageInfo = {
        totalData: response.pageInfo.totalData,
        currentPage: Number(response.pageInfo.currentPage),
        totalPage: response.pageInfo.totalPage
      }
      setPageInfo(pageInfo)
    }
    setLoading(false)
  }, [page])

  const getListExpenseSubmit = async () => {
    setLoading(true)
    const response = await getListExpense(page, keyword)
    if (response.error) {
      toast.error(response.message)
    } else {
      setData(response.results.data)
      setBalance(response.results.count)
      const pageInfo = {
        totalData: response.pageInfo.totalData,
        currentPage: Number(response.pageInfo.currentPage),
        totalPage: response.pageInfo.totalPage
      }
      setPageInfo(pageInfo)
    }
    setLoading(false)
  }

  useEffect(() => {
    getListExpenseAPI()
  }, [page])

  const handleChangePage = (page) => {
    setPage(page)
  }

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Expense</h2>
      <div className="mb-4">
        <h3 className="fw-medium">
          <NumberFormat
            value={balance}
            prefix="Rp. "
            displayType="text"
            thousandSeparator="."
            decimalSeparator=","
          />
        </h3>
      </div>
      <Row>
        <Col md={4} className="mb-3">
          <InputGroup>
            <Input type="text" placeholder="Search ..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
            <Button color="primary" type="button" onClick={() => getListExpenseSubmit()}>
              <i className="fa fa-search" />
            </Button>
          </InputGroup>
        </Col>
        <Col md={8} className="d-flex justify-content-end mb-3">
          <Button
            color="primary"
            type="button"
            className="rounded-pill"
            onClick={() => push('expense/add')}
          >
            Add Expense
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {loading
            ? (
              <div className="d-flex justify-content-center">
                <Spinner size="lg" color="dark" />
              </div>
              )
            : (
                data.length > 0
                  ? (
                  <>
                    <div className="table-responsive">
                      <Table borderless>
                        <colgroup>
                          <col style={{ width: 45, minWidth: 45 }} />
                          <col style={{ width: 400, minWidth: 400 }} />
                          <col style={{ width: 130, minWidth: 130 }} />
                          <col style={{ width: 180, minWidth: 180 }} />
                        </colgroup>
                        <thead>
                          <tr>
                            <th>No</th>
                            <th>Item</th>
                            <th>Price</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.map((val, index) => {
                            return (
                              <tr key={val._id}>
                                <th scope="row">{(Number(page) * 5) - (5 - (index + 1))}</th>
                                <td>{val.item}</td>
                                <td>
                                  <NumberFormat
                                    value={val.price}
                                    prefix="Rp. "
                                    displayType="text"
                                    thousandSeparator="."
                                    decimalSeparator=","
                                  />
                                </td>
                                <td>
                                  <Button color="primary" type="button" onClick={() => push('/expense/view', { id: val._id })}>
                                    <i className="fa fa-eye" />
                                  </Button>
                                  <Button className="mx-2" color="primary" type="button" onClick={() => push('/expense/edit', { id: val._id })}>
                                    <i className="fa fa-edit" />
                                  </Button>
                                  <Button color="danger" type="button" onClick={null}>
                                    <i className="fa fa-trash" />
                                  </Button>
                                </td>
                              </tr>
                            )
                          })}
                        </tbody>
                      </Table>
                    </div>
                    {pageInfo.totalData > 0 && (
                      <div className="d-flex justify-content-end mt-4">
                        <Pagination
                          activePage={page}
                          itemsCountPerPage={5}
                          totalItemsCount={pageInfo.totalData}
                          pageRangeDisplayed={3}
                          onChange={handleChangePage.bind(this)}
                          itemClass="page-item"
                          linkClass="page-link"
                        />
                      </div>
                    )}
                  </>
                    )
                  : (
                  <h6>No Expense</h6>
                    )
              )}
        </Col>
      </Row>
    </div>
  )
}

export default Expense
