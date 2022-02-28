import styled from '@emotion/styled';
import { AppBar, Button, Paper, Toolbar, Typography } from '@mui/material';
import { Box, flexbox } from '@mui/system';
import React from 'react';
import banner from '../../../../commons/banner.jpeg';
import { Search, StyledInputBase } from '../../../common/StyledComponents';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SearchIcon from '@mui/icons-material/Search';
import FastfoodIcon from '@mui/icons-material/Fastfood';

const containerHeight = '260px';
const paddingPercentage = 22;

const ControlDiv = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100vw * (1 - (${paddingPercentage} / 50)));
  height: 100%;
  margin-left: ${paddingPercentage}%;
  margin-right: ${paddingPercentage}%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: start;
`;

const StyledImage = styled.img`
  width: 100%;
  height: ${containerHeight};
  object-fit: cover;
`;

const CategoryBoxContainer = {
  display: 'flex',
  width: `calc(100vw * (1 - (${paddingPercentage} / 50)))`,
  overflow: 'scroll',
  height: 'fit-content',
  justifyContent: 'start',
  marginBottom: 0.5
};

const CategoryBox = {
  minWidth: 120,
  width: 'fit-content',
  height: 50,
  color: 'black',
  'text-transform': 'none',
  fontSize: 14,
  marginX: 1,
  'white-space': 'nowrap'
};

const CityButton = {
  marginLeft: 1,
  color: 'black',
  'text-transform': 'none',
  fontSize: 16,
};

const ControlBlock = () => {
  return (
    <>
      <Box sx={{ position: 'relative', height: containerHeight}}>
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
          <Box sx={CategoryBoxContainer}>
            <Button sx={CategoryBox}>
              <FastfoodIcon sx={{ marginRight: 1 }} />
              Фаст фуд
            </Button>
            <Button sx={CategoryBox}>
              <FastfoodIcon sx={{ marginRight: 1 }} />
              Фаст-фуд
            </Button>
            <Button sx={CategoryBox}>
              <FastfoodIcon sx={{ marginRight: 1 }} />
              Фаст-фуд
            </Button>
            <Button sx={CategoryBox}>
              <FastfoodIcon sx={{ marginRight: 1 }} />
              Фаст-фуд
            </Button>
            <Button sx={CategoryBox}>
              <FastfoodIcon sx={{ marginRight: 1 }} />
              Фаст-фуд
            </Button>
            <Button sx={CategoryBox}>
              <FastfoodIcon sx={{ marginRight: 1 }} />
              Фаст-фуд
            </Button>
            <Button sx={CategoryBox}>
              <FastfoodIcon sx={{ marginRight: 1 }} />
              Фаст-фуд
            </Button>
          </Box>
        </ControlDiv>
        <StyledImage src={banner} />
      </Box>
    </>
  );
};

export default ControlBlock;
