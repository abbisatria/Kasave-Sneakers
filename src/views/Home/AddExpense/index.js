import React, { useCallback, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format'
import { Button, Col, Form, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import { useParams, useHistory, useLocation } from 'react-router-dom'
import { editExpense, getDetailExpense, setExpense } from '../../../services/transactions'
import { toast } from 'react-toastify'

const AddExpense = () => {
  const [item, setItem] = useState('')
  const [price, setPrice] = useState('')
  const [loading, setLoading] = useState(false)
  const [loadingForm, setLoadingForm] = useState(false)

  const { mode } = useParams()
  const { push } = useHistory()
  const { state } = useLocation()

  const title = mode === 'add' ? 'Add' : (mode === 'edit' ? 'Edit' : 'View')

  const submit = async (e) => {
    e.preventDefault()
    if (item && price) {
      setLoading(true)
      const payload = {
        item,
        price
      }
      if (mode === 'add') {
        const response = await setExpense(payload)
        if (response.error) {
          toast.error(response.message)
        } else {
          toast.success('Berhasil menambahkan expense')
          push('/expense')
        }
      } else {
        const response = await editExpense(payload, state.id)
        if (response.error) {
          toast.error(response.message)
        } else {
          toast.success('Berhasil menambahkan expense')
          push('/expense')
        }
      }
      setLoading(false)
    } else {
      toast.error('Item dan Price wajib diisi!!!')
    }
  }

  const getDetailExpenseAPI = useCallback(async () => {
    setLoadingForm(true)
    const response = await getDetailExpense(state.id)
    if (response.error) {
      toast.error(response.message)
    } else {
      setItem(response.results.item)
      setPrice(response.results.price)
    }
    setLoadingForm(false)
  }, [])

  useEffect(() => {
    if (state) {
      getDetailExpenseAPI()
    }
  }, [])

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">{title} Expense</h2>
      {loadingForm
        ? (
        <div className="d-flex justify-content-center">
          <Spinner size="lg" color="dark" />
        </div>
          )
        : (
        <Row>
          <Col md={6}>
            <Form onSubmit={submit}>
              <FormGroup className="mb-3">
                <Label>Item</Label>
                <Input type="text" placeholder="Enter your item" className="rounded-pill mt-2" value={item} onChange={(e) => setItem(e.target.value)} disabled={mode === 'view'} />
              </FormGroup>
              <FormGroup className="mb-3">
                <Label>Price</Label>
                <NumberFormat
                  prefix="Rp. "
                  displayType="input"
                  className="form-control rounded-pill mt-2"
                  placeholder="Enter your price expense"
                  thousandSeparator="."
                  decimalSeparator=","
                  value={price}
                  onValueChange={(val) => setPrice(val.value)}
                  disabled={mode === 'view'}
                />
              </FormGroup>
              {loading
                ? (
                  <div className="d-flex justify-content-center">
                    <Spinner size="lg" color="dark" />
                  </div>
                  )
                : (
                  <Button color="primary" type="submit" className="w-100 rounded-pill" hidden={mode === 'view'}>Submit</Button>
                  )}
            </Form>
          </Col>
        </Row>
          )}
    </div>
  )
}

export default AddExpense
