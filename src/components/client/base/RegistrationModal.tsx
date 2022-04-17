import { Button, Modal, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { Stores, userData } from '../../../types';
import { emailRegex, letterRegex, numbRegex, phoneRegex } from '../../../commons/const';
import { DataInputSX, WhiteBaseButton } from '../../common/StyledComponents';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from '@emotion/styled';
import { registerModalContainer, AuthForm } from './sub/StyledComponents';

type AuthModalProps = {
  shown: boolean;
  changeRegisterState: () => void;
  registerUser: (data: userData) => void;
};



interface IFromInput {
  Name: string;
  Surname: string;
  Phone: string;
  Email: string;
}

const RegistrationModal = ({ shown, changeRegisterState, registerUser }: AuthModalProps) => {
  const { register, handleSubmit } = useForm<IFromInput>();
  const onFormSubmit: SubmitHandler<IFromInput> = (data) => {
    const userData: userData = {
      name: data.Name,
      surname: data.Surname,
      phone: data.Phone,
      email: data.Email,
    };
    console.log(data);
    registerUser(userData);
    changeRegisterState();
  };

  return (
    <Modal
      open={shown}
      onClose={() => {
        changeRegisterState();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={registerModalContainer}>
        <Typography variant="h5">Регистрация</Typography>
        <AuthForm onSubmit={handleSubmit(onFormSubmit)}>
          <TextField
            placeholder="Имя"
            fullWidth
            sx={DataInputSX}
            {...register('Name', {
              pattern: letterRegex,
              required: true,
            })}
          />
          <TextField
            placeholder="Фамилия"
            fullWidth
            sx={DataInputSX}
            {...register('Surname', {
              pattern: letterRegex,
              required: true,
            })}
          />
          <TextField
            placeholder="Телефон"
            fullWidth
            sx={DataInputSX}
            {...register('Phone', {
              minLength: 11,
              maxLength: 12,
              pattern: phoneRegex,
              required: true,
            })}
          />
          <TextField
            placeholder="Email"
            fullWidth
            sx={DataInputSX}
            {...register('Email', {
              pattern: emailRegex,
              required: true,
            })}
          />
          <Button sx={WhiteBaseButton} type="submit">
            Зарегистрироваться
          </Button>
        </AuthForm>
      </Box>
    </Modal>
  );
};

export default inject(({ userStore }: Stores) => ({
    shown: userStore.showClientRegistration,
    changeRegisterState: userStore.changeClientRegistrationState,
    registerUser: userStore.registerUser
}))(RegistrationModal);
