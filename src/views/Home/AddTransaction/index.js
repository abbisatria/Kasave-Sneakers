/* eslint-disable multiline-ternary */
import React, { useCallback, useEffect, useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row, Spinner } from 'reactstrap'
import NumberFormat from 'react-number-format'
import './AddTransaction.scss'
import { getListCategory, getListTreatment, setCheckout } from '../../../services/transactions'
import { toast } from 'react-toastify'
import { useHistory } from 'react-router-dom'

const AddTransaction = () => {
  const [chooseCategory, setChooseCategory] = useState('')
  const [chooseSubCategory, setChooseSubCategory] = useState('')
  const [chooseOptional, setChooseOptional] = useState('')
  const [priceOptional, setPriceOptional] = useState('')
  const [oneDay, setOneDay] = useState(false)
  const [nameItem, setNameItem] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState([])
  const [paid, setPaid] = useState('')
  const [discount, setDiscount] = useState('')
  const [category, setCategory] = useState([])
  const [optional, setOptional] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingSubmit, setLoadingSubmit] = useState(false)
  const [email, setEmail] = useState('')

  const { push } = useHistory()

  const getListCategoryAPI = useCallback(async () => {
    setLoading(true)
    const response = await getListCategory()
    if (response.error) {
      toast.error(response.message)
    } else {
      setCategory(response.results)
    }
    setLoading(false)
  }, [])

  const getListTreatmentAPI = useCallback(async () => {
    setLoading(true)
    const response = await getListTreatment()
    if (response.error) {
      toast.error(response.message)
    } else {
      setOptional(response.results)
    }
    setLoading(false)
  }, [])

  useEffect(() => {
    getListCategoryAPI()
    getListTreatmentAPI()
  }, [])

  const total = oneDay ? category.filter(val => val._id === chooseCategory)[0].sub_category.filter(item => item._id === chooseSubCategory)[0].price + Number(priceOptional) + 10000 : ((chooseCategory && chooseSubCategory) ? category.filter(val => val._id === chooseCategory)[0].sub_category.filter(item => item._id === chooseSubCategory)[0].price + Number(priceOptional) : 0)

  const reset = () => {
    setChooseCategory('')
    setChooseSubCategory('')
    setChooseOptional('')
    setPriceOptional(0)
    setOneDay(false)
    setNameItem('')
    setDescription('')
    setDiscount(0)
  }

  const submit = () => {
    setOrder([...order, {
      category: category.filter(val => val._id === chooseCategory)[0],
      subCategory: category.filter(val => val._id === chooseCategory)[0].sub_category.filter(item => item._id === chooseSubCategory)[0],
      name: nameItem,
      treatment: optional.filter(val => val._id === chooseOptional)[0],
      priceTreatment: Number(priceOptional),
      description: description,
      oneDay: oneDay,
      discount: discount || 0,
      total: discount > 0 ? total * (Number(discount) / 100) : total
    }])
    reset()
  }

  const initialValue = 0

  const submitPrint = async () => {
    const change = Number(paid) - order.reduce(function (total, currentValue) {
      return total + currentValue.total
    }, initialValue)

    const total = order.reduce(function (total, currentValue) {
      return total + currentValue.total
    }, initialValue)

    const item = order.map(val => {
      return {
        category: {
          name: val.category.name
        },
        subCategory: {
          name: val.subCategory.name,
          price: val.subCategory.price
        },
        treatment: {
          name: val?.treatment?.name ? val?.treatment?.name : '',
          price: val.priceTreatment
        },
        name: val.name,
        discount: val.discount,
        description: val.description,
        oneDay: val.oneDay,
        total: val.total
      }
    })

    const payload = {
      item: item,
      total: total,
      paid: paid,
      change: change,
      email: email
    }

    if (String(change)[0] === '-') {
      toast.error('Pembayaran tidak boleh minus')
    } else {
      if (email) {
        setLoadingSubmit(true)
        const response = await setCheckout(payload)
        if (response.error) {
          setLoadingSubmit(false)
          toast.error(response.message)
        } else {
          toast.success('Transaksi Berhasil')
          setLoadingSubmit(false)
          push('/transactions')
        }
      } else {
        toast.error('Isi email terlebih dahulu')
      }
    }
  }

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Add Transaction</h2>
      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner size="lg" color="dark" />
        </div>
      ) : (
        <Row>
          <Col lg={6} md={6} className="mb-5">
            <FormGroup className="mb-3">
              <Label>Select Category</Label>
              <Input type="select" value={chooseCategory} className="rounded-pill mt-2" onChange={(e) => setChooseCategory(e.target.value)}>
                <option value="">Choose One</option>
                {category.map(val => {
                  return (
                    <option key={String(val._id)} value={val._id}>{val.name}</option>
                  )
                })}
              </Input>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label>Select Sub Category</Label>
              <Input type="select" className="rounded-pill mt-2" disabled={chooseCategory === ''} onChange={(e) => setChooseSubCategory(e.target.value)}>
                <option value="">Choose One</option>
                {chooseCategory !== ''
                  ? category.filter(val => val._id === chooseCategory)[0].sub_category.map(item => {
                    return (
                      <option key={String(item._id)} value={item._id}>{item.name}</option>
                    )
                  })
                  : null}
              </Input>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label>Name Item</Label>
              <Input type="text" placeholder="Enter your name item" className="rounded-pill mt-2" value={nameItem} onChange={(e) => setNameItem(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label className="mb-2">Treatment (Optional)</Label>
              <div className="d-flex" style={{ overflow: 'auto' }}>
                {optional.map(val => {
                  return (
                    <FormGroup check className="me-3" key={String(val._id)}>
                      <Label check>
                        <Input type="radio" value={val._id} checked={val._id === chooseOptional} onChange={(e) => {
                          setChooseOptional(e.target.value)
                          setPriceOptional(val.price)
                        }} /> {' '}
                        {val.name}
                      </Label>
                    </FormGroup>
                  )
                })}
              </div>
            </FormGroup>
            <FormGroup className="mb-3">
              <Label>Price Treatment</Label>
              <NumberFormat
                value={priceOptional}
                prefix="Rp. "
                displayType="input"
                className="form-control rounded-pill"
                onValueChange={(val) => setPriceOptional(val.value)}
                placeholder="Enter your price treatment"
                thousandSeparator="."
                decimalSeparator=","
              />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label>Discount</Label>
              <Input type="number" placeholder="Enter your description" className="rounded-pill mt-2" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </FormGroup>
            <FormGroup className="mb-3">
              <Label>Description (Optional)</Label>
              <Input type="text" placeholder="Enter your description" className="rounded-pill mt-2" value={description} onChange={(e) => setDescription(e.target.value)} />
            </FormGroup>
            <FormGroup check className="mb-3">
              <Label check>
                <Input type="checkbox" checked={oneDay} onChange={(e) => setOneDay(!oneDay)} />{' '}
                One day service
              </Label>
            </FormGroup>
            <Button color="primary" type="button" className="rounded-pill w-100" onClick={() => submit()} disabled={chooseCategory === '' || chooseSubCategory === '' || nameItem === ''}>Add to bill - {discount > 0 ? total * (discount / 100) : total}</Button>
          </Col>
          <Col lg={6} md={6}>
            <div className="card-order">
              <h5>Order Summary</h5>
              <hr />
              {order.length > 0
                ? order.map((val, idx) => {
                  return (
                    <div className="mb-1" key={String(idx)}>
                      <div className="d-flex justify-content-between align-items-center">
                        <h6>{val.name}</h6>
                        <div style={{ cursor: 'pointer' }} onClick={() => {
                          const filter = order.filter((value, index) => idx !== index)
                          setOrder(filter)
                        }}>
                        <i className="fa fa-trash" style={{ color: 'red' }} />
                        </div>
                      </div>
                      <div className="d-flex justify-content-between align-items-center">
                        <p>{val.subCategory.name}</p>
                        <p>
                          <NumberFormat
                            value={val.subCategory.price}
                            prefix="Rp. "
                            displayType="text"
                            thousandSeparator="."
                            decimalSeparator=","
                          />
                        </p>
                      </div>
                      {val.treatment && (
                        <div className="d-flex justify-content-between align-items-center">
                          <p>{val.treatment.name}</p>
                          <p>
                            <NumberFormat
                              value={val.priceTreatment}
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
                          <p>
                            <NumberFormat
                              value="10000"
                              prefix="Rp. "
                              displayType="text"
                              thousandSeparator="."
                              decimalSeparator=","
                            />
                          </p>
                        </div>
                      )}
                      <div className="d-flex justify-content-between align-items-center">
                        <p>Discount</p>
                        <p>{val.discount}%</p>
                      </div>
                    </div>
                  )
                })
                : <p>No orders</p>}
              <hr />
              <div className="d-flex justify-content-between align-items-center">
                <p>Total</p>
                <p>
                  <NumberFormat
                    value={order.reduce(function (total, currentValue) {
                      return total + currentValue.total
                    }, initialValue)}
                    prefix="Rp. "
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
              </div>
              <FormGroup className="mb-2">
                <Label>Paid</Label>
                <NumberFormat
                  value={paid}
                  prefix="Rp. "
                  displayType="input"
                  className="form-control rounded-pill"
                  onValueChange={(val) => setPaid(val.value)}
                  placeholder="Enter your paid"
                  thousandSeparator="."
                  decimalSeparator=","
                />
              </FormGroup>
              <FormGroup className="mb-3">
                <Label>Email</Label>
                <Input type="text" placeholder="Enter your email" className="rounded-pill mt-2" value={email} onChange={(e) => setEmail(e.target.value)} />
              </FormGroup>
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p>Change</p>
                <p>
                  <NumberFormat
                    value={Number(paid) - order.reduce(function (total, currentValue) {
                      return total + currentValue.total
                    }, initialValue)}
                    prefix="Rp. "
                    displayType="text"
                    thousandSeparator="."
                    decimalSeparator=","
                  />
                </p>
              </div>
              {loadingSubmit ? (
                <div className="d-flex justify-content-center">
                  <Spinner size="lg" color="dark" />
                </div>
              ) : (
                <Button type="button" color="primary" className="rounded-pill w-100" onClick={() => submitPrint()} hidden={order.length < 1}>Save Bill</Button>
              )}
            </div>
          </Col>
        </Row>
      )}
    </div>
  )
}

export default AddTransaction
