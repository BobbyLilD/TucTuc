import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { inject } from 'mobx-react';
import { Stores } from '../../../../types';
import {
  Button,
  FormControl,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { StyledButton } from '../../../common/StyledComponents';

enum Category {
  Soup = 'Soup',
  Salad = 'Salad',
  MainCourse = 'Main Course',
}

enum Place {
    McDonalds = 'McDonalds',
    BurgerKing = 'Burger King',
}

interface IFromInput {
  Name: string;
  Place: Place;
  Category: Category;
  Description: string;
  Price: number;
  Discount: number;
}

type DrawerProps = {
  shown: boolean;
  changeState: () => void;
};

const TemporaryDrawer = ({ shown, changeState }: DrawerProps) => {
  const { register, handleSubmit } = useForm<IFromInput>();
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data);

  const [category, setCategory] = React.useState('');
  const [place, setPlace] = React.useState('');

  const handlePlaceChange = (event: SelectChangeEvent) => {
    setPlace(event.target.value as string);
  }

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Drawer open={shown} onClose={changeState} anchor="right" onSubmit={handleSubmit(onSubmit)}>
      <Grid
        container
        rowSpacing={3}
        columns={2}
        sx={{ width: '280px', paddingX: '20px', marginTop: '20px' }}
      >
        <Grid item xs={2}>
          <Input placeholder="Название" {...register('Name')} sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="place-select-label">Заведение</InputLabel>
            <Select
              {...register('Place')}
              labelId="place-select-label"
              id="place-select"
              value={place}
              label="Заведение"
              onChange={handlePlaceChange}
            >
              <MenuItem value={Place.BurgerKing}>{Place.BurgerKing}</MenuItem>
              <MenuItem value={Place.McDonalds}>{Place.McDonalds}</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="category-select-label">Категория</InputLabel>
            <Select
              {...register('Category')}
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Категория"
              onChange={handleCategoryChange}
            >
              <MenuItem value={Category.Soup}>Soup</MenuItem>
              <MenuItem value={Category.Salad}>Salad</MenuItem>
              <MenuItem value={Category.MainCourse}>Breakfast</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Input
            placeholder="Описание"
            {...register('Description')}
            sx={{ width: '100%' }}
            multiline={true}
          />
        </Grid>
        <Grid item xs={2}>
          <Input placeholder="Цена" {...register('Price')} sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={2}>
          <Input placeholder="Скидка" {...register('Discount')} sx={{ width: '100%' }} />
        </Grid>
        <Grid item xs={2}>
          <Button type="submit" sx={StyledButton}>Добавить</Button>
        </Grid>
      </Grid>
    </Drawer>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  shown: adminPanelStore.itemAddToPlace,
  changeState: adminPanelStore.changeItemAdd,
}))(TemporaryDrawer);
