import {
  Box,
  Button,
  Grid,
  IconButton,
  Input,
  Paper,
  TextField,
  Toolbar,
  Typography,
} from '@mui/material';
import { inject } from 'mobx-react';
import React, { useEffect, useState } from 'react';
import {
  Item,
  NewRestaurantEntityAdmin,
  Restaurant,
  RestaurantAdmin,
  Stores,
} from '../../../../types';
import { useForm, SubmitHandler } from 'react-hook-form';
import ItemCard from './ItemCard';
import TemporaryDrawer from './PlaceFormDrawer';
import ImagePreview from '../../../common/ImagePreview';
import {
  AdminDataInputSX,
  StyledButtonFlex,
  StyledImageInput,
  StyledLabel,
} from '../../../common/StyledComponents';
import { emailRegex, letterRegex, phoneRegex } from '../../../../commons/const';
import LocationRecord from './LocationRecord';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import PlaceItemList from './PlaceItemList';
import LocationRecordsList from './LocationRecordsList';
import AddAdminModal from './AddAdminModal';

type CityFormProps = {
  changePlaceState: () => void;
  changeItemState: () => void;
  photoSet: boolean;
  changePhotoState: () => void;
  selectedItem: number;
  placesList: RestaurantAdmin[];
  getItemsByPlaceID: (id: string) => void;
  newPlaceEntity: NewRestaurantEntityAdmin;
  initPlace: () => void;
  changeSelectedItem: (index: number) => void;
  changeAddAdminToPlace: () => void;
};

interface IFormInput {
  name : String;
  photo: string; //NEED TO CHANGE TO IMAGE
  phone: string;
  email: string;
}

const PlaceForm = ({
  changePlaceState,
  changeItemState,
  photoSet,
  changePhotoState,
  selectedItem,
  placesList,
  getItemsByPlaceID,
  newPlaceEntity,
  initPlace,
  changeSelectedItem,
  changeAddAdminToPlace
}: CityFormProps) => {
  const { register, handleSubmit,reset } = useForm<IFormInput>();
  const onSubmit: SubmitHandler<IFormInput> = (data) => console.log(data);

  useEffect(()=> {
    reset({...newPlaceEntity})
  }, [newPlaceEntity])

  return (
    <>
      <TemporaryDrawer />
      <AddAdminModal />
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
        <Paper
          elevation={2}
          sx={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            marginBottom: 2,
            marginTop: 4,
          }}
        >
          <Box
            sx={{
              alignItems: 'stretch',
              width: 192,
              height: 188,
              display: 'flex',
              justifyContent: 'center',
              marginX: 4,
              p: 2,
            }}
          >
            {photoSet ? (
              <ImagePreview />
            ) : (
              <StyledLabel>
                <StyledImageInput {...register('photo')} type="file" onChange={changePhotoState} />
                Загрузить фото
              </StyledLabel>
            )}
          </Box>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ marginRight: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5">Добавление/изменение заведения</Typography>
            </Grid>
            <Grid item xs={5} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Название"
                {...register('name', { required: true, pattern: letterRegex })}
              />
            </Grid>
            <Grid item xs={4} sx={{ display: 'flex', alignItems: 'center' }}>
              <TextField
                variant="outlined"
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Телефон"
                {...register('phone', { required: true, pattern: phoneRegex })}
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex', alignItems: 'center' }}>
              {newPlaceEntity.id != undefined && (
                <Button sx={{ ...StyledButtonFlex, ...{ fontSize: 12 } }} onClick={changeAddAdminToPlace}>
                  Добавить администратора
                </Button>
              )}
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Email"
                {...register('email', { required: true, pattern: emailRegex })}
              />
            </Grid>
            <Grid item xs={3} sx={{ display: 'flex' }}>
              <Button type="submit" sx={StyledButtonFlex} onClick={changeItemState}>
                Добавить товар
              </Button>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex' }}>
              <Button type="submit" sx={StyledButtonFlex}>
                Сохранить
              </Button>
            </Grid>
            <Grid item xs={2} sx={{ display: 'flex' }}>
              <Button
                onClick={() => {
                  changePlaceState();
                  initPlace();
                  reset();
                }}
                sx={StyledButtonFlex}
              >
                Выйти
              </Button>
            </Grid>
          </Grid>
        </Paper>
        <LocationRecordsList />
        <PlaceItemList />
      </Box>
    </>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  changePlaceState: adminPanelStore.changePlaceAdd,
  changeItemState: adminPanelStore.changeItemAdd,
  photoSet: adminPanelStore.photoSet,
  changePhotoState: adminPanelStore.changePhotoSet,
  selectedItem: adminPanelStore.selectedItem,
  // itemsList: adminPanelStore.itemsList,
  placesList: adminPanelStore.placesList,
  getItemsByPlaceID: adminPanelStore.getItemsByPlaceIDForPlaceForm,
  newPlaceEntity: adminPanelStore.newPlace,
  initPlace: adminPanelStore.initPlace,
  changeSelectedItem: adminPanelStore.changeSelectedItem,
  changeAddAdminToPlace: adminPanelStore.changeAddAdminToPlace
}))(PlaceForm);
