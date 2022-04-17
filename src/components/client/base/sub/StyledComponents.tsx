import styled from '@emotion/styled';
import { orange } from '@mui/material/colors';
import { ListSelectSX } from '../../../common/StyledComponents';

export const BoxBetweenTop = {
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: 2,
};

export const BoxBetweenBottom = {
  display: 'flex',
  justifyContent: 'space-between',
};

export const DrawerSX = {
  width: 300,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'stretch',
  paddingX: '5%',
};

export const OrderButton = {
  backgroundColor: 'orange',
  marginTop: 2,
  color: 'white',
  ':hover': {
    backgroundColor: 'orange',
  },
};

export const LocationSelectSX = {
  ...ListSelectSX,
  ...{
    '.MuiSelect-select': {
      paddingY: 0.5,
    },
    '.MuiInputBase-root': {
      ':after': {
        borderBottom: '2px solid black',
      },
    },
  },
};

export const registerModalContainer = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '400px',
  height: '400px',
  bgcolor: 'white',
  border: '2px solid #000',
  boxShadow: 24,
  paddingX: 4,
  paddingY: 2,
  display: 'flex',
  flexDirection: 'column',
  borderRadius: '12px',
};

export const AuthForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: space-evenly;
  flex: 1;
`;

export const StyledLogo = styled.img`
  width: 100px;
  height: auto;
  object-fit: 'scale-down';
`;

export const CartBadge = {
  position: 'absolute',
  bottom: 4,
  right: 8,
  fontSize: 10,
  color: 'white',
  borderRadius: '120px',
  backgroundColor: 'darkorange',
  paddingX: '4px',
};

export const UserButton = {
  color: orange[600],
  'text-transform': 'none',
  ':hover': {
    backgroundColor: 'transparent'
  }
};

export const authModalContainer = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '200px',
    bgcolor: 'white',
    border: '2px solid #000',
    boxShadow: 24,
    paddingX: 4,
    paddingY: 2,
    display: 'flex',
    flexDirection: 'column',
    borderRadius: '12px',
  };
