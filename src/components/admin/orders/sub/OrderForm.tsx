import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import { AdminDataInputSX, StyledButton, ListSelectSX } from '../../../common/StyledComponents';
import ItemModal from './ItemModal';
import ItemModalCard from './ItemModalCard';
import OrderItemCard from './OrderItemCard';
import { emailRegex, numbRegex, phoneRegex } from '../../../../commons/const';

interface IFromInput {
  City: string;
  Place: string;
  ClientPhone: string;
  ClientEmail: string;
  Persons: number;
  Items: [];
}

type OrderFormProps = {
  orderAdd: boolean;
  changeOrderState: () => void;
  itemAdd: boolean;
  changeItemState: () => void;
};

const OrderForm = ({ orderAdd, changeOrderState, itemAdd, changeItemState }: OrderFormProps) => {
  const { register, handleSubmit } = useForm<IFromInput>();
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data);

  const [place, setPlace] = React.useState('');
  const handlePlaceChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
  };

  const [city, setCity] = React.useState('');
  const handleCityChange = (event: SelectChangeEvent) => {
    setCity(event.target.value as string);
  };

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
                <InputLabel id="city-select-label">Город</InputLabel>
                <Select
                  {...register('City', { required: true })}
                  labelId="city-select-label"
                  id="city-select"
                  value={city}
                  label="Город"
                  onChange={handleCityChange}
                  sx={{}}
                >
                  <MenuItem value={'Moscow'}>Москва</MenuItem>
                  <MenuItem value={'St.Petersburg'}>Санкт-Петербург</MenuItem>
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
                >
                  <MenuItem value={'McDonalds'}>McDonalds</MenuItem>
                  <MenuItem value={'BurgerKing'}>Burger King</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid xs={6}></Grid>
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
            <Grid xs={4}></Grid>
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
            <OrderItemCard />
            <OrderItemCard />
            <OrderItemCard />
            <OrderItemCard />
            <OrderItemCard />
            <OrderItemCard />
            <OrderItemCard />
            <OrderItemCard />
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
}))(OrderForm);
