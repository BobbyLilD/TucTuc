import { Button, Input, Paper, Grid, Typography, TextField } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AdminDataInputSX, StyledButton } from '../../../common/StyledComponents';
import { letterRegex } from '../../../../commons/const';

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
        <Grid container rowSpacing={2} columnSpacing={3} sx={{p:2}}>
          <Grid item xs={12}>
            <Typography variant="h5">Добавление города</Typography>
          </Grid>
          <Grid item xs={6}>
            <TextField sx={AdminDataInputSX} placeholder="Название города" {...register('cityName', {required: true, pattern: letterRegex})} fullWidth/>
          </Grid>
          <Grid item xs={6}></Grid>
          <Grid item xs={2}>
            <Button type="submit" sx={StyledButton}>
              Добавить
            </Button>
          </Grid>
          <Grid item xs={8}></Grid>
          <Grid item xs={2} >
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
