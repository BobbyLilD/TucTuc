import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { inject } from 'mobx-react';
import { Category, Item, RestaurantAdmin, Stores } from '../../../../types';
import {
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  AdminDataInputSX,
  StyledButton,
  ListSelectSX,
  DescriptionSX,
} from '../../../common/StyledComponents';
import { letterRegex, numbRegex } from '../../../../commons/const';

interface IFromInput {
  Name: string;
  Place: string;
  Category: string;
  Description: string;
  Price: number;
  Discount: number;
}

type DrawerProps = {
  shown: boolean;
  changeState: () => void;
  categoriesList: Category[];
  placesList: RestaurantAdmin[];
  getCategories: () => void;
  getPlaces: () => void;
  selectedItem: number;
  itemsList: Item[];
  changeSelectedItem: (id: string) => void;
};

const TemporaryDrawer = ({
  shown,
  changeState,
  categoriesList,
  getCategories,
  placesList,
  getPlaces,
  selectedItem,
  itemsList,
  changeSelectedItem
}: DrawerProps) => {
  React.useEffect(() => {
    getPlaces();
    getCategories();
  }, []);

  const { register, handleSubmit } = useForm<IFromInput>();
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data);

  let newFoodItem: Item = {
    placeID: '',
    name: '',
    description: '',
    price: undefined,
    discount: undefined,
    category: '',
    imageSource: '',
  };

  if (selectedItem != undefined) {
    newFoodItem = itemsList[selectedItem];
  }

  let categoriesMenuItems: JSX.Element[] = [];
  if (categoriesList != undefined) {
    for (let i = 0; i < categoriesList.length; i++) {
      categoriesMenuItems.push(
        <MenuItem value={categoriesList[i].id}>{categoriesList[i].name}</MenuItem>,
      );
    }
  }

  let placesMenuItems: JSX.Element[] = [];
  if (placesList != undefined) {
    for (let i = 0; i < placesList.length; i++) {
      placesMenuItems.push(<MenuItem value={placesList[i].id}>{placesList[i].name}</MenuItem>);
    }
  }

  const [category, setCategory] = React.useState(newFoodItem.category);
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value)
  }

  const [place, setPlace] = React.useState(newFoodItem.placeID)
  const handlePlaceChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value)
  }

  return (
    <Drawer open={shown} onClose={() => {changeState(); changeSelectedItem(undefined);}} anchor="right" onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        rowSpacing={3}
        columns={2}
        sx={{ width: '500px', paddingX: '20px', marginTop: '20px' }}
      >
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={AdminDataInputSX}
            placeholder="Название"
            defaultValue={newFoodItem.name}
            {...register('Name', { required: true, pattern: letterRegex })}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={ListSelectSX}>
            <InputLabel id="place-select-label">Заведение</InputLabel>
            <Select
              {...register('Place', { required: true })}
              labelId="place-select-label"
              id="place-select"
              value={category}
              label="Заведение"
              onChange={handleCategoryChange}
            >
              {placesMenuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={ListSelectSX}>
            <InputLabel id="category-select-label">Категория</InputLabel>
            <Select
              {...register('Category', { required: true })}
              labelId="category-select-label"
              id="category-select"
              value={place}
              label="Категория"
              onChange={handlePlaceChange}
            >
              {categoriesMenuItems}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={DescriptionSX}
            placeholder="Описание"
            defaultValue={newFoodItem.description}
            {...register('Description', { required: true })}
            multiline={true}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={AdminDataInputSX}
            placeholder="Цена"
            defaultValue={newFoodItem.price}
            {...register('Price', { required: true, pattern: numbRegex })}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={AdminDataInputSX}
            placeholder="Скидка"
            defaultValue={newFoodItem.discount}
            {...register('Discount', { pattern: numbRegex })}
          />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" sx={StyledButton}>
            Добавить
          </Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  shown: adminPanelStore.itemAddToPlace,
  changeState: adminPanelStore.changeItemAdd,
  categoriesList: adminPanelStore.categoriesList,
  placesList: adminPanelStore.placesList,
  getCategories: adminPanelStore.getCategories,
  getPlaces: adminPanelStore.getPlaces,
  selectedItem: adminPanelStore.selectedItem,
  itemsList: adminPanelStore.itemsList,
  changeSelectedItem: adminPanelStore.changeSelectedItem
}))(TemporaryDrawer);
