import { Box, Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Item, Stores } from '../../../../types';
import ItemCard from './ItemCard';
import { useParams } from 'react-router-dom';

type ItemGridProps = {
  items: Item[];
  getItems: () => void;
};

const ItemGrid = ({ items, getItems }: ItemGridProps) => {
  let { id } = useParams();
  console.log(id);

  useEffect(() => {
    getItems()
  }, [])

  let cards = [];
  for (let value of items) {
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
  items: restaurantsStore.itemsList,
  getItems: restaurantsStore.getItems
}))(ItemGrid);
