import {
  AppBar,
  Button,
  Paper,
  ToggleButton,
  ToggleButtonGroup,
  Toolbar,
  Typography,
} from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import banner from '../../../../commons/banner.jpeg';
import { Search, StyledInputBase, StyledNavLink } from '../../../common/StyledComponents';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import {
  CityButton,
  ControlDiv,
  containerHeight,
  CategoryBox,
  CategoryBoxContainer,
  StyledImage,
} from './StyledComponents';
import { inject } from 'mobx-react';
import { Stores } from '../../../../types';

type ControlBlockProps = {
  categories: string[];
  selectedCategories: string[];
  selectCategories: (categories: string[]) => void;
  changeSearchQuery: (query: string) => void;
};

const activeCategory = { ...CategoryBox, ...{ color: 'orange' } };

const ControlBlock = ({
  categories,
  selectCategories,
  selectedCategories,
  changeSearchQuery,
}: ControlBlockProps) => {
  let items = [];
  for (let key of categories) {
    items.push(
      <ToggleButton sx={CategoryBox} value={key} aria-label="bold">
          <FastfoodIcon sx={{ marginRight: 1 }} />
          {key}
      </ToggleButton>
    );
  }

  return (
    <>
      <Box sx={{ position: 'relative', height: containerHeight }}>
        <ControlDiv>
          <AppBar
            position="static"
            sx={{ paddingX: '5%', backgroundColor: 'transparent', boxShadow: 'none' }}
          >
            <Toolbar>
              <Search sx={{ flexGrow: 1, position: 'relative' }}>
                <StyledInputBase
                  placeholder="Поиск..."
                  inputProps={{ 'aria-label': 'search' }}
                  sx={{
                    width: '100%',
                    color: 'black',
                    backgroundColor: 'white',
                    fontSize: 14,
                    paddingY: 0.5,
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    changeSearchQuery(event.target.value);
                  }}
                />
                <Button sx={{ position: 'absolute', top: 4, right: 0, color: 'gray', minWidth: 0 }}>
                  <SearchIcon />
                </Button>
              </Search>
            </Toolbar>
          </AppBar>
          <Button sx={CityButton}>
            <LocationOnIcon sx={{ marginRight: 1 }} />
            Санкт-Петербург
          </Button>
          {/* <Box sx={CategoryBoxContainer}>{items}</Box> */}
          <ToggleButtonGroup
            value={selectedCategories}
            onChange={(event: React.MouseEvent<HTMLElement>, newCategories) => {
              selectCategories(newCategories);
            }}
            sx={CategoryBoxContainer}
          >
            {items}
          </ToggleButtonGroup>
        </ControlDiv>
        <StyledImage src={banner} />
      </Box>
    </>
  );
};

export default inject(({ restaurantsStore }: Stores) => ({
  categories: restaurantsStore.categories,
  selectCategories: restaurantsStore.selectCategories,
  selectedCategories: restaurantsStore.selectedCategories,
  changeSearchQuery: restaurantsStore.changeSearchQuery,
}))(ControlBlock);
