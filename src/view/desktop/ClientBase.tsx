import { Box, CssBaseline } from '@mui/material';
import React from 'react';
import AppBarClient from '../../components/client/base/AppBar';
import { BaseFiller } from '../../components/common/StyledComponents';
import RestaurantsComponent from '../../components/client/restaurants';
import ItemsComponent from '../../components/client/items';
import CartDrawer from '../../components/client/base/CartDrawer';
import AuthModal from '../../components/client/base/AuthModal';
import OrderComponent from '../../components/client/order';
import ProfileComponent from '../../components/client/profile';
import {Route, Switch} from 'react-router-dom';

const ClientBase = () => {
  return (
    <BaseFiller>
      <CssBaseline />
      <AppBarClient />
      <AuthModal />
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

export default ClientBase;