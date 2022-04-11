import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import defaultImage from '../../../../commons/default.jpg';
import styled from '@emotion/styled';
import { orange } from '@mui/material/colors';
import { RestaurantAdmin, Stores } from '../../../../types';
import { Button } from '@mui/material';
import { StyledButton } from '../../../common/StyledComponents';
import { inject } from 'mobx-react';

const StyledImage = styled.img`
  // border-bottom: 1px solid ${orange[500]};
  width: 100%;
  height: 96px;
  border-radius: 2px;
  object-fit: scale-down;
  // margin: 0 calc((100% - 164px)/2);
`;

type CardComponentProps = {
  index: number;
  placesList: RestaurantAdmin[];
  changeSelectedItem: (index: number) => void;
  changeFormState: () => void;
}

const CardComponent = ({index, placesList, changeSelectedItem, changeFormState}:CardComponentProps) => {
  let curPlace: RestaurantAdmin = placesList[index];

  return (
    <Card sx={{ 
      minWidth: 268,
      maxWidth: 268,
      height: 'fit-content',
      border: `1px solid ${orange[500]}`,
      marginRight: 2,
      position: 'relative',
    }}>
      <StyledImage src={defaultImage} />
      <CardContent>
        <Typography variant='h6' fontWeight={600}>
          {curPlace.name}
        </Typography>
        <Typography variant="subtitle2" color={'gray'}>
          Телефон: {curPlace.phone}
        </Typography>
        <Typography variant="subtitle2" color={'gray'}>
          Email: {curPlace.email}
        </Typography>
        <Typography variant='subtitle1' gutterBottom>
          Кол-во позиций: {curPlace.items.length}
        </Typography>
        <Button sx={StyledButton} onClick={() => {
          changeSelectedItem(index);
          changeFormState();
        }}>
          Изменить
        </Button>
      </CardContent>
    </Card>
  );
}


export default inject(({adminPanelStore}: Stores) => ({
  placesList: adminPanelStore.placesList,
  changeSelectedItem: adminPanelStore.changeSelectedPlaceItem,
  changeFormState: adminPanelStore.changePlaceAdd
}))(CardComponent);