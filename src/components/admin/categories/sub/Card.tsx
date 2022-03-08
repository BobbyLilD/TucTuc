import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import foodActive from '../../../../commons/chinese-food-active.png';
import foodInactive from '../../../../commons/chinese-food-inactive.png';
import { Box } from '@mui/material';
import styled from '@emotion/styled';

const StyledContainer = {
  display: 'flex',
  alignItems: 'center',
  marginBottom: 1
};

const StyledIcon = styled.img`
  height: 50px;
  width: 50px;
`;

const CardComponent = () => {
  return (
    <Card sx={{ minWidth: 296, width: 364, borderRadius: '12px' }}>
      <CardContent>
        <Typography variant="h5" fontWeight={600}>
          Soup
        </Typography>
        <Box sx={StyledContainer}>
          <Typography variant='h6' sx={{marginRight: 2}}>
            Active: 
          </Typography>
          <StyledIcon src={foodActive} />
        </Box>
        <Box sx={StyledContainer}>
        <Typography variant='h6' sx={{marginRight: 2}}>
            Inactive: 
          </Typography>
          <StyledIcon src={foodInactive} />
        </Box>
        <Typography variant="h5">Кол-во товаров: 456</Typography>
      </CardContent>
    </Card>
  );
};

export default CardComponent;
