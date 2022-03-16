import { Grid } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Item, Stores } from '../../../../types';
import { ItemInAdminGrid } from '../../../common/StyledComponents';
import CardComponent from './Card';

type CardGridProps = {
  itemsList: Item[];
  getItems: () => void;
};

const CardGrid = ({ itemsList, getItems }: CardGridProps) => {
  useEffect(() => {
    getItems();
  }, []);

  let cards: JSX.Element[] = [];
  if (itemsList != undefined) {
    for (let i = 0; i < itemsList.length; i++) {
      cards.push(
        <Grid item xs={4} sx={ItemInAdminGrid}>
          <CardComponent index={i} />
        </Grid>,
      );
    }
  }
  return (
    <Grid container rowSpacing={3}>
      {cards}
    </Grid>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  itemsList: adminPanelStore.itemsList,
  getItems: adminPanelStore.getItems,
}))(CardGrid);
