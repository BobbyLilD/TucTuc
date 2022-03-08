import { Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Admin, Stores } from '../../../../types';
import CardComponent from './Card';

type CardGridProps = {
  getAdminsList: () => void;
  adminsList: Admin[];
};

const CardGrid = ({ adminsList, getAdminsList }: CardGridProps) => {
  useEffect(() => {
    getAdminsList();
  }, []);

  let items = [];

  for (let i = 0; i < adminsList.length; i++) {
    items.push(
      <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
        <CardComponent itemKey={i} />
      </Grid>,
    );
  }

  return (
    <Grid container spacing={2}>
      {items}
    </Grid>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  adminsList: adminPanelStore.adminsList,
  getAdminsList: adminPanelStore.getAdmins,
}))(CardGrid);
