import React from 'react'
import { Link, Switch, Route } from 'react-router-dom'
import { Row, Col, Container, Navbar, NavLink } from 'reactstrap'
import { Logo, MenuLogout, MenuOverview, MenuSetting, MenuTransaction } from '../../assets/icon'
import Overview from './Overview'
import Transactions from './Transactions'
import Settings from './Settings'
import AddTransaction from './AddTransaction'
import DetailTransaction from './DetailTransaction'
import './Home.scss'

const Home = () => {
  return (
    <Container fluid className="p-4">
      <Row>
        <Col md={3} className="d-none d-md-block">
          <div className="user text-center mb-5">
            <Logo />
            <h4 className="fw-bold m-0">Abbi Satria</h4>
            <p>abbisatria@gmail.com</p>
          </div>
          <div className="px-3">
            <div className="menus">
              <div className="me-3">
                <MenuOverview />
              </div>
              <p className="item-title m-0">
                <Link to="/">
                  Overview
                </Link>
              </p>
            </div>
            <div className="menus">
              <div className="me-3">
                <MenuTransaction />
              </div>
              <p className="item-title m-0">
                <Link to="/transactions">
                  Transaction
                </Link>
              </p>
            </div>
            <div className="menus">
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
              <p className="item-title m-0">
                <Link to="/">
                  Logout
                </Link>
              </p>
            </div>
          </div>
        </Col>
        <Col md={9} lg={9} sm={12} xs={12}>
          <Switch>
            <Route exact path="/">
              <Overview />
            </Route>
            <Route exact path="/transactions">
              <Transactions />
            </Route>
            <Route path="/transactions/detail">
              <DetailTransaction />
            </Route>
            <Route exact path="/transactions/add">
              <AddTransaction />
            </Route>
            <Route exact path="/settings">
              <Settings />
            </Route>
          </Switch>
        </Col>
      </Row>
      <div className="d-lg-none d-md-none d-sm-block">
        <Navbar color="light" light expand="md" fixed="bottom">
          <NavLink href="/" className="d-flex align-items-center">
            <MenuOverview />
            Overview
          </NavLink>
          <NavLink href="/transactions" className="d-flex align-items-center">
          <MenuTransaction />
            Transactions
          </NavLink>
          <NavLink href="/settings" className="d-flex align-items-center">
          <MenuSetting />
            Settings
            </NavLink>
        </Navbar>
      </div>
    </Container>
  )
}

export default Home
