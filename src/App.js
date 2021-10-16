import React, { Component, Suspense } from 'react'
import { Route, Switch, BrowserRouter } from 'react-router-dom'

const Home = React.lazy(() => import('./views/Home'))
const NotFound = React.lazy(() => import('./views/404'))

class App extends Component {
  render () {
    return (
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            <Route
              path="/"
              name="Home"
              render={(props) => <Home {...props} />}
            />
            <Route
              render={(props) => <NotFound {...props} />}
            />
          </Switch>
        </Suspense>
      </BrowserRouter>
    )
  }
}

export default App
