import { Button, Divider, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../types';
import Footer from '../base/Footer';
import InfoForm from './sub/InfoForm';
import OrderCard from './sub/OrderCard';
import OrderList from './sub/OrderList';
import {useHistory} from 'react-router-dom';

const containerWidth = 450;

const OrangeBaseButton = {
  bgcolor: 'orange',
  color: 'white',
  ':hover': {
    bgcolor: 'orange',
  },
  minWidth: 150,
  textTransform: 'none',
  fontWeight: 600,
};

const WhiteBaseButton = {
  bgcolor: 'white',
  color: 'orange',
  border: '1px solid orange',
  marginRight: 2,
  textTransform: 'none',
  paddingX: 3,
  fontWeight: 600,
  ":hover" : {
      bgcolor: 'transparent'
  }
};

const MoreButton = { ...OrangeBaseButton, ...{ marginX: 'auto' } };

const PaperBase = {
  display: 'flex',
  flexDirection: 'column',
  width: containerWidth,
  p: 2,
  alignItems: 'start',
};

type ProfileComponentProps = {
  orderListShow: boolean;
  changeOrderState: () => void;
  infoFormShow: boolean;
  changeFormState: () => void;
  deleteAccessToken: () => void;
  name: string;
  surname: string;
  phone: string;
  email: string;
};

const ProfileComponent = ({ orderListShow, changeOrderState, infoFormShow, changeFormState, deleteAccessToken, name, surname, email, phone }: ProfileComponentProps) => {
  let history = useHistory();
  const logout = () => {
    deleteAccessToken();
    history.push('/restaurants');
  }

  return (
    <>
      <Box sx={{ paddingX: '18%' }}>
        {(!orderListShow && !infoFormShow) && (
          <>
            <Typography variant="h4" fontWeight={600} sx={{ marginTop: 6, marginBottom: 2 }}>
              Личный кабинет
            </Typography>
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                alignItems: 'start',
                justifyContent: 'space-between',
              }}
            >
              <Paper elevation={4} sx={PaperBase}>
                <Typography variant="h6" fontWeight={600} sx={{ marginBottom: 1 }}>
                  Личные данные
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'gray' }}>
                  Имя: {`${name} ${surname}`}
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'gray' }}>
                  Номер телефона: {phone}
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'gray' }}>
                  E-mail: {email}
                </Typography>
                <Box sx={{ display: 'flex', marginTop: 1, width: '100%' }}>
                  <Button sx={WhiteBaseButton} onClick={changeFormState}>Редактировать</Button>
                  <Button sx={OrangeBaseButton} onClick={logout}> Выйти</Button>
                </Box>
              </Paper>
              <Paper elevation={4} sx={PaperBase}>
                <Typography variant="h6" fontWeight={600}>
                  История заказов
                </Typography>
                <OrderCard />
                <OrderCard />
                <Button onClick={changeOrderState} sx={MoreButton}>
                  Показать еще
                </Button>
              </Paper>
            </Box>
          </>
        )}
        {orderListShow && <OrderList />}
        {infoFormShow && <InfoForm/>}
      </Box>
      <Footer paddingPercentage={18} />
    </>
  );
};

export default inject(({ clientStore,userStore }: Stores) => ({
  orderListShow: clientStore.showOrderList,
  changeOrderState: clientStore.changeShowOrderList,
  infoFormShow: clientStore.showInfoForm,
  changeFormState: clientStore.changeShowInfoForm,
  deleteAccessToken: userStore.deleteAccessToken,
  name: userStore.name,
  surname: userStore.surname,
  phone: userStore.phoneNum,
  email: userStore.email
}))(ProfileComponent);
