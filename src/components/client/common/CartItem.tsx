import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {CartItem as cartItem, Stores } from '../../../types';
import { inject } from 'mobx-react';
import { IncDecButton } from '../../common/StyledComponents';

const Icon = {
  color: 'orange',
  fontSize: 16,
};

type CartItemProps = {
  cart: Map<string, cartItem>;
  itemID: string;
  AddItemToCart: (id: string, name: string, price: number, restaurantID: string) => void;
  RemoveItemFromCart: (id: string) => void;
};

const CartItem = ({ cart, itemID, AddItemToCart, RemoveItemFromCart }: CartItemProps) => {
  let item = cart.get(itemID);

  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <Typography variant="subtitle2">{item.name}</Typography>
      <Box sx={{ display: 'flex' }}>
        <Button sx={IncDecButton}>
          <RemoveCircleIcon sx={Icon} onClick={() => RemoveItemFromCart(itemID)} />
        </Button>
        {item.quantity}
        <Button
          sx={IncDecButton}
          onClick={() => AddItemToCart(itemID, item.name, item.price, item.restaurantID)}
        >
          <AddCircleIcon sx={Icon} />
        </Button>
        <Typography sx={{ marginLeft: 1 }}>{item.quantity * item.price} руб.</Typography>
      </Box>
    </Box>
  );
};

export default inject(({ clientStore }: Stores) => ({
  AddItemToCart: clientStore.addItemToCart,
  RemoveItemFromCart: clientStore.removeItemFromCart,
  cart: clientStore.cart,
}))(CartItem);
