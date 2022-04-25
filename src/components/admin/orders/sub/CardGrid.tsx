import { Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { OrderAdmin, Stores } from '../../../../types';
import { ItemInAdminGrid } from '../../../common/StyledComponents';
import CardComponent from './Card';

type CardGridProps = {
  orderList: OrderAdmin[];
  getOrders: () => void;
};

const CardGrid = ({ orderList, getOrders }: CardGridProps) => {
  useEffect(() => {
    getOrders();
  }, []);

  return (
    <Grid container rowSpacing={3}>
      {orderList != undefined && orderList.map((value, index) => <Grid item xs={4} sx={ItemInAdminGrid}>
        <CardComponent index={index} key={value.id}/>
      </Grid>)}
    </Grid>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  orderList: adminPanelStore.ordersList,
  getOrders: adminPanelStore.getOrders,
}))(CardGrid);
