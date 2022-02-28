import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { grey, orange } from '@mui/material/colors';
import { inject } from 'mobx-react';
import { Stores } from '../../../types';
import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';
import logo from '../../../commons/logo.png';
import styled from '@emotion/styled';
import { Box } from '@mui/system';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { StyledNavLink } from '../../common/StyledComponents';

type AppBarProps = {
  accessToken: string;
  cartLength: number;
  changeCartState: () => void;
  changeAuthState: () => void;
};

const StyledLogo = styled.img`
  width: 100px;
  height: auto;
  object-fit: 'scale-down';
`;

const CartBadge = {
  position: 'absolute',
  bottom: 4,
  right: 8,
  fontSize: 10,
  color: 'white',
  borderRadius: '120px',
  backgroundColor: 'darkorange',
  paddingX: '4px',
};

const NavButton = {
  color: grey[500],
  'text-transform': 'none',
};

const UserButton = {
  color: orange[600],
  'text-transform': 'none',
};

const AppBarClient = ({
  changeCartState,
  changeAuthState,
  cartLength,
  accessToken,
}: AppBarProps) => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: `100%`,
        bgcolor: `white`,
        paddingX: '18%',
        paddingY: '8px',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <StyledNavLink to="/restaurants">
          <StyledLogo src={logo} />
        </StyledNavLink>
        <Box>
          <Button sx={NavButton}>Еда</Button>
          <Button sx={NavButton}>Цветы</Button>
          <Button sx={NavButton}>Акции</Button>
        </Box>
        <Box sx={{ position: 'relative' }}>
          <Button sx={UserButton} onClick={changeAuthState}>
            Войти
          </Button>
          <Button sx={UserButton} onClick={changeCartState}>
            Корзина
            <ShoppingCartIcon sx={{ color: 'orange', marginLeft: 0.5, fontSize: 28 }} />
          </Button>
          {cartLength > 0 && <Typography sx={CartBadge}>{cartLength}</Typography>}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default inject(({ userStore, clientStore }: Stores) => ({
  accessToken: userStore.access_token,
  cartLength: clientStore.cart.size,
  changeCartState: clientStore.changeShowCart,
  changeAuthState: userStore.changeClientAuthState,
}))(AppBarClient);
