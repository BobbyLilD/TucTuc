import styled from '@emotion/styled';
import { styled as StyledMui } from '@mui/material/styles';
import { alpha, InputBase } from '@mui/material';
import orange from '@mui/material/colors/orange';
import {NavLink} from 'react-router-dom';

export const Button = styled.button``;

export const BaseFiller = styled.div`
  flex: 1;
`;

export const StyledImageInput = styled.input`
  display: none;
`;

export const StyledLabel = styled.label`
  border: 1px solid ${orange[500]};
  padding: 8px 16px;
  border-radius: 12px;
  cursor: pointer;
  font-size: 8pt;
  text-transform: uppercase;
  text-align: center;
`;

export const StyledButton = {
  border: `1px solid ${orange[500]}`,
  'border-radius': '12px',
  color: 'black',
  'text-transform': 'uppercase',
};

export const StyledButtonFlex = {
  border: `1px solid ${orange[500]}`,
  'border-radius': '12px',
  color: 'black',
  'text-transform': 'uppercase',
  flexGrow: 1
};

export const Search = StyledMui('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

export const StyledInputBase = StyledMui(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    //transition: theme.transitions.create('width'),
    width: '85%',
    // [theme.breakpoints.up('sm')]: {
    //   width: '12ch',
    //   '&:focus': {
    //     width: '20ch',
    //   },
    // },
  },
}));

export const IncDecButton = {
  minWidth: 48,
  paddingY: 0,
  border: `1px solid ${orange[500]}`,
  borderRadius: '4px',
  fontSize: '18pt',
  color: 'black',
};

export const AdminContentSubContainer = {
  marginTop: 2,
  overflow : 'scroll', 
  height: 'calc(100vh - 174px)' 
}

export const ItemInAdminGrid = {
  display: 'flex',
  justifyContent: 'center'
}

export const BackBtn = {
  marginTop: 3,
  color: 'orange',
  ":hover" : {
      bgcolor: 'transparent'
  }
}

export const OrangeBaseButton = {
  bgcolor: 'orange',
  color: 'white',
  ':hover': {
    bgcolor: 'orange',
  },
  minWidth: 150,
  textTransform: 'none',
  fontWeight: 600,
};

export const WhiteBaseButton = {
  bgcolor: 'white',
  color: 'orange',
  ':hover': {
    color: 'white',
  },
  border: '1px solid orange',
  marginRight: 2,
  textTransform: 'none',
  paddingX: 3,
  fontWeight: 600,
};

export const StyledNavLink = styled(NavLink)`
text-decoration: none;
color: black;`;