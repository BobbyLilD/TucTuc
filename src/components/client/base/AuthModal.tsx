import { Button, Input, Modal, TextField, Typography } from '@mui/material';
import { grey } from '@mui/material/colors';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../types';

type AuthModalProps = {
  shown: boolean;
  changeAuthState: () => void;
  phoneVerified: boolean;
  phoneVerify: () => void;
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
    borderRadius: '12px'
};

const InputStyle = {
    backgroundColor: grey.A200,
    '& .MuiOutlinedInput-root': {
        '&.Mui-focused fieldset':{
            borderColor: 'orange'
        }
    }
}

const ButtonStyle = {
    borderRadius: '12px',
    backgroundColor: 'orange',
    color: 'white',
    fontWeight: 600,
    ':hover': {
        bgcolor:'orange'
    }
}

const AuthModal = ({ shown, changeAuthState, phoneVerified, phoneVerify }: AuthModalProps) => {
  return (
    <Modal
      open={shown}
      onClose={changeAuthState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalContainer}>
        <Typography variant='h5'>Войти в личный кабинет</Typography>
        {!phoneVerified && <TextField variant='outlined' placeholder="Номер моб. телефона" type="text" sx={InputStyle}/>}
        {phoneVerified && <TextField variant='outlined' placeholder='Код из СМС' type='text' sx={InputStyle}/>}
        <Button sx={ButtonStyle} onClick={()=>{phoneVerify()}}>Далее</Button>
      </Box>
    </Modal>
  );
};

export default inject(({ userStore }: Stores) => ({
  shown: userStore.showClientAuth,
  changeAuthState: userStore.changeClientAuthState,
  phoneVerified: userStore.phoneValid,
  phoneVerify: userStore.setPhoneNum,
}))(AuthModal);
