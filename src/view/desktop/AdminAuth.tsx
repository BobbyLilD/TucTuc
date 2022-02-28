import styled from '@emotion/styled';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { btnBorder, inputBorder } from '../../commons/colors';
import { Stores } from '../../types';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Input, Paper } from '@mui/material';
import { StyledButton } from '../../components/common/StyledComponents';

type AdminAuthProps = {
  phoneNum: string;
  messageCode: string;
  phoneValid: boolean;
  setAccessToken: (token: string) => void;
  setMessageCode: () => void;
  setPhoneNum: () => void;
};

const Base = styled.div`
  height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthInput = styled.input`
  font-size: 18pt;
  border-radius: 8px;
  border: 1px solid ${inputBorder};
`;

const AuthButton = styled.button`
  margin-top: 12px;
  margin-left: 64%;
  box-shadow: 1px 1px 2px black;
  font-size: 14pt;
  background-color: orange;
  border: 1px solid ${btnBorder};
  border-radius: 12px;
  width: 140px;
  height: 40px;
  color: white;
`;

const AuthField = styled.div`
  width: 400px;
  height: fit-content;
  margin: 20px;
  display: flex;
  flex-direction: column;
`;

const AdminAuthContainer = styled.div`
  padding: 20px;
  width: fit-content;
  height: fit-content;
  background-color: white;
`;

const AuthLabel = styled.label`
  margin-right: 20%;
  margin-bottom: 8px;
  font-size: 16pt;
`;

const AdminAuth = ({
  phoneNum,
  phoneValid,
  messageCode,
  setAccessToken,
  setPhoneNum,
}: AdminAuthProps): JSX.Element => {
  const [phone, setPhone] = useState<string>(phoneNum);
  const history = useHistory();

  return (
    <Base>
      {/* <AdminAuthContainer>
        <AuthField>
          <AuthLabel>Введите номер телефона</AuthLabel>
          <AuthInput
            type="string"
            defaultValue={phoneNum}
            onChange={(e: any) => setPhone(e.target.value)}
            readOnly={phoneValid}
          />
          {phoneValid == false && (
            <AuthButton
              onClick={() => {
                setPhoneNum();
              }}
            >
              Продолжить
            </AuthButton>
          )}
        </AuthField>
        {phoneValid == true && (
          <AuthField>
            <AuthLabel>Введите пароль из СМС</AuthLabel>
            <AuthInput />
            <AuthButton
              onClick={() => {
                setAccessToken('abc');
                history.push('/admin/');
              }}
            >
              Продолжить
            </AuthButton>
          </AuthField>
        )}
      </AdminAuthContainer> */}
      <Paper
        elevation={2}
        sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'end', width: '400px' }}
      >
        <Input placeholder="Телефон" fullWidth sx={{ marginBottom: 2 }} readOnly={phoneValid} />
        {!phoneValid && (
          <>
            <Button sx={StyledButton} onClick={setPhoneNum}>
              Продолжить
            </Button>
          </>
        )}
        {phoneValid && (
          <>
            <Input placeholder="Код из СМС" fullWidth sx={{ marginBottom: 2 }} />
            <Button
              sx={StyledButton}
              onClick={() => {
                setAccessToken('abc');
                history.push('/admin/');
              }}
            >
              Продолжить
            </Button>
          </>
        )}
      </Paper>
    </Base>
  );
};

export default inject(({ userStore }: Stores) => ({
  phoneNum: userStore.phoneNum,
  setPhoneNum: userStore.setPhoneNum,
  messageCode: userStore.messageCode,
  phoneValid: userStore.phoneValid,
  setMessageCode: userStore.setMessageCode,
  setAccessToken: userStore.changeAccessToken,
}))(AdminAuth);
