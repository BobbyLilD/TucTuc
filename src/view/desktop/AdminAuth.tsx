import styled from '@emotion/styled';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { btnBorder, inputBorder } from '../../commons/colors';
import { Stores } from '../../types';
import { Redirect, useHistory } from 'react-router-dom';
import { observer } from 'mobx-react-lite';
import { Button, Input, Paper, TextField } from '@mui/material';
import { StyledButton, AdminDataInputSX } from '../../components/common/StyledComponents';

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

const InputSX = {...AdminDataInputSX, ...{marginBottom: 2}}


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
      <Paper
        elevation={2}
        sx={{ p: 4, display: 'flex', flexDirection: 'column', alignItems: 'end', width: '400px' }}
      >
        <TextField placeholder="Телефон" fullWidth sx={InputSX} readOnly={phoneValid} />
        {!phoneValid && (
          <>
            <Button sx={StyledButton} onClick={setPhoneNum}>
              Продолжить
            </Button>
          </>
        )}
        {phoneValid && (
          <>
            <TextField placeholder="Код из СМС" fullWidth sx={InputSX} />
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
