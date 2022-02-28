import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const CardComponent = () => {
  return (
    <Card sx={{ minWidth: 0, width: '340px' }}>
      <CardContent>
        <Typography variant='h5' sx={{marginBottom: 1}}>
          Москва
        </Typography>
        <Typography variant="h6" component="div">
          Кол-во заведений: 20
        </Typography>
      </CardContent>
    </Card>
  );
}


export default CardComponent;