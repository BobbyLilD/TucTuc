import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';
import { inject } from 'mobx-react';
import { Admin, Stores } from '../../../../types';

type CardComponentProps = {
  itemKey: number;
  changeAdminState: () => void;
  adminsList: Admin[];
  changeSelectedItem: (index: number) => void;
};

const CardComponent = ({
  itemKey,
  changeAdminState,
  adminsList,
  changeSelectedItem,
}: CardComponentProps) => {
  return (
    <Card sx={{ minWidth: 296, width: 364, height: 256 }}>
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-evenly',
          height: '100%',
        }}
      >
        <Typography sx={{ fontSize: 16 }} color="text.secondary" gutterBottom>
          {adminsList[itemKey].name}
        </Typography>
        <Typography variant="h5" fontWeight={600}>
          {adminsList[itemKey].surname}
        </Typography>
        <Typography variant="h6">Email: {adminsList[itemKey].email}</Typography>
        <Typography variant="h6">Телефон: {adminsList[itemKey].phone}</Typography>
        <Button
          sx={StyledButton}
          onClick={() => {
            changeAdminState();
            changeSelectedItem(itemKey);
          }}
        >
          Изменить
        </Button>
      </CardContent>
    </Card>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  changeAdminState: adminPanelStore.changeAdminAdd,
  adminsList: adminPanelStore.adminsList,
  changeSelectedItem: adminPanelStore.changeSelectedItem,
}))(CardComponent);
