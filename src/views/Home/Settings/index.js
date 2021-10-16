import React from 'react'
import { Button, FormGroup, Input, Label } from 'reactstrap'
import './Setting.scss'

const Settings = () => {
  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Settings</h2>
      <div className="main-setting">
        <FormGroup className="mb-3">
          <Label>Full Name</Label>
          <Input type="text" placeholder="Enter your fullname" className="rounded-pill mt-2" />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Email Address</Label>
          <Input type="email" placeholder="Enter your email address" className="rounded-pill mt-2" />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Password</Label>
          <Input type="password" placeholder="Enter your password" className="rounded-pill mt-2" />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label>Phone Number</Label>
          <Input type="number" placeholder="Enter your phone number" className="rounded-pill mt-2" />
        </FormGroup>
        <Button color="primary" className="rounded-pill w-100 mt-3">Save My Profile</Button>
        <Button color="secondary" className="rounded-pill w-100 mt-3 d-lg-none d-md-none d-sm-block">Log Out</Button>
      </div>
    </div>
  )
}

export default Settings
