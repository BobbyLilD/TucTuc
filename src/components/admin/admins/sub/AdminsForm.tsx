import { Box, Button, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Admin, Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton, AdminDataInputSX } from '../../../common/StyledComponents';
import { emailRegex, letterRegex, phoneRegex } from '../../../../commons/const';

type CityFormProps = {
  adminAddChangeState: () => void;
  adminsList: Admin[];
  selectedItem: number;
  changeSelectedItem: (id: number) => void;
};

interface IFormInput {
  Name: String;
  Surname: string;
  Phone: string;
  Email: string;
}

const CityForm = ({ adminAddChangeState, adminsList, selectedItem, changeSelectedItem}: CityFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  let curItem: Admin = {id: undefined, name: undefined, surname: undefined, phone: undefined, email:undefined}
  if(selectedItem != undefined){
    curItem = adminsList[selectedItem];
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={2} sx={{ p: 2, marginX: 4, marginTop: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h5">Добавление/изменение админа</Typography>
          </Grid>
          <Grid item xs={2}>
            <TextField
              fullWidth
              sx={AdminDataInputSX}
              placeholder="Имя"
              {...register('Name', { required: true, pattern: letterRegex })}
              defaultValue={curItem.name}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              sx={AdminDataInputSX}
              placeholder="Фамилия"
              {...register('Surname', { required: true, pattern: letterRegex })}
              defaultValue={curItem.surname}
            />
          </Grid>
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Телефон"
                {...register('Phone', { required: true, pattern: phoneRegex })}
                defaultValue={curItem.phone}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Email"
                {...register('Email', { required: true, pattern: emailRegex })}
                defaultValue={curItem.email}
              />
            </Grid>
          </Grid>
          <Grid item xs={4}>
            <Box sx={{display: 'flex'}}>
            <Button type="submit" sx={StyledButton}>
              Сохранить
            </Button>
            <Button sx={{...StyledButton, ...{marginX: 1}}}>
              Понизить
            </Button>
            <Button sx={StyledButton}>
              Заблокировать
            </Button>
            </Box>
          </Grid>
          <Grid item xs={7}></Grid>
          <Grid item xs={1}>
            <Button onClick={() => {adminAddChangeState();
            changeSelectedItem(undefined);}} sx={StyledButton}>
              Выйти
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  adminAddChangeState: adminPanelStore.changeAdminAdd,
  adminsList: adminPanelStore.adminsList,
  selectedItem: adminPanelStore.selectedItem,
  changeSelectedItem: adminPanelStore.changeSelectedItem
}))(CityForm);
