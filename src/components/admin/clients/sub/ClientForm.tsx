import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Grid, Input, Paper, Typography } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';

interface IFormInput {
  Email: string;
  Phone: string;
  Name: string;
}

type ClientFormProps = {
  clientEdit: boolean;
  changeClientState: () => void;
};

const ClientFrom = ({ changeClientState }: ClientFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={2} sx={{marginX: 6, marginTop: 6, p: 2}}>
          <Grid container rowSpacing={2} columnSpacing={2}>
              <Grid item xs={12}>
                  <Typography variant='h5'>Редактирование клиента</Typography>
              </Grid>
            <Grid item container xs={12} columnSpacing={2}>
              <Grid item xs={3}>
                <Input placeholder="Телефон" {...register('Phone')} fullWidth />
              </Grid>
              <Grid item xs={3}>
                <Input placeholder="Email" {...register('Email')} fullWidth />
              </Grid>
              <Grid item xs={3}>
                <Input placeholder="Имя" {...register('Name')} fullWidth />
              </Grid>
            </Grid>
            <Grid item xs={2}>
              <Button sx={StyledButton}>Заблокировать</Button>
            </Grid>
            <Grid item xs={2}>
              <Button sx={StyledButton} type="submit">
                Сохранить
              </Button>
            </Grid>
            <Grid item xs={7}></Grid>
            <Grid item xs={1}>
              <Button sx={StyledButton} onClick={changeClientState}>
                Выйти
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </form>
    </>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  clientEdit: adminPanelStore.clientEdit,
  changeClientState: adminPanelStore.changeClientAdd,
}))(ClientFrom);
