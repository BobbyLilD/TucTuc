import styled from '@emotion/styled';
import { styled as StyledMui } from '@mui/material/styles';
import { alpha, InputBase } from '@mui/material';
import orange from '@mui/material/colors/orange';
import { NavLink } from 'react-router-dom';

export const Button = styled.button``;

export const BaseFiller = styled.div`
  flex: 1;
`;

export const StyledImageInput = styled.input`
  display: none;
`;

export const StyledLabel = styled.label`
  border: 1px solid ${orange[500]};
  text-align: center;
  padding-top: 45%;
  width: inherit;
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
  textTransform: 'uppercase',
  ':hover': {
    backgroundColor: 'rgb(210 153 25 / 4%)',
  },
};

export const StyledButtonFlex = {
  ...StyledButton,
  ...{
    flexGrow: 1,
  },
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
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    width: '85%',
  },
}));

export const AdminContentSubContainer = {
  marginTop: 2,
  overflow: 'scroll',
  height: 'calc(100vh - 174px)',
};

export const ItemInAdminGrid = {
  display: 'flex',
  justifyContent: 'center',
};

export const BackBtn = {
  marginTop: 3,
  color: 'orange',
  ':hover': {
    bgcolor: 'transparent',
  },
};

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
    bgcolor: 'white',
  },
  border: '1px solid orange',
  marginRight: 2,
  textTransform: 'none',
  paddingX: 3,
  fontWeight: 600,
};

export const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: black;
`;

export const DataInputSX = {
  '.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
};

export const AdminDataInputSX = {
  backgroundColor: 'rgb(240,240,240)',
  '.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
  '.MuiOutlinedInput-input': {
    paddingY: 1.25,
  },
};

export const ListSelectSX = {
  backgroundColor: 'rgb(240,240,240)',
  '.MuiInputLabel-root': {
    '&.Mui-focused': {
      color: 'orange',
    },
  },
  '.MuiOutlinedInput-root': {
    '&.Mui-focused fieldset': {
      borderColor: 'orange',
    },
  },
};

export const DescriptionSX = {
  ...AdminDataInputSX,
  ...{ '.MuiOutlinedInput-input': { paddingY: 0 } },
};

export const IncDecButton = {
  p: 0,
  minWidth: 0,
  borderRadius: '60px',
  ':hover': {
    color: 'transparent',
  },
  marginX: 1,
};

export const Icon = {
  color: 'orange',
  fontSize: 16,
};
