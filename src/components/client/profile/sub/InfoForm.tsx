import { Box, Button, TextField } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { BackBtn, OrangeBaseButton } from '../../../common/StyledComponents';

const DataInputSX = {
  '.MuiOutlinedInput-root': {
    bgcolor: 'white',
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
  marginY: 1,
  minWidth: 450,
};

const SaveBtn = { ...OrangeBaseButton, ...{ marginTop: 1 } };

type InfoFormProps = {
  changeShowForm: () => void;
  name: string;
  surname: string;
  phone: string;
  email: string;
};

const InfoForm = ({ changeShowForm, name, surname, phone, email }: InfoFormProps) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }}>
      <Button sx={BackBtn} onClick={changeShowForm}>
        {`< `} назад
      </Button>
      <TextField
        variant="outlined"
        placeholder="Имя, Фамилия"
        sx={DataInputSX}
        value={`${name} ${surname}`}
      />
      <TextField
        variant="outlined"
        placeholder="Номер моб. телефона"
        sx={DataInputSX}
        value={phone}
      />
      <TextField
        variant="outlined"
        placeholder="E-mail"
        sx={DataInputSX}
        value={email}
      />
      <Button sx={SaveBtn}>Сохранить</Button>
    </Box>
  );
};

export default inject(({ clientStore, userStore }: Stores) => ({
  changeShowForm: clientStore.changeShowInfoForm,
  name: userStore.name,
  surname: userStore.surname,
  phone: userStore.phoneNum,
  email: userStore.email,
}))(InfoForm);
