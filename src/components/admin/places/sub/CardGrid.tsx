import { Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { RestaurantAdmin, Stores } from '../../../../types';
import CardComponent from './PlaceCard';

type CardGridProps = {
  placesList: RestaurantAdmin[];
  getPlaces: () => void;
};

const CardGrid = ({ placesList, getPlaces }: CardGridProps) => {
  useEffect(() => {
    getPlaces();
  }, []);

  return (
    <Grid container spacing={2}>
      {placesList != undefined &&
        placesList.map((value, index) => (
          <Grid item key={value.id} xs={3} >
            <CardComponent index={index} />
          </Grid>
        ))}
    </Grid>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  placesList: adminPanelStore.placesList,
  getPlaces: adminPanelStore.getPlaces,
}))(CardGrid);
