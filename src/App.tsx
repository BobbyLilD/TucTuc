import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { css, Global } from '@emotion/react';
import styled from '@emotion/styled';
import { light } from './commons/colors';
import AdminPanel from './view/desktop/AdminPanel';
import ClientBase from './view/desktop/ClientBase';

const AppContainer = styled.div`
  height: 100%;
  overflow: hidden;
  display: flex;
  align-items: stretch;
  justify-content: center;
  flex-direction: column;
  font-family: Arial
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
          <Route path="/admin" component={AdminPanel}/>
          <Route path='/' component={ClientBase}/>
        </Switch>
      </AppContainer>
    </>
  );
}
