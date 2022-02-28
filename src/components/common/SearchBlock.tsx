import * as React from 'react';
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import InputBase from '@mui/material/InputBase';
import { Button } from '@mui/material';
import { Search, StyledInputBase } from './StyledComponents';
import { orange } from '@mui/material/colors';

const StyledButton = styled(Button)`
  margin-left: 20px;
  color: white;
`;

type SearchBarProps = {
  changeAddState: () => void;
  hasButton: boolean;
};

const SearchBlock = ({ changeAddState, hasButton = true }: SearchBarProps) => {
  return (
    <Box sx={{ flexGrow: 1, marginTop: 1 }}>
      <AppBar position="static" sx={{ borderRadius: `4px`, bgcolor: orange[700] }}>
        <Toolbar>
          <Search sx={{ flexGrow: 1 }}>
            <StyledInputBase
              placeholder="Поиск..."
              inputProps={{ 'aria-label': 'search' }}
              sx={{ width: '100%' }}
            />
          </Search>
          {hasButton && (
            <StyledButton variant="text" onClick={changeAddState}>
              Добавить
            </StyledButton>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SearchBlock;
