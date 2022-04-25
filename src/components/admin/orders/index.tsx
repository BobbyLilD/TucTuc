import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import CardGrid from './sub/CardGrid';
import { Stores } from '../../../types';
import SearchBlock from '../../common/SearchBlock';
import OrderForm from './sub/OrderForm';
import {AdminContentSubContainer} from '../../common/StyledComponents';


type OrdersProps = {
  orderAdd: boolean;
  changeOrderState: () => void;
  getCities: () => void;
  getPlaces: () => void;
  initOrder: () => void;
};

const ordersComponent = ({ orderAdd, changeOrderState, getCities, getPlaces, initOrder }: OrdersProps) => {
  useEffect(() => {
    getCities();
    console.log('getting places');
    getPlaces();
    initOrder();
    console.log('order reset');
  }, [])
  return (
    <Box>
      {orderAdd ? (
        <>
          <OrderForm/>
        </>
      ) : (
        <>
          <SearchBlock changeAddState={changeOrderState} />
          <Box sx={AdminContentSubContainer}>
            <CardGrid />
          </Box>
        </>
      )}
    </Box>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  orderAdd: adminPanelStore.orderAdd,
  changeOrderState: adminPanelStore.changeOrderAdd,
  getCities: adminPanelStore.getCities,
  getPlaces: adminPanelStore.getPlaces,
  initOrder: adminPanelStore.initOrder
}))(ordersComponent);
