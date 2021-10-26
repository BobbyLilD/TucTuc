import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Home from './view/desktop/Home';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { light } from './commons/colors';

const AppContainer = styled.div`
  height: 100%;
  padding: 20px 20px 0px 20px;
  display: flex;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

export default function App() {
  return (
    <>
      <Global
        styles={css`
          #app {
            height: 100vh;
            background: ${light};
          }
        `}
      />
      <AppContainer>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </AppContainer>
    </>
  );
}
