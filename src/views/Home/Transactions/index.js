import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, Row, Spinner, Table } from 'reactstrap'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getHistoryTransaction } from '../../../services/transactions'
import NumberFormat from 'react-number-format'

const Transctions = () => {
  const [data, setData] = useState([])
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)

  const { push } = useHistory()

  const getTransactionAPI = useCallback(async () => {
    setLoading(true)
    const response = await getHistoryTransaction()
    if (response.error) {
      toast.error(response.message)
    } else {
      setData(response.results.data)
      setBalance(response.results.count)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getTransactionAPI()
  }, [])

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">My Transactions</h2>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p>Balance</p>
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
          <Button
            color="primary"
            type="button"
            className="rounded-pill"
            onClick={() => push({ pathname: '/transactions/add' })}
          >
            Add Transaction
          </Button>
        </div>
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
                <Table borderless>
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
                    <tr>
                      <th scope="row">#FG661</th>
                      <td>2 Item</td>
                      <td>Rp. 290.000</td>
                      <td>
                        <span className="float-start icon-status success" />
                        success
                      </td>
                      <td>
                        <Button className="btn-status rounded-pill" color="secondary" type="button" onClick={() => push({ pathname: '/transactions/detail' })} >Details</Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#FG661</th>
                      <td>2 Item</td>
                      <td>Rp. 290.000</td>
                      <td>
                        <span className="float-start icon-status success" />
                        success
                      </td>
                      <td>
                        <Button className="btn-status rounded-pill" color="secondary" type="button" onClick={() => push({ pathname: '/transactions/detail' })} >Details</Button>
                      </td>
                    </tr>
                    <tr>
                      <th scope="row">#FG661</th>
                      <td>2 Item</td>
                      <td>Rp. 290.000</td>
                      <td>
                        <span className="float-start icon-status success" />
                        success
                      </td>
                      <td>
                        <Button className="btn-status rounded-pill" color="secondary" type="button" onClick={() => push({ pathname: '/transactions/detail' })} >Details</Button>
                      </td>
                    </tr>
                  </tbody>
                </Table>
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
