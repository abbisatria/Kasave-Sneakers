import React from 'react'
import { Button } from 'reactstrap'
import Logo from '../../../assets/icon/logo.svg'

const DetailTransaction = () => {
  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Details #FG662</h2>
      <div className="d-flex justify-content-between align-items-center">
        <img src={Logo} alt="logo" />
        <Button color="success" className="rounded-pill px-4" type="button">Success</Button>
      </div>
      <hr />
      <div>
        <h5>Purchase Details</h5>
        <div className="mb-1">
          <h6>Vans Slip On</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p>Deep Cleaning</p>
            <p>Rp. 30.000</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Recolor (Black)</p>
            <p>Rp. 100.000</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>One day service</p>
            <p>Rp. 10.000</p>
          </div>
        </div>
        <div className="mb-1">
          <h6>Vans Old School</h6>
          <div className="d-flex justify-content-between align-items-center">
            <p>Regular Cleaning</p>
            <p>Rp. 20.000</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Unyellowing</p>
            <p>Rp. 30.000</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>One day service</p>
            <p>Rp. 10.000</p>
          </div>
        </div>
        <div className="mb-1">
          <div className="d-flex justify-content-between align-items-center">
            <p>Total</p>
            <p>Rp. 200.000</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Paid</p>
            <p>Rp. 200.000</p>
          </div>
          <div className="d-flex justify-content-between align-items-center">
            <p>Change</p>
            <p>Rp. 0</p>
          </div>
        </div>
        <Button color="primary" type="button" className="rounded-pill px-5">Print Bill</Button>
      </div>
    </div>
  )
}

export default DetailTransaction
