import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Toolbar,
  Typography,
} from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Search, ListSelectSX, StyledInputBase } from '../../../common/StyledComponents';
import { Stores } from '../../../../types';
import ItemModalCard from './ItemModalCard';
import { orange } from '@mui/material/colors';

type ItemFormProps = {
  itemAdd: boolean;
  itemChangeState: () => void;
};

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '650px',
  maxHeight: '600px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingY: 2,
};

const SelectorSX = {...ListSelectSX, ...{flexGrow: 1, marginLeft: 1}}

const ItemModal = ({ itemAdd, itemChangeState }: ItemFormProps) => {
  const [category, setCategory] = React.useState('');
  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  return (
    <Modal
      open={itemAdd}
      onClose={itemChangeState}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography variant='h5' sx={{marginLeft: 2, marginBottom: 1}}>Добавление товара</Typography>
        <Box sx={{ display: 'flex' , justifyContent: 'space-evenly', paddingX: 1, alignItems: 'center'}}>
        <Search sx={{ flexGrow: 1, border: `1px solid ${orange[500]}`, borderRadius: '8px', paddingY: 1 }}>
          <StyledInputBase
            placeholder="Поиск..."
            inputProps={{ 'aria-label': 'search' }}
            fullWidth
          />
        </Search>
          <FormControl sx={SelectorSX}>
            <InputLabel id="category-select-label">Категория</InputLabel>
            <Select
              labelId="category-select-label"
              id="category-select"
              value={category}
              label="Категория"
              onChange={handleCategoryChange}
            >
              <MenuItem value={'Soup'}>Soup</MenuItem>
              <MenuItem value={'Salad'}>Salad</MenuItem>
              <MenuItem value={'Breakfast'}>Breakfast</MenuItem>
            </Select>
          </FormControl>
        </Box>


        <Grid container spacing={2} sx={{marginTop: 0.5, height: 400, overflow: 'scroll'}}>
          <Grid item xs={6}>
            <ItemModalCard />
          </Grid>
          <Grid item xs={6}>
            <ItemModalCard />
          </Grid>
          <Grid item xs={6}>
            <ItemModalCard />
          </Grid>
          <Grid item xs={6}>
            <ItemModalCard />
          </Grid>
          <Grid item xs={6}>
            <ItemModalCard />
          </Grid>
          <Grid item xs={6}>
            <ItemModalCard />
          </Grid>
          <Grid item xs={6}>
            <ItemModalCard />
          </Grid>
        </Grid>
      </Box>
    </Modal>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  itemAdd: adminPanelStore.itemAddToPlace,
  itemChangeState: adminPanelStore.changeItemAdd,
}))(ItemModal);