import { inject } from 'mobx-react';
import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Stores } from '../../../types';

const PrivateRoute = ({ component: Component, loggedIn: loggedIn, ...rest }) => {

    //console.log("access token is " + accessToken);
  // Add your own authentication on the below line.
  return (
    <Route
      {...rest}
      render={props =>
        loggedIn ? (
          <Component {...props} />
        ) : (
          <Redirect to={{ pathname: '/admin/auth', state: { from: props.location } }} />
        )
      }
    />
  )
}

//export default inject(({userStore} : Stores) => ({accessToken: userStore.access_token}))(PrivateRoute)

export default PrivateRoute;