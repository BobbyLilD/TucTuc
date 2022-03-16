import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';
import { Order, Stores } from '../../../../types';
import { inject } from 'mobx-react';

type CardComponentProps = {
  ordersList: Order[];
  changeOrderState: () => void;
  index: number;
}


const CardComponent = ({ordersList,index, changeOrderState}:CardComponentProps) => {
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
        <Typography variant="h5" fontWeight={600}>ID: {ordersList[index].id}</Typography>
        <Typography variant='h6' paddingTop={1}>
          Москва
        </Typography>
        <Typography variant='h6' paddingTop={1}>
          {ordersList[index].placeName}
        </Typography>
        <Typography variant='subtitle1' paddingTop={1}>
          Кол-во товаров: {ordersList[index].items.size}
        </Typography>
        <Typography variant='subtitle1' paddingTop={1}>
          Кол-во персон: {ordersList[index].servings}
        </Typography>
        <Typography variant='subtitle1' paddingY={1}>
          {ordersList[index].orderSum - ordersList[index].deliveryPrice} + {ordersList[index].deliveryPrice} = {ordersList[index].orderSum}р.
        </Typography>
        <Button sx={{...StyledButton, ...{marginRight: 1}}} onClick={changeOrderState}>Изменить</Button>
        <Button sx={StyledButton}>Отменить</Button>
      </CardContent>
    </Card>
    // </Badge>
  );
};

export default inject(({adminPanelStore}: Stores) => ({ordersList: adminPanelStore.ordersList,
changeOrderState: adminPanelStore.changeOrderAdd}))(CardComponent);
