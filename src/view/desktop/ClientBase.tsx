import { Box, CssBaseline } from '@mui/material';
import React, { useEffect } from 'react';
import AppBarClient from '../../components/client/base/AppBar';
import { BaseFiller } from '../../components/common/StyledComponents';
import RestaurantsComponent from '../../components/client/restaurants';
import ItemsComponent from '../../components/client/items';
import CartDrawer from '../../components/client/base/CartDrawer';
import AuthModal from '../../components/client/base/AuthModal';
import OrderComponent from '../../components/client/order';
import ProfileComponent from '../../components/client/profile';
import {Route, Switch} from 'react-router-dom';
import { inject } from 'mobx-react';
import { Stores } from '../../types';
import RegistrationModal from '../../components/client/base/RegistrationModal';

type ClientBaseProps = {
    checkAccessToken: () => void;
    initNewOrder: () => void;
}

const ClientBase = ({checkAccessToken, initNewOrder}: ClientBaseProps) => {
    useEffect(() => {
        initNewOrder();
        checkAccessToken();
    }, [])

  return (
    <BaseFiller>
      <CssBaseline />
      <AppBarClient />
      <AuthModal />
      <RegistrationModal />
      <Box sx={{ overflow: 'scroll', height: 'calc(100vh - 80px)', marginTop: '80px' }}>
        <CartDrawer />
        <Switch>
            <Route path='/order' component={OrderComponent}/>
            <Route path='/profile' component={ProfileComponent}/>
            <Route path='/place/:id' component={ItemsComponent}/>
            <Route path='/' component={RestaurantsComponent}/>
        </Switch>
      </Box>
    </BaseFiller>
  );
};

export default inject(({userStore, clientStore}:Stores)=>({
    checkAccessToken: userStore.checkAccessToken,
    initNewOrder: clientStore.initNewOrder
}))(ClientBase);
