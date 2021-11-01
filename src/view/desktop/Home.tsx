import React from 'react';
import { useTranslation } from 'react-i18next';
import { Switch, Route } from 'react-router-dom';
import ServiceStatusPanel from '../../components/develop/ServiceStatusPanel';

const Home = (): JSX.Element => {
  const { t } = useTranslation('common');
  return (
    <div>
      <div>{t('welcome')}</div>
      <Switch>
        {/* <Route exact path="/" component={<div>WELCOME</div>} /> */}
        <Route path="/" component={ServiceStatusPanel} />
      </Switch>
    </div>
  );
};

export default Home;
