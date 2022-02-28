import { Box, Button, Grid, Input, Paper, Toolbar, Typography } from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Stores } from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import ItemCard from './ItemCard';
import TemporaryDrawer from './PlaceFormDrawer';
import ImagePreview from '../../../common/ImagePreview';
import {StyledButton, StyledButtonFlex, StyledImageInput, StyledLabel} from '../../../common/StyledComponents';

type CityFormProps = {
  changePlaceState: () => void;
  changeItemState: () => void;
  photoSet: boolean;
  changePhotoState: () => void;
};

interface IFormInput {
  Name: String;
  Photo: string; //NEED TO CHANGE TO IMAGE
  Phone: string;
  Email: string;
  Items: Array<string>;
}




const PlaceForm = ({
  changePlaceState,
  changeItemState,
  photoSet,
  changePhotoState,
}: CityFormProps) => {
  const { register, handleSubmit } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  return (
    <>
      <TemporaryDrawer />
      <Box
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          paddingX: '5%',
          overflow: 'auto',
          height: `calc(100vh - 64px)`,
        }}
      >
        <Paper elevation={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 2, marginTop: 4 }}>
          {/* <Grid
            container
            spacing={1}
            sx={{ bgcolor: 'background.default', paddingBottom: 4}}
          > */}
          <Box
            width={192}
            height={188}
            display={'flex'}
            justifyContent={'center'}
            alignItems={'center'}
            marginX={4}
          >
            {photoSet ? (
              <ImagePreview />
            ) : (
              <StyledLabel>
                <StyledImageInput {...register('Photo')} type="file" onChange={changePhotoState} />
                Загрузить фото
              </StyledLabel>
            )}
          </Box>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{marginRight: 2}}>
            <Grid item xs={12}>
              <Typography variant='h5'>Добавление/изменение заведения</Typography>
            </Grid>
            <Grid item xs={5}>
              <Input placeholder="Название" {...register('Name')} sx={{ width: '100%' }} />
            </Grid>
            <Grid item xs={4}>
              <Input placeholder="Телефон" {...register('Phone')} sx={{ width: '100%' }} />
            </Grid>
            <Grid item xs={5}>
              <Input placeholder="Email" {...register('Email')} sx={{ width: '100%' }} />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex' }}>
              <Button type="submit" sx={StyledButtonFlex} onClick={changeItemState}>
                Добавить товар
              </Button>
            </Grid>
            <Grid item xs={2} sx={{display: 'flex'}}>
              <Button type="submit" sx={StyledButtonFlex}>Сохранить</Button>
            </Grid>
            <Grid item xs={2} sx={{display: 'flex'}}>
              <Button onClick={changePlaceState} sx={StyledButtonFlex}>Выйти</Button>
            </Grid>
          </Grid>
          {/* </Grid> */}
        </Paper>
        <Paper elevation={2} sx={{display:'flex', flexDirection:'row', justifyContent:'start', width: '100%', marginBottom: 2}}>
          <Box display={'flex'} flexDirection={'row'} justifyContent={'start'} width={'80vw'} overflow={'scroll'} padding={2}>
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
            <ItemCard />
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  changePlaceState: adminPanelStore.changePlaceAdd,
  changeItemState: adminPanelStore.changeItemAdd,
  photoSet: adminPanelStore.photoSet,
  changePhotoState: adminPanelStore.changePhotoSet,
}))(PlaceForm);
