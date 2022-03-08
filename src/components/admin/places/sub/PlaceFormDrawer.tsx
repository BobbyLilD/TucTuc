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
  TextField,
} from '@mui/material';
import { useForm, SubmitHandler } from 'react-hook-form';
import { AdminDataInputSX, ListSelectSX, StyledButton, DescriptionSX } from '../../../common/StyledComponents';
import { numbRegex } from '../../../../commons/const';

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
      <Grid
        container
        rowSpacing={3}
        columns={2}
        sx={{ width: '280px', paddingX: '20px', marginTop: '20px' }}
      >
        <Grid item xs={2}>
          <TextField fullWidth sx={AdminDataInputSX} placeholder="Название" {...register('Name')} />
        </Grid>
        <Grid item xs={2}>
          <FormControl fullWidth sx={ListSelectSX}>
            <InputLabel id="select-label">Категория</InputLabel>
            <Select
              {...register('Category', {required: true})}
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
          <TextField
            fullWidth
            sx={DescriptionSX}
            placeholder="Описание"
            {...register('Description', {required: true})}
            multiline={true}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={AdminDataInputSX}
            placeholder="Цена"
            {...register('Price', {required: true, pattern: numbRegex})}
          />
        </Grid>
        <Grid item xs={2}>
          <TextField
            fullWidth
            sx={AdminDataInputSX}
            placeholder="Скидка"
            {...register('Discount', {pattern: numbRegex})}
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
}))(TemporaryDrawer);
