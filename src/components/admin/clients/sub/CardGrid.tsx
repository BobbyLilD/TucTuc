import { Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Client, Stores } from '../../../../types';
import CardComponent from './Card';

type CardGridProps = {
  clientsList: Client[];
  getClients: () => void;
}

const CardGrid = ({clientsList, getClients}: CardGridProps) => {
  useEffect(() => {
    getClients();
  }, [])

  let cards: JSX.Element[] = [];
  if( clientsList != undefined){
    for(let i = 0; i < clientsList.length; i++){
      cards.push(
        <Grid item xs={3} sx={{display: 'flex', justifyContent: 'center'}}>
          <CardComponent index={i}/>
        </Grid>
      )
    }
  }

  return (
      <Grid container spacing={2}>
        {cards}
      </Grid>
  );
};

export default inject(({adminPanelStore}: Stores) => ({clientsList: adminPanelStore.clientsList,
getClients: adminPanelStore.getClients}))(CardGrid);
