import { Grid } from '@mui/material';
import React from 'react';
import CardComponent from './Card';
import { ItemInAdminGrid } from '../../../common/StyledComponents';

const CardGrid = () => {
  return (
      <Grid container spacing={2}>
        <Grid item xs={4} sx={ItemInAdminGrid}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={ItemInAdminGrid}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={ItemInAdminGrid}>
          <CardComponent />
        </Grid>
      </Grid>
  );
};

export default CardGrid;
