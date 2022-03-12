import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Order, Stores } from '../../../../types';
import { BackBtn } from '../../../common/StyledComponents';
import OrderCard from './OrderCard';

type OrderListProps = {
  changeShow: () => void;
  getOrderList: () => void;
  orderList: Order[];
};

const PaperBase = {
  p: 2,
};

const OrderList = ({ changeShow, getOrderList, orderList }: OrderListProps) => {
  useEffect(() => {
    getOrderList();
  }, []);

  let cards: JSX.Element[] = [];
  for (let i = 0; i < orderList.length; i++) {
    cards.push(
      <Grid item xs={4}>
        <Paper elevation={3} sx={PaperBase}>
          <OrderCard index={i} />
        </Paper>
      </Grid>,
    );
  }

  return (
    <>
      <Button onClick={changeShow} sx={BackBtn}>
        {`< `} назад
      </Button>
      <Typography variant="h4" fontWeight={600} sx={{ marginBottom: 2 }}>
        История заказов
      </Typography>
      <Grid container spacing={2}>
        {cards}
      </Grid>
    </>
  );
};

export default inject(({ clientStore }: Stores) => ({
  changeShow: clientStore.changeShowOrderList,
  orderList: clientStore.orderList,
  getOrderList: clientStore.getOrderList,
}))(OrderList);
