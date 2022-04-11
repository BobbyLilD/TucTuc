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
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { City, Item, OrderAdmin, RestaurantAdmin, Stores } from '../../../../types';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { AdminDataInputSX, StyledButton, ListSelectSX } from '../../../common/StyledComponents';
import ItemModal from './ItemModal';
import OrderItemCard from './OrderItemCard';
import { emailRegex, numbRegex, phoneRegex } from '../../../../commons/const';

interface IFromInput {
  Status: string;
  Place: string;
  ClientPhone: string;
  ClientEmail: string;
  Persons: number;
  Items: [];
}

type OrderFormProps = {
  changeOrderState: () => void;
  changeItemState: () => void;
  newOrder: OrderAdmin;
  itemsList: Item[];
  initOrder: () => void;
  selectedItem: number;
  ordersList: OrderAdmin[];
  getItemsByIDList: (IDs: string[]) => void;
  // citiesList: City[];
  placesList: RestaurantAdmin[];
  itemsInOrder: Map<string,Item>;
  // selectOrderCity: (id: string) => void;
  selectOrderPlace: (id: string) => void;
};

const OrderForm = ({
  changeOrderState,
  changeItemState,
  newOrder,
  initOrder,
  selectedItem,
  ordersList,
  getItemsByIDList,
  // citiesList,
  placesList,
  itemsInOrder,
  // selectOrderCity,
  selectOrderPlace
}: OrderFormProps) => {
  const { register, handleSubmit } = useForm<IFromInput>();
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data);

  const [place, setPlace] = React.useState('');
  const handlePlaceChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
    selectOrderPlace(event.target.value);
  };

  const [status, setStatus] = React.useState('');
  const handleStatusChange = (event: SelectChangeEvent) => {
    setStatus(event.target.value as string);
    // selectOrderCity(event.target.value);
  };

  useEffect(() => {
    initOrder();
  }, []);

  const statusList = ['В обработке', 'Готовится', 'В пути', 'Доставлен']

  //BUILD CARD LIST
  let cards: JSX.Element[] = [];
  if (selectedItem != undefined) {
    newOrder = ordersList[selectedItem];
    let IDs: string[] = [];
    for (let i of newOrder.items.keys()) {
      IDs.push(i);
    }
    getItemsByIDList(IDs);
  }

  if (itemsInOrder != undefined) {
    for (let key of itemsInOrder.keys()) {
      cards.push(<OrderItemCard id={key} />);
    }
  }

  //BUILD CITY LIST
  // let cityMenuItems: JSX.Element[] = [];
  // for(let i = 0; i < citiesList.length; i++){
  //   cityMenuItems.push(
  //     <MenuItem value={citiesList[i].id}>{citiesList[i].name}</MenuItem>
  //   )
  // }

  //BUILD PLACE LIST
  let placeMenuItems: JSX.Element[] = [];
  for(let i = 0; i < placesList.length; i++){
    placeMenuItems.push(
      <MenuItem value={placesList[i].id}>{placesList[i].name}</MenuItem>
    )
  }

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
          <Grid container columnSpacing={2} rowSpacing={2} padding={1}>
            <Grid item xs={12}>
              <Typography variant="h5">Добавление/изменение заказа</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth sx={ListSelectSX}>
                <InputLabel id="city-select-label">Статус</InputLabel>
                <Select
                  {...register('Status', { required: true })}
                  labelId="city-select-label"
                  id="city-select"
                  value={status}
                  label="Статус"
                  onChange={handleStatusChange}
                  defaultValue=''
                >
                  {/* {cityMenuItems} */}
                  {statusList.map((value) => <MenuItem value={value}>{value}</MenuItem> )}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth sx={ListSelectSX}>
                <InputLabel id="place-select-label">Заведение</InputLabel>
                <Select
                  {...register('Place', { required: true })}
                  labelId="place-select-label"
                  id="place-select"
                  value={place}
                  label="Заведение"
                  onChange={handlePlaceChange}
                  defaultValue=''
                >
                  {placeMenuItems}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}></Grid>
            <Grid item xs={3}>
              <TextField
                sx={AdminDataInputSX}
                placeholder="Телефон клиента"
                {...register('ClientPhone', { required: true, pattern: phoneRegex })}
                fullWidth
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                sx={AdminDataInputSX}
                placeholder="Email клиента"
                {...register('ClientEmail', { required: true, pattern: emailRegex })}
                fullWidth
              />
            </Grid>
            <Grid item xs={2}>
              <TextField
                sx={AdminDataInputSX}
                placeholder="Кол-во персон"
                {...register('Persons', { required: true, pattern: numbRegex })}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}></Grid>
            <Grid item xs={2}>
              <Button sx={StyledButton} onClick={changeItemState}>
                Добавить товар
              </Button>
            </Grid>
            <Grid item xs={2}>
              <Button sx={StyledButton}>Сохранить</Button>
            </Grid>
            <Grid item xs={7}></Grid>
            <Grid item xs={1}>
              <Button sx={StyledButton} onClick={changeOrderState}>
                Выйти
              </Button>
            </Grid>
          </Grid>
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
            {cards}
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  orderAdd: adminPanelStore.orderAdd,
  changeOrderState: adminPanelStore.changeOrderAdd,
  itemAdd: adminPanelStore.itemAddToPlace,
  changeItemState: adminPanelStore.changeItemAdd,
  initOrder: adminPanelStore.initOrder,
  selectedItem: adminPanelStore.selectedItem,
  ordersList: adminPanelStore.ordersList,
  getItemsByIDList: adminPanelStore.getItemsByIDs,
  placesList: adminPanelStore.placesList,
  citiesList: adminPanelStore.citiesList,
  itemsInOrder: adminPanelStore.itemsInOrder,
  // selectOrderCity: adminPanelStore.selectOrderCity,
  selectOrderPlace: adminPanelStore.selectOrderPlace
}))(OrderForm);
