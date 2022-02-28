import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';
import { inject } from 'mobx-react';
import { Stores } from '../../../../types';

type CardComponentProps = {
  changeAdminState: () => void;
}

const CardComponent = ({changeAdminState}: CardComponentProps) => {
  return (
    <Card sx={{ minWidth: 0, width: 296, height: 256 }}>
      <CardContent sx={{display:'flex', flexDirection: 'column', justifyContent: 'space-evenly', height: '100%'}}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Василий
        </Typography>
        <Typography variant="h5" component="div">
          Иванов
        </Typography>
        <Typography variant='h6'>
            vasiliy.i@gmail.com
        </Typography>
        <Typography variant='h6'>
            89169157645
        </Typography>
        <Button sx={StyledButton} onClick={changeAdminState}>Изменить</Button>
      </CardContent>
    </Card>
  );
}


export default inject(({adminPanelStore}: Stores) => ({changeAdminState: adminPanelStore.changeAdminAdd}))(CardComponent);