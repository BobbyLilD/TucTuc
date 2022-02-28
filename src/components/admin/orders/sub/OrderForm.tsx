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
  Typography,
} from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form';
import ItemCard from './ItemCard';
import { StyledButton } from '../../../common/StyledComponents';
import ItemModal from './ItemModal';
import ItemModalCard from './ItemModalCard';
import { typographyVariant } from '@mui/system';

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
          }}
        >
          <Grid container columnSpacing={2} rowSpacing={2} padding={1}>
            <Grid item xs={12}>
              <Typography variant='h5'>Добавление/изменение заказа</Typography>
            </Grid>
            <Grid item xs={3}>
              <FormControl fullWidth>
                <InputLabel id="city-select-label">Город</InputLabel>
                <Select
                  {...register('City')}
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
              <FormControl fullWidth>
                <InputLabel id="place-select-label">Заведение</InputLabel>
                <Select
                  {...register('Place')}
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
            <Grid item xs={2}>
              <Input placeholder="Телефон клиента" {...register('ClientPhone')} fullWidth />
            </Grid>
            <Grid item xs={2}>
              <Input placeholder="Email клиента" {...register('ClientEmail')} fullWidth />
            </Grid>
            <Grid item xs={2}>
              <Input placeholder="Кол-во персон" {...register('Persons')} fullWidth />
            </Grid>
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
            <ItemModalCard />
            <ItemModalCard />
            <ItemModalCard />
            <ItemModalCard />
            <ItemModalCard />
            <ItemModalCard />
            <ItemModalCard />
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
