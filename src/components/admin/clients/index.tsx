import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import CardGrid from './sub/CardGrid';
import { Stores } from '../../../types';
import SearchBlock from '../../common/SearchBlock';
import ClientForm from './sub/ClientForm';
import {AdminContentSubContainer} from '../../common/StyledComponents';

type ClientsProps = {
  clientEdit: boolean;
  clientChangeState: () => void;
};

const clientsComponent = ({ clientEdit, clientChangeState }: ClientsProps) => {
  return (
    <Box>
      {clientEdit ? (
        <>
        <ClientForm/>
        </>
      ) : (
        <>
          <SearchBlock changeAddState={clientChangeState} hasButton={false}/>
          <Box sx={AdminContentSubContainer}>
            <CardGrid />
          </Box>
        </>
      )}
    </Box>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  clientEdit: adminPanelStore.clientEdit,
  changeClientState: adminPanelStore.changeClientAdd,
}))(clientsComponent);
