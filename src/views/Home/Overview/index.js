import React from 'react'
import { Table } from 'reactstrap'

const Overview = () => {
  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Overview</h2>
      <div>
        <p>Latest Transactions</p>
        <Table borderless>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Item</th>
              <th>Price</th>
              <th>Status</th>
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
            </tr>
            <tr>
              <th scope="row">#FG661</th>
              <td>2 Item</td>
              <td>Rp. 290.000</td>
              <td>
                  <span className="float-start icon-status success" />
                  success
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
            </tr>
          </tbody>
        </Table>
      </div>
    </div>
  )
}

export default Overview
