import { Button, FormControl, Input, Modal, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { Stores } from '../../../types';
import { numbRegex, phoneRegex } from '../../../commons/const';
import { DataInputSX, WhiteBaseButton } from '../../common/StyledComponents';
import { useForm, SubmitHandler } from 'react-hook-form';
import styled from '@emotion/styled';
import { AuthForm, authModalContainer } from './sub/StyledComponents';

type AuthModalProps = {
  shown: boolean;
  changeAuthState: () => void;
  phoneVerified: boolean;
  setPhoneNum: (phone: string) => void;
  getAccessToken: () => void;
  changeUserRegistrationState: () => void;
};



interface IFromPhoneInput {
  Phone: string;
}

interface IFormCodeInput {
  Code: string;
}

const AuthModal = ({
  shown,
  changeAuthState,
  phoneVerified,
  setPhoneNum,
  getAccessToken,
  changeUserRegistrationState,
}: AuthModalProps) => {
  const phoneFormReturn = useForm<IFromPhoneInput>();
  const onPhoneSubmit: SubmitHandler<IFromPhoneInput> = (data) => {
    console.log(data);
    setPhoneNum(data.Phone);
  };

  const codeFormReturn = useForm<IFormCodeInput>();
  const onCodeSubmit: SubmitHandler<IFormCodeInput> = (data) => {
    console.log(data);
    getAccessToken();
    changeAuthState();
  };

  return (
    <Modal
      open={shown}
      onClose={() => {
        changeAuthState();
      }}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={authModalContainer}>
        <Typography variant="h5">Войти в личный кабинет</Typography>
        {!phoneVerified && (
          <AuthForm onSubmit={phoneFormReturn.handleSubmit(onPhoneSubmit)}>
            <TextField
              variant="outlined"
              placeholder="Номер моб. телефона"
              type="text"
              fullWidth
              sx={DataInputSX}
              {...phoneFormReturn.register('Phone', {
                maxLength: 12,
                minLength: 11,
                pattern: phoneRegex,
                required: true,
              })}
            />
            <Box sx={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
              <Button sx={WhiteBaseButton} type="submit">
                Далее
              </Button>
              <Button
                sx={{...WhiteBaseButton, ...{marginRight: 0}}}
                onClick={() => {
                  changeAuthState();
                  changeUserRegistrationState();
                }}
              >
                Регистрация
              </Button>
            </Box>
          </AuthForm>
        )}
        {phoneVerified && (
          <AuthForm onSubmit={codeFormReturn.handleSubmit(onCodeSubmit)}>
            <TextField
              variant="outlined"
              placeholder="Код из СМС"
              type="text"
              fullWidth
              sx={DataInputSX}
              {...codeFormReturn.register('Code', {
                maxLength: 6,
                minLength: 6,
                pattern: numbRegex,
                required: true,
              })}
            />
            <Button sx={WhiteBaseButton} type="submit">
              Далее
            </Button>
          </AuthForm>
        )}
      </Box>
    </Modal>
  );
};

export default inject(({ userStore }: Stores) => ({
  shown: userStore.showClientAuth,
  changeAuthState: userStore.changeClientAuthState,
  phoneVerified: userStore.phoneValid,
  setPhoneNum: userStore.setPhoneNum,
  getAccessToken: userStore.getAccessToken,
  changeUserRegistrationState: userStore.changeClientRegistrationState,
}))(AuthModal);
