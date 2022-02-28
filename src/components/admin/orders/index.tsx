import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import CardGrid from './sub/CardGrid';
import { Stores } from '../../../types';
import SearchBlock from '../../common/SearchBlock';
import OrderForm from './sub/OrderForm';
import {AdminContentSubContainer} from '../../common/StyledComponents';


type OrdersProps = {
  orderAdd: boolean;
  changeOrderState: () => void;
};

const ordersComponent = ({ orderAdd, changeOrderState }: OrdersProps) => {
  return (
    <Box>
      {orderAdd ? (
        <>
          <OrderForm/>
        </>
      ) : (
        <>
          {' '}
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
}))(ordersComponent);
