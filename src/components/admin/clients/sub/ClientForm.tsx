import { inject } from 'mobx-react';
import React from 'react';
import { Client, Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Button, Grid, Input, Paper, TextField, Typography } from '@mui/material';
import { StyledButton, AdminDataInputSX } from '../../../common/StyledComponents';
import { emailRegex, phoneRegex } from '../../../../commons/const';

interface IFormInput {
  Email: string;
  Phone: string;
  Name: string;
}

type ClientFormProps = {
  changeClientState: () => void;
  selectedItem: number;
  clientsList: Client[];
  changeSelectedItem: (id: number) => void;
};

const ClientFrom = ({
  changeClientState,
  selectedItem,
  clientsList,
  changeSelectedItem,
}: ClientFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  let curItem: Client = { id: undefined, name: undefined, phone: undefined, email: undefined };
  if (selectedItem != undefined) {
    curItem = clientsList[selectedItem];
  }

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Paper elevation={2} sx={{ marginX: 6, marginTop: 6, p: 2 }}>
          <Grid container rowSpacing={2} columnSpacing={2}>
            <Grid item xs={12}>
              <Typography variant="h5">Редактирование клиента</Typography>
            </Grid>
            <Grid item container xs={12} columnSpacing={2}>
              <Grid item xs={3}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Телефон"
                  {...register('Phone', { required: true, pattern: phoneRegex })}
                  fullWidth
                  defaultValue={curItem.phone}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Email"
                  {...register('Email', { required: true, pattern: emailRegex })}
                  fullWidth
                  defaultValue={curItem.email}
                />
              </Grid>
              <Grid item xs={3}>
                <TextField
                  sx={AdminDataInputSX}
                  placeholder="Имя"
                  {...register('Name', { required: true, pattern: emailRegex })}
                  fullWidth
                  defaultValue={curItem.name}
                />
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
              <Button
                sx={StyledButton}
                onClick={() => {
                  changeClientState();
                  changeSelectedItem(undefined);
                }}
              >
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
  changeClientState: adminPanelStore.changeClientAdd,
  selectedItem: adminPanelStore.selectdItem,
  clientsList: adminPanelStore.clientsList,
  changeSelectedItem: adminPanelStore.changeSelectedItem,
}))(ClientFrom);
