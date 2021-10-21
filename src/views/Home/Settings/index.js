import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import { Button, FormGroup, Input, Label, Form, Spinner } from 'reactstrap'
import { setUpdateUser } from '../../../services/auth'
import { useHistory } from 'react-router-dom'
import './Setting.scss'

const Settings = () => {
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [loading, setLoading] = useState(false)

  const { push } = useHistory()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const jwtToken = atob(token)
      const payload = jwtDecode(jwtToken)
      setName(payload.user.nama)
      setPhoneNumber(payload.user.phoneNumber)
    }
  }, [])

  const submitForm = async (e) => {
    e.preventDefault()
    const data = {
      name,
      password,
      phoneNumber
    }
    if (!name || !password || !phoneNumber) {
      toast.error('Full Name, Password, dan Phone Number wajib diisi!!!')
    } else {
      setLoading(true)
      const response = await setUpdateUser(data)
      if (response.error) {
        toast.error(response.message)
        setLoading(false)
      } else {
        toast.success('Update Profile Berhasil')
        setLoading(false)
        Cookies.remove('token')
        push('/login')
      }
    }
  }

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Settings</h2>
      <div className="main-setting">
        <Form onSubmit={submitForm}>
          <FormGroup className="mb-3">
            <Label>Full Name</Label>
            <Input type="text" placeholder="Enter your fullname" className="rounded-pill mt-2" value={name} onChange={(e) => setName(e.target.value)} />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label>Password</Label>
            <Input type="password" placeholder="Enter your password" className="rounded-pill mt-2" value={password} onChange={(e) => setPassword(e.target.value)} />
          </FormGroup>
          <FormGroup className="mb-3">
            <Label>Phone Number</Label>
            <Input type="number" placeholder="Enter your phone number" className="rounded-pill mt-2" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
          </FormGroup>
          {loading
            ? (
            <div className="d-flex justify-content-center">
              <Spinner size="lg" color="dark" />
            </div>
              )
            : (
            <Button color="primary" className="rounded-pill w-100 mt-3" type="submit">Save My Profile</Button>
              )}
        </Form>
        <Button color="secondary" className="rounded-pill w-100 mt-3 d-lg-none d-md-none d-sm-block" type="button" onClick={() => {
          Cookies.remove('token')
          push('/login')
        }}>Log Out</Button>
      </div>
    </div>
  )
}

export default Settings
