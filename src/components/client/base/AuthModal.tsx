import { Button, Input, Modal, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useState } from 'react';
import { Stores } from '../../../types';
import {AsYouType, parsePhoneNumber} from 'libphonenumber-js';
import { numbRegex, phoneRegex } from '../../../commons/const';

type AuthModalProps = {
  shown: boolean;
  changeAuthState: () => void;
  phoneVerified: boolean;
  changePhoneState: (phone: string) => void;
  changeAccessToken: (token: string) => void;
};

const modalContainer = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '300px',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 4,
  paddingY: 2,
  display: 'flex',
  'flex-direction': 'column',
  'justify-content': 'space-evenly',
  borderRadius: '12px',
};

const InputStyle = {
  backgroundColor: grey.A200,
  '& .MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
};

const ButtonStyle = {
  borderRadius: '12px',
  backgroundColor: 'orange',
  color: 'white',
  fontWeight: 600,
  ':hover': {
    bgcolor: 'orange',
  },
};

const AuthModal = ({ shown, changeAuthState, phoneVerified, changePhoneState, changeAccessToken }: AuthModalProps) => {
  const [phone, setPhone] = useState('');
  let typer = new AsYouType('RU');

  return (
    <Modal
      open={shown}
      onClose={()=>{changeAuthState();
      setPhone('');}}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalContainer}>
        <Typography variant="h5">Войти в личный кабинет</Typography>
        {!phoneVerified && (
          <>
            <TextField
              variant="outlined"
              placeholder="Номер моб. телефона"
              type="text"
              sx={InputStyle}
              value={phone}
              onChange={(event) => {
                setPhone(typer.input(event.target.value))
                // setPhone(event.target.value)
              }}
              inputProps={{maxLength: 17, pattern: phoneRegex}}
            />
            <Button
              sx={ButtonStyle}
              onClick={() => {
                let parsed = parsePhoneNumber(phone, 'RU')
                changePhoneState(parsed.getURI().substring(4));
              }}
            >
              Далее
            </Button>
          </>
        )}
        {phoneVerified && (
          <>
            <TextField variant="outlined" placeholder="Код из СМС" type="text" sx={InputStyle} />
            <Button
              sx={ButtonStyle}
              onClick={() => {
                changeAccessToken('acb');
                changePhoneState(undefined);
                changeAuthState();
              }}
            >
              Далее
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default inject(({ userStore }: Stores) => ({
  shown: userStore.showClientAuth,
  changeAuthState: userStore.changeClientAuthState,
  phoneVerified: userStore.phoneValid,
  changePhoneState: userStore.setPhoneNum,
  changeAccessToken: userStore.changeAccessToken,
}))(AuthModal);
