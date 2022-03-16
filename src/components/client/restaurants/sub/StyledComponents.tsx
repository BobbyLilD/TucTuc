import styled from '@emotion/styled';

export const containerHeight = '260px';
export const paddingPercentage = 22;

export const ControlDiv = styled.div`
  position: absolute;
  top: 0px;
  left: 0px;
  width: calc(100vw * (1 - (${paddingPercentage} / 50)));
  height: 100%;
  margin-left: ${paddingPercentage}%;
  margin-right: ${paddingPercentage}%;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: start;
`;

export const StyledImage = styled.img`
  width: 100%;
  height: ${containerHeight};
  object-fit: cover;
`;

export const CategoryBoxContainer = {
  display: 'flex',
  width: `calc(100vw * (1 - (${paddingPercentage} / 50)))`,
  overflow: 'scroll',
  height: 'fit-content',
  justifyContent: 'start',
  marginBottom: 0.5,
  backgroundColor: 'white',
};

export const CategoryBox = {
  minWidth: 120,
  width: 'fit-content',
  height: 50,
  color: 'black',
  border: 'none',
  'text-transform': 'none',
  fontSize: 14,
  marginX: 1,
  'white-space': 'nowrap',
  ':hover': {
    backgroundColor: 'transparent',
  },
  '&.Mui-selected': {
    color: 'orange',
    backgroundColor: 'transparent',
    ':hover': {
      backgroundColor: 'transparent',
    },
  },
};

export const CityButton = {
  marginLeft: 1,
  color: 'black',
  'text-transform': 'none',
  fontSize: 16,
  ':hover': {
    backgroundColor: 'transparent',
  },
};

export const CitySelect = {
  '&.MuiInputBase-root': {
    ':before': {
      borderBottom: 'none',
    },
    ':after': {
      borderBottom: 'none',
    },
    ':hover': {
      ':before': {
        borderBottom: 'none',
      },
    },
    '&.Mui-focused input': {
      backgroundColor: 'transparent',
    },
  },
  '& .MuiSelect-iconStandard': {
    display: 'none',
  },
  '& .MuiSelect-standard': {
    ':focus': {
      backgroundColor: 'transparent',
    },
  },
  '& .MuiPaper-root': {
    '& .MuiMenuItem-root': {
      '&.Mui-selected': {
        backgroundColor: 'transparent',
      },
    },
  },
};
