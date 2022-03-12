import { Button, Divider, Paper, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Order, Stores, userData } from '../../../types';
import Footer from '../base/Footer';
import InfoForm from './sub/InfoForm';
import OrderCard from './sub/OrderCard';
import OrderList from './sub/OrderList';
import { useHistory } from 'react-router-dom';
import { OrangeBaseButton, WhiteBaseButton } from '../../common/StyledComponents';

const containerWidth = 450;

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
  userData: userData;
  getUserInfo: () => void;
  getOrderListPreview: () => void;
  orderList: Order[];
};

const ProfileComponent = ({
  orderListShow,
  changeOrderState,
  infoFormShow,
  changeFormState,
  deleteAccessToken,
  userData,
  getUserInfo,
  getOrderListPreview,
  orderList
}: ProfileComponentProps) => {
  useEffect(() => {
    getUserInfo();
    getOrderListPreview();
  }, []);

  let history = useHistory();
  const logout = () => {
    deleteAccessToken();
    history.push('/restaurants');
  };

  let orderCards: JSX.Element[] = [];
  if (orderList != undefined){
    for(let i = 0; i < orderList.length; i++){
      orderCards.push(
        <OrderCard index={i}/>
      )
    }
  }

  return (
    <>
      <Box sx={{ paddingX: '18%' }}>
        {!orderListShow && !infoFormShow && (
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
                  Имя: {userData != undefined && `${userData.name} ${userData.surname}`}
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'gray' }}>
                  Номер телефона: {userData != undefined && userData.phone}
                </Typography>
                <Typography variant="subtitle2" sx={{ marginBottom: 1, color: 'gray' }}>
                  E-mail: {userData != undefined && userData.email}
                </Typography>
                <Box sx={{ display: 'flex', marginTop: 1, width: '100%' }}>
                  <Button sx={WhiteBaseButton} onClick={changeFormState}>
                    Редактировать
                  </Button>
                  <Button sx={OrangeBaseButton} onClick={logout}>
                    {' '}
                    Выйти
                  </Button>
                </Box>
              </Paper>
              <Paper elevation={4} sx={PaperBase}>
                <Typography variant="h6" fontWeight={600}>
                  История заказов
                </Typography>
                {orderCards}
                <Button onClick={changeOrderState} sx={MoreButton}>
                  Показать еще
                </Button>
              </Paper>
            </Box>
          </>
        )}
        {orderListShow && <OrderList />}
        {infoFormShow && <InfoForm />}
      </Box>
      <Footer paddingPercentage={18} />
    </>
  );
};

export default inject(({ clientStore, userStore }: Stores) => ({
  orderListShow: clientStore.showOrderList,
  changeOrderState: clientStore.changeShowOrderList,
  infoFormShow: clientStore.showInfoForm,
  changeFormState: clientStore.changeShowInfoForm,
  deleteAccessToken: userStore.deleteAccessToken,
  userData: userStore.userData,
  getUserInfo: userStore.getUserInfo,
  getOrderListPreview: clientStore.getOrderListPreview,
  orderList: clientStore.orderList,
}))(ProfileComponent);
