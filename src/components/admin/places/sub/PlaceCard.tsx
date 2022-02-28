import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';


const CardComponent = () => {
  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Москва
        </Typography>
        <Typography variant="h5" component="div">
          20
        </Typography>
      </CardContent>
    </Card>
  );
}


export default CardComponent;