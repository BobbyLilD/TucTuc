import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  SelectChangeEvent,
  Toolbar,
} from '@mui/material';
import { inject } from 'mobx-react';
import React from 'react';
import { Search, StyledButton, StyledInputBase } from '../../../common/StyledComponents';
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
  width: '400px',
  height: '600px',
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 5,
  paddingY: 2,
  display: 'flex',
  'flex-direction': 'column',
  'justify-content': 'space-evenly',
  'align-items': 'center'
};

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
          <Search sx={{ width: '100%', border: `1px solid ${orange[500]}`,  borderRadius: '8px'}}>
            <StyledInputBase
              placeholder="Поиск..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ width: '100%' }}
            />
          </Search>
        <FormControl fullWidth>
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

        <ItemModalCard />
      </Box>
    </Modal>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  itemAdd: adminPanelStore.itemAddToPlace,
  itemChangeState: adminPanelStore.changeItemAdd,
}))(ItemModal);
