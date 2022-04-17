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
    // const [locationRecords, setLocationRecords] = useState<locationRecord[]>(new Array());
    // useEffect(() => {
    //   console.log('getting records')
    //   if (newPlaceEntity != undefined) {
    //     setLocationRecords(newPlaceEntity.locationRecords);
    //   }
    //   // console.log('getting records' + newPlaceEntity.locationRecords.length)
    //   // console.log('got records' + locationRecords.length)
    // }, [newPlaceEntity.locationRecords]);

    // if (newPlaceEntity != undefined) {
    //   setLocationRecords(newPlaceEntity.locationRecords);
    // }

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
        {/* {locationRecords.map((value, index) => (
          <LocationRecord index={index} key={index}/>
        ))} */}
        {newPlaceEntity != undefined && newPlaceEntity.locationRecords.length}
        {newPlaceEntity != undefined &&
          newPlaceEntity.locationRecords.map((value, index) => (
            <LocationRecord index={index} key={index} />
          ))}
      </Paper>
    );
  },
);

export default inject(({ adminPanelStore }: Stores) => ({
  newPlaceEntity: adminPanelStore.newPlace,
  addLocationRecord: adminPanelStore.addLocationRecordToNewPlace,
}))(LocationRecordsList);
