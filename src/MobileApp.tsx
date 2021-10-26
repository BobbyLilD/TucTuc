import React from 'react';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import Home from './view/mobile/Home';
import { light } from './commons/colors';

const AppContainer = styled.div`
  height: 100%;
`;

const MainContent = styled.div``;

export default function MobileApp(): JSX.Element {
  return (
    <>
      <Global
        styles={css`
          #app {
            display: flex;
            background: ${light};
          }
        `}
      />
      <AppContainer>
        <MainContent>
          <Home />
        </MainContent>
      </AppContainer>
    </>
  );
}
