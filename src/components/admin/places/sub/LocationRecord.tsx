import { Box } from '@mui/system';
import React, { MouseEventHandler, useEffect, useState } from 'react';
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
  saveChangesToLocationRecord: (data: locationRecord, index: number) => void;
  deleteLocationRecord: (index: number) => void;
  showForm: boolean;
};

interface IFormInput {
  address: string;
}

const LocationRecord = ({
  locationRecords,
  index,
  showForm,
  saveChangesToLocationRecord,
  deleteLocationRecord,
}: LocationRecordProps) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => {
    console.log(data);
    setShow(!show);
    saveChangesToLocationRecord(data, index);
    setDefaultValues(data);
  };
  const [show, setShow] = useState(showForm);

  const [defaultValues, setDefaultValues] = useState<locationRecord>({ address: '' });

  useEffect(() => {
    setDefaultValues(locationRecords[index]);
  }, []);

  useEffect(() => {
    reset(defaultValues);
  }, [defaultValues]);

  return (
    <>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', m: 1 }}>
        <Box sx={{ display: 'flex', width: '80%' }}>
          {!show && (
            <>
              <Typography variant="subtitle1">Адрес: {defaultValues.address}</Typography>
            </>
          )}
          {show && (
            <form style={{ width: '100%', display: 'flex' }} onSubmit={handleSubmit(onSubmit)}>
              <TextField
                fullWidth
                sx={{ ...AdminDataInputSX, ...{ flex: 1 } }}
                placeholder="Адрес"
                {...register('address', { required: true })}
              />
              <IconButton type="submit">
                <CheckIcon sx={{ color: 'green' }} />
              </IconButton>
              <IconButton
                onClick={() => {
                  setShow(!show);
                  reset();
                }}
              >
                <CloseIcon sx={{ color: 'red' }} />
              </IconButton>
            </form>
          )}
        </Box>
        <Box sx={{ marginRight: 2 }}>
          {!show && (
            <IconButton
              onClick={() => {
                setShow(!show);
              }}
            >
              <EditIcon sx={{ color: 'gray' }} />
            </IconButton>
          )}
          <IconButton sx={{ marginLeft: 1 }} onClick={() => deleteLocationRecord(index)}>
            <DeleteIcon sx={{ color: 'red' }} />
          </IconButton>
        </Box>
      </Box>
      <Divider />
    </>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  locationRecords: adminPanelStore.newPlace.locationRecords,
  saveChangesToLocationRecord: adminPanelStore.saveChangesToLocationRecord,
  deleteLocationRecord: adminPanelStore.deleteLocationRecord,
}))(LocationRecord);
