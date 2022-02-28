import { Button, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../../../common/StyledComponents';

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
      <Paper elevation={2} sx={{p: 2, marginX: 4, marginTop: 3}}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant='h5'>
              Добавление/изменение админа
            </Typography>
          </Grid>
          <Grid item xs={2}>
            <Input placeholder="Имя" {...register('Name')} />
          </Grid>
          <Grid item xs={3}>
            <Input placeholder="Фамилия" {...register('Surname')} />
          </Grid>
          <Grid item container xs={12} columnSpacing={2}>
            <Grid item xs={3}>
              <Input placeholder="Телефон" {...register('Phone')} fullWidth/>
            </Grid>
            <Grid item xs={3}>
              <Input placeholder="Email" {...register('Email')} fullWidth />
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
