import React, { useCallback, useEffect, useState } from 'react'
import { Button, Spinner } from 'reactstrap'
import Logo from '../../../assets/icon/logo.svg'
import { useParams } from 'react-router-dom'
import { getDetailTransaction } from '../../../services/transactions'
import { toast } from 'react-toastify'
import NumberFormat from 'react-number-format'

const DetailTransaction = () => {
  const [data, setData] = useState({})
  const [loading, setLoading] = useState(false)

  const { id } = useParams()

  const getDetailTransactionAPI = useCallback(async () => {
    setLoading(true)
    const response = await getDetailTransaction(id)
    if (response.error) {
      toast.error(response.message)
    } else {
      setData(response.results)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getDetailTransactionAPI()
  }, [])
  return (
    loading
      ? (
        <div className="d-flex justify-content-center">
          <Spinner size="lg" color="dark" />
        </div>
        )
      : (
          Object.keys(data).length > 0 && (
          <div className="mb-5">
            <h2 className="fw-bold mb-4">Details {data.orderId}</h2>
            <div className="d-flex justify-content-between align-items-center">
              <img src={Logo} alt="logo" />
              <Button color="success" className="rounded-pill px-4" type="button">Success</Button>
            </div>
            <hr />
            <div>
              <h5>Purchase Details</h5>
              <div className="d-flex align-items-center mb-3">
                <p style={{ marginBottom: 0, width: 70 }}>Email : </p>
                <h6 style={{ marginBottom: 0 }}>
                  {data.email}
                </h6>
              </div>
              {data.historyItem.map((val, idx) => {
                return (
                  <div className="mb-1" key={String(idx)}>
                    <h6>{val.name}</h6>
                    <div className="d-flex justify-content-between align-items-center">
                      <p>{val.subCategory.name}</p>
                      <p>
                        <NumberFormat
                          value={String(val.subCategory.price)}
                          prefix="Rp. "
                          displayType="text"
                          thousandSeparator="."
                          decimalSeparator=","
                        />
                      </p>
                    </div>
                    {val.treatment.name && (
                      <div className="d-flex justify-content-between align-items-center">
                        <p>{val.treatment.name}</p>
                        <p>
                          <NumberFormat
                            value={String(val.treatment.price)}
                            prefix="Rp. "
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                          />
                        </p>
                      </div>
                    )}
                    {val.oneDay && (
                      <div className="d-flex justify-content-between align-items-center">
                        <p>One day service</p>
                        <p>Rp. 10.000</p>
                      </div>
                    )}
                    {val.discount > 0 && (
                      <div className="d-flex justify-content-between align-items-center">
                        <p>Discount</p>
                        <p>{val.discount ? val.discount : 0}%</p>
                      </div>
                    )}
                    {val.description && (
                      <div className="d-flex justify-content-between align-items-center">
                        <p>Description</p>
                        <p>{val.description}</p>
                      </div>
                    )}
                  </div>
                )
              })}
              <div className="mb-1">
                <div className="d-flex justify-content-between align-items-center">
                  <p>Dicsount</p>
                  <p>{data.discount ? data.discount : 0}%</p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Total</p>
                  <p>
                    <NumberFormat
                      value={String(data.total)}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Paid</p>
                  <p>
                    <NumberFormat
                      value={String(data.paid)}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </p>
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <p>Change</p>
                  <p>
                    <NumberFormat
                      value={String(data.change)}
                      prefix="Rp. "
                      displayType="text"
                      thousandSeparator="."
                      decimalSeparator=","
                    />
                  </p>
                </div>
              </div>
              <Button color="primary" type="button" className="rounded-pill px-5" onClick={() => toast.error('Fitur Coming Soon')}>Print Bill</Button>
            </div>
          </div>
          )
        )
  )
}

export default DetailTransaction
