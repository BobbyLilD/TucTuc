import React from 'react';
import { Switch, Route } from 'react-router-dom';
import ServiceStatusPanel from '../../components/develop/ServiceStatusPanel';

const Home = () => {
  return (
    <div>
      <div>WELCOME</div>
      <Switch>
        <Route path="/ping" component={ServiceStatusPanel} />
      </Switch>
    </div>
  );
};

export default Home;
