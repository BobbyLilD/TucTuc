import { Paper, Box, Typography, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { locationRecord, NewRestaurantEntityAdmin, Stores } from '../../../../types';
import LocationRecord from './LocationRecord';
import { observer } from 'mobx-react-lite';
import { inject } from 'mobx-react';

type LocationsRecordsListProps = {
  newPlaceEntity: NewRestaurantEntityAdmin;
  addLocationRecord: () => void;
};

const LocationRecordsList = observer(
  ({ newPlaceEntity, addLocationRecord }: LocationsRecordsListProps) => {

    return (
      <Paper elevation={2} sx={{ width: '100%', marginBottom: 2, paddingX: 2, paddingY: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            Адреса филлиалов
          </Typography>
          <IconButton onClick={addLocationRecord}>
            <AddCircleOutlineIcon sx={{ color: 'green' }} />
          </IconButton>
        </Box>
        {newPlaceEntity != undefined &&
          newPlaceEntity.locationRecords.map((value, index) => (
            <LocationRecord index={index} key={index} showForm={value.id == undefined}/>
          ))}
      </Paper>
    );
  },
);

export default inject(({ adminPanelStore }: Stores) => ({
  newPlaceEntity: adminPanelStore.newPlace,
  addLocationRecord: adminPanelStore.addLocationRecordToNewPlace,
}))(LocationRecordsList);
