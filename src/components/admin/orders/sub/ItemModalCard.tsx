import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import styled from '@emotion/styled';
import defaultImage from '../../../../commons/default.jpg';
import { IncDecButton, StyledButton } from '../../../common/StyledComponents';

const StyledImage = styled.img`
  // border-bottom: 1px solid ${orange[500]};
  width: 100%;
  height: 164px;
  border-radius: 2px;
  // margin: 0 calc((100% - 164px)/2);
`;

const ItemModalCard = () => {
  const [count, setCount] = React.useState(0);

  return (
    // <Badge badgeContent={'30%'} sx={{fontSize: 20, , bgcolor: orange[500]}}>
    <Card
      sx={{
        minWidth: 296,
        maxWidth: 296,
        height: 'fit-content',
        border: `1px solid ${orange[500]}`,
        marginRight: 2,
        position: 'relative'
      }}
    >
      <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          backgroundColor: orange[500],
          borderRadius: '2px',
          paddingX: 1,
          paddingY: 0.5,
          color: 'white',
        }}
      >
        30%
      </Typography>
      <StyledImage src={defaultImage} />
      <CardContent sx={{paddingTop: 0, marginTop: 1}}>
        <Typography variant="h4">Абобус</Typography>
        <Typography>12975 р.</Typography>
        <Box sx={{display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 2, marginTop: 1}}>
          <Button sx={IncDecButton} onClick={() => {setCount(count + 1)}}>+</Button>
          <Typography variant='h6' sx={{marginX: 1}}>{count}</Typography>
          <Button onClick={() => {setCount(count - 1)}} sx={IncDecButton}>-</Button>
        </Box>
        <Button sx={StyledButton}>Удалить</Button>
      </CardContent>
    </Card>
    // </Badge>
  );
};

export default ItemModalCard;
