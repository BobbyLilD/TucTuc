import styled from '@emotion/styled';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { btnBorder, inputBorder } from '../../commons/colors';
import { Stores } from '../../types';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Input, Paper, TextField } from '@mui/material';
import { StyledButton, AdminDataInputSX } from '../../components/common/StyledComponents';
import { numbRegex, phoneRegex } from '../../commons/const';
import { useForm, SubmitHandler } from 'react-hook-form';

type AdminAuthProps = {
  messageCode: string;
  phoneValid: boolean;
  getAccessToken: () => void;
  setMessageCode: () => void;
  setPhoneNum: (phone: string) => void;
};

const Base = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputSX = { ...AdminDataInputSX, ...{ marginBottom: 2 } };

interface IFromPhoneInput {
  Phone: string;
}

interface IFormCodeInput {
  Code: string;
}

const AdminAuth = ({ phoneValid, getAccessToken, setPhoneNum }: AdminAuthProps): JSX.Element => {
  const history = useHistory();
  const phoneFormReturn = useForm<IFromPhoneInput>();
  const onPhoneSubmit: SubmitHandler<IFromPhoneInput> = (data) => {
    console.log(data);
    setPhoneNum(data.Phone);
  };

  const codeFormReturn = useForm<IFormCodeInput>();
  const onCodeSubmit: SubmitHandler<IFormCodeInput> = (data) => {
    console.log(data);
    getAccessToken();
    history.push('/admin/');
  };

  return (
    <Base>
      <Paper
        elevation={2}
        sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '400px' }}
      >
        {!phoneValid && (
          <form onSubmit={phoneFormReturn.handleSubmit(onPhoneSubmit)}>
            <TextField
              placeholder="Телефон"
              fullWidth
              sx={InputSX}
              readOnly={phoneValid}
              {...phoneFormReturn.register('Phone', {
                maxLength: 12,
                minLength: 11,
                pattern: phoneRegex,
                required: true
              })}
            />
            <Button sx={StyledButton} type="submit">
              Продолжить
            </Button>
          </form>
        )}
        {phoneValid && (
          <form onSubmit={codeFormReturn.handleSubmit(onCodeSubmit)}>
            <TextField
              placeholder="Код из СМС"
              fullWidth
              sx={InputSX}
              {...codeFormReturn.register('Code', {
                maxLength: 6,
                minLength: 6,
                pattern: numbRegex,
                required: true
              })}
            />
            <Button sx={StyledButton} type="submit" >
              Продолжить
            </Button>
          </form>
        )}
      </Paper>
    </Base>
  );
};

export default inject(({ userStore }: Stores) => ({
  setPhoneNum: userStore.setPhoneNum,
  messageCode: userStore.messageCode,
  phoneValid: userStore.phoneValid,
  setMessageCode: userStore.setMessageCode,
  getAccessToken: userStore.getAccessToken,
}))(AdminAuth);
