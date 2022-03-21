import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';
import { City, OrderAdmin, RestaurantAdmin, Stores } from '../../../../types';
import { inject } from 'mobx-react';

type CardComponentProps = {
  ordersList: OrderAdmin[];
  changeOrderState: () => void;
  index: number;
  changeSelectedItem: (index: number) => void;
  citiesList: City[];
  placesList: RestaurantAdmin[];
};

const CardComponent = ({
  ordersList,
  index,
  changeOrderState,
  changeSelectedItem,
  citiesList,
  placesList,
}: CardComponentProps) => {
  let dateString =
    ('0' + ordersList[index].orderDate.getDate()).slice(-2) +
    '.' +
    ('0' + (ordersList[index].orderDate.getMonth() + 1)).slice(-2) +
    '.' +
    ordersList[index].orderDate.getFullYear();

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
        <Typography variant="h5" fontWeight={600}>
          ID: {ordersList[index].id}
        </Typography>
        <Typography variant="h6" paddingTop={1}>
          Город:{' '}
          {citiesList != undefined &&
            citiesList.filter((x) => x.id == ordersList[index].cityID)[0].name}
        </Typography>
        <Typography variant="h6" paddingTop={1}>
          Заведение:{' '}
          {placesList != undefined &&
            placesList.filter((x) => x.id == ordersList[index].placeID)[0].name}
        </Typography>
        <Typography variant="subtitle1" paddingTop={1}>
          Кол-во товаров: {ordersList[index].items.size}
        </Typography>
        <Typography variant="subtitle1" paddingTop={1}>
          Кол-во персон: {ordersList[index].servings}
        </Typography>
        <Typography variant="subtitle1" paddingTop={1}>
          {ordersList[index].orderSum - ordersList[index].deliveryPrice} +{' '}
          {ordersList[index].deliveryPrice} = {ordersList[index].orderSum}р.
        </Typography>
        <Typography variant="subtitle1" paddingY={1}>
          Дата заказа: {dateString}
        </Typography>
        <Button
          sx={{ ...StyledButton, ...{ marginRight: 1 } }}
          onClick={() => {
            changeOrderState();
            changeSelectedItem(index);
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
  changeSelectedItem: adminPanelStore.changeSelectedItem,
  citiesList: adminPanelStore.citiesList,
  placesList: adminPanelStore.placesList,
}))(CardComponent);
