import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import CardGrid from './sub/CardGrid';
import { Stores } from '../../../types';
import SearchBlock from '../../common/SearchBlock';
import ItemAddDrawer from './sub/ItemAddDrawer';
import {AdminContentSubContainer} from '../../common/StyledComponents';


type ItemsProps = {
  itemAdd: boolean;
  changeItemState: () => void;
};

const itemsComponent = ({ itemAdd, changeItemState }: ItemsProps) => {
  return (
    <Box>
      <SearchBlock changeAddState={changeItemState} />
      <Box sx={AdminContentSubContainer}>
        <CardGrid />
      </Box>
      {itemAdd ? <ItemAddDrawer /> : <></>}
    </Box>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  itemAdd: adminPanelStore.itemAddToPlace,
  changeItemState: adminPanelStore.changeItemAdd,
}))(itemsComponent);
