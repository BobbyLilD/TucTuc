import { Button, Grid, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { BackBtn } from '../../../common/StyledComponents';
import OrderCard from './OrderCard';

type OrderListProps = {
  changeShow: () => void;
};

const PaperBase = {
    p: 2
}



const OrderList = ({ changeShow }: OrderListProps) => {
  return (
    <>
      <Button onClick={changeShow} sx={BackBtn}>{`< `} назад</Button>
      <Typography variant="h4" fontWeight={600} sx={{marginBottom: 2}}>
        История заказов
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Paper elevation={3} sx={PaperBase}>
            <OrderCard/>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={PaperBase}>
            <OrderCard />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={PaperBase}>
            <OrderCard />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={PaperBase}>
            <OrderCard />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={PaperBase}>
            <OrderCard />
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={PaperBase}>
            <OrderCard />
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};

export default inject(({ clientStore }: Stores) => ({
  changeShow: clientStore.changeShowOrderList,
}))(OrderList);
