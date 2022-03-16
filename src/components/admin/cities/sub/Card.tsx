import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { City, Stores } from '../../../../types';
import { inject } from 'mobx-react';

type CardComponentProps = {
  citiesList: City[];
  index: number;
}

const CardComponent = ({citiesList, index}: CardComponentProps) => {
  return (
    <Card sx={{ minWidth: 0, width: '340px' }}>
      <CardContent>
        <Typography variant='h5' fontWeight={600} sx={{marginBottom: 1}}>
          {citiesList[index].name}
        </Typography>
        <Typography variant="h6" component="div">
          Кол-во заведений: {citiesList[index].places}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default inject(({adminPanelStore}: Stores) => ({citiesList: adminPanelStore.citiesList}))(CardComponent);