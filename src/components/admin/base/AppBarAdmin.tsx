import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';
import { inject } from 'mobx-react';
import { Stores } from '../../../types';
import { Box, Button } from '@mui/material';
import { useHistory, useLocation } from 'react-router-dom';

type AppBarProps = {
  name: string;
  surname: string;
  deleteAccessToken: () => void;
};

const StyledLogout = {
  color: 'white',
  textTransform: 'none',
  fontSize: 20,
};

const drawerWidth = 240;
const AppBarAdmin = ({ name, surname, deleteAccessToken }: AppBarProps) => {
  const history = useHistory();
  const location = useLocation();
  let title: string = '';
  if (location.pathname == '/admin/places') {
    title = 'Заведения';
  }
  if (location.pathname == '/admin/items') {
    title = 'Товары';
  }
  if (location.pathname == '/admin/clients') {
    title = 'Клиенты';
  }
  if (location.pathname == '/admin/admins') {
    title = 'Админы';
  }
  if (location.pathname == '/admin/cities') {
    title = 'Города';
  }
  if (location.pathname == '/admin/categories') {
    title = 'Категории товаров';
  }
  if (location.pathname == '/admin/orders') {
    title = 'Заказы';
  }

  const handleClick = () => {
    deleteAccessToken();
    history.push('/admin/auth');
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        width: `calc(100% - ${drawerWidth}px)`,
        ml: `${drawerWidth}px`,
        bgcolor: `${orange[600]}`,
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Typography variant='h5' fontWeight={600} sx={{marginLeft: 2}}>
          {title}
        </Typography>
        <Box sx={{display: 'flex', alignItems: 'center'}}>
          <Typography variant="h5" noWrap component="div" fontSize={20} sx={{ marginRight: 1 }}>
            {name} {surname}
          </Typography>
          <Typography variant="h5" fontSize={24}>
            |
          </Typography>
          <Button sx={StyledLogout} onClick={handleClick}>
            Выйти
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default inject(({ userStore }: Stores) => ({
  name: userStore.userData.name,
  surname: userStore.userData.surname,
  deleteAccessToken: userStore.deleteAccessToken,
}))(AppBarAdmin);
