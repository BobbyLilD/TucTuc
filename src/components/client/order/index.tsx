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
import { Box } from '@mui/system';
import React from 'react';
import Footer from '../base/Footer';
import { useForm } from 'react-hook-form';
import { phoneRegex } from '../../../commons/const';
import { DataInputSX } from '../../common/StyledComponents';
import {useHistory} from 'react-router-dom';
import { Order, Stores } from '../../../types';
import { inject } from 'mobx-react';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';


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



const CommentInputSX = {
  '.MuiOutlinedInput-root': {
    minHeight: 150,
    height: 'fit-content',
    alignItems: 'start',
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
};

const orderBtn = {
  bgcolor: 'orange',
  color: 'white',
  textTransform: 'none',
  paddingX: 6,
  paddingY: 1,
  marginTop: 2,
  ':hover': {
    bgcolor: 'orange',
  },
};

interface IFormInput {
  name: string;
  surname: string;
  phone: string;
  address: string;
  flat: string;
  floor: number;
  entranceCode: string;
  entranceNum: string;
  promocode: string;
  paymentMethod: string;
  comment: string;
}

type OrderComponentProps = {
  name: string;
  surname: string;
  phone: string;
  newOrder: Order;
};

const OrderComponent = ({ name, surname, phone, newOrder }: OrderComponentProps) => {
  const history = useHistory();
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit = (data) => console.log(data);

  return (
    <>
      <Box sx={orderContainer}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Button sx={BackBtn} onClick={history.goBack}>
            <ArrowBackIosIcon/> ??????????
          </Button>
          <Typography variant="h5" fontWeight={600} sx={{ marginBottom: 4 }}>
            ???????????????????? ????????????
          </Typography>
          <Grid container width={'inherit'} columnSpacing={3} rowSpacing={2}>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="??????????????"
                value={name}
                fullWidth
                sx={DataInputSX}
                {...register('name', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="??????"
                value={surname}
                fullWidth
                sx={DataInputSX}
                {...register('surname', { required: true })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="?????????? ??????. ????????????????"
                value={phone}
                fullWidth
                sx={DataInputSX}
                {...register('phone', { required: true, pattern: phoneRegex })}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                placeholder="?????????? ????????????????"
                fullWidth
                sx={DataInputSX}
                {...register('address', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="????/????????"
                fullWidth
                sx={DataInputSX}
                {...register('flat', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="??????????????"
                fullWidth
                sx={DataInputSX}
                {...register('entranceCode', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="??????????????"
                fullWidth
                sx={DataInputSX}
                {...register('entranceNum', { required: true })}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                placeholder="????????"
                fullWidth
                sx={DataInputSX}
                {...register('floor', { required: true })}
              />
            </Grid>
            <Grid item xs={6} sx={{ marginTop: 3 }}>
              <TextField
                variant="outlined"
                placeholder="????????????????"
                fullWidth
                sx={DataInputSX}
                {...register('promocode', { required: true })}
              />
            </Grid>
          </Grid>
          <FormControl
            sx={{ marginTop: 3, width: '100%', paddingRight: 2 }}
            {...(register('paymentMethod'), { required: true, defaultValue: '?????????????????? ??????????????' })}
          >
            <FormLabel
              id="group-label"
              sx={{ color: 'black', fontWeight: 600, '&.Mui-focused': { color: 'black' } }}
            >
              ????????????:
            </FormLabel>
            <RadioGroup
              aria-labelledby="group-label"
              defaultValue="??????????????????"
              name="radio-buttons-group"
            >
              <FormControlLabel
                value="??????????????????"
                control={<Radio />}
                label="??????????????????"
                sx={RadioSX}
              />
              <FormControlLabel value="????????????" control={<Radio />} label="????????????" sx={RadioSX} />
              <FormControlLabel
                value="???????????? ??????????????"
                control={<Radio />}
                label="???????????? ??????????????"
                sx={RadioSX}
              />
            </RadioGroup>
            </FormControl>
            <FormLabel id="comment-label" sx={{ fontWeight: 600, color: 'black', marginTop: 4, marginBottom: 2 }}>
              ??????????????????????:
            </FormLabel>
            <TextField
              {...register('comment')}
              aria-labelledby="comment-label"
              variant="outlined"
              multiline
              fullWidth
              sx={CommentInputSX}
            />
          <Typography variant="subtitle1" marginTop={2}>
            ??????????????????: {newOrder.orderSum - newOrder.deliveryPrice} ??????.
          </Typography>
          <Typography variant="subtitle1">????????????????: {newOrder.deliveryPrice} ??????.</Typography>
          <Typography variant="subtitle1" fontWeight={600}>
            ?? ????????????: {newOrder.orderSum} ??????.
          </Typography>
          <Button sx={orderBtn} type="submit">
            ???????????????? ??????????
          </Button>
        </form>
      </Box>
      <Footer paddingPercentage={22} />
    </>
  );
};

export default inject(({clientStore}: Stores) => ({
  newOrder: clientStore.newOrder
}))(OrderComponent);
