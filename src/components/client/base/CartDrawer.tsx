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
import { CartItem as cartItem, locationRecord, Order, Stores } from '../../../types';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useHistory } from 'react-router-dom';
import { IncDecButton, Icon, ListSelectSX } from '../../common/StyledComponents';
import { observer } from 'mobx-react-lite';
import { DrawerSX, BoxBetweenTop, BoxBetweenBottom, LocationSelectSX, OrderButton } from './sub/StyledComponents';

type CartDrawerProps = {
  shown: boolean;
  changeShowState: () => void;
  cart: Map<string, cartItem>;
  addServing: () => void;
  removeServing: () => void;
  newOrder: Order;
  locationRecords: locationRecord[];
  setLocationInOrder: (id: string) => void;
};

const CartDrawer = observer(({
  shown,
  changeShowState,
  cart,
  addServing,
  removeServing,
  newOrder,
  locationRecords,
  setLocationInOrder,
}: CartDrawerProps) => {
  const [location, setLocation] = useState('None');

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
        {newOrder != undefined && (
          <>
            <Box sx={BoxBetweenTop}>
              <Typography variant="subtitle2">Приборы</Typography>
              <Box sx={{ display: 'flex' }}>
                <Button sx={IncDecButton} onClick={removeServing}>
                  <RemoveCircleIcon sx={Icon} />
                </Button>
                <Typography variant="subtitle2">{newOrder.servings}</Typography>
                <Button sx={IncDecButton} onClick={addServing}>
                  <AddCircleIcon sx={Icon} />
                </Button>
              </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 0.5 }}>
              <Typography variant="subtitle2">Доставка</Typography>
              <Typography variant="subtitle2">{newOrder.deliveryPrice} руб.</Typography>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 5 }}>
              <Typography variant="subtitle2">Стоимость</Typography>
              <Typography variant="subtitle2">
                {newOrder.orderSum - newOrder.deliveryPrice} руб.
              </Typography>
            </Box>
            <Box sx={BoxBetweenBottom}>
              <Typography variant="subtitle2">Доставка</Typography>
              <Typography variant="subtitle2">{newOrder.deliveryPrice} руб.</Typography>
            </Box>
            <Box sx={BoxBetweenBottom}>
              <Typography variant="subtitle2">Итого</Typography>
              <Typography variant="subtitle2">{newOrder.orderSum} руб.</Typography>
            </Box>
          </>
        )}

        <Divider />
        {cart.size > 0 && (
          <>
            <Typography variant="subtitle2" sx={{ marginTop: 1 }}>
              Выбрать филлиал
            </Typography>
            <FormControl fullWidth sx={LocationSelectSX} variant="standard">
              <Select
                labelId="locationSelectLabel"
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setLocationInOrder(event.target.value);
                }}
              >
                {locationRecords != undefined &&
                  locationRecords.map((value) => (
                    <MenuItem value={value.id}>{value.address}</MenuItem>
                  ))}
              </Select>
            </FormControl>
            <Button sx={OrderButton} onClick={forwardOrder}>
              Оформить заказ
            </Button>
          </>
        )}
      </Box>
    </Drawer>
  );
})

export default inject(({ clientStore }: Stores) => ({
  shown: clientStore.showCart,
  changeShowState: clientStore.changeShowCart,
  cart: clientStore.cart,
  addServing: clientStore.addServing,
  removeServing: clientStore.removeServing,
  newOrder: clientStore.newOrder,
  locationRecords: clientStore.locationRecordsList,
  setLocationInOrder: clientStore.setLocationInOrder,
}))(CartDrawer);
