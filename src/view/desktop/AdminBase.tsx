import React from 'react';
import { Switch, Route } from 'react-router-dom';
import PermanentDrawerLeft from '../../components/admin/base/PermanentDrawerLeftExperimental';
import { Box } from '@mui/system';
import { CssBaseline, Toolbar } from '@mui/material';
import AppBarAdmin from '../../components/admin/base/AppBarAdmin';
import { AdminComponents } from '../../commons/const';

const AdminBase = (props) => {
  return (
      <Box sx={{ display: 'flex'}}>
        <CssBaseline />
        <AppBarAdmin />
        <PermanentDrawerLeft />
        <Box component="main" sx={{ flexGrow: 1, bgcolor: 'background.default', p: 1, height: 'calc(100vh)', overflow: 'scroll'}}>
          <Toolbar />
          <Switch>
          {Object.keys(AdminComponents).map((key) => (
              <Route path={AdminComponents[key][0]} component={AdminComponents[key][1]} loggedIn={props.loggedIn}/>
          ))}
          </Switch>
        </Box>
      </Box>
  );
};

export default AdminBase;
