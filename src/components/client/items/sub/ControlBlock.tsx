import styled from '@emotion/styled';
import { AppBar, Button, Paper, Toolbar, Typography } from '@mui/material';
import { Box, flexbox } from '@mui/system';
import React, { useEffect } from 'react';
import banner from '../../../../commons/banner.jpeg';
import { Search, StyledInputBase } from '../../../common/StyledComponents';
import SearchIcon from '@mui/icons-material/Search';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import StarIcon from '@mui/icons-material/Star';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { Restaurant, Stores } from '../../../../types';
import { useParams } from 'react-router-dom';
import { inject } from 'mobx-react';

const containerHeight = '300px';
const paddingPercentage = 10;

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

const commentBtn = {
  textTransform: 'none',
  bgcolor: 'inherit',
  color: 'red',
  ':hover': {
    bgcolor: 'inherit',
  },
};

type ControlBlockProps = {
  selectedRestaurant: Restaurant;
  getRestaurant: (id: string) => void;
  changeShowCommentList: () => void;
  showCommentList: boolean;
};

const ControlBlock = ({
  selectedRestaurant,
  getRestaurant,
  changeShowCommentList,
  showCommentList,
}: ControlBlockProps) => {
  useEffect(() => {
    getRestaurant(id);
  }, []);

  const items = [];
  const { id } = useParams();
  console.log('id is ' + id);
  if (selectedRestaurant != undefined) {
    for (let i = 0; i < parseFloat(selectedRestaurant.rating.toFixed(0)); i++) {
      items.push(<StarIcon sx={{ color: 'orange' }} />);
    }
    for (let i = 0; i < 5 - parseFloat(selectedRestaurant.rating.toFixed(0)); i++) {
      items.push(<StarIcon sx={{ color: 'gray' }} />);
    }
  }

  return (
    <>
      <Box sx={{ position: 'relative', height: containerHeight }}>
        {!showCommentList && (
          <ControlDiv>
            <AppBar
              position="static"
              sx={{ paddingX: '20%', backgroundColor: 'transparent', boxShadow: 'none' }}
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
                  <Button
                    sx={{ position: 'absolute', top: 4, right: 0, color: 'gray', minWidth: 0 }}
                  >
                    <SearchIcon />
                  </Button>
                </Search>
              </Toolbar>
            </AppBar>

            <Typography variant="h4" fontWeight={600} color="white" sx={{ marginY: 2 }}>
              {selectedRestaurant != undefined && selectedRestaurant.name}
            </Typography>
          </ControlDiv>
        )}
        <StyledImage src={banner} />
      </Box>
      {!showCommentList && (
        <Box sx={{ paddingX: `${paddingPercentage}%`, marginTop: 3 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}>
            <Box sx={{ display: 'flex' }}>
              {items}
              <Typography variant="subtitle1" sx={{ marginLeft: 1 }}>
                {selectedRestaurant != undefined && selectedRestaurant.rating}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'end' }}>
              <Typography variant="subtitle2" marginRight={1.5}>
                {selectedRestaurant != undefined && selectedRestaurant.commentIDs.length} отзывов
              </Typography>
              <Button onClick={changeShowCommentList} sx={commentBtn}>
                Посмотреть отзывы
              </Button>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <MenuBookOutlinedIcon />
            <Typography variant="body2" sx={{ width: 350, marginLeft: 2 }}>
              {selectedRestaurant != undefined && selectedRestaurant.categories.join(', ')}
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', marginTop: 2, alignItems: 'end' }}>
            <LocalShippingOutlinedIcon sx={{ fontSize: 28 }} />
            <Typography variant="body2" sx={{ width: 350, marginLeft: 2, marginBottom: 0.5 }}>
              Доставка от {selectedRestaurant != undefined && selectedRestaurant.delivery} руб.
            </Typography>
          </Box>
        </Box>
      )}
    </>
  );
};

export default inject(({ restaurantsStore }: Stores) => ({
  selectedRestaurant: restaurantsStore.selectedRestaurant,
  getRestaurant: restaurantsStore.getRestaurantByID,
  changeShowCommentList: restaurantsStore.changeCommentListShow,
  showCommentList: restaurantsStore.showCommentList,
}))(ControlBlock);
