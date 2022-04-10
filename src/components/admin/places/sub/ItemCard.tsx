import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import styled from '@emotion/styled';
import defaultImage from '../../../../commons/default.jpg';
import { StyledButton } from '../../../common/StyledComponents';
import { Item, Stores } from '../../../../types';
import { inject } from 'mobx-react';

const StyledImage = styled.img`
  // border-bottom: 1px solid ${orange[500]};
  width: 100%;
  height: 108px;
  border-radius: 2px;
  object-fit: scale-down;
  // margin: 0 calc((100% - 164px)/2);
`;

type ItemCardProps = {
  itemsList: Item[];
  index: number;
  showItemForm: () => void;
  changeSelectedFoodItem: (index: number) => void;
}

const ItemCard = ({itemsList, index, showItemForm, changeSelectedFoodItem}: ItemCardProps) => {
  let curCard: Item = itemsList[index];

  return (
    <Card
      sx={{
        minWidth: 296,
        maxWidth: 296,
        height: 'fit-content',
        border: `1px solid ${orange[500]}`,
        marginRight: 2,
        position: 'relative',
      }}
    >
      {curCard.discount != undefined && <Typography
        variant="h6"
        sx={{
          position: 'absolute',
          top: 4,
          right: 4,
          backgroundColor: orange[500],
          borderRadius: '2px',
          paddingX: 1,
          paddingY: 0.5,
          color: 'white',
          fontSize: 16
        }}
      >
        {curCard.discount.percentage}%
      </Typography>}
      <StyledImage src={defaultImage} />
      <CardContent sx={{paddingTop: 0}}>
        <Typography variant="h6">{curCard.name}</Typography>
        <Typography variant="body2" sx={{ height: 64, overflow: 'scroll', marginBottom: 2 }}>
          {curCard.description}
        </Typography>
        <Typography sx={{marginBottom: 1}}>{curCard.price} р.</Typography>
        <Button sx={StyledButton} onClick={() => {changeSelectedFoodItem(index); showItemForm();}}>Изменить</Button>
      </CardContent>
    </Card>
    // </Badge>
  );
};

export default inject(({adminPanelStore}: Stores) => ({
  itemsList: adminPanelStore.newPlace.items,
  showItemForm: adminPanelStore.changeItemAdd,
  changeSelectedFoodItem: adminPanelStore.changeSelectedFoodItem
}))(ItemCard);
