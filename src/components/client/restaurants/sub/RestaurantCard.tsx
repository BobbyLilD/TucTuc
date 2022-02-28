import styled from '@emotion/styled';
import { Box, Card, CardContent, Typography } from '@mui/material';
import React from 'react';
import placeExample from '../../../../commons/food-example.jpeg';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import StarIcon from '@mui/icons-material/Star';
import { Restaurant } from '../../../../types';

const totalStars = 4;

const CardContainer = {
  minWidth: 0,
  width: '260px',
};

const CardContentContainer = {
  paddingTop: 0,
  paddingLeft: 1,
  ":last-child": {
      paddingBottom: 2
  }
};

const StyledImage = styled.img`
  width: 260px;
  height: 110px;
  object-fit: cover;
`;

type RestaurantCardProps = {
  info: Restaurant;
}

const RestaurantCard = ({info}:RestaurantCardProps) => {
    const stars = [];
    for (let i = 0; i < parseFloat(info.rating.toFixed(0)); i++){
        stars.push(<StarIcon sx={{color:'orange'}}/>)
    }

  return (
    <Card sx={CardContainer}>
      <StyledImage src={placeExample} />
      <CardContent sx={CardContentContainer}>
        <Typography variant="h6" fontWeight={600}>
          {info.name}
        </Typography>
        <Box sx={{display: 'flex', color: 'black', alignItems: 'center', marginBottom: 1}}>
          <MenuBookOutlinedIcon />
          <Typography variant="subtitle2" sx={{marginLeft: 1, marginTop: 0.5}}>
            {info.categories.join(', ')}
          </Typography>
        </Box>
        <Typography variant='subtitle2' color='gray' fontSize='0.8 em'>Дставка от {info.delivery}р.</Typography>
        <Box sx={{display: 'flex'}}>
            {stars}
            <Typography variant='subtitle2' color='black' marginTop={0.25} marginLeft={0.5}>{info.rating}</Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default RestaurantCard;
