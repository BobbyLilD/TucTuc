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

type AuthModalProps = {
  shown: boolean;
  changeRegisterState: () => void;
  registerUser: (data: userData) => void;
};

const modalContainer = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '400px',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 4,
  paddingY: 2,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
};

const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
  flex: 1;
`;

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
      <Box sx={modalContainer}>
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
