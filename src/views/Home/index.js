import React, { Suspense, useEffect, useState } from 'react'
import { Link, Switch, Route, useHistory, useLocation } from 'react-router-dom'
import { Row, Col, Container, Navbar, NavLink } from 'reactstrap'
import { Logo, MenuExpense, MenuLogout, MenuOverview, MenuSetting, MenuTransaction } from '../../assets/icon'
import Overview from './Overview'
import Transactions from './Transactions'
import Settings from './Settings'
import AddTransaction from './AddTransaction'
import DetailTransaction from './DetailTransaction'
import Expense from './Expense'
import AddExpense from './AddExpense'
import Fallback from '../../assets/img/fallback.gif'
import './Home.scss'
import Cookies from 'js-cookie'
import jwtDecode from 'jwt-decode'

const Home = () => {
  const [user, setUser] = useState({
    nama: '',
    email: ''
  })

  const { push } = useHistory()

  useEffect(() => {
    const token = Cookies.get('token')
    if (token) {
      const jwtToken = atob(token)
      const payload = jwtDecode(jwtToken)
      const result = {
        nama: payload.user.nama,
        email: payload.user.email
      }
      setUser(result)
    }
  }, [])

  const onLogout = () => {
    Cookies.remove('token')
    push('/login')
  }

  const { pathname } = useLocation()

  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={3} className="d-none d-md-block">
          <div className="user text-center mb-5">
            <Logo />
            <h4 className="fw-bold m-0">{user.nama}</h4>
            <p>{user.email}</p>
          </div>
          <div className="px-3">
            <div className={pathname === '/' ? 'menus active-menu' : 'menus'}>
              <div className="me-3">
                <MenuOverview />
              </div>
              <p className="item-title m-0">
                <Link to="/">
                  Overview
                </Link>
              </p>
            </div>
            <div className={pathname.search('/transactions') === 0 ? 'menus active-menu' : 'menus'}>
              <div className="me-3">
                <MenuTransaction />
              </div>
              <p className="item-title m-0">
                <Link to="/transactions">
                  Transaction
                </Link>
              </p>
            </div>
            <div className={pathname.search('/expense') === 0 ? 'menus active-menu' : 'menus'}>
              <div className="me-3">
                <MenuExpense />
              </div>
              <p className="item-title m-0">
                <Link to="/expense">
                  Expense
                </Link>
              </p>
            </div>
            <div className={pathname === '/settings' ? 'menus active-menu' : 'menus'}>
              <div className="me-3">
                <MenuSetting />
              </div>
              <p className="item-title m-0">
                <Link to="/settings">
                  Settings
                </Link>
              </p>
            </div>
            <div className="menus">
              <div className="me-3">
                <MenuLogout />
              </div>
              <p className="item-title m-0" onClick={onLogout}>
                <Link to="">
                  Logout
                </Link>
              </p>
            </div>
          </div>
        </Col>
        <Col md={9} lg={9} sm={12} xs={12}>
          <Suspense fallback={<div className="bg-fallback"><img src={Fallback} alt="animated" className="animated-gif" /></div>}>
            <Switch>
              <Route
                exact
                path="/"
                name="Home"
                render={(props) => <Overview {...props} />}
              />
              <Route
                exact
                path="/expense"
                name="Expense"
                render={(props) => <Expense {...props} />}
              />
              <Route
                path="/expense/:mode"
                name="Expense"
                render={(props) => <AddExpense {...props} />}
              />
              <Route
                exact
                path="/transactions"
                name="Transaction"
                render={(props) => <Transactions {...props} />}
              />
              <Route
                path="/transactions/detail/:id"
                name="Transaction"
                render={(props) => <DetailTransaction {...props} />}
              />
              <Route
                path="/transactions/add"
                name="Transaction"
                render={(props) => <AddTransaction {...props} />}
              />
              <Route
                path="/settings"
                name="Settings"
                render={(props) => <Settings {...props} />}
              />
            </Switch>
          </Suspense>
        </Col>
      </Row>
      <div className="d-lg-none d-md-none d-sm-block">
        <Navbar color="light" light expand="md" fixed="bottom">
          <NavLink href="/" className={pathname === '/' ? 'active-menu d-flex flex-column align-items-center' : 'd-flex flex-column align-items-center'}>
            <MenuOverview />
            <p className="item-title">Overview</p>
          </NavLink>
          <NavLink href="/transactions" className={pathname.search('/transactions') === 0 ? 'active-menu d-flex flex-column align-items-center' : 'd-flex flex-column align-items-center'}>
            <MenuTransaction />
            <p className="item-title">Transaction</p>
          </NavLink>
          <NavLink href="/expense" className={pathname.search('/expense') === 0 ? 'active-menu d-flex flex-column align-items-center' : 'd-flex flex-column align-items-center'}>
            <MenuExpense />
            <p className="item-title">Expense</p>
          </NavLink>
          <NavLink href="/settings" className={pathname === '/settings' ? 'active-menu d-flex flex-column align-items-center' : 'd-flex flex-column align-items-center'}>
            <MenuSetting />
            <p className="item-title">Settings</p>
          </NavLink>
        </Navbar>
      </div>
    </Container>
  )
}

export default Home
