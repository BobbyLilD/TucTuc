import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import OptionsStore from './stores/optionsStore';
import MainStore from './stores/mainStore';
import ServiceStatusStore from './stores/serviceStatusStore';

import { isDesktop, isMobile, isTablet } from 'react-device-detect';
import MobileApp from './MobileApp';
import './styles.scss';
import './i18n';

const mainStore = new MainStore();

const stores = {
  mainStore: mainStore,
  optionsStore: new OptionsStore(),
  serviceStatusStore: new ServiceStatusStore(),
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      {isTablet || isDesktop ? <App /> : isMobile ? <MobileApp /> : <App />}
    </BrowserRouter>
  </Provider>,

  document.getElementById('app'),
);
