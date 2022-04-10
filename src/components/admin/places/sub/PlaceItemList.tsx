import { Paper, Typography, Box } from '@mui/material';
import { inject } from 'mobx-react';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { Item, NewRestaurantEntityAdmin, RestaurantAdmin, Stores } from '../../../../types';
import ItemCard from './ItemCard';

type PlaceItemListProps = {
  newPlaceEntity: NewRestaurantEntityAdmin;
};

const PlaceItemList = observer(({ newPlaceEntity }: PlaceItemListProps) => {
  return (
    <Paper
      elevation={2}
      sx={{
        width: '100%',
        marginBottom: 2,
      }}
    >
      <Typography variant="h6" sx={{ marginTop: 1, marginLeft: 2, fontWeight: 600 }}>
        Товары
      </Typography>
      <Box
        display={'flex'}
        flexDirection={'row'}
        justifyContent={'start'}
        width={'inherit'}
        overflow={'scroll'}
        padding={2}
        paddingTop={1}
      >
        {newPlaceEntity!= undefined && newPlaceEntity.items.map((value,index) => <ItemCard index={index} key={index} />)}
      </Box>
    </Paper>
  );
});

export default inject(({ adminPanelStore }: Stores) => ({
  newPlaceEntity: adminPanelStore.newPlace,
}))(PlaceItemList);
