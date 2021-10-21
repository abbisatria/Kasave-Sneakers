import React, { Component, Suspense } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'
import Fallback from './assets/img/fallback.gif'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './App.scss'
import PrivateRoute from './config/PrivateRoute'

const Home = React.lazy(() => import('./views/Home'))
const Login = React.lazy(() => import('./views/Login'))
const NotFound = React.lazy(() => import('./views/404'))

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Suspense fallback={<div className="bg-fallback"><img src={Fallback} alt="animated" className="animated-gif" /></div>}>
          <Switch>
            <Route
              exact
              path="/login"
              name="Login"
              render={(props) => <Login {...props} />}
            />
            <PrivateRoute
              path="*"
              name="Home"
              privateComponent={Home}
            />
            <Route
              render={(props) => <NotFound {...props} />}
            />
          </Switch>
            <ToastContainer />
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
