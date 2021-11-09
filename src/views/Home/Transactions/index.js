import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Input, InputGroup, Row, Spinner, Table } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getHistoryTransaction } from '../../../services/transactions'
import NumberFormat from 'react-number-format'
import Pagination from 'react-js-pagination'

const Transctions = () => {
  const [data, setData] = useState([])
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(1)
  const [keyword, setKeyword] = useState('')
  const [pageInfo, setPageInfo] = useState({
    totalData: 0,
    currentPage: 0,
    totalPage: 0
  })

  const { push } = useHistory()

  const getTransactionAPI = useCallback(async () => {
    setLoading(true)
    const response = await getHistoryTransaction(page, keyword)
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

  const getTransactionSubmit = async () => {
    setLoading(true)
    const response = await getHistoryTransaction(page, keyword)
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
    getTransactionAPI()
  }, [page])

  const handleChangePage = (page) => {
    setPage(page)
  }

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">My Transactions</h2>
      <div>
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
              <Input type="text" placeholder="Search by order id..." value={keyword} onChange={(e) => setKeyword(e.target.value)} />
              <Button color="primary" type="button" onClick={() => getTransactionSubmit()}>
                <i className="fa fa-search" />
              </Button>
            </InputGroup>
          </Col>
          <Col md={8} className="d-flex justify-content-end mb-3">
            <Button
              color="primary"
              type="button"
              className="rounded-pill"
              onClick={() => push('/transactions/add')}
            >
              Add Transaction
            </Button>
          </Col>
        </Row>
      </div>
      <Row>
        <Col>
          {loading
            ? (
              <div className="d-flex justify-content-center">
                <Spinner size="lg" color="dark" />
              </div>
              )
            : (data.length > 0
                ? (
                <>
                  <div className="table-responsive">
                    <Table borderless>
                      <colgroup>
                        <col style={{ width: 130, minWidth: 130 }} />
                        <col style={{ width: 130, minWidth: 130 }} />
                        <col style={{ width: 130, minWidth: 130 }} />
                        <col style={{ width: 130, minWidth: 130 }} />
                        <col style={{ width: 130, minWidth: 130 }} />
                      </colgroup>
                      <thead>
                        <tr>
                          <th>Order ID</th>
                          <th>Item</th>
                          <th>Price</th>
                          <th>Status</th>
                          <th>Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map(val => {
                          return (
                            <tr key={String(val._id)}>
                              <th scope="row">{val.orderId}</th>
                              <td>{`${val.historyItem.length} item`}</td>
                              <td>
                                <NumberFormat
                                  value={val.total}
                                  prefix="Rp. "
                                  displayType="text"
                                  thousandSeparator="."
                                  decimalSeparator=","
                                />
                              </td>
                              <td>
                                <span className="float-start icon-status success" />
                                {val.status}
                              </td>
                              <td>
                                <Button className="btn-status rounded-pill" color="secondary" type="button" onClick={() => push({ pathname: `/transactions/detail/${val._id}` })} >Details</Button>
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
                <h6>No Transactions</h6>
                  ))}
        </Col>
      </Row>
    </div>
  )
}

export default Transctions
