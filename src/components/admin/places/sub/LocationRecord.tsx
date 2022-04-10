import { Box } from '@mui/system';
import React, { MouseEventHandler, useState } from 'react';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import { Button, Divider, IconButton, TextField, Typography } from '@mui/material';
import { locationRecord, Stores } from '../../../../types';
import { AdminDataInputSX } from '../../../common/StyledComponents';
import { useForm, SubmitHandler } from 'react-hook-form';
import { phoneRegex } from '../../../../commons/const';
import { inject } from 'mobx-react';

type LocationRecordProps = {
  locationRecords: locationRecord[];
  index: number;
};

interface IFormInput {
  Address: string;
}

const LocationRecord = ({ locationRecords, index }: LocationRecordProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setShow(!show);
  };
  const [show, setShow] = useState(locationRecords[index].address == '');
  const onShowChange: MouseEventHandler<HTMLButtonElement> = (event) => {
    setShow(!show);
  };

  let recordValues: locationRecord = {
    address: 'Москва, Гагаринский переулок, 24/7с1',
  };
  if (index != undefined) {
    recordValues = locationRecords[index];
  }

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1 }}>
        <Box sx={{ display: 'flex', width: '80%' }}>
          {!show && (
            <>
              <Typography variant="subtitle1">Адрес: {recordValues.address}</Typography>
            </>
          )}
          {show && (
            <form style={{ width: '100%', display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                sx={{ ...AdminDataInputSX, ...{ flex: 1 } }}
                defaultValue={recordValues.address}
                placeholder="Адрес"
                {...register('Address', { required: true })}
              />
              <IconButton type="submit">
                <CheckIcon sx={{ color: 'green' }} />
              </IconButton>
              <IconButton onClick={onShowChange}>
                <CloseIcon sx={{ color: 'red' }} />
              </IconButton>
            </form>
          )}
        </Box>
        <Box sx={{ marginRight: 2 }}>
          {!show && (
            <IconButton onClick={onShowChange}>
              <EditIcon sx={{ color: 'gray' }} />
            </IconButton>
          )}
          <IconButton sx={{ marginLeft: 1 }}>
            <DeleteIcon sx={{ color: 'red' }} />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default inject(({adminPanelStore}: Stores) => ({
  locationRecords: adminPanelStore.newPlace.locationRecords
}))(LocationRecord);
