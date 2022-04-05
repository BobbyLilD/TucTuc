import { Button, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { inject } from 'mobx-react';
import React, { useEffect } from 'react';
import { Order, Stores } from '../../../../types';
import { OrangeBaseButton } from '../../../common/StyledComponents';

const WhiteBaseButton = {
  bgcolor: 'white',
  color: 'orange',
  ':hover': {
    bgcolor: 'transparent',
  },
  border: '1px solid orange',
  marginRight: 2,
  textTransform: 'none',
  paddingX: 3,
  fontWeight: 600,
};

type OrderCardProps = {
  index: number;
  orderList: Order[];
  changeCommentState: () => void;
  changeSelectedComment: (index: number) => void;
  deleteOrder: (id: string) => void;
};

const OrderCard = ({ index, orderList, changeCommentState, changeSelectedComment, deleteOrder }: OrderCardProps) => {
  const curOrder: Order = orderList[index];
  let orderItems: JSX.Element[] = [];
  for (let i of curOrder.items.keys()) {
    orderItems.push(
      <Typography variant="subtitle2" sx={{ color: 'gray' }}>
        {i.name} {curOrder.items.get(i)}шт.
      </Typography>,
    );
  }

  let dateString =
    ('0' + curOrder.orderDate.getDate()).slice(-2) +
    '.' +
    ('0' + (curOrder.orderDate.getMonth() + 1)).slice(-2) +
    '.' +
    curOrder.orderDate.getFullYear();

  return (
    <Box sx={{ width: '100%', marginY: 2, paddingBottom: 2, borderBottom: '1px solid lightgrey' }}>
      <Typography variant="h6" fontSize={18}>
        Заказ от {dateString}
      </Typography>
      {!curOrder.delivered && (
        <Box display={'flex'}>
          <Typography variant="h6" sx={{ marginRight: 1, fontSize: 18 }}>
            Будет доставлен в{' '}
          </Typography>
          <Typography
            variant="h6"
            fontWeight={600}
            color="orange"
            fontSize={18}
            sx={{ marginBottom: 1 }}
          >
            {curOrder.deliveryDate.getTime}
          </Typography>
        </Box>
      )}
      <Typography variant="subtitle1" fontWeight={600}>
        {curOrder.placeName}
      </Typography>
      {orderItems}
      <Typography variant="subtitle1" fontWeight={600} sx={{ marginBottom: 1, marginTop: 1 }}>
        {curOrder.orderSum.toFixed(2)} руб.
      </Typography>
      <Box sx={{ display: 'flex', width: '100%', marginBottom: 1 }}>
        <Button sx={WhiteBaseButton}>Повторить</Button>
        <Button sx={WhiteBaseButton} onClick={() => deleteOrder(curOrder.id!)}>Отменить</Button>
      </Box>
      {curOrder.comment != undefined ? (
        <Button sx={OrangeBaseButton} onClick={() => {changeCommentState(); changeSelectedComment(index)}}>
          Изменить комментарий
        </Button>
      ) : (
        <Button sx={OrangeBaseButton} onClick={changeCommentState}>
          Оставить комментарий
        </Button>
      )}
    </Box>
  );
};

export default inject(({ clientStore }: Stores) => ({
  orderList: clientStore.orderList,
  changeCommentState: clientStore.changeShowCommentForm,
  changeSelectedComment: clientStore.changeSelectedComment,
  deleteOrder: clientStore.deleteOrder,
}))(OrderCard);
