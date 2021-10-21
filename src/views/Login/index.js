import React, { useState } from 'react'
import { Container, Row, Col, FormGroup, Label, Input, Button, Form, Spinner } from 'reactstrap'
import { ReactComponent as Shoes } from '../../assets/img/shoes.svg'
import { toast } from 'react-toastify'
import { setLogin } from '../../services/auth'
import { useHistory } from 'react-router-dom'
import Cookies from 'js-cookie'
import './Login.scss'

const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const { push } = useHistory()

  const submitForm = async (e) => {
    e.preventDefault()
    const data = {
      email,
      password
    }
    if (!email || !password) {
      toast.error('Email dan Password wajib diisi!!!')
    } else {
      setLoading(true)
      const response = await setLogin(data)
      if (response.error) {
        toast.error(response.message)
        setLoading(false)
      } else {
        toast.success('Login Berhasil')
        const token = response.results
        const tokenBase64 = btoa(token)
        Cookies.set('token', tokenBase64, { expires: 1 })
        setLoading(false)
        push('/')
      }
    }
  }

  return (
    <Container fluid>
      <Row>
        <Col md={6} className="p-5">
          <h3>Sign In</h3>
          <p>Masuk untuk melakukan proses transaksi <b>Kasave Sneakers</b></p>
          <Form onSubmit={submitForm}>
            <FormGroup className="my-3">
              <Label className="mb-2">Email Address</Label>
              <Input
                type="email"
                placeholder="Enter your email address"
                className="rounded-pill"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </FormGroup>
            <FormGroup className="mb-5">
              <Label className="mb-2">Password</Label>
              <Input
                type="password"
                placeholder="Enter your password"
                className="rounded-pill"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </FormGroup>
            {loading
              ? (
                <div className="d-flex justify-content-center">
                  <Spinner size="lg" color="dark" />
                </div>
                )
              : (
                <Button color="primary" className="w-100 rounded-pill">Continue to Sign In</Button>
                )}
          </Form>
        </Col>
        <Col md={6} className="bg-login d-none d-md-block">
          <div className="d-flex justify-content-center">
            <Shoes />
          </div>
          <h6 className="text-center">Clean white like without glass.</h6>
          <p className="text-center">Kami siap melayani anda dengan sepenuh hati</p>
        </Col>
      </Row>
    </Container>
  )
}

export default Login
