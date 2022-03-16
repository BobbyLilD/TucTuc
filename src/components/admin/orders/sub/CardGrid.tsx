import { Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Order, Stores } from '../../../../types';
import { ItemInAdminGrid } from '../../../common/StyledComponents';
import CardComponent from './Card';

type CardGridProps = {
  orderList: Order[];
  getOrders: () => void;
};

const CardGrid = ({ orderList, getOrders }: CardGridProps) => {
  useEffect(() => {
    getOrders();
  }, []);

  let cards: JSX.Element[] = [];
  if (orderList != undefined) {
    for (let i = 0; i < orderList.length; i++) {
      cards.push(
        <Grid item xs={4} sx={ItemInAdminGrid}>
          <CardComponent index={i} />
        </Grid>,
      );
    }
  }

  return (
    <Grid container rowSpacing={3}>
      {cards}
    </Grid>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  orderList: adminPanelStore.ordersList,
  getOrders: adminPanelStore.getOrders,
}))(CardGrid);
