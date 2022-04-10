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
import React, { useEffect } from 'react';
import { Item, NewRestaurantEntityAdmin, Restaurant, RestaurantAdmin, Stores } from '../../../../types';
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
  selectedItem,
  placesList,
  getItemsByPlaceID,
  newPlaceEntity,
  initPlace,
  changeSelectedItem
}: CityFormProps) => {
  let newItem: RestaurantAdmin = {
    name: undefined,
    phone: undefined,
    email: undefined,
    imageSource: undefined,
    items: new Array(),
    locationRecords: new Array(),
  };
  useEffect(() => {
    initPlace();
    if(selectedItem != undefined){
      getItemsByPlaceID(placesList[selectedItem].id!)
    }
  }, []);
  if (selectedItem != undefined) {
    newItem = placesList[selectedItem];
  }

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
                <StyledImageInput {...register('Photo')} type="file" onChange={changePhotoState} />
                Загрузить фото
              </StyledLabel>
            )}
          </Box>
          <Grid container columnSpacing={2} rowSpacing={2} sx={{ marginRight: 2 }}>
            <Grid item xs={12}>
              <Typography variant="h5">Добавление/изменение заведения</Typography>
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Название"
                defaultValue={newItem.name}
                {...register('Name', { required: true, pattern: letterRegex })}
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                variant="outlined"
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Телефон"
                defaultValue={newItem.phone}
                {...register('Phone', { required: true, pattern: phoneRegex })}
              />
            </Grid>
            <Grid item xs={5}>
              <TextField
                variant="outlined"
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Email"
                defaultValue={newItem.email}
                {...register('Email', { required: true, pattern: emailRegex })}
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
              <Button onClick={() => {changePlaceState(); changeSelectedItem(undefined);}} sx={StyledButtonFlex}>
                Выйти
              </Button>
            </Grid>
          </Grid>
          {/* </Grid> */}
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
  getItemsByPlaceID: adminPanelStore.getItemsByPlaceID,
  newPlaceEntity: adminPanelStore.newPlace,
  initPlace: adminPanelStore.initPlace,
  changeSelectedItem: adminPanelStore.changeSelectedItem
}))(PlaceForm);
