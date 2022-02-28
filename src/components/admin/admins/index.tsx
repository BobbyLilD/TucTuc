import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../types';
import SearchBlock from '../../common/SearchBlock';
import AdminsForm from './sub/AdminsForm';
import CardGrid from './sub/CardGrid';
import {AdminContentSubContainer} from '../../common/StyledComponents';

type AdminsProps = {
  adminAdd: boolean;
  adminAddChange: () => void;
};

const adminsComponent = ({ adminAdd, adminAddChange }: AdminsProps) => {
  return (
    <Box>
      {adminAdd ? (
        <AdminsForm />
      ) : (
        <>
          <SearchBlock changeAddState={adminAddChange} />
          <Box sx={AdminContentSubContainer}>
            <CardGrid />
          </Box>
        </>
      )}
    </Box>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  adminAdd: adminPanelStore.adminAdd,
  adminAddChange: adminPanelStore.changeAdminAdd,
}))(adminsComponent);
