import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Divider } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';
import { City, OrderAdmin, RestaurantAdmin, Stores } from '../../../../types';
import { inject } from 'mobx-react';
import { buildAddress, getDate } from '../../../../utils/helpers';

type CardComponentProps = {
  ordersList: OrderAdmin[];
  changeOrderState: () => void;
  index: number;
  changeSelectedOrder: (index: number) => void;
  citiesList: City[];
  placesList: RestaurantAdmin[];
};

const CardComponent = ({
  ordersList,
  index,
  changeSelectedOrder,
  changeOrderState,
  citiesList,
  placesList,
}: CardComponentProps) => {
  let dateString = getDate(ordersList[index].orderDate);

  return (
    // <Badge badgeContent={'30%'} sx={{fontSize: 20, , bgcolor: orange[500]}}>
    <Card
      sx={{
        minWidth: 296,
        width: 364,
        height: 'fit-content',
        // border: `1px solid ${orange[500]}`,
        position: 'relative',
      }}
    >
      <CardContent sx={{ paddingTop: 2 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <Typography variant="h6" fontWeight={600}>
            ID: {ordersList[index].id}
          </Typography>
          <Typography variant="subtitle1" sx={{color: 'gray'}}>
            {dateString}
          </Typography>
        </Box>
        <Typography variant='subtitle1' fontWeight={600}>
            Статус: {ordersList[index].status}
        </Typography>
        <Divider/>
        <Typography variant="subtitle1" paddingTop={0.5}>
          Заведение:{' '}
          {placesList != undefined &&
            placesList.filter((x) => x.id == ordersList[index].placeID)[0].name}
        </Typography>
        <Typography variant='subtitle1'>
          Адрес заведения: {ordersList[index].placeAddress}
        </Typography>
        <Typography variant='subtitle1' >
          Адрес клиента: {buildAddress(ordersList[index].destAddress)}
        </Typography>
        <Divider/>
        <Typography variant="subtitle1" paddingTop={1}>
          Кол-во товаров: {ordersList[index].items.size}
        </Typography>
        <Typography variant="subtitle1" >
          Кол-во персон: {ordersList[index].servings}
        </Typography>
        <Divider/>
        <Typography variant="subtitle1" paddingY={1}>
          Стоимость: {ordersList[index].orderSum} р.
        </Typography>

        <Button
          sx={{ ...StyledButton, ...{ marginRight: 1 } }}
          onClick={() => {
            changeSelectedOrder(index);
            changeOrderState();
          }}
        >
          Изменить
        </Button>
        <Button sx={StyledButton}>Отменить</Button>
      </CardContent>
    </Card>
    // </Badge>
  );
};

export default inject(({ adminPanelStore }: Stores) => ({
  ordersList: adminPanelStore.ordersList,
  changeOrderState: adminPanelStore.changeOrderAdd,
  changeSelectedOrder: adminPanelStore.changeSelectedOrder,
  citiesList: adminPanelStore.citiesList,
  placesList: adminPanelStore.placesList,
}))(CardComponent);
