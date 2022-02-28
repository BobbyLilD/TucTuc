import { inject } from 'mobx-react';
import React, { Component } from 'react'
import { Redirect, Route } from 'react-router-dom'
import { Stores } from '../../../types';

const PrivateRoute = ({ component: Component, accessToken: accessToken, ...rest }) => {

    //console.log("access token is " + accessToken);
  // Add your own authentication on the below line.
  console.log('token is ' + accessToken);
  return (
    <Route
      {...rest}
      render={props =>
        accessToken != undefined ? (
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