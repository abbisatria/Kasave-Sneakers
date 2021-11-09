import React, { useCallback, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Spinner, Table } from 'reactstrap'
import { getDashboard } from '../../../services/transactions'
import NumberFormat from 'react-number-format'

const Overview = () => {
  const [data, setData] = useState([])
  const [balance, setBalance] = useState('')
  const [loading, setLoading] = useState(false)

  const getOverviewAPI = useCallback(async () => {
    setLoading(true)
    const response = await getDashboard()
    if (response.error) {
      toast.error(response.message)
    } else {
      setData(response.results.history)
      setBalance(response.results.count)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getOverviewAPI()
  }, [])

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Overview</h2>
      <div className="mb-4">
        <p className="m-0">Balance</p>
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
      <div>
        <p>Latest Transactions</p>
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
                    </colgroup>
                    <thead>
                      <tr>
                        <th>Order ID</th>
                        <th>Item</th>
                        <th>Price</th>
                        <th>Status</th>
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
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </div>
              </>
                )
              : (
              <h6>No Transactions</h6>
                ))}
      </div>
    </div>
  )
}

export default Overview
