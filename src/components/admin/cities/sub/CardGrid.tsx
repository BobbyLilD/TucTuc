import { Grid } from '@mui/material';
import React, { useEffect } from 'react';
import CardComponent from './Card';
import { ItemInAdminGrid } from '../../../common/StyledComponents';
import { City, Stores } from '../../../../types';
import { inject } from 'mobx-react';

type CardGridProps = {
  citiesList: City[];
  getCitiesList: () => void;
};

const CardGrid = ({ citiesList, getCitiesList }: CardGridProps) => {
  useEffect(() => {
    getCitiesList();
  }, []);

  let cards: JSX.Element[] = [];
  if (citiesList != undefined) {
    for (let i = 0; i < citiesList.length; i++) {
      cards.push(
        <Grid item xs={4} sx={ItemInAdminGrid}>
          <CardComponent index={i} />
        </Grid>,
      );
    }
  }

  return (
    <Grid container spacing={2}>
      {cards}
    </Grid>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  citiesList: adminPanelStore.citiesList,
  getCitiesList: adminPanelStore.getCities,
}))(CardGrid);
