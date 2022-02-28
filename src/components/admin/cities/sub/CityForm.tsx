import { Button, Input, Paper, Grid, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../../../common/StyledComponents';

type CityFormProps = {
  cityAddChangeState: () => void;
};

interface IFormInput {
  cityName: String;
}

const CityForm = ({ cityAddChangeState }: CityFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Paper elevation={2} sx={{width: 600, marginTop: 3}}>
        <Grid container columns={6} rowSpacing={2} columnSpacing={3} sx={{p:2}}>
          <Grid item xs={6}>
            <Typography variant="h5">Добавление города</Typography>
          </Grid>
          <Grid item xs={2}>
            <Input placeholder="Название города" {...register('cityName')} fullWidth/>
          </Grid>
          <Grid item xs={2}>
            <Button type="submit" sx={StyledButton}>
              Добавить
            </Button>
          </Grid>
          <Grid item xs={2} sx={{display:'flex', justifyContent:'end'}}>
            <Button onClick={cityAddChangeState} sx={StyledButton}>Выйти</Button>
          </Grid>
        </Grid>
      </Paper>
    </form>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  cityAddChangeState: adminPanelStore.changeCityAdd,
}))(CityForm);
