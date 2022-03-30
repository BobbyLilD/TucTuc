import { Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { RestaurantAdmin, Stores } from '../../../../types';
import CardComponent from './PlaceCard';

type CardGridProps ={ 
  placesList: RestaurantAdmin[];
  getPlaces: () => void;
}

const CardGrid = ({placesList, getPlaces}:CardGridProps) => {
  useEffect(() => {
    getPlaces();
  }, [])

  let cards: JSX.Element[] = [];
  if(placesList != undefined){
    for(let i = 0; i < placesList.length; i++){
      cards.push(
      <Grid item key={placesList[i].id} xs={3}>
        <CardComponent index={i} />
      </Grid>
      )
    }
  }

  return (
      <Grid container spacing={2} >
        {cards}
      </Grid>
  );
};

export default inject(({adminPanelStore}: Stores) => ({
  placesList: adminPanelStore.placesList,
  getPlaces: adminPanelStore.getPlaces
}))(CardGrid);
