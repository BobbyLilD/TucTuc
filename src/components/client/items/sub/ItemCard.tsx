import styled from '@emotion/styled';
import { Button, Card, CardContent, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import FoodDefault from '../../../../commons/food-example.jpeg';
import MenuBookOutlinedIcon from '@mui/icons-material/MenuBookOutlined';
import { Item, Restaurant, Stores } from '../../../../types';
import { inject } from 'mobx-react';

const StyledImage = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: inherit;
`;

const ContentContainer = {
  paddingTop: 0.5,
  width: '100%',
  ':last-child': {
    paddingBottom: 2,
  },
};

const CartButton = {
  backgroundColor: 'orange',
  color: 'white',
  borderRadius: '12px',
  paddingY: 0.5,
  fontWeight: 600,
  // 'text-transform': 'none',
  fontSize: 14,
  ':hover': {
    backgroundColor: 'orange',
  },
};

const Badge = {
  position: 'absolute',
  top: 4,
  right: 4,
  backgroundColor: 'orange',
  fontSize: 20,
  borderRadius: 'inherit',
  paddingX: 1,
  paddingY: 0.5,
  color: 'white',
};

type ItemCardProps = {
  itemKey: string;
  restaurantID: string;
  restaurants: Map<string, Restaurant>;
  addToCart: (id: string, name: string, price: number, restaurantID: string) => void;
};

const ItemCard = ({ itemKey, restaurantID, restaurants, addToCart }: ItemCardProps) => {
  const item = restaurants.get(restaurantID).items.get(itemKey);

  return (
    <Card sx={{ minWidth: 0, width: 'fit-content', position: 'relative' }}>
      <Typography sx={Badge}>{item.discount}%</Typography>
      <StyledImage src={FoodDefault} />
      <CardContent sx={ContentContainer}>
        <Box sx={{ display: 'flex', justifyContent: 'end', alignItems: 'center' }}>
          <Typography fontSize={12}>{item.category}</Typography>
          <MenuBookOutlinedIcon sx={{ marginLeft: 0.5, fontSize: 20 }} />
        </Box>
        <Typography variant="h6" marginTop={1}>
          {' '}
          {item.name}
        </Typography>
        <Typography fontSize={14} color={'gray'} width="85%">
          {item.description}
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 1 }}>
          <Typography variant="h6" color="red">
            {item.price} руб.
          </Typography>
          <Button
            sx={CartButton}
            onClick={() => addToCart(itemKey, item.name, item.price, restaurantID)}
          >
            В корзину
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default inject(({ clientStore, restaurantsStore }: Stores) => ({
  addToCart: clientStore.addItemToCart,
  restaurants: restaurantsStore.resultingList,
}))(ItemCard);
