import { Button, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton, AdminDataInputSX } from '../../../common/StyledComponents';
import { emailRegex, letterRegex, phoneRegex } from '../../../../commons/const';

type CityFormProps = {
  adminAddChangeState: () => void;
};

interface IFormInput {
  Name: String;
  Surname: string;
  Phone: string;
  Email: string;
}

const CityForm = ({ adminAddChangeState }: CityFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

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
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              fullWidth
              sx={AdminDataInputSX}
              placeholder="Фамилия"
              {...register('Surname', { required: true, pattern: letterRegex })}
            />
          </Grid>
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item xs={3}>
              <TextField
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Телефон"
                {...register('Phone', { required: true, pattern: phoneRegex })}
              />
            </Grid>
            <Grid item xs={3}>
              <TextField
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Email"
                {...register('Email', { required: true, pattern: emailRegex })}
              />
            </Grid>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" sx={StyledButton}>
              Сохранить
            </Button>
          </Grid>
          <Grid item xs={9}></Grid>
          <Grid item xs={1}>
            <Button onClick={adminAddChangeState} sx={StyledButton}>
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
}))(CityForm);
