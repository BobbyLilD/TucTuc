import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';
import { inject } from 'mobx-react';
import { Client, Stores } from '../../../../types';

const StyledCard = {
  minWidth: 0,
  width: 256,
  height: 256,
  borderRadius: '12px',
};

const StyledContent = {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-evenly',
  height: '100%',
  width: '100%',
};

type CardComponentProps = {
  changeClientState: () => void;
  clientsList: Client[];
  index: number;
  changeSelectedItem: (index: number) => void;
};

const CardComponent = ({
  changeClientState,
  index,
  clientsList,
  changeSelectedItem,
}: CardComponentProps) => {
  return (
    <Card sx={StyledCard}>
      <CardContent sx={StyledContent}>
        <Typography variant="h6" sx={{ borderBottom: `1px solid black`, paddingBottom: 1 }}>
          {clientsList[index].phone}
        </Typography>
        <Typography
          variant="subtitle1"
          sx={{ overflowWrap: 'break-word', borderBottom: `1px solid black`, paddingBottom: 1 }}
        >
          {clientsList[index].email}
        </Typography>
        <Typography variant="h6" sx={{ borderBottom: `1px solid black`, paddingBottom: 1 }}>
          {clientsList[index].name}
        </Typography>
        <Button
          sx={StyledButton}
          onClick={() => {
            changeClientState();
            changeSelectedItem(index);
          }}
        >
          Изменить
        </Button>
      </CardContent>
    </Card>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  changeClientState: adminPanelStore.changeClientAdd,
  clientsList: adminPanelStore.clientsList,
  changeSelectedItem: adminPanelStore.changeSelectedItem,
}))(CardComponent);
