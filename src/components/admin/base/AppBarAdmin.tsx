import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { orange } from '@mui/material/colors';
import { inject } from 'mobx-react';
import {Stores} from '../../../types';
import { Button } from '@mui/material';
import {useHistory} from 'react-router-dom';

type AppBarProps = {
  name: string,
  surname: string,
  deleteAccessToken: () => void,
}

const StyledLogout = {
  color: 'white',
  border: '1px solid white',
  borderRadius: '12px'
}

const drawerWidth = 240;
const AppBarAdmin = ({name, surname, deleteAccessToken}: AppBarProps) => {
  const history = useHistory();

  const handleClick = () => {
    deleteAccessToken();
    history.push('/admin/auth');
  }

  return (
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px`, bgcolor: `${orange[600]}`}} 
      >
        <Toolbar
        sx={{justifyContent: 'flex-end'}}
        >
          <Typography variant="h5" noWrap component="div" sx={{marginRight: 4}}>
            {name} {surname}
          </Typography>
          <Button sx={StyledLogout} onClick={handleClick}>Выйти</Button>
        </Toolbar>
      </AppBar>
  );
}


export default inject(({userStore}: Stores) => ({name: userStore.name, surname: userStore.surname, deleteAccessToken: userStore.deleteAccessToken}))(AppBarAdmin)