import React, { Component } from 'react'
import { Redirect, Route } from 'react-router'
import Cookies from 'js-cookie'

class PrivateRoute extends Component {
  render () {
    // eslint-disable-next-line react/prop-types
    const Component = this.props.privateComponent
    const tokenCookies = Cookies.get('token')
    return (
      <Route {...this.props} render={(props) => {
        if (tokenCookies) {
          return <Component {...props} />
        } else {
          return <Redirect to={{ pathname: '/login' }} />
        }
      }}
      />
    )
  }
}

export default PrivateRoute
