import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import { StyledButton } from '../../../common/StyledComponents';





const CardComponent = () => {
  return (
    // <Badge badgeContent={'30%'} sx={{fontSize: 20, , bgcolor: orange[500]}}>
    <Card
      sx={{
        minWidth: 296,
        width: 364,
        height: 296,
        // border: `1px solid ${orange[500]}`,
        position: 'relative',
      }}
    >
      <CardContent sx={{paddingTop: 2}}>
        <Typography variant="h5" fontWeight={600}>ID: 3904738403</Typography>
        <Typography variant='h6' paddingTop={1}>
          Москва
        </Typography>
        <Typography variant='h6' paddingTop={1}>
          McDonald's
        </Typography>
        <Typography variant='subtitle1' paddingTop={1}>
          Кол-во товаров: 6
        </Typography>
        <Typography variant='subtitle1' paddingTop={1}>
          Кол-во персон: 3
        </Typography>
        <Typography variant='subtitle1' paddingY={1}>
          7839 + 311 = 3834р.
        </Typography>
        <Button sx={StyledButton}>Отменить</Button>
      </CardContent>
    </Card>
    // </Badge>
  );
};

export default CardComponent;
