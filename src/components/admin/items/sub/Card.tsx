import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import styled from '@emotion/styled';
import defaultImage from '../../../../commons/default.jpg';
import { StyledButton } from '../../../common/StyledComponents';

const StyledImage = styled.img`
  // border-bottom: 1px solid ${orange[500]};
  width: 100%;
  height: 164px;
  border-radius: 2px;
  // margin: 0 calc((100% - 164px)/2);
`;

const CardComponent = () => {
  return (
    // <Badge badgeContent={'30%'} sx={{fontSize: 20, , bgcolor: orange[500]}}>
    <Card
      sx={{
        minWidth: 296,
        maxWidth: 296,
        height: 'fit-content',
        // border: `1px solid ${orange[500]}`,
        position: 'relative',
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
      <CardContent sx={{paddingTop: 0}}>
        <Typography variant="h4">Абобус</Typography>
        <Typography variant="body2" sx={{ height: 128, overflow: 'scroll', marginBottom: 2 }}>
          Нежнейший абобус из ягненка в грибном соусе. Подается с гречишным чаем и смузи из
          сельдерея в авторском коктейле от шефа-изобретателя легендарного Качо и карри, столь
          известного в районе Лигурии северной Италии.
        </Typography>
        <Typography sx={{marginBottom: 1}}>12975 р.</Typography>
        <Button sx={StyledButton}>Изменить</Button>
      </CardContent>
    </Card>
    // </Badge>
  );
};

export default CardComponent;
