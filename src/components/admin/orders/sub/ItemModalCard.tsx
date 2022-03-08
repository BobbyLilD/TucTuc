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

const StyledImage = styled.img`
  // border-bottom: 1px solid ${orange[500]};
  width: 100%;
  height: 164px;
  border-radius: 2px;
  // margin: 0 calc((100% - 164px)/2);
`;

const Icon = {
  color: 'orange',
  fontSize: 22,
};

const ItemModalCard = () => {
  const [count, setCount] = React.useState(0);

  return (
    // <Badge badgeContent={'30%'} sx={{fontSize: 20, , bgcolor: orange[500]}}>
    <Card
      sx={{
        minWidth: 296,
        maxWidth: 'fit-content',
        height: 'fit-content',
        // border: `1px solid ${orange[500]}`,
        paddingTop: 1,
        paddingX: 1
      }}
    >
      <Grid container width={'inherit'}>
        <Grid item xs={8}>
          <Box position={'relative'}>
            <Typography
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
            </Typography>
            <StyledImage src={defaultImage} />
          </Box>
        </Grid>
        <Grid item xs={4} sx={{paddingBottom: 1,paddingLeft: 1, paddingRight: 2, display: 'flex', flexDirection: 'column', justifyContent: 'space-evenly'}}>
          <Typography variant="h5">Абобус</Typography>
            <Typography>12975 р.</Typography>
            <Box
              sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: 2,
                marginTop: 1,
              }}
            >
              <Button
                sx={IncDecButton}
                onClick={() => {
                  setCount(count + 1);
                }}
              >
                <AddCircleIcon sx={Icon} />
              </Button>
              <Typography variant="h6">{count}</Typography>
              <Button
                onClick={() => {
                  setCount(count - 1);
                }}
                sx={IncDecButton}
              >
                <RemoveCircleIcon sx={Icon} />
              </Button>
            </Box>
            <Button sx={StyledButton}>Удалить</Button>
        </Grid>
      </Grid>
    </Card>
    // </Badge>
  );
};

export default ItemModalCard;
