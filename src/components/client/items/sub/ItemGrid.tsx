import { Box, Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Item, Restaurant, Stores } from '../../../../types';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';

type ItemGridProps = {
  restaurants: Map<string, Restaurant>;
};

const ItemGrid = ({ restaurants }: ItemGridProps) => {
  let { id } = useParams();
  console.log(id);

  let cards = [];
  for (let value of restaurants.get(id).items) {
    cards.push(
      <Grid item xs={4}>
        <ItemCard item={value} restaurantID={id}/>
      </Grid>,
    );
  }

  return (
    <Box sx={{ paddingX: '14%', marginY: 5 }}>
      <Grid container width="100%" columnSpacing={4} rowSpacing={5}>
        {cards}
      </Grid>
    </Box>
  );
};

export default inject(({ restaurantsStore }: Stores) => ({
  restaurants: restaurantsStore.resultingList,
}))(ItemGrid);
