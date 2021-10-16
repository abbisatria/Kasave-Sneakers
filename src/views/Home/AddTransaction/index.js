import React, { useState } from 'react'
import { Button, Col, FormGroup, Input, Label, Row } from 'reactstrap'
import './AddTransaction.scss'

function AddTransaction () {
  const [chooseCategory, setChooseCategory] = useState('')
  const [chooseSubCategory, setChooseSubCategory] = useState('')
  const [chooseOptional, setChooseOptional] = useState('')
  const [priceOptional, setPriceOptional] = useState(0)
  const [oneDay, setOneDay] = useState(false)
  const [nameItem, setNameItem] = useState('')
  const [description, setDescription] = useState('')
  const [order, setOrder] = useState([])
  const [paid, setPaid] = useState(0)

  const category = [
    {
      id: 1,
      name: 'Sneakers',
      sub_category: [
        {
          id: 1,
          name: 'Regular Cleaning',
          price: 20000
        },
        {
          id: 2,
          name: 'Deep Cleaning',
          price: 30000
        }
      ]
    },
    {
      id: 2,
      name: 'Boots',
      sub_category: [
        {
          id: 1,
          name: 'S',
          price: 35000
        },
        {
          id: 2,
          name: 'M',
          price: 40000
        },
        {
          id: 3,
          name: 'L',
          price: 40000
        }
      ]
    },
    {
      id: 3,
      name: 'Bags',
      sub_category: [
        {
          id: 1,
          name: 'S',
          price: 25000
        },
        {
          id: 2,
          name: 'M',
          price: 30000
        },
        {
          id: 3,
          name: 'L',
          price: 35000
        }
      ]
    },
    {
      id: 4,
      name: 'Others',
      sub_category: [
        {
          id: 1,
          name: 'Flat Shoes',
          price: 20000
        },
        {
          id: 2,
          name: 'Kid Shoes',
          price: 20000
        },
        {
          id: 3,
          name: 'Walleet',
          price: 25000
        },
        {
          id: 4,
          name: 'Belt',
          price: 25000
        },
        {
          id: 5,
          name: 'Leather Jacket',
          price: 50000
        }
      ]
    }
  ]

  const optional = [
    {
      id: 1,
      name: 'Unyellowing',
      price: 30000
    },
    {
      id: 2,
      name: 'Recolor',
      price: 120000
    },
    {
      id: 3,
      name: 'Repair',
      price: 0
    },
    {
      id: 4,
      name: 'Custom',
      price: 0
    }
  ]

  const total = oneDay ? category[Number(chooseCategory) - 1].sub_category.filter(item => item.id === Number(chooseSubCategory))[0].price + Number(priceOptional) + 10000 : ((chooseCategory && chooseSubCategory) ? category[Number(chooseCategory) - 1].sub_category.filter(item => item.id === Number(chooseSubCategory))[0].price + Number(priceOptional) : 0)

  const reset = () => {
    setChooseCategory('')
    setChooseSubCategory('')
    setChooseOptional('')
    setPriceOptional(0)
    setOneDay(false)
    setNameItem('')
    setDescription('')
  }

  const submit = () => {
    setOrder([...order, {
      category: category[Number(chooseCategory) - 1],
      subCategory: category[Number(chooseCategory) - 1].sub_category.filter(item => item.id === Number(chooseSubCategory))[0],
      name: nameItem,
      treatment: optional.filter(val => val.id === Number(chooseOptional))[0],
      priceTreatment: Number(priceOptional),
      description: description,
      oneDay: oneDay,
      total: total
    }])
    reset()
  }

  const initialValue = 0

  return (
    <div className="mb-5">
      <h2 className="fw-bold mb-4">Add Transaction</h2>
      <Row>
        <Col lg={6} md={6} className="mb-5">
          <FormGroup className="mb-3">
            <Label>Select Category</Label>
            <Input type="select" value={chooseCategory} className="rounded-pill mt-2" onChange={(e) => setChooseCategory(e.target.value)}>
              <option value="">Choose One</option>
              {category.map(val => {
                return (
                  <option key={String(val.id)} value={val.id}>{val.name}</option>
                )
              })}
            </Input>
          </FormGroup>
          <FormGroup className="mb-3">
            <Label>Select Sub Category</Label>
            <Input type="select" className="rounded-pill mt-2" disabled={chooseCategory === ''} onChange={(e) => setChooseSubCategory(e.target.value)}>
              <option value="">Choose One</option>
              {chooseCategory !== ''
                ? category.filter(val => val.id === Number(chooseCategory))[0].sub_category.map(item => {
                  return (
                    <option key={String(item.id)} value={item.id}>{item.name}</option>
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
              <FormGroup check className="me-3" key={String(val.id)}>
                <Label check>
                  <Input type="radio" value={val.id} checked={val.id === Number(chooseOptional)} onChange={(e) => {
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
            <Input type="number" placeholder="Enter your description" className="rounded-pill mt-2" value={priceOptional} onChange={(e) => setPriceOptional(e.target.value)} />
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
          <Button color="primary" type="button" className="rounded-pill w-100" onClick={() => submit()} disabled={chooseCategory === '' || chooseSubCategory === '' || nameItem === ''}>Add to bill - {total}</Button>
        </Col>
        <Col lg={6} md={6}>
          <div className="card-order">
            <h5>Order Summary</h5>
            <hr />
            {order.length > 0
              ? order.map((val, idx) => {
                return (
            <div className="mb-1" key={String(idx)}>
              <h6>{val.name}</h6>
              <div className="d-flex justify-content-between align-items-center">
                <p>{val.subCategory.name}</p>
                <p>{val.subCategory.price}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p>{val.treatment.name}</p>
                <p>{val.treatment.price}</p>
              </div>
              {val.oneDay && (
                <div className="d-flex justify-content-between align-items-center">
                  <p>One day service</p>
                  <p>10000</p>
                </div>
              )}
            </div>
                )
              })
              : <p>No orders yet</p>}
            <hr />
            <div className="d-flex justify-content-between align-items-center">
              <p>Total</p>
              <p>{order.reduce(function (total, currentValue) {
                return total + currentValue.total
              }, initialValue)}</p>
            </div>
            <FormGroup className="mb-3">
              <Label>Paid</Label>
              <Input type="number" placeholder="Enter your paid" className="rounded-pill mt-2" value={paid} onChange={(e) => setPaid(e.target.value)} />
            </FormGroup>
            <div className="d-flex justify-content-between align-items-center mb-3">
              <p>Change</p>
              <p>{Number(paid) - order.reduce(function (total, currentValue) {
                return total + currentValue.total
              }, initialValue)}</p>
            </div>
            <div className="d-flex justify-content-between align-items-center">
              <Button color="primary" className="rounded-pill w-100">Print Bill</Button>
              <div style={{ width: 36 }} />
              <Button color="secondary" className="rounded-pill w-100">Save Bill</Button>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  )
}

export default AddTransaction
