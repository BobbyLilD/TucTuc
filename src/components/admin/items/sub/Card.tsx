import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import { orange } from '@mui/material/colors';
import styled from '@emotion/styled';
import defaultImage from '../../../../commons/default.jpg';
import { StyledButton } from '../../../common/StyledComponents';
import { Box } from '@mui/system';
import { Item, Stores } from '../../../../types';
import { inject } from 'mobx-react';

const StyledImage = styled.img`
  // border-bottom: 1px solid ${orange[500]};
  width: 100%;
  height: 136px;
  border-radius: 2px;
  // margin: 0 calc((100% - 164px)/2);
  object-fit: cover;
`;

type CardComponentProps = {
  itemsList: Item[];
  index: number;
  changeFormState: () => void;
  changeSelectedItem: (index: number) => void;
}

const CardComponent = ({itemsList, index, changeFormState, changeSelectedItem}:CardComponentProps) => {
  return (
    // <Badge badgeContent={'30%'} sx={{fontSize: 20, , bgcolor: orange[500]}}>
    <Card
      sx={{
        minWidth: 296,
        maxWidth: 360,
        height: 'fit-content',
        // border: `1px solid ${orange[500]}`,
        position: 'relative',
      }}
    >
      {itemsList[index].discount != 0 && <Typography
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
        }}
      >
        30%
      </Typography>}
      <StyledImage src={defaultImage} />
      <CardContent sx={{ paddingTop: 0 }}>
        <Typography variant="h5" fontWeight={600}>{itemsList[index].name}</Typography>
        <Typography variant="body2" sx={{ height: 92, overflow: 'scroll', color:'gray' }}>
          {itemsList[index].description}
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent:'space-between'}}>
          <Typography sx={{fontSize: 20, fontWeight: 600 }}>{itemsList[index].price} р.</Typography>
          <Button sx={StyledButton} onClick={()=> {changeSelectedItem(index); changeFormState();}}>Изменить</Button>
        </Box>
      </CardContent>
    </Card>
    // </Badge>
  );
};

export default inject(({adminPanelStore}: Stores) => ({
  itemsList: adminPanelStore.itemsList,
  changeFormState: adminPanelStore.changeItemAdd,
  changeSelectedItem: adminPanelStore.changeSelectedItem
}))(CardComponent);
