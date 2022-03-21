import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Box, Button, Grid } from '@mui/material';
import { orange } from '@mui/material/colors';
import styled from '@emotion/styled';
import defaultImage from '../../../../commons/default.jpg';
import { IncDecButton, StyledButton } from '../../../common/StyledComponents';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { Item, OrderAdmin, Stores } from '../../../../types';
import { inject, observer } from 'mobx-react';

const StyledImage = styled.img`
  // border-bottom: 1px solid ${orange[500]};
  width: 100%;
  height: 100px;
  border-radius: 2px;
  object-fit: cover;
  // margin: 0 calc((100% - 164px)/2);
`;

const Icon = {
  color: 'orange',
  fontSize: 22,
};

const deleteBtn = { ...StyledButton, ...{ fontSize: 12, paddingY: 0.5, paddingX: 2 } };

type ItemModalCardProps = {
  index: number;
  itemsList: Item[];
  addItemToOrder: (id: string, item: Item) => void;
  removeItemFromOrder: (id: string) => void;
  newOrder: OrderAdmin;
  deleteItemFromOrder: (id: string) => void;
};

const ItemModalCard = observer(({
  index,
  itemsList,
  addItemToOrder,
  removeItemFromOrder,
  newOrder,
  deleteItemFromOrder
}: ItemModalCardProps) => {
  let curItem = itemsList[index];

  return (
    <Card
      sx={{
        minWidth: 296,
        maxWidth: 'fit-content',
        height: 'fit-content',
        paddingTop: 1,
        paddingX: 1,
      }}
    >
      <Grid container width={'inherit'}>
        <Grid item xs={6}>
          <Box position={'relative'}>
            {curItem.discount != undefined && (
              <Typography
                variant="h6"
                sx={{
                  position: 'absolute',
                  top: 4,
                  right: 4,
                  backgroundColor: orange[500],
                  borderRadius: '2px',
                  paddingX: 0.5,
                  paddingY: 0.25,
                  color: 'white',
                  fontSize: 14
                }}
              >
                {curItem.discount}%
              </Typography>
            )}
            <StyledImage src={defaultImage} />
          </Box>
        </Grid>
        <Grid
          item
          xs={6}
          sx={{
            paddingBottom: 1,
            paddingLeft: 1,
            paddingRight: 0.5,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
          }}
        >
          <Typography variant="subtitle1">{curItem.name}</Typography>
          <Typography sx={{marginTop: 1}}>{curItem.price} р.</Typography>
        </Grid>
        <Grid item xs={12} sx={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginBottom: 0.5
            }}
          >
            <Button
              sx={IncDecButton}
              onClick={() => {
                addItemToOrder(curItem.id, curItem);
              }}
            >
              <AddCircleIcon sx={Icon} />
            </Button>
            <Typography variant="h6">
              {newOrder.items.get(curItem.id) != undefined ? newOrder.items.get(curItem.id) : 0}
            </Typography>
            <Button
              onClick={() => {
                removeItemFromOrder(curItem.id);
              }}
              sx={IncDecButton}
            >
              <RemoveCircleIcon sx={Icon} />
            </Button>
          </Box>
          <Button sx={deleteBtn} onClick={() => {
            deleteItemFromOrder(curItem.id)
          }}>Удалить</Button>
        </Grid>
      </Grid>
    </Card>
    // </Badge>
  );
})

export default inject(({ adminPanelStore }: Stores) => ({
  itemsList: adminPanelStore.itemsList,
  addItemToOrder: adminPanelStore.addItemToOrder,
  removeItemFromOrder: adminPanelStore.removeItemFromOrder,
  newOrder: adminPanelStore.newOrder,
  deleteItemFromOrder: adminPanelStore.deleteItemFromOrder
}))(ItemModalCard);
