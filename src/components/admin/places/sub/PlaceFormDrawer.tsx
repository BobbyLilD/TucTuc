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
  Soup = 'soup',
  Salad = 'salad',
  Breakfast = 'breakfast',
  None = '',
}

interface IFromInput {
  Name: string;
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

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Drawer open={shown} onClose={changeState} anchor="right" onSubmit={handleSubmit(onSubmit)}>
      <Grid container rowSpacing={3} columns={2} sx={{width:'280px', paddingX:'20px', marginTop:'20px'}}>
        <Grid item xs={2}>
          <Input placeholder="Название" {...register('Name')} sx={{width:'100%'}}/>
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth>
            <InputLabel id="select-label">Категория</InputLabel>
            <Select
              {...register('Category')}
              labelId="select-label"
              id="select"
              value={category}
              label="Категория"
              onChange={handleChange}
            >
              <MenuItem value={Category.Soup}>Soup</MenuItem>
              <MenuItem value={Category.Salad}>Salad</MenuItem>
              <MenuItem value={Category.Breakfast}>Breakfast</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={2}>
          <Input placeholder="Описание" {...register('Description')} sx={{width:'100%'}} multiline={true}/>
        </Grid>
        <Grid item xs={2}>
          <Input placeholder="Цена" {...register('Price')} sx={{width:'100%'}}/>
        </Grid>
        <Grid item xs={2}>
          <Input placeholder="Скидка" {...register('Discount')} sx={{width:'100%'}}/>
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
