import { Box, Button, Modal, TextField, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { phoneRegex } from '../../../../commons/const';
import { Admin, Stores } from '../../../../types';
import { AdminDataInputSX, StyledButton } from '../../../common/StyledComponents';

const modalContainer = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: 'fit-content',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 4,
  paddingY: 2,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
};

type AddAdminModalProps = {
  show: boolean;
  changeAddModalShow: () => void;
  getAdminByPhone: (phone: string) => void;
  adminsList: Admin[];
  addAdminToPlace: (id: string) => void;
};

interface IFormInput {
  phone: string;
}

const AddAdminModal = ({ show, changeAddModalShow, getAdminByPhone, adminsList, addAdminToPlace }: AddAdminModalProps) => {
  const { register, handleSubmit, reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => getAdminByPhone(data.phone);
  const [showAdmin, setShowAdmin] = useState(false);
  useEffect(() => {
      if(adminsList != undefined && adminsList.length == 1){
          setShowAdmin(true);
      }
  }, [adminsList])

  return(
  <Modal open={show} onClose={() => {changeAddModalShow(); setShowAdmin(false); reset();}}>
    <Box sx={modalContainer}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <TextField
            sx={AdminDataInputSX}
            fullWidth
            placeholder='Номер телефона'
            {...register('phone', { required: true, pattern: phoneRegex })}
          />
          <Button sx={{...StyledButton, ...{marginLeft: 2}}} type="submit">
            Поиск
          </Button>
        </Box>
      </form>
      {showAdmin && <>
        <Typography variant='subtitle1' sx={{marginTop: 1}}>
            {adminsList[0].name}{' '}{adminsList[0].surname}
        </Typography>
        <Typography variant='subtitle1' sx={{marginBottom: 1}}>
            {adminsList[0].email}
        </Typography>
        <Button sx={StyledButton} onClick={() => addAdminToPlace(adminsList[0].id)}>
            Добавить
        </Button>
      </>}
    </Box>
  </Modal>
  );
};

export default inject(({adminPanelStore}: Stores)=> ({
    show: adminPanelStore.addAdminToPlace,
    changeAddModalShow: adminPanelStore.changeAddAdminToPlace,
    getAdminByPhone: adminPanelStore.getAdminByPhone,
    adminsList: adminPanelStore.adminsList,
    addAdminToPlace: adminPanelStore.postAdminToPlace
}))(AddAdminModal)