import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { AdminComponents } from '../../../commons/const';
import { Button } from '@mui/material';
import styled from '@emotion/styled';
import { StyledButton } from '../../common/StyledComponents';
import { orange } from '@mui/material/colors';
const drawerWidth = 240;

const StyledNavLink = styled(NavLink)`
text-decoration: none;
color: black;`;

export default function PermanentDrawerLeft() {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Toolbar />
      <Divider />
      <List>
        {Object.keys(AdminComponents).map((key) => (
          <StyledNavLink to={AdminComponents[key][0]} >
            <ListItem button key={key}>
              <ListItemText primary={key}/>
            </ListItem>
          </StyledNavLink>
        ))}
      </List>
    </Drawer>
  );
}
