import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { inject, observer } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import {
  City,
  Item,
  OrderAdmin,
  RestaurantAdmin,
  Stores,
  locationRecord,
  Address,
} from '../../../../types';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { AdminDataInputSX, StyledButton, ListSelectSX } from '../../../common/StyledComponents';
import ItemModal from './ItemModal';
import OrderItemCard from './OrderItemCard';
import { emailRegex, numbRegex, phoneRegex } from '../../../../commons/const';

interface IFromInput {
  status: string;
  place: string;
  phone: string;
  email: string;
  servings: number;
  destAddress: Address;
  location: string;
}

type OrderFormProps = {
  changeOrderState: () => void;
  changeItemState: () => void;
  newOrder: OrderAdmin;
  itemsList: Item[];
  selectedItem: number;
  ordersList: OrderAdmin[];
  getItemsByIDList: (IDs: string[]) => void;
  placesList: RestaurantAdmin[];
  itemsInOrder: Map<string, Item>;
  selectOrderPlace: (id: string) => void;
  locationRecordsList: locationRecord[];
  initOrder: () => void;
};

const OrderForm = observer(({
  changeOrderState,
  changeItemState,
  newOrder,
  selectedItem,
  ordersList,
  getItemsByIDList,
  placesList,
  itemsInOrder,
  locationRecordsList,
  selectOrderPlace,
  initOrder
}: OrderFormProps) => {
  const { register, handleSubmit, reset } = useForm<IFromInput>();
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data);

  const [place, setPlace] = React.useState('');
  const handlePlaceChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
    selectOrderPlace(event.target.value);
  };

  const [status, setStatus] = React.useState('');
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
  };

  const [location, setLocation] = useState('');

  const statusList = ['В обработке', 'Готовится', 'В пути', 'Доставлен'];

  useEffect(() => {reset({...newOrder});},[newOrder]);

  return (
    <>
      <ItemModal />
      <Box paddingX={2}>
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 2,
            marginTop: 2,
            p: 2,
          }}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container columnSpacing={2} rowSpacing={2} padding={1}>
              <Grid item xs={12}>
                <Typography variant="h5">Добавление/изменение заказа</Typography>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth sx={ListSelectSX}>
                  <InputLabel id="city-select-label">Статус</InputLabel>
                  <Select
                    {...register('status', { required: true })}
                    labelId="city-select-label"
                    id="city-select"
                    value={status}
                    label="Статус"
                    onChange={handleStatusChange}
                    defaultValue=""
                  >
                    {statusList.map((value) => (
                      <MenuItem value={value}>{value}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth sx={ListSelectSX}>
                  <InputLabel id="place-select-label">Заведение</InputLabel>
                  <Select
                    {...register('place', { required: true })}
                    labelId="place-select-label"
                    id="place-select"
                    value={place}
                    label="Заведение"
                    onChange={handlePlaceChange}
                    defaultValue=""
                  >
                    {placesList.map((value) => (
                      <MenuItem value={value.id}>{value.name}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}>
                <FormControl fullWidth sx={ListSelectSX}>
                  <InputLabel id="location-select-label">Филлиал</InputLabel>
                  <Select
                    disabled={place == ''}
                    {...register('location', { required: true })}
                    labelId="location-select-label"
                    value={location}
                    onChange={(event) => setLocation(event.target.value)}
                  >
                    {locationRecordsList != undefined &&
                      locationRecordsList.map((value) => (
                        <MenuItem value={value.id} key={value.id}>
                          {value.address}
                        </MenuItem>
                      ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={3}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Телефон клиента"
                  {...register('phone', { required: true, pattern: phoneRegex })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Email клиента"
                  {...register('email', { required: true, pattern: emailRegex })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Кол-во персон"
                  {...register('servings', { required: true, pattern: numbRegex })}
                  fullWidth
                />
              </Grid>
              <Grid item xs={4}></Grid>
              <Grid item xs={2}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Город"
                  fullWidth
                  {...register('destAddress.city', { required: true })}
                />
              </Grid>
              <Grid item xs={2}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Улица"
                  fullWidth
                  {...register('destAddress.street', { required: true })}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Дом"
                  fullWidth
                  {...register('destAddress.house', { required: true })}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                sx={AdminDataInputSX}
                placeholder='Подъезд'
                fullWidth
                {...register('destAddress.entrance', {required: true})}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Квартира"
                  fullWidth
                  {...register('destAddress.apartment', { required: true })}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Этаж"
                  fullWidth
                  {...register('destAddress.floor', { required: true, pattern: numbRegex })}
                />
              </Grid>
              <Grid item xs={1}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Код"
                  fullWidth
                  {...register('destAddress.intercom', { required: true })}
                />
              </Grid>
              <Grid item xs={3}></Grid>
              <Grid item xs={2}>
                <Button sx={StyledButton} onClick={changeItemState}>
                  Добавить товар
                </Button>
              </Grid>
              <Grid item xs={2}>
                <Button sx={StyledButton} type="submit">
                  Сохранить
                </Button>
              </Grid>
              <Grid item xs={7}></Grid>
              <Grid item xs={1}>
                <Button sx={StyledButton} onClick={() =>{changeOrderState(); initOrder(); reset();}}>
                  Выйти
                </Button>
              </Grid>
            </Grid>
          </form>
        </Paper>
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'start',
            width: '100%',
            marginBottom: 2,
          }}
        >
          <Box
            display={'flex'}
            flexDirection={'row'}
            justifyContent={'start'}
            width={'80vw'}
            overflow={'scroll'}
            padding={2}
          >
            {itemsInOrder != undefined &&
              Array.from(itemsInOrder.keys()).map((value) => <OrderItemCard id={value} />)}
          </Box>
        </Paper>
      </Box>
    </>
  );
})

export default inject(({ adminPanelStore }: Stores) => ({
  orderAdd: adminPanelStore.orderAdd,
  changeOrderState: adminPanelStore.changeOrderAdd,
  itemAdd: adminPanelStore.itemAddToPlace,
  changeItemState: adminPanelStore.changeItemAdd,
  selectedItem: adminPanelStore.selectedItem,
  ordersList: adminPanelStore.ordersList,
  getItemsByIDList: adminPanelStore.getItemsByIDs,
  placesList: adminPanelStore.placesList,
  citiesList: adminPanelStore.citiesList,
  itemsInOrder: adminPanelStore.itemsInOrder,
  selectOrderPlace: adminPanelStore.selectOrderPlace,
  locationRecordsList: adminPanelStore.locationrecordsList,
  initOrder: adminPanelStore.initOrder,
  newOrder: adminPanelStore.newOrder
}))(OrderForm);
