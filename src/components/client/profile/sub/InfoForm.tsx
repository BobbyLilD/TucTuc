import { Box, Button, TextField } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores, userData } from '../../../../types';
import { BackBtn, OrangeBaseButton } from '../../../common/StyledComponents';
import {useForm, SubmitHandler} from 'react-hook-form';
import { emailRegex, letterRegex, phoneRegex } from '../../../../commons/const';

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
  userData: userData;
};

interface IFormInput {
  Name: string;
  Surnamge: string;
  Phone: string;
  Email: string;
}

const InfoForm = ({ changeShowForm, userData }: InfoFormProps) => {
  const {register, handleSubmit} = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = data => console.log(data);

  let userBase: userData = {name: userData.name, phone: userData.phone, email: userData.email, surname: userData.surname}

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'start' }} onSubmit={handleSubmit(onSubmit)}>
      <Button sx={BackBtn} onClick={changeShowForm}>
        {`< `} назад
      </Button>
      <TextField
        variant="outlined"
        placeholder="Имя"
        sx={DataInputSX}
        value={userData != undefined && `${userBase.name}`}
        {...register('Name', {required: true, pattern: letterRegex})}
      />
      <TextField
        variant="outlined"
        placeholder="Номер моб. телефона"
        sx={DataInputSX}
        value={userData != undefined && userBase.phone}
        {...register('Phone', {required: true, pattern: phoneRegex})}
      />
      <TextField
        variant="outlined"
        placeholder="E-mail"
        sx={DataInputSX}
        value={userData != undefined && userBase.email}
        {...register('Email', {required: true, pattern: emailRegex})}
      />
      <Button sx={SaveBtn}>Сохранить</Button>
    </Box>
  );
};

export default inject(({ clientStore, userStore }: Stores) => ({
  changeShowForm: clientStore.changeShowInfoForm,
  userData: userStore.userData
}))(InfoForm);
