import {
  Button,
  FormControl,
  FormControlLabel,
  FormLabel,
  Grid,
  Radio,
  RadioGroup,
  TextField,
  Typography,
} from '@mui/material';
import { orange } from '@mui/material/colors';
import { Box } from '@mui/system';
import React from 'react';
import Footer from '../base/Footer';

const orderContainer = {
  width: 500,
  marginLeft: '22%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'start',
};

const BackBtn = {
  color: 'orange',
  ':hover': {
    backgroundColor: 'transparent',
  },
  textTransform: 'none',
  marginY: 1.5,
  fontSize: 16,
};

const RadioSX = {
  '.MuiFormControlLabel-label': {
    color: 'black',
  },
  '.MuiRadio-root': { color: 'orange', '&.Mui-checked': { color: 'orange' } },
};

const DataInputSX = {
    '.MuiOutlinedInput-root': {
        '&.Mui-focused fieldset':{
            borderColor: 'orange'
        }
    }
}

const CommentInputSX = {
    '.MuiOutlinedInput-root': {
        minHeight: 150,
        height: 'fit-content',
        alignItems: 'start',
        '&.Mui-focused fieldset': {
            borderColor: 'orange'
        }
    }
}

const orderBtn = {
    bgcolor: 'orange',
    color: 'white',
    textTransform: 'none',
    paddingX: 6,
    paddingY: 1,
    marginTop: 2,
    ':hover': {
        bgcolor: 'orange'
    }
}

const OrderComponent = () => {
  return (
    <>
      <Box sx={orderContainer}>
        <Button sx={BackBtn}>{'< '}назад</Button>
        <Typography variant="h5" fontWeight={600} sx={{ marginBottom: 4 }}>
          Оформление заказа
        </Typography>
        <Grid container width={'inherit'} columnSpacing={3} rowSpacing={2}>
          <Grid item xs={12}>
            <TextField variant="outlined" placeholder="Имя, Фамилия" fullWidth sx={DataInputSX}/>
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" placeholder="Номер моб. телефона" fullWidth sx={DataInputSX}/>
          </Grid>
          <Grid item xs={12}>
            <TextField variant="outlined" placeholder="Адрес доставки" fullWidth sx={DataInputSX}/>
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" placeholder="Кв/офис" fullWidth sx={DataInputSX}/>
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" placeholder="Домофон" fullWidth sx={DataInputSX}/>
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" placeholder="Подъезд" fullWidth sx={DataInputSX}/>
          </Grid>
          <Grid item xs={6}>
            <TextField variant="outlined" placeholder="Этаж" fullWidth sx={DataInputSX}/>
          </Grid>
          <Grid item xs={6} sx={{ marginTop: 3 }}>
            <TextField variant="outlined" placeholder="Промокод" fullWidth sx={DataInputSX}/>
          </Grid>
        </Grid>
        <FormControl sx={{ marginTop: 3, width: 'inherit', paddingRight: 2}}>
          <FormLabel
            id="group-label"
            sx={{ color: 'black', fontWeight: 600, '&.Mui-focused': { color: 'black' } }}
          >
            Оплата:
          </FormLabel>
          <RadioGroup
            aria-labelledby="group-label"
            defaultValue="Наличными"
            name="radio-buttons-group"
          >
            <FormControlLabel
              value="Наличными"
              control={<Radio />}
              label="Наличными"
              sx={RadioSX}
            />
            <FormControlLabel value="Картой" control={<Radio />} label="Картой" sx={RadioSX} />
            <FormControlLabel
              value="Картой курьеру"
              control={<Radio />}
              label="Картой курьеру"
              sx={RadioSX}
            />
          </RadioGroup>
          <FormLabel id='comment-label' sx={{fontWeight: 600, color:'black', marginTop: 2}}>Комментарий:</FormLabel>
          <TextField aria-labelledby='comment-label' variant='outlined' multiline fullWidth sx={CommentInputSX}/>
        </FormControl>
        <Typography variant='subtitle1' marginTop={2}>Стоимость: 2000 руб.</Typography>
        <Typography variant='subtitle1'>Доставка: 2000 руб.</Typography>
        <Typography variant='subtitle1' fontWeight={600}>К оплате: 4000 руб.</Typography>
        <Button sx={orderBtn}>Оформить заказ</Button>
      </Box>
      <Footer paddingPercentage={22} />
    </>
  );
};

export default OrderComponent;
