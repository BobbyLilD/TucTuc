import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';
import OptionsStore from './stores/optionsStore';
import MainStore from './stores/mainStore';
import UserStore from './stores/userStore';
import AdminPanelStore from './stores/adminPanelStore';
import ClientStore from './stores/clientStore';

import { isDesktop, isMobile, isTablet } from 'react-device-detect';
import MobileApp from './MobileApp';
import './styles.scss';
import RestaurantsStore from './stores/restaurantsStore';

const mainStore = new MainStore();

const stores = {
  mainStore: mainStore,
  optionsStore: new OptionsStore(),
  userStore: new UserStore(),
  adminPanelStore: new AdminPanelStore(),
  clientStore: new ClientStore(),
  restaurantsStore: new RestaurantsStore(),
};

ReactDOM.render(
  <Provider {...stores}>
    <BrowserRouter>
      {isTablet || isDesktop ? <App /> : isMobile ? <MobileApp /> : <App />}
    </BrowserRouter>
  </Provider>,

  document.getElementById('app'),
);
