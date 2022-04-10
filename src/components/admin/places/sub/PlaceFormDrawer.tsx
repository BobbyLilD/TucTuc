import * as React from 'react';
import Drawer from '@mui/material/Drawer';
import { inject } from 'mobx-react';
import { Category, Item, NewRestaurantEntityAdmin, Promo, Stores } from '../../../../types';
import {
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  Grid,
  Input,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  AdminDataInputSX,
  ListSelectSX,
  StyledButton,
  DescriptionSX,
  CheckboxSX,
} from '../../../common/StyledComponents';
import { dateRegex, numbRegex } from '../../../../commons/const';
import { getDate } from '../../../../utils/helpers';

interface IFromInput {
  name: string;
  category: string;
  description: string;
  price: number;
  discount: { id?: string; percentage: number; expirationDate: string };
  discountEndDate: string;
}

type DrawerProps = {
  shown: boolean;
  changeState: () => void;
  selectedFoodItem: number;
  newPlace: NewRestaurantEntityAdmin;
  changeSelectedFoodItem: (index: number) => void;
  categoriesList: Category[];
  getCategories: () => void;
};

const resetValues = (): Item => {
  return {
    name: null,
    description: null,
    price: null,
    category: null,
    imageSource: null,
    discount: { percentage: undefined, expirationDate: getDate(new Date()) },
  }
}

const TemporaryDrawer = ({
  shown,
  changeState,
  selectedFoodItem,
  newPlace,
  changeSelectedFoodItem,
  categoriesList,
  getCategories,
}: DrawerProps) => {
  const [defaultValues, setDefaultValues] = React.useState<Item>({
    name: null,
    description: null,
    price: null,
    category: null,
    imageSource: null,
    discount: { percentage: undefined, expirationDate: getDate(new Date()) },
  });

  const { register, handleSubmit, reset } = useForm<IFromInput>();
  const onSubmit: SubmitHandler<IFromInput> = (data) => console.log(data);

  const [category, setCategory] = React.useState('');
  const [promo, setPromo] = React.useState(false);

  React.useEffect(() => {
    if (shown) {
      console.log(selectedFoodItem);
      getCategories();
      console.log('updating');
      if (selectedFoodItem != undefined && newPlace != undefined) {
        setDefaultValues(newPlace.items[selectedFoodItem]);
        console.log(defaultValues.name);
      }
      setPromo(false);
    }
  }, [shown]);

  React.useEffect(() => {
    reset({ ...defaultValues });
    console.log(defaultValues.discount.expirationDate);
    setPromo(defaultValues.discount.percentage != undefined);
    setCategory('');
  }, [defaultValues]);

  const handlePromoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPromo(event.target.checked as React.SetStateAction<boolean>);
  };

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Drawer
      open={shown}
      onClose={() => {
        changeState();
        changeSelectedFoodItem(undefined);
        setDefaultValues(resetValues());
        setPromo(false);
        reset();
      }}
      anchor="right"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Grid
        container
        rowSpacing={3}
        columnSpacing={1}
        columns={2}
        sx={{ width: '500px', paddingX: '20px', marginTop: '20px' }}
      >
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={AdminDataInputSX}
            placeholder="Название"
            {...register('name')}
          />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={ListSelectSX}>
            <InputLabel id="select-label">Категория</InputLabel>
            <Select
              {...register('category', { required: true })}
              labelId="select-label"
              id="select"
              value={category}
              label="Категория"
              onChange={handleChange}
            >
              {categoriesList != undefined &&
                categoriesList.map((value, index) => (
                  <MenuItem value={value.id}>{value.name}</MenuItem>
                ))}
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={DescriptionSX}
            placeholder="Описание"
            {...register('description', { required: true })}
            multiline={true}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={AdminDataInputSX}
            placeholder="Цена"
            {...register('price', { required: true, pattern: numbRegex })}
          />
        </Grid>
        <Grid item xs={2}>
          <FormGroup>
            <FormControlLabel
              control={<Checkbox sx={CheckboxSX} onChange={handlePromoChange} checked={promo}/>}
              label="Акция"
            />
          </FormGroup>
        </Grid>
        {promo && (
          <>
            <Grid item xs={1}>
              <TextField
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Скидка"
                {...register('discount.percentage', { pattern: numbRegex })}
              />
            </Grid>
            <Grid item xs={1}>
              <TextField
                fullWidth
                sx={AdminDataInputSX}
                placeholder="Дата окончания"
                helperText={'ДД.ММ.ГГГГ'}
                {...register('discount.expirationDate', { pattern: dateRegex })}
              />
            </Grid>
          </>
        )}
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
  selectedFoodItem: adminPanelStore.selectedFoodItem,
  newPlace: adminPanelStore.newPlace,
  changeSelectedFoodItem: adminPanelStore.changeSelectedFoodItem,
  categoriesList: adminPanelStore.categoriesList,
  getCategories: adminPanelStore.getCategories,
}))(TemporaryDrawer);
