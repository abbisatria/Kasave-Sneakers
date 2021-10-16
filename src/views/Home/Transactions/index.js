import React from 'react'
import { Button, Col, Row, Table } from 'reactstrap'
import { useHistory } from 'react-router-dom'

const Transctions = () => {
  const { push } = useHistory()

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">My Transactions</h2>
      <div className="mb-3">
        <div className="d-flex align-items-center justify-content-between">
          <div>
            <p>Balance</p>
            <h3 className="fw-medium">Rp 4.518.000.500</h3>
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
        <Col lg={12} md={12} sm={12} xs={12} className="d-flex align-items-center mb-4">
          <Button color="primary" className="btn-active rounded-pill me-3">All</Button>
          <Button color="primary" className="btn-status rounded-pill me-3">Success</Button>
          <Button color="primary" className="btn-status rounded-pill me-3">Pending</Button>
        </Col>
        <Col>
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
                  <span className="float-start icon-status pending" />
                  pending
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
        </Col>
      </Row>
    </div>
  )
}

export default Transctions
