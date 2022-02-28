import { Grid } from '@mui/material';
import React from 'react';
import CardComponent from './Card';

const CardGrid = () => {
  return (
      <Grid container spacing={2}>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent />
        </Grid>
        <Grid item xs={4} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent />
        </Grid>
      </Grid>
  );
};

export default CardGrid;
