import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import CardGrid from './sub/CardGrid';
import CityForm from './sub/CityForm';
import { Stores } from '../../../types';
import SearchBlock from '../../common/SearchBlock';
import { AdminContentSubContainer } from '../../common/StyledComponents';

type CitiesProps = {
  cityAdd: boolean;
  changeCityAdd: () => void;
};

const citiesComponent = ({ cityAdd, changeCityAdd }: CitiesProps) => {
  return (
    <Box>
      {cityAdd ? (
        <CityForm />
      ) : (
        <>
          <SearchBlock changeAddState={changeCityAdd}/>
          <Box sx={AdminContentSubContainer}>
            <CardGrid />
          </Box>
        </>
      )}
    </Box>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  cityAdd: adminPanelStore.cityAdd,
  changeCityAdd: adminPanelStore.changeCityAdd,
}))(citiesComponent);
