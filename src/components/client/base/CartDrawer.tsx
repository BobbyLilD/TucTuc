import {
  Button,
  Card,
  Divider,
  Drawer,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import CartItem from '../common/CartItem';
import { CartItem as cartItem, locationRecord, Stores } from '../../../types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useHistory } from 'react-router-dom';
import { IncDecButton, Icon, ListSelectSX } from '../../common/StyledComponents';

type CartDrawerProps = {
  shown: boolean;
  changeShowState: () => void;
  cart: Map<string, cartItem>;
  addServing: () => void;
  removeServing: () => void;
  servings: number;
  deliveryPrice: number;
  orderSum: number;
  locationRecords: locationRecord[];
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
    backgroundColor: 'orange',
  },
};

const LocationSelectSX = {...ListSelectSX,  ...{
  '.MuiSelect-select': {
    paddingY: 0.5
  },
  '.MuiInputBase-root':{
    ':after': {
      borderBottom: '2px solid black' 
    }
  }
}}

const CartDrawer = ({
  shown,
  changeShowState,
  cart,
  addServing,
  removeServing,
  servings,
  orderSum,
  deliveryPrice,
  locationRecords,
}: CartDrawerProps) => {
  const [location, setLocation] = useState('None');
  // let items = [];
  // for(let key of cart.keys()){
  //   items.push(
  //     <CartItem key={key} itemID={key}/>
  //   )
  // }

  let histoty = useHistory();
  const forwardOrder = () => {
    histoty.push('/order');
    changeShowState();
  };

  return (
    <Drawer open={shown} onClose={changeShowState} anchor="right">
      <Box sx={DrawerSX}>
        <Typography variant="h6" sx={{ marginX: 'auto', fontWeight: 600, marginY: 3 }}>
          Корзина
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          {Array.from(cart.keys()).map((value) => (
            <CartItem key={value} itemID={value} />
          ))}
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
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 0.5 }}>
          <Typography variant="subtitle2">Доставка</Typography>
          <Typography variant="subtitle2">{deliveryPrice} руб.</Typography>
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
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

            <Divider />
        <Typography variant='subtitle2' sx={{marginTop: 1}} >Выбрать филлиал</Typography>
        <FormControl fullWidth sx={LocationSelectSX} variant='standard'>
          <Select
            labelId="locationSelectLabel"
            value={location}
            onChange={(event) => {
              setLocation(event.target.value);
            }}
          >
            {locationRecords != undefined && locationRecords.map((value) => (
              <MenuItem value={value.id}>{value.address}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <Button sx={OrderButton} onClick={forwardOrder}>
          Оформить заказ
        </Button>
      </Box>
    </Drawer>
  );
};

export default inject(({ clientStore, restaurantsStore }: Stores) => ({
  shown: clientStore.showCart,
  changeShowState: clientStore.changeShowCart,
  cart: clientStore.cart,
  servings: clientStore.servings,
  addServing: clientStore.addServing,
  removeServing: clientStore.removeServing,
  deliveryPrice: clientStore.deliveryPrice,
  orderSum: clientStore.orderSum,
  locationRecords: restaurantsStore.locationRecordsList
}))(CartDrawer);
