import { Grid } from '@mui/material';
import React from 'react';
import CardComponent from './PlaceCard';

const CardGrid = () => {
  return (
      <Grid container spacing={2} >
        <Grid item xs={4}>
          <CardComponent />
        </Grid>
        <Grid item xs={4}>
          <CardComponent />
        </Grid>
        <Grid item xs={4}>
          <CardComponent />
        </Grid>
      </Grid>
  );
};

export default CardGrid;
