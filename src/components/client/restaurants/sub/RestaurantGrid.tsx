import { Grid, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { NavLink } from 'react-router-dom';
import React from 'react';
import RestaurantCard from './RestaurantCard';
import { StyledNavLink } from '../../../common/StyledComponents';
import { Restaurant, Stores } from '../../../../types';
import { inject } from 'mobx-react';

const paddingPercentage = 22;

type RestaurantGridProps = {
  restaurants: Map<string, Restaurant>;
};

const RestaurantGrid = ({ restaurants }: RestaurantGridProps) => {
  const restItems = [];
  for (let key of restaurants.keys()) {
    restItems.push(
      <Grid item xs={4}>
        <StyledNavLink to={{ pathname: `/place/${key}` }}>
          <RestaurantCard info={restaurants.get(key)} />
        </StyledNavLink>
      </Grid>
    );
  }

  return (
    <Box sx={{ paddingX: `${paddingPercentage}%`, paddingTop: 1.5 }}>
      <Typography variant="h5">Рестораны</Typography>
      <Grid container spacing={2} sx={{ marginTop: 0.5 }}>
        {restItems}
      </Grid>
    </Box>
  );
};

export default inject(({ restaurantsStore }: Stores) => ({
  restaurants: restaurantsStore.resultingList,
}))(RestaurantGrid);