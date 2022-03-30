import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { NavLink } from 'react-router-dom';
import { AdminComponents } from '../../../commons/const';
import styled from '@emotion/styled';
const drawerWidth = 240;

const StyledNavLink = styled(NavLink)`
text-decoration: none;
color: black;
font-weight: 600;`;

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
          <StyledNavLink key={key} to={AdminComponents[key][0]} >
            <ListItem button >
              <ListItemText primary={key} />
            </ListItem>
          </StyledNavLink>
        ))}
      </List>
    </Drawer>
  );
}
