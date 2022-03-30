import { Button, Card, Divider, Drawer, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import CartItem from '../common/CartItem';
import { CartItem as cartItem, Stores } from '../../../types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {useHistory} from 'react-router-dom';
import {IncDecButton, Icon} from '../../common/StyledComponents';

type CartDrawerProps = {
  shown: boolean;
  changeShowState: () => void;
  cart: Map<string, cartItem>;
  addServing: () => void;
  removeServing: () => void;
  servings: number;
  deliveryPrice: number;
  orderSum: number;
};

const BoxBetweenTop = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 2,
};

const BoxBetweenBottom = {
  display: 'flex',
  justifyContent: 'space-between',
};

const DrawerSX = {
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  paddingX: '5%',
};

const OrderButton = {
    backgroundColor: 'orange',
    marginTop: 2,
    color: 'white',
    ':hover': {
        backgroundColor: 'orange'
    }
}

const CartDrawer = ({ shown, changeShowState, cart, addServing, removeServing, servings, orderSum, deliveryPrice }: CartDrawerProps) => {
  let items = [];
  for(let key of cart.keys()){
    items.push(
      <CartItem key={key} itemID={key}/>
    )
  }

  let histoty = useHistory();
  const forwardOrder = () => {
    histoty.push('/order')
    changeShowState()
  }

  return (
    <Drawer open={shown} onClose={changeShowState} anchor="right">
      <Box sx={DrawerSX}>
        <Typography variant="h6" sx={{ marginX: 'auto', fontWeight: 600, marginY: 3 }}>
          Корзина
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          {items}
        </Box>
        <Divider />
        <Box sx={BoxBetweenTop}>
          <Typography variant="subtitle2">Приборы</Typography>
          <Box sx={{ display: 'flex' }}>
            <Button sx={IncDecButton} onClick={removeServing}>
              <RemoveCircleIcon sx={Icon} />
            </Button>
            <Typography variant="subtitle2">{servings}</Typography>
            <Button sx={IncDecButton} onClick={addServing}>
              <AddCircleIcon sx={Icon} />
            </Button>
          </Box>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' , marginTop: 0.5}}>
          <Typography variant="subtitle2">Доставка</Typography>
          <Typography variant="subtitle2">{deliveryPrice} руб.</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' , marginTop: 5}}>
          <Typography variant="subtitle2">Стоимость</Typography>
          <Typography variant="subtitle2">{orderSum - deliveryPrice} руб.</Typography>
        </Box>
        <Box sx={BoxBetweenBottom}>
          <Typography variant="subtitle2">Доставка</Typography>
          <Typography variant="subtitle2">{deliveryPrice} руб.</Typography>
        </Box>
        <Box sx={BoxBetweenBottom}>
          <Typography variant="subtitle2">Итого</Typography>
          <Typography variant="subtitle2">{orderSum} руб.</Typography>
        </Box>
        <Button sx={OrderButton} onClick={forwardOrder}>Оформить заказ</Button>
      </Box>
    </Drawer>
  );
};

export default inject(({ clientStore }: Stores) => ({
  shown: clientStore.showCart,
  changeShowState: clientStore.changeShowCart,
  cart: clientStore.cart,
  servings: clientStore.servings,
  addServing: clientStore.addServing,
  removeServing: clientStore.removeServing,
  deliveryPrice: clientStore.deliveryPrice,
  orderSum: clientStore.orderSum
}))(CartDrawer);
